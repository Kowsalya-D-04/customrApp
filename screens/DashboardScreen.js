import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserData();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.replace('Login');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const menuItems = [
    {
      title: 'Create Load Request',
      icon: 'add-circle',
      color: '#3498db',
      screen: 'CreateLoadRequest',
      description: 'Book a truck for your goods',
    },
    {
      title: 'My Load Requests',
      icon: 'list-alt',
      color: '#2ecc71',
      screen: 'MyLoadRequests',
      description: 'View your booking history',
    },
    {
      title: 'Check Trip Status',
      icon: 'assignment',
      color: '#e74c3c',
      screen: 'TripStatus',
      description: 'Track your current trips',
    },
    {
      title: 'Make Payment',
      icon: 'payment',
      color: '#9b59b6',
      screen: 'Payment',
      description: 'Pay for completed trips',
    },
    {
      title: 'My Profile',
      icon: 'person',
      color: '#f39c12',
      screen: 'Profile',
      description: 'View and edit profile',
    },
    {
      title: 'Help & Support',
      icon: 'help',
      color: '#1abc9c',
      screen: 'Help',
      description: 'Get assistance',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="local-shipping" size={30} color="white" />
          <Text style={styles.headerTitle}>Truck Booking</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileIcon}>
            <Icon name="person" size={40} color="white" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>
              {userData?.name || 'Welcome, Customer'}
            </Text>
            <Text style={styles.userPhone}>
              <Icon name="phone" size={14} color="#666" /> {userData?.phoneNumber || ''}
            </Text>
            <Text style={styles.userEmail}>
              <Icon name="email" size={14} color="#666" /> {userData?.email || ''}
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Active Trips</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>₹0</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Quick Actions</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                if (item.screen === 'Profile') {
                  // For now, just show user data
                  Alert.alert(
                    'Profile Info',
                    `Name: ${userData?.name || 'N/A'}\nPhone: ${userData?.phoneNumber || 'N/A'}\nEmail: ${userData?.email || 'N/A'}`
                  );
                } else if (item.screen === 'Help') {
                  Alert.alert(
                    'Help & Support',
                    'Contact us: 1800-123-4567\nEmail: support@truckbooking.com'
                  );
                } else {
                  navigation.navigate(item.screen);
                }
              }}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                <Icon name={item.icon} size={24} color="white" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemDesc}>{item.description}</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <Icon name="info" size={20} color="#f39c12" />
            <Text style={styles.activityText}>No recent activity</Text>
          </View>
          <Text style={styles.activityHint}>
            Create your first load request to get started!
          </Text>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateLoadRequest')}
      >
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileCard: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  userEmail: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  menuContainer: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  menuItemDesc: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 2,
  },
  activityContainer: {
    backgroundColor: 'white',
    margin: 15,
    marginTop: 5,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff9e6',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#f39c12',
  },
  activityText: {
    marginLeft: 10,
    color: '#666',
  },
  activityHint: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default DashboardScreen;