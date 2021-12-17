import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  ScrollView,
} from "react-native";

import { Link } from "react-router-native";
import useAuth from "../Hooks/useAuth";
import NoteItem from "./NoteItem";

export default function Notes() {
  const [note, setNote] = useState();
  const [title, setTitle] = useState();
  const [noteList, setNoteList] = useState([]);
  const [update, setUpdate] = useState(false);
  const { user } = useAuth();
  // load notes
  useEffect(() => {
    fetch(`https://cryptic-falls-87009.herokuapp.com/notes?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNoteList(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [update]);

  const addNotesHandler = () => {
    setUpdate(false);
    Keyboard.dismiss();
    const data = { note,title, name: user.displayName, email: user.email };
    console.log(data);
    fetch(`https://cryptic-falls-87009.herokuapp.com/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Alert.alert("Success", "Notes Added", [
            { text: "OK", onPress: () => setUpdate(true) },
          ]);
        }
      });
    setNote(null);
  };
  //  delete note
  const deleteNote = (id) => {
    setUpdate(false);
    Alert.alert(
      "Mark as done!",
      "Do you want to delete the task from the list?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            const url = `https://cryptic-falls-87009.herokuapp.com/notes/${id}`;
            fetch(url, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.deletedCount > 0) {
                  Alert.alert("Success", "Note Deleted", [
                    { text: "OK", onPress: () => setUpdate(true) },
                  ]);
                } else {
                  console.log("nope");
                }
              });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.taskWrapper}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <Link to="/home">
          <Text style={styles.sectionTitle}>back</Text>
        </Link>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Title"}
            value={title}
            onChangeText={(text) => setTitle(text)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder={"Type here!"}
            value={note}
            onChangeText={(text) => setNote(text)}
          ></TextInput>
        </View>
        <TouchableOpacity onPress={addNotesHandler}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <ScrollView style={styles.itemsScroll}>
        <View style={styles.items}>
          {/* task here */}
          {noteList.map((item) => {
            return (
              <TouchableOpacity
                key={item._id}
                onLongPress={() => deleteNote(item._id)}
              >
                <NoteItem Text={item}></NoteItem>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {/* typing to add task */}
    </View>
  );
}
const styles = StyleSheet.create({
  taskWrapper: {
    padding: 66,
    paddingHorizontal: 20,
    height:'100%'
  },
  sectionTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
  },
  items: {
    marginTop: 30,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  writeTaskWrapper: {
    position: "relative",
    top: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin:4,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: "75%",
    marginLeft: 25,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
  },
  addText: {},
  itemsScroll: {
    flexGrow: 1,
  },
  inputContainer:{
    flex:1
  }
});
