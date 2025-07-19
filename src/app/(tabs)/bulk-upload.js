import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Card, IconButton } from 'react-native-paper';
// You may need to use expo-document-picker or similar for real file picking
import * as DocumentPicker from 'expo-document-picker';

export default function BulkUpload() {
  const [file, setFile] = useState(null);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'text/csv',
        copyToCacheDirectory: true,
      });
      if (result.type === 'success') {
        setFile(result);
      }
    } catch (e) {
      alert('Could not pick file.');
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a CSV file first.');
      return;
    }
    // TODO: handle file upload logic
    alert(`File '${file.name}' uploaded for processing!`);
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
      <Card style={{ padding: 24, borderRadius: 16, elevation: 2 }}>
        <Card.Content>
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <IconButton icon="file-upload" size={40} />
            <Text variant="titleLarge" style={{ marginBottom: 8 }}>Bulk Upload</Text>
            <Text style={{ textAlign: 'center', marginBottom: 16 }}>
              Upload a CSV file containing farmers, loans, or savings data. The file will be processed later on the system.
            </Text>
          </View>
          <Button
            mode="outlined"
            icon="file"
            onPress={pickFile}
            style={{ marginBottom: 16 }}
          >
            {file ? 'Change File' : 'Select CSV File'}
          </Button>
          {file && (
            <Text style={{ marginBottom: 16, textAlign: 'center' }}>
              Selected: <Text style={{ fontWeight: 'bold' }}>{file.name}</Text>
            </Text>
          )}
          <Button
            mode="contained"
            icon="upload"
            onPress={handleUpload}
            disabled={!file}
          >
            Upload
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}