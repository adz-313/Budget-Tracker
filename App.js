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
import { useState } from "react";

export default function App() {
  [newId, setNewId] = useState(null);
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
          {(props) => <Home {...props} newId={newId} setNewId={setNewId} />}
        </Tab.Screen>
        <Tab.Screen
          name={SCREENS.STATISTICS}
          component={Statistics}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="stats-chart-outline" color={color} size={size} />
            ),
            tabBarButton: (props) => <TouchableOpacity {...props} />,
          }}
        />
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
          {(props) => <FormStack setNewId={setNewId} />}
        </Tab.Screen>
        <Tab.Screen
          name={SCREENS.ACCOUNTS}
          component={Accounts}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="wallet-outline" color={color} size={size} />
            ),
            tabBarButton: (props) => <TouchableOpacity {...props} />,
          }}
        />
        <Tab.Screen
          name={SCREENS.SETTINGS}
          component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="settings-outline" color={color} size={size} />
            ),
            tabBarButton: (props) => <TouchableOpacity {...props} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
