
// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { customerAPI } from '../services/api';

// const TripStatusScreen = ({ route, navigation }) => {
//   const { loadRequestId } = route.params || {};

//   const [loading, setLoading] = useState(true);
//   const [trip, setTrip] = useState(null);

//   useEffect(() => {
//     if (!loadRequestId) {
//       Alert.alert('Error', 'Load Request ID missing');
//       setLoading(false);
//       return;
//     }
//     fetchTrip();
//   }, [loadRequestId]);

//   const fetchTrip = async () => {
//     try {
//       console.log('Fetching trip for ID:', loadRequestId);
//       const response = await customerAPI.getTripDetails(loadRequestId);
//       console.log('API response:', response.data);

//       if (!response.data.success) {
//         Alert.alert('Info', response.data.message || 'Trip not available yet');
//         setTrip(null);
//       } else {
//         // Use response.data directly since your API returns the object
//         setTrip(response.data);
//       }
//     } catch (error) {
//       console.error('Trip fetch error:', error);
//       Alert.alert('Error', 'Failed to load trip details');
//       setTrip(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getImageUrl = (path) => {
//     if (!path) return null;
//     // If path is already full URL, use it directly
//     if (path.startsWith('http')) return path;
//     // Otherwise, construct URL from server
//     return `http://192.168.1.11:8080/uploads/${path.split('/').pop()}`;
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#2E7D32" />
//         <Text>Checking trip status...</Text>
//       </View>
//     );
//   }

//   if (!trip) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.infoText}>Trip details not available yet 🚚</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Trip Details</Text>

//       <Text style={styles.label}>Driver Name</Text>
//       <Text style={styles.value}>{trip.driverName || '-'}</Text>

//       <Text style={styles.label}>Phone</Text>
//       <Text style={styles.value}>{trip.driverPhoneNumber || '-'}</Text>

//       <Text style={styles.label}>Truck Number</Text>
//       <Text style={styles.value}>{trip.truckNumber || '-'}</Text>

//       {trip.truckImagePath && (
//         <Image
//           source={{ uri: getImageUrl(trip.truckImagePath) }}
//           style={styles.truckImage}
//           resizeMode="contain"
//         />
//       )}

//       {/* ---------------- PAY NOW BUTTON ---------------- */}
//       {trip.tripId && (
//         <TouchableOpacity
//           style={styles.payButton}
//           onPress={() =>
//             navigation.navigate('Payment', { tripId: trip.tripId })
//           }
//         >
//           <Text style={styles.payText}>Pay Now</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default TripStatusScreen;

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
// //   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// //   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
// //   label: { fontSize: 12, color: '#888', marginTop: 10 },
// //   value: { fontSize: 16, fontWeight: '600', marginTop: 2 },
// //   truckImage: { width: '100%', height: 200, marginTop: 15, borderRadius: 10 },
// //   infoText: { fontSize: 16, color: '#777', textAlign: 'center' },
// //   payButton: {
// //     marginTop: 25,
// //     backgroundColor: '#3498db',
// //     padding: 16,
// //     borderRadius: 10,
// //     alignItems: 'center',
// //   },
// //   payText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
// // });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f5f8', // subtle light background
//     padding: 20,
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 20,
//     color: '#2E7D32',
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 13,
//     color: '#666',
//     marginTop: 12,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginTop: 4,
//     color: '#333',
//   },
//   truckImage: {
//     width: '100%',
//     height: 220,
//     marginTop: 20,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: '#fff',
//   },
//   infoText: {
//     fontSize: 16,
//     color: '#888',
//     textAlign: 'center',
//     paddingHorizontal: 20,
//   },
//   payButton: {
//     marginTop: 30,
//     backgroundColor: '#2E7D32',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 6,
//   },
//   payText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '700',
//   },
// });


// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { customerAPI } from '../services/api';

// const TripStatusScreen = ({ route, navigation }) => {
//   const { loadRequestId } = route.params || {};

//   const [loading, setLoading] = useState(true);
//   const [trip, setTrip] = useState(null);

//   useEffect(() => {
//     if (!loadRequestId) {
//       Alert.alert('Error', 'Load Request ID missing');
//       setLoading(false);
//       return;
//     }
//     fetchTrip();
//   }, [loadRequestId]);

//   const fetchTrip = async () => {
//     try {
//       console.log('Fetching trip for loadRequestId:', loadRequestId);
//       const response = await customerAPI.getTripDetails(loadRequestId);
//       console.log('Raw API response:', response.data);

//       // Normalize response
//       let tripData = response.data.data || response.data;

//       // Case: backend wraps trip inside 'trip'
//       if (tripData.trip) tripData = tripData.trip;

//       // Case: backend returns only root-level tripId after payment
//       if (!tripData.tripId && response.data.tripId) {
//         tripData.tripId = response.data.tripId;
//       }

//       // Case: backend uses 'id' instead of tripId
//       if (!tripData.tripId && tripData.id) {
//         tripData.tripId = tripData.id;
//       }

//       console.log('Normalized tripData:', tripData);

