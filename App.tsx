import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "./src/pages/home/Home";
import Accounts from "./src/components/accounts/Accounts";
import Settings from "./src/components/settings/Settings";
import Statistics from "./src/components/statistics/Statistics";
import Form from "./src/pages/form/Form";
import { RootStackParamList } from "./src/types/navigation/types";
import { SCREENS } from "./src/constants/constants";

export default function App() {
  // used to hot load home page data
  const [newTransactionId, setNewTransactionId] = useState<string>("");

  // used to edit existing data
  const [existingTransactionId, setExistingTransactionId] =
    useState<string>("");

  const [isFormTouched, setIsFormTouched] = useState<boolean>(false);

  const Tab = createBottomTabNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={SCREENS.HOME_PAGE}
          options={{
            headerTitle: "Home",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" color={color} size={size} />
            ),
            tabBarButton: (props) => <TouchableOpacity {...props} />,
          }}
        >
          {(props) => (
            <Home
              {...props}
              newTransactionId={newTransactionId}
              setNewTransactionId={setNewTransactionId}
              existingTransactionId={existingTransactionId}
              setExistingTransactionId={setExistingTransactionId}
              isFormTouched={isFormTouched}
              setIsFormTouched={setIsFormTouched}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name={SCREENS.STATISTICS_PAGE}
          options={{
            headerTitle: "Statistics",
            tabBarLabel: "Statistics",
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
          name={SCREENS.FORM_PAGE}
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
            <Form
              {...props}
              newTransactionId={newTransactionId}
              setNewTransactionId={setNewTransactionId}
              existingTransactionId={existingTransactionId}
              setExistingTransactionId={setExistingTransactionId}
              isFormTouched={isFormTouched}
              setIsFormTouched={setIsFormTouched}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name={SCREENS.ACCOUNTS_PAGE}
          options={{
            headerTitle: "Accounts",
            tabBarLabel: "Accounts",
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
          name={SCREENS.SETTINGS_PAGE}
          options={{
            headerTitle: "Settings",
            tabBarLabel: "Settings",
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
