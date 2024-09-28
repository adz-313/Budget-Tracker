import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ViewTotalTransactions = ({ totalExpenditure }) => {
  return (
    <View style={styles.container}>
      {/* Left Box - Income */}
      <View style={[styles.box, styles.leftBox]}>
        <Text style={styles.labelText}>Income</Text>
        <Text style={styles.mainText}>$500</Text>
      </View>

      {/* Right Box - Expenditure */}
      <View style={[styles.box, styles.rightBox]}>
        <Text style={styles.labelText}>Expenditure</Text>
        <Text style={styles.mainText}>${totalExpenditure}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Align boxes horizontally
    justifyContent: "space-between", // Space the boxes evenly
    padding: 10,
  },
  box: {
    flex: 1, // Makes both boxes take up equal width
    marginHorizontal: 5, // Small gap between the boxes
    paddingVertical: 40, // Padding inside the boxes
    paddingHorizontal: 25, // Padding inside the boxes
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    borderRadius: 10, // Rounded corners
  },
  rightBox: {
    backgroundColor: "#EF0107", // Red background for the left box
  },
  leftBox: {
    backgroundColor: "#4CBB17", // Green background for the right box
  },
  labelText: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "white", // White text for labels
    fontWeight: "bold",
    fontSize: 14,
  },
  mainText: {
    fontSize: 24,
    color: "white", // White text for the main number
    fontWeight: "bold",
  },
});

export default ViewTotalTransactions;
