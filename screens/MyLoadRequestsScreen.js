// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { customerAPI } from '../services/api';

// const MyLoadRequestsScreen = ({ navigation }) => {
//   const [loadRequests, setLoadRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchLoadRequests();
//   }, []);

//   const fetchLoadRequests = async () => {
//     try {
//       setLoading(true);
//       const customerId = await AsyncStorage.getItem('customerId');

//       if (!customerId) {
//         Alert.alert('Session Expired', 'Please login again');
//         navigation.replace('Login');
//         return;
//       }

//       const response = await customerAPI.getLoadRequests(customerId);
//       const requests = response.data.loadRequests || [];

//       // 🔥 Descending order (latest first)
//       requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//       setLoadRequests(requests);
//     } catch (error) {
//       console.error('Error fetching load requests:', error);
//       Alert.alert('Error', 'Failed to load your requests');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchLoadRequests();
//   };

//   const handleLoadRequestPress = (loadRequestId) => {
//     if (!loadRequestId) {
//       Alert.alert('Error', 'Load Request ID missing');
//       return;
//     }

//     navigation.navigate('TripStatus', { loadRequestId });
//   };

//   const handleDelete = (loadRequestId) => {
//     Alert.alert(
//       'Delete Request',
//       'Are you sure you want to delete this request?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await customerAPI.deleteLoadRequest(loadRequestId);
//               fetchLoadRequests(); // refresh list
//             } catch (error) {
//               Alert.alert('Error', 'Failed to delete request');
//             }
//           },
//         },
//       ]
//     );
//   };

//   // ---------------- HELPERS ----------------

//   const getStatusColor = (status) => {
//     switch ((status || 'pending').toLowerCase()) {
//       case 'pending': return '#f39c12';
//       case 'assigned': return '#04751d7a';
//       case 'in progress': return '#9b59b6';
//       case 'completed': return '#2ecc71';
//       case 'cancelled': return '#e74c3c';
//       default: return '#95a5a6';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch ((status || 'pending').toLowerCase()) {
//       case 'pending': return 'hourglass-empty';
//       case 'assigned': return 'check-circle';
//       case 'in progress': return 'directions-car';
//       case 'completed': return 'done-all';
//       case 'cancelled': return 'cancel';
//       default: return 'help';
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });
//   };

//   const getTruckImageUrl = (path) => {
//     if (!path) return null;
//     let cleanedPath = path.replace(/\\/g, '/').replace(/^C:/, '');
//     return `https://righpolamright.com${cleanedPath}`;
//   };

//   // ---------------- CARD RENDER ----------------

//   const renderLoadRequestCard = (request) => {
//     return (
//       <View key={request.loadRequestId} style={styles.requestCard}>

//         {/* Card Click Area */}
//         <TouchableOpacity
//           onPress={() => handleLoadRequestPress(request.loadRequestId)}
//         >
//           <View style={styles.cardHeader}>
//             <Text style={styles.requestId}>{request.loadRequestId}</Text>

//             <View
//               style={[
//                 styles.statusBadge,
//                 { backgroundColor: getStatusColor(request.status) },
//               ]}
//             >
//               <Icon
//                 name={getStatusIcon(request.status)}
//                 size={14}
//                 color="white"
//               />
//               <Text style={styles.statusText}>
//                 {request.status || 'Pending'}
//               </Text>
//             </View>
//           </View>

//           <View style={styles.detail}>
//             <Text style={styles.label}>From</Text>
//             <Text style={styles.value}>{request.pickupLocation}</Text>

//             <Text style={styles.label}>To</Text>
//             <Text style={styles.value}>{request.dropLocation}</Text>

//             <Text style={styles.label}>Load</Text>
//             <Text style={styles.value}>
//               {request.loadType} • {request.weight} kg
//             </Text>

//             <Text style={styles.label}>Created</Text>
//             <Text style={styles.value}>
//               {formatDate(request.createdAt)}
//             </Text>

//             {request.truckImagePath && (
//               <Image
//                 source={{ uri: getTruckImageUrl(request.truckImagePath) }}
//                 style={styles.truckImage}
//                 resizeMode="cover"
//               />
//             )}
//           </View>
//         </TouchableOpacity>

//         {/* Delete Button */}
//         <View style={styles.actionRow}>
//           <TouchableOpacity
//             style={styles.deleteBtn}
//             onPress={() => handleDelete(request.loadRequestId)}
//           >
//             <Icon name="delete" size={18} color="white" />
//             <Text style={styles.actionText}>Delete</Text>
//           </TouchableOpacity>
//         </View>

//       </View>
//     );
//   };

//   // ---------------- LOADING ----------------

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#3498db" />
//         <Text style={styles.loadingText}>Loading your requests…</Text>
//       </View>
//     );
//   }

//   // ---------------- MAIN UI ----------------

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>My Load Requests</Text>
//         <Text style={styles.headerSubtitle}>
//           {loadRequests.length} request
//           {loadRequests.length !== 1 ? 's' : ''}
//         </Text>
//       </View>

