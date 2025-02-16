import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import config from '../config';

function CategoriesScreen(props) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${config.URL}/user/categories`)
      .then((response) => {
        debugger;
        if (response.data.status === 'success') {
          setCategories(response.data.data);
        } else {
          alert('Failed to fetch categories');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error fetching categories');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
        

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => props.navigation.navigate('go-products', { categoryId: item.id })}
              style={{
                width: '48%',
                padding: 20,
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 8,
                backgroundColor: '#f9f9f9',
                alignItems: 'center',
                marginBottom: 15,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                elevation: 4,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

export default CategoriesScreen;
