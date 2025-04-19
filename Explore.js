import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Explore({ navigation }) {
  const [searchText, setSearchText] = useState('');

  const data = [
    {
      id: '1',
      title: 'Coffee Maker - Nespresso Essenza Mini (Pre-Owned) 60$',
      description: 'Compact and efficient Nespresso coffee machine. Lightly used for 3 months.',
      image: require('../assets/images/Cmaker.jpg'),
      owner: 'Sara',
    },
    {
      id: '2',
      title: 'Books - Harry Potter Complete Box Set (Pre-Owned) 35$',
      description: 'All 7 books in good condition, hardcover set.',
      image: require('../assets/images/HarrySet.jpg'),
      owner: 'Hawra',
    },
    {
      id: '3',
      title: 'Office Chair - Ergonomic Mesh Chair (Pre-Owned) 80$',
      description: 'Comfortable ergonomic chair with lumbar support.',
      image: require('../assets/images/Chair.jpg'),
      owner: 'Ali',
    },
    {
      id: '4',
      title: 'Gaming Laptop - ASUS ROG Strix G15 (Pre-Owned) 900$',
      description: 'Pre-owned ASUS ROG Strix G15 gaming laptop, well-maintained and fully functional.',
      image: require('../assets/images/laptop.jpg'),
      owner: 'Mohamed',
    },
    {
      id: '5',
      title: 'Casual Backpack - Black, 20L (Pre-Owned) 20$',
      description: 'Fits up to a 15" laptop, multiple pockets for organization, lightly used.',
      image: require('../assets/images/BackBag.jpg'),
      owner: 'Laila',
    },
  ];

  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#757575" />
        <TextInput
          placeholder="Search for items or users.."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredData.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EFEB',
    paddingTop: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#CBD9E6',
    margin: 10,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    gap: 10,
    marginTop: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2F4358',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: '#CBD9E6',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#2F4358',
  },
});