//       <ScrollView
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         {loadRequests.length === 0 ? (
//           <Text style={{ textAlign: 'center', marginTop: 40 }}>
//             No Load Requests Found
//           </Text>
//         ) : (
//           loadRequests.map(renderLoadRequestCard)
//         )}
//       </ScrollView>

//       <TouchableOpacity
//         style={styles.floatingButton}
//         onPress={() => navigation.navigate('CreateLoadRequest')}
//       >
//         <Icon name="add" size={30} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// // ---------------- STYLES ----------------

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f8f9fa' },

//   header: {
//     backgroundColor: 'white',
//     padding: 20,
//     paddingTop: 60,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },

//   headerTitle: { fontSize: 26, fontWeight: 'bold' },
//   headerSubtitle: { color: '#777', marginTop: 4 },

//   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   loadingText: { marginTop: 10, color: '#777' },

//   requestCard: {
//     backgroundColor: 'white',
//     margin: 15,
//     borderRadius: 12,
//     padding: 16,
//     elevation: 4,
//   },

//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },

//   requestId: { fontSize: 16, fontWeight: 'bold' },

//   statusBadge: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
//   height: 32,                 // ✅ fixed height
//   paddingHorizontal: 12,
//   borderRadius: 8,            // ✅ same shape as button
//   minWidth: 100               // ✅ equal width feel
// },

//  statusText: {
//   color: 'white',
//   marginLeft: 5,
//   fontSize: 12,
//   fontWeight: '600'
// },

// actionText: {
//   color: 'white',
//   marginLeft: 6,
//   fontSize: 12,              // ✅ match
//   fontWeight: '600'
// },

//   detail: { marginTop: 5 },
//   label: { fontSize: 12, color: '#888', marginTop: 6 },
//   value: { fontSize: 15, fontWeight: '600' },

//   truckImage: {
//     width: '100%',
//     height: 150,
//     marginTop: 10,
//     borderRadius: 12,
//   },

//   actionRow: {
//     marginTop: 12,
//     alignItems: 'flex-end',
//   },

  
//   deleteBtn: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
//   height: 32,                 // ✅ SAME HEIGHT
//   paddingHorizontal: 12,
//   borderRadius: 8,
//   backgroundColor: '#c93f30',
//   minWidth: 100               // ✅ SAME WIDTH FEEL
// },

//   actionText: {
//     color: 'white',
//     marginLeft: 6,
//     fontWeight: '600',
//   },

//   floatingButton: {
//     position: 'absolute',
//     right: 20,
//     bottom: 20,
//     backgroundColor: '#4f86ec',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 6,
//   },
// });

// export default MyLoadRequestsScreen;

  

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { customerAPI } from '../services/api';
 
// const C = {
//   primary:      '#FF6A00',
//   primaryLight: '#FFF4EC',
//   white:        '#FFFFFF',
//   textPrimary:  '#111111',
//   textSecondary:'#666666',
//   border:       '#EEEEEE',
//   bg:           '#F8F8F8',
// };
 
// const STATUS_CONFIG = {
//   pending:      { color: '#F59E0B', bg: '#FFFBEB', icon: 'hourglass-empty', label: 'Pending' },
//   assigned:     { color: '#22C55E', bg: '#F0FDF4', icon: 'check-circle',   label: 'Assigned' },
//   'in progress':{ color: '#8B5CF6', bg: '#F5F3FF', icon: 'directions-car', label: 'In Progress' },
//   completed:    { color: '#22C55E', bg: '#F0FDF4', icon: 'done-all',       label: 'Completed' },
//   cancelled:    { color: '#EF4444', bg: '#FEF2F2', icon: 'cancel',         label: 'Cancelled' },
// };
 
// const getStatus = (s) => STATUS_CONFIG[(s || 'pending').toLowerCase()] || { color: '#999', bg: '#F8F8F8', icon: 'help', label: s || 'Unknown' };
 
// const MyLoadRequestsScreen = ({ navigation }) => {
//   const [loadRequests, setLoadRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
 
//   useEffect(() => { fetchLoadRequests(); }, []);
 
//   const fetchLoadRequests = async () => {
//     try {
//       setLoading(true);
//       const customerId = await AsyncStorage.getItem('customerId');
//       if (!customerId) { Alert.alert('Session Expired', 'Please login again'); navigation.replace('Login'); return; }
//       const response = await customerAPI.getLoadRequests(customerId);
//       const requests = response.data.loadRequests || [];
//       requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setLoadRequests(requests);
//     } catch (e) {
//       Alert.alert('Error', 'Failed to load your requests');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };
 
//   const onRefresh = () => { setRefreshing(true); fetchLoadRequests(); };
 
//   const handleDelete = (id) => {
//     Alert.alert('Delete Request', 'Are you sure you want to delete this request?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Delete', style: 'destructive', onPress: async () => {
//         try { await customerAPI.deleteLoadRequest(id); fetchLoadRequests(); }
//         catch { Alert.alert('Error', 'Failed to delete request'); }
//       }},
//     ]);
//   };
 
//   const getTruckImageUrl = (path) => {
//     if (!path) return null;
//     return `https://righpolamright.com${path.replace(/\\/g, '/').replace(/^C:/, '')}`;
//   };
 
//   const formatDate = (d) => {
//     if (!d) return 'N/A';
//     return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
//   };
 
//   if (loading) {
//     return (
//       <View style={S.loadingWrap}>
//         <ActivityIndicator size="large" color={C.primary} />
//         <Text style={S.loadingText}>Loading your requests…</Text>
//       </View>
//     );
//   }
 
//   return (
//     <View style={S.container}>
//       {/* HEADER */}
//       <View style={S.header}>
//         <Text style={S.headerTitle}>My Load Requests</Text>
//         <View style={S.countBadge}>
//           <Text style={S.countText}>{loadRequests.length}</Text>
//         </View>
//       </View>
 
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.primary} />}
//         contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
//       >
//         {loadRequests.length === 0 ? (
//           <View style={S.emptyWrap}>
//             <Text style={S.emptyIcon}>📭</Text>
//             <Text style={S.emptyTitle}>No requests yet</Text>
//             <Text style={S.emptyHint}>Tap + to create your first load request</Text>
//           </View>
//         ) : (
//           loadRequests.map((req) => {
//             const st = getStatus(req.status);
//             return (
//               <TouchableOpacity
//                 key={req.loadRequestId}
//                 style={S.card}
//                 onPress={() => navigation.navigate('TripStatus', { loadRequestId: req.loadRequestId })}
//                 activeOpacity={0.9}
//               >
//                 {/* Card Header */}
//                 <View style={S.cardHeader}>
//                   <Text style={S.requestId}># {req.loadRequestId}</Text>
//                   <View style={[S.statusBadge, { backgroundColor: st.bg }]}>
//                     <Icon name={st.icon} size={13} color={st.color} />
//                     <Text style={[S.statusText, { color: st.color }]}>{st.label}</Text>
//                   </View>
//                 </View>
 
//                 {/* Route */}
//                 <View style={S.routeWrap}>
//                   <View style={S.routeItem}>
//                     <View style={[S.routeDot, { backgroundColor: '#22C55E' }]} />
//                     <View style={S.routeInfo}>
//                       <Text style={S.routeLabel}>PICKUP</Text>
//                       <Text style={S.routeValue} numberOfLines={1}>{req.pickupLocation}</Text>
//                     </View>
//                   </View>
//                   <View style={S.routeLine} />
//                   <View style={S.routeItem}>
//                     <View style={[S.routeDot, { backgroundColor: C.primary }]} />
//                     <View style={S.routeInfo}>
//                       <Text style={S.routeLabel}>DROP</Text>
//                       <Text style={S.routeValue} numberOfLines={1}>{req.dropLocation}</Text>
//                     </View>
//                   </View>
//                 </View>
 
//                 {/* Details Row */}
//                 <View style={S.detailsRow}>
//                   <View style={S.detailChip}>
//                     <Text style={S.detailChipLabel}>📦 {req.loadType}</Text>
//                   </View>
//                   <View style={S.detailChip}>
//                     <Text style={S.detailChipLabel}>⚖️ {req.weight} kg</Text>
//                   </View>
//                   <View style={S.detailChip}>
//                     <Text style={S.detailChipLabel}>📅 {formatDate(req.createdAt)}</Text>
//                   </View>
//                 </View>
 
//                 {/* Truck Image */}
//                 {req.truckImagePath && (
//                   <Image source={{ uri: getTruckImageUrl(req.truckImagePath) }} style={S.truckImage} resizeMode="cover" />
//                 )}
 
//                 {/* Actions */}
//                 <View style={S.actionRow}>
//                   <TouchableOpacity
//                     style={S.deleteBtn}
//                     onPress={(e) => { e.stopPropagation?.(); handleDelete(req.loadRequestId); }}
//                   >
//                     <Icon name="delete-outline" size={16} color="#EF4444" />
//                     <Text style={S.deleteBtnText}>Delete</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={S.viewBtn}
//                     onPress={() => navigation.navigate('TripStatus', { loadRequestId: req.loadRequestId })}
//                   >
//                     <Text style={S.viewBtnText}>View Details →</Text>
//                   </TouchableOpacity>
//                 </View>
//               </TouchableOpacity>
//             );
//           })
//         )}
//       </ScrollView>
 
//       {/* FAB */}
//       <TouchableOpacity style={S.fab} onPress={() => navigation.navigate('CreateLoadRequest')}>
//         <Icon name="add" size={28} color={C.white} />
//       </TouchableOpacity>
//     </View>
//   );
// };
 
// export default MyLoadRequestsScreen;
 
// const S = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F8F8F8' },
 
//   loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   loadingText: { marginTop: 12, fontSize: 14, color: '#666' },
 
//   header: {
//     backgroundColor: C.white, paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20,
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//     borderBottomWidth: 1, borderBottomColor: C.border,
//   },
//   headerTitle: { fontSize: 24, fontWeight: '700', color: C.textPrimary },
//   countBadge: { backgroundColor: C.primaryLight, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
//   countText: { color: C.primary, fontWeight: '700', fontSize: 14 },
 