//       if (!tripData || !tripData.tripId) {
//         // tripId missing → still set tripData so button can hide
//         setTrip(tripData || { tripId: null });
//       } else {
//         setTrip(tripData);
//       }
//     } catch (error) {
//       console.error('Trip fetch error:', error);
//       Alert.alert('Error', 'Failed to load trip details');
//       setTrip({ tripId: null });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getImageUrl = (path) => {
//     if (!path) return null;
//     if (path.startsWith('http')) return path;
//     return `http://192.168.1.11:8080/uploads/${path.split('/').pop()}`;
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#2E7D32" />
//         <Text>Checking trip status...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Trip Details</Text>

//       <Text style={styles.label}>Driver Name</Text>
//       <Text style={styles.value}>{trip.driverName || '-'}</Text>

//       <Text style={styles.label}>Phone</Text>
//       <Text style={styles.value}>{trip.driverPhoneNumber || '-'}</Text>

//       <Text style={styles.label}>Truck Number</Text>
//       <Text style={styles.value}>{trip.truckNumber || '-'}</Text>

//       {trip.truckImagePath && (
//         <Image
//           source={{ uri: getImageUrl(trip.truckImagePath) }}
//           style={styles.truckImage}
//           resizeMode="contain"
//         />
//       )}

//       {/* ---------------- PAY NOW BUTTON ---------------- */}
//       {trip.tripId ? (
//         <TouchableOpacity
//           style={styles.payButton}
//           onPress={() => {
//             console.log('Navigating to PaymentScreen with tripId:', trip.tripId);
//             navigation.navigate('Payment', { tripId: trip.tripId });
//           }}
//         >
//           <Text style={styles.payText}>Pay Now</Text>
//         </TouchableOpacity>
//       ) : (
//         <Text style={[styles.infoText, { marginTop: 20 }]}>
//           Payment not available yet 🚚
//         </Text>
//       )}
//     </View>
//   );
// };

// export default TripStatusScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f5f8',
//     padding: 20,
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 20,
//     color: '#2E7D32',
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 13,
//     color: '#666',
//     marginTop: 12,
//   },
//   value: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginTop: 4,
//     color: '#333',
//   },
//   truckImage: {
//     width: '100%',
//     height: 220,
//     marginTop: 20,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: '#fff',
//   },
//   infoText: {
//     fontSize: 16,
//     color: '#888',
//     textAlign: 'center',
//     paddingHorizontal: 20,
//   },
//   payButton: {
//     marginTop: 30,
//     backgroundColor: '#2E7D32',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 6,
//   },
//   payText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '700',
//   },
// });


// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { customerAPI } from '../services/api';

// const TripStatusScreen = ({ route, navigation }) => {

//   const { loadRequestId } = route.params || {};

//   const [loading, setLoading] = useState(true);
//   const [trip, setTrip] = useState(null);

//   useEffect(() => {

//     console.log("Route params:", route.params);

//     if (!loadRequestId) {
//       Alert.alert("Error", "Load Request ID missing");
//       setLoading(false);
//       return;
//     }

//     fetchTrip();

//   }, []);

//   const fetchTrip = async () => {

//     try {

//       console.log("Fetching trip for loadRequestId:", loadRequestId);

//       const response = await customerAPI.getTripDetails(loadRequestId);

//       console.log("Raw API response:", response.data);

//       let tripData = response.data.data || response.data;

//       // backend returns { trip : {...} }
//       if (tripData.trip) {
//         tripData = tripData.trip;
//       }

//       // fallback
//       if (!tripData.tripId && tripData.id) {
//         tripData.tripId = tripData.id;
//       }

//       console.log("Normalized tripData:", tripData);

//       setTrip(tripData);

//     } catch (error) {

//       console.log("Trip fetch error:", error);

//       Alert.alert("Error", "Failed to load trip details");

//       setTrip(null);

//     } finally {
//       setLoading(false);
//     }

//   };

//   const getImageUrl = (path) => {

//     if (!path) return null;

//     if (path.startsWith("http")) return path;

//     return `https://rightpolamright.com/uploads/${path.split('/').pop()}`;
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#2E7D32" />
//         <Text>Checking trip status...</Text>
//       </View>
//     );
//   }

//   if (!trip) {
//     return (
//       <View style={styles.center}>
//         <Text>No trip available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>

//       <Text style={styles.title}>Trip Details</Text>

//       <Text style={styles.label}>Driver Name</Text>
//       <Text style={styles.value}>{trip.driverName || "-"}</Text>

//       <Text style={styles.label}>Phone</Text>
//       <Text style={styles.value}>{trip.driverPhoneNumber || "-"}</Text>

//       <Text style={styles.label}>Truck Number</Text>
//       <Text style={styles.value}>{trip.truckNumber || "-"}</Text>

//       {trip.truckImagePath && (
//         <Image
//           source={{ uri: getImageUrl(trip.truckImagePath) }}
//           style={styles.truckImage}
//           resizeMode="contain"
//         />
//       )}

//       {/* PAY NOW BUTTON */}

//       {trip.tripId ? (
//         <TouchableOpacity
//           style={styles.payButton}
//           onPress={() => {

//             console.log("Navigating to Payment with tripId:", trip.tripId);

//             navigation.navigate("Payment", { tripId: trip.tripId });

//           }}
//         >
//           <Text style={styles.payText}>Pay Now</Text>
//         </TouchableOpacity>
//       ) : (
//         <Text style={styles.infoText}>
//           Payment not available yet 🚚
//         </Text>
//       )}

//     </View>
//   );
// };

