// App.js
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Icons from Ionicons (Royalty-free)

const categories = [
  { id: "1", name: "Groceries", icon: "cart-outline" },
  { id: "2", name: "Transport", icon: "car-outline" },
  { id: "3", name: "Entertainment", icon: "tv-outline" },
  { id: "4", name: "Shopping", icon: "shirt-outline" },
  { id: "5", name: "Health", icon: "medkit-outline" },
  { id: "6", name: "Education", icon: "school-outline" },
  { id: "7", name: "Travel", icon: "airplane-outline" },
  { id: "8", name: "Dining", icon: "fast-food-outline" },
];

const CategoryGridItem = ({ navigation, item, handleInputChange }) => {
  function handleItemPress() {
    handleInputChange("category", item.name);
    navigation.navigate("Form");
  }
  return (
    <TouchableOpacity style={styles.gridItem} onPress={() => handleItemPress()}>
      <View style={styles.iconWrapper}>
        <Icon name={item.icon} size={20} color="#FF6347" />
      </View>
      <Text style={styles.label}>
        {item.name.length > 11 ? item.name.substring(0, 8) + "..." : item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default function CategoriesScreen({ route, navigation }) {
  const { handleInputChange } = route.params;
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryGridItem
            navigation={navigation}
            item={item}
            handleInputChange={handleInputChange}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={4}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  gridItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#FF9986",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
  },
});