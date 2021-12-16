import React, { useState } from "react";

//import {registerUser} from '../Hooks/useFirebase';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    //registerUser(email, password)
  };

  return (
    <KeyboardAvoidingView style={styles.container} >
      <Text style={styles.header}>Personal Assistant</Text>
      <View style={styles.inputsContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <View style={styles.buttonContianer}>
          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRegister}
            style={styles.buttonRegister}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  inputsContainer: {
    width: "90%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    margin: 5,
    borderRadius: 5,
  },
  buttonContianer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#009457",
    padding: 10,
    width: "80%",
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonRegister: {
    backgroundColor: "#FFD418",
    padding: 20,
    width: "80%",
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonOutlineText: {
    fontWeight: "700",
    fontSize: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  header: {
    color: "white",
    paddingBottom: 50,
    fontSize: 40,
    fontWeight: "700",
  },
});
