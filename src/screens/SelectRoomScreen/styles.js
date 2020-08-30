import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    transform: [{ translateY: 20 }],
    backgroundColor: "#ecf0f1",
    padding: 1,
  },
  textStyle: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
  },
});
