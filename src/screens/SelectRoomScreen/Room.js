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
  const [room, setRoom] = useState();
  const user = props.extraData.id;
  const navigation = props.navigation;
  const startGame = () => {
    const roomRef = firebase.firestore().collection("rooms");
    roomRef
      .doc(room)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("yay");
          roomRef.doc(room).update({ o: user });
        } else {
          const res = roomRef.doc(room).set({
            x: user,
            room: room,
            o: null,
          });
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    navigation.navigate("Home", { room: room, user: user });
  };
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
