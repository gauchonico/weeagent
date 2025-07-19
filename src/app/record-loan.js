import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

export default function RecordLoan() {
  const [farmer, setFarmer] = useState('');
  const [weeid, setWeeid] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    // TODO: handle form submission
    alert(`Loan recorded: ${farmer}, ${amount}, ${date}`);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80} // adjust if you have a header
    >
      <ScrollView>
        <View style={{ flex: 1, padding: 16 }}>
          <Text variant="titleLarge" style={{ marginBottom: 16 }}>Record Loan</Text>
          <TextInput
            label="Farmer Name"
            value={farmer}
            onChangeText={setFarmer}
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="WEE ID"
            value={weeid}
            onChangeText={setWeeid}
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Date"
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            style={{ marginBottom: 16 }}
          />
          <Button mode="contained" onPress={handleSubmit}>
            Save Loan
          </Button>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
} 