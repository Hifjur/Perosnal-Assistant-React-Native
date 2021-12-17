import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Link, useParams } from "react-router-native";

export default function ShowNotes() {
    const {id}= useParams();
    const [note, setNote] = useState("");
    console.log(id);
    useEffect(() => {
        fetch(`https://cryptic-falls-87009.herokuapp.com/notes/${id}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setNote(data);
          })
          .catch((error) => {
            alert(error.message);
          });
      }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Note</Text>
        <Link to="/home">
          <Text style={styles.sectionTitle}>back</Text>
        </Link>
      </View>
      <Text style={styles.noteField}>{note.note}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      sectionTitle: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        padding: 20,
      },
    container:{
        height:'100%',
        paddingTop:66
    },
    noteField:{
        backgroundColor:'#FFD108',
        height:'82%',
        marginHorizontal:10,
        borderRadius:8,
        padding:20,
        fontSize:18
    }
});
