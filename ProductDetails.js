import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetail({ route, navigation }) {
  // Safely access route params with fallback values
  const product = route?.params?.product || {
    title: 'Product Title',
    description: 'Product Description',
    owner: 'Owner Name',
    image: require('../assets/images/BackBag.jpg'), // Default image as fallback
  };

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.productImage} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.ownerContainer}>
        <Text style={styles.owner}>Owner: {product.owner}</Text>

        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => navigation.navigate('Chat')}
        >
          <Ionicons name="chatbubbles" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.requestTradeButton}
        onPress={() => navigation.navigate('TradeRequest', { product: product })}
      >
        <Text style={styles.requestTradeText}>Request Trade</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EFEB',  // Updated to match app theme
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2F4358',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#CBD9E6',
    padding: 15,
    borderRadius: 10,
  },
  owner: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
    flex: 1,
    color: '#2F4358',
  },
  chatButton: {
    backgroundColor: '#2F4358',
    padding: 10,
    borderRadius: 20,
  },
  requestTradeButton: {
    backgroundColor: '#2F4358',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  requestTradeText: {
    color: '#F4EFEB',
    fontSize: 16,
    fontWeight: 'bold',
  },
});