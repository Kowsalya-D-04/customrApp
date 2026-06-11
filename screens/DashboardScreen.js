// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useState } from 'react';
// import {
//   Alert,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const DashboardScreen = ({ navigation }) => {
//   const [userData, setUserData] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     loadUserData();
//   }, []);

//   const loadUserData = async () => {
//     try {
//       const data = await AsyncStorage.getItem('userData');
//       if (data) {
//         setUserData(JSON.parse(data));
//       }
//     } catch (error) {
//       console.error('Error loading user data:', error);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadUserData();
//     setRefreshing(false);
//   };

//   const handleLogout = async () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Logout',
//           onPress: async () => {
//             await AsyncStorage.clear();
//             navigation.replace('Login');
//           },
//           style: 'destructive',
//         },
//       ]
//     );
//   };

//   const menuItems = [
//     {
//       title: 'Create Load Request',
//       icon: 'add-circle',
//       color: '#3498db',
//       screen: 'CreateLoadRequest',
//       description: 'Book a truck for your goods',
//     },
//     {
//       title: 'My Load Requests',
//       icon: 'list-alt',
//       color: '#2ecc71',
//       screen: 'MyLoadRequests',
//       description: 'View your booking history',
//     },
//     // {
//     //   title: 'Check Trip Status',
//     //   icon: 'assignment',
//     //   color: '#e74c3c',
//     //   screen: 'TripStatus',
//     //   description: 'Track your current trips',
//     // },
//     // {
//     //   title: 'Make Payment',
//     //   icon: 'payment',
//     //   color: '#9b59b6',
//     //   screen: 'Payment',
//     //   description: 'Pay for completed trips',
//     // },
//     {
//       title: 'My Profile',
//       icon: 'person',
//       color: '#f39c12',
//       screen: 'Profile',
//       description: 'View and edit profile',
//     },
//     {
//       title: 'Help & Support',
//       icon: 'help',
//       color: '#1abc9c',
//       screen: 'Help',
//       description: 'Get assistance',
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <Icon name="local-shipping" size={30} color="white" />
//           <Text style={styles.headerTitle}>Truck Booking</Text>
//         </View>
//         <TouchableOpacity onPress={handleLogout}>
//           <Icon name="logout" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         {/* User Profile Card */}
//         <View style={styles.profileCard}>
//           <View style={styles.profileIcon}>
//             <Icon name="person" size={40} color="white" />
//           </View>
//           <View style={styles.profileInfo}>
//             <Text style={styles.userName}>
//               {userData?.name || 'Welcome, Customer'}
//             </Text>
//             <Text style={styles.userPhone}>
//               <Icon name="phone" size={14} color="#666" /> {userData?.phoneNumber || ''}
//             </Text>
//             <Text style={styles.userEmail}>
//               <Icon name="email" size={14} color="#666" /> {userData?.email || ''}
//             </Text>
//           </View>
//         </View>

//         {/* Quick Stats */}
//         <View style={styles.statsContainer}>
//           <View style={styles.statItem}>
//             <Text style={styles.statNumber}>0</Text>
//             <Text style={styles.statLabel}>Active Trips</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Text style={styles.statNumber}>0</Text>
//             <Text style={styles.statLabel}>Completed</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Text style={styles.statNumber}>₹0</Text>
//             <Text style={styles.statLabel}>Total Spent</Text>
//           </View>
//         </View>

//         {/* Menu Items */}
//         <View style={styles.menuContainer}>
//           <Text style={styles.menuTitle}>Quick Actions</Text>
//           {menuItems.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.menuItem}
//               onPress={() => {
//                 if (item.screen === 'Profile') {
//                   // For now, just show user data
//                   Alert.alert(
//                     'Profile Info',
//                     `Name: ${userData?.name || 'N/A'}\nPhone: ${userData?.phoneNumber || 'N/A'}\nEmail: ${userData?.email || 'N/A'}`
//                   );
//                 } else if (item.screen === 'Help') {
//                   Alert.alert(
//                     'Help & Support',
//                     'Contact us: 9566137117\nEmail: info@rightpolamright.com'
//                   );
//                 } else {
//                   navigation.navigate(item.screen);
//                 }
//               }}
//             >
//               <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
//                 <Icon name={item.icon} size={24} color="white" />
//               </View>
//               <View style={styles.menuContent}>
//                 <Text style={styles.menuItemTitle}>{item.title}</Text>
//                 <Text style={styles.menuItemDesc}>{item.description}</Text>
//               </View>
//               <Icon name="chevron-right" size={24} color="#ccc" />
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Recent Activity */}
//         <View style={styles.activityContainer}>
//           <Text style={styles.sectionTitle}>Recent Activity</Text>
//           <View style={styles.activityCard}>
//             <Icon name="info" size={20} color="#f39c12" />
//             <Text style={styles.activityText}>No recent activity</Text>
//           </View>
//           <Text style={styles.activityHint}>
//             Create your first load request to get started!
//           </Text>
//         </View>
//       </ScrollView>

//       {/* Floating Action Button */}
//       <TouchableOpacity
//         style={styles.fab}
//         onPress={() => navigation.navigate('CreateLoadRequest')}
//       >
//         <Icon name="add" size={30} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     backgroundColor: '#2e6ee2',
//     padding: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingBottom: 15,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   profileCard: {
//     backgroundColor: 'white',
//     margin: 15,
//     borderRadius: 15,
//     padding: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   profileIcon: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: '#1994e6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   profileInfo: {
//     flex: 1,
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//   },
//   userPhone: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 5,
//   },
//   userEmail: {
//     fontSize: 12,
//     color: '#888',
//     marginTop: 2,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     marginHorizontal: 15,
//     marginBottom: 15,
//     borderRadius: 15,
//     padding: 15,
//     justifyContent: 'space-around',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   statItem: {
//     alignItems: 'center',
//   },
//   statNumber: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#7f8c8d',
//     marginTop: 5,
//   },
//   menuContainer: {
//     backgroundColor: 'white',
//     margin: 15,
//     borderRadius: 15,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   menuTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: 15,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   menuIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   menuContent: {
//     flex: 1,
//   },
//   menuItemTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#2c3e50',
//   },
//   menuItemDesc: {
//     fontSize: 12,
//     color: '#7f8c8d',
//     marginTop: 2,
//   },
//   activityContainer: {
//     backgroundColor: 'white',
//     margin: 15,
//     marginTop: 5,
//     borderRadius: 15,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: 15,
//   },
//   activityCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff9e6',
//     padding: 15,
//     borderRadius: 10,
//     borderLeftWidth: 4,
//     borderLeftColor: '#f39c12',
//   },
//   activityText: {
//     marginLeft: 10,
//     color: '#666',
//   },
//   activityHint: {
//     fontSize: 12,
//     color: '#888',
//     textAlign: 'center',
//     marginTop: 10,
//     fontStyle: 'italic',
//   },
//   fab: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#3498db',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//   },
// });

