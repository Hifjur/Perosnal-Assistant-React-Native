import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import AuthProvider from "./Conponent/context/AuthProvider/AuthProvider";
import FrontPage from "./Conponent/Home/FrontPage";

import Login from "./Conponent/Login/Login";
import Register from "./Conponent/Login/Register";
import Notes from "./Conponent/Notes/Notes";
import ShowNotes from "./Conponent/Notes/ShowNotes";
import Appointments from "./Conponent/AppointmentManager/Appointments";
import Task from "./Conponent/Task";
import TodoList from "./Conponent/TodoList";
import JokeGen from "./Conponent/JokeGen/JokeGen";
import NewsFlash from "./Conponent/NewsFlash/NewsFlash";

export default function App() {
  return (
    <View style={styles.container}>
      <AuthProvider>
        <NativeRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/home" element={<FrontPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/todoList" element={<TodoList></TodoList>}></Route>
            <Route path="/appointments" element={<Appointments />}></Route>
            <Route path="/jokeGen" element={<JokeGen/>}></Route>
            <Route path="/news" element={<NewsFlash/>}></Route>
            <Route path="/notes" element={<Notes />}></Route>
            <Route path="/shownote/:id" element={<ShowNotes />}></Route>
          </Routes>
        </NativeRouter>
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#091334",
    //backgroundColor: "#7993EB",
  },
});
