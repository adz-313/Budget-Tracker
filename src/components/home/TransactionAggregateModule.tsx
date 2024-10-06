import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ViewTotalTransactionsProps } from "@src/types/home/types";

const TransactionAggregateModule: React.FC<ViewTotalTransactionsProps> = ({
  totalExpenditure,
  totalIncome,
}) => {
  return (
    <View style={styles.container}>
      {/* Left Box - Income */}
      <View style={[styles.box, styles.leftBox]}>
        <Text style={styles.labelText}>Income</Text>
        <Text style={styles.mainText}>${totalIncome}</Text>
      </View>

      {/* Right Box - Expenditure */}
      <View style={[styles.box, styles.rightBox]}>
        <Text style={styles.labelText}>Expenditure</Text>
        <Text style={styles.mainText}>${totalExpenditure}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  box: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 36,
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  rightBox: {
    backgroundColor: "#EF0107",
  },
  leftBox: {
    backgroundColor: "#4CBB17",
  },
  labelText: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  mainText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
});

export default TransactionAggregateModule;
