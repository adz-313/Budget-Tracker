import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import DateFilterButtonGroup from "@components/common/DateFilterButtonGroup";
import TransactionGroupCardList from "@src/components/home/TransactionGroupCardList";
import { DATE_PERIODS, SCREENS } from "@constants/constants";
import { TransactionGroup } from "@src/types/common/types";
import { HomeScreenProps } from "@src/types/home/types";
import {
  loadInitialData,
  loadNewData,
  reloadDataOnDateSelectionChange,
} from "@utils/home/utils";

export default function Home({
  route,
  navigation,
  newTransactionId,
  setNewTransactionId,
  existingTransactionId,
  setExistingTransactionId,
  isFormTouched,
  setIsFormTouched,
}: HomeScreenProps) {
  const [dataState, setDataState] = useState<Array<TransactionGroup>>([]);

  const [currentDataState, setCurrentDataState] = useState<
    Array<TransactionGroup>
  >([]);

  const [keysState, setKeysState] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateSelection, setDateSelection] = useState(DATE_PERIODS.TODAY);
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

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
              navigation.navigate(SCREENS.HOME_PAGE);
            },
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation, isFormTouched, setIsFormTouched]);

  async function deleteAllData() {
    const allKeys = await AsyncStorage.getAllKeys();
    console.log(allKeys);
    await AsyncStorage.multiRemove(allKeys);
  }

  const loadData = async () => {
    if (dataState.length === 0) {
      await loadInitialData(setKeysState, setDataState, setNewTransactionId);
    } else {
      await loadNewData(
        newTransactionId,
        dataState,
        setDataState,
        keysState,
        setKeysState
      );
    }
    setNewTransactionId("");
    setIsLoading(false);
    // await deleteAllData();
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
      reloadDataOnDateSelectionChange(
        dataState,
        dateSelection,
        setCurrentDataState,
        setTotalExpenditure,
        setTotalIncome
      );
    }, [newTransactionId, isLoading, dateSelection])
  );

  return (
    <View>
      <DateFilterButtonGroup
        dateSelection={dateSelection}
        setDateSelection={setDateSelection}
      />
      {isLoading ? (
        <View style={styles.center}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <TransactionGroupCardList
          navigation={navigation}
          dataState={currentDataState}
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
