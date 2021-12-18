import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useAuth from "../Hooks/useAuth";
import Login from "../Login/Login";

import Home from "./Home";

export default function FrontPage() {
  const { user } = useAuth();
  return (
    <View style={styles.canvasContainer}>
      {user.email ? (
        <View style={styles.pageLayout}>
          <Home></Home>
          
        </View>
      ) : (
        <Login></Login>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  canvasContainer: {
    flex: 1,
  },
  pageLayout:{
      flex:1,
      flexDirection:'column'
  }
});