//   emptyWrap: { alignItems: 'center', paddingTop: 80 },
//   emptyIcon: { fontSize: 60, marginBottom: 16 },
//   emptyTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary, marginBottom: 8 },
//   emptyHint: { fontSize: 14, color: C.textSecondary },
 
//   card: {
//     backgroundColor: C.white, borderRadius: 16, padding: 16, marginBottom: 12,
//     borderWidth: 1, borderColor: C.border,
//     shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3,
//   },
//   cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
//   requestId: { fontSize: 13, fontWeight: '700', color: C.textSecondary },
//   statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
//   statusText: { fontSize: 12, fontWeight: '600' },
 
//   routeWrap: { marginBottom: 14 },
//   routeItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
//   routeDot: { width: 10, height: 10, borderRadius: 5, marginTop: 4 },
//   routeInfo: { flex: 1 },
//   routeLabel: { fontSize: 10, fontWeight: '700', color: C.textSecondary, letterSpacing: 0.8, marginBottom: 2 },
//   routeValue: { fontSize: 14, fontWeight: '500', color: C.textPrimary },
//   routeLine: { width: 2, height: 16, backgroundColor: C.border, marginLeft: 4, marginVertical: 4 },
 
//   detailsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
//   detailChip: { backgroundColor: '#F8F8F8', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: C.border },
//   detailChipLabel: { fontSize: 12, color: C.textSecondary, fontWeight: '500' },
 
//   truckImage: { width: '100%', height: 140, borderRadius: 12, marginBottom: 12 },
 
//   actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: C.border },
//   deleteBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 8 },
//   deleteBtnText: { color: '#EF4444', fontSize: 13, fontWeight: '600' },
//   viewBtn: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: C.primaryLight, borderRadius: 8 },
//   viewBtnText: { color: C.primary, fontSize: 13, fontWeight: '600' },
 
//   fab: {
//     position: 'absolute', bottom: 24, right: 20,
//     width: 60, height: 60, borderRadius: 30,
//     backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
//     shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8,
//   },
// });


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useState } from 'react';

// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { customerAPI } from '../services/api';

// const C = {
//   primary:      '#FF6A00',
//   primaryLight: '#FFF4EC',
//   white:        '#FFFFFF',
//   textPrimary:  '#111111',
//   textSecondary:'#666666',
//   border:       '#EEEEEE',
//   bg:           '#F8F8F8',
// };

// const STATUS_CONFIG = {
//   pending:      { color: '#F59E0B', bg: '#FFFBEB', icon: 'hourglass-empty', label: 'Pending' },
//   assigned:     { color: '#22C55E', bg: '#F0FDF4', icon: 'check-circle',   label: 'Assigned' },
//   'in progress':{ color: '#8B5CF6', bg: '#F5F3FF', icon: 'directions-car', label: 'In Progress' },
//   completed:    { color: '#22C55E', bg: '#F0FDF4', icon: 'done-all',       label: 'Completed' },
//   cancelled:    { color: '#EF4444', bg: '#FEF2F2', icon: 'cancel',         label: 'Cancelled' },
// };

// const getStatus = (s) => STATUS_CONFIG[(s || 'pending').toLowerCase()] || { color: '#999', bg: '#F8F8F8', icon: 'help', label: s || 'Unknown' };

// const MyLoadRequestsScreen = ({ navigation }) => {
//   const [loadRequests, setLoadRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => { fetchLoadRequests(); }, []);

//   const fetchLoadRequests = async () => {
//     try {
//       setLoading(true);
//       const customerId = await AsyncStorage.getItem('customerId');
//       if (!customerId) { Alert.alert('Session Expired', 'Please login again'); navigation.replace('Login'); return; }
//       const response = await customerAPI.getLoadRequests(customerId);
//       const requests = response.data.loadRequests || [];
//       requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setLoadRequests(requests);
//     } catch (e) {
//       Alert.alert('Error', 'Failed to load your requests');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const onRefresh = () => { setRefreshing(true); fetchLoadRequests(); };

//   const handleDelete = (id) => {
//     Alert.alert('Delete Request', 'Are you sure you want to delete this request?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Delete', style: 'destructive', onPress: async () => {
//         try { await customerAPI.deleteLoadRequest(id); fetchLoadRequests(); }
//         catch { Alert.alert('Error', 'Failed to delete request'); }
//       }},
//     ]);
//   };

//   const getTruckImageUrl = (path) => {
//     if (!path) return null;
//     return `https://righpolamright.com${path.replace(/\\/g, '/').replace(/^C:/, '')}`;
//   };

//   const formatDate = (d) => {
//     if (!d) return 'N/A';
//     return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
//   };

//   if (loading) {
//     return (
//       <View style={S.loadingWrap}>
//         <ActivityIndicator size="large" color={C.primary} />
//         <Text style={S.loadingText}>Loading your requests…</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={S.container}>
//       {/* HEADER */}
//       <View style={S.header}>
//         <View style={S.headerLeft}>
//           {/* Back / Home Button */}
//           <TouchableOpacity
//             style={S.backBtn}
//             onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home')}
//             activeOpacity={0.75}
//           >
//             <Icon name="arrow-back" size={20} color={C.primary} />
//           </TouchableOpacity>
//           <Text style={S.headerTitle}>My Load Requests</Text>
//         </View>
//         <View style={S.countBadge}>
//           <Text style={S.countText}>{loadRequests.length}</Text>
//         </View>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.primary} />}
//         contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
//       >
//         {loadRequests.length === 0 ? (
//           <View style={S.emptyWrap}>
//             <Text style={S.emptyIcon}>📭</Text>
//             <Text style={S.emptyTitle}>No requests yet</Text>
//             <Text style={S.emptyHint}>Tap + to create your first load request</Text>
//           </View>
//         ) : (
//           loadRequests.map((req) => {
//             const st = getStatus(req.status);
//             return (
//               <TouchableOpacity
//                 key={req.loadRequestId}
//                 style={S.card}
//                 onPress={() => navigation.navigate('TripStatus', { loadRequestId: req.loadRequestId })}
//                 activeOpacity={0.9}
//               >
//                 {/* Card Header */}
//                 <View style={S.cardHeader}>
//                   <Text style={S.requestId}># {req.loadRequestId}</Text>
//                   <View style={[S.statusBadge, { backgroundColor: st.bg }]}>
//                     <Icon name={st.icon} size={13} color={st.color} />
//                     <Text style={[S.statusText, { color: st.color }]}>{st.label}</Text>
//                   </View>
//                 </View>

//                 {/* Route */}
//                 <View style={S.routeWrap}>
//                   <View style={S.routeItem}>
//                     <View style={[S.routeDot, { backgroundColor: '#22C55E' }]} />
//                     <View style={S.routeInfo}>
//                       <Text style={S.routeLabel}>PICKUP</Text>
//                       <Text style={S.routeValue} numberOfLines={1}>{req.pickupLocation}</Text>
//                     </View>
//                   </View>
//                   <View style={S.routeLine} />
//                   <View style={S.routeItem}>
//                     <View style={[S.routeDot, { backgroundColor: C.primary }]} />
//                     <View style={S.routeInfo}>
//                       <Text style={S.routeLabel}>DROP</Text>
//                       <Text style={S.routeValue} numberOfLines={1}>{req.dropLocation}</Text>
//                     </View>
//                   </View>
//                 </View>

