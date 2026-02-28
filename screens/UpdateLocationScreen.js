import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { locationAPI } from '../services/api';

const UpdateLocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapRegion, setMapRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setMapRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const updateLocation = async () => {
    if (!location) {
      Alert.alert('Error', 'Location not available');
      return;
    }

    setLoading(true);
    try {
      const locationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
        timestamp: new Date().toISOString(),
      };

      await locationAPI.updateLiveLocation(locationData);
      Alert.alert('Success', 'Location updated successfully');
    } catch (error) {
      console.error('Update location error:', error);
      Alert.alert('Error', 'Failed to update location');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(currentLocation);
      setMapRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to get current location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Update Live Location</Text>
        <Text style={styles.subtitle}>Share your current location with the system</Text>
      </View>

      {errorMsg ? (
        <View style={styles.errorContainer}>
          <Icon name="error" size={40} color="#e74c3c" />
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      ) : mapRegion ? (
        <View style={styles.mapContainer}>
          <MapView style={styles.map} region={mapRegion}>
            {location && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Your Location"
                description="Current position"
              >
                <Icon name="location-on" size={40} color="#e74c3c" />
              </Marker>
            )}
          </MapView>

          {location && (
            <View style={styles.locationInfo}>
              <View style={styles.infoRow}>
                <Icon name="my-location" size={20} color="#3498db" />
                <Text style={styles.infoText}>
                  Latitude: {location.coords.latitude.toFixed(6)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="my-location" size={20} color="#3498db" />
                <Text style={styles.infoText}>
                  Longitude: {location.coords.longitude.toFixed(6)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="precision-manufacturing" size={20} color="#3498db" />
                <Text style={styles.infoText}>
                  Accuracy: {location.coords.accuracy.toFixed(2)} meters
                </Text>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Getting your location...</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.refreshButton]}
          onPress={getCurrentLocation}
          disabled={loading}
        >
          <Icon name="refresh" size={24} color="white" />
          <Text style={styles.buttonText}>Refresh Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.updateButton, (!location || loading) && styles.buttonDisabled]}
          onPress={updateLocation}
          disabled={!location || loading}
        >
          <Icon name="cloud-upload" size={24} color="white" />
          <Text style={styles.buttonText}>
            {loading ? 'Updating...' : 'Update Location'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Your location is used for trip tracking and assignment
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#bdc3c7',
    fontSize: 14,
    marginTop: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  locationInfo: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#2c3e50',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  refreshButton: {
    backgroundColor: '#3498db',
  },
  updateButton: {
    backgroundColor: '#2ecc71',
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  footer: {
    padding: 15,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
  },
  footerText: {
    color: '#7f8c8d',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default UpdateLocationScreen;