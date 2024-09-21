import { View, Text, StyleSheet } from "react-native";

export default function Accounts() {
  return (
    <View style={styles.center}>
      <Text>This is Accounts screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