//                 {/* Details Row */}
//                 <View style={S.detailsRow}>
//                   <View style={S.detailChip}>
//                     <Text style={S.detailChipLabel}>📦 {req.loadType}</Text>
//                   </View>
//                   <View style={S.detailChip}>
//                     <Text style={S.detailChipLabel}>⚖️ {req.weight} kg</Text>
//                   </View>
//                   <View style={S.detailChip}>
//                     <Text style={S.detailChipLabel}>📅 {formatDate(req.createdAt)}</Text>
//                   </View>
//                 </View>

//                 {/* Truck Image */}
//                 {req.truckImagePath && (
//                   <Image source={{ uri: getTruckImageUrl(req.truckImagePath) }} style={S.truckImage} resizeMode="cover" />
//                 )}

//                 {/* Actions */}
//                 <View style={S.actionRow}>
//                   <TouchableOpacity
//                     style={S.deleteBtn}
//                     onPress={(e) => { e.stopPropagation?.(); handleDelete(req.loadRequestId); }}
//                   >
//                     <Icon name="delete-outline" size={16} color="#EF4444" />
//                     <Text style={S.deleteBtnText}>Delete</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={S.viewBtn}
//                     onPress={() => navigation.navigate('TripStatus', { loadRequestId: req.loadRequestId })}
//                   >
//                     <Text style={S.viewBtnText}>View Details →</Text>
//                   </TouchableOpacity>
//                 </View>
//               </TouchableOpacity>
//             );
//           })
//         )}
//       </ScrollView>

//       {/* FAB */}
//       <TouchableOpacity style={S.fab} onPress={() => navigation.navigate('CreateLoadRequest')}>
//         <Icon name="add" size={28} color={C.white} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default MyLoadRequestsScreen;

// const S = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F8F8F8' },

//   loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   loadingText: { marginTop: 12, fontSize: 14, color: '#666' },

//   header: {
//     backgroundColor: C.white, paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20,
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//     borderBottomWidth: 1, borderBottomColor: C.border,
//   },
//   headerLeft: {
//     flexDirection: 'row', alignItems: 'center', gap: 12,
//   },
//   backBtn: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: C.primaryLight,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   headerTitle: { fontSize: 24, fontWeight: '700', color: C.textPrimary },
//   countBadge: { backgroundColor: C.primaryLight, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
//   countText: { color: C.primary, fontWeight: '700', fontSize: 14 },

//   emptyWrap: { alignItems: 'center', paddingTop: 80 },
//   emptyIcon: { fontSize: 60, marginBottom: 16 },
//   emptyTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary, marginBottom: 8 },
//   emptyHint: { fontSize: 14, color: C.textSecondary },

//   card: {
//     backgroundColor: C.white, borderRadius: 16, padding: 16, marginBottom: 12,
//     borderWidth: 1, borderColor: C.border,
//     shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3,
//   },
//   cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
//   requestId: { fontSize: 13, fontWeight: '700', color: C.textSecondary },
//   statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
//   statusText: { fontSize: 12, fontWeight: '600' },

//   routeWrap: { marginBottom: 14 },
//   routeItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
//   routeDot: { width: 10, height: 10, borderRadius: 5, marginTop: 4 },
//   routeInfo: { flex: 1 },
//   routeLabel: { fontSize: 10, fontWeight: '700', color: C.textSecondary, letterSpacing: 0.8, marginBottom: 2 },
//   routeValue: { fontSize: 14, fontWeight: '500', color: C.textPrimary },
//   routeLine: { width: 2, height: 16, backgroundColor: C.border, marginLeft: 4, marginVertical: 4 },

//   detailsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
//   detailChip: { backgroundColor: '#F8F8F8', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: C.border },
//   detailChipLabel: { fontSize: 12, color: C.textSecondary, fontWeight: '500' },

//   truckImage: { width: '100%', height: 140, borderRadius: 12, marginBottom: 12 },

//   actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: C.border },
//   deleteBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 8 },
//   deleteBtnText: { color: '#EF4444', fontSize: 13, fontWeight: '600' },
//   viewBtn: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: C.primaryLight, borderRadius: 8 },
//   viewBtnText: { color: C.primary, fontSize: 13, fontWeight: '600' },

//   fab: {
//     position: 'absolute', bottom: 24, right: 20,
//     width: 60, height: 60, borderRadius: 30,
//     backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
//     shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8,
//   },
// });

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ Added
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { customerAPI } from '../services/api';

// const C = {
//   primary:      '#FF6A00',
//   primaryLight: '#FFF4EC',
//   white:        '#FFFFFF',
//   textPrimary:  '#111111',
//   textSecondary:'#666666',
//   border:       '#EEEEEE',
//   bg:           '#F8F8F8',
// };

// const STATUS_CONFIG = {
//   pending:      { color: '#F59E0B', bg: '#FFFBEB', icon: 'hourglass-empty', label: 'Pending' },
//   assigned:     { color: '#22C55E', bg: '#F0FDF4', icon: 'check-circle',   label: 'Assigned' },
//   'in progress':{ color: '#8B5CF6', bg: '#F5F3FF', icon: 'directions-car', label: 'In Progress' },
//   completed:    { color: '#22C55E', bg: '#F0FDF4', icon: 'done-all',       label: 'Completed' },
//   cancelled:    { color: '#EF4444', bg: '#FEF2F2', icon: 'cancel',         label: 'Cancelled' },
// };

// const getStatus = (s) => STATUS_CONFIG[(s || 'pending').toLowerCase()] || { color: '#999', bg: '#F8F8F8', icon: 'help', label: s || 'Unknown' };

// const MyLoadRequestsScreen = ({ navigation }) => {
//   const [loadRequests, setLoadRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => { fetchLoadRequests(); }, []);

//   const fetchLoadRequests = async () => {

//     setLoading(true);
//     const customerId = await AsyncStorage.getItem('customerId');
//     const response = await customerAPI.getLoadRequests(customerId);
//     const requests = response.data.loadRequests || [];
    
//     // ✅ இதை add பண்ணுங்க — console-இல் பாருங்க
//     console.log('LOAD REQUESTS:', JSON.stringify(requests, null, 2));
    
//     requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     setLoadRequests(requests);
//   } catch (e) {
//     Alert.alert('Error', 'Failed to load your requests');
//   } finally {
//     setLoading(false);
//     setRefreshing(false);
//   }
// };

//   const onRefresh = () => { setRefreshing(true); fetchLoadRequests(); };

//   const handleDelete = (id) => {
//     Alert.alert('Delete Request', 'Are you sure you want to delete this request?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Delete', style: 'destructive', onPress: async () => {
//         try { await customerAPI.deleteLoadRequest(id); fetchLoadRequests(); }
//         catch { Alert.alert('Error', 'Failed to delete request'); }
//       }},
//     ]);
//   };

//   const getTruckImageUrl = (path) => {
//     if (!path) return null;
//     return `https://righpolamright.com${path.replace(/\\/g, '/').replace(/^C:/, '')}`;
//   };

//   const formatDate = (d) => {
//     if (!d) return 'N/A';
//     return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={S.loadingWrap}>
//         <ActivityIndicator size="large" color={C.primary} />
//         <Text style={S.loadingText}>Loading your requests…</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     // ✅ SafeAreaView - no more hardcoded paddingTop: 60
//     <SafeAreaView style={S.container}>

//       {/* HEADER */}
//       <View style={S.header}>
//         <View style={S.headerLeft}>

//           {/* ✅ Back Button */}
//           <TouchableOpacity
//             style={S.backBtn}
//             onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home')}
//             activeOpacity={0.75}
//           >
//             <Icon name="arrow-back" size={20} color={C.primary} />
//           </TouchableOpacity>

