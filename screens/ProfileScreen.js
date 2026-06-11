// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { authAPI } from '../services/api';

// const ProfileScreen = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('personal');

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const loadProfile = async () => {
//     try {
//       const userData = await AsyncStorage.getItem('userData');
//       if (userData) {
//         const parsedData = JSON.parse(userData);
//         setProfile(parsedData);
        
//         // If we have user ID, fetch detailed profile
//         if (parsedData.id) {
//           const response = await authAPI.getProfile(parsedData.id);
//           setProfile(response.data);
//         }
//       }
//     } catch (error) {
//       console.error('Error loading profile:', error);
//       Alert.alert('Error', 'Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderInfoItem = (icon, label, value) => (
//     <View style={styles.infoItem}>
//       <View style={styles.infoIcon}>
//         <Icon name={icon} size={20} color="#3498db" />
//       </View>
//       <View style={styles.infoContent}>
//         <Text style={styles.infoLabel}>{label}</Text>
//         <Text style={styles.infoValue}>{value || 'Not provided'}</Text>
//       </View>
//     </View>
//   );

//   const renderPersonalInfo = () => (
//     <View style={styles.section}>
//       <Text style={styles.sectionTitle}>Personal Information</Text>
//       {renderInfoItem('person', 'Full Name', profile?.name)}
//       {renderInfoItem('phone', 'Phone Number', profile?.phoneNumber)}
//       {renderInfoItem('email', 'Email', profile?.email)}
//       {renderInfoItem('home', 'Address', profile?.address)}
//       {renderInfoItem('badge', 'License Number', profile?.licenseNumber)}
//     </View>
//   );

//   const renderTruckInfo = () => (
//     <View style={styles.section}>
//       <Text style={styles.sectionTitle}>Truck Information</Text>
//       {renderInfoItem('local-shipping', 'Truck Number', profile?.truckNumber)}
//       {renderInfoItem('directions-bus', 'Truck Type', profile?.truckType)}
//       {renderInfoItem('fitness-center', 'Truck Capacity', profile?.truckCapacity)}
//       {renderInfoItem('build', 'Truck Make', profile?.truckMake)}
//       {renderInfoItem('calendar-today', 'Truck Year', profile?.truckYear)}
//       {renderInfoItem('palette', 'Truck Color', profile?.truckColor)}
//       {renderInfoItem('assignment', 'YC Number', profile?.ycNumber)}
//       {renderInfoItem('security', 'Insurance Number', profile?.insuranceNumber)}
//     </View>
//   );

//   const renderStats = () => (
//     <View style={styles.statsContainer}>
//       <View style={styles.statCard}>
//         <Icon name="directions-car" size={30} color="#3498db" />
//         <Text style={styles.statNumber}>{profile?.totalTrips || 0}</Text>
//         <Text style={styles.statLabel}>Total Trips</Text>
//       </View>
//       <View style={styles.statCard}>
//         <Icon name="check-circle" size={30} color="#2ecc71" />
//         <Text style={styles.statNumber}>{profile?.completedTrips || 0}</Text>
//         <Text style={styles.statLabel}>Completed</Text>
//       </View>
//       <View style={styles.statCard}>
//         <Icon name="star" size={30} color="#f39c12" />
//         <Text style={styles.statNumber}>{profile?.rating || '4.5'}</Text>
//         <Text style={styles.statLabel}>Rating</Text>
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>Loading profile...</Text>
//       </View>
//     );
//   }

//   if (!profile) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Icon name="error" size={60} color="#bdc3c7" />
//         <Text style={styles.emptyText}>No profile data found</Text>
//         <TouchableOpacity style={styles.retryButton} onPress={loadProfile}>
//           <Text style={styles.retryButtonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.avatarContainer}>
//           {profile?.driverPhoto ? (
//             <Image source={{ uri: profile.driverPhoto }} style={styles.avatar} />
//           ) : (
//             <View style={styles.avatarPlaceholder}>
//               <Icon name="person" size={40} color="white" />
//             </View>
//           )}
//         </View>
//         <Text style={styles.userName}>{profile?.name || 'Driver'}</Text>
//         <Text style={styles.userId}>ID: {profile?.id || 'N/A'}</Text>
//       </View>

//       {renderStats()}

//       <View style={styles.tabContainer}>
//         <TouchableOpacity
//           style={[styles.tab, activeTab === 'personal' && styles.activeTab]}
//           onPress={() => setActiveTab('personal')}
//         >
//           <Text style={[styles.tabText, activeTab === 'personal' && styles.activeTabText]}>
//             Personal
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tab, activeTab === 'truck' && styles.activeTab]}
//           onPress={() => setActiveTab('truck')}
//         >
//           <Text style={[styles.tabText, activeTab === 'truck' && styles.activeTabText]}>
//             Truck
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tab, activeTab === 'documents' && styles.activeTab]}
//           onPress={() => setActiveTab('documents')}
//         >
//           <Text style={[styles.tabText, activeTab === 'documents' && styles.activeTabText]}>
//             Documents
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {activeTab === 'personal' && renderPersonalInfo()}
//       {activeTab === 'truck' && renderTruckInfo()}
//       {activeTab === 'documents' && (
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Documents</Text>
//           <TouchableOpacity style={styles.documentItem}>
//             <Icon name="photo" size={24} color="#3498db" />
//             <Text style={styles.documentText}>Driver Photo</Text>
//             <Icon name="chevron-right" size={24} color="#bdc3c7" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.documentItem}>
//             <Icon name="credit-card" size={24} color="#3498db" />
//             <Text style={styles.documentText}>License Image</Text>
//             <Icon name="chevron-right" size={24} color="#bdc3c7" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.documentItem}>
//             <Icon name="local-shipping" size={24} color="#3498db" />
//             <Text style={styles.documentText}>Truck Image</Text>
//             <Icon name="chevron-right" size={24} color="#bdc3c7" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.documentItem}>
//             <Icon name="description" size={24} color="#3498db" />
//             <Text style={styles.documentText}>YC Book Image</Text>
//             <Icon name="chevron-right" size={24} color="#bdc3c7" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.documentItem}>
//             <Icon name="assignment" size={24} color="#3498db" />
//             <Text style={styles.documentText}>Insurance Image</Text>
//             <Icon name="chevron-right" size={24} color="#bdc3c7" />
//           </TouchableOpacity>
//         </View>
//       )}

