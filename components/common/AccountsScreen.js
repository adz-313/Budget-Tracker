import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SCREENS } from "../../constants/constants";

const paymentOptions = [
  {
    category: "Cash",
    data: [{ id: "1", name: "Cash in Hand", icon: "cash-outline" }],
  },
  {
    category: "Bank Accounts",
    data: [
      { id: "2", name: "Checking Account", icon: "wallet-outline" },
      { id: "3", name: "Savings Account", icon: "home-outline" },
    ],
  },
  {
    category: "Cards",
    data: [
      { id: "4", name: "Visa Credit Card", icon: "card-outline" },
      { id: "5", name: "Mastercard Debit Card", icon: "card-outline" },
    ],
  },
];

export default function AccountsScreen({ route, navigation }) {
  const { handleInputChange, inputName } = route.params;
  const PaymentOptionItem = ({ item, handleInputChange }) => {
    function handleItemPress() {
      handleInputChange(inputName, item.name);
      navigation.navigate(SCREENS.NEW_TRANSACTION);
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

  const PaymentCategory = ({ category, data, handleInputChange }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryHeading}>{category}</Text>
      {data.map((item) => (
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
        data={paymentOptions}
        renderItem={({ item }) => (
          <PaymentCategory
            category={item.category}
            data={item.data}
            handleInputChange={handleInputChange}
            inputName={inputName}
          />
        )}
        keyExtractor={(item) => item.category}
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
