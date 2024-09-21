import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";
import { SCREENS } from "../../constants/constants";

export default function ExpenditureForm({
  form,
  handleInputChange,
  navigation,
}) {
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || form.date;
    setShow(false);
    handleInputChange("date", currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <>
      {/* Amount */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={form.amount}
          onChangeText={(value) => handleInputChange("amount", value)}
        />
      </View>
      {/* Date */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          editable={Platform.OS !== "ios"}
          style={styles.input}
          onPress={() => showDatepicker()}
        >
          {form.date.toLocaleDateString()}
        </TextInput>
      </View>
      {show && (
        <DateTimePicker
          value={form.date}
          mode="date"
          onChange={onChange}
          display="inline"
        />
      )}

      {/* Category */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(SCREENS.CATEGORIES, {
              handleInputChange: handleInputChange,
            })
          }
          style={styles.inputWrapper}
        >
          <TextInput
            style={styles.nestedInput}
            placeholder="Select Category"
            editable={false}
            value={form.category}
          />
          <Icon name="chevron-forward-outline" size={18} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Account */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Account</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(SCREENS.ACCOUNTS, {
              handleInputChange: handleInputChange,
              inputName: "account",
            })
          }
          style={styles.inputWrapper}
        >
          <TextInput
            style={styles.nestedInput}
            placeholder="Select an Account"
            editable={false}
            value={form.account}
          />
          <Icon name="chevron-forward-outline" size={18} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="For (optional)"
          value={form.title}
          onChangeText={(value) => handleInputChange("title", value)}
        />
      </View>

      {/* Recipient */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Recipient</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient (optional)"
          value={form.recipient}
          onChangeText={(value) => handleInputChange("recipient", value)}
        />
      </View>

      {/* Note */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Note</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Add a note (optional)"
          value={form.note}
          onChangeText={(value) => handleInputChange("note", value)}
          multiline={true}
          numberOfLines={4}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 5,
    flex: 5,
  },
  nestedInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  formGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  label: {
    flex: 2,
    fontSize: 16,
    color: "#808080",
  },
  input: {
    flex: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
  },
  dateInput: {
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textArea: {
    fontSize: 16,
    height: 150,
    textAlignVertical: "top",
    flex: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
});