//           <Text style={S.headerTitle}>My Load Requests</Text>
//         </View>
//         <View style={S.countBadge}>
//           <Text style={S.countText}>{loadRequests.length}</Text>
//         </View>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.primary} />}
//         contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
//       >
//         {loadRequests.length === 0 ? (
//           <View style={S.emptyWrap}>
//             <Text style={S.emptyIcon}>📭</Text>
//             <Text style={S.emptyTitle}>No requests yet</Text>
//             <Text style={S.emptyHint}>Tap + to create your first load request</Text>
//           </View>
//         ) : (
//           loadRequests.map((req) => {
//             const st = getStatus(req.status);
//             return (
//               <TouchableOpacity
//                 key={req.loadRequestId}
//                 style={S.card}
//                 onPress={() => navigation.navigate('TripStatus', { loadRequestId: req.loadRequestId })}
//                 activeOpacity={0.9}
//               >
//                 {/* Card Header */}
//                 <View style={S.cardHeader}>
//                   <Text style={S.requestId}># {req.loadRequestId}</Text>
//                   <View style={[S.statusBadge, { backgroundColor: st.bg }]}>
//                     <Icon name={st.icon} size={13} color={st.color} />
//                     <Text style={[S.statusText, { color: st.color }]}>{st.label}</Text>
//                   </View>
//                 </View>

//                 {/* Route */}
//                 <View style={S.routeWrap}>
//                   <View style={S.routeItem}>
//                     <View style={[S.routeDot, { backgroundColor: '#22C55E' }]} />
//                     <View style={S.routeInfo}>
//                       <Text style={S.routeLabel}>PICKUP</Text>
//                       <Text style={S.routeValue} numberOfLines={1}>{req.pickupLocation}</Text>
//                     </View>
//                   </View>
//                   <View style={S.routeLine} />
//                   <View style={S.routeItem}>
//                     <View style={[S.routeDot, { backgroundColor: C.primary }]} />
//                     <View style={S.routeInfo}>
//                       <Text style={S.routeLabel}>DROP</Text>
//                       <Text style={S.routeValue} numberOfLines={1}>{req.dropLocation}</Text>
//                     </View>
//                   </View>
//                 </View>

//                 {/* Details Row */}
//                 <View style={S.detailsRow}>
//                   <View style={S.detailChip}>
//                     <Text style={S.detailChipLabel}>📦 {req.loadType}</Text>
//                   </View>
//                   <View style={S.detailChip}>
//                     <Text style={S.detailChipLabel}>⚖️ {req.weight} kg</Text>
//                   </View>
//                   <View style={S.detailChip}>
//                     <Text style={S.detailChipLabel}>📅 {formatDate(req.createdAt)}</Text>
//                   </View>
//                 </View>

//                 {/* Truck Image */}
//                 {req.truckImagePath && (
//                   <Image source={{ uri: getTruckImageUrl(req.truckImagePath) }} style={S.truckImage} resizeMode="cover" />
//                 )}

//                 {/* Actions */}
//                 <View style={S.actionRow}>
//                   <TouchableOpacity
//                     style={S.deleteBtn}
//                     onPress={(e) => { e.stopPropagation?.(); handleDelete(req.loadRequestId); }}
//                   >
//                     <Icon name="delete-outline" size={16} color="#EF4444" />
//                     <Text style={S.deleteBtnText}>Delete</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={S.viewBtn}
//                     onPress={() => navigation.navigate('TripStatus', { loadRequestId: req.loadRequestId })}
//                   >
//                     <Text style={S.viewBtnText}>View Details →</Text>
//                   </TouchableOpacity>
//                 </View>
//               </TouchableOpacity>
//             );
//           })
//         )}
//       </ScrollView>

//       {/* FAB */}
//       <TouchableOpacity style={S.fab} onPress={() => navigation.navigate('CreateLoadRequest')}>
//         <Icon name="add" size={28} color={C.white} />
//       </TouchableOpacity>

//     </SafeAreaView>
//   );
// };

// export default MyLoadRequestsScreen;

// const S = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F8F8F8' },

//   loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   loadingText: { marginTop: 12, fontSize: 14, color: '#666' },

//   header: {
//     backgroundColor: C.white,
//     paddingHorizontal: 20,
//     paddingVertical: 16, // ✅ paddingTop: 60 நீக்கினோம் - SafeAreaView handle பண்ணும்
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//     borderBottomColor: C.border,
//   },
//   headerLeft: {
//     flexDirection: 'row', alignItems: 'center', gap: 12,
//   },
//   backBtn: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: C.primaryLight,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   headerTitle: { fontSize: 24, fontWeight: '700', color: C.textPrimary },
//   countBadge: { backgroundColor: C.primaryLight, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
//   countText: { color: C.primary, fontWeight: '700', fontSize: 14 },

//   emptyWrap: { alignItems: 'center', paddingTop: 80 },
//   emptyIcon: { fontSize: 60, marginBottom: 16 },
//   emptyTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary, marginBottom: 8 },
//   emptyHint: { fontSize: 14, color: C.textSecondary },

//   card: {
//     backgroundColor: C.white, borderRadius: 16, padding: 16, marginBottom: 12,
//     borderWidth: 1, borderColor: C.border,
//     shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3,
//   },
//   cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
//   requestId: { fontSize: 13, fontWeight: '700', color: C.textSecondary },
//   statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
//   statusText: { fontSize: 12, fontWeight: '600' },

//   routeWrap: { marginBottom: 14 },
//   routeItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
//   routeDot: { width: 10, height: 10, borderRadius: 5, marginTop: 4 },
//   routeInfo: { flex: 1 },
//   routeLabel: { fontSize: 10, fontWeight: '700', color: C.textSecondary, letterSpacing: 0.8, marginBottom: 2 },
//   routeValue: { fontSize: 14, fontWeight: '500', color: C.textPrimary },
//   routeLine: { width: 2, height: 16, backgroundColor: C.border, marginLeft: 4, marginVertical: 4 },

//   detailsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
//   detailChip: { backgroundColor: '#F8F8F8', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: C.border },
//   detailChipLabel: { fontSize: 12, color: C.textSecondary, fontWeight: '500' },

//   truckImage: { width: '100%', height: 140, borderRadius: 12, marginBottom: 12 },

//   actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: C.border },
//   deleteBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 8 },
//   deleteBtnText: { color: '#EF4444', fontSize: 13, fontWeight: '600' },
//   viewBtn: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: C.primaryLight, borderRadius: 8 },
//   viewBtnText: { color: C.primary, fontSize: 13, fontWeight: '600' },

//   fab: {
//     position: 'absolute', bottom: 24, right: 20,
//     width: 60, height: 60, borderRadius: 30,
//     backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
//     shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8,
//   },
// });


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { customerAPI } from '../services/api';

// const C = {
//   primary:       '#FF6A00',
//   primaryLight:  '#FFF4EC',
//   white:         '#FFFFFF',
//   textPrimary:   '#111111',
//   textSecondary: '#666666',
//   border:        '#EEEEEE',
//   bg:            '#F8F8F8',
// };

// const STATUS_CONFIG = {
//   pending:        { color: '#F59E0B', bg: '#FFFBEB', icon: 'hourglass-empty', label: 'Pending' },
//   assigned:       { color: '#22C55E', bg: '#F0FDF4', icon: 'check-circle',    label: 'Assigned' },
//   'in progress':  { color: '#8B5CF6', bg: '#F5F3FF', icon: 'directions-car',  label: 'In Progress' },
//   completed:      { color: '#22C55E', bg: '#F0FDF4', icon: 'done-all',        label: 'Completed' },
//   cancelled:      { color: '#EF4444', bg: '#FEF2F2', icon: 'cancel',          label: 'Cancelled' },
// };