// export default DashboardScreen;



// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useState } from 'react';
// import {
//   Alert,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
 
// const C = {
//   primary:      '#FF6A00',
//   primaryLight: '#FFF4EC',
//   white:        '#FFFFFF',
//   textPrimary:  '#111111',
//   textSecondary:'#666666',
//   border:       '#EEEEEE',
//   bg:           '#F8F8F8',
//   divider:      '#F2F2F2',
// };
 
// const DashboardScreen = ({ navigation }) => {
//   const [userData, setUserData] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
 
//   useEffect(() => { loadUserData(); }, []);
 
//   const loadUserData = async () => {
//     try {
//       const data = await AsyncStorage.getItem('userData');
//       if (data) setUserData(JSON.parse(data));
//     } catch (e) { console.error(e); }
//   };
 
//   const onRefresh = async () => { setRefreshing(true); await loadUserData(); setRefreshing(false); };
 
//   const handleLogout = () => {
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Logout', style: 'destructive', onPress: async () => { await AsyncStorage.clear(); navigation.replace('Login'); } },
//     ]);
//   };
 
//   const menuItems = [
//     { title: 'Create Load Request', icon: 'add-circle-outline', color: C.primary, screen: 'CreateLoadRequest', description: 'Book a truck for your goods', emoji: '📦' },
//     { title: 'My Load Requests',    icon: 'list-alt',           color: '#22C55E',  screen: 'MyLoadRequests',   description: 'View your booking history',  emoji: '📋' },
//     { title: 'My Profile',          icon: 'person-outline',     color: '#8B5CF6',  screen: 'Profile',          description: 'View and edit your profile', emoji: '👤' },
//     { title: 'Help & Support',      icon: 'help-outline',       color: '#0EA5E9',  screen: 'Help',             description: 'Get assistance',             emoji: '🎧' },
//   ];
 
//   const stats = [
//     { label: 'Active', value: '0', icon: '🚛' },
//     { label: 'Completed', value: '0', icon: '✅' },
//     { label: 'Spent', value: '₹0', icon: '💰' },
//   ];
 
//   return (
//     <View style={S.container}>
//       {/* HEADER */}
//       <View style={S.header}>
//         <View style={S.headerLeft}>
//           <Text style={S.headerIcon}>🚛</Text>
//           <View>
//             <Text style={S.headerTitle}>Truck Booking</Text>
//             <Text style={S.headerSub}>Customer Portal</Text>
//           </View>
//         </View>
//         <TouchableOpacity style={S.logoutBtn} onPress={handleLogout}>
//           <Icon name="logout" size={20} color={C.primary} />
//         </TouchableOpacity>
//       </View>
 
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.primary} />}
//       >
//         {/* PROFILE CARD */}
//         <View style={S.profileCard}>
//           <View style={S.avatar}>
//             <Text style={S.avatarText}>
//               {userData?.name ? userData.name[0].toUpperCase() : '?'}
//             </Text>
//           </View>
//           <View style={S.profileInfo}>
//             <Text style={S.profileName}>{userData?.name || 'Welcome!'}</Text>
//             {userData?.phoneNumber ? (
//               <Text style={S.profileDetail}>📱 {userData.phoneNumber}</Text>
//             ) : null}
//             {userData?.email ? (
//               <Text style={S.profileDetail}>✉️ {userData.email}</Text>
//             ) : null}
//           </View>
//         </View>
 
//         {/* STATS */}
//         <View style={S.statsRow}>
//           {stats.map((s, i) => (
//             <View key={i} style={S.statCard}>
//               <Text style={S.statEmoji}>{s.icon}</Text>
//               <Text style={S.statValue}>{s.value}</Text>
//               <Text style={S.statLabel}>{s.label}</Text>
//             </View>
//           ))}
//         </View>
 
//         {/* MENU */}
//         <View style={S.section}>
//           <Text style={S.sectionTitle}>Quick Actions</Text>
//           {menuItems.map((item, i) => (
//             <TouchableOpacity
//               key={i}
//               style={[S.menuItem, i === menuItems.length - 1 && { borderBottomWidth: 0 }]}
//               onPress={() => {
//                 if (item.screen === 'Profile') {
//                   Alert.alert('Profile', `Name: ${userData?.name || 'N/A'}\nPhone: ${userData?.phoneNumber || 'N/A'}\nEmail: ${userData?.email || 'N/A'}`);
//                 } else if (item.screen === 'Help') {
//                   Alert.alert('Help & Support', 'Contact us: 9566137117\nEmail: info@rightpolamright.com');
//                 } else {
//                   navigation.navigate(item.screen);
//                 }
//               }}
//             >
//               <View style={[S.menuIconWrap, { backgroundColor: item.color + '15' }]}>
//                 <Text style={S.menuEmoji}>{item.emoji}</Text>
//               </View>
//               <View style={S.menuContent}>
//                 <Text style={S.menuItemTitle}>{item.title}</Text>
//                 <Text style={S.menuItemDesc}>{item.description}</Text>
//               </View>
//               <Icon name="chevron-right" size={22} color="#CCCCCC" />
//             </TouchableOpacity>
//           ))}
//         </View>
 
//         {/* ACTIVITY */}
//         <View style={[S.section, { marginBottom: 100 }]}>
//           <Text style={S.sectionTitle}>Recent Activity</Text>
//           <View style={S.emptyActivity}>
//             <Text style={S.emptyIcon}>📭</Text>
//             <Text style={S.emptyText}>No recent activity</Text>
//             <Text style={S.emptyHint}>Create your first load request to get started!</Text>
//           </View>
//         </View>
//       </ScrollView>
 
//       {/* FAB */}
//       <TouchableOpacity style={S.fab} onPress={() => navigation.navigate('CreateLoadRequest')}>
//         <Icon name="add" size={28} color={C.white} />
//       </TouchableOpacity>
//     </View>
//   );
// };
 
// export default DashboardScreen;
 
// const S = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F8F8F8' },
 
