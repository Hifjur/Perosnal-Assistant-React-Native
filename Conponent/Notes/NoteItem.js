import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";

export default function NoteItem(props) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemText}>{props.Text.title}</Text>
        <Text style={styles.itemPreview}>{props.Text.note}</Text>
        <Link to={`/shownote/${props.Text._id}`}>
            <Text style={styles.button}>Show more</Text>
          </Link>
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
    padding: 4,
    fontSize: 16,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  button:{
    fontSize:10,
    color:'gray',
    padding:10
  },
  itemPreview:{
    fontSize:8,
    height:14
  }
});
