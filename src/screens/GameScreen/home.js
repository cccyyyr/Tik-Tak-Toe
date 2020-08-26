import * as React from "react";
import { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles.js";
import Circle from "../../components/circle";
import Cross from "../../components/cross";
import { firebase } from "../../firebase/config";
// import { registerRootComponent } from "expo";
import { Button, Overlay } from "react-native-elements";
import { set } from "react-native-reanimated";

export default function Home({ navigation, route }) {
  const [inGame, setInGame] = useState(true);
  const [oTurn, setOTurn] = useState(false);
  const [oInputs, setOInputs] = useState([]);
  const [xInputs, setXInputs] = useState([]);
  const [xHasWon, setXHasWon] = useState(false);
  const [oHasWon, setOHasWon] = useState(false);
  const [oppo, setOppo] = useState("");
  const user = route.params.user;
  const room = route.params.room;
  const turn = route.params.turn;
  const roomRef = firebase.firestore().collection("rooms");
  useEffect(() => {
    console.log(xInputs);
    if (room == "") {
      return;
    }
    roomRef.doc(room).onSnapshot((documentSnapShot) => {
      const oturn = documentSnapShot.get("oturn");
      setOTurn(oturn);
      const o = documentSnapShot.get("oinputs");
      setOInputs(o);
      const x = documentSnapShot.get("xinputs");
      setXInputs(x);
      const ingame = documentSnapShot.get("ingame");
      setInGame(ingame);
      const xw = documentSnapShot.get("xhaswon");
      setXHasWon(xw);
      const ow = documentSnapShot.get("ohaswon");
      setOHasWon(ow);
      if (turn == 0) {
        const oppo = documentSnapShot.get("x");
        setOppo(oppo);
      } else {
        const oppo = documentSnapShot.get("o");
        setOppo(oppo);
      }
    });
    if (!inGame) {
      roomRef.doc(room).delete();
    }
  }, []);

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
      if (room == "") {
        moveAI(area.id);
        return;
      }
      roomRef
        .doc(room)
        .get()
        .then((documentSnapShot) => {
          if (oTurn && turn == 0) {
            roomRef.doc(room).update({ oturn: false });
            console.log("oinputs is" + oInputs);
            const temp = oInputs.concat(area.id);
            if (hasWon(temp)) {
              roomRef.doc(room).update({ ohaswon: true });
              roomRef.doc(room).update({ ingame: false });
              setOHasWon(true);
              setInGame(false);
            }
            roomRef.doc(room).update({ oinputs: oInputs.concat(area.id) });
          } else if (!oTurn && turn == 1) {
            roomRef.doc(room).update({ oturn: true });
            const temp = xInputs.concat(area.id);
            roomRef.doc(room).update({ xinputs: temp });
            if (hasWon(temp)) {
              roomRef.doc(room).update({ xhaswon: true });
              roomRef.doc(room).update({ ingame: false });
              setInGame(false);
              setXHasWon(true);
            }
          } else {
            alert("Not ur turn!");
          }
        });
    }
  }
  function areaNotOccupied(area) {
    return oInputs.indexOf(area) == -1 && xInputs.indexOf(area) == -1;
  }

  function areaAv(area, a, b) {
    console.log(a);
    console.log(b);
    return a.indexOf(area) == -1 && b.indexOf(area) == -1;
  }
  function moveAI(area) {
    const temp1 = xInputs.concat(area);
    setXInputs(temp1);
    if (hasWon(temp1)) {
      setInGame(false);
      setXHasWon(true);
      return;
    }
    while (true) {
      const radom = Math.random() * 8.3;
      const move = Math.round(radom);
      if (areaAv(move, temp1, oInputs)) {
        const temp = oInputs.concat(move);
        setOInputs(temp);
        if (hasWon(temp)) {
          setInGame(false);
          setOHasWon(true);
        }
        break;
      }
    }
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
  function newGame() {
    setInGame(true);
    if (room != "") {
      var o, x;
      if (turn == 0) {
        o = user;
        x = oppo;
      } else {
        o = oppo;
        x = user;
      }
      roomRef.doc(room).set({
        room: room,
        o: o,
        x: x,
        oturn: false,
        oinputs: [],
        xinputs: [],
        ohaswon: false,
        xhaswon: false,
        ingame: true,
      });
    }
    console.log("hi");
    navigation.navigate("Room");
    navigation.navigate("Home", { room: room, user: user, turn: turn });
    console.log("h");
  }
  return (
    <View style={styles.container}>
      <Text>Hello, {user}</Text>
      <Text>You are in room: {room}</Text>
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
        <Button title="New Game" onPress={newGame} />
      </Modal>
      <Modal isVisible={xHasWon}>
        <Text>X has won!</Text>
        <Button title="New Game" onPress={newGame} />
      </Modal>
    </View>
  );
}