//   header: {
//     backgroundColor: C.white, paddingHorizontal: 16, paddingTop: 52, paddingBottom: 16,
//     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
//     borderBottomWidth: 1, borderBottomColor: C.border,
//   },
//   headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
//   headerIcon: { fontSize: 28 },
//   headerTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary },
//   headerSub: { fontSize: 12, color: C.textSecondary },
//   logoutBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.primaryLight, alignItems: 'center', justifyContent: 'center' },
 
//   profileCard: {
//     margin: 16, backgroundColor: C.white, borderRadius: 16, padding: 20,
//     flexDirection: 'row', alignItems: 'center', gap: 16,
//     borderWidth: 1, borderColor: C.border,
//     shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3,
//   },
//   avatar: {
//     width: 64, height: 64, borderRadius: 32,
//     backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
//   },
//   avatarText: { fontSize: 26, fontWeight: '700', color: C.white },
//   profileInfo: { flex: 1 },
//   profileName: { fontSize: 18, fontWeight: '700', color: C.textPrimary },
//   profileDetail: { fontSize: 13, color: C.textSecondary, marginTop: 4 },
 
//   statsRow: { flexDirection: 'row', marginHorizontal: 16, gap: 8, marginBottom: 16 },
//   statCard: {
//     flex: 1, backgroundColor: C.white, borderRadius: 14, padding: 16, alignItems: 'center',
//     borderWidth: 1, borderColor: C.border,
//     shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2,
//   },
//   statEmoji: { fontSize: 22, marginBottom: 6 },
//   statValue: { fontSize: 20, fontWeight: '700', color: C.textPrimary },
//   statLabel: { fontSize: 11, color: C.textSecondary, marginTop: 2 },
 
//   section: {
//     backgroundColor: C.white, marginHorizontal: 16, marginBottom: 16, borderRadius: 16, padding: 20,
//     borderWidth: 1, borderColor: C.border,
//     shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2,
//   },
//   sectionTitle: { fontSize: 16, fontWeight: '700', color: C.textPrimary, marginBottom: 16 },
 
//   menuItem: {
//     flexDirection: 'row', alignItems: 'center', paddingVertical: 14,
//     borderBottomWidth: 1, borderBottomColor: C.divider,
//   },
//   menuIconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
//   menuEmoji: { fontSize: 20 },
//   menuContent: { flex: 1 },
//   menuItemTitle: { fontSize: 15, fontWeight: '600', color: C.textPrimary },
//   menuItemDesc: { fontSize: 12, color: C.textSecondary, marginTop: 2 },
 
//   emptyActivity: { alignItems: 'center', paddingVertical: 24 },
//   emptyIcon: { fontSize: 40, marginBottom: 12 },
//   emptyText: { fontSize: 15, fontWeight: '600', color: C.textSecondary },
//   emptyHint: { fontSize: 13, color: '#999999', marginTop: 6, textAlign: 'center' },
 
//   fab: {
//     position: 'absolute', bottom: 24, right: 20,
//     width: 60, height: 60, borderRadius: 30,
//     backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
//     shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8,
//   },
// });



// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import { useCallback, useEffect, useState } from 'react';
// import {
//   Alert,
//   Linking,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const C = {
//   primary: '#FF6A00',
//   primaryLight: '#FFF4EC',
//   white: '#FFFFFF',
//   textPrimary: '#111111',
//   textSecondary: '#666666',
//   border: '#EEEEEE',
//   bg: '#F8F8F8',
//   divider: '#F2F2F2',
// };

// const DashboardScreen = ({ navigation }) => {
//   const [userData, setUserData] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     loadUserData();
//   }, []);

//   // 🔥 reload when screen comes back (real-time feel)
//   useFocusEffect(
//     useCallback(() => {
//       loadUserData();
//     }, [])
//   );

//   const loadUserData = async () => {
//     try {
//       const data = await AsyncStorage.getItem('userData');
//       if (data) setUserData(JSON.parse(data));
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadUserData();
//     setRefreshing(false);
//   };

//   const handleLogout = () => {
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Logout',
//         style: 'destructive',
//         onPress: async () => {
//           await AsyncStorage.clear();
//           navigation.replace('Login');
//         },
//       },
//     ]);
//   };

//   // 📞 direct call
//   const callSupport = () => {
//     Linking.openURL('tel:9566137117');
//   };

//   const menuItems = [
//     {
//       title: 'Create Load ',
//       icon: 'add-circle-outline',
//       color: C.primary,
//       screen: 'CreateLoadRequest',
//       description: 'Book a truck for your goods',
//       emoji: '📦',
//     },
//     {
//       title: 'My Loads',
//       icon: 'list-alt',
//       color: '#22C55E',
//       screen: 'MyLoadRequests',
//       description: 'View your booking history',
//       emoji: '📋',
//     },
    
//   ];

//   return (
//     <View style={S.container}>
//       {/* HEADER */}
//       <View style={S.header}>
//         <View style={S.headerLeft}>
//           <Text style={S.headerIcon}>🚛</Text>
//           <View>
//             <Text style={S.headerTitle}>Truck Booking</Text>
//             <Text style={S.headerSub}>Customer Portal</Text>
//           </View>
//         </View>

//         <TouchableOpacity style={S.logoutBtn} onPress={handleLogout}>
//           <Icon name="logout" size={20} color={C.primary} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             tintColor={C.primary}
//           />
//         }
//       >
//         {/* PROFILE CARD */}
//         <View style={S.profileCard}>
//           <View style={S.avatar}>
//             <Text style={S.avatarText}>
//               {userData?.name ? userData.name[0].toUpperCase() : '?'}
//             </Text>
//           </View>

//           <View style={S.profileInfo}>
//             <Text style={S.profileName}>
//               {userData?.name || 'Welcome!'}
//             </Text>

//             {userData?.phoneNumber && (
//               <Text style={S.profileDetail}>
//                 📱 {userData.phoneNumber}
//               </Text>
//             )}

//             {userData?.email && (
//               <Text style={S.profileDetail}>
//                 ✉️ {userData.email}
//               </Text>
//             )}
//           </View>
//         </View>

//         {/* MENU */}
//         <View style={S.section}>
//           <Text style={S.sectionTitle}>Quick Actions</Text>

//           {menuItems.map((item, i) => (
//             <TouchableOpacity
//               key={i}
//               style={[
//                 S.menuItem,
//                 i === menuItems.length - 1 && { borderBottomWidth: 0 },
//               ]}
//               onPress={() => navigation.navigate(item.screen)}
//             >
//               <View
//                 style={[
//                   S.menuIconWrap,
//                   { backgroundColor: item.color + '15' },
//                 ]}
//               >
//                 <Text style={S.menuEmoji}>{item.emoji}</Text>
//               </View>