// const getStatus = (s) =>
//   STATUS_CONFIG[(s || 'pending').toLowerCase()] || {
//     color: '#999',
//     bg: '#F8F8F8',
//     icon: 'help',
//     label: s || 'Unknown',
//   };

// const MyLoadRequestsScreen = ({ navigation }) => {
//   const [loadRequests, setLoadRequests] = useState([]);
//   const [loading, setLoading]           = useState(true);
//   const [refreshing, setRefreshing]     = useState(false);

//   useEffect(() => { fetchLoadRequests(); }, []);

//   const fetchLoadRequests = async () => {
//     try {
//       setLoading(true);
//       const customerId = await AsyncStorage.getItem('customerId');
//       if (!customerId) {
//         Alert.alert('Session Expired', 'Please login again');
//         navigation.replace('Login');
//         return;
//       }
//       const response = await customerAPI.getLoadRequests(customerId);
//       const requests = response.data.loadRequests || [];

//       // ✅ DEBUG — Metro terminal-இல் பாருங்க
//       console.log('=== LOAD REQUESTS DEBUG ===');
//       console.log(JSON.stringify(requests, null, 2));
//       console.log('===========================');

//       requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setLoadRequests(requests);
//     } catch (e) {
//       console.log('Fetch error:', e);
//       Alert.alert('Error', 'Failed to load your requests');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const onRefresh = () => { setRefreshing(true); fetchLoadRequests(); };

//   const handleDelete = (id) => {
//     Alert.alert('Delete Request', 'Are you sure you want to delete this request?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: async () => {
//           try {
//             await customerAPI.deleteLoadRequest(id);
//             fetchLoadRequests();
//           } catch {
//             Alert.alert('Error', 'Failed to delete request');
//           }
//         },
//       },
//     ]);
//   };

//   const getTruckImageUrl = (path) => {
//     if (!path) return null;
//     return `https://righpolamright.com${path.replace(/\\/g, '/').replace(/^C:/, '')}`;
//   };

//   const formatDate = (d) => {
//     if (!d) return 'N/A';
//     return new Date(d).toLocaleDateString('en-IN', {
//       day: '2-digit', month: 'short', year: 'numeric',
//     });
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={S.loadingWrap}>
//         <ActivityIndicator size="large" color={C.primary} />
//         <Text style={S.loadingText}>Loading your requests…</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={S.container}>

//       {/* HEADER */}
//       <View style={S.header}>
//         <View style={S.headerLeft}>
//           <TouchableOpacity
//             style={S.backBtn}
//             onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home')}
//             activeOpacity={0.75}
//           >
//             <Icon name="arrow-back" size={20} color={C.primary} />
//           </TouchableOpacity>
//           <Text style={S.headerTitle}>My Load Requests</Text>
//         </View>
//         <View style={S.countBadge}>
//           <Text style={S.countText}>{loadRequests.length}</Text>
//         </View>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.primary} />}
//         contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
//       >
//         {loadRequests.length === 0 ? (
//           <View style={S.emptyWrap}>
//             <Text style={S.emptyIcon}>📭</Text>
//             <Text style={S.emptyTitle}>No requests yet</Text>
//             <Text style={S.emptyHint}>Tap + to create your first load request</Text>
//           </View>
//         ) : (
//           loadRequests.map((req) => {
//             const st = getStatus(req.status);
//             return (
//               <TouchableOpacity
//                 key={req.loadRequestId}
//                 style={S.card}
//                 onPress={() => navigation.navigate('TripStatus', { loadRequestId: req.loadRequestId })}
//                 activeOpacity={0.9}
//               >
//                 {/* Card Header */}
//                 <View style={S.cardHeader}>
//                   <Text style={S.requestId}># {req.loadRequestId}</Text>
//                   <View style={[S.statusBadge, { backgroundColor: st.bg }]}>
//                     <Icon name={st.icon} size={13} color={st.color} />
//                     <Text style={[S.statusText, { color: st.color }]}>{st.label}</Text>
//                   </View>
//                 </View>

//                 {/* Route */}
//                 <View style={S.routeWrap}>
//                   <View style={S.routeItem}>
//                     <View style={[S.routeDot, { backgroundColor: '#22C55E' }]} />
//                     <View style={S.routeInfo}>
//                       <Text style={S.routeLabel}>PICKUP</Text>
//                       <Text style={S.routeValue} numberOfLines={1}>{req.pickupLocation}</Text>
//                     </View>
//                   </View>
//                   <View style={S.routeLine} />
//                   <View style={S.routeItem}>
//                     <View style={[S.routeDot, { backgroundColor: C.primary }]} />
//                     <View style={S.routeInfo}>
//                       <Text style={S.routeLabel}>DROP</Text>
//                       <Text style={S.routeValue} numberOfLines={1}>{req.dropLocation}</Text>
//                     </View>
//                   </View>
//                 </View>

//                 {/* Details Row */}
//                 <View style={S.detailsRow}>
//                   <View style={S.detailChip}>
//                     <Text style={S.detailChipLabel}>📦 {req.loadType}</Text>
//                   </View>
//                   <View style={S.detailChip}>
//                     <Text style={S.detailChipLabel}>⚖️ {req.weight} kg</Text>
//                   </View>
//                   <View style={S.detailChip}>
//                     <Text style={S.detailChipLabel}>📅 {formatDate(req.createdAt)}</Text>
//                   </View>
//                 </View>

//                 {/* Truck Image */}
//                 {req.truckImagePath && (
//                   <Image
//                     source={{ uri: getTruckImageUrl(req.truckImagePath) }}
//                     style={S.truckImage}
//                     resizeMode="cover"
//                   />
//                 )}

//                 {/* Actions */}
//                 <View style={S.actionRow}>
//                   <TouchableOpacity
//                     style={S.deleteBtn}
//                     onPress={(e) => { e.stopPropagation?.(); handleDelete(req.loadRequestId); }}
//                   >
//                     <Icon name="delete-outline" size={16} color="#EF4444" />
//                     <Text style={S.deleteBtnText}>Delete</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={S.viewBtn}
//                     onPress={() => navigation.navigate('TripStatus', { loadRequestId: req.loadRequestId })}
//                   >
//                     <Text style={S.viewBtnText}>View Details →</Text>
//                   </TouchableOpacity>
//                 </View>
//               </TouchableOpacity>
//             );
//           })
//         )}
//       </ScrollView>

//       {/* FAB */}
//       <TouchableOpacity style={S.fab} onPress={() => navigation.navigate('CreateLoadRequest')}>
//         <Icon name="add" size={28} color={C.white} />
//       </TouchableOpacity>

//     </SafeAreaView>
//   );
// };

// export default MyLoadRequestsScreen;

// const S = StyleSheet.create({
//   container:   { flex: 1, backgroundColor: '#F8F8F8' },

//   loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   loadingText: { marginTop: 12, fontSize: 14, color: '#666' },

//   header: {
//     backgroundColor: C.white,
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//     borderBottomColor: C.border,
//   },
//   headerLeft:  { flexDirection: 'row', alignItems: 'center', gap: 12 },
//   backBtn: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: C.primaryLight,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   headerTitle: { fontSize: 24, fontWeight: '700', color: C.textPrimary },
//   countBadge:  { backgroundColor: C.primaryLight, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
//   countText:   { color: C.primary, fontWeight: '700', fontSize: 14 },

