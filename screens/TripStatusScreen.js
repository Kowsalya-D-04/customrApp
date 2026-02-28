
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


import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { customerAPI } from '../services/api';

const TripStatusScreen = ({ route, navigation }) => {
  const { loadRequestId } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    if (!loadRequestId) {
      Alert.alert('Error', 'Load Request ID missing');
      setLoading(false);
      return;
    }
    fetchTrip();
  }, [loadRequestId]);

  const fetchTrip = async () => {
    try {
      console.log('Fetching trip for loadRequestId:', loadRequestId);
      const response = await customerAPI.getTripDetails(loadRequestId);
      console.log('Raw API response:', response.data);

      // Normalize response
      let tripData = response.data.data || response.data;

      // Case: backend wraps trip inside 'trip'
      if (tripData.trip) tripData = tripData.trip;

      // Case: backend returns only root-level tripId after payment
      if (!tripData.tripId && response.data.tripId) {
        tripData.tripId = response.data.tripId;
      }

      // Case: backend uses 'id' instead of tripId
      if (!tripData.tripId && tripData.id) {
        tripData.tripId = tripData.id;
      }

      console.log('Normalized tripData:', tripData);

      if (!tripData || !tripData.tripId) {
        // tripId missing → still set tripData so button can hide
        setTrip(tripData || { tripId: null });
      } else {
        setTrip(tripData);
      }
    } catch (error) {
      console.error('Trip fetch error:', error);
      Alert.alert('Error', 'Failed to load trip details');
      setTrip({ tripId: null });
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `http://192.168.1.11:8080/uploads/${path.split('/').pop()}`;
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text>Checking trip status...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Details</Text>

      <Text style={styles.label}>Driver Name</Text>
      <Text style={styles.value}>{trip.driverName || '-'}</Text>

      <Text style={styles.label}>Phone</Text>
      <Text style={styles.value}>{trip.driverPhoneNumber || '-'}</Text>

      <Text style={styles.label}>Truck Number</Text>
      <Text style={styles.value}>{trip.truckNumber || '-'}</Text>

      {trip.truckImagePath && (
        <Image
          source={{ uri: getImageUrl(trip.truckImagePath) }}
          style={styles.truckImage}
          resizeMode="contain"
        />
      )}

      {/* ---------------- PAY NOW BUTTON ---------------- */}
      {trip.tripId ? (
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {
            console.log('Navigating to PaymentScreen with tripId:', trip.tripId);
            navigation.navigate('Payment', { tripId: trip.tripId });
          }}
        >
          <Text style={styles.payText}>Pay Now</Text>
        </TouchableOpacity>
      ) : (
        <Text style={[styles.infoText, { marginTop: 20 }]}>
          Payment not available yet 🚚
        </Text>
      )}
    </View>
  );
};

export default TripStatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f5f8',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#2E7D32',
    textAlign: 'center',
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
    color: '#333',
  },
  truckImage: {
    width: '100%',
    height: 220,
    marginTop: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  infoText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  payButton: {
    marginTop: 30,
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  payText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