//               <View style={S.menuContent}>
//                 <Text style={S.menuItemTitle}>{item.title}</Text>
//                 <Text style={S.menuItemDesc}>
//                   {item.description}
//                 </Text>
//               </View>

//               <Icon name="chevron-right" size={22} color="#CCC" />
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* SUPPORT QUICK CARD */}
//         <View style={S.section}>
//           <Text style={S.sectionTitle}>Need Help?</Text>

//           <TouchableOpacity style={S.supportBox} onPress={callSupport}>
//             <Text style={S.supportText}>📞 9566137117</Text>
//             <Text style={S.supportHint}>Tap to call support</Text>
//           </TouchableOpacity>

//           <Text style={S.email}>✉️ info@rightpolamright.com</Text>
//         </View>

//         {/* ACTIVITY */}
        
          
//       </ScrollView>

//       {/* FAB */}
//       <TouchableOpacity
//         style={S.fab}
//         onPress={() => navigation.navigate('CreateLoadRequest')}
//       >
//         <Icon name="add" size={28} color={C.white} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default DashboardScreen;

// const S = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F8F8F8' },

//   header: {
//     backgroundColor: C.white,
//     paddingHorizontal: 16,
//     paddingTop: 52,
//     paddingBottom: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: C.border,
//   },

//   headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
//   headerIcon: { fontSize: 28 },
//   headerTitle: { fontSize: 18, fontWeight: '700' },
//   headerSub: { fontSize: 12, color: C.textSecondary },

//   logoutBtn: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: C.primaryLight,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   profileCard: {
//     margin: 16,
//     backgroundColor: C.white,
//     borderRadius: 16,
//     padding: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 16,
//   },

//   avatar: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     backgroundColor: C.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   avatarText: { fontSize: 26, color: '#fff', fontWeight: '700' },

//   profileName: { fontSize: 18, fontWeight: '700' },
//   profileDetail: { fontSize: 13, color: '#666', marginTop: 4 },

//   section: {
//     backgroundColor: '#fff',
//     marginHorizontal: 16,
//     marginBottom: 16,
//     borderRadius: 16,
//     padding: 20,
//   },

//   sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16 },

//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },

//   menuIconWrap: {
//     width: 44,
//     height: 44,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 14,
//   },

//   menuEmoji: { fontSize: 20 },
//   menuItemTitle: { fontSize: 15, fontWeight: '600' },
//   menuItemDesc: { fontSize: 12, color: '#666' },

//   supportBox: {
//     backgroundColor: '#FFF4EC',
//     padding: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },

//   supportText: { fontSize: 16, fontWeight: '600' },
//   supportHint: { fontSize: 12, color: '#666' },

//   email: { marginTop: 10, textAlign: 'center', color: '#666' },

//   emptyActivity: { alignItems: 'center', paddingVertical: 24 },
//   emptyIcon: { fontSize: 40 },
//   emptyText: { fontSize: 15, fontWeight: '600' },
//   emptyHint: { fontSize: 13, color: '#999', marginTop: 6 },

//   fab: {
//     position: 'absolute',
//     bottom: 24,
//     right: 20,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: C.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });




// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useState } from 'react';
// import {
//   Alert,
//   RefreshControl,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { customerAPI } from '../services/api';

// const C = {
//   primary:      '#FF6A00',
//   primaryLight: '#FFF4EC',
//   white:        '#FFFFFF',
//   textPrimary:  '#111111',
//   textSecondary:'#666666',
//   textMuted:    '#999999',
//   border:       '#EEEEEE',
//   bg:           '#F5F5F5',
//   success:      '#22C55E',
//   successLight: '#F0FDF4',
//   danger:       '#EF4444',
// };

// const QUICK_ACTIONS = [
//   { icon: '🚛', title: 'Book a Truck',    sub: 'Get Instant Quote',  screen: 'CreateLoadRequest' },
//   { icon: '📍', title: 'Track Shipment',  sub: 'Live Tracking',      screen: 'TrackShipment' },
//   { icon: '📋', title: 'My Bookings',     sub: 'Manage Orders',      screen: 'MyLoadRequests' },
//   { icon: '🎧', title: 'Support',         sub: '24/7 Help',          screen: 'Support' },
// ];

// const STATUS_COLORS = {
//   'in transit': { color: C.primary,  bg: C.primaryLight },
//   delivered:    { color: C.success,  bg: C.successLight },
//   pending:      { color: '#F59E0B',  bg: '#FFFBEB' },
//   cancelled:    { color: C.danger,   bg: '#FEF2F2' },
// };

// const getStatusStyle = (s = '') =>
//   STATUS_COLORS[(s || '').toLowerCase()] || { color: '#999', bg: '#F8F8F8' };

// const CustomerDashboardScreen = ({ navigation }) => {
//   const [userName, setUserName]         = useState('');
//   const [recentBookings, setRecentBookings] = useState([]);
//   const [refreshing, setRefreshing]     = useState(false);
//   const [bannerIndex, setBannerIndex]   = useState(0);

//   const BANNERS = [
//     { title: 'FAST. SAFE. RELIABLE.', sub: 'Book Trucks in Minutes!', bg: C.primary },
//     { title: 'TRACK IN REAL TIME',    sub: 'Live GPS for every trip', bg: '#E05A00' },
//     { title: '100% SECURE PAYMENT',   sub: 'UPI, Card & Cash accepted',bg: '#CC4400' },
//   ];

//   useEffect(() => {
//     loadData();
//     const t = setInterval(() => setBannerIndex(i => (i + 1) % BANNERS.length), 3000);
//     return () => clearInterval(t);
//   }, []);

//   const loadData = async () => {
//     try {
//       const raw = await AsyncStorage.getItem('userData');
//       if (raw) setUserName(JSON.parse(raw).name || 'User');
//       const customerId = await AsyncStorage.getItem('customerId');
//       if (customerId) {
//         const res = await customerAPI.getLoadRequests(customerId);
//         const all = res.data.loadRequests || [];
//         all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setRecentBookings(all.slice(0, 3));
//       }
//     } catch (_) {}
//     finally { setRefreshing(false); }
//   };

//   const onRefresh = () => { setRefreshing(true); loadData(); };

//   const hour     = new Date().getHours();
//   const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

//   const formatDate = (d) =>
//     d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A';

//   const [menuVisible, setMenuVisible] = useState(false);

