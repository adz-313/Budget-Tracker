import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
// this random value import is used for uuid to work
import "react-native-get-random-values";
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";
import { Transaction, TransactionGroup } from "@src/types/common/types";
import {
  DATE_PERIODS,
  FORM_FIELDS,
  TRANSACTION_TYPES,
} from "@constants/constants";

export async function loadInitialData(
  setKeysState: (keysState: string[]) => void,
  setDataState: (dataState: TransactionGroup[]) => void
) {
  const allKeys: string[] = [...(await AsyncStorage.getAllKeys())];

  setKeysState(allKeys);

  let allTransactionsJSON: readonly KeyValuePair[] =
    await AsyncStorage.multiGet(allKeys);

  let allTransactions: (Transaction | undefined)[] = allTransactionsJSON.map(
    ([id, jsonString]) => {
      if (jsonString !== null) {
        let jsonObj: Transaction = JSON.parse(jsonString);
        jsonObj.displayDate = new Date(jsonObj.date).toLocaleDateString();
        return {
          ...jsonObj,
          id,
        };
      }
    }
  );

  const groupedData = allTransactions
    .filter((transaction: Transaction | undefined) => transaction !== undefined)
    .reduce((allData: TransactionGroup[], transaction: Transaction) => {
      // if (!transaction) return;

      const existingGroup = allData.find(
        (transactionGroup) =>
          transactionGroup.displayDate === transaction.displayDate
      );
      if (existingGroup) {
        existingGroup.transactions.push(transaction);
        existingGroup.totalExpenditure +=
          transaction.transactionType === TRANSACTION_TYPES.EXPENDITURE
            ? transaction.amount
            : 0;
        existingGroup.totalIncome +=
          transaction.transactionType === TRANSACTION_TYPES.INCOME
            ? transaction.amount
            : 0;
      } else {
        allData.push({
          date: transaction.date,
          displayDate: transaction.displayDate,
          id: transaction.id,
          transactions: [transaction],
          totalExpenditure:
            transaction.transactionType === TRANSACTION_TYPES.EXPENDITURE
              ? transaction.amount
              : 0,
          totalIncome:
            transaction.transactionType === TRANSACTION_TYPES.INCOME
              ? transaction.amount
              : 0,
        });
      }
      return allData;
    }, []);

  setDataState(groupedData);
}

export async function loadNewData(
  newTransactionId: string,
  dataState: TransactionGroup[],
  setDataState: (dataState: TransactionGroup[]) => void,
  keysState: string[],
  setKeysState: (keysState: string[]) => void
) {
  // if newTxnId is empty, return
  if (newTransactionId === "") return;

  // read new transaction into JSON string
  let newTransactionJSON: string | null = await AsyncStorage.getItem(
    newTransactionId
  );

  // if the newTxnJson is empty, the key is not found in the storage so the transaction has been deleted
  // handle txn delete
  if (!newTransactionJSON || newTransactionJSON === null) {
    const updatedDataState = handleTransactionDelete(
      dataState,
      newTransactionId
    );
    setDataState(updatedDataState);
    return;
  }

  // if txn json string is found, convert into a TS object
  let newTransaction: Transaction = JSON.parse(newTransactionJSON);
  newTransaction.displayDate = new Date(
    newTransaction.date
  ).toLocaleDateString();
  newTransaction.id = newTransactionId;

  // if the newTxnId is already present in the keys state, an existing txn has been edited
  let newIdPresent = keysState.includes(newTransactionId);

  // the transaction is edited if newId is already present
  // handle txn edit
  if (newIdPresent) {
    const newDataState = handleTransactionEdit(dataState, newTransaction);
    if (newDataState != null) setDataState(newDataState);
    return;
  }

  // if the newtxnid wasn't found, new txn has been added

  // add the id in keys state
  setKeysState([...keysState, newTransactionId]);

  // handle txn add
  const newDataState: TransactionGroup[] = handleTransactionAdd(
    dataState,
    newTransaction
  );
  setDataState(newDataState);
}

function handleTransactionEdit(
  dataState: TransactionGroup[],
  newTransaction: Transaction
): TransactionGroup[] | null {
  // delete old transaction
  let updatedDataState: TransactionGroup[] = removeTransactionFromGroup(
    dataState,
    newTransaction.id
  );

  updatedDataState = updatedDataState.filter(
    (txngrp) => txngrp.transactions.length > 0
  );

  updatedDataState = handleTransactionAdd(updatedDataState, newTransaction);

  return updatedDataState;
}

function handleTransactionDelete(
  dataState: TransactionGroup[],
  newTransactionId: string
): TransactionGroup[] {
  const updatedDataState: TransactionGroup[] = dataState
    .map((transactionGroup) => {
      return {
        ...transactionGroup,
        transactions: transactionGroup.transactions.filter(
          (transaction) => transaction.id !== newTransactionId
        ),
      };
    })
    .filter(
      (transactionGroup: TransactionGroup) =>
        transactionGroup.transactions.length !== 0
    );

  const oldTransaction = dataState
    .flatMap(
      (transactionGroupIterator: TransactionGroup) =>
        transactionGroupIterator.transactions
    )
    .find((transactionIterator) => transactionIterator.id === newTransactionId);

  if (oldTransaction) {
    updatedDataState.map((transactionGroup) => {
      if (
        oldTransaction[FORM_FIELDS.TRANSACTION_TYPE] ===
        TRANSACTION_TYPES.EXPENDITURE
      )
        transactionGroup.totalExpenditure -= oldTransaction.amount;
      else if (
        oldTransaction[FORM_FIELDS.TRANSACTION_TYPE] ===
        TRANSACTION_TYPES.INCOME
      )
        transactionGroup.totalIncome -= oldTransaction.amount;
    });
  }
  return updatedDataState;
}

