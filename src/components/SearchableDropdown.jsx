import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Menu, List } from 'react-native-paper';

export default function SearchableDropdown({ label, data, value, onChange, displayKey='name' }) {
  const [visible, setVisible] = useState(false);
    const [query, setQuery] = useState('');
    const selectedItem = Array.isArray(data) ? data.find(item => item.id === value) : null;


    const filtered = Array.isArray(data)
    ? data.filter(
        item =>
          ((item && item[displayKey]) ? item[displayKey] : '')
            .toLowerCase()
            .includes((query || '').toLowerCase())
      )
    : [];

    return (
        <View style={{ marginBottom: 16 }}>
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <TextInput
                label={label}
                value={selectedItem ? selectedItem[displayKey] : query}
                onFocus={() => setVisible(true)}
                onChangeText={text => {
                  setQuery(text);
                  setVisible(true);
                  onChange(''); // clear selection when typing
                }}
                right={<TextInput.Icon icon="menu-down" />}
                style={{ backgroundColor: 'white' }}
              />
            }
            style={{ width: '70%' }}
          >
            {filtered.length === 0 ? (
              <List.Item title="No results" />
            ) : (
              filtered.slice(0, 10).map(item => (
                <List.Item
                  key={item.id}
                  title={item[displayKey]}
                  onPress={() => {
                    onChange(item.id);
                    setQuery(item[displayKey]);
                    setVisible(false);
                  }}
                />
              ))
            )}
          </Menu>
        </View>
      );
}