// const handleLogout = () => {
//   Alert.alert('Logout', 'Are you sure you want to logout?', [
//     { text: 'Cancel', style: 'cancel' },
//     {
//       text: 'Logout',
//       style: 'destructive',
//       onPress: async () => {
//         await AsyncStorage.multiRemove(['userData', 'customerId']);
//         navigation.replace('Login');
//       },
//     },
//   ]);
// };
//   return (
//     <SafeAreaView style={S.safe} edges={['top']}>
//       <StatusBar barStyle="dark-content" backgroundColor={C.white} />

//       {/* ── TOP BAR ── */}
// <View style={S.topBar}>
//   <View>
//     <Text style={S.greeting}>{greeting},</Text>
//     <Text style={S.userName}>{userName || 'Loading...'} 👋</Text>
//   </View>

//   <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
//     {/* Bell */}
//     <TouchableOpacity
//       style={S.bellBtn}
//       onPress={() => navigation.navigate('Notifications')}
//     >
//       <Text style={S.bellIcon}>🔔</Text>
//       <View style={S.bellDot} />
//     </TouchableOpacity>

//     {/* Menu */}
//     <TouchableOpacity onPress={() => setMenuVisible(v => !v)}>
//       <Text style={{ fontSize: 22 }}>☰</Text>
//     </TouchableOpacity>
//   </View>
// </View>

// {/* ── DROPDOWN MENU ── */}
// {menuVisible && (
//   <TouchableOpacity
//     style={S.menuOverlay}
//     activeOpacity={1}
//     onPress={() => setMenuVisible(false)}
//   >
//     <View style={S.menuDropdown}>
//       <TouchableOpacity
//         style={S.menuItem}
//         onPress={() => { setMenuVisible(false); navigation.navigate('Profile'); }}
//       >
//         <Text style={S.menuItemIcon}>👤</Text>
//         <Text style={S.menuItemText}>My Profile</Text>
//       </TouchableOpacity>

//       <View style={S.menuDivider} />

//       <TouchableOpacity
//         style={S.menuItem}
//         onPress={() => { setMenuVisible(false); handleLogout(); }}
//       >
//         <Text style={S.menuItemIcon}>🚪</Text>
//         <Text style={[S.menuItemText, { color: '#EF4444' }]}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   </TouchableOpacity>
// )}
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={S.scroll}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.primary} />}
//       >
//         {/* ── BANNER ── */}
//         <View style={[S.banner, { backgroundColor: BANNERS[bannerIndex].bg }]}>
//           <View style={S.bannerLeft}>
//             <Text style={S.bannerTitle}>{BANNERS[bannerIndex].title}</Text>
//             <Text style={S.bannerSub}>{BANNERS[bannerIndex].sub}</Text>
//             <TouchableOpacity
//               style={S.bannerBtn}
//               onPress={() => navigation.navigate('CreateLoadRequest')}
//             >
//               <Text style={S.bannerBtnText}>BOOK A TRUCK</Text>
//             </TouchableOpacity>
//           </View>
//           <Text style={S.bannerEmoji}>🚛</Text>
//         </View>

//         {/* Banner dots */}
//         <View style={S.dotsRow}>
//           {BANNERS.map((_, i) => (
//             <View key={i} style={[S.dot, i === bannerIndex && S.dotActive]} />
//           ))}
//         </View>

//         {/* ── QUICK ACTIONS ── */}
//         <View style={S.gridRow}>
//           {QUICK_ACTIONS.map((a) => (
//             <TouchableOpacity
//               key={a.screen}
//               style={S.qaCard}
//               onPress={() => navigation.navigate(a.screen)}
//               activeOpacity={0.85}
//             >
//               <Text style={S.qaIcon}>{a.icon}</Text>
//               <Text style={S.qaTitle}>{a.title}</Text>
//               <Text style={S.qaSub}>{a.sub}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* ── RECENT BOOKINGS ── */}
//         <View style={S.sectionHeader}>
//           <Text style={S.sectionTitle}>Recent Bookings</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('MyLoadRequests')}>
//             <Text style={S.sectionLink}>View All</Text>
//           </TouchableOpacity>
//         </View>

//         {recentBookings.length === 0 ? (
//           <View style={S.emptyCard}>
//             <Text style={S.emptyIcon}>📭</Text>
//             <Text style={S.emptyText}>No bookings yet</Text>
//             <Text style={S.emptySub}>Tap "Book a Truck" to get started</Text>
//           </View>
//         ) : (
//           recentBookings.map((req) => {
//             const st = getStatusStyle(req.status);
//             return (
//               <TouchableOpacity
//                 key={req.loadRequestId}
//                 style={S.bookingCard}
//                 onPress={() => navigation.navigate('TripStatus', { loadRequestId: req.loadRequestId })}
//                 activeOpacity={0.88}
//               >
//                 <View style={S.bookingLeft}>
//                   <View style={S.truckIconWrap}>
//                     <Text style={S.truckIconText}>🚛</Text>
//                   </View>
//                   <View style={{ flex: 1 }}>
//                     <Text style={S.bookingId}># {req.loadRequestId}</Text>
//                     <Text style={S.bookingRoute} numberOfLines={1}>
//                       {req.pickupLocation?.split(',')[0]} → {req.dropLocation?.split(',')[0]}
//                     </Text>
//                     <Text style={S.bookingDate}>{formatDate(req.createdAt)}</Text>
//                   </View>
//                 </View>
//                 <View style={[S.statusBadge, { backgroundColor: st.bg }]}>
//                   <Text style={[S.statusText, { color: st.color }]}>
//                     {(req.status || 'Pending').charAt(0).toUpperCase() + (req.status || 'Pending').slice(1)}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             );
//           })
//         )}

//         {/* ── NEED HELP ── */}
//         <TouchableOpacity
//           style={S.helpCard}
//           onPress={() => navigation.navigate('Support')}
//           activeOpacity={0.88}
//         >
//           <View style={S.helpIconWrap}>
//             <Text style={S.helpIcon}>🎧</Text>
//           </View>
//           <View>
//             <Text style={S.helpTitle}>Need Help?</Text>
//             <Text style={S.helpSub}>Call 9566137117</Text>
//           </View>
//           <Text style={S.helpArrow}>›</Text>
//         </TouchableOpacity>

//         <View style={{ height: 32 }} />
//       </ScrollView>

