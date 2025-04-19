import React, { useEffect } from 'react'; 
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native'; 
import { Feather } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// Mock data with proper timestamp initialization
const notificationsToday = [ 
  { 
    id: 1, 
    icon: 'package', 
    title: 'New Item Available:', 
    message: 'Maryam11 has added an iPhone 13.', 
    action: 'Check it out now!', 
    timestamp: new Date() // Current time
  }, 
  { 
    id: 2, 
    icon: 'flag', 
    title: 'Great Opportunity!', 
    message: 'hp Laptop has been added to the marketplace.', 
    action: 'Grab it before it\'s gone!', // Fixed apostrophe issue
    timestamp: new Date(Date.now() - 3600000) // 1 hour ago
  }, 
  { 
    id: 3, 
    icon: 'mail', 
    title: 'New Message:', 
    message: 'You received a message from Samaa_25 about your ad iPad Air3.', 
    action: 'Tap to reply!', 
    timestamp: new Date(Date.now() - 7200000) // 2 hours ago
  }, 
]; 

const notificationsYesterday = [ 
  { 
    id: 4, 
    icon: 'help-circle', 
    title: 'New Inquiry:', 
    message: 'Hawraa_fa asked about iPad Air3 that you listed.', 
    action: 'Check your inbox!', 
    timestamp: new Date(Date.now() - 86400000) // 1 day ago
  }, 
  { 
    id: 5, 
    icon: 'repeat', 
    title: 'Follow-Up Message:', 
    message: 'Batool21 sent another message regarding iPad Air3.', 
    action: 'Reply now!', 
    timestamp: new Date(Date.now() - 90000000) // ~25 hours ago
  }, 
]; 

const formatTime = (timestamp) => {
  const now = new Date();
  const diff = (now - timestamp) / 1000; // seconds
  
  if (diff < 60) {
    return 'Just now';
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)}m ago`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)}h ago`;
  } else {
    return timestamp.toLocaleDateString();
  }
};

export default function NotificationScreen({ navigation }) {
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  // Function to register for push notifications
  const registerForPushNotifications = async () => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    try {
      // Request permission
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        Alert.alert(
          'Notification Permission',
          'To receive notifications about new items and messages, please enable notifications.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      // Get push token
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });
      
      console.log('Push token:', token);
      
      // Here you would normally send this token to your server
      
    } catch (error) {
      console.log('Error getting push token:', error);
    }
  };

  const sendLocalNotification = async (notification) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: notification.title,
        body: notification.message,
        data: { data: notification.id },
      },
      trigger: null, // Show immediately
    });

    Alert.alert('Notification', 'This is a demo notification!');
  };

  const renderNotification = (item) => ( 
    <TouchableOpacity 
      key={item.id} 
      style={styles.notificationCard} 
      onPress={() => navigation.navigate('NotificationDetail', { notification: item })}
    > 
      <View style={styles.notificationContent}> 
        <Feather name={item.icon} size={20} color="#2F4358" style={{ marginRight: 10 }} /> 
        <View style={{ flex: 1 }}> 
          <Text style={styles.notificationTitle}>{item.title}</Text> 
          <Text style={styles.notificationMessage}>{item.message}</Text> 
          <Text style={styles.notificationAction}>{item.action}</Text>
          <Text style={styles.notificationTime}>{formatTime(item.timestamp)}</Text>
        </View>
        
        {/* Demo notification button */}
        <TouchableOpacity 
          style={styles.demoButton} 
          onPress={() => sendLocalNotification(item)}
        >
          <Text style={styles.demoButtonText}>Demo</Text>
        </TouchableOpacity>
      </View> 
    </TouchableOpacity> 
  ); 

  return ( 
    <SafeAreaView style={styles.container}> 
      <Text style={styles.dateHeader}>
        {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' }).toUpperCase()}
      </Text>
      <Text style={styles.header}>Notifications</Text> 

      <ScrollView style={{ marginTop: 10 }}> 
        <Text style={styles.sectionHeader}>Today</Text> 
        {notificationsToday.map(renderNotification)} 

        <Text style={styles.sectionHeader}>Yesterday</Text> 
        {notificationsYesterday.map(renderNotification)} 
      </ScrollView> 
    </SafeAreaView> 
  ); 
} 

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#F4EFEB', 
    paddingTop: 50, 
    paddingHorizontal: 16, 
  }, 
  dateHeader: { 
    fontSize: 12, 
    color: '#2F4358', 
    marginBottom: 4, 
    textTransform: 'uppercase', 
  }, 
  header: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#2F4358', 
    marginBottom: 10, 
  }, 
  sectionHeader: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginTop: 20, 
    marginBottom: 10, 
    color: '#2F4358', 
  }, 
  notificationCard: { 
    backgroundColor: '#CBD9E6', 
    borderRadius: 14, 
    padding: 14, 
    marginBottom: 10, 
  }, 
  notificationContent: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
  }, 
  notificationTitle: { 
    fontWeight: '700', 
    fontSize: 14, 
    color: '#2F4358', 
  }, 
  notificationMessage: { 
    fontSize: 13, 
    marginTop: 2, 
    color: '#2F4358', 
  }, 
  notificationAction: { 
    marginTop: 4, 
    fontWeight: '600', 
    fontSize: 13, 
    color: '#2F4358', 
  },
  notificationTime: {
    fontSize: 11,
    color: '#757575',
    marginTop: 4,
  },
  demoButton: {
    backgroundColor: '#2F4358',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  demoButtonText: {
    color: '#F4EFEB',
    fontSize: 12,
    fontWeight: 'bold',
  }
});