// export default TripStatusScreen;

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: "#f2f5f8",
//     padding: 20,
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 20,
//     color: "#2E7D32",
//     textAlign: "center",
//   },

//   label: {
//     fontSize: 13,
//     color: "#666",
//     marginTop: 12,
//   },

//   value: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginTop: 4,
//     color: "#333",
//   },

//   truckImage: {
//     width: "100%",
//     height: 220,
//     marginTop: 20,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     backgroundColor: "#fff",
//   },

//   infoText: {
//     fontSize: 16,
//     color: "#888",
//     textAlign: "center",
//     marginTop: 25,
//   },

//   payButton: {
//     marginTop: 30,
//     backgroundColor: "#2E7D32",
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     elevation: 6,
//   },

//   payText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },

// });

// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import { customerAPI } from '../services/api';
// const TripStatusScreen = ({ route, navigation }) => {

//   const { loadRequestId } = route.params || {};

//   const [loading, setLoading] = useState(true);
//   const [trip, setTrip] = useState(null);
  

//   useEffect(() => {

//     console.log("Route params:", route.params);

//     if (!loadRequestId) {
//       Alert.alert("Error", "Load Request ID missing");
//       setLoading(false);
//       return;
//     }

//     fetchTrip();

//   }, []);

// const fetchTrip = async () => {
//   try {

//     console.log("Fetching trip for loadRequestId:", loadRequestId);

//     const response = await customerAPI.getTripDetails(loadRequestId);

//     console.log("API RESPONSE:", response.data);

//     const data = response.data;

//     if (!data.success) {
//       setTrip(null);
//       return;
//     }

//     const tripData = {
//       tripId: data.tripId,
//       driverName: data.driverName,
//       driverId: data.driverId,
//       truckNumber: data.truckNumber,
//       truckImage: data.truckImage,
//       tripStatus: data.tripStatus,
//     };

//     setTrip(tripData);

//   } catch (error) {

//     console.log("Trip fetch error:", error);
//     console.log("Server response:", error.response?.data);

//     Alert.alert(
//       "Error",
//       error.response?.data?.message || "Failed to load trip details"
//     );

//   } finally {

//     setLoading(false);

//   }
// };

//  const getImageUrl = (imageName) => {

//   if (!imageName) return null;

//   if (imageName.startsWith("http")) return imageName;

//   return `https://rightpolamright.com/uploads/${imageName}`;
// };

//   if (loading) {

//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#2E7D32" />
//         <Text style={{ marginTop: 10 }}>Checking trip status...</Text>
//       </View>
//     );

//   }

// if (!trip) {
//   return (
//     <View style={styles.center}>
//       <Text>No trip available</Text>
//     </View>
//   );
// }
//   return (

//     <View style={styles.container}>

//       <Text style={styles.title}>Trip Details</Text>

//       <Text style={styles.label}>Driver Name</Text>
//       <Text style={styles.value}>{trip.driverName}</Text>

//       <Text style={styles.label}>Driver ID</Text>
//       <Text style={styles.value}>{trip.driverId}</Text>

//       <Text style={styles.label}>Truck Number</Text>
//       <Text style={styles.value}>{trip.truckNumber}</Text>

//       <Text style={styles.label}>Trip Status</Text>
//       <Text style={[styles.value, styles.status]}>
//         {trip.tripStatus}
//       </Text>

//       {trip.truckImage && (

//         <Image
//           source={{ uri: getImageUrl(trip.truckImage) }}
//           style={styles.truckImage}
//           resizeMode="contain"
//         />

//       )}

//       {/* PAY NOW BUTTON */}

//       {trip.tripId ? (

//         <TouchableOpacity
//           style={styles.payButton}
//           onPress={() => {

//             console.log("Navigating to Payment with tripId:", trip.tripId);

//             navigation.navigate("Payment", { tripId: trip.tripId });

//           }}
//         >
//           <Text style={styles.payText}>Pay Now</Text>
//         </TouchableOpacity>

//       ) : (

//         <Text style={styles.infoText}>
//           Payment not available yet 🚚
//         </Text>

//       )}

//     </View>

//   );

// };

// export default TripStatusScreen;

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: "#f2f5f8",
//     padding: 20,
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 20,
//     color: "#03060f",
//     textAlign: "center",
//   },

//   label: {
//     fontSize: 13,
//     color: "#666",
//     marginTop: 12,
//   },

//   value: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginTop: 4,
//     color: "#333",
//   },

//   status: {
//     color: "#262835",
//     fontWeight: "bold",
//   },

//   truckImage: {
//     width: "100%",
//     height: 220,
//     marginTop: 20,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     backgroundColor: "#fff",
//   },

//   infoText: {
//     fontSize: 16,
//     color: "#888",
//     textAlign: "center",
//     marginTop: 25,
//   },

//   payButton: {
//     marginTop: 30,
//     backgroundColor: "#5998eb",
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     elevation: 6,
//   },

//   payText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },

// });

// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import { customerAPI } from '../services/api';

// const TripStatusScreen = ({ route, navigation }) => {

//   const { loadRequestId } = route.params || {};

//   const [loading, setLoading] = useState(true);
//   const [trip, setTrip] = useState(null);

//   useEffect(() => {

//     if (!loadRequestId) {
//       Alert.alert("Error", "Load Request ID missing");
//       setLoading(false);
//       return;
//     }

