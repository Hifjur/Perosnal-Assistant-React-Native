import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet,Text, View } from "react-native";
import Task from "./Conponent/Task";
import Todo from "./Conponent/Todo";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Todays Task</Text>
        <View style={styles.items}>
          {/* task here */}
          <Task Text = "task1"></Task>
          <Task Text = "task1"></Task>
          <Task Text = "task1"></Task>
          <Task Text = "task1"></Task>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#091334",
    //backgroundColor: "#7993EB",
    
  },
  taskWrapper: {
    padding: 88,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize:24,
    fontWeight:'bold',
    padding:20,
    
  },
  items: {
    marginTop:30
  },
});
