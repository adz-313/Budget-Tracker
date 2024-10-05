import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TRANSACTION_TYPES } from "@constants/constants";
import { TransactionTypeButtonGroupProps } from "@src/types/form/types";

export default function TransactionTypeButtonGroup({
  resetForm,
  selectedTransactionType,
  setSelectedTransactionType,
  isInEditMode,
}: TransactionTypeButtonGroupProps) {
  return (
    <View style={styles.buttonGroup}>
      <TouchableOpacity
        style={[
          styles.button,
          isInEditMode &&
            selectedTransactionType !== TRANSACTION_TYPES.INCOME &&
            styles.disabledButton,
          isInEditMode &&
            selectedTransactionType === TRANSACTION_TYPES.INCOME &&
            styles.unselectedButton,
          !isInEditMode &&
            selectedTransactionType !== TRANSACTION_TYPES.INCOME &&
            styles.unselectedButton,
          !isInEditMode &&
            selectedTransactionType === TRANSACTION_TYPES.INCOME &&
            styles.selectedButton,
        ]}
        onPress={() => {
          resetForm();
          setSelectedTransactionType(TRANSACTION_TYPES.INCOME);
        }}
        disabled={
          isInEditMode && selectedTransactionType !== TRANSACTION_TYPES.INCOME
        }
      >
        <Text
          style={[
            styles.buttonText,
            selectedTransactionType === TRANSACTION_TYPES.INCOME &&
              styles.selectedButtontext,
          ]}
        >
          Income
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          isInEditMode &&
            selectedTransactionType !== TRANSACTION_TYPES.EXPENDITURE &&
            styles.disabledButton,
          isInEditMode &&
            selectedTransactionType === TRANSACTION_TYPES.EXPENDITURE &&
            styles.unselectedButton,
          !isInEditMode &&
            selectedTransactionType !== TRANSACTION_TYPES.EXPENDITURE &&
            styles.unselectedButton,
          !isInEditMode &&
            selectedTransactionType === TRANSACTION_TYPES.EXPENDITURE &&
            styles.selectedButton,
        ]}
        onPress={() => {
          resetForm();
          setSelectedTransactionType(TRANSACTION_TYPES.EXPENDITURE);
        }}
        disabled={
          isInEditMode &&
          selectedTransactionType !== TRANSACTION_TYPES.EXPENDITURE
        }
      >
        <Text
          style={[
            styles.buttonText,
            selectedTransactionType === TRANSACTION_TYPES.EXPENDITURE &&
              styles.selectedButtontext,
          ]}
        >
          Expenditure
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          isInEditMode && selectedTransactionType !== TRANSACTION_TYPES.TRANSFER
            ? styles.disabledButton
            : styles.unselectedButton,
          selectedTransactionType === TRANSACTION_TYPES.TRANSFER &&
            styles.selectedButton,
        ]}
        onPress={() => {
          resetForm();
          setSelectedTransactionType(TRANSACTION_TYPES.TRANSFER);
        }}
        disabled={
          isInEditMode && selectedTransactionType !== TRANSACTION_TYPES.TRANSFER
        }
      >
        <Text
          style={[
            styles.buttonText,
            selectedTransactionType === TRANSACTION_TYPES.TRANSFER &&
              styles.selectedButtontext,
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
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: "#FF6347",
  },
  disabledButton: {
    backgroundColor: "#d0d0d0",
  },
  unselectedButton: {
    backgroundColor: "#FF9986",
  },
  selectedButtontext: {
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
  },
});
