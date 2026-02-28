import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../services/api';

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setProfile(parsedData);
        
        // If we have user ID, fetch detailed profile
        if (parsedData.id) {
          const response = await authAPI.getProfile(parsedData.id);
          setProfile(response.data);
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const renderInfoItem = (icon, label, value) => (
    <View style={styles.infoItem}>
      <View style={styles.infoIcon}>
        <Icon name={icon} size={20} color="#3498db" />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value || 'Not provided'}</Text>
      </View>
    </View>
  );

  const renderPersonalInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      {renderInfoItem('person', 'Full Name', profile?.name)}
      {renderInfoItem('phone', 'Phone Number', profile?.phoneNumber)}
      {renderInfoItem('email', 'Email', profile?.email)}
      {renderInfoItem('home', 'Address', profile?.address)}
      {renderInfoItem('badge', 'License Number', profile?.licenseNumber)}
    </View>
  );

  const renderTruckInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Truck Information</Text>
      {renderInfoItem('local-shipping', 'Truck Number', profile?.truckNumber)}
      {renderInfoItem('directions-bus', 'Truck Type', profile?.truckType)}
      {renderInfoItem('fitness-center', 'Truck Capacity', profile?.truckCapacity)}
      {renderInfoItem('build', 'Truck Make', profile?.truckMake)}
      {renderInfoItem('calendar-today', 'Truck Year', profile?.truckYear)}
      {renderInfoItem('palette', 'Truck Color', profile?.truckColor)}
      {renderInfoItem('assignment', 'YC Number', profile?.ycNumber)}
      {renderInfoItem('security', 'Insurance Number', profile?.insuranceNumber)}
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Icon name="directions-car" size={30} color="#3498db" />
        <Text style={styles.statNumber}>{profile?.totalTrips || 0}</Text>
        <Text style={styles.statLabel}>Total Trips</Text>
      </View>
      <View style={styles.statCard}>
        <Icon name="check-circle" size={30} color="#2ecc71" />
        <Text style={styles.statNumber}>{profile?.completedTrips || 0}</Text>
        <Text style={styles.statLabel}>Completed</Text>
      </View>
      <View style={styles.statCard}>
        <Icon name="star" size={30} color="#f39c12" />
        <Text style={styles.statNumber}>{profile?.rating || '4.5'}</Text>
        <Text style={styles.statLabel}>Rating</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="error" size={60} color="#bdc3c7" />
        <Text style={styles.emptyText}>No profile data found</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadProfile}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {profile?.driverPhoto ? (
            <Image source={{ uri: profile.driverPhoto }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Icon name="person" size={40} color="white" />
            </View>
          )}
        </View>
        <Text style={styles.userName}>{profile?.name || 'Driver'}</Text>
        <Text style={styles.userId}>ID: {profile?.id || 'N/A'}</Text>
      </View>

      {renderStats()}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'personal' && styles.activeTab]}
          onPress={() => setActiveTab('personal')}
        >
          <Text style={[styles.tabText, activeTab === 'personal' && styles.activeTabText]}>
            Personal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'truck' && styles.activeTab]}
          onPress={() => setActiveTab('truck')}
        >
          <Text style={[styles.tabText, activeTab === 'truck' && styles.activeTabText]}>
            Truck
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'documents' && styles.activeTab]}
          onPress={() => setActiveTab('documents')}
        >
          <Text style={[styles.tabText, activeTab === 'documents' && styles.activeTabText]}>
            Documents
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'personal' && renderPersonalInfo()}
      {activeTab === 'truck' && renderTruckInfo()}
      {activeTab === 'documents' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <TouchableOpacity style={styles.documentItem}>
            <Icon name="photo" size={24} color="#3498db" />
            <Text style={styles.documentText}>Driver Photo</Text>
            <Icon name="chevron-right" size={24} color="#bdc3c7" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.documentItem}>
            <Icon name="credit-card" size={24} color="#3498db" />
            <Text style={styles.documentText}>License Image</Text>
            <Icon name="chevron-right" size={24} color="#bdc3c7" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.documentItem}>
            <Icon name="local-shipping" size={24} color="#3498db" />
            <Text style={styles.documentText}>Truck Image</Text>
            <Icon name="chevron-right" size={24} color="#bdc3c7" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.documentItem}>
            <Icon name="description" size={24} color="#3498db" />
            <Text style={styles.documentText}>YC Book Image</Text>
            <Icon name="chevron-right" size={24} color="#bdc3c7" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.documentItem}>
            <Icon name="assignment" size={24} color="#3498db" />
            <Text style={styles.documentText}>Insurance Image</Text>
            <Icon name="chevron-right" size={24} color="#bdc3c7" />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.editButton}>
        <Icon name="edit" size={20} color="white" />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginTop: 10,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    padding: 30,
    paddingBottom: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  userName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userId: {
    color: '#bdc3c7',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: -20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    marginTop: 15,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#3498db',
  },
  tabText: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#3498db',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    width: 40,
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  documentText: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    marginLeft: 15,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    margin: 20,
    padding: 15,
    borderRadius: 8,
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfileScreen;