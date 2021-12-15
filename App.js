import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet,Text, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import Home from "./Conponent/Home/Home";
import Task from "./Conponent/Task";
import TodoList from "./Conponent/TodoList";


export default function App() {
  return (
    <View style={styles.container}>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
        
          <Route path="/todoList" element={<TodoList></TodoList>}></Route>
        </Routes>
      </NativeRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#091334",
    //backgroundColor: "#7993EB",
    
  }
});
