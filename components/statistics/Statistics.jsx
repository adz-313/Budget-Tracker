import { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { SCREENS } from "../../constants/constants";

export default function Statistics({
  navigation,
  isFormTouched,
  setIsFormTouched,
}) {
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      if (!isFormTouched) {
        return;
      }
      e.preventDefault();
      Alert.alert(
        "Unsaved Changes",
        "You have unsaved changes. Are you sure you want to leave the form?",
        [
          { text: "Cancel", style: "cancel", onPress: () => {} },
          {
            text: "Leave",
            style: "destructive",
            onPress: () => {
              setIsFormTouched(false);
              navigation.navigate(SCREENS.STATISTICS);
            },
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation, isFormTouched, setIsFormTouched]);

  return (
    <View style={styles.center}>
      <Text>This is Statistics screen.</Text>
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
