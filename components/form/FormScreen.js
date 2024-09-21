import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import ExpenditureForm from "./ExpenditureForm";
import IncomeForm from "./IncomeForm";
import TransferForm from "./TransferForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import TransactionTypeButtonGroup from "./TransactionTypeButtonGroup";
import { TRANSACTION_TYPES } from "../../constants/constants";

export default function FormScreen({ route, navigation }) {
  const [transactionType, setTransactionType] = useState("Expenditure");
  const [expenditureForm, setExpenditureForm] = useState({
    amount: "",
    date: new Date(),
    category: "",
    account: "",
    title: "",
    recipient: "",
    note: "",
  });

  const [incomeForm, setIncomeForm] = useState({
    amount: "",
    date: new Date(),
    category: "",
    account: "",
    title: "",
    note: "",
  });

  const [transferForm, setTransferForm] = useState({
    amount: "",
    date: new Date(),
    fromAccount: "",
    toAccount: "",
    title: "",
    recipient: "",
    note: "",
  });

  const handleInputChange = (name, value) => {
    if (transactionType === TRANSACTION_TYPES.EXPENDITURE)
      setExpenditureForm({ ...expenditureForm, [name]: value });
    else if (transactionType === TRANSACTION_TYPES.INCOME)
      setIncomeForm({ ...incomeForm, [name]: value });
    else if (transactionType === TRANSACTION_TYPES.TRANSFER)
      setTransferForm({ ...transferForm, [name]: value });
  };

  function resetForm() {
    setExpenditureForm({
      amount: "",
      date: new Date(),
      category: "",
      account: "",
      title: "",
      recipient: "",
      note: "",
    });
    setIncomeForm({
      amount: "",
      date: new Date(),
      category: "",
      account: "",
      title: "",
      note: "",
    });
    setTransferForm({
      amount: "",
      date: new Date(),
      fromAccount: "",
      toAccount: "",
      title: "",
      recipient: "",
      note: "",
    });
  }

  const storeData = async () => {
    try {
      await AsyncStorage.setItem(uuidv4(), JSON.stringify(expenditureForm));
      alert("Success", "Data stored successfully!");
      resetForm();

      navigation.navigate("Home");
    } catch (error) {
      alert("Error", "Failed to store the data");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TransactionTypeButtonGroup
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />
      {transactionType === TRANSACTION_TYPES.EXPENDITURE && (
        <ExpenditureForm
          navigation={navigation}
          form={expenditureForm}
          handleInputChange={handleInputChange}
          storeData
        />
      )}
      {transactionType === TRANSACTION_TYPES.INCOME && (
        <IncomeForm
          navigation={navigation}
          form={expenditureForm}
          handleInputChange={handleInputChange}
          storeData
        />
      )}
      {transactionType === TRANSACTION_TYPES.TRANSFER && (
        <TransferForm
          navigation={navigation}
          form={expenditureForm}
          handleInputChange={handleInputChange}
          storeData
        />
      )}

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={() => storeData()}>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            resetForm();
            navigation.navigate("Home");
          }}
        >
          <Text>Discard</Text>
        </TouchableOpacity>
      </View>
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
    borderColor: "#FF9986",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
