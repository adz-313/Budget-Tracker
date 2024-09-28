// src/components/ButtonGroup.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DATE_PERIODS } from "../../constants/constants";

const DateButtonGroup = ({ dateSelection, setDateSelection }) => {
  // State to track the selected button
  // const [selected, setSelected] = useState("Today");

  // Button labels
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
              dateSelection === button && styles.selectedText, // Apply underline to selected button
            ]}
          >
            {button}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    // marginHorizontal: 10,
    // marginTop: 10,
    paddingTop: 5,
  },
  button: {
    paddingHorizontal: 20,
    // borderBottomWidth: 1,
    // borderColor: "#bbb",
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

export default DateButtonGroup;