//     fetchTrip();

//   }, []);

//   const fetchTrip = async () => {
//     try {

//       const response = await customerAPI.getTripDetails(loadRequestId);
//       const data = response.data;

//       if (!data.success) {
//         setTrip(null);
//         return;
//       }

//       // ✅ SAFE DATA MAPPING
//       const tripData = {
//         tripId: data.tripId ?? "N/A",
//         tripStatus: data.tripStatus ?? "PENDING",

//         driverId: data.driverId ?? "N/A",
//         driverName: data.driverName ?? "Not Assigned",

//         truckId: data.truckId ?? "N/A",
//         truckNumber: data.truckNumber ?? "Not Available",

//         truckImage: data.truckImage ?? null,
//       };

//       setTrip(tripData);

//     } catch (error) {

//       Alert.alert(
//         "Error",
//         error.response?.data?.message || "Failed to load trip details"
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ IMAGE URL FIX
//   const getImageUrl = (imagePath) => {

//     if (!imagePath) return null;

//     if (imagePath.startsWith("http")) return imagePath;

//     return `https://rightpolamright.com/uploads/${imagePath}`;
//   };

//   // ✅ STATUS COLOR
//   const getStatusColor = (status) => {
//     switch ((status || "").toLowerCase()) {
//       case "pending": return "#f39c12";
//       case "assigned": return "#3498db";
//       case "in progress": return "#9b59b6";
//       case "completed": return "#2ecc71";
//       case "cancelled": return "#e74c3c";
//       default: return "#333";
//     }
//   };

//   // LOADING UI
//   if (loading) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <ActivityIndicator size="large" color="#2E7D32" />
//         <Text style={{ marginTop: 10 }}>Checking trip status...</Text>
//       </SafeAreaView>
//     );
//   }

//   // NO TRIP
//   if (!trip) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <Text style={{ fontSize: 16 }}>🚚 No trip assigned yet</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }} edges={['top']}>
//       <ScrollView contentContainerStyle={styles.container}>

//         <Text style={styles.title}>Trip Details</Text>

//         <Text style={styles.label}>Trip ID</Text>
//         <Text style={styles.value}>{trip.tripId}</Text>

//         <Text style={styles.label}>Driver Name</Text>
//         <Text style={styles.value}>{trip.driverName}</Text>

//         <Text style={styles.label}>Driver ID</Text>
//         <Text style={styles.value}>{trip.driverId}</Text>

//         <Text style={styles.label}>Truck Number</Text>
//         <Text style={styles.value}>{trip.truckNumber}</Text>

//         <Text style={styles.label}>Trip Status</Text>
//         <Text style={[styles.value, { color: getStatusColor(trip.tripStatus) }]}>
//           {trip.tripStatus}
//         </Text>

//         {/* ✅ TRUCK IMAGE */}
//         {trip.truckImage ? (
//           <Image
//             source={{ uri: getImageUrl(trip.truckImage) }}
//             style={styles.truckImage}
//             resizeMode="cover"
//           />
//         ) : (
//           <Text style={styles.infoText}>No truck image available</Text>
//         )}

//         {/* ✅ PAY BUTTON (ONLY AFTER ASSIGNED) */}
//         {trip.tripStatus !== "PENDING" && (
//           <TouchableOpacity
//             style={styles.payButton}
//             onPress={() => {
//               navigation.navigate("Payment", { tripId: trip.tripId });
//             }}
//           >
//             <Text style={styles.payText}>Pay Now</Text>
//           </TouchableOpacity>
//         )}

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default TripStatusScreen;

// // ---------------- STYLES ----------------

// const styles = StyleSheet.create({

//   container: {
//     padding: 20,
//     backgroundColor: "#f2f5f8",
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 20,
//     textAlign: "center",
//   },

//   label: {
//     fontSize: 13,
//     color: "#666",
//     marginTop: 12,
//   },

//   value: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginTop: 4,
//     color: "#333",
//   },

//   truckImage: {
//     width: "100%",
//     height: 220,
//     marginTop: 20,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },

//   infoText: {
//     fontSize: 14,
//     color: "#888",
//     textAlign: "center",
//     marginTop: 20,
//   },

//   payButton: {
//     marginTop: 30,
//     backgroundColor: "#5998eb",
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//   },

//   payText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },

// });



// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import { customerAPI } from '../services/api';

// const TripStatusScreen = ({ route, navigation }) => {

//   const { loadRequestId } = route.params || {};

//   const [loading, setLoading] = useState(true);
//   const [trip, setTrip] = useState(null);

//   useEffect(() => {

//     if (!loadRequestId) {
//       Alert.alert("Error", "Load Request ID missing");
//       setLoading(false);
//       return;
//     }

//     fetchTrip();

//   }, []);

//   const fetchTrip = async () => {
//     try {

//       const response = await customerAPI.getTripDetails(loadRequestId);
//       const data = response.data;

//       if (!data.success) {
//         setTrip(null);
//         return;
//       }

//       const tripData = {
//         tripId: data.tripId ?? "N/A",
//         tripStatus: data.tripStatus ?? "PENDING",

//         driverId: data.driverId ?? "N/A",
//         driverName: data.driverName ?? "Not Assigned",

//         truckId: data.truckId ?? "N/A",
//         truckNumber: data.truckNumber ?? "Not Available",

