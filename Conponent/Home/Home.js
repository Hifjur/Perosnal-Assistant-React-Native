import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  View,
} from "react-native";
import { Link } from "react-router-native";

export default function Home() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Text style={styles.head}>Hi Hifjur!</Text>
      <View style={styles.menu}>
        <View style={styles.tiles}>
          <Link to="/todoList">
            <Text style={styles.nav}>Todo List</Text>
          </Link>
          <Link to="/todoList">
            <Text style={styles.nav}>Todo List</Text>
          </Link>
        </View>
        <View style={styles.tiles}>
          <Link to="/todoList">
            <Text style={styles.nav}>Todo List</Text>
          </Link>
          <Link to="/todoList">
            <Text style={styles.nav}>Todo List</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  nav: {
    color: "white",
    width: "100%",
    textAlign: "center",
    padding: "18%",
    backgroundColor: "limegreen",
    margin: 5,
    borderRadius: 5,
  },
  tiles: {
    flex: 1,
    margin: 5,
  },
  menu: {
    flex: 1,
    height: "100%",
    paddingTop: "15%",
    flexDirection: "row",
    textAlign: "center",
  },
  head: {
    color: "white",
    textAlign: "center",
    marginTop:50,
    fontSize:30,
    fontWeight:'bold'
  },
});
