import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Modal,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [tradeModalVisible, setTradeModalVisible] = useState(false);
  
  // Sample trade items
  const tradeItems = [
    {
      id: '1',
      name: 'Basketball',
      description: 'Official NBA basketball, lightly used',
      image: require('../assets/images/basketball.png'),
      condition: 'Good',
      originalPrice: '120 SAR',
      tradePrice: '85 SAR'
    },
    {
      id: '2',
      name: 'Soccer Ball',
      description: 'Adidas soccer ball, almost new',
      image: require('../assets/images/basketball.png'), // Replace with actual soccer ball image
      condition: 'Excellent',
      originalPrice: '150 SAR',
      tradePrice: '100 SAR'
    },
    {
      id: '3',
      name: 'Tennis Racket',
      description: 'Wilson tennis racket with case',
      image: require('../assets/images/basketball.png'), // Replace with actual tennis racket image
      condition: 'Very Good',
      originalPrice: '300 SAR',
      tradePrice: '200 SAR'
    }
  ];
  
  // Sample traded history
  const tradedHistory = [
    {
      id: '1',
      name: 'Volleyball',
      tradedWith: 'Mohammed21',
      date: '12 Mar 2025',
      price: '75 SAR'
    },
    {
      id: '2',
      name: 'Golf Clubs Set',
      tradedWith: 'Sara_sports',
      date: '28 Feb 2025',
      price: '450 SAR'
    }
  ];
  
  const renderTradeItem = ({ item }) => (
    <TouchableOpacity style={styles.tradeItemCard}>
      <Image source={item.image} style={styles.tradeItemImage} />
      <View style={styles.tradeItemDetails}>
        <Text style={styles.tradeItemName}>{item.name}</Text>
        <Text style={styles.tradeItemDescription}>{item.description}</Text>
        <View style={styles.tradeItemRow}>
          <Text style={styles.tradeItemLabel}>Condition:</Text>
          <Text style={styles.tradeItemValue}>{item.condition}</Text>
        </View>
        <View style={styles.tradeItemPricing}>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          <Text style={styles.tradePrice}>{item.tradePrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const renderTradedHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyItemName}>{item.name}</Text>
      <View style={styles.historyItemRow}>
        <Text style={styles.historyItemLabel}>Traded with:</Text>
        <Text style={styles.historyItemValue}>{item.tradedWith}</Text>
      </View>
      <View style={styles.historyItemRow}>
        <Text style={styles.historyItemLabel}>Date:</Text>
        <Text style={styles.historyItemValue}>{item.date}</Text>
      </View>
      <View style={styles.historyItemRow}>
        <Text style={styles.historyItemLabel}>Price:</Text>
        <Text style={styles.historyItemValue}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header with Image */}
      <View style={styles.profileHeader}>
        <Image 
          source={require('../assets/images/profile_pic.png')}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Alex Wilson</Text>
          <Text style={styles.username}>@AlexWaa</Text>
          
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#2F4358" />
            <Text style={styles.location}>Jubail, Saudi Arabia</Text>
          </View>
          
          <Text style={styles.interestsLabel}>Interests</Text>
          <View style={styles.interestTags}>
            <View style={styles.interestTag}>
              <Text style={styles.interestTagText}>Sport Equipment</Text>
            </View>
            <View style={styles.interestTag}>
              <Text style={styles.interestTagText}>Electronics</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Stats Row */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>87</Text>
          <Text style={styles.statLabel}>Trades</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>388</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>64</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
      
      {/* Trade Button with Basketball Image */}
      <TouchableOpacity 
        style={styles.tradeButton} 
        activeOpacity={0.8}
        onPress={() => setTradeModalVisible(true)}
      >
        <View style={styles.tradeItem}>
          <Image 
            source={require('../assets/images/basketball.png')}
            style={styles.tradeImage}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.tradeButtonText}>Basketball</Text>
            <Text style={styles.tradeButtonSubtext}>+ 2 more items</Text>
          </View>
        </View>
        <Text style={styles.tradeButtonAction}>TRADE</Text>
      </TouchableOpacity>
      
      {/* My Items Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>My Items</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      {/* Items Grid - Placeholder */}
      <View style={styles.itemsGrid}>
        <View style={styles.itemCard}>
          <Image 
            source={require('../assets/images/basketball.png')}
            style={styles.itemImage}
          />
          <Text style={styles.itemName}>Basketball</Text>
          <Text style={styles.itemPrice}>85 SAR</Text>
        </View>
        
        <View style={styles.itemCard}>
          <Image 
            source={require('../assets/images/basketball.png')}  // Replace with soccer ball image
            style={styles.itemImage}
          />
          <Text style={styles.itemName}>Soccer Ball</Text>
          <Text style={styles.itemPrice}>100 SAR</Text>
        </View>
        
        <View style={styles.itemCard}>
          <Image 
            source={require('../assets/images/basketball.png')}  // Replace with tennis racket image
            style={styles.itemImage}
          />
          <Text style={styles.itemName}>Tennis Racket</Text>
          <Text style={styles.itemPrice}>200 SAR</Text>
        </View>
      </View>
      
      {/* Rating Section */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>Seller Rating</Text>
        <View style={styles.ratingStars}>
          <Ionicons name="star" size={18} color="#FFD700" />
          <Ionicons name="star" size={18} color="#FFD700" />
          <Ionicons name="star" size={18} color="#FFD700" />
          <Ionicons name="star" size={18} color="#FFD700" />
          <Ionicons name="star-half" size={18} color="#FFD700" />
        </View>
        <Text style={styles.ratingScore}>4.5/5</Text>
        <Text style={styles.ratingCount}>(32 ratings)</Text>
      </View>
      
      {/* Trade Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={tradeModalVisible}
        onRequestClose={() => setTradeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>My Trade Items</Text>
              <TouchableOpacity onPress={() => setTradeModalVisible(false)}>
                <Ionicons name="close" size={24} color="#2F4358" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.tabContainer}>
              <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                <Text style={[styles.tabText, styles.activeTabText]}>Available (3)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab}>
                <Text style={styles.tabText}>History (2)</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={tradeItems}
              renderItem={renderTradeItem}
              keyExtractor={item => item.id}
              style={styles.tradeList}
            />
            
            <TouchableOpacity style={styles.addTradeButton}>
              <Ionicons name="add-circle" size={18} color="#F4EFEB" />
              <Text style={styles.addTradeButtonText}>Add New Trade Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EFEB',
  },
  profileHeader: {
    padding: 20,
    backgroundColor: '#CBD9E6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#2F4358',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F4358',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: '#2F4358',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  location: {
    fontSize: 14,
    color: '#2F4358',
    marginLeft: 5,
  },
  interestsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2F4358',
    marginBottom: 5,
  },
  interestTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#2F4358',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  interestTagText: {
    color: '#F4EFEB',
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD9E6',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F4358',
  },
  statLabel: {
    fontSize: 14,
    color: '#2F4358',
  },
  tradeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#CBD9E6',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tradeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tradeImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#F4EFEB',
  },
  tradeButtonText: {
    fontSize: 16,
    color: '#2F4358',
    fontWeight: 'bold',
  },
  tradeButtonSubtext: {
    fontSize: 12,
    color: '#757575',
  },
  tradeButtonAction: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F4358',
    backgroundColor: '#F4EFEB',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F4358',
  },
  viewAllButton: {},
  viewAllText: {
    color: '#757575',
    fontSize: 14,
  },
  itemsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    flexWrap: 'wrap',
  },
  itemCard: {
    width: '30%',
    marginHorizontal: '1.6%',
    backgroundColor: '#CBD9E6',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginBottom: 5,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2F4358',
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 12,
    color: '#2F4358',
  },
  ratingContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#CBD9E6',
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F4358',
    marginBottom: 10,
  },
  ratingStars: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  ratingScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F4358',
  },
  ratingCount: {
    fontSize: 14,
    color: '#757575',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#F4EFEB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F4358',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD9E6',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#2F4358',
  },
  tabText: {
    fontSize: 14,
    color: '#757575',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#2F4358',
  },
  tradeList: {
    maxHeight: 400,
  },
  tradeItemCard: {
    backgroundColor: '#CBD9E6',
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 15,
    padding: 10,
  },
  tradeItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  tradeItemDetails: {
    flex: 1,
  },
  tradeItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F4358',
    marginBottom: 5,
  },
  tradeItemDescription: {
    fontSize: 14,
    color: '#2F4358',
    marginBottom: 5,
  },
  tradeItemRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  tradeItemLabel: {
    fontSize: 14,
    color: '#757575',
    marginRight: 5,
  },
  tradeItemValue: {
    fontSize: 14,
    color: '#2F4358',
  },
  tradeItemPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  originalPrice: {
    fontSize: 14,
    color: '#757575',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  tradePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F4358',
  },
  historyItem: {
    backgroundColor: '#CBD9E6',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  historyItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F4358',
    marginBottom: 10,
  },
  historyItemRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  historyItemLabel: {
    fontSize: 14,
    color: '#757575',
    width: 100,
  },
  historyItemValue: {
    fontSize: 14,
    color: '#2F4358',
  },
  addTradeButton: {
    backgroundColor: '#2F4358',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  addTradeButtonText: {
    color: '#F4EFEB',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ProfileScreen;