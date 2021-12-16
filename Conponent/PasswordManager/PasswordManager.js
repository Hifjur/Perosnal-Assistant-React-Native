import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";

export default function PasswordManager() {
  return (
    <View>
      <Text>Pman</Text>
      <Link to="/">
        <Text style={styles.sectionTitle}>back</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({});
