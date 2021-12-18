import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  View,
  TouchableOpacity,
} from "react-native";
import { Link } from "react-router-native";
import useAuth from "../Hooks/useAuth";


export default function Home() {
  const { user, logout } = useAuth();
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.header}>
        <Text style={styles.head}>Hi {user.displayName}!</Text>
        <TouchableOpacity
          onPress={() => {
            logout();
            
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menu}>
        <View style={styles.tiles}>
          <Link to="/todoList">
            <Text style={[styles.nav, styles.Todo]}>Todo List</Text>
          </Link>
          <Link to="/appointments">
            <Text style={[styles.nav,styles.Appointment]}>Appointment Manager</Text>
          </Link>
        </View>
        <View style={styles.tiles}>
          <Link to="/notes">
            <Text style={[styles.nav,styles.Notes]}>Notes</Text>
          </Link>
          <Link to="/jokeGen">
            <Text style={[styles.nav,styles.Joke]}>Get A Random Joke</Text>
          </Link>
          <Link to="/news">
            <Text style={[styles.nav,styles.news]}>News Flash</Text>
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
    height:'100%',
    paddingHorizontal:10
  },
  nav: {
    color: "white",
    width: "100%",
    height: 120,
    textAlign: "center",
    padding: "6%",
    backgroundColor: "limegreen",
    margin: 5,
    borderRadius: 5,
    fontSize: 30,
    fontWeight: "bold",
  },
  // tiles: {
  //   flex: 1,
    
  //   margin: 5,
  // },
  menu: {
    flex: 1,
    height: "100%",
    paddingTop: "15%",
    flexDirection: "column",
    textAlign: "center",
  },
  head: {
    color: "white",
    textAlign: "center",
    marginTop: 50,
    fontSize: 30,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonText: {
    backgroundColor: "#DF7000",
    padding: 8,
    color: "white",
    borderBottomEndRadius: 5,
  },
  Todo:{
    backgroundColor:"#06BEC7"
  },
  Appointment:{
    backgroundColor:"#8500EE"
  },
  Notes:{
    backgroundColor:"#F3AA02"
  },
  Joke:{
    backgroundColor:"#DE0076"
  },
  news:{
    backgroundColor:'#70B400'
  }
});