//   emptyWrap:   { alignItems: 'center', paddingTop: 80 },
//   emptyIcon:   { fontSize: 60, marginBottom: 16 },
//   emptyTitle:  { fontSize: 18, fontWeight: '700', color: C.textPrimary, marginBottom: 8 },
//   emptyHint:   { fontSize: 14, color: C.textSecondary },

//   card: {
//     backgroundColor: C.white, borderRadius: 16, padding: 16, marginBottom: 12,
//     borderWidth: 1, borderColor: C.border,
//     shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.05, shadowRadius: 12, elevation: 3,
//   },
//   cardHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
//   requestId:   { fontSize: 13, fontWeight: '700', color: C.textSecondary },
//   statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
//   statusText:  { fontSize: 12, fontWeight: '600' },

//   routeWrap:   { marginBottom: 14 },
//   routeItem:   { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
//   routeDot:    { width: 10, height: 10, borderRadius: 5, marginTop: 4 },
//   routeInfo:   { flex: 1 },
//   routeLabel:  { fontSize: 10, fontWeight: '700', color: C.textSecondary, letterSpacing: 0.8, marginBottom: 2 },
//   routeValue:  { fontSize: 14, fontWeight: '500', color: C.textPrimary },
//   routeLine:   { width: 2, height: 16, backgroundColor: C.border, marginLeft: 4, marginVertical: 4 },

//   detailsRow:      { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
//   detailChip:      { backgroundColor: '#F8F8F8', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: C.border },
//   detailChipLabel: { fontSize: 12, color: C.textSecondary, fontWeight: '500' },

//   truckImage: { width: '100%', height: 140, borderRadius: 12, marginBottom: 12 },

//   actionRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: C.border },
//   deleteBtn:     { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 8 },
//   deleteBtnText: { color: '#EF4444', fontSize: 13, fontWeight: '600' },
//   viewBtn:       { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: C.primaryLight, borderRadius: 8 },
//   viewBtnText:   { color: C.primary, fontSize: 13, fontWeight: '600' },

//   fab: {
//     position: 'absolute', bottom: 24, right: 20,
//     width: 60, height: 60, borderRadius: 30,
//     backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
//     shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.4, shadowRadius: 10, elevation: 8,
//   },
// });


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { customerAPI } from '../services/api';

const C = {
  primary:       '#FF6A00',
  primaryLight:  '#FFF4EC',
  white:         '#FFFFFF',
  textPrimary:   '#111111',
  textSecondary: '#666666',
  border:        '#EEEEEE',
  bg:            '#F8F8F8',
};

const STATUS_CONFIG = {
  pending:       { color: '#F59E0B', bg: '#FFFBEB', icon: 'hourglass-empty', label: 'Pending' },
  assigned:      { color: '#22C55E', bg: '#F0FDF4', icon: 'check-circle',    label: 'Assigned' },
  'in progress': { color: '#8B5CF6', bg: '#F5F3FF', icon: 'directions-car',  label: 'In Progress' },
  completed:     { color: '#22C55E', bg: '#F0FDF4', icon: 'done-all',        label: 'Completed' },
  cancelled:     { color: '#EF4444', bg: '#FEF2F2', icon: 'cancel',          label: 'Cancelled' },
};

// ── FILTER TABS config ────────────────────────────────────
const FILTER_TABS = [
  { key: 'all',         label: 'All',         icon: 'list'           },
  { key: 'pending',     label: 'Pending',     icon: 'hourglass-empty'},
  { key: 'assigned',    label: 'Assigned',    icon: 'check-circle'   },
  { key: 'in progress', label: 'In Progress', icon: 'directions-car' },
  { key: 'completed',   label: 'Completed',   icon: 'done-all'       },
  { key: 'cancelled',   label: 'Cancelled',   icon: 'cancel'         },
];

const getStatus = (s) =>
  STATUS_CONFIG[(s || 'pending').toLowerCase()] || {
    color: '#999', bg: '#F8F8F8', icon: 'help', label: s || 'Unknown',
  };

// ── CHANGE 1: Format date + time ─────────────────────────
const formatDateTime = (d) => {
  if (!d) return { date: 'N/A', time: '' };
  const dt = new Date(d);
  const date = dt.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
  const time = dt.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
  return { date, time };
};

