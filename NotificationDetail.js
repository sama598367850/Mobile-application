import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function NotificationDetail({ route, navigation }) {
  // Check if route and route.params exist to avoid the error
  const notification = route?.params?.notification || {
    icon: 'bell',
    title: 'Notification Title',
    message: 'Notification Message Content',
    action: 'Default Action',
    timestamp: new Date(),
  };
  
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    return timestamp instanceof Date 
      ? timestamp.toLocaleString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : '';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Feather name={notification.icon} size={30} color="#2F4358" />
          <Text style={styles.title}>{notification.title}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <Text style={styles.message}>{notification.message}</Text>
        
        <View style={styles.meta}>
          <Text style={styles.date}>{formatDate(notification.timestamp)}</Text>
          <Text style={styles.actionLabel}>Action Needed:</Text>
          <Text style={styles.action}>{notification.action}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {
              // Handle appropriate action based on notification type
              if (notification.icon === 'mail' || notification.icon === 'help-circle') {
                navigation.navigate('Chat');
              } else if (notification.icon === 'package' || notification.icon === 'flag') {
                navigation.navigate('Explore');
              }
            }}
          >
            <Text style={styles.buttonText}>Respond Now</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.helpCard}>
        <Text style={styles.helpTitle}>About Notifications</Text>
        <Text style={styles.helpText}>
          You'll receive notifications about new messages, items that match your interests, 
          and updates on your trades. You can manage your notification settings in your profile.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4EFEB',
  },
  card: {
    backgroundColor: '#CBD9E6',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F4358',
    marginLeft: 10,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#2F4358',
    opacity: 0.2,
    marginBottom: 15,
  },
  message: {
    fontSize: 18,
    color: '#2F4358',
    marginBottom: 20,
    lineHeight: 24,
  },
  meta: {
    backgroundColor: 'rgba(47, 67, 88, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 10,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F4358',
    marginBottom: 5,
  },
  action: {
    fontSize: 16,
    color: '#2F4358',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#2F4358',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#F4EFEB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2F4358',
  },
  secondaryButtonText: {
    color: '#2F4358',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpCard: {
    backgroundColor: '#CBD9E6',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F4358',
    marginBottom: 10,
  },
  helpText: {
    fontSize: 14,
    color: '#2F4358',
    lineHeight: 20,
  }
});