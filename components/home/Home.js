import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import TransactionCard from "../TransactionCard";

export default function Home() {
  [data, setData] = useState([]);

  getMyStringValue = async () => {
    const keys = await AsyncStorage.getAllKeys();

    // keys.map(
    //   async (key) =>
    //     await AsyncStorage.getItem(key).then((mydata) => {
    //       if (mydata != null) {
    //         setData(...data, JSON.parse(mydata));
    //       }
    //     })
    // );
    const mydata = await AsyncStorage.multiGet(keys);
    if (mydata != null) {
      mydata.map((arr) => setData([...data, new Object(JSON.parse(arr[1]))]));
    }
  };

  useFocusEffect(
    useCallback(() => {
      getMyStringValue();
    }, [])
  );

  return (
    <View style={styles.center}>
      {data.length < 1 ? (
        <Text>This is Home screen.</Text>
      ) : (
        data.map((d) => (
          <TransactionCard amount={d.amount} date={d.date} title={d.title} />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
