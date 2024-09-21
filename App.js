import { useContext, createContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "./components/home/Home";
import Accounts from "./components/accounts/Accounts";
import Settings from "./components/settings/Settings";
import Statistics from "./components/statistics/Statistics";
import FormStack from "./components/form/FormStack";

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" color={color} size={size} />
            ),
            tabBarButton: (props) => <TouchableOpacity {...props} />,
          }}
        />
        <Tab.Screen
          name="Statistics"
          component={Statistics}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="stats-chart-outline" color={color} size={size} />
            ),
            tabBarButton: (props) => <TouchableOpacity {...props} />,
          }}
        />
        <Tab.Screen
          name="FormStack"
          component={FormStack}
          options={{
            tabBarIcon: () => (
              <View style={styles.middleButton}>
                <Icon name="add-outline" color="#fff" size={30} />
              </View>
            ),
            tabBarButton: (props) => <TouchableOpacity {...props} />,
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="Accounts"
          component={Accounts}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="wallet-outline" color={color} size={size} />
            ),
            tabBarButton: (props) => <TouchableOpacity {...props} />,
          }}
        />
        <Tab.Screen
          name="Settings"
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
    marginBottom: 20, // Adjust position
  },
});
