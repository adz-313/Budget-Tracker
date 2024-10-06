import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SCREENS } from "../../constants/constants";
import { Account, AccountGroup, accounts } from "@constants/accounts";
import { AccountsFormProps } from "@src/types/common/types";

export default function SelectAccountsScreen({
  route,
  navigation,
  handleInputChange,
}: AccountsFormProps) {
  const { inputName } = route.params;

  const PaymentOptionItem = ({
    item,
    handleInputChange,
    inputName,
  }: {
    item: Account;
    handleInputChange: (name: string, value: string | number | Date) => void;
    inputName: string;
  }) => {
    function handleItemPress() {
      handleInputChange(inputName, item.name);
      navigation.navigate(SCREENS.NEW_TRANSACTION_SCREEN);
    }
    return (
      <TouchableOpacity onPress={() => handleItemPress()}>
        <View style={styles.optionContainer}>
          <Icon
            name={item.icon}
            size={24}
            color="#4CAF50"
            style={styles.icon}
          />
          <Text style={styles.optionText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const PaymentCategory = ({
    name,
    accounts,
    handleInputChange,
    inputName,
  }: {
    name: string;
    accounts: Account[];
    handleInputChange: (name: string, value: string | number | Date) => void;
    inputName: string;
  }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryHeading}>{name}</Text>
      {accounts.map((item) => (
        <PaymentOptionItem
          key={item.id}
          item={item}
          handleInputChange={handleInputChange}
          inputName={inputName}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={accounts}
        renderItem={({ item }: { item: AccountGroup }) => (
          <PaymentCategory
            name={item.name}
            accounts={item.accounts}
            handleInputChange={handleInputChange}
            inputName={inputName}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
  },
});
