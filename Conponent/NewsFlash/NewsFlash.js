import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import { Link } from "react-router-native";

import apiKey from "../../apiKey";
import AppointmentItem from "../AppointmentManager/AppointmentItem";

export default function NewsFlash() {
  //calling for news api
  const [input, setInput] = useState("");
  const [news, setNews] = useState([]);
  const [update, setUpdate] = useState(false);
  const search = () => {
      dismissKeyboard();
    if (update === true) {
      setUpdate(false);
    } else {
      setUpdate(true);
    }
  };
  const ApiKey = apiKey();

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?q=${input}&apiKey=${ApiKey}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNews(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [update]);
  return (
    <View style={styles.taskWrapper}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>News</Text>
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
            placeholder={"Search here"}
            defaultValue="tech"
            value={input}
            onChangeText={(text) => setInput(text)}
          />
          <TouchableOpacity onPress={search}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <ScrollView style={styles.itemScroll}>
        <View style={styles.items}>
          {/* news here */}

          {news.articles && (news.status!=="error") && news.totalResults!== 0 ? (
            news.articles.map((item) => {
              const { publishedAt, title, description, author, url } = item;

              return (
                <View key={url} style={styles.item}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.itemTitle}>{title}</Text>

                    <Text style={styles.itemText}>{description}</Text>
                    <Text
                      style={styles.Linkto}
                      onPress={() => Linking.openURL(`${url}`)}
                    >
                       Click here to go to original article
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.itemDetails}>{author}</Text>
                    <Text style={styles.itemDetails}>Day: {publishedAt}</Text>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={styles.sectionTitle}>Nothing Here! Search to see news</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  taskWrapper: {
    padding: 66,
    paddingHorizontal: 20,
    height: "100%",
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
    width: "100%",
    height: 60,
    backgroundColor: "#5900C4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
  },
  addText: {
    color: "white",
    fontWeight: "700",
  },
  inputsContainer: {
    width: "100%",
  },
  item: {
    backgroundColor: "#384344",
    padding: 10,
    borderRadius: 5,
    margin: 5,

    maxWidth: "100%",
  },

  round: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: "white",
    opacity: 0.4,
    margin: 10,
  },
  itemText: {
    padding: 20,
    fontSize: 15,
    color: "white",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  details: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#8978F7",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  itemDetails: {
    padding: 10,
    color: "white",
    fontSize: 8,
  },
  itemTitle: {
    color: "#B9DE00",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  Linkto:{
      color:'#00D4FF',
      fontWeight:'500',
      fontSize:18,
      padding:10
  }
});
