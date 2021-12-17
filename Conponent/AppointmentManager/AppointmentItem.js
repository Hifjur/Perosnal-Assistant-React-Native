import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function AppointmentItem(props) {
  const {appointments, date, time}=props.Text
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        
        <Text style={styles.itemText}>{appointments}</Text>
        
      </View>
      <View style={styles.details}>
        <Text style={styles.itemDetails}>Time: {time}</Text>
        <Text style={styles.itemDetails}>Day: {date}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#6451D9",
    padding: 10,
    borderRadius: 5,
    margin: 5,
    
    
    
    maxWidth:'100%'
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
    fontSize: 26,
    color:'white',
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  details:{ 
    flex:1,
    flexDirection:'row',
    width:'100%',
    backgroundColor:'#8978F7',
    justifyContent:'space-between',
    borderRadius:10
  },
  itemDetails:{
    padding:10,
    color:'white',
    
    
  }
});
