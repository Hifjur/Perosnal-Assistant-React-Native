import React, { useState } from "react";
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
import { keyboardProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import { Link } from "react-router-native";
import NoteItem from "./NoteItem";

export default function Notes() {
  const [task, setTask] = useState();
  const [todoList, setToDoList] = useState([]);

  const addToDoHandler = () => {
    Keyboard.dismiss();
    setToDoList([...todoList, task]);
    setTask(null);
  };
  //  delete note when completed
  const deleteNote = (index) => {
    Alert.alert(
      "Remove Note!",
      "Do you want to delete the Note?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            let todoListCopy = [...todoList];
            todoListCopy.splice(index, 1);
            setToDoList(todoListCopy);
          },
        },
      ]
    );
  };

  const viewDoc =(index) =>{
    
  }

  return (
    <View style={styles.taskWrapper}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <Link to="/">
          <Text style={styles.sectionTitle}>back</Text>
        </Link>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"+ Add ToDo"}
          value={task}
          onChangeText={(text) => setTask(text)}
        ></TextInput>
        <TouchableOpacity 
        onPress={addToDoHandler}
        >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <ScrollView style={styles.itemsScroll}>
        <View style={styles.items}>
          {/* task here */}
          {todoList.map((item, index) => {
            return (
              <TouchableOpacity key={index} 
              onLongPress={() => deleteNote(index)}
              onPress={() =>viewDoc(index)}
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
    paddingVertical: 20,
    paddingHorizontal: 20,
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
  itemsScroll:{
      flexGrow:1
  }
});
