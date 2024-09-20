import React, { useState, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const ExpandableCard = ({ to, purpose, amount, date }) => {
  const [to, setTo] = useState(to);
  const [purposeText, setPurposeText] = useState(purpose);
  const [amount, setAmount] = useState(amount);
  const [date, setDate] = useState(date);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onSave = () => {
    Alert.alert(
      "Saved",
      `To: ${to}, For: ${purposeText}, Amount: ${amount}, Date: ${date.toLocaleDateString()}`
    );
  };

  const onDelete = () => {
    setTo("");
    setpurposeText("");
    setAmount("");
    setDate(new Date());
    Alert.alert("Deleted", "Form cleared");
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isExpanded ? (
        // <>
        //   <TextInput
        //     style={styles.input}
        //     value={price}
        //     onChangeText={setPrice}
        //     placeholder="Enter Price"
        //     keyboardType="numeric"
        //   />
        //   <TextInput
        //     style={styles.input}
        //     value={name}
        //     onChangeText={setName}
        //     placeholder="Enter Name"
        //   />
        //   <TextInput
        //     style={styles.input}
        //     value={date}
        //     onChangeText={setDate}
        //     placeholder="Enter Date"
        //   />
        // </>
        <View style={styles.container}>
          <View style={styles.formRow}>
            <Text style={styles.label}>To:</Text>
            <TextInput
              style={styles.input}
              placeholder="Recipient"
              value={to}
              onChangeText={setTo}
            />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>For:</Text>
            <TextInput
              style={styles.input}
              placeholder="Reason"
              value={purposeText}
              onChangeText={setPurposeText}
            />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Amount:</Text>
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={amount}
              keyboardType="numeric"
              onChangeText={setAmount}
            />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Date:</Text>
            <Text
              style={styles.dateText}
              onPress={() => setShowDatePicker(true)}
            >
              {date.toLocaleDateString()}
            </Text>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={onDateChange}
            />
          )}

          {/* Save and Delete Buttons */}
          <View style={styles.buttonRow}>
            <Button title="Save" onPress={onSave} />
            <Button title="Delete" color="red" onPress={onDelete} />
          </View>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.price}>{amount}</Text>
            <Text style={styles.name}>{to}</Text>
          </View>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.date}>{purpose}</Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "white",
    width: width * 0.9,
    padding: 16,
    borderRadius: 8,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 10,
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  dateText: {
    flex: 2,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default ExpandableCard;
