import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";
import { Transaction, TransactionGroup } from "@src/types/common/types";
import {
  DATE_PERIODS,
  FORM_FIELDS,
  TRANSACTION_TYPES,
} from "@constants/constants";

export async function loadInitialData(
  setKeysState: (keysState: string[]) => void,
  setDataState: (dataState: TransactionGroup[]) => void,
  setNewTransactionId: (newTransactionId: string) => void
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
        (group) => group.displayDate === transaction.displayDate
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

  setNewTransactionId("");
}

export async function loadNewData(
  newTransactionId: string,
  dataState: TransactionGroup[],
  setDataState: (dataState: TransactionGroup[]) => void,
  keysState: string[],
  setKeysState: (keysState: string[]) => void
) {
  if (newTransactionId === "") return;

  // read new transaction and convert into js object
  let newTransactionJSON: string | null = await AsyncStorage.getItem(
    newTransactionId
  );

  // item deleted
  if (!newTransactionJSON || newTransactionJSON === null) {
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

    const oldTransaction = dataState.map((transactionGroup) =>
      transactionGroup.transactions.find(
        (transaction) => newTransactionId === transaction.id
      )
    )[0];

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

    setDataState(updatedDataState);
    return;
  }

  let newTransaction: Transaction = JSON.parse(newTransactionJSON);
  newTransaction.displayDate = new Date(
    newTransaction.date
  ).toLocaleDateString();
  newTransaction.id = newTransactionId;

  // check if id is already present
  var newIdPresent = keysState.includes(newTransactionId);
  if (newIdPresent) {
    var transactionGroup = dataState.find(
      (transaction) => transaction.displayDate === newTransaction.displayDate
    );

    if (!transactionGroup) return;

    const oldTransaction = transactionGroup.transactions.find(
      (transaction) => transaction.id === newTransaction.id
    );

    if (!oldTransaction) return;

    transactionGroup.transactions = transactionGroup.transactions.filter(
      (transaction) => transaction.id !== newTransaction.id
    );
    if (newTransaction.transactionType === TRANSACTION_TYPES.EXPENDITURE) {
      transactionGroup.totalExpenditure -= oldTransaction.amount;
      transactionGroup.totalExpenditure += newTransaction.amount;
    } else if (newTransaction.transactionType === TRANSACTION_TYPES.INCOME) {
      transactionGroup.totalIncome -= oldTransaction.amount;
      transactionGroup.totalIncome += newTransaction.amount;
    }

    transactionGroup.transactions.push(newTransaction);

    var filteredData = dataState.filter(
      (transaction) => transaction.displayDate !== newTransaction.displayDate
    );

    var newDataState = [...filteredData, transactionGroup];
    newDataState.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
    setDataState(newDataState);
    return;
  }

  setKeysState([...keysState, newTransactionId]);

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
        newTransaction.transactionType === TRANSACTION_TYPES.EXPENDITURE
          ? newTransaction.amount
          : 0,
      totalIncome:
        newTransaction.transactionType === TRANSACTION_TYPES.INCOME
          ? newTransaction.amount
          : 0,
    };
    var newDataState = [...dataState, newTransactionGroup];
    newDataState.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
    setDataState(newDataState);
  } else {
    transactionGroup.transactions.push(newTransaction);
    transactionGroup.totalExpenditure +=
      newTransaction.transactionType === TRANSACTION_TYPES.EXPENDITURE
        ? newTransaction.amount
        : 0;
    transactionGroup.totalIncome +=
      newTransaction.transactionType === TRANSACTION_TYPES.INCOME
        ? newTransaction.amount
        : 0;

    var filteredData = dataState.filter(
      (transaction) => transaction.displayDate !== newTransaction.displayDate
    );

    var newDataState = [...filteredData, transactionGroup];
    newDataState.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
    setDataState(newDataState);
  }
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

  var totalExpenditureTemp = 0;
  var totalIncomeTemp = 0;

  dateSelectedTransactions.map((transactionGroup) => {
    totalExpenditureTemp += transactionGroup.totalExpenditure;
    totalIncomeTemp += transactionGroup.totalIncome;
  });

  setTotalExpenditure(totalExpenditureTemp);
  setTotalIncome(totalIncomeTemp);
}
