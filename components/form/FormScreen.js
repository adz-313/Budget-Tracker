import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import ExpenditureForm from "./ExpenditureForm";
import IncomeForm from "./IncomeForm";
import TransferForm from "./TransferForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function FormScreen({ route, navigation }) {
  const [transactionType, setTransactionType] = useState("Expenditure");
  const [form, setForm] = useState({
    amount: "",
    date: new Date(),
    category: "",
    account: "",
    title: "",
    recipient: "",
    note: "",
  });

  var hasUnsavedChanges = Boolean(false);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  // React.useEffect(
  //   () =>
  //     navigation.addListener("beforeRemove", (e) => {
  //       if (!hasUnsavedChanges) {
  //         // If we don't have unsaved changes, then we don't need to do anything
  //         return;
  //       }

  //       // Prevent default behavior of leaving the screen
  //       e.preventDefault();

  //       // Prompt the user before leaving the screen
  //       Alert.alert(
  //         "Discard changes?",
  //         "You have unsaved changes. Are you sure to discard them and leave the screen?",
  //         [
  //           { text: "Don't leave", style: "cancel", onPress: () => {} },
  //           {
  //             text: "Discard",
  //             style: "destructive",
  //             // If the user confirmed, then we dispatch the action we blocked earlier
  //             // This will continue the action that had triggered the removal of the screen
  //             onPress: () => navigation.dispatch(e.data.action),
  //           },
  //         ]
  //       );
  //     }),
  //   [navigation, hasUnsavedChanges]
  // );

  const storeData = async () => {
    try {
      await AsyncStorage.setItem(uuidv4(), JSON.stringify(form));
      alert("Success", "Data stored successfully!");
      // Reset form
      setForm({
        amount: "",
        date: new Date(),
        category: "",
        account: "",
        title: "",
        recipient: "",
        note: "",
      });
      navigation.navigate("Home");
    } catch (error) {
      alert("Error", "Failed to store the data");
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.button,
            transactionType === "Income" && styles.selectedButton,
          ]}
          onPress={() => setTransactionType("Income")}
        >
          <Text
            style={[
              styles.buttonText,
              transactionType === "Income" && styles.selectedButtontext,
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            transactionType === "Expenditure" && styles.selectedButton,
          ]}
          onPress={() => setTransactionType("Expenditure")}
        >
          <Text
            style={[
              styles.buttonText,
              transactionType === "Expenditure" && styles.selectedButtontext,
            ]}
          >
            Expenditure
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            transactionType === "Transfer" && styles.selectedButton,
          ]}
          onPress={() => setTransactionType("Transfer")}
        >
          <Text
            style={[
              styles.buttonText,
              transactionType === "Transfer" && styles.selectedButtontext,
            ]}
          >
            Transfer
          </Text>
        </TouchableOpacity>
      </View>
      {transactionType === "Expenditure" && (
        <ExpenditureForm
          navigation={navigation}
          form={form}
          handleInputChange={handleInputChange}
          storeData
        />
      )}
      {transactionType === "Income" && (
        <IncomeForm
          navigation={navigation}
          form={form}
          handleInputChange={handleInputChange}
          storeData
        />
      )}
      {transactionType === "Transfer" && (
        <TransferForm
          navigation={navigation}
          form={form}
          handleInputChange={handleInputChange}
          storeData
        />
      )}

      <Button
        onPress={() =>
          // alert(
          //   `${form.amount}, ${form.account}, ${form.category}, ${
          //     form.title
          //   }, ${form.date.toLocaleDateString()}, ${form.note}`
          // )
          storeData()
        }
        title="Save"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#FF9986",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: "#FF6347",
  },
  selectedButtontext: {
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
  },
  formGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  label: {
    flex: 2,
    fontSize: 16,
    color: "#808080",
  },
  input: {
    flex: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
  },
});
