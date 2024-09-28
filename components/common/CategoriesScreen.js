import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SCREENS } from "../../constants/constants";
import { categories } from "../../constants/categories";

const CategoryGridItem = ({ navigation, item, handleInputChange }) => {
  function handleItemPress() {
    handleInputChange("category", item.name);
    navigation.navigate(SCREENS.NEW_TRANSACTION);
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
