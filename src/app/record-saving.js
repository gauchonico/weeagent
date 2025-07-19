import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

export default function RecordSaving() {
  const [farmer, setFarmer] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // TODO: handle form submission
    alert(`Saving recorded: ${farmer}, ${amount}, ${date}, ${description}`);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text variant="titleLarge" style={{ marginBottom: 16 }}>Record Saving</Text>
        <TextInput
          label="Farmer Name"
          value={farmer}
          onChangeText={setFarmer}
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
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={{ marginBottom: 16 }}
        />
        <Button mode="contained" onPress={handleSubmit}>
          Save
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 