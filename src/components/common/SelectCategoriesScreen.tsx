import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FORM_FIELDS, SCREENS } from "@constants/constants";
import { getCategories } from "@constants/categories";
import {
  CategoriesFormProps,
  CategoryGridItemProps,
} from "@src/types/common/types";

const CategoryGridItem = ({
  navigation,
  item,
  handleInputChange,
}: CategoryGridItemProps) => {
  function handleItemPress() {
    handleInputChange(FORM_FIELDS.CATEGORY, item.name);
    navigation.navigate(SCREENS.NEW_TRANSACTION_SCREEN);
  }

  return (
    <TouchableOpacity style={styles.gridItem} onPress={() => handleItemPress()}>
      <View
        style={item.icon !== "" ? styles.iconWrapper : styles.blankIconWrapper}
      >
        <Icon name={item.icon} size={20} color="#FF6347" />
      </View>
      <Text style={styles.label}>
        {item.name.length > 11 ? item.name.substring(0, 8) + "..." : item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default function SelectCategoriesScreen({
  route,
  navigation,
  transactionType,
  handleInputChange,
}: CategoriesFormProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryHeading}>{transactionType}</Text>
      <FlatList
        data={getCategories(transactionType)}
        renderItem={({ item }) => (
          <CategoryGridItem
            navigation={navigation}
            item={item}
            handleInputChange={handleInputChange}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
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
  categoryHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
  blankIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
