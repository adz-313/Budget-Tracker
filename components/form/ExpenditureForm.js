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
import { FORM_FIELDS, SCREENS } from "../../constants/constants";

export default function ExpenditureForm({
  form,
  handleInputChange,
  navigation,
}) {
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || form.date;
    setShow(false);
    handleInputChange(FORM_FIELDS.DATE, currentDate);
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
          value={form[FORM_FIELDS.AMOUNT].toString()}
          onChangeText={(value) => {
            if (value === "") handleInputChange(FORM_FIELDS.AMOUNT, value);
            else handleInputChange(FORM_FIELDS.AMOUNT, Number.parseInt(value));
          }}
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
          {form[FORM_FIELDS.DATE].toLocaleDateString()}
        </TextInput>
      </View>
      {show && (
        <DateTimePicker
          value={form[FORM_FIELDS.DATE]}
          mode="date"
          onChange={onChange}
          display="inline"
        />
      )}

      {/* Category */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.CATEGORIES)}
          style={styles.inputWrapper}
        >
          <TextInput
            style={styles.nestedInput}
            placeholder="Select Category"
            editable={false}
            value={form[FORM_FIELDS.CATEGORY]}
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
              inputName: FORM_FIELDS.ACCOUNT,
            })
          }
          style={styles.inputWrapper}
        >
          <TextInput
            style={styles.nestedInput}
            placeholder="Select an Account"
            editable={false}
            value={form[FORM_FIELDS.ACCOUNT]}
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
          value={form[FORM_FIELDS.TITLE]}
          onChangeText={(value) => handleInputChange(FORM_FIELDS.TITLE, value)}
        />
      </View>

      {/* Recipient */}
      {/* <View style={styles.formGroup}>
        <Text style={styles.label}>Recipient</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient (optional)"
          value={form[FORM_FIELDS.RECIPIENT]}
          onChangeText={(value) =>
            handleInputChange(FORM_FIELDS.RECIPIENT, value)
          }
        />
      </View> */}

      {/* Note */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Note</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Add a note (optional)"
          value={form[FORM_FIELDS.NOTE]}
          onChangeText={(value) => handleInputChange(FORM_FIELDS.NOTE, value)}
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
