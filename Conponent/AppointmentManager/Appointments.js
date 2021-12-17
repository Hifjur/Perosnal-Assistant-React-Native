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

import AppointmentItem from "./AppointmentItem";

export default function Appointments() {
  const {user} = useAuth();
  const [appointments, setAppointments] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [allAppointments, setAllAppointments] = useState([]);
  const [update, setUpdate] = useState(false);
  
  //load data from db
  useEffect(() => {
    fetch(`https://cryptic-falls-87009.herokuapp.com/appointment?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllAppointments(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [update]);
  const addNewEntry = () => {
    Keyboard.dismiss();
    setUpdate(false);
    
    console.log(data);
    //sending to db
    const data = {appointments, time, date, email:user.email};
    fetch(`https://cryptic-falls-87009.herokuapp.com/appointment`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Alert.alert("Success", "Password saved", [
            { text: "OK", onPress: () => setUpdate(true) },
          ]);
        }
      });
    setAppointments("");
    setDate("");
    setTime("");
  };
  //  delete task when completed
  const RemovePassword = (index) => {
    Alert.alert(
      "Removing password!",
      "Do you want to delete this information?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            let passwordVaultCopy = [...allAppointments];
            passwordVaultCopy.splice(index, 1);
            setAllAppointments(passwordVaultCopy);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.taskWrapper}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Appointment Manager</Text>
        <Link to="/home">
          <Text style={styles.sectionTitle}>back</Text>
        </Link>
      </View>
      {/* typing to add task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Set Time"}
            value={time}
            onChangeText={(text) => setTime(text)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder={"Set Date"}
            value={date}
            onChangeText={(text) => setDate(text)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder={"Add Appointment Info"}
            value={appointments}
            onChangeText={(text) => setAppointments(text)}
          ></TextInput>
          <TouchableOpacity onPress={addNewEntry}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>ADD</Text>
          </View>
        </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <ScrollView style={styles.itemScroll}>
        <View style={styles.items}>
          {/* task here */}

          {allAppointments.map((item) => {
            return (
              <TouchableOpacity key={item._id} onLongPress={() => RemovePassword(item._id)}>
                <AppointmentItem Text={item}></AppointmentItem>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: "100%",
    margin: 5,
  },
  addWrapper: {
    width: '100%',
    height: 60,
    backgroundColor: "limegreen",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    margin:5
  },
  addText: {
    color: "white",
    fontWeight: "700",
  },
  inputsContainer: {
    width: "100%",
  },
});
