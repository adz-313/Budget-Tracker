import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormScreen from "./FormScreen";
import CategoriesScreen from "../common/CategoriesScreen";
import AccountsScreen from "../common/AccountsScreen";
import {
  FORM_FIELDS,
  TRANSACTION_TYPES,
  SCREENS,
} from "../../constants/constants";

export default function FormStack({
  navigation,
  setNewId,
  isFormTouched,
  setIsFormTouched,
}) {
  const [transactionType, setTransactionType] = useState(
    TRANSACTION_TYPES.EXPENDITURE
  );

  const [expenditureForm, setExpenditureForm] = useState({
    [FORM_FIELDS.AMOUNT]: "",
    [FORM_FIELDS.DATE]: new Date(),
    [FORM_FIELDS.CATEGORY]: "",
    [FORM_FIELDS.ACCOUNT]: "",
    [FORM_FIELDS.TITLE]: "",
    [FORM_FIELDS.RECIPIENT]: "",
    [FORM_FIELDS.NOTE]: "",
  });

  const [incomeForm, setIncomeForm] = useState({
    [FORM_FIELDS.AMOUNT]: "",
    [FORM_FIELDS.DATE]: new Date(),
    [FORM_FIELDS.CATEGORY]: "",
    [FORM_FIELDS.ACCOUNT]: "",
    [FORM_FIELDS.TITLE]: "",
    [FORM_FIELDS.NOTE]: "",
  });

  const [transferForm, setTransferForm] = useState({
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
      [FORM_FIELDS.AMOUNT]: "",
      [FORM_FIELDS.DATE]: new Date(),
      [FORM_FIELDS.CATEGORY]: "",
      [FORM_FIELDS.ACCOUNT]: "",
      [FORM_FIELDS.TITLE]: "",
      [FORM_FIELDS.RECIPIENT]: "",
      [FORM_FIELDS.NOTE]: "",
    });
    setIncomeForm({
      [FORM_FIELDS.AMOUNT]: "",
      [FORM_FIELDS.DATE]: new Date(),
      [FORM_FIELDS.CATEGORY]: "",
      [FORM_FIELDS.ACCOUNT]: "",
      [FORM_FIELDS.TITLE]: "",
      [FORM_FIELDS.NOTE]: "",
    });
    setTransferForm({
      [FORM_FIELDS.AMOUNT]: "",
      [FORM_FIELDS.DATE]: new Date(),
      [FORM_FIELDS.FROM_ACCOUNT]: "",
      [FORM_FIELDS.TO_ACCOUNT]: "",
      [FORM_FIELDS.TITLE]: "",
      [FORM_FIELDS.NOTE]: "",
    });
    setIsFormTouched(false);
  }

  useEffect(() => {
    if (!isFormTouched) {
      resetForm();
    }
  }, [isFormTouched]);

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
