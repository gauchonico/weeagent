import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

export default function AddCooperative() {
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async () => {
    const cooperative = {
      logo: null,
      fpo_name: name,
      fpo_type: null,
      balance: null,
      contact_person: contactPerson,
      phone_number: phoneNumber,
      collections: null
    };
    try {
      const response = await fetch('https://wee.mylivara.com/api/cooperatives/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cooperative),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Cooperative added!');
      } else {
        alert('Error: ' + JSON.stringify(data));
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text variant="titleLarge" style={{ marginBottom: 16 }}>Add Cooperative</Text>
        <TextInput
          label="Cooperative Name"
          value={name}
          onChangeText={setName}
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="Contact Person"
          value={contactPerson}
          onChangeText={setContactPerson}
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          style={{ marginBottom: 16 }}
        />
        <Button mode="contained" onPress={handleSubmit}>
          Save Cooperative
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}