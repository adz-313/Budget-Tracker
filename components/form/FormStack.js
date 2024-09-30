import { useEffect, useState, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormScreen from "./FormScreen";
import CategoriesScreen from "../common/CategoriesScreen";
import AccountsScreen from "../common/AccountsScreen";
import { useFocusEffect } from "@react-navigation/native";
import {
  FORM_FIELDS,
  TRANSACTION_TYPES,
  SCREENS,
} from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FormStack({
  route,
  navigation,
  newId,
  setNewId,
  existingTransactionId,
  setExistingTransactionId,
  isFormTouched,
  setIsFormTouched,
}) {
  const [isInEditMode, setIsInEditMode] = useState(false);

  const [transactionType, setTransactionType] = useState(
    TRANSACTION_TYPES.EXPENDITURE
  );

  const [expenditureForm, setExpenditureForm] = useState({
    [FORM_FIELDS.ID]: "",
    [FORM_FIELDS.TYPE]: TRANSACTION_TYPES.EXPENDITURE,
    [FORM_FIELDS.AMOUNT]: "",
    [FORM_FIELDS.DATE]: new Date(),
    [FORM_FIELDS.CATEGORY]: "",
    [FORM_FIELDS.ACCOUNT]: "",
    [FORM_FIELDS.TITLE]: "",
    [FORM_FIELDS.RECIPIENT]: "",
    [FORM_FIELDS.NOTE]: "",
  });

  const [incomeForm, setIncomeForm] = useState({
    [FORM_FIELDS.ID]: "",
    [FORM_FIELDS.TYPE]: TRANSACTION_TYPES.INCOME,
    [FORM_FIELDS.AMOUNT]: "",
    [FORM_FIELDS.DATE]: new Date(),
    [FORM_FIELDS.CATEGORY]: "",
    [FORM_FIELDS.ACCOUNT]: "",
    [FORM_FIELDS.TITLE]: "",
    [FORM_FIELDS.NOTE]: "",
  });

  const [transferForm, setTransferForm] = useState({
    [FORM_FIELDS.ID]: "",
    [FORM_FIELDS.TYPE]: TRANSACTION_TYPES.TRANSFER,
    [FORM_FIELDS.AMOUNT]: "",
    [FORM_FIELDS.DATE]: new Date(),
    [FORM_FIELDS.FROM_ACCOUNT]: "",
    [FORM_FIELDS.TO_ACCOUNT]: "",
    [FORM_FIELDS.TITLE]: "",
    [FORM_FIELDS.NOTE]: "",
  });

  const handleInputChange = (name, value) => {
    setIsFormTouched(true);
    if (transactionType === TRANSACTION_TYPES.EXPENDITURE)
      setExpenditureForm({ ...expenditureForm, [name]: value });
    else if (transactionType === TRANSACTION_TYPES.INCOME)
      setIncomeForm({ ...incomeForm, [name]: value });
    else if (transactionType === TRANSACTION_TYPES.TRANSFER)
      setTransferForm({ ...transferForm, [name]: value });
  };

  function resetForm() {
    setExpenditureForm({
      [FORM_FIELDS.ID]: "",
      [FORM_FIELDS.TYPE]: TRANSACTION_TYPES.EXPENDITURE,
      [FORM_FIELDS.AMOUNT]: "",
      [FORM_FIELDS.DATE]: new Date(),
      [FORM_FIELDS.CATEGORY]: "",
      [FORM_FIELDS.ACCOUNT]: "",
      [FORM_FIELDS.TITLE]: "",
      [FORM_FIELDS.RECIPIENT]: "",
      [FORM_FIELDS.NOTE]: "",
    });
    setIncomeForm({
      [FORM_FIELDS.ID]: "",
      [FORM_FIELDS.TYPE]: TRANSACTION_TYPES.INCOME,
      [FORM_FIELDS.AMOUNT]: "",
      [FORM_FIELDS.DATE]: new Date(),
      [FORM_FIELDS.CATEGORY]: "",
      [FORM_FIELDS.ACCOUNT]: "",
      [FORM_FIELDS.TITLE]: "",
      [FORM_FIELDS.NOTE]: "",
    });
    setTransferForm({
      [FORM_FIELDS.ID]: "",
      [FORM_FIELDS.TYPE]: TRANSACTION_TYPES.TRANSFER,
      [FORM_FIELDS.AMOUNT]: "",
      [FORM_FIELDS.DATE]: new Date(),
      [FORM_FIELDS.FROM_ACCOUNT]: "",
      [FORM_FIELDS.TO_ACCOUNT]: "",
      [FORM_FIELDS.TITLE]: "",
      [FORM_FIELDS.NOTE]: "",
    });
    setExistingTransactionId(null);
    // setNewId(null);
    setIsFormTouched(false);
    setIsInEditMode(false);
  }

  useEffect(() => {
    if (!isFormTouched) {
      resetForm();
    }
  }, [isFormTouched]);

  const deleteData = async () => {
    if (!isInEditMode || existingTransactionId === null) return;
    await AsyncStorage.removeItem(existingTransactionId);
    setNewId(existingTransactionId);
    setExistingTransactionId(null);
    setIsFormTouched(false);
    setIsInEditMode(false);
    navigation.navigate(SCREENS.HOME);
  };

  async function loadData() {
    const transactionString = await AsyncStorage.getItem(existingTransactionId);
    setIsFormTouched(true);
    setIsInEditMode(true);
    const transaction = JSON.parse(transactionString);
    if (transaction.type === TRANSACTION_TYPES.EXPENDITURE) {
      setTransactionType(TRANSACTION_TYPES.EXPENDITURE);
      setExpenditureForm({
        [FORM_FIELDS.ID]: transaction.id,
        [FORM_FIELDS.TYPE]: TRANSACTION_TYPES.EXPENDITURE,
        amount: transaction.amount,
        [FORM_FIELDS.DATE]: new Date(transaction.date),
        [FORM_FIELDS.CATEGORY]: transaction.category,
        [FORM_FIELDS.ACCOUNT]: transaction.account,
        [FORM_FIELDS.TITLE]: transaction.title,
        [FORM_FIELDS.RECIPIENT]: "",
        [FORM_FIELDS.NOTE]: transaction.note,
      });
    } else if (transaction.type === TRANSACTION_TYPES.INCOME) {
      setTransactionType(TRANSACTION_TYPES.INCOME);
      setIncomeForm({
        [FORM_FIELDS.ID]: transaction.id,
        [FORM_FIELDS.TYPE]: TRANSACTION_TYPES.INCOME,
        amount: transaction.amount,
        [FORM_FIELDS.DATE]: new Date(transaction.date),
        [FORM_FIELDS.CATEGORY]: transaction.category,
        [FORM_FIELDS.ACCOUNT]: transaction.account,
        [FORM_FIELDS.TITLE]: transaction.title,
        [FORM_FIELDS.NOTE]: transaction.note,
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (existingTransactionId === null) return;
      loadData();
    }, [existingTransactionId])
  );

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.NEW_TRANSACTION}
        options={{ headerTitle: "New Entry" }}
      >
        {(props) => (
          <FormScreen
            {...props}
            setNewId={setNewId}
            incomeForm={incomeForm}
            expenditureForm={expenditureForm}
            transferForm={transferForm}
            handleInputChange={handleInputChange}
            resetForm={resetForm}
            transactionType={transactionType}
            setTransactionType={setTransactionType}
            isInEditMode={isInEditMode}
            setIsInEditMode={setIsInEditMode}
            deleteData={deleteData}
            setExistingTransactionId={setExistingTransactionId}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name={SCREENS.CATEGORIES}>
        {(props) => (
          <CategoriesScreen
            {...props}
            handleInputChange={handleInputChange}
            transactionType={transactionType}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name={SCREENS.ACCOUNTS}>
        {(props) => (
          <AccountsScreen {...props} handleInputChange={handleInputChange} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