//         truckImage: data.truckImage ?? null,
//       };

//       setTrip(tripData);

//     } catch (error) {
//       Alert.alert(
//         "Error",
//         error.response?.data?.message || "Failed to load trip details"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return null;
//     if (imagePath.startsWith("http")) return imagePath;
//     return `https://rightpolamright.com/uploads/${imagePath}`;
//   };

//   const getStatusColor = (status) => {
//     switch ((status || "").toLowerCase()) {
//       case "pending": return "#f39c12";
//       case "assigned": return "#2E7D32";
//       case "in progress": return "#9b59b6";
//       case "completed": return "#2ecc71";
//       case "cancelled": return "#e74c3c";
//       default: return "#333";
//     }
//   };

//   // 🔄 LOADING
//   if (loading) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <ActivityIndicator size="large" color="#8fc492" />
//         <Text style={{ marginTop: 10 }}>Checking trip status...</Text>
//       </SafeAreaView>
//     );
//   }

//   // 🚫 NO TRIP
//   if (!trip) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <Text style={{ fontSize: 16 }}>🚚 No trip assigned yet</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }} edges={['top']}>
//       <ScrollView contentContainerStyle={styles.container}>

//         <Text style={styles.title}>🚚 Trip Details</Text>

//         {/* 🔹 TRIP CARD */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Trip Info</Text>

//           <View style={styles.row}>
//             <Text style={styles.label}>Trip ID</Text>
//             <Text style={styles.value}>{trip.tripId}</Text>
//           </View>

//           <View style={[styles.statusBadge, { backgroundColor: getStatusColor(trip.tripStatus) }]}>
//             <Text style={styles.statusText}>{trip.tripStatus}</Text>
//           </View>
//         </View>

//         {/* 🔹 DRIVER CARD */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Driver Info</Text>

//           <View style={styles.row}>
//             <Text style={styles.label}>Driver Name</Text>
//             <Text style={styles.value}>{trip.driverName}</Text>
//           </View>

//           <View style={styles.row}>
//             <Text style={styles.label}>Driver ID</Text>
//             <Text style={styles.value}>{trip.driverId}</Text>
//           </View>
//         </View>

//         {/* 🔹 TRUCK CARD */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Truck Info</Text>

//           <View style={styles.row}>
//             <Text style={styles.label}>Truck Number</Text>
//             <Text style={styles.value}>{trip.truckNumber}</Text>
//           </View>

//           {trip.truckImage ? (
//             <Image
//               source={{ uri: getImageUrl(trip.truckImage) }}
//               style={styles.truckImage}
//               resizeMode="cover"
//             />
//           ) : (
//             <Text style={styles.infoText}>No truck image available</Text>
//           )}
//         </View>

//         {/* 💳 PAY BUTTON */}
//         {trip.tripStatus !== "PENDING" && (
//           <TouchableOpacity
//             style={styles.payButton}
//             onPress={() => {
//               navigation.navigate("Payment", { tripId: trip.tripId });
//             }}
//           >
//             <Text style={styles.payText}>Pay Now</Text>
//           </TouchableOpacity>
//         )}

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default TripStatusScreen;

// // ---------------- STYLES ----------------

// const styles = StyleSheet.create({

//   container: {
//     padding: 16,
//     backgroundColor: "#eef2f7",
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#eef2f7",
//   },

//   title: {
//     fontSize: 26,
//     fontWeight: "800",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#070707",
//   },

//   card: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 16,
//     marginBottom: 15,

//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },

//     elevation: 4,
//   },

//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     marginBottom: 10,
//     color: "#444",
//   },

//   row: {
//     marginBottom: 10,
//   },

//   label: {
//     fontSize: 12,
//     color: "#888",
//   },

//   value: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#222",
//     marginTop: 2,
//   },

//   statusBadge: {
//     marginTop: 10,
//     paddingVertical: 8,
//     borderRadius: 20,
//     alignItems: "center",
//   },

//   statusText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 14,
//   },

//   truckImage: {
//     width: "100%",
//     height: 200,
//     marginTop: 15,
//     borderRadius: 15,
//   },

//   infoText: {
//     fontSize: 14,
//     color: "#999",
//     textAlign: "center",
//     marginTop: 15,
//   },

//   payButton: {
//     marginTop: 25,
//     backgroundColor: "#2E7D32",
//     paddingVertical: 16,
//     borderRadius: 30,
//     alignItems: "center",

//     shadowColor: "#080808",
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 5,
//   },

//   payText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },

// });

// import { useCallback, useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import { customerAPI } from '../services/api';

// const TripStatusScreen = ({ route, navigation }) => {

//   const { loadRequestId } = route.params || {};

//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [trip, setTrip] = useState(null);

//   useEffect(() => {
//     if (!loadRequestId) {
//       Alert.alert("Error", "Load Request ID missing");
//       setLoading(false);
//       return;
//     }
//     fetchTrip();
//   }, []);

//   const fetchTrip = async () => {
//     try {
//       const response = await customerAPI.getTripDetails(loadRequestId);
//       const data = response.data;

//       if (!data.success) {
//         setTrip(null);
//         return;
//       }

//       const tripData = {
//         tripId: data.tripId ?? "N/A",
//         tripStatus: data.tripStatus ?? "PENDING",
//         driverId: data.driverId ?? "N/A",
//         driverName: data.driverName ?? "Not Assigned",
//         truckNumber: data.truckNumber ?? "Not Available",
//         truckImage: data.truckImage ?? null,
//       };

