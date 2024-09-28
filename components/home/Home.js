import { useCallback, useEffect, useState } from "react";
import { SectionList, View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateButtonGroup from "../common/DateButtonGroup";
import ViewTransactions from "./ViewTransactions";
import { DATE_PERIODS } from "../../constants/constants";
import ViewTotalTransactions from "./ViewTotalTransactions";

export default function Home({ route, navigation, newId, setNewId }) {
  [dataState, setDataState] = useState([]);
  [currentDataState, setCurrentDataState] = useState([]);
  [keysState, setKeysState] = useState([]);
  [isLoading, setIsLoading] = useState(true);
  [dateSelection, setDateSelection] = useState(DATE_PERIODS.TODAY);
  [totalExpenditure, setTotalExpenditure] = useState(0);
  [totalIncome, setTotalIncome] = useState(0);

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
        existingGroup.totalAmount += Number.parseInt(transaction.amount);
      } else {
        allData.push({
          date: transaction.date,
          displayDate: transaction.displayDate,
          id: transaction.id,
          transactions: [transaction],
          totalAmount: Number.parseInt(transaction.amount),
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
        totalAmount: Number.parseInt(newTransaction.amount),
      };
      var newDataState = [...dataState, newTransactionGroup];
      newDataState.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDataState(newDataState);
    } else {
      transactionGroup.transactions.push(newTransaction);
      transactionGroup.totalAmount += Number.parseInt(newTransaction.amount);

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
        const today = new Date();
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

      dateSelectedTransactions = dataState.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= firstDayOfWeek && itemDate <= lastDayOfWeek;
      });
    } else if (dateSelection === DATE_PERIODS.MONTH) {
      // const today = new Date();
      const currentMonth = today.getMonth(); // Current month (0-11)
      const currentYear = today.getFullYear(); // Current year

      dateSelectedTransactions = dataState.filter((item) => {
        const itemDate = new Date(item.date); // Convert the date string back to a Date object
        const itemMonth = itemDate.getMonth(); // Get the month (0-11)
        const itemYear = itemDate.getFullYear(); // Get the year
        // Check if the item date is in the same month and year as today
        return itemMonth === currentMonth && itemYear === currentYear;
      });
    } else if (dateSelection === DATE_PERIODS.YEAR) {
      const today = new Date();
      const currentYear = today.getFullYear(); // Get the current year

      dateSelectedTransactions = dataState.filter((item) => {
        const itemDate = new Date(item.date); // Convert the date string back to a Date object
        const itemYear = itemDate.getFullYear(); // Extract the year

        // Check if the item's year is the same as the current year
        return itemYear === currentYear;
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

    await AsyncStorage.removeItem(
      "Sat Sep 28 2024 20:11:23 GMT+0530_130c6ef4-7f8e-4cbc-a927-3898eebaa88d"
    );
  }

  const loadData = async () => {
    console.log(isLoading);

    if (dataState.length === 0) {
      await loadInitialData();
      console.log("initial load");
    } else {
      await loadNewData();
      console.log("hot load");
    }
    // await deleteAllData();
    setIsLoading(false);
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
