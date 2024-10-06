import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import ExpenditureForm from "@components/form/ExpenditureForm";
import IncomeForm from "@components/form/IncomeForm";
import TransferForm from "@components/form/TransferForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
// this random value import is used for uuid to work
import "react-native-get-random-values";
import TransactionTypeButtonGroup from "./TransactionTypeButtonGroup";
import { FORM_FIELDS, SCREENS, TRANSACTION_TYPES } from "@constants/constants";
import { Transaction, Transfer } from "@src/types/common/types";
import { FormScreenProps } from "@src/types/form/types";

export default function FormScreen({
  route,
  navigation,
  rootNavigation,
  setNewTransactionId,
  transactionForm,
  transferForm,
  handleInputChange,
  resetForm,
  selectedTransactionType,
  setSelectedTransactionType,
  isInEditMode,
  setIsInEditMode,
  deleteData,
  setExistingTransactionId,
}: FormScreenProps) {
  const submitForm = async () => {
    try {
      let id: string = "";
      if (selectedTransactionType === TRANSACTION_TYPES.EXPENDITURE) {
        transactionForm.transactionType = TRANSACTION_TYPES.EXPENDITURE;
        id = await storeTransactionData(transactionForm, "Expenditure");
      } else if (selectedTransactionType === TRANSACTION_TYPES.INCOME) {
        transactionForm.transactionType = TRANSACTION_TYPES.INCOME;
        id = await storeTransactionData(transactionForm, "Income");
      } else if (selectedTransactionType === TRANSACTION_TYPES.TRANSFER) {
        id = await storeTransferData(transferForm, "Transfer");
      }
      if (id === "") return;
      setNewTransactionId(id);
      resetForm();
      rootNavigation.navigate(SCREENS.HOME_PAGE);
    } catch (error) {
      Alert.alert("Error", "Failed to store the data");
    }
  };

  async function storeTransactionData(
    form: Transaction,
    placeholderTitle: string
  ) {
    if (
      form[FORM_FIELDS.AMOUNT] === 0 ||
      form[FORM_FIELDS.CATEGORY] === "" ||
      form[FORM_FIELDS.ACCOUNT_NAME] === ""
    ) {
      Alert.alert("Error", "Please fill the required fields first.");
      return "";
    }

    if (form[FORM_FIELDS.TITLE] === "") {
      form[FORM_FIELDS.TITLE] = placeholderTitle;
    }

    let newTransactionId = form[FORM_FIELDS.ID];
    if (newTransactionId === "") {
      newTransactionId = uuidv4();
      form[FORM_FIELDS.ID] = newTransactionId;
    }
    await AsyncStorage.setItem(newTransactionId, JSON.stringify(form));
    return newTransactionId;
  }

  async function storeTransferData(form: Transfer, placeholderTitle: string) {
    if (
      form[FORM_FIELDS.AMOUNT] === 0 ||
      form[FORM_FIELDS.TO_ACCOUNT] === "" ||
      form[FORM_FIELDS.FROM_ACCOUNT] === ""
    ) {
      Alert.alert("Error", "Please fill the required fields first.");
      return "";
    }

    if (form[FORM_FIELDS.TITLE] === "") {
      form[FORM_FIELDS.TITLE] = placeholderTitle;
    }

    let newTransactionId = form[FORM_FIELDS.ID];
    if (newTransactionId === "") {
      newTransactionId = uuidv4();
      form[FORM_FIELDS.ID] = newTransactionId;
    }
    await AsyncStorage.setItem(newTransactionId, JSON.stringify(form));
    return newTransactionId;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TransactionTypeButtonGroup
        resetForm={resetForm}
        selectedTransactionType={selectedTransactionType}
        setSelectedTransactionType={setSelectedTransactionType}
        isInEditMode={isInEditMode}
      />
      {selectedTransactionType === TRANSACTION_TYPES.EXPENDITURE && (
        <ExpenditureForm
          navigation={navigation}
          form={transactionForm}
          handleInputChange={handleInputChange}
        />
      )}
      {selectedTransactionType === TRANSACTION_TYPES.INCOME && (
        <IncomeForm
          navigation={navigation}
          form={transactionForm}
          handleInputChange={handleInputChange}
        />
      )}
      {selectedTransactionType === TRANSACTION_TYPES.TRANSFER && (
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
                    setExistingTransactionId("");
                    setIsInEditMode(false);
                    rootNavigation.navigate(SCREENS.HOME_PAGE);
                  },
                },
              ]
            );
          }}
        >
          <Text>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!isInEditMode}
          style={isInEditMode ? styles.button : styles.buttonDisabled}
          onPress={() => {
            Alert.alert(
              "Delete Transaction",
              "This transaction will be permanently deleted. Do you want to continue?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                  onPress: () => {},
                },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => {
                    // resetForm();
                    // setIsInEditMode(false);
                    // navigation.navigate(SCREENS.HOME);
                    deleteData();
                  },
                },
              ]
            );
          }}
        >
          <Text>Delete</Text>
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
  buttonDisabled: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
