import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Task(props) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.round}></TouchableOpacity>
        <Text style={styles.itemText}>{props.Text}</Text>
      </View>
      <View style={styles.buttons}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#00DACC",
    padding: 10,
    borderRadius: 5,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  round: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: "white",
    opacity: 0.4,
    margin: 10,
  },
  itemText: {
    padding: 20,
    fontSize: 22,
  },
  buttons: {
      width:20,
      height: 20,
      borderColor:'#2ABB01',
      borderWidth:2,
      borderRadius:5,
      
  },
});
