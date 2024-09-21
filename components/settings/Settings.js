import { View, Text, StyleSheet } from "react-native";

export default function Settings() {
  return (
    <View style={styles.center}>
      <Text>This is Settings screen.</Text>
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
