import React from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const TransactionCard = ({ amount, date, title }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.price}>{amount}</Text>
        <Text style={styles.name}>{title}</Text>
      </View>
      <Text style={styles.dateTime}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    width: width * 0.9,
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  price: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
    textAlign: "right",
  },
  dateTime: {
    fontSize: 12,
    color: "gray",
    textAlign: "left",
  },
});

export default TransactionCard;
