import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    transform: [{ translateY: 70 }],
    backgroundColor: "#ecf0f1",
    padding: 1,
  },
  board: {
    height: 312,
    width: 321,
  },
  lineleft: {
    backgroundColor: "black",
    height: 306,
    width: 3,
    position: "absolute",
    transform: [{ translateX: 125 }],
  },

  lineright: {
    backgroundColor: "black",
    height: 306,
    width: 3,
    position: "absolute",
    transform: [{ translateX: 237 }],
  },

  linetop: {
    backgroundColor: "black",
    height: 3,
    width: 306,
    position: "absolute",
    transform: [{ translateY: 97 }, { translateX: 23 }],
  },

  linebot: {
    backgroundColor: "black",
    height: 3,
    width: 306,
    position: "absolute",
    transform: [{ translateY: 204 }, { translateX: 23 }],
  },
  textStyle: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
  },
  newGameStyle: {
    justifyContent: "center",
  },
  helloStyle: {
    color: "navy",
    fontSize: 40,
    textAlign: "center",
  },
  roomStyle: {
    color: "navy",
    fontSize: 20,
    textAlign: "center",
  },
});