//       <TouchableOpacity style={styles.editButton}>
//         <Icon name="edit" size={20} color="white" />
//         <Text style={styles.editButtonText}>Edit Profile</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#7f8c8d',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   retryButton: {
//     backgroundColor: '#3498db',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 6,
//   },
//   retryButtonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
//   header: {
//     backgroundColor: '#2c3e50',
//     alignItems: 'center',
//     padding: 30,
//     paddingBottom: 20,
//   },
//   avatarContainer: {
//     marginBottom: 15,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 3,
//     borderColor: 'white',
//   },
//   avatarPlaceholder: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#3498db',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 3,
//     borderColor: 'white',
//   },
//   userName: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   userId: {
//     color: '#bdc3c7',
//     fontSize: 14,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     padding: 15,
//     backgroundColor: 'white',
//     marginHorizontal: 15,
//     marginTop: -20,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   statCard: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 10,
//   },
//   statNumber: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginTop: 5,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#7f8c8d',
//     marginTop: 2,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     padding: 15,
//     backgroundColor: 'white',
//     marginTop: 15,
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 2,
//     borderBottomColor: 'transparent',
//   },
//   activeTab: {
//     borderBottomColor: '#3498db',
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#7f8c8d',
//     fontWeight: '600',
//   },
//   activeTabText: {
//     color: '#3498db',
//   },
//   section: {
//     backgroundColor: 'white',
//     marginTop: 10,
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: 15,
//   },
//   infoItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   infoIcon: {
//     width: 40,
//     alignItems: 'center',
//   },
//   infoContent: {
//     flex: 1,
//   },
//   infoLabel: {
//     fontSize: 12,
//     color: '#7f8c8d',
//     marginBottom: 2,
//   },
//   infoValue: {
//     fontSize: 16,
//     color: '#2c3e50',
//     fontWeight: '500',
//   },
//   documentItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   documentText: {
//     flex: 1,
//     fontSize: 16,
//     color: '#2c3e50',
//     marginLeft: 15,
//   },
//   editButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#3498db',
//     margin: 20,
//     padding: 15,
//     borderRadius: 8,
//   },
//   editButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
// });

