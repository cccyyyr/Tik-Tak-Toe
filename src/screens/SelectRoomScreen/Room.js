import React, { useState, useEffect } from "react";
import { firebase } from "../../firebase/config";

import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function Room(props) {
  const [room, setRoom] = useState("0000");
  const user = props.extraData.id;
  const navigation = props.navigation;
  function startGame() {
    const roomRef = firebase.firestore().collection("rooms");
    roomRef
      .doc(room)
      .get()
      .then((doc) => {
        var turn;
        if (doc.exists) {
          turn = 0;
          roomRef.doc(room).update({ o: user });
        } else {
          turn = 1;
          roomRef.doc(room).set({
            x: user,
            room: room,
            o: null,
            oturn: false,
            oinputs: [],
            xinputs: [],
            ohaswon: false,
            xhaswon: false,
            ingame: true,
          });
        }
        return turn;
      })
      .then((turn) => {
        console.log(turn);
        navigation.navigate("Home", { room: room, user: user, turn: turn });
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }
  return (
    <View>
      <TextInput
        onSubmitEditing={startGame}
        onChangeText={(text) => setRoom(text)}
        placeholder="Type or create a room"
        placeholderTextColor={"black"}
        underlineColorAndroid="black"
        selectionColor={"black"}
        maxLength={30}
        returnKeyType="done"
        type="number"
        autoCorrect={false}
        blurOnSubmit={false}
      />
      <Button title="go" onPress={startGame} />
    </View>
  );
}
