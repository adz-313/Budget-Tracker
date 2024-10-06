import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { categories } from "@constants/categories";
import { SCREENS } from "@constants/constants";
import { TransactionGroupCardProps } from "@src/types/home/types";

const TransactionGroupCard: React.FC<TransactionGroupCardProps> = ({
  navigation,
  setExistingTransactionId,
  displayDate,
  transactions,
  totalAmount,
}) => (
  <View style={styles.card}>
    <View style={styles.groupHeader}>
      <Text style={styles.groupHeaderText}>{displayDate}</Text>
      <Text style={styles.groupHeaderText}>{totalAmount} $</Text>
    </View>
    {transactions.map((transaction) => (
      <TouchableOpacity
        key={transaction.id}
        onPress={() => {
          setExistingTransactionId(transaction.id);
          navigation.navigate(SCREENS.FORM_PAGE);
        }}
      >
        <View style={styles.transaction} key={transaction.id}>
          <View style={styles.iconWrapper}>
            <Icon
              name={
                categories[transaction.transactionType].find(
                  (category) => category.name === transaction.category
                )?.icon || "ellipsis-horizontal-outline"
              }
              size={20}
              color="#FF6347"
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{transaction.title}</Text>
            <Text style={styles.account}>{transaction.accountName}</Text>
          </View>
          <Text style={styles.amount}>{transaction.amount} $</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  groupHeaderText: {
    fontSize: 18,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  transaction: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderTopColor: "#999",
    borderTopWidth: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#FF9986",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  account: {
    fontSize: 14,
    color: "#666",
  },
  amount: {
    fontSize: 16,
    color: "#333",
  },
});

export default TransactionGroupCard;
