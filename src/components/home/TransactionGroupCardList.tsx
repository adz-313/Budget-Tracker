import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import TransactionAggregateModule from "./TransactionAggregateModule";
import { TransactionGroupCardListProps } from "@src/types/home/types";
import TransactionGroupCard from "./TransactionGroupCard";

const TransactionGroupCardList: React.FC<TransactionGroupCardListProps> = ({
  navigation,
  dataState,
  setExistingTransactionId,
  totalExpenditure,
  totalIncome,
}) => {
  return (
    <View>
      <TransactionAggregateModule
        totalExpenditure={totalExpenditure}
        totalIncome={totalIncome}
      />
      {dataState.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyTransactionText}>No transactions today</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {dataState.map((transaction) => (
            <TransactionGroupCard
              navigation={navigation}
              setExistingTransactionId={setExistingTransactionId}
              key={transaction.id}
              displayDate={transaction.displayDate}
              transactions={transaction.transactions}
              totalAmount={
                transaction.totalIncome - transaction.totalExpenditure
              }
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  emptyTransactionText: {
    fontSize: 20,
    marginTop: 100,
  },
  scrollView: {
    padding: 10,
  },
  scrollViewContent: {
    paddingBottom: 130,
  },
});

export default TransactionGroupCardList;