function handleTransactionAdd(
  dataState: TransactionGroup[],
  newTransaction: Transaction
): TransactionGroup[] {
  let newDataState: TransactionGroup[];
  let transactionGroup = dataState.find(
    (transaction) => transaction.displayDate === newTransaction.displayDate
  );

  if (!transactionGroup) {
    let newTransactionGroup = {
      date: newTransaction.date,
      displayDate: newTransaction.displayDate,
      transactions: [newTransaction],
      id: uuidv4(),
      totalExpenditure:
        newTransaction.transactionType === TRANSACTION_TYPES.EXPENDITURE
          ? newTransaction.amount
          : 0,
      totalIncome:
        newTransaction.transactionType === TRANSACTION_TYPES.INCOME
          ? newTransaction.amount
          : 0,
    };
    newDataState = [...dataState, newTransactionGroup];

    newDataState.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
  } else {
    // transactionGroup.transactions.push(newTransaction);
    // transactionGroup.totalExpenditure +=
    //   newTransaction.transactionType === TRANSACTION_TYPES.EXPENDITURE
    //     ? newTransaction.amount
    //     : 0;
    // transactionGroup.totalIncome +=
    //   newTransaction.transactionType === TRANSACTION_TYPES.INCOME
    //     ? newTransaction.amount
    //     : 0;

    // let filteredData = dataState.filter(
    //   (transaction) => transaction.displayDate !== newTransaction.displayDate
    // );

    // newDataState = [...filteredData, transactionGroup];

    newDataState = addTransactionToGroup(dataState, newTransaction);

    newDataState.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
  }
  return newDataState;
}

export function reloadDataOnDateSelectionChange(
  dataState: TransactionGroup[],
  dateSelection: string,
  setCurrentDataState: (dataState: TransactionGroup[]) => void,
  setTotalExpenditure: (totalExpenditure: number) => void,
  setTotalIncome: (totalIncome: number) => void
) {
  const today = new Date();

  let dateSelectedTransactions: TransactionGroup[] = [];
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

  dateSelectedTransactions.sort((a, b) =>
    new Date(b.date) > new Date(a.date) ? 1 : -1
  );

  setCurrentDataState(dateSelectedTransactions);

  let totalExpenditureTemp = 0;
  let totalIncomeTemp = 0;

  dateSelectedTransactions.map((transactionGroup) => {
    totalExpenditureTemp += transactionGroup.totalExpenditure;
    totalIncomeTemp += transactionGroup.totalIncome;
  });

  setTotalExpenditure(totalExpenditureTemp);
  setTotalIncome(totalIncomeTemp);
}

const removeTransactionFromGroup = (
  transactionGroups: TransactionGroup[],
  transactionId: string
): TransactionGroup[] => {
  return transactionGroups.map((transactionGroup) => {
    const transactionToRemove = transactionGroup.transactions.find(
      (transaction) => transaction.id === transactionId
    );

    if (transactionToRemove) {
      // Filter out the transaction to remove it
      const updatedTransactions = transactionGroup.transactions.filter(
        (transaction) => transaction.id !== transactionId
      );

      // Update income or expenditure based on the transactionType
      let updatedTotalIncome = transactionGroup.totalIncome;
      let updatedTotalExpenditure = transactionGroup.totalExpenditure;

      if (transactionToRemove.transactionType === TRANSACTION_TYPES.INCOME) {
        updatedTotalIncome -= transactionToRemove.amount;
      } else if (
        transactionToRemove.transactionType === TRANSACTION_TYPES.EXPENDITURE
      ) {
        updatedTotalExpenditure -= transactionToRemove.amount;
      }

      // Return the updated transactionGroup with new totals and transactions
      return {
        ...transactionGroup,
        transactions: updatedTransactions,
        totalIncome: updatedTotalIncome,
        totalExpenditure: updatedTotalExpenditure,
      };
    }

    // If no matching transaction, return the transactionGroup unchanged
    return transactionGroup;
  });
};

const addTransactionToGroup = (
  dataState: TransactionGroup[],
  newTransaction: Transaction
): TransactionGroup[] => {
  return dataState.map((transactionGroup) => {
    if (transactionGroup.displayDate === newTransaction.displayDate) {
      const updatedTransactions = [
        ...transactionGroup.transactions,
        newTransaction,
      ];

      let updatedTotalIncome = transactionGroup.totalIncome;
      let updatedTotalExpenditure = transactionGroup.totalExpenditure;

      if (newTransaction.transactionType === TRANSACTION_TYPES.INCOME) {
        updatedTotalIncome += newTransaction.amount;
      } else if (
        newTransaction.transactionType === TRANSACTION_TYPES.EXPENDITURE
      ) {
        updatedTotalExpenditure += newTransaction.amount;
      }

      return {
        ...transactionGroup,
        transactions: updatedTransactions,
        totalIncome: updatedTotalIncome,
        totalExpenditure: updatedTotalExpenditure,
      };
    }

    return transactionGroup;
  });
};