const MyLoadRequestsScreen = ({ navigation }) => {
  const [loadRequests, setLoadRequests] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [refreshing, setRefreshing]     = useState(false);
  // ── CHANGE 2: Active filter state ──
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => { fetchLoadRequests(); }, []);

  const fetchLoadRequests = async () => {
    try {
      setLoading(true);
      const customerId = await AsyncStorage.getItem('customerId');
      if (!customerId) {
        Alert.alert('Session Expired', 'Please login again');
        navigation.replace('Login');
        return;
      }
      const response = await customerAPI.getLoadRequests(customerId);
      const requests = response.data.loadRequests || [];
      requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setLoadRequests(requests);
    } catch (e) {
      console.log('Fetch error:', e);
      Alert.alert('Error', 'Failed to load your requests');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => { setRefreshing(true); fetchLoadRequests(); };

  const handleDelete = (id) => {
    Alert.alert('Delete Request', 'Are you sure you want to delete this request?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await customerAPI.deleteLoadRequest(id);
            fetchLoadRequests();
          } catch {
            Alert.alert('Error', 'Failed to delete request');
          }
        },
      },
    ]);
  };

  const getTruckImageUrl = (path) => {
    if (!path) return null;
    return `https://righpolamright.com${path.replace(/\\/g, '/').replace(/^C:/, '')}`;
  };

  // ── CHANGE 2: Filter logic ────────────────────────────
  const filteredRequests = activeFilter === 'all'
    ? loadRequests
    : loadRequests.filter(
        (r) => (r.status || 'pending').toLowerCase() === activeFilter
      );

  // Count per tab
  const getCount = (key) =>
    key === 'all'
      ? loadRequests.length
      : loadRequests.filter((r) => (r.status || 'pending').toLowerCase() === key).length;

  if (loading) {
    return (
      <SafeAreaView style={S.loadingWrap}>
        <ActivityIndicator size="large" color={C.primary} />
        <Text style={S.loadingText}>Loading your requests…</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={S.container}>

      {/* ── HEADER ── */}
      <View style={S.header}>
        <View style={S.headerLeft}>
          <TouchableOpacity
            style={S.backBtn}
            onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home')}
            activeOpacity={0.75}
          >
            <Icon name="arrow-back" size={20} color={C.primary} />
          </TouchableOpacity>
          <Text style={S.headerTitle}>My Load Requests</Text>
        </View>
        <View style={S.countBadge}>
          <Text style={S.countText}>{loadRequests.length}</Text>
        </View>
      </View>

      {/* ── CHANGE 2: FILTER TABS ── */}
      <View style={S.filterTabsWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={S.filterTabsScroll}
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.key;
            const count    = getCount(tab.key);
            const stColor  = tab.key === 'all' ? C.primary
              : (STATUS_CONFIG[tab.key]?.color || C.primary);
            return (
              <TouchableOpacity
                key={tab.key}
                style={[
                  S.filterTab,
                  isActive && { backgroundColor: stColor, borderColor: stColor },
                ]}
                onPress={() => setActiveFilter(tab.key)}
                activeOpacity={0.8}
              >
                <Icon
                  name={tab.icon}
                  size={13}
                  color={isActive ? C.white : C.textSecondary}
                />
                <Text style={[S.filterTabText, isActive && S.filterTabTextActive]}>
                  {tab.label}
                </Text>
                {count > 0 && (
                  <View style={[
                    S.filterTabBadge,
                    { backgroundColor: isActive ? 'rgba(255,255,255,0.3)' : '#F0F0F0' },
                  ]}>
                    <Text style={[
                      S.filterTabBadgeText,
                      { color: isActive ? C.white : C.textSecondary },
                    ]}>
                      {count}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.primary} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        {filteredRequests.length === 0 ? (
          <View style={S.emptyWrap}>
            <Text style={S.emptyIcon}>
              {activeFilter === 'all' ? '📭' : '🔍'}
            </Text>
            <Text style={S.emptyTitle}>
              {activeFilter === 'all' ? 'No requests yet' : `No ${activeFilter} requests`}
            </Text>
            <Text style={S.emptyHint}>
              {activeFilter === 'all'
                ? 'Tap + to create your first load request'
                : 'Try a different filter above'}
            </Text>
          </View>
        ) : (
          filteredRequests.map((req) => {
            const st = getStatus(req.status);
            // ── CHANGE 1: Get date + time ──
            const { date, time } = formatDateTime(req.createdAt);

            return (
              <TouchableOpacity
                key={req.loadRequestId}
                style={S.card}
                onPress={() => navigation.navigate('TripStatus', { loadRequestId: req.loadRequestId })}
                activeOpacity={0.9}
              >
                {/* Card Header */}
                <View style={S.cardHeader}>
                  <Text style={S.requestId}># {req.loadRequestId}</Text>
                  <View style={[S.statusBadge, { backgroundColor: st.bg }]}>
                    <Icon name={st.icon} size={13} color={st.color} />
                    <Text style={[S.statusText, { color: st.color }]}>{st.label}</Text>
                  </View>
                </View>

                {/* ── CHANGE 1: Date + Time row ── */}
                <View style={S.dateTimeRow}>
                  <View style={S.dateTimeChip}>
                    <Icon name="calendar-today" size={12} color={C.primary} />
                    <Text style={S.dateTimeText}>{date}</Text>
                  </View>
                  <View style={S.dateTimeDot} />
                  <View style={S.dateTimeChip}>
                    <Icon name="access-time" size={12} color={C.primary} />
                    <Text style={S.dateTimeText}>{time}</Text>
                  </View>
                </View>

                {/* Route */}
                <View style={S.routeWrap}>
                  <View style={S.routeItem}>
                    <View style={[S.routeDot, { backgroundColor: '#22C55E' }]} />
                    <View style={S.routeInfo}>
                      <Text style={S.routeLabel}>PICKUP</Text>
                      <Text style={S.routeValue} numberOfLines={1}>{req.pickupLocation}</Text>
                    </View>
                  </View>
                  <View style={S.routeLine} />
                  <View style={S.routeItem}>
                    <View style={[S.routeDot, { backgroundColor: C.primary }]} />
                    <View style={S.routeInfo}>
                      <Text style={S.routeLabel}>DROP</Text>
                      <Text style={S.routeValue} numberOfLines={1}>{req.dropLocation}</Text>
                    </View>
                  </View>
                </View>

                {/* Details Row */}
                <View style={S.detailsRow}>
                  <View style={S.detailChip}>
                    <Text style={S.detailChipLabel}>📦 {req.loadType}</Text>
                  </View>
                  <View style={S.detailChip}>
                    <Text style={S.detailChipLabel}>⚖️ {req.weight} kg</Text>
                  </View>
                </View>

                {/* Truck Image */}
                {req.truckImagePath && (
                  <Image
                    source={{ uri: getTruckImageUrl(req.truckImagePath) }}
                    style={S.truckImage}
                    resizeMode="cover"
                  />
                )}

                {/* Actions */}
                <View style={S.actionRow}>
                  <TouchableOpacity
                    style={S.deleteBtn}
                    onPress={(e) => { e.stopPropagation?.(); handleDelete(req.loadRequestId); }}
                  >
                    <Icon name="delete-outline" size={16} color="#EF4444" />
                    <Text style={S.deleteBtnText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={S.viewBtn}
                    onPress={() => navigation.navigate('TripStatus', { loadRequestId: req.loadRequestId })}
                  >
                    <Text style={S.viewBtnText}>View Details →</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={S.fab} onPress={() => navigation.navigate('CreateLoadRequest')}>
        <Icon name="add" size={28} color={C.white} />
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default MyLoadRequestsScreen;

const S = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#F8F8F8' },
  loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 14, color: '#666' },

  header: {
    backgroundColor: C.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  headerLeft:  { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: C.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: C.textPrimary },
  countBadge:  { backgroundColor: C.primaryLight, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  countText:   { color: C.primary, fontWeight: '700', fontSize: 14 },

  // ── CHANGE 2: Filter tabs ─────────────────────────────
  filterTabsWrap: {
    backgroundColor: C.white,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    paddingVertical: 10,
  },
  filterTabsScroll: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: C.border,
    backgroundColor: C.white,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: C.textSecondary,
  },
  filterTabTextActive: {
    color: C.white,
  },
  filterTabBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  filterTabBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },

  emptyWrap:   { alignItems: 'center', paddingTop: 80 },
  emptyIcon:   { fontSize: 60, marginBottom: 16 },
  emptyTitle:  { fontSize: 18, fontWeight: '700', color: C.textPrimary, marginBottom: 8 },
  emptyHint:   { fontSize: 14, color: C.textSecondary },

  card: {
    backgroundColor: C.white, borderRadius: 16, padding: 16, marginBottom: 12,
    borderWidth: 1, borderColor: C.border,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, shadowRadius: 12, elevation: 3,
  },
  cardHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  requestId:   { fontSize: 13, fontWeight: '700', color: C.textSecondary },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  statusText:  { fontSize: 12, fontWeight: '600' },

  // ── CHANGE 1: Date + Time row ─────────────────────────
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 6,
  },
  dateTimeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: C.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dateTimeText: {
    fontSize: 11,
    fontWeight: '600',
    color: C.primary,
  },
  dateTimeDot: {
    width: 4, height: 4, borderRadius: 2, backgroundColor: C.border,
  },

  routeWrap:   { marginBottom: 14 },
  routeItem:   { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  routeDot:    { width: 10, height: 10, borderRadius: 5, marginTop: 4 },
  routeInfo:   { flex: 1 },
  routeLabel:  { fontSize: 10, fontWeight: '700', color: C.textSecondary, letterSpacing: 0.8, marginBottom: 2 },
  routeValue:  { fontSize: 14, fontWeight: '500', color: C.textPrimary },
  routeLine:   { width: 2, height: 16, backgroundColor: C.border, marginLeft: 4, marginVertical: 4 },

  detailsRow:      { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  detailChip:      { backgroundColor: '#F8F8F8', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: C.border },
  detailChipLabel: { fontSize: 12, color: C.textSecondary, fontWeight: '500' },

  truckImage: { width: '100%', height: 140, borderRadius: 12, marginBottom: 12 },

  actionRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: C.border },
  deleteBtn:     { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 8 },
  deleteBtnText: { color: '#EF4444', fontSize: 13, fontWeight: '600' },
  viewBtn:       { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: C.primaryLight, borderRadius: 8 },
  viewBtnText:   { color: C.primary, fontSize: 13, fontWeight: '600' },

  fab: {
    position: 'absolute', bottom: 24, right: 20,
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
    shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 10, elevation: 8,
  },
});