// export default ProfileScreen;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { authAPI } from '../services/api';
 
const C = {
  primary:      '#FF6A00',
  primaryLight: '#FFF4EC',
  white:        '#FFFFFF',
  textPrimary:  '#111111',
  textSecondary:'#666666',
  border:       '#EEEEEE',
  bg:           '#F8F8F8',
  divider:      '#F2F2F2',
};
 
const TABS = ['Personal', 'Truck', 'Documents'];
 
const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Personal');
 
  useEffect(() => { loadProfile(); }, []);
 
  const loadProfile = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsed = JSON.parse(userData);
        setProfile(parsed);
        if (parsed.id) {
          const response = await authAPI.getProfile(parsed.id);
          setProfile(response.data);
        }
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };
 
  const InfoRow = ({ icon, label, value }) => (
    <View style={S.infoRow}>
      <View style={S.infoIconWrap}>
        <Icon name={icon} size={18} color={C.primary} />
      </View>
      <View style={S.infoContent}>
        <Text style={S.infoLabel}>{label}</Text>
        <Text style={S.infoValue}>{value || 'Not provided'}</Text>
      </View>
    </View>
  );
 
  const DocItem = ({ icon, label }) => (
    <TouchableOpacity style={S.docItem}>
      <View style={S.docIconWrap}>
        <Icon name={icon} size={18} color={C.primary} />
      </View>
      <Text style={S.docLabel}>{label}</Text>
      <Icon name="chevron-right" size={20} color="#CCCCCC" />
    </TouchableOpacity>
  );
 
  if (loading) {
    return <View style={S.center}><Text style={S.loadingText}>Loading profile…</Text></View>;
  }
 
  if (!profile) {
    return (
      <View style={S.center}>
        <Text style={{ fontSize: 40, marginBottom: 16 }}>😕</Text>
        <Text style={S.emptyText}>No profile data found</Text>
        <TouchableOpacity style={S.retryBtn} onPress={loadProfile}>
          <Text style={S.retryBtnText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }
 
  const initials = profile?.name
    ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';
 
  return (
    <ScrollView style={S.container} showsVerticalScrollIndicator={false}>
 
      {/* HERO HEADER */}
      <View style={S.hero}>
        <View style={S.avatarWrap}>
          {profile?.driverPhoto ? (
            <Image source={{ uri: profile.driverPhoto }} style={S.avatar} />
          ) : (
            <View style={S.avatarPlaceholder}>
              <Text style={S.avatarInitials}>{initials}</Text>
            </View>
          )}
        </View>
        <Text style={S.heroName}>{profile?.name || 'Driver'}</Text>
        <Text style={S.heroId}>ID: {profile?.id || 'N/A'}</Text>
      </View>
 
      {/* STATS */}
      <View style={S.statsRow}>
        {[
          { icon: 'directions-car', value: profile?.totalTrips || 0, label: 'Total Trips', color: C.primary },
          { icon: 'check-circle', value: profile?.completedTrips || 0, label: 'Completed', color: '#22C55E' },
          { icon: 'star', value: profile?.rating || '4.5', label: 'Rating', color: '#F59E0B' },
        ].map((s, i) => (
          <View key={i} style={S.statCard}>
            <Icon name={s.icon} size={22} color={s.color} />
            <Text style={S.statValue}>{s.value}</Text>
            <Text style={S.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>
 
      {/* TABS */}
      <View style={S.tabBar}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[S.tabItem, activeTab === tab && S.tabItemActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[S.tabText, activeTab === tab && S.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
 
      {/* TAB CONTENT */}
      <View style={S.tabContent}>
        {activeTab === 'Personal' && (
          <>
            <Text style={S.sectionTitle}>Personal Information</Text>
            <InfoRow icon="person" label="Full Name" value={profile?.name} />
            <InfoRow icon="phone" label="Phone Number" value={profile?.phoneNumber} />
            <InfoRow icon="email" label="Email" value={profile?.email} />
            <InfoRow icon="home" label="Address" value={profile?.address} />
            <InfoRow icon="badge" label="License Number" value={profile?.licenseNumber} />
          </>
        )}
 
        {activeTab === 'Truck' && (
          <>
            <Text style={S.sectionTitle}>Truck Information</Text>
            <InfoRow icon="local-shipping" label="Truck Number" value={profile?.truckNumber} />
            <InfoRow icon="directions-bus" label="Truck Type" value={profile?.truckType} />
            <InfoRow icon="fitness-center" label="Truck Capacity" value={profile?.truckCapacity} />
            <InfoRow icon="build" label="Truck Make" value={profile?.truckMake} />
            <InfoRow icon="calendar-today" label="Truck Year" value={profile?.truckYear} />
            <InfoRow icon="palette" label="Truck Color" value={profile?.truckColor} />
            <InfoRow icon="assignment" label="YC Number" value={profile?.ycNumber} />
            <InfoRow icon="security" label="Insurance Number" value={profile?.insuranceNumber} />
          </>
        )}
 
        {activeTab === 'Documents' && (
          <>
            <Text style={S.sectionTitle}>Documents</Text>
            <DocItem icon="photo" label="Driver Photo" />
            <DocItem icon="credit-card" label="License Image" />
            <DocItem icon="local-shipping" label="Truck Image" />
            <DocItem icon="description" label="YC Book Image" />
            <DocItem icon="assignment" label="Insurance Image" />
          </>
        )}
      </View>
 
      {/* EDIT BUTTON */}
      <TouchableOpacity style={S.editBtn}>
        <Icon name="edit" size={18} color={C.white} />
        <Text style={S.editBtnText}>Edit Profile</Text>
      </TouchableOpacity>
 
      <View style={{ height: 32 }} />
    </ScrollView>
  );
};
 
export default ProfileScreen;
 
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  loadingText: { fontSize: 16, color: '#666' },
  emptyText: { fontSize: 16, color: '#666', marginBottom: 20 },
  retryBtn: { backgroundColor: '#FF6A00', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  retryBtnText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
 
  hero: {
    backgroundColor: '#111111', alignItems: 'center', padding: 40, paddingTop: 60,
  },
  avatarWrap: { marginBottom: 16 },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: '#FF6A00' },
  avatarPlaceholder: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: '#FF6A00', alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarInitials: { fontSize: 32, fontWeight: '800', color: '#FFFFFF' },
  heroName: { fontSize: 24, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  heroId: { fontSize: 13, color: 'rgba(255,255,255,0.5)' },
 
  statsRow: {
    flexDirection: 'row', margin: 16, gap: 10,
  },
  statCard: {
    flex: 1, backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, alignItems: 'center',
    borderWidth: 1, borderColor: '#EEEEEE',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2,
  },
  statValue: { fontSize: 20, fontWeight: '800', color: '#111111', marginTop: 6 },
  statLabel: { fontSize: 11, color: '#666666', marginTop: 3 },
 
  tabBar: {
    flexDirection: 'row', backgroundColor: '#FFFFFF', marginHorizontal: 16,
    borderRadius: 14, padding: 4, borderWidth: 1, borderColor: '#EEEEEE', marginBottom: 12,
  },
  tabItem: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabItemActive: { backgroundColor: '#FF6A00' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#666666' },
  tabTextActive: { color: '#FFFFFF' },
 
  tabContent: {
    backgroundColor: '#FFFFFF', marginHorizontal: 16, borderRadius: 16, padding: 20,
    borderWidth: 1, borderColor: '#EEEEEE',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2,
  },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#666666', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 0.8 },
 
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 14 },
  infoIconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#FFF4EC', alignItems: 'center', justifyContent: 'center' },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 11, color: '#999999', marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5 },
  infoValue: { fontSize: 15, fontWeight: '600', color: '#111111' },
 
  docItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#F2F2F2',
  },
  docIconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#FFF4EC', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  docLabel: { flex: 1, fontSize: 15, fontWeight: '500', color: '#111111' },
 
  editBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#FF6A00', marginHorizontal: 16, marginTop: 16, paddingVertical: 16, borderRadius: 14,
    shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  editBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});