//       {/* ── BOTTOM TAB BAR ── */}
//       <View style={S.tabBar}>
//         {[
//           { icon: '🏠', label: 'Home',     screen: 'Dashboard',       active: true },
//           { icon: '📋', label: 'Bookings', screen: 'MyLoadRequests',  active: false },
//           { icon: '📍', label: 'Track',    screen: 'TrackShipment',   active: false },
//           { icon: '👤', label: 'Profile',  screen: 'Profile',         active: false },
//         ].map((tab) => (
//           <TouchableOpacity
//             key={tab.label}
//             style={S.tabItem}
//             onPress={() => !tab.active && navigation.navigate(tab.screen)}
//           >
//             <Text style={S.tabIcon}>{tab.icon}</Text>
//             <Text style={[S.tabLabel, tab.active && S.tabLabelActive]}>
//               {tab.label}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default CustomerDashboardScreen;

// const S = StyleSheet.create({
//   safe:  { flex: 1, backgroundColor: C.bg },
//   scroll: { paddingBottom: 16 },

//   // Top bar
//   topBar: {
//     backgroundColor: C.white,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 14,
//     paddingBottom: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: C.border,
//   },
//   greeting: { fontSize: 13, color: C.textSecondary },
//   userName: { fontSize: 20, fontWeight: '800', color: C.textPrimary, marginTop: 1 },
//   bellBtn:  { position: 'relative', padding: 4 },
//   bellIcon: { fontSize: 22 },
//   bellDot: {
//     position: 'absolute', top: 4, right: 4,
//     width: 9, height: 9, borderRadius: 5,
//     backgroundColor: C.danger,
//     borderWidth: 1.5, borderColor: C.white,
//   },

//   // Banner
//   banner: {
//     marginHorizontal: 16,
//     marginTop: 16,
//     borderRadius: 16,
//     padding: 18,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     minHeight: 110,
//   },
//   bannerLeft:    { flex: 1 },
//   bannerTitle:   { fontSize: 12, fontWeight: '800', color: 'rgba(255,255,255,0.9)', letterSpacing: 0.5 },
//   bannerSub:     { fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 3, marginBottom: 12 },
//   bannerBtn: {
//     alignSelf: 'flex-start',
//     backgroundColor: C.white,
//     paddingHorizontal: 14,
//     paddingVertical: 7,
//     borderRadius: 8,
//   },
//   bannerBtnText: { fontSize: 11, fontWeight: '800', color: C.primary },
//   bannerEmoji:   { fontSize: 52, marginLeft: 8 },

//   // Banner dots
//   dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 10 },
//   dot:     { width: 6, height: 6, borderRadius: 3, backgroundColor: '#DDD' },
//   dotActive:{ width: 18, backgroundColor: C.primary },

//   // Quick actions grid
//   gridRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginHorizontal: 12,
//     marginTop: 16,
//     gap: 10,
//   },
//   qaCard: {
//     width: '47%',
//     backgroundColor: C.primaryLight,
//     borderRadius: 14,
//     padding: 14,
//     alignItems: 'flex-start',
//   },
//   qaIcon:  { fontSize: 26, marginBottom: 6 },
//   qaTitle: { fontSize: 13, fontWeight: '700', color: C.textPrimary },
//   qaSub:   { fontSize: 11, color: C.textSecondary, marginTop: 2 },

//   // Section header
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginHorizontal: 16,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   sectionTitle: { fontSize: 16, fontWeight: '800', color: C.textPrimary },
//   sectionLink:  { fontSize: 13, fontWeight: '600', color: C.primary },

//   // Booking cards
//   bookingCard: {
//     backgroundColor: C.white,
//     marginHorizontal: 16,
//     marginBottom: 8,
//     borderRadius: 14,
//     padding: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: C.border,
//   },
//   bookingLeft:   { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
//   truckIconWrap: {
//     width: 40, height: 40, borderRadius: 10,
//     backgroundColor: C.primaryLight,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   truckIconText: { fontSize: 20 },
//   bookingId:    { fontSize: 12, fontWeight: '700', color: C.textSecondary },
//   bookingRoute: { fontSize: 13, fontWeight: '600', color: C.textPrimary, marginTop: 1 },
//   bookingDate:  { fontSize: 11, color: C.textMuted, marginTop: 1 },
//   statusBadge:  { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
//   statusText:   { fontSize: 11, fontWeight: '700' },

//   // Empty
//   emptyCard: {
//     backgroundColor: C.white,
//     marginHorizontal: 16,
//     borderRadius: 14,
//     padding: 28,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: C.border,
//   },
//   emptyIcon: { fontSize: 40, marginBottom: 8 },
//   emptyText: { fontSize: 14, fontWeight: '700', color: C.textPrimary },
//   emptySub:  { fontSize: 12, color: C.textSecondary, marginTop: 4 },

//   // Help card
//   helpCard: {
//     backgroundColor: C.primaryLight,
//     marginHorizontal: 16,
//     marginTop: 12,
//     borderRadius: 14,
//     padding: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   helpIconWrap: {
//     width: 40, height: 40, borderRadius: 20,
//     backgroundColor: C.primary,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   helpIcon:  { fontSize: 18 },
//   helpTitle: { fontSize: 14, fontWeight: '700', color: C.textPrimary },
//   helpSub:   { fontSize: 12, color: C.textSecondary, marginTop: 1 },
//   helpArrow: { marginLeft: 'auto', fontSize: 22, color: C.primary, fontWeight: '700' },
//   // Dropdown menu
// menuOverlay: {
//   position: 'absolute',
//   top: 0, left: 0, right: 0, bottom: 0,
//   zIndex: 999,
// },
// menuDropdown: {
//   position: 'absolute',
//   top: 72, right: 16,
//   backgroundColor: C.white,
//   borderRadius: 14,
//   borderWidth: 1,
//   borderColor: C.border,
//   paddingVertical: 6,
//   minWidth: 160,
//   zIndex: 1000,
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 4 },
//   shadowOpacity: 0.1,
//   shadowRadius: 12,
//   elevation: 8,
// },
// menuItem: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   gap: 10,
//   paddingHorizontal: 16,
//   paddingVertical: 12,
// },
// menuItemIcon: { fontSize: 16 },
// menuItemText: { fontSize: 14, fontWeight: '600', color: C.textPrimary },
// menuDivider:  { height: 1, backgroundColor: C.border, marginHorizontal: 12 },

