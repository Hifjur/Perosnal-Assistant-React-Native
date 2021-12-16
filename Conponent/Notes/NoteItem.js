import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function NoteItem(props) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        
        <Text style={styles.itemText}>{props.Text}...</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFD108",
    padding: 10,
    borderRadius: 5,
    margin: 5,
    
    
    height:150,
    maxWidth:100
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
    fontSize: 16,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  
});
