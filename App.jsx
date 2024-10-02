import { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "./components/home/Home";
import Accounts from "./components/accounts/Accounts";
import Settings from "./components/settings/Settings";
import Statistics from "./components/statistics/Statistics";
import FormStack from "./components/form/FormStack";
import { SCREENS } from "./constants/constants";

export default function App() {
  // used to hot load home page data
  const [newId, setNewId] = useState(null);

  // used to edit existing data
  const [existingTransactionId, setExistingTransactionId] = useState(null);
  const [isFormTouched, setIsFormTouched] = useState(false);

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={SCREENS.HOME}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" color={color} size={size} />
            ),
            tabBarButton: (props) => <TouchableOpacity {...props} />,
          }}
        >
          {(props) => (
            <Home
              {...props}
              newId={newId}
              setNewId={setNewId}
              existingTransactionId={existingTransactionId}
              setExistingTransactionId={setExistingTransactionId}
              isFormTouched={isFormTouched}
              setIsFormTouched={setIsFormTouched}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name={SCREENS.STATISTICS}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="stats-chart-outline" color={color} size={size} />
            ),
            tabBarButton: (props) => <TouchableOpacity {...props} />,
          }}
        >
          {(props) => (
            <Statistics
              {...props}
              isFormTouched={isFormTouched}
              setIsFormTouched={setIsFormTouched}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name={SCREENS.FORMSTACK}
          options={{
            tabBarIcon: () => (
              <View style={styles.middleButton}>
                <Icon name="add-outline" color="#fff" size={30} />
              </View>
            ),
            tabBarButton: (props) => <TouchableOpacity {...props} />,
            tabBarLabel: () => null,
            headerShown: false,
          }}
        >
          {(props) => (
            <FormStack
              {...props}
              newId={newId}
              setNewId={setNewId}
              existingTransactionId={existingTransactionId}
              setExistingTransactionId={setExistingTransactionId}
              isFormTouched={isFormTouched}
              setIsFormTouched={setIsFormTouched}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name={SCREENS.ACCOUNTS}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="wallet-outline" color={color} size={size} />
            ),
            tabBarButton: (props) => <TouchableOpacity {...props} />,
          }}
        >
          {(props) => (
            <Accounts
              {...props}
              isFormTouched={isFormTouched}
              setIsFormTouched={setIsFormTouched}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name={SCREENS.SETTINGS}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="settings-outline" color={color} size={size} />
            ),
            tabBarButton: (props) => <TouchableOpacity {...props} />,
          }}
        >
          {(props) => (
            <Settings
              {...props}
              isFormTouched={isFormTouched}
              setIsFormTouched={setIsFormTouched}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  middleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF6347",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
