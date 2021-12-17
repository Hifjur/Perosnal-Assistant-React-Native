import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "react-router-native";

export default function JokeGen() {
  const [jokes, setJokes] = useState({});
  const [update, setUpdate] = useState(false);

  const updateJoke=()=>{
      if(update===true){
        setUpdate(false);
      }else{
          setUpdate(true)
      }
  }
  useEffect(() => {
    fetch(`https://icanhazdadjoke.com/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJokes(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [update]);
  return (
    <SafeAreaView style={styles.taskWrapper}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <Link to="/home">
          <Text style={styles.sectionTitle}>back</Text>
        </Link>
      </View>
      <Text style={styles.Title}>Here! A Random Joke!</Text>
      <Text style={styles.jokes}>{jokes.joke}</Text>
      <TouchableOpacity
        onPress={() => {
          updateJoke();
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Generate Another One</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  taskWrapper: {
    padding: 66,
    paddingHorizontal: 20,
    height: "100%",
  },
  jokes: {
    color: "white",
    fontSize: 40,
    paddingVertical: 50,
  },
  sectionTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Title: {
    color: "white",
    fontSize: 40,
    fontWeight: "700",
  },
  buttonText:{
      color:'white',
      padding:20,
      backgroundColor:'#DA8800',
      borderRadius:5,

  }
});
