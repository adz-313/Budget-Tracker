import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormScreen from "./FormScreen";
import CategoriesScreen from "../common/CategoriesScreen";
import AccountsScreen from "../common/AccountsScreen";
export default function FormStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Form" component={FormScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Accounts" component={AccountsScreen} />
    </Stack.Navigator>
  );
}
