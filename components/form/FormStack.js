import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormScreen from "./FormScreen";
import CategoriesScreen from "../common/CategoriesScreen";
import AccountsScreen from "../common/AccountsScreen";
import { SCREENS } from "../../constants/constants";
export default function FormStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.NEW_TRANSACTION}
        component={FormScreen}
        options={{ headerTitle: "New Entry" }}
      />
      <Stack.Screen name={SCREENS.CATEGORIES} component={CategoriesScreen} />
      <Stack.Screen name={SCREENS.ACCOUNTS} component={AccountsScreen} />
    </Stack.Navigator>
  );
}
