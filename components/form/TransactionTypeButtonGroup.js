import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TransactionTypeButtonGroup({
  transactionType,
  setTransactionType,
}) {
  return (
    <View style={styles.buttonGroup}>
      <TouchableOpacity
        style={[
          styles.button,
          transactionType === "Income" && styles.selectedButton,
        ]}
        onPress={() => setTransactionType("Income")}
      >
        <Text
          style={[
            styles.buttonText,
            transactionType === "Income" && styles.selectedButtontext,
          ]}
        >
          Income
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          transactionType === "Expenditure" && styles.selectedButton,
        ]}
        onPress={() => setTransactionType("Expenditure")}
      >
        <Text
          style={[
            styles.buttonText,
            transactionType === "Expenditure" && styles.selectedButtontext,
          ]}
        >
          Expenditure
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          transactionType === "Transfer" && styles.selectedButton,
        ]}
        onPress={() => setTransactionType("Transfer")}
      >
        <Text
          style={[
            styles.buttonText,
            transactionType === "Transfer" && styles.selectedButtontext,
          ]}
        >
          Transfer
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#FF9986",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: "#FF6347",
  },
  selectedButtontext: {
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
  },
});