//       setTrip(tripData);

//     } catch (error) {
//       Alert.alert(
//         "Error",
//         error.response?.data?.message || "Failed to load trip details"
//       );
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchTrip();
//   }, []);

//  const getImageUrl = (imagePath) => {

//   if (!imagePath) return null;

//   // if already full URL
//   if (imagePath.startsWith("http")) return imagePath;

//   // ✅ correct
//   return `https://rightpolamright.com${imagePath}`;
// };

//   const getStatusColor = (status) => {
//     switch ((status || "").toLowerCase()) {
//       case "pending": return "#f39c12";
//       case "assigned": return "#2E7D32";
//       case "in progress": return "#9b59b6";
//       case "completed": return "#2ecc71";
//       case "cancelled": return "#e74c3c";
//       default: return "#333";
//     }
//   };

//   // 🔥 AI-like Smart Message
//   const getStatusMessage = (status) => {
//     switch ((status || "").toLowerCase()) {
//       case "pending": return "⏳ Waiting for driver assignment...";
//       case "assigned": return "🚚 Driver assigned! You can proceed to payment.";
//       case "in progress": return "📍 Your trip is currently in progress.";
//       case "completed": return "✅ Trip completed successfully.";
//       case "cancelled": return "❌ Trip has been cancelled.";
//       default: return "";
//     }
//   };

//   // LOADING
//   if (loading) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <ActivityIndicator size="large" color="#2E7D32" />
//         <Text style={{ marginTop: 10 }}>Checking trip status...</Text>
//       </SafeAreaView>
//     );
//   }

//   // NO TRIP
//   if (!trip) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <Text style={{ fontSize: 16 }}>🚚 No trip assigned yet</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <ScrollView
//         contentContainerStyle={styles.container}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >

//         <Text style={styles.title}>🚚 Trip Details</Text>

//         {/* 🔹 STATUS MESSAGE */}
//         <Text style={styles.statusMessage}>
//           {getStatusMessage(trip.tripStatus)}
//         </Text>

//         {/* TRIP CARD */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Trip Info</Text>

//           <Text style={styles.label}>Trip ID</Text>
//           <Text style={styles.value}>{trip.tripId}</Text>

//           <View style={[styles.statusBadge, { backgroundColor: getStatusColor(trip.tripStatus) }]}>
//             <Text style={styles.statusText}>{trip.tripStatus}</Text>
//           </View>
//         </View>

//         {/* DRIVER */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Driver Info</Text>

//           <Text style={styles.label}>Driver Name</Text>
//           <Text style={styles.value}>{trip.driverName}</Text>

//           <Text style={styles.label}>Driver ID</Text>
//           <Text style={styles.value}>{trip.driverId}</Text>
//         </View>

//         {/* TRUCK */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Truck Info</Text>

//           <Text style={styles.label}>Truck Number</Text>
//           <Text style={styles.value}>{trip.truckNumber}</Text>

//           {trip.truckImage ? (
//             <Image
//               source={{ uri: getImageUrl(trip.truckImage) }}
//               style={styles.truckImage}
//             />
//           ) : (
//             <Text style={styles.infoText}>No truck image available</Text>
//           )}
//         </View>

//         {/* 💳 PAY BUTTON ONLY ASSIGNED */}
//         {trip.tripStatus?.toUpperCase() === "ASSIGNED" && (
//           <TouchableOpacity
//             style={styles.payButton}
//             onPress={() =>
//               navigation.navigate("Payment", { tripId: trip.tripId })
//             }
//           >
//             <Text style={styles.payText}>Pay Now</Text>
//           </TouchableOpacity>
//         )}

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default TripStatusScreen;

// /* STYLES */

// const styles = StyleSheet.create({

//   container: {
//     padding: 16,
//     backgroundColor: "#eef2f7",
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 26,
//     fontWeight: "800",
//     textAlign: "center",
//     marginBottom: 10,
//   },

//   statusMessage: {
//     textAlign: "center",
//     marginBottom: 15,
//     color: "#555",
//     fontSize: 14,
//   },

//   card: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 16,
//     marginBottom: 15,
//     elevation: 4,
//   },

//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     marginBottom: 10,
//   },

//   label: {
//     fontSize: 12,
//     color: "#888",
//     marginTop: 8,
//   },

//   value: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginTop: 2,
//   },

//   statusBadge: {
//     marginTop: 12,
//     padding: 8,
//     borderRadius: 20,
//     alignItems: "center",
//   },

//   statusText: {
//     color: "#fff",
//     fontWeight: "700",
//   },

//   truckImage: {
//     width: "100%",
//     height: 200,
//     borderRadius: 15,
//     marginTop: 10,
//   },

//   infoText: {
//     textAlign: "center",
//     color: "#888",
//     marginTop: 10,
//   },

//   payButton: {
//     marginTop: 20,
//     backgroundColor: "#2E7D32",
//     padding: 16,
//     borderRadius: 30,
//     alignItems: "center",
//   },

//   payText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },

// });

