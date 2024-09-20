import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const CardForm = () => {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");

  const storeData = async () => {
    try {
      const formData = { price, name };
      await AsyncStorage.setItem("formData", JSON.stringify(formData));
      Alert.alert("Success", "Data stored successfully!");
      // Reset form
      setPrice("");
      setName("");
    } catch (error) {
      Alert.alert("Error", "Failed to store the data");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Enter Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Price"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />

        <Button title="Submit" onPress={storeData} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    width: width * 0.8,
    padding: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
});

export default CardForm;
