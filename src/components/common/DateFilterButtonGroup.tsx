import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DATE_PERIODS } from "@constants/constants";
import { DateFilterButtonGroupProps } from "@src/types/common/types";

const DateFilterButtonGroup = ({
  dateSelection,
  setDateSelection,
}: DateFilterButtonGroupProps) => {
  const buttons = [
    DATE_PERIODS.TODAY,
    DATE_PERIODS.WEEK,
    DATE_PERIODS.MONTH,
    DATE_PERIODS.YEAR,
  ];

  return (
    <View style={styles.container}>
      {buttons.map((button) => (
        <TouchableOpacity
          key={button}
          onPress={() => setDateSelection(button)}
          style={
            dateSelection !== button ? styles.button : styles.selectedButton
          }
        >
          <Text
            style={[
              styles.text,
              dateSelection === button && styles.selectedText,
            ]}
          >
            {button}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectedButton: {
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderColor: "#007bff",
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  selectedText: {
    fontWeight: "bold",
    color: "#007bff",
  },
});

export default DateFilterButtonGroup;
