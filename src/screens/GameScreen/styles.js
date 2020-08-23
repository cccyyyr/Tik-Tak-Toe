import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
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
    transform: [{ translateX: 100 }],
  },

  lineright: {
    backgroundColor: "black",
    height: 306,
    width: 3,
    position: "absolute",
    transform: [{ translateX: 200 }],
  },

  linetop: {
    backgroundColor: "black",
    height: 3,
    width: 306,
    position: "absolute",
    transform: [{ translateY: 100 }],
  },

  linebot: {
    backgroundColor: "black",
    height: 3,
    width: 306,
    position: "absolute",
    transform: [{ translateY: 200 }],
  },
});