//   // Bottom tab bar
//   tabBar: {
//     backgroundColor: C.white,
//     flexDirection: 'row',
//     borderTopWidth: 1,
//     borderTopColor: C.border,
//     paddingTop: 10,
//     paddingBottom: 24,
//   },
//   tabItem:       { flex: 1, alignItems: 'center', gap: 3 },
//   tabIcon:       { fontSize: 22 },
//   tabLabel:      { fontSize: 11, color: C.textSecondary, fontWeight: '600' },
//   tabLabelActive:{ color: C.primary },
// });


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Theme constants - Orange Theme
const colors = {
  primary: '#F97316',
  primaryDark: '#EA580C',
  primaryLight: '#FED7AA',
  secondary: '#FFF7ED',
  accent: '#FB923C',
  success: '#16a34a',
  successLight: '#DCFCE7',
  warning: '#D97706',
  warningLight: '#FEF9C3',
  error: '#DC2626',
  errorLight: '#FEE2E2',
  white: '#ffffff',
  black: '#000000',
  text: '#1C1917',
  textLight: '#78716C',
  textLighter: '#A8A29E',
  border: '#E7E5E4',
  background: '#FFFBF5',
  card: '#ffffff',
  shadow: '#000000',
};

const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };
const borderRadius = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, round: 999 };

