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
  SafeAreaView
} from "react-native";

import { Link } from "react-router-native";
import Task from "./Task";

export default function TodoList() {
  const [task, setTask] = useState("");
  const [todoList, setToDoList] = useState([]);
  const [update, setUpdate] = useState(false);

  // load todolist
  useEffect(() => {
    fetch("https://cryptic-falls-87009.herokuapp.com/todo")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setToDoList(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [update]);
  // add new task to DB
  const addToDoHandler = () => {
    setUpdate(false)
    Keyboard.dismiss();
    const data = {task}
    console.log(data);
    fetch("https://cryptic-falls-87009.herokuapp.com/todo", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Alert.alert("Success", "Todo Added", [
            { text: "OK", onPress: () => setUpdate(true) },
          ]);
        }
      });

    setTask(null);
  };
  //  delete task when completed
  const completeTask = (id) => {
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
            const url = `https://cryptic-falls-87009.herokuapp.com/todo/${id}`;
            fetch(url, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.deletedCount > 0) {
                  Alert.alert("Success", "Todo Deleted", [
                    { text: "OK", onPress: () => setUpdate(true) },
                  ]);
                }else{
                  console.log('nope')
                }
              });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.taskWrapper}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Todays Task</Text>
        <Link to="/home">
          <Text style={styles.sectionTitle}>back</Text>
        </Link>
      </View>
      {/* typing to add task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"+ Add ToDo"}
          value={task}
          onChangeText={(text) => setTask(text)}
        ></TextInput>
        <TouchableOpacity onPress={addToDoHandler}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <ScrollView style={styles.itemScroll}>
        <View style={styles.items}>
          {/* task here */}

          {todoList.map((item) => {
            return (
              <TouchableOpacity
                key={item._id}
                onPress={() => completeTask(item._id)}
              >
                <Task Text={item.task}></Task>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
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
    marginTop: 20,
    
  },
  itemScroll: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  writeTaskWrapper: {
    position: "relative",
    bottom: 0,
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
    backgroundColor: "limegreen",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
  },
  addText: {
    color: "white",
    fontWeight: "700",
  },
});
