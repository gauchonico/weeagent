import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { TextInput, Button, Text, Switch, HelperText, RadioButton, Checkbox } from 'react-native-paper';
import * as Location from 'expo-location';
import { useAuth } from '../contexts/AuthContext';
import SearchableDropdown from '../components/SearchableDropdown';



export default function AddFarmer() {
  const { token } = useAuth();

  // Form state
  const [form, setForm] = useState({
    first_name: '',
    surname: '',
    othername: '',
    date_of_birth: '',
    email: '',
    member_id: '',
    phone_number: '',
    gender: '',
    role: '',
    gps_coordinates: '',
    has_mobile_money: false,
    is_verified: false,
    is_refugee: false,
    id_type: '',
    id_number: '',
    land_acreas: '',
    shea_trees: '',
    beehives: '',
    sunflower_acreage: '',
    sunflower_planted: '',
    system_id: '',
    cooperative: '',
    farmer_group: '',
    district: '',
    county: '',
    subcounty: '',
    parish: '',
    village: '',
    products: [],
  });

  // Dropdown options
  const [genderChoices, setGenderChoices] = useState([]);
  const [roleChoices, setRoleChoices] = useState([]);
  const [idTypeChoices, setIdTypeChoices] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [counties, setCounties] = useState([]);
  const [subcounties, setSubcounties] = useState([]);
  const [parishes, setParishes] = useState([]);
  const [villages, setVillages] = useState([]);
  const [farmerGroups, setFarmerGroups] = useState([]);
  const [cooperatives, setCooperatives] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch options from API
  useEffect(() => {
    fetch('https://wee.mylivara.com/api/member-choices/')
      .then(res => res.json())
      .then(data => {
        setGenderChoices(data.gender_choices || []);
        setRoleChoices(data.role_choices || []);
        setIdTypeChoices(data.id_type_choices || []);
      })
      .catch(() => {
        setGenderChoices([]);
        setRoleChoices([]);
        setIdTypeChoices([]);
      });
    fetch('https://wee.mylivara.com/api/districts/')
      .then(res => res.json())
      .then(data => setDistricts(Array.isArray(data) ? data : data.results || []))
      .catch(() => setDistricts([]));
    fetch('https://wee.mylivara.com/api/counties/')
      .then(res => res.json())
      .then(data => setCounties(Array.isArray(data) ? data : data.results || []))
      .catch(() => setCounties([]));
    fetch('https://wee.mylivara.com/api/subcounties/')
      .then(res => res.json())
      .then(data => setSubcounties(Array.isArray(data) ? data : data.results || []))
      .catch(() => setSubcounties([]));
    fetch('https://wee.mylivara.com/api/parishes/')
      .then(res => res.json())
      .then(data => setParishes(Array.isArray(data) ? data : data.results || []))
      .catch(() => setParishes([]));
    fetch('https://wee.mylivara.com/api/villages/')
      .then(res => res.json())
      .then(data => setVillages(Array.isArray(data) ? data : data.results || []))
      .catch(() => setVillages([]));
    fetch('https://wee.mylivara.com/api/farmergroups/')
      .then(res => res.json())
      .then(data => setFarmerGroups(Array.isArray(data) ? data : data.results || []))
      .catch(() => setFarmerGroups([]));
    fetch('https://wee.mylivara.com/api/cooperatives/')
      .then(res => res.json())
      .then(data => {
        console.log('Cooperatives API response:', data);
        setCooperatives(Array.isArray(data) ? data : data.results || []);
      })
      .catch(() => setCooperatives([]));
    fetch('https://wee.mylivara.com/api/products/')
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : data.results || []))
      .catch(() => setProducts([]));
  }, []);

  // Handle GPS
  const getCoordinates = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setForm({ ...form, gps_coordinates: `${location.coords.latitude},${location.coords.longitude}` });
  };

  // Handle form change
  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  // Handle submit
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://wee.mylivara.com/api/members/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(form),
      });
      const text = await response.text();
      console.log('Raw API response:', text);
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        setError('Server did not return valid JSON.');
        setLoading(false);
        return;
      }
      if (response.ok) {
        alert('Farmer added!');
        // Optionally reset form here
      } else {
        setError(JSON.stringify(data));
      }
    } catch (e) {
      console.log('Network error:', e);
      setError('Network error');
    }
    setLoading(false);
  };
  
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>Add Farmer</Text>
      
      <TextInput label="First Name" value={form.first_name} onChangeText={v => handleChange('first_name', v)} style={{ marginBottom: 8 }} />
      <TextInput label="Surname" value={form.surname} onChangeText={v => handleChange('surname', v)} style={{ marginBottom: 8 }} />
      <TextInput label="Other Name" value={form.othername} onChangeText={v => handleChange('othername', v)} style={{ marginBottom: 8 }} />
      <TextInput label="Date of Birth" value={form.date_of_birth} onChangeText={v => handleChange('date_of_birth', v)} placeholder="YYYY-MM-DD" style={{ marginBottom: 8 }} />
      <TextInput label="Email" value={form.email} onChangeText={v => handleChange('email', v)} style={{ marginBottom: 8 }} />
      <TextInput label="Member ID" value={form.member_id} onChangeText={v => handleChange('member_id', v)} style={{ marginBottom: 8 }} />
      <TextInput label="Phone Number" value={form.phone_number} onChangeText={v => handleChange('phone_number', v)} style={{ marginBottom: 8 }} />

      {/* Gender */}
      <Text style={{ marginTop: 8 }}>Gender</Text>
      <RadioButton.Group onValueChange={v => handleChange('gender', v)} value={form.gender}>
        {genderChoices.map(([value, label]) => (
          <RadioButton.Item key={value} label={label} value={value} />
        ))}
      </RadioButton.Group>

      {/* Role */}
      <Text style={{ marginTop: 8 }}>Role</Text>
      <RadioButton.Group onValueChange={v => handleChange('role', v)} value={form.role}>
        {roleChoices.map(([value, label]) => (
          <RadioButton.Item key={value} label={label} value={value} />
        ))}
      </RadioButton.Group>
      

      {/* Cooperative */}
      <Text style={{ marginTop: 8 }}>Cooperative</Text>
      <SearchableDropdown
        label="Cooperative"
        data={Array.isArray(cooperatives) ? cooperatives : []}
        value={form.cooperative}
        onChange={v => handleChange('cooperative', v)}
        displayKey='fpo_name'
      />

      {/* Farmer Group */}
      <Text style={{ marginTop: 8 }}>Farmer Group</Text>
      <SearchableDropdown
        label="Farmer Group"
        data={Array.isArray(farmerGroups) ? farmerGroups : []}
        value={form.farmer_group}
        onChange={v => handleChange('farmer_group', v)}
        displayKey='name'
      />

      {/* District */}
      <Text style={{ marginTop: 8 }}>District</Text>
      {/* <RadioButton.Group onValueChange={v => handleChange('district', v)} value={form.district}>
        {Array.isArray(districts) && districts.map(d => (
          <RadioButton.Item key={d.id} label={d.name} value={d.id} />
        ))}
      </RadioButton.Group> */}
      <SearchableDropdown
        label="District"
        data={Array.isArray(districts) ? districts : []}
        value={form.district}
        onChange={v => handleChange('district', v)}
        displayKey='name'
      />

      {/* County */}
      <Text style={{ marginTop: 8 }}>County</Text>
      {/* <RadioButton.Group onValueChange={v => handleChange('county', v)} value={form.county}>
        {Array.isArray(counties) && counties.map(c => (
          <RadioButton.Item key={c.id} label={c.name} value={c.id} />
        ))}
      </RadioButton.Group> */}
      <SearchableDropdown
        label="County"
        data={Array.isArray(counties) ? counties : []}
        value={form.county}
        onChange={v => handleChange('county', v)}
        displayKey='name'
      />

      {/* Subcounty */}
      <Text style={{ marginTop: 8 }}>Subcounty</Text>
      {/* <RadioButton.Group onValueChange={v => handleChange('subcounty', v)} value={form.subcounty}>
        {Array.isArray(subcounties) && subcounties.map(s => (
          <RadioButton.Item key={s.id} label={s.name} value={s.id} />
        ))}
      </RadioButton.Group> */}
      <SearchableDropdown
        label="Sub-County"
        data={Array.isArray(subcounties) ? subcounties : []}
        value={form.subcounty}
        onChange={v => handleChange('subcounty', v)}
        displayKey='name'
      />
      

      {/* Parish */}
      <Text style={{ marginTop: 8 }}>Parish</Text>
      {/* <RadioButton.Group onValueChange={v => handleChange('parish', v)} value={form.parish}>
        {Array.isArray(parishes) && parishes.map(p => (
          <RadioButton.Item key={p.id} label={p.name} value={p.id} />
        ))}
      </RadioButton.Group> */}
      <SearchableDropdown
        label="Parish"
        data={Array.isArray(parishes) ? parishes : []}
        value={form.parish}
        onChange={v => handleChange('parish', v)}
        displayKey='name'
      />

      {/* Village */}
      <Text style={{ marginTop: 8 }}>Village</Text>
      {/* <RadioButton.Group onValueChange={v => handleChange('village', v)} value={form.village}>
        {Array.isArray(villages) && villages.map(v => (
          <RadioButton.Item key={v.id} label={v.name} value={v.id} />
        ))}
      </RadioButton.Group> */}
      <SearchableDropdown
        label="Village"
        data={Array.isArray(villages) ? villages : []}
        value={form.village}
        onChange={v => handleChange('village', v)}
        displayKey='name'
      />

      {/* Products (multi-select) */}
      <Text style={{ marginTop: 8 }}>Products</Text>
      {Array.isArray(products) && products.map(p => (
        <View key={p.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox
            status={form.products.includes(p.id) ? 'checked' : 'unchecked'}
            onPress={() => {
              const newProducts = form.products.includes(p.id)
                ? form.products.filter(id => id !== p.id)
                : [...form.products, p.id];
              handleChange('products', newProducts);
            }}
          />
          <Text>{p.name}</Text>
        </View>
      ))}

      {/* GPS Coordinates */}
      <Button mode="outlined" onPress={getCoordinates} style={{ marginBottom: 8, marginTop: 8 }}>
        Get GPS Coordinates
      </Button>
      <TextInput label="GPS Coordinates" value={form.gps_coordinates} editable={false} style={{ marginBottom: 8 }} />

      {/* Switches */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text>Has Mobile Money</Text>
        <Switch value={form.has_mobile_money} onValueChange={v => handleChange('has_mobile_money', v)} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text>Is Verified</Text>
        <Switch value={form.is_verified} onValueChange={v => handleChange('is_verified', v)} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text>Is Refugee</Text>
        <Switch value={form.is_refugee} onValueChange={v => handleChange('is_refugee', v)} />
      </View>

      {/* ID Type */}
      <Text style={{ marginTop: 8 }}>ID Type</Text>
      <RadioButton.Group onValueChange={v => handleChange('id_type', v)} value={form.id_type}>
        {idTypeChoices.map(([value, label]) => (
          <RadioButton.Item key={value} label={label} value={value} />
        ))}
      </RadioButton.Group>

      <TextInput label="ID Number" value={form.id_number} onChangeText={v => handleChange('id_number', v)} style={{ marginBottom: 8 }} />
      <TextInput label="Land Acres" value={form.land_acreas} onChangeText={v => handleChange('land_acreas', v)} style={{ marginBottom: 8 }} />
      <TextInput label="Shea Trees" value={form.shea_trees} onChangeText={v => handleChange('shea_trees', v)} style={{ marginBottom: 8 }} />
      <TextInput label="Beehives" value={form.beehives} onChangeText={v => handleChange('beehives', v)} style={{ marginBottom: 8 }} />
      <TextInput label="Sunflower Acreage" value={form.sunflower_acreage} onChangeText={v => handleChange('sunflower_acreage', v)} style={{ marginBottom: 8 }} />
      <TextInput label="Sunflower Planted" value={form.sunflower_planted} onChangeText={v => handleChange('sunflower_planted', v)} style={{ marginBottom: 8 }} />
      <TextInput label="System ID" value={form.system_id} onChangeText={v => handleChange('system_id', v)} style={{ marginBottom: 8 }} />

      {error ? <HelperText type="error">{error}</HelperText> : null}
      <Button mode="contained" onPress={handleSubmit} loading={loading} disabled={loading} style={{ marginTop: 16 }}>
        Add Farmer
      </Button>
    </ScrollView>
  );
}