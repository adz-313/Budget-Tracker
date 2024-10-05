import { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { SCREENS } from "../../constants/constants";
import { AccountsPageProps } from "@src/types/accounts/types";

export default function Accounts({
  navigation,
  isFormTouched,
  setIsFormTouched,
}: AccountsPageProps) {
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
              navigation.navigate(SCREENS.ACCOUNTS_PAGE);
            },
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation, isFormTouched, setIsFormTouched]);
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
