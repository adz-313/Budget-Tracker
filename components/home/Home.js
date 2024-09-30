import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import DateButtonGroup from "../common/DateButtonGroup";
import ViewTransactions from "./ViewTransactions";
import {
  DATE_PERIODS,
  FORM_FIELDS,
  SCREENS,
  TRANSACTION_TYPES,
} from "../../constants/constants";

export default function Home({
  route,
  navigation,
  newId,
  setNewId,
  existingTransactionId,
  setExistingTransactionId,
  isFormTouched,
  setIsFormTouched,
}) {
  [dataState, setDataState] = useState([]);
  [currentDataState, setCurrentDataState] = useState([]);
  [keysState, setKeysState] = useState([]);
  [isLoading, setIsLoading] = useState(true);
  [dateSelection, setDateSelection] = useState(DATE_PERIODS.TODAY);
  [totalExpenditure, setTotalExpenditure] = useState(0);
  [totalIncome, setTotalIncome] = useState(0);

  // prevent going to this tab if the form content is changed
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      if (!isFormTouched) {
        return;
      }
      e.preventDefault();
      Alert.alert(
        "Unsaved Changes",
        "You have unsaved changes. Are you sure you want to leave the form?",
        [
          { text: "Cancel", style: "cancel", onPress: () => {} },
          {
            text: "Leave",
            style: "destructive",
            onPress: () => {
              setIsFormTouched(false);
              navigation.navigate(SCREENS.HOME);
            },
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation, isFormTouched, setIsFormTouched]);

  async function loadInitialData() {
    const allKeys = await AsyncStorage.getAllKeys();

    setKeysState(allKeys);

    var allTransactions = await AsyncStorage.multiGet(allKeys);

    allTransactions = allTransactions.map(([id, jsonString]) => {
      var jsonObj = JSON.parse(jsonString);
      jsonObj.displayDate = new Date(jsonObj.date).toLocaleDateString();
      return {
        id,
        ...jsonObj,
      };
    });

    const groupedData = allTransactions.reduce((allData, transaction) => {
      const existingGroup = allData.find(
        (group) => group.displayDate === transaction.displayDate
      );
      if (existingGroup) {
        existingGroup.transactions.push(transaction);
        existingGroup.totalExpenditure +=
          transaction.type === TRANSACTION_TYPES.EXPENDITURE
            ? transaction.amount
            : 0;
        existingGroup.totalIncome +=
          transaction.type === TRANSACTION_TYPES.INCOME
            ? transaction.amount
            : 0;
      } else {
        allData.push({
          date: transaction.date,
          displayDate: transaction.displayDate,
          id: transaction.id,
          transactions: [transaction],
          totalExpenditure:
            transaction.type === TRANSACTION_TYPES.EXPENDITURE
              ? transaction.amount
              : 0,
          totalIncome:
            transaction.type === TRANSACTION_TYPES.INCOME
              ? transaction.amount
              : 0,
        });
      }
      return allData;
    }, dataState);

    setDataState(groupedData);

    setNewId(null);
  }

  async function loadNewData() {
    if (newId === null) return;

    // read new transaction and convert into js object
    var newTransaction = await AsyncStorage.getItem(newId);

    if (!newTransaction) {
      const updatedDataState = dataState
        .map((transactionGroup) => {
          return {
            ...transactionGroup,
            transactions: transactionGroup.transactions.filter(
              (transaction) => transaction.id !== newId
            ),
          };
        })
        .filter(
          (transactionGroup) => transactionGroup.transactions.length !== 0
        );

      const oldTransaction = dataState.map((transactionGroup) =>
        transactionGroup.transactions.find(
          (transaction) => newId === transaction.id
        )
      )[0];

      updatedDataState.map((transactionGroup) => {
        if (oldTransaction[FORM_FIELDS.TYPE] === TRANSACTION_TYPES.EXPENDITURE)
          transactionGroup.totalExpenditure -= oldTransaction.amount;
        else if (oldTransaction[FORM_FIELDS.TYPE] === TRANSACTION_TYPES.INCOME)
          transactionGroup.totalIncome -= oldTransaction.amount;
      });

      setDataState(updatedDataState);
      setNewId(null);
      return;
    }

    newTransaction = JSON.parse(newTransaction);
    newTransaction.displayDate = new Date(
      newTransaction.date
    ).toLocaleDateString();
    newTransaction.id = newId;

    // check if id is already present
    var newIdPresent = keysState.includes(newId);
    if (newIdPresent) {
      var transactionGroup = dataState.find(
        (transaction) => transaction.displayDate === newTransaction.displayDate
      );

      const oldTransaction = transactionGroup.transactions.find(
        (transaction) => transaction.id === newTransaction.id
      );

      transactionGroup.transactions = transactionGroup.transactions.filter(
        (transaction) => transaction.id !== newTransaction.id
      );
      if (newTransaction.type === TRANSACTION_TYPES.EXPENDITURE) {
        transactionGroup.totalExpenditure -= oldTransaction.amount;
        transactionGroup.totalExpenditure += newTransaction.amount;
      } else if (newTransaction.type === TRANSACTION_TYPES.INCOME) {
        transactionGroup.totalIncome -= oldTransaction.amount;
        transactionGroup.totalIncome += newTransaction.amount;
      }

      transactionGroup.transactions.push(newTransaction);

      var filteredData = dataState.filter(
        (transaction) => transaction.displayDate !== newTransaction.displayDate
      );

      var newDataState = [...filteredData, transactionGroup];
      newDataState.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDataState(newDataState);
      setNewId(null);
      return;
    }

    setKeysState([...keysState, newId]);

    var transactionGroup = dataState.find(
      (transaction) => transaction.displayDate === newTransaction.displayDate
    );

    if (!transactionGroup) {
      var newTransactionGroup = {
        date: newTransaction.date,
        displayDate: newTransaction.displayDate,
        transactions: [newTransaction],
        id: newTransaction.id,
        totalExpenditure:
          newTransaction.type === TRANSACTION_TYPES.EXPENDITURE
            ? newTransaction.amount
            : 0,
        totalIncome:
          newTransaction.type === TRANSACTION_TYPES.INCOME
            ? newTransaction.amount
            : 0,
      };
      var newDataState = [...dataState, newTransactionGroup];
      newDataState.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDataState(newDataState);
    } else {
      transactionGroup.transactions.push(newTransaction);
      transactionGroup.totalExpenditure +=
        newTransaction.type === TRANSACTION_TYPES.EXPENDITURE
          ? newTransaction.amount
          : 0;
      transactionGroup.totalIncome +=
        newTransaction.type === TRANSACTION_TYPES.INCOME
          ? newTransaction.amount
          : 0;

      var filteredData = dataState.filter(
        (transaction) => transaction.displayDate !== newTransaction.displayDate
      );

      var newDataState = [...filteredData, transactionGroup];
      newDataState.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDataState(newDataState);
    }

    setNewId(null);
  }

  function reloadDataOnDateSelectionChange() {
    const today = new Date();

    var dateSelectedTransactions = [];
    if (dateSelection === DATE_PERIODS.TODAY) {
      dateSelectedTransactions = dataState.filter(
        (transactionGroup) =>
          new Date(transactionGroup.date).getDate() === today.getDate()
      );
    } else if (dateSelection === DATE_PERIODS.WEEK) {
      const getCurrentWeekRange = () => {
        const firstDayOfWeek = new Date(
          today.setDate(today.getDate() - today.getDay())
        );
        const lastDayOfWeek = new Date(
          today.setDate(firstDayOfWeek.getDate() + 6)
        );

        firstDayOfWeek.setHours(0, 0, 0, 0);
        lastDayOfWeek.setHours(23, 59, 59, 999);

        return { firstDayOfWeek, lastDayOfWeek };
      };
      const { firstDayOfWeek, lastDayOfWeek } = getCurrentWeekRange();
      dateSelectedTransactions = dataState.filter((transactionGroup) => {
        const date = new Date(transactionGroup.date);
        return date >= firstDayOfWeek && date <= lastDayOfWeek;
      });
    } else if (dateSelection === DATE_PERIODS.MONTH) {
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      dateSelectedTransactions = dataState.filter((transactionGroup) => {
        const date = new Date(transactionGroup.date);
        const month = date.getMonth();
        const year = date.getFullYear();
        return month === currentMonth && year === currentYear;
      });
    } else if (dateSelection === DATE_PERIODS.YEAR) {
      const currentYear = today.getFullYear();

      dateSelectedTransactions = dataState.filter((transactionGroup) => {
        const date = new Date(transactionGroup.date);
        const year = date.getFullYear();

        return year === currentYear;
      });
    }

    dateSelectedTransactions.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setCurrentDataState(dateSelectedTransactions);

    var totalExpenditureTemp = 0;
    var totalIncomeTemp = 0;

    dateSelectedTransactions.map((transactionGroup) => {
      totalExpenditureTemp += transactionGroup.totalExpenditure;
      totalIncomeTemp += transactionGroup.totalIncome;
    });

    setTotalExpenditure(totalExpenditureTemp);
    setTotalIncome(totalIncomeTemp);
  }

  async function deleteAllData() {
    const allKeys = await AsyncStorage.getAllKeys();
    console.log(allKeys);
    // await AsyncStorage.multiRemove(allKeys);
  }

  const loadData = async () => {
    if (dataState.length === 0) {
      await loadInitialData();
    } else {
      await loadNewData();
    }
    setIsLoading(false);
    // await deleteAllData();
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
      reloadDataOnDateSelectionChange();
    }, [newId, isLoading, dateSelection])
  );

  return (
    <View>
      <DateButtonGroup
        dateSelection={dateSelection}
        setDateSelection={setDateSelection}
      />
      {isLoading ? (
        <View style={styles.center}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <ViewTransactions
          navigation={navigation}
          dataState={currentDataState}
          setNewId={setNewId}
          setExistingTransactionId={setExistingTransactionId}
          totalExpenditure={totalExpenditure}
          totalIncome={totalIncome}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
  },
});
