import * as React from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles.js";
import Circle from "../../components/circle";
import Cross from "../../components/cross";
// import { registerRootComponent } from "expo";
import { Button, Overlay } from "react-native-elements";

export default function Home({ navigation, route }) {
  const [inGame, setInGame] = React.useState(true);
  const [oturn, setOTurn] = React.useState(false);
  const [oInputs, setOInputs] = React.useState([]);
  const [xInputs, setXInputs] = React.useState([]);
  const [xHasWon, setXHasWon] = React.useState(false);
  const [oHasWon, setOHasWon] = React.useState(false);
  const user = route.params.user;
  const room = route.params.room;
  function clickHandler(e) {
    const { locationX, locationY } = e.nativeEvent;
    const area = AREAS.find(
      (d) =>
        locationX >= d.startX &&
        locationX <= d.endX &&
        locationY >= d.startY &&
        locationY <= d.endY
    );
    if (inGame && area != null && areaNotOccupied(area.id)) {
      if (oturn) {
        const temp = oInputs.concat(area.id);
        setOInputs(temp);
        setOTurn(false);
        if (hasWon(temp)) {
          setInGame(false);
          setOHasWon(true);
        }
      } else {
        const temp = xInputs.concat(area.id);
        setXInputs(temp);
        setOTurn(true);
        if (hasWon(temp)) {
          setInGame(false);
          setXHasWon(true);
        }
      }
    }
  }
  function areaNotOccupied(area) {
    return oInputs.indexOf(area) == -1 && xInputs.indexOf(area) == -1;
  }
  const CENTER_POINTS = [
    { x: 10, y: 10 },
    { x: 113, y: 10 },
    { x: 213, y: 10 },
    { x: 10, y: 113 },
    { x: 113, y: 113 },
    { x: 213, y: 113 },
    { x: 10, y: 213 },
    { x: 113, y: 213 },
    { x: 213, y: 213 },
  ];

  const AREAS = [
    { startX: 3, startY: 3, endX: 103, endY: 103, id: 0 },
    { startX: 106, startY: 3, endX: 206, endY: 103, id: 1 },
    { startX: 209, startY: 3, endX: 309, endY: 103, id: 2 },
    { startX: 3, startY: 106, endX: 103, endY: 206, id: 3 },
    { startX: 106, startY: 106, endX: 206, endY: 206, id: 4 },
    { startX: 209, startY: 106, endX: 309, endY: 206, id: 5 },
    { startX: 3, startY: 209, endX: 103, endY: 309, id: 6 },
    { startX: 106, startY: 209, endX: 206, endY: 309, id: 7 },
    { startX: 209, startY: 209, endX: 309, endY: 309, id: 8 },
  ];

  const CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  function hasWon(inputs) {
    return CONDITIONS.some((a) =>
      a.every((item) => inputs.indexOf(item) !== -1)
    );
  }

  return (
    <View style={styles.container}>
      <Text>{user}</Text>
      <Text>{room}</Text>
      <TouchableWithoutFeedback onPress={(e) => clickHandler(e)}>
        {/* <button title="new game" onPress={newGame()} /> */}
        <View style={styles.board}>
          <View style={styles.linetop} />
          <View style={styles.linebot} />
          <View style={styles.lineright} />
          <View style={styles.lineleft} />
          {oInputs.map((d) => (
            <Circle
              key={d}
              xTranslate={CENTER_POINTS[d].x}
              yTranslate={CENTER_POINTS[d].y}
              color="deepskyblue"
            />
          ))}
          {xInputs.map((d) => (
            <Cross
              key={d}
              xTranslate={CENTER_POINTS[d].x}
              yTranslate={CENTER_POINTS[d].y}
              color="deepskyblue"
            />
          ))}
        </View>
      </TouchableWithoutFeedback>
      <Modal isVisible={oHasWon}>
        <Text>O has won!</Text>
      </Modal>
      <Modal isVisible={xHasWon}>
        <Text>X has won!</Text>
      </Modal>
    </View>
  );
}
