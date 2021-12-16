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
import PasswordItem from "./PasswordItem";

export default function PasswordManager() {
  const [password, setPassword] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordVault, setPasswordVault] = useState([]);

  const addNewEntry = () => {
    Keyboard.dismiss();
    setPasswordVault([...passwordVault, password]);
    setPassword(null);
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
            let passwordVaultCopy = [...passwordVault];
            passwordVaultCopy.splice(index, 1);
            setPasswordVault(passwordVaultCopy);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.taskWrapper}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Password Manager</Text>
        <Link to="/">
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
            placeholder={"Account Name"}
            value={name}
            onChangeText={(text) => setName(text)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder={"email"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder={"password"}
            value={password}
            onChangeText={(text) => setPassword(text)}
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

          {passwordVault.map((item, index) => {
            return (
              <TouchableOpacity key={index} onLongPress={() => RemovePassword(index)}>
                <PasswordItem Text={item}></PasswordItem>
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
    paddingVertical: 20,
    paddingHorizontal: 20,
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
