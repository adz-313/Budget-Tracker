import { useEffect, useState, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormScreen from "@components/form/FormScreen";
import SelectCategoriesScreen from "@components/common/SelectCategoriesScreen";
import SelectAccountsScreen from "@components/common/SelectAccountsScreen";
import { useFocusEffect } from "@react-navigation/native";
import { TRANSACTION_TYPES, SCREENS } from "@src/constants/constants";
import { FormStackParamList } from "@src/types/navigation/types";
import { FormStackProps } from "@src/types/form/types";
import { Transaction, Transfer } from "@src/types/common/types";

export default function Form({
  route,
  navigation,
  newTransactionId,
  setNewTransactionId,
  existingTransactionId,
  setExistingTransactionId,
  isFormTouched,
  setIsFormTouched,
}: FormStackProps) {
  const [isInEditMode, setIsInEditMode] = useState(false);

  const [selectedTransactionType, setSelectedTransactionType] = useState(
    TRANSACTION_TYPES.EXPENDITURE
  );

  const [transactionForm, setTransactionForm] = useState<Transaction>({
    id: "",
    transactionType: TRANSACTION_TYPES.EXPENDITURE,
    category: "",
    date: new Date(),
    title: "",
    accountName: "",
    amount: 0,
    displayDate: "",
    note: "",
  });

  const [transferForm, setTransferForm] = useState<Transfer>({
    id: "",
    transactionType: TRANSACTION_TYPES.TRANSFER,
    amount: 0,
    date: new Date(),
    displayDate: "",
    fromAccount: "",
    toAccount: "",
    title: "",
    note: "",
  });

  const handleInputChange = (name: string, value: string | number | Date) => {
    setIsFormTouched(true);
    if (selectedTransactionType === TRANSACTION_TYPES.EXPENDITURE)
      setTransactionForm({ ...transactionForm, [name]: value });
    else if (selectedTransactionType === TRANSACTION_TYPES.INCOME)
      setTransactionForm({ ...transactionForm, [name]: value });
    // else if (transactionType === TRANSACTION_TYPES.TRANSFER)
    // setTransferForm({ ...transferForm, [name]: value });
  };

  function resetForm() {
    setTransactionForm({
      id: "",
      transactionType: TRANSACTION_TYPES.EXPENDITURE,
      category: "",
      date: new Date(),
      title: "",
      accountName: "",
      amount: 0,
      displayDate: "",
      note: "",
    });
    setTransferForm({
      id: "",
      transactionType: TRANSACTION_TYPES.TRANSFER,
      amount: 0,
      date: new Date(),
      displayDate: "",
      fromAccount: "",
      toAccount: "",
      title: "",
      note: "",
    });
    setExistingTransactionId("");
    // setNewTransactionId(null);
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
    const deletedTransactionId = existingTransactionId;
    setNewTransactionId(deletedTransactionId);
    setExistingTransactionId("");
    setIsFormTouched(false);
    setIsInEditMode(false);
    navigation.navigate(SCREENS.HOME_PAGE);
  };

  async function loadData() {
    const transactionString: string | null = await AsyncStorage.getItem(
      existingTransactionId
    );
    setIsFormTouched(true);
    setIsInEditMode(true);

    if (transactionString === null) return;

    const transaction: Transaction = JSON.parse(transactionString);
    if (transaction.transactionType === TRANSACTION_TYPES.EXPENDITURE) {
      setSelectedTransactionType(TRANSACTION_TYPES.EXPENDITURE);
      setTransactionForm({
        id: transaction.id,
        transactionType: TRANSACTION_TYPES.EXPENDITURE,
        amount: transaction.amount,
        date: new Date(transaction.date),
        displayDate: new Date(transaction.date).toLocaleDateString(),
        category: transaction.category,
        accountName: transaction.accountName,
        title: transaction.title,
        note: transaction.note,
      });
    } else if (transaction.transactionType === TRANSACTION_TYPES.INCOME) {
      setSelectedTransactionType(TRANSACTION_TYPES.INCOME);
      setTransactionForm({
        id: transaction.id,
        transactionType: TRANSACTION_TYPES.INCOME,
        amount: transaction.amount,
        date: new Date(transaction.date),
        displayDate: new Date(transaction.date).toLocaleDateString(),
        category: transaction.category,
        accountName: transaction.accountName,
        title: transaction.title,
        note: transaction.note,
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (existingTransactionId === "") return;
      loadData();
    }, [existingTransactionId])
  );

  const Stack = createNativeStackNavigator<FormStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.NEW_TRANSACTION_SCREEN}
        options={{ headerTitle: "New Entry" }}
      >
        {(props) => (
          <FormScreen
            {...props}
            rootNavigation={navigation}
            setNewTransactionId={setNewTransactionId}
            transactionForm={transactionForm}
            transferForm={transferForm}
            handleInputChange={handleInputChange}
            resetForm={resetForm}
            selectedTransactionType={selectedTransactionType}
            setSelectedTransactionType={setSelectedTransactionType}
            isInEditMode={isInEditMode}
            setIsInEditMode={setIsInEditMode}
            deleteData={deleteData}
            setExistingTransactionId={setExistingTransactionId}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name={SCREENS.SELECT_CATEGORIES_SCREEN}>
        {(props) => (
          <SelectCategoriesScreen
            {...props}
            handleInputChange={handleInputChange}
            transactionType={selectedTransactionType}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name={SCREENS.SELECT_ACCOUNTS_SCREEN}>
        {(props) => (
          <SelectAccountsScreen
            {...props}
            handleInputChange={handleInputChange}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