import { useCallback, useEffect, useState } from 'react';
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
  pending:       { color: '#F59E0B', bg: '#FFFBEB', msg: '⏳ Waiting for a driver to be assigned…' },
  assigned:      { color: '#22C55E', bg: '#F0FDF4', msg: '🚚 Driver assigned! You can proceed to payment.' },
  'in progress': { color: '#8B5CF6', bg: '#F5F3FF', msg: '📍 Your trip is currently in progress.' },
  completed:     { color: '#22C55E', bg: '#F0FDF4', msg: '✅ Trip completed successfully.' },
  cancelled:     { color: '#EF4444', bg: '#FEF2F2', msg: '❌ This trip has been cancelled.' },
};

const getStatusConf = (s) =>
  STATUS_CONFIG[(s || 'pending').toLowerCase()] || { color: '#999', bg: '#F8F8F8', msg: '' };

const TripStatusScreen = ({ route, navigation }) => {
  const { loadRequestId } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    if (!loadRequestId) {
      Alert.alert('Error', 'Load Request ID missing');
      setLoading(false);
      return;
    }
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    try {
      const response = await customerAPI.getTripDetails(loadRequestId);
      const data = response.data;
      if (!data.success) { setTrip(null); return; }
      setTrip({
        tripId:      data.tripId      ?? 'N/A',
        tripStatus:  data.tripStatus  ?? 'PENDING',
        driverId:    data.driverId    ?? 'N/A',
        driverName:  data.driverName  ?? 'Not Assigned',
        truckNumber: data.truckNumber ?? 'Not Available',
        truckImage:  data.truckImage  ?? null,
      });
    } catch (error) {
      Alert.alert('Info', error.response?.data?.message || 'No trip assigned yet');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => { setRefreshing(true); fetchTrip(); }, []);

  const getImageUrl = (p) => {
    if (!p) return null;
    if (p.startsWith('http')) return p;
    return `https://rightpolamright.com${p}`;
  };

  // ── Status helpers ──────────────────────────────────────────
  const statusUpper = (trip?.tripStatus ?? '').toUpperCase();
  const isPending    = statusUpper === 'PENDING' || statusUpper === '';
  const isAssigned   = statusUpper === 'ASSIGNED';
  const isInProgress = statusUpper === 'IN_PROGRESS' || statusUpper === 'IN PROGRESS';
  const isCompleted  = statusUpper === 'COMPLETED';
  const isCancelled  = statusUpper === 'CANCELLED';

  // ── Loading ─────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={S.center}>
        <ActivityIndicator size="large" color={C.primary} />
        <Text style={S.loadingText}>Checking trip status…</Text>
      </View>
    );
  }

  // ── PENDING — stay on this page, show waiting UI ─────────────
  if (!trip || isPending) {
    return (
      <SafeAreaView style={S.safe} edges={['top']}>
        <ScrollView
          contentContainerStyle={S.scroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.primary} />
          }
          showsVerticalScrollIndicator={false}
        >
          <Text style={S.pageTitle}>Trip Status</Text>

          {/* Pending card */}
          <View style={S.pendingCard}>
            <Text style={S.pendingEmoji}>⏳</Text>
            <Text style={S.pendingTitle}>Waiting for Driver</Text>
            <Text style={S.pendingSubtitle}>
              Your load request is submitted. We'll assign a driver shortly.
            </Text>

            {/* Status steps */}
            <View style={S.stepsContainer}>
              {[
                { label: 'Request Submitted', done: true },
                { label: 'Driver Assigned',   done: false },
                { label: 'Trip In Progress',  done: false },
                { label: 'Completed',         done: false },
              ].map((step, i) => (
                <View key={i} style={S.stepRow}>
                  <View style={[S.stepDot, step.done && S.stepDotDone]} />
                  {i < 3 && <View style={[S.stepLine, step.done && S.stepLineDone]} />}
                  <Text style={[S.stepLabel, step.done && S.stepLabelDone]}>
                    {step.label}
                  </Text>
                </View>
              ))}
            </View>

            <Text style={S.pullHint}>Pull down to refresh status</Text>
          </View>

          {/* Trip ID if available */}
          {trip?.tripId && trip.tripId !== 'N/A' && (
            <View style={S.card}>
              <Text style={S.cardTitle}>Reference</Text>
              <View style={S.row}>
                <Text style={S.rowLabel}>Trip ID</Text>
                <Text style={S.rowValue}>{trip.tripId}</Text>
              </View>
            </View>
          )}

          <View style={{ height: 32 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── ASSIGNED / IN PROGRESS / COMPLETED — show full details ──
  const stConf = getStatusConf(trip.tripStatus);

  return (
    <SafeAreaView style={S.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={S.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.primary} />
        }
        showsVerticalScrollIndicator={false}
      >
        <Text style={S.pageTitle}>Trip Details</Text>

        {/* STATUS BANNER */}
        <View style={[S.statusBanner, { backgroundColor: stConf.bg, borderColor: stConf.color + '30' }]}>
          <Text style={[S.statusBannerText, { color: stConf.color }]}>{stConf.msg}</Text>
        </View>

        {/* TRIP INFO */}
        <View style={S.card}>
          <Text style={S.cardTitle}>Trip Info</Text>
          <View style={S.row}>
            <Text style={S.rowLabel}>Trip ID</Text>
            <Text style={S.rowValue}>{trip.tripId}</Text>
          </View>
          <View style={S.row}>
            <Text style={S.rowLabel}>Status</Text>
            <View style={[S.badge, { backgroundColor: stConf.bg }]}>
              <Text style={[S.badgeText, { color: stConf.color }]}>{trip.tripStatus}</Text>
            </View>
          </View>
        </View>

        {/* DRIVER INFO */}
        <View style={S.card}>
          <Text style={S.cardTitle}>Driver Info</Text>
          <View style={S.driverRow}>
            <View style={S.driverAvatar}>
              <Text style={S.driverAvatarText}>
                {trip.driverName !== 'Not Assigned' ? trip.driverName[0] : '?'}
              </Text>
            </View>
            <View>
              <Text style={S.driverName}>{trip.driverName}</Text>
              <Text style={S.driverSub}>ID: {trip.driverId}</Text>
            </View>
          </View>
        </View>

        {/* TRUCK INFO */}
        <View style={S.card}>
          <Text style={S.cardTitle}>Truck Info</Text>
          <View style={S.row}>
            <Text style={S.rowLabel}>Truck Number</Text>
            <Text style={S.rowValue}>{trip.truckNumber}</Text>
          </View>
          {trip.truckImage ? (
            <Image
              source={{ uri: getImageUrl(trip.truckImage) }}
              style={S.truckImage}
              resizeMode="cover"
            />
          ) : (
            <Text style={S.noImageText}>No truck image available</Text>
          )}
        </View>

        {/* ✅ PAY BUTTON — ASSIGNED மட்டும் காட்டும் */}
        {isAssigned && (
          <TouchableOpacity
            style={S.payBtn}
            onPress={() => navigation.navigate('Payment', { tripId: trip.tripId })}
          >
            <Text style={S.payBtnText}>💳  Pay Now</Text>
          </TouchableOpacity>
        )}

        {/* In Progress — track button */}
        {isInProgress && (
          <TouchableOpacity
            style={[S.payBtn, { backgroundColor: '#8B5CF6' }]}
            onPress={() => navigation.navigate('TrackTrip', { tripId: trip.tripId })}
          >
            <Text style={S.payBtnText}>📍  Track Live Location</Text>
          </TouchableOpacity>
        )}

        {/* Completed — done message */}
        {isCompleted && (
          <View style={[S.statusBanner, { backgroundColor: '#F0FDF4', borderColor: '#22C55E30' }]}>
            <Text style={[S.statusBannerText, { color: '#22C55E' }]}>
              ✅ Trip completed! Thank you for using our service.
            </Text>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TripStatusScreen;

const S = StyleSheet.create({
  safe:  { flex: 1, backgroundColor: '#F8F8F8' },
  scroll: { padding: 16 },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F8F8' },
  loadingText: { marginTop: 12, fontSize: 14, color: '#666' },

  pageTitle: { fontSize: 26, fontWeight: '800', color: '#111111', marginBottom: 16 },

  // ── Pending UI ──
  pendingCard: {
    backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24,
    alignItems: 'center', marginBottom: 16,
    borderWidth: 1, borderColor: '#EEEEEE',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 12, elevation: 4,
  },
  pendingEmoji: { fontSize: 56, marginBottom: 12 },
  pendingTitle: { fontSize: 20, fontWeight: '800', color: '#111', marginBottom: 8 },
  pendingSubtitle: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 20, marginBottom: 24 },

  stepsContainer: { width: '100%', marginBottom: 20 },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  stepDot: {
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: '#E5E7EB', marginRight: 12,
  },
  stepDotDone: { backgroundColor: '#FF6A00' },
  stepLine: {
    position: 'absolute', left: 6, top: 14,
    width: 2, height: 18, backgroundColor: '#E5E7EB',
  },
  stepLineDone: { backgroundColor: '#FF6A00' },
  stepLabel: { fontSize: 14, color: '#999' },
  stepLabelDone: { color: '#111', fontWeight: '600' },
  pullHint: { fontSize: 12, color: '#AAA', marginTop: 4 },

  // ── Status Banner ──
  statusBanner: {
    borderRadius: 12, padding: 14, marginBottom: 16, borderWidth: 1,
  },
  statusBannerText: { fontSize: 14, fontWeight: '600', textAlign: 'center' },

  // ── Card ──
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 12,
    borderWidth: 1, borderColor: '#EEEEEE',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, shadowRadius: 12, elevation: 3,
  },
  cardTitle: {
    fontSize: 14, fontWeight: '700', color: '#666666',
    marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.8,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  rowLabel: { fontSize: 14, color: '#666666' },
  rowValue: { fontSize: 15, fontWeight: '600', color: '#111111' },

  badge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  badgeText: { fontSize: 12, fontWeight: '700' },

  driverRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  driverAvatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: '#FF6A00', alignItems: 'center', justifyContent: 'center',
  },
  driverAvatarText: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  driverName: { fontSize: 16, fontWeight: '700', color: '#111111' },
  driverSub: { fontSize: 13, color: '#666666', marginTop: 2 },

  truckImage: { width: '100%', height: 180, borderRadius: 12, marginTop: 14 },
  noImageText: { fontSize: 13, color: '#999', textAlign: 'center', marginTop: 12 },

  payBtn: {
    backgroundColor: '#FF6A00', borderRadius: 16, paddingVertical: 18,
    alignItems: 'center', marginTop: 8,
    shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 10, elevation: 6,
  },
  payBtnText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
});