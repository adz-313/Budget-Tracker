import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import ExpenditureForm from "./ExpenditureForm";
import IncomeForm from "./IncomeForm";
import TransferForm from "./TransferForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import TransactionTypeButtonGroup from "./TransactionTypeButtonGroup";
import {
  FORM_FIELDS,
  SCREENS,
  TRANSACTION_TYPES,
} from "../../constants/constants";

export default function FormScreen({
  route,
  navigation,
  setNewId,
  incomeForm,
  expenditureForm,
  transferForm,
  handleInputChange,
  resetForm,
  transactionType,
  setTransactionType,
}) {
  const submitForm = async () => {
    try {
      var id = null;
      if (transactionType === TRANSACTION_TYPES.EXPENDITURE) {
        id = await storeData(expenditureForm, "Expenditure");
      } else if (transactionType === TRANSACTION_TYPES.INCOME) {
        id = await storeData(incomeForm, "Income");
      } else if (transactionType === TRANSACTION_TYPES.TRANSFER) {
        id = await storeData(transferForm, "Transfer");
      }
      if (id === null) return;
      setNewId(id);
      resetForm();
      navigation.navigate(SCREENS.HOME);
    } catch (error) {
      alert("Error", "Failed to store the data");
    }
  };

  async function storeData(form, placeholderTitle) {
    if (
      form[FORM_FIELDS.AMOUNT] === "" ||
      form[FORM_FIELDS.CATEGORY] === "" ||
      form[FORM_FIELDS.ACCOUNT] === ""
    ) {
      Alert.alert("Error", "Please fill the required fields first.");
      return null;
    }

    if (form[FORM_FIELDS.TITLE] === "") {
      form[FORM_FIELDS.TITLE] = placeholderTitle;
    }

    const id = form[FORM_FIELDS.DATE] + "_" + uuidv4();
    await AsyncStorage.setItem(id, JSON.stringify(form));
    return id;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TransactionTypeButtonGroup
        resetForm={resetForm}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />
      {transactionType === TRANSACTION_TYPES.EXPENDITURE && (
        <ExpenditureForm
          navigation={navigation}
          form={expenditureForm}
          handleInputChange={handleInputChange}
        />
      )}
      {transactionType === TRANSACTION_TYPES.INCOME && (
        <IncomeForm
          navigation={navigation}
          form={incomeForm}
          handleInputChange={handleInputChange}
        />
      )}
      {transactionType === TRANSACTION_TYPES.TRANSFER && (
        <TransferForm
          navigation={navigation}
          form={transferForm}
          handleInputChange={handleInputChange}
        />
      )}

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={() => submitForm()}>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert(
              "Unsaved Changes",
              "You have unsaved changes. Are you sure you want to leave the form?",
              [
                { text: "Cancel", style: "cancel", onPress: () => {} },
                {
                  text: "Leave",
                  style: "destructive",
                  onPress: () => {
                    resetForm();
                    navigation.navigate(SCREENS.HOME);
                  },
                },
              ]
            );
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
