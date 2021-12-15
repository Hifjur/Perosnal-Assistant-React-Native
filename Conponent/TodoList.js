import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link } from "react-router-native";
import Task from "./Task";

export default function TodoList() {
  return (
    <View style={styles.taskWrapper}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Todays Task</Text>
        <Link to="/">
          <Text style={styles.sectionTitle}>back</Text>
        </Link>
      </View>
      <View style={styles.items}>
        {/* task here */}
        <Task Text="task1"></Task>
        <Task Text="task1"></Task>
        
      </View>
      {/* typing to add task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={"+ Add ToDo"}></TextInput>
        <TouchableOpacity>
          <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text></View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  taskWrapper: {
    padding: 88,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
  },
  items: {
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  writeTaskWrapper: {
      position:'absolute',
      bottom:'-110%',
      width:'100%',
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center", 
  },
  input: {
      paddingVertical:20,
      paddingHorizontal:20,
      backgroundColor:'#FFF',
      borderRadius: 5,
      borderColor:'#C0C0C0',
      borderWidth:1,
      width:'75%',
      marginLeft:25,
  },
  addWrapper: {
      width:60,
      height:60,
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:5,
      borderWidth:1
  },
  addText: {},
});
