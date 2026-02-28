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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { customerAPI } from '../services/api';

const MyLoadRequestsScreen = ({ navigation }) => {
  const [loadRequests, setLoadRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLoadRequests();
  }, []);

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
      setLoadRequests(response.data.loadRequests || []);
    } catch (error) {
      console.error('Error fetching load requests:', error);
      Alert.alert('Error', 'Failed to load your requests');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchLoadRequests();
  };

 // ✅ CORRECT NAVIGATION
const handleLoadRequestPress = (loadRequestId) => {
  if (!loadRequestId) {
    Alert.alert('Error', 'Load Request ID missing');
    return;
  }

  console.log('Sending loadRequestId:', loadRequestId);

  navigation.navigate('TripStatus', {
    loadRequestId,
  });
};



  // ---------------- HELPERS ----------------

  const getStatusColor = (status) => {
    switch ((status || 'pending').toLowerCase()) {
      case 'pending': return '#f39c12';
      case 'assigned': return '#04751d7a';
      case 'in progress': return '#9b59b6';
      case 'completed': return '#2ecc71';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusIcon = (status) => {
    switch ((status || 'pending').toLowerCase()) {
      case 'pending': return 'hourglass-empty';
      case 'assigned': return 'check-circle';
      case 'in progress': return 'directions-car';
      case 'completed': return 'done-all';
      case 'cancelled': return 'cancel';
      default: return 'help';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getTruckImageUrl = (path) => {
    if (!path) return null;
    let cleanedPath = path.replace(/\\/g, '/').replace(/^C:/, '');
    return `http://192.168.1.11:8080${cleanedPath}`;
  };

  // ---------------- UI ----------------

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="local-shipping" size={80} color="#bdc3c7" />
      <Text style={styles.emptyTitle}>No Load Requests</Text>
      <Text style={styles.emptyText}>
        You haven't created any load requests yet.
      </Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateLoadRequest')}
      >
        <Icon name="add" size={20} color="white" />
        <Text style={styles.createButtonText}>Create Load Request</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLoadRequestCard = (request, index) => {
    console.log('Request row:', request); // DEBUG

    return (
   <TouchableOpacity
  key={request.id}
  style={styles.requestCard}
  onPress={() => handleLoadRequestPress(request.loadRequestId)}
>



        <View style={styles.cardHeader}>
          <Text style={styles.requestId}>{request.loadRequestId}</Text>


          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(request.status) },
            ]}
          >
            <Icon
              name={getStatusIcon(request.status)}
              size={14}
              color="white"
            />
            <Text style={styles.statusText}>
              {request.status || 'Pending'}
            </Text>
          </View>
        </View>

        <View style={styles.detail}>
          <Text style={styles.label}>From</Text>
          <Text style={styles.value}>{request.pickupLocation}</Text>

          <Text style={styles.label}>To</Text>
          <Text style={styles.value}>{request.dropLocation}</Text>

          <Text style={styles.label}>Load</Text>
          <Text style={styles.value}>
            {request.loadType} • {request.weight} kg
          </Text>

          <Text style={styles.label}>Created</Text>
          <Text style={styles.value}>
            {formatDate(request.createdAt)}
          </Text>

          {request.truckImagePath && (
            <Image
              source={{ uri: getTruckImageUrl(request.truckImagePath) }}
              style={styles.truckImage}
              resizeMode="cover"
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading your requests…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Load Requests</Text>
        <Text style={styles.headerSubtitle}>
          {loadRequests.length} request
          {loadRequests.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loadRequests.length === 0
          ? renderEmptyState()
          : loadRequests.map(renderLoadRequestCard)}
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('CreateLoadRequest')}
      >
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

// ---------------- STYLES ----------------

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold' },
  headerSubtitle: { color: '#777', marginTop: 4 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#777' },
  emptyContainer: { alignItems: 'center', padding: 40 },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 15 },
  emptyText: { color: '#777', textAlign: 'center', marginVertical: 10 },
  createButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: { color: 'white', marginLeft: 8, fontWeight: '600' },
  requestCard: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 12,
    padding: 16,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  requestId: { fontSize: 16, fontWeight: 'bold' },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: { color: 'white', marginLeft: 5, fontSize: 12 },
  detail: { marginTop: 5 },
  label: { fontSize: 12, color: '#888', marginTop: 6 },
  value: { fontSize: 15, fontWeight: '600' },
  truckImage: {
    width: '100%',
    height: 150,
    marginTop: 10,
    borderRadius: 12,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#3498db',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
});

export default MyLoadRequestsScreen;
