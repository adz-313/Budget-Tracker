import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import DateButtonGroup from "../common/DateButtonGroup";
import ViewTransactions from "./ViewTransactions";
import { DATE_PERIODS, SCREENS } from "../../constants/constants";

export default function Home({
  route,
  navigation,
  newId,
  setNewId,
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
        existingGroup.totalAmount += transaction.amount;
      } else {
        allData.push({
          date: transaction.date,
          displayDate: transaction.displayDate,
          id: transaction.id,
          transactions: [transaction],
          totalAmount: transaction.amount,
        });
      }
      return allData;
    }, dataState);

    setDataState(groupedData);

    setNewId(null);
  }

  async function loadNewData() {
    if (newId === null) return;

    setKeysState([...keysState, newId]);

    var newTransaction = await AsyncStorage.getItem(newId);
    newTransaction = JSON.parse(newTransaction);
    newTransaction.displayDate = new Date(
      newTransaction.date
    ).toLocaleDateString();
    newTransaction.id = newId;

    var transactionGroup = dataState.find(
      (transaction) => transaction.displayDate === newTransaction.displayDate
    );

    if (!transactionGroup) {
      var newTransactionGroup = {
        date: newTransaction.date,
        displayDate: newTransaction.displayDate,
        transactions: [newTransaction],
        id: newTransaction.id,
        totalAmount: newTransaction.amount,
      };
      var newDataState = [...dataState, newTransactionGroup];
      newDataState.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDataState(newDataState);
    } else {
      transactionGroup.transactions.push(newTransaction);
      transactionGroup.totalAmount += newTransaction.amount;

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

    var dateSelectedTotalExpenditure = 0;
    dateSelectedTransactions.map(
      (transactionGroup) =>
        (dateSelectedTotalExpenditure += transactionGroup.totalAmount)
    );

    setTotalExpenditure(dateSelectedTotalExpenditure);
  }

  async function deleteAllData() {
    const allKeys = await AsyncStorage.getAllKeys();
    console.log(allKeys);
    await AsyncStorage.multiRemove(allKeys);
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
          dataState={currentDataState}
          totalExpenditure={totalExpenditure}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