const DashboardScreen = ({ navigation }) => {
  const [driverData, setDriverData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [orderTimer, setOrderTimer] = useState(28);
  const [showOrderCard, setShowOrderCard] = useState(true);

  useEffect(() => {
    loadDriverData();
  }, []);

  // Countdown timer for new order card
  useEffect(() => {
    if (!showOrderCard) return;
    if (orderTimer <= 0) {
      setShowOrderCard(false);
      return;
    }
    const t = setTimeout(() => setOrderTimer(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [orderTimer, showOrderCard]);

  const loadDriverData = async () => {
    try {
      const data = await AsyncStorage.getItem('driverData');
      if (data) setDriverData(JSON.parse(data));
    } catch (error) {
      console.error('Error loading driver data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDriverData();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.replace('Login');
        },
        style: 'destructive',
      },
    ]);
  };

  const handleAcceptOrder = () => {
    setShowOrderCard(false);
    navigation.navigate('AssignedTrips');
  };

  const handleRejectOrder = () => {
    setShowOrderCard(false);
  };

  const menuItems = [
    {
      title: 'New Order',
      icon: 'assignment',
      color: colors.primary,
      bgColor: colors.secondary,
      screen: 'CreateLoad',
      description: 'Post your load',
    },
    {
      title: 'My Loads',
      icon: 'local-shipping',
      color: colors.success,
      bgColor: colors.successLight,
      screen: 'LoadDetails',
      description: 'Find loads',
    },
    {
      title: 'My Trips',
      icon: 'map',
      color: colors.warning,
      bgColor: colors.warningLight,
      screen: 'AssignedTrips',
      description: 'View trips',
    },
    {
      title: 'Live GPS',
      icon: 'gps-fixed',
      color: colors.error,
      bgColor: colors.errorLight,
      screen: 'LocationTracker',
      description: 'Share location',
    },
    {
      title: 'Earnings',
      icon: 'account-balance-wallet',
      color: '#7C3AED',
      bgColor: '#EDE9FE',
      screen: 'Earnings',
      description: 'View earnings',
    },
    {
      title: 'Profile',
      icon: 'person',
      color: '#0891B2',
      bgColor: '#CFFAFE',
      screen: 'Profile',
      description: 'Driver profile',
    },
  ];

  // Today's progress
  const completedTrips = driverData?.completedTrips || 2;
  const totalTrips = driverData?.totalTrips || 5;
  const progressPercent = Math.round((completedTrips / totalTrips) * 100);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.container}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning 👋</Text>
            <Text style={styles.userName}>
              {driverData?.fullName || 'Ramesh Kumar'}
            </Text>
          </View>
          <View style={styles.headerRight}>
            {/* Online Toggle */}
            <TouchableOpacity
              style={[styles.onlineBadge, !isOnline && styles.offlineBadge]}
              onPress={() => setIsOnline(!isOnline)}
            >
              <View style={[styles.onlineDot, !isOnline && styles.offlineDot]} />
              <Text style={[styles.onlineText, !isOnline && styles.offlineText]}>
                {isOnline ? 'Online' : 'Offline'}
              </Text>
            </TouchableOpacity>

            {/* Notification Bell */}
            <TouchableOpacity style={styles.bellButton} onPress={() => navigation.navigate('Notifications')}>
              <Icon name="notifications" size={22} color={colors.text} />
              <View style={styles.notifDot} />
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Icon name="logout" size={22} color={colors.error} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        >

          {/* ── New Order Request Card ── */}
          {showOrderCard && (
            <View style={styles.newOrderCard}>
              <View style={styles.newOrderHeader}>
                <Text style={styles.newOrderTitle}>New Order Request</Text>
                <View style={styles.timerBadge}>
                  <Icon name="timer" size={14} color={colors.white} />
                  <Text style={styles.timerText}>
                    {String(Math.floor(orderTimer / 60)).padStart(2, '0')}:
                    {String(orderTimer % 60).padStart(2, '0')}
                  </Text>
                </View>
              </View>

              {/* Route */}
              <View style={styles.routeContainer}>
                <View style={styles.routeRow}>
                  <View style={[styles.routeDot, { backgroundColor: colors.success }]} />
                  <View style={styles.routeInfo}>
                    <Text style={styles.routeLabel}>Pickup</Text>
                    <Text style={styles.routeAddress}>Connaught Place, Delhi</Text>
                  </View>
                </View>
                <View style={styles.routeDivider} />
                <View style={styles.routeRow}>
                  <View style={[styles.routeDot, { backgroundColor: colors.error }]} />
                  <View style={styles.routeInfo}>
                    <Text style={styles.routeLabel}>Drop</Text>
                    <Text style={styles.routeAddress}>Noida Sector 62 · 12.4 km</Text>
                  </View>
                </View>
              </View>

              {/* Price */}
              <View style={styles.priceRow}>
                <Text style={styles.price}>₹ 3,850</Text>
              </View>

              {/* Buttons */}
              <View style={styles.orderBtnRow}>
                <TouchableOpacity style={styles.rejectBtn} onPress={handleRejectOrder}>
                  <Text style={styles.rejectBtnText}>REJECT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptBtn} onPress={handleAcceptOrder}>
                  <Text style={styles.acceptBtnText}>ACCEPT ({orderTimer}s)</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ── Stats Cards ── */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: colors.secondary }]}>
                <Icon name="local-shipping" size={22} color={colors.primary} />
              </View>
              <Text style={styles.statNumber}>{driverData?.totalTrips || 12}</Text>
              <Text style={styles.statLabel}>Total Trips</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: colors.successLight }]}>
                <Icon name="check-circle" size={22} color={colors.success} />
              </View>
              <Text style={styles.statNumber}>{driverData?.completedTrips || 8}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: colors.warningLight }]}>
                <Icon name="currency-rupee" size={22} color={colors.warning} />
              </View>
              <Text style={styles.statNumber}>
                ₹{((driverData?.totalEarnings || 11800) / 1000).toFixed(1)}k
              </Text>
              <Text style={styles.statLabel}>Earnings</Text>
            </View>
          </View>

          {/* ── Today's Progress ── */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.sectionTitle}>Today's Progress</Text>
              <Text style={styles.progressCount}>{completedTrips}/{totalTrips} Trips</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
          </View>

          {/* ── Quick Actions Grid ── */}
          <View style={styles.menuContainer}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.menuGrid}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuCard}
                  onPress={() => {
                    if (item.screen === 'Help') {
                      Alert.alert('Help & Support', 'Contact: 9566137117\nEmail: info@rightpolamright.com');
                    } else {
                      navigation.navigate(item.screen);
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <View style={[styles.menuIcon, { backgroundColor: item.bgColor }]}>
                    <Icon name={item.icon} size={26} color={item.color} />
                  </View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDesc}>{item.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ── Recent Activity ── */}
          <View style={styles.activityContainer}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {[
              { icon: 'check-circle', color: colors.success, bg: colors.successLight, text: 'Trip TRK123 completed', time: '11:45 AM', sub: 'Payment ₹3,850 credited' },
              { icon: 'local-shipping', color: colors.primary, bg: colors.secondary, text: 'New order assigned', time: '10:30 AM', sub: 'Connaught Place → Noida' },
              { icon: 'account-balance-wallet', color: colors.warning, bg: colors.warningLight, text: 'Weekly payout received', time: 'Yesterday', sub: '₹12,450 credited' },
            ].map((item, index) => (
              <View key={index} style={styles.activityCard}>
                <View style={[styles.activityIcon, { backgroundColor: item.bg }]}>
                  <Icon name={item.icon} size={18} color={item.color} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>{item.text}</Text>
                  <Text style={styles.activitySub}>{item.sub}</Text>
                </View>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
            ))}
          </View>

          {/* Help card */}
          <TouchableOpacity
            style={styles.helpCard}
            onPress={() => Alert.alert('Help & Support', 'Contact: 9566137117\nEmail: info@rightpolamright.com')}
          >
            <Icon name="headset-mic" size={20} color={colors.primary} />
            <Text style={styles.helpText}>Help & Support</Text>
            <Icon name="chevron-right" size={20} color={colors.textLighter} />
          </TouchableOpacity>

        </ScrollView>

        {/* ── Bottom Navigation ── */}
        <View style={styles.bottomNav}>
          {[
            { icon: 'home', label: 'Home', screen: 'Dashboard', active: true },
            { icon: 'local-shipping', label: 'Trips', screen: 'AssignedTrips', active: false },
            { icon: 'account-balance-wallet', label: 'Earnings', screen: 'Earnings', active: false },
            { icon: 'person', label: 'Profile', screen: 'Profile', active: false },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.navItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Icon name={item.icon} size={24} color={item.active ? colors.primary : colors.textLighter} />
              <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>
                {item.label}
              </Text>
              {item.active && <View style={styles.navActiveDot} />}
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  greeting: { fontSize: 13, color: colors.textLight },
  userName: { fontSize: 20, fontWeight: '800', color: colors.text, marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.successLight,
    borderRadius: borderRadius.round,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  offlineBadge: { backgroundColor: '#F3F4F6' },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.success },
  offlineDot: { backgroundColor: colors.textLighter },
  onlineText: { fontSize: 12, color: colors.success, fontWeight: '700' },
  offlineText: { color: colors.textLighter },
  bellButton: { position: 'relative', padding: spacing.xs },
  notifDot: {
    position: 'absolute',
    top: 2, right: 2,
    width: 8, height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  logoutButton: { padding: spacing.xs },

  // New Order Card
  newOrderCard: {
    margin: spacing.md,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.primaryLight,
  },
  newOrderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  newOrderTitle: { fontSize: 15, fontWeight: '700', color: colors.primaryDark },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  timerText: { fontSize: 13, color: colors.white, fontWeight: '700' },
  routeContainer: { marginBottom: spacing.md },
  routeRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  routeDot: { width: 10, height: 10, borderRadius: 5, marginTop: 5 },
  routeInfo: { flex: 1 },
  routeLabel: { fontSize: 11, color: colors.textLight, fontWeight: '600' },
  routeAddress: { fontSize: 13, color: colors.text, fontWeight: '600' },
  routeDivider: {
    width: 1.5, height: 16, backgroundColor: colors.border,
    marginLeft: 4, marginVertical: 4,
  },
  priceRow: { alignItems: 'flex-end', marginBottom: spacing.md },
  price: { fontSize: 24, fontWeight: '800', color: colors.primaryDark },
  orderBtnRow: { flexDirection: 'row', gap: spacing.sm },
  rejectBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.sm + 2,
    alignItems: 'center',
  },
  rejectBtnText: { color: colors.primary, fontSize: 13, fontWeight: '700' },
  acceptBtn: {
    flex: 2,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.sm + 2,
    alignItems: 'center',
    elevation: 3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  acceptBtnText: { color: colors.white, fontSize: 13, fontWeight: '700' },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statNumber: { fontSize: 18, fontWeight: '800', color: colors.text },
  statLabel: { fontSize: 11, color: colors.textLight, marginTop: 2 },

  // Progress
  progressSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressCount: { fontSize: 13, color: colors.primary, fontWeight: '700' },
  progressBar: {
    height: 8,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.round,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
  },

  // Menu
  menuContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  menuCard: {
    width: '31%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuIcon: {
    width: 54,
    height: 54,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginTop: 2,
  },
  menuDesc: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 2,
  },

  // Activity
  activityContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, color: colors.text, fontWeight: '600' },
  activitySub: { fontSize: 12, color: colors.textLight, marginTop: 2 },
  activityTime: { fontSize: 11, color: colors.textLighter },

  // Help Card
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  helpText: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.text },

  // Bottom Nav
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: Platform.OS === 'ios' ? spacing.md : spacing.sm,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    position: 'relative',
  },
  navLabel: { fontSize: 10, color: colors.textLighter, marginTop: 3 },
  navLabelActive: { color: colors.primary, fontWeight: '700' },
  navActiveDot: {
    position: 'absolute',
    bottom: 2,
    width: 4, height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});

export default DashboardScreen;