import * as React from 'react';
import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Searchbar, Button, Avatar, Card, Text, ActivityIndicator, IconButton, Chip } from 'react-native-paper';

const SearchBarItem = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const onChangeSearch = query => setSearchQuery(query);

    const handleSearch = async () => {
        setLoading(true);
        setNotFound(false);
        setMember(null);
        try {
            const res = await fetch(`https://wee.mylivara.com/api/search-member/?member_id=${searchQuery}`);
            const data = await res.json();
            console.log('API response:', data);
            console.log('member_id:', data.member_id);
            if (data && typeof data === 'object' && data.member_id) {
                setMember(data);
              } else {
                setNotFound(true);
              }
            } catch (e) {
              setNotFound(true);
            }
            setLoading(false);
    };
    
    const handleClose = () => setMember(null);
  
    return (
        <ScrollView contentContainerStyle={{ padding: 10 }}>
      <Searchbar
        placeholder="Search by Member ID"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={handleSearch}
        onSubmitEditing={handleSearch}
        style={{ marginBottom: 16 }}
      />
      {loading && <ActivityIndicator />}
      {notFound && <Text style={{ color: 'red' }}>No member found.</Text>}
      {member && (
                <Card style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent:'flex-end' }} ><IconButton icon="close" onPress={handleClose} size={20} /></View>
                    <Card.Content>
                        <Text variant="titleMedium">Member Details</Text>
                        <Avatar.Image size={24} source={require('../assets/images/icon.png')} />
                        
            <Text>Name: {member.first_name} {member.surname}</Text>
            <Text>Member ID: {member.member_id}</Text>
            <Text>Cooperative: {member.cooperative?.fpo_name}</Text>
              <Text>Role: {member.role}</Text>
              {member.products && member.products.length > 0 && (
                <View style={{ marginTop: 8 }}>
                  <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>Products Grown:</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
                    {member.products.map((product, idx) => (
                      <Text
                        key={product.id || product}
                        style={{
                          backgroundColor: '#e0f2f1',
                          color: '#00796b',
                          borderRadius: 12,
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          marginRight: 6,
                          marginBottom: 6,
                          fontSize: 13,
                        }}
                      >
                        {product.name || product}
                      </Text>
                    ))}
                  </View>
                </View>
              )}

<Text variant="bodyMedium" style={{ fontWeight: 'bold', marginTop:20 }}>Land Statistics:</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
                {member.land_acreas ? (
                  <Chip style={{ marginRight: 6, marginBottom: 6 }}>Land Acres: {member.land_acreas}</Chip>
                ) : null}
                {member.shea_trees ? (
                  <Chip style={{ marginRight: 6, marginBottom: 6 }}>Shea Trees: {member.shea_trees}</Chip>
                ) : null}
                {member.beehives ? (
                  <Chip style={{ marginRight: 6, marginBottom: 6 }}>Beehives: {member.beehives}</Chip>
                ) : null}
                {member.sunflower_acreage ? (
                  <Chip style={{ marginRight: 6, marginBottom: 6 }}>Sunflower Acreage: {member.sunflower_acreage}</Chip>
                ) : null}
                {member.sunflower_planted ? (
                  <Chip style={{ marginRight: 6, marginBottom: 6 }}>Sunflower Planted: {member.sunflower_planted}</Chip>
                ) : null}
              </View>
              
            {/* Add more fields as needed */}
                    </Card.Content>
                    <Card.Actions style={{ fontWeight: 'bold', marginTop:20 }}>
                        <Button>Savings</Button>
                        <Button>Loan Request</Button>
                        <Button>Training</Button>
                    </Card.Actions>
        </Card>
      )}
    </ScrollView>
    );
  };
  
  export default SearchBarItem;