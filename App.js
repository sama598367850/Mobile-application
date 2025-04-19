// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import ProfileScreen from './components/Profile';
import ExploreScreen from './components/Explore';
import NewPostScreen from './components/NewPostScreen';
import ChatScreen from './components/Chat';
import NotificationScreen from './components/Notificaton'; // Note: Consider fixing the typo
import ProductDetailScreen from './components/ProductDetails';
import NotificationDetailScreen from './components/NotificationDetail';
import SetUpScreen from './components/SetUp';
import LoginScreen from './components/LoginScreen';


// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator - Notice this doesn't have NavigationContainer anymore
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = 'person';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Explore') {
            iconName = 'search';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'NewPost') {
            iconName = 'plus-square';
            return <Feather name={iconName} size={size} color={color} />;
          } else if (route.name === 'Chat') {
            iconName = 'chatbubble-ellipses-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Notifications') {
            iconName = 'notifications-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#2F4358',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          backgroundColor: '#CBD9E6',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 60,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
      <Tab.Screen name="NewPost" component={NewPostScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Notifications" component={NotificationScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

// Main App Component
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <Stack.Navigator 
  initialRouteName="Login"
  screenOptions={{
    headerStyle: {
      backgroundColor: '#CBD9E6',
    },
    headerTintColor: '#2F4358',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
>
  <Stack.Screen 
    name="Login" 
    component={LoginScreen} 
    options={{ headerShown: false }} 
  />
  <Stack.Screen 
    name="Setup" 
    component={SetUpScreen} 
    options={{ headerShown: false }} 
  />
          <Stack.Screen 
            name="Main" 
            component={BottomTabNavigator} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen} 
            options={{
              title: "Product Details",
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen 
            name="NotificationDetail" 
            component={NotificationDetailScreen} 
            options={{
              title: "Notification",
              headerBackTitle: "Back",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;