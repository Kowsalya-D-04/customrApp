// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ImagePicker from 'expo-image-picker';
// import { useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { customerAPI } from '../services/api';

// const CreateLoadRequestScreen = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     customerName: '',
//     customerPhone: '',
//     pickupLocation: '',
//     dropLocation: '',
//     loadType: 'Vegetables',
//     weight: '',
//   });
//   const [imageUri, setImageUri] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const loadTypes = [
//     'Vegetables','Fruits','Electronics','Furniture','Chemicals',
//     'Machinery','Textiles','Cement','Steel','Food Grains','Others'
//   ];

//   const handleInputChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   /* ---------------- IMAGE PICKER ---------------- */
// const pickImage = async () => {
//   try {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (!permission.granted) {
//       Alert.alert(
//         'Permission required',
//         'Please allow gallery access from settings'
//       );
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ FIX
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.7,
//     });

//     console.log('Gallery result:', result);

//     if (!result.canceled && result.assets?.length > 0) {
//       setImageUri(result.assets[0].uri);
//     }
//   } catch (error) {
//     console.error('Gallery error:', error);
//     Alert.alert('Error', 'Unable to open gallery');
//   }
// };


//   const takePhoto = async () => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert('Permission required', 'Camera access is needed');
//       return;
//     }
//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.7,
//     });
//     if (!result.canceled) setImageUri(result.assets[0].uri);
//   };

//   /* ---------------- SUBMIT ---------------- */
//   const handleSubmit = async () => {
//     const { customerName, customerPhone, pickupLocation, dropLocation, loadType, weight } = formData;

//     if (!customerName || !customerPhone || !pickupLocation || !dropLocation || !weight) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }
//     if (customerPhone.length !== 10) {
//       Alert.alert('Error', 'Enter valid 10 digit phone number');
//       return;
//     }

//     const weightNum = parseInt(weight);
//     if (isNaN(weightNum) || weightNum <= 0) {
//       Alert.alert('Error', 'Enter valid weight');
//       return;
//     }
//     if (weightNum > 50000) {
//       Alert.alert('Error', 'Max weight is 50,000 kg');
//       return;
//     }

//     setLoading(true);

//     try {
//       const customerId = await AsyncStorage.getItem('customerId');
//       if (!customerId) {
//         Alert.alert('Session Expired', 'Please login again');
//         navigation.replace('Login');
//         return;
//       }

//       const data = new FormData();
//       data.append('customerName', customerName.trim());
//       data.append('phoneNumber', customerPhone.trim()); // ✅ match backend
//       data.append('pickupLocation', pickupLocation.trim());
//       data.append('dropLocation', dropLocation.trim());
//       data.append('loadType', loadType);
//       data.append('weight', weightNum.toString());

//       if (imageUri) {
//         data.append('loadImage', {
//           uri: imageUri,
//           name: 'load.jpg',
//           type: 'image/jpeg',
//         });
//       }

//       const response = await customerAPI.createLoadRequest(customerId, data);

//       if (response.status === 200 || response.status === 201) {
//         Alert.alert('Success', 'Load request created successfully', [
//           { text: 'OK', onPress: () => navigation.navigate('MyLoadRequests') },
//         ]);
//       }
//     } catch (error) {
//       console.error('Create load error:', error);
//       Alert.alert('Error', 'Failed to create load request');
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>New Load Request</Text>
//         <Text style={styles.subtitle}>Enter transportation details</Text>
//       </View>

//       <View style={styles.form}>
//         <Text style={styles.label}>Customer Name *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter customer name"
//           value={formData.customerName}
//           onChangeText={(t) => handleInputChange('customerName', t)}
//         />

//         <Text style={styles.label}>Customer Phone *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter phone number"
//           keyboardType="phone-pad"
//           maxLength={10}
//           value={formData.customerPhone}
//           onChangeText={(t) => handleInputChange('customerPhone', t)}
//         />

//         <Text style={styles.label}>Pickup Location *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Pickup location"
//           value={formData.pickupLocation}
//           onChangeText={(t) => handleInputChange('pickupLocation', t)}
//         />

//         <Text style={styles.label}>Drop Location *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Drop location"
//           value={formData.dropLocation}
//           onChangeText={(t) => handleInputChange('dropLocation', t)}
//         />

//         <Text style={styles.label}>Load Type *</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {loadTypes.map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[styles.loadTypeButton, formData.loadType === type && styles.selected]}
//               onPress={() => handleInputChange('loadType', type)}
//             >
//               <Text style={[styles.loadTypeText, formData.loadType === type && styles.selectedText]}>
//                 {type}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         <Text style={styles.label}>Weight (kg) *</Text>
//         <TextInput
//           style={styles.input}
//           keyboardType="numeric"
//           placeholder="Enter weight"
//           value={formData.weight}
//           onChangeText={(t) => handleInputChange('weight', t)}
//         />

//         <Text style={styles.label}>Load Image (Optional)</Text>
//         {imageUri ? (
//           <View>
//             <Image source={{ uri: imageUri }} style={styles.image} />
//             <TouchableOpacity style={styles.removeBtn} onPress={() => setImageUri(null)}>
//               <Text style={{ color: 'white' }}>Remove</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View style={styles.imageRow}>
//             <TouchableOpacity style={styles.imageBtn} onPress={takePhoto}>
//               <Icon name="camera-alt" size={22} color="white" />
//               <Text style={styles.imageBtnText}>Camera</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
//               <Icon name="photo" size={22} color="white" />
//               <Text style={styles.imageBtnText}>Gallery</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         <View style={styles.estimate}>
//           <Text>Estimated Cost</Text>
//           <Text style={styles.cost}>{formData.weight ? `₹${parseInt(formData.weight) * 5}` : '--'}</Text>
//         </View>

//         <TouchableOpacity style={styles.submit} onPress={handleSubmit} disabled={loading}>
//           {loading ? <ActivityIndicator color="white" /> : <Text style={styles.submitText}>CREATE LOAD REQUEST</Text>}
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// /* ---------------- STYLES ---------------- */
// // Keep your existing styles here...


// /* ---------------- STYLES ---------------- */

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f8f9fa' },
//   header: { padding: 20, backgroundColor: 'white' },
//   title: { fontSize: 24, fontWeight: 'bold' },
//   subtitle: { color: '#777' },
//   form: { padding: 20 },
//   label: { marginTop: 15, fontWeight: '600' },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     marginTop: 6,
//     backgroundColor: 'white',
//   },
//   loadTypeButton: {
//     padding: 10,
//     borderRadius: 20,
//     backgroundColor: '#eee',
//     marginRight: 10,
//     marginTop: 8,
//   },
//   selected: { backgroundColor: '#3498db' },
//   loadTypeText: { color: '#555' },
//   selectedText: { color: 'white', fontWeight: '600' },
//   imageRow: { flexDirection: 'row', marginTop: 10 },
//   imageBtn: {
//     flex: 1,
//     backgroundColor: '#3498db',
//     padding: 12,
//     margin: 5,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   imageBtnText: { color: 'white', marginTop: 4 },
//   image: { width: '100%', height: 200, borderRadius: 10, marginTop: 10 },
//   removeBtn: {
//     backgroundColor: '#e74c3c',
//     padding: 8,
//     alignItems: 'center',
//     borderRadius: 6,
//     marginTop: 6,
//   },
//   estimate: { alignItems: 'center', marginVertical: 20 },
//   cost: { fontSize: 28, fontWeight: 'bold' },
//   submit: {
//     backgroundColor: '#3498db',
//     padding: 16,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   submitText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
// });

// export default CreateLoadRequestScreen;


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ImagePicker from 'expo-image-picker';
// import { useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { customerAPI } from '../services/api';

// const CreateLoadRequestScreen = ({ navigation }) => {
//   /* ---------------- RATES ---------------- */
//   const RATE_PER_KM = 10;   // ₹10 per km
//   const RATE_PER_KG = 5;    // ₹5 per kg
//   const EXTRA_CHARGES = 50; // flat extra charge

//   const [formData, setFormData] = useState({
//     customerName: '',
//     customerPhone: '',
//     pickupLocation: '',
//     dropLocation: '',
//     loadType: 'Vegetables',
//     weight: '',
//     distance: '', // new field
//   });
//   const [imageUri, setImageUri] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const loadTypes = [
//     'Vegetables','Fruits','Electronics','Furniture','Chemicals',
//     'Machinery','Textiles','Cement','Steel','Food Grains','Others'
//   ];

//   const handleInputChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   /* ---------------- IMAGE PICKER ---------------- */
//   const pickImage = async () => {
//     try {
//       const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (!permission.granted) {
//         Alert.alert('Permission required', 'Please allow gallery access from settings');
//         return;
//       }
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.7,
//       });
//       if (!result.canceled && result.assets?.length > 0) setImageUri(result.assets[0].uri);
//     } catch (error) {
//       console.error('Gallery error:', error);
//       Alert.alert('Error', 'Unable to open gallery');
//     }
//   };

//   const takePhoto = async () => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert('Permission required', 'Camera access is needed');
//       return;
//     }
//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.7,
//     });
//     if (!result.canceled) setImageUri(result.assets[0].uri);
//   };

//   /* ---------------- SUBMIT ---------------- */
//   const handleSubmit = async () => {
//     const { customerName, customerPhone, pickupLocation, dropLocation, loadType, weight, distance } = formData;

//     if (!customerName || !customerPhone || !pickupLocation || !dropLocation || !weight || !distance) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }
//     if (customerPhone.length !== 10) {
//       Alert.alert('Error', 'Enter valid 10 digit phone number');
//       return;
//     }

//     const weightNum = parseInt(weight);
//     const distanceNum = parseFloat(distance);
//     if (isNaN(weightNum) || weightNum <= 0) {
//       Alert.alert('Error', 'Enter valid weight');
//       return;
//     }
//     if (weightNum > 50000) {
//       Alert.alert('Error', 'Max weight is 50,000 kg');
//       return;
//     }
//     if (isNaN(distanceNum) || distanceNum <= 0) {
//       Alert.alert('Error', 'Enter valid distance in km');
//       return;
//     }

//     setLoading(true);

//     try {
//       const customerId = await AsyncStorage.getItem('customerId');
//       if (!customerId) {
//         Alert.alert('Session Expired', 'Please login again');
//         navigation.replace('Login');
//         return;
//       }

//       const data = new FormData();
//       data.append('customerName', customerName.trim());
//       data.append('phoneNumber', customerPhone.trim());
//       data.append('pickupLocation', pickupLocation.trim());
//       data.append('dropLocation', dropLocation.trim());
//       data.append('loadType', loadType);
//       data.append('weight', weightNum.toString());
//       data.append('distance', distanceNum.toString());

//       if (imageUri) {
//         data.append('loadImage', {
//           uri: imageUri,
//           name: 'load.jpg',
//           type: 'image/jpeg',
//         });
//       }

//       const response = await customerAPI.createLoadRequest(customerId, data);

//       if (response.status === 200 || response.status === 201) {
//         Alert.alert('Success', 'Load request created successfully', [
//           { text: 'OK', onPress: () => navigation.navigate('MyLoadRequests') },
//         ]);
//       }
//     } catch (error) {
//       console.error('Create load error:', error);
//       Alert.alert('Error', 'Failed to create load request');
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- ESTIMATE ---------------- */
//   const getEstimatedCost = () => {
//     const weightNum = parseFloat(formData.weight) || 0;
//     const distanceNum = parseFloat(formData.distance) || 0;
//     const total = (distanceNum * RATE_PER_KM) + (weightNum * RATE_PER_KG) + EXTRA_CHARGES;
//     return total > 0 ? `₹${total}` : '--';
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>New Load Request</Text>
//         <Text style={styles.subtitle}>Enter transportation details</Text>
//       </View>

//       <View style={styles.form}>
//         <Text style={styles.label}>Customer Name *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter customer name"
//           value={formData.customerName}
//           onChangeText={(t) => handleInputChange('customerName', t)}
//         />

//         <Text style={styles.label}>Customer Phone *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter phone number"
//           keyboardType="phone-pad"
//           maxLength={10}
//           value={formData.customerPhone}
//           onChangeText={(t) => handleInputChange('customerPhone', t)}
//         />

//         <Text style={styles.label}>Pickup Location *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Pickup location"
//           value={formData.pickupLocation}
//           onChangeText={(t) => handleInputChange('pickupLocation', t)}
//         />

//         <Text style={styles.label}>Drop Location *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Drop location"
//           value={formData.dropLocation}
//           onChangeText={(t) => handleInputChange('dropLocation', t)}
//         />

//         <Text style={styles.label}>Distance (km) *</Text>
//         <TextInput
//           style={styles.input}
//           keyboardType="numeric"
//           placeholder="Enter distance"
//           value={formData.distance}
//           onChangeText={(t) => handleInputChange('distance', t)}
//         />

//         <Text style={styles.label}>Load Type *</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {loadTypes.map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[styles.loadTypeButton, formData.loadType === type && styles.selected]}
//               onPress={() => handleInputChange('loadType', type)}
//             >
//               <Text style={[styles.loadTypeText, formData.loadType === type && styles.selectedText]}>
//                 {type}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         <Text style={styles.label}>Weight (kg) *</Text>
//         <TextInput
//           style={styles.input}
//           keyboardType="numeric"
//           placeholder="Enter weight"
//           value={formData.weight}
//           onChangeText={(t) => handleInputChange('weight', t)}
//         />

//         <Text style={styles.label}>Load Image (Optional)</Text>
//         {imageUri ? (
//           <View>
//             <Image source={{ uri: imageUri }} style={styles.image} />
//             <TouchableOpacity style={styles.removeBtn} onPress={() => setImageUri(null)}>
//               <Text style={{ color: 'white' }}>Remove</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View style={styles.imageRow}>
//             <TouchableOpacity style={styles.imageBtn} onPress={takePhoto}>
//               <Icon name="camera-alt" size={22} color="white" />
//               <Text style={styles.imageBtnText}>Camera</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
//               <Icon name="photo" size={22} color="white" />
//               <Text style={styles.imageBtnText}>Gallery</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* ---------------- ESTIMATE ---------------- */}
//         <View style={styles.estimate}>
//           <Text>Estimated Cost</Text>
//           <Text style={styles.cost}>{getEstimatedCost()}</Text>
//         </View>

//         <TouchableOpacity style={styles.submit} onPress={handleSubmit} disabled={loading}>
//           {loading ? <ActivityIndicator color="white" /> : <Text style={styles.submitText}>CREATE LOAD REQUEST</Text>}
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// /* ---------------- STYLES ---------------- */
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f8f9fa' },
//   header: { padding: 20, backgroundColor: 'white' },
//   title: { fontSize: 24, fontWeight: 'bold' },
//   subtitle: { color: '#777' },
//   form: { padding: 20 },
//   label: { marginTop: 15, fontWeight: '600' },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     marginTop: 6,
//     backgroundColor: 'white',
//   },
//   loadTypeButton: {
//     padding: 10,
//     borderRadius: 20,
//     backgroundColor: '#eee',
//     marginRight: 10,
//     marginTop: 8,
//   },
//   selected: { backgroundColor: '#3498db' },
//   loadTypeText: { color: '#555' },
//   selectedText: { color: 'white', fontWeight: '600' },
//   imageRow: { flexDirection: 'row', marginTop: 10 },
//   imageBtn: {
//     flex: 1,
//     backgroundColor: '#3498db',
//     padding: 12,
//     margin: 5,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   imageBtnText: { color: 'white', marginTop: 4 },
//   image: { width: '100%', height: 200, borderRadius: 10, marginTop: 10 },
//   removeBtn: {
//     backgroundColor: '#e74c3c',
//     padding: 8,
//     alignItems: 'center',
//     borderRadius: 6,
//     marginTop: 6,
//   },
//   estimate: { alignItems: 'center', marginVertical: 20 },
//   cost: { fontSize: 28, fontWeight: 'bold' },
//   submit: {
//     backgroundColor: '#3498db',
//     padding: 16,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   submitText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
// });

// export default CreateLoadRequestScreen;

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { customerAPI } from '../services/api';

// ✅ Replace with your Google API Key with Places API enabled
const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';

// Haversine formula to calculate distance (in km)
const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const CreateLoadRequestScreen = ({ navigation }) => {
  const RATE_PER_KM = 10;
  const RATE_PER_KG = 5;
  const EXTRA_CHARGES = 50;

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    pickupLocation: '',
    dropLocation: '',
    pickupLat: null,
    pickupLng: null,
    dropLat: null,
    dropLng: null,
    loadType: 'Vegetables',
    weight: '',
    distance: '',
  });

  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadTypes = [
    'Vegetables','Fruits','Electronics','Furniture','Chemicals',
    'Machinery','Textiles','Cement','Steel','Food Grains','Others'
  ];

const handleInputChange = (field, value) => {
  setFormData((prev) => {
    const updated = { ...prev, [field]: value };

    if (
      updated.pickupLat &&
      updated.pickupLng &&
      updated.dropLat &&
      updated.dropLng
    ) {
      const dist = getDistanceInKm(
        updated.pickupLat,
        updated.pickupLng,
        updated.dropLat,
        updated.dropLng
      );

      updated.distance = dist.toFixed(2);
    }

    return updated;
  });
};


  /* ---------------- IMAGE PICKER ---------------- */
  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission required', 'Please allow gallery access from settings');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });
      if (!result.canceled && result.assets?.length > 0) setImageUri(result.assets[0].uri);
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Error', 'Unable to open gallery');
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Camera access is needed');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    const { customerName, customerPhone, pickupLocation, dropLocation, weight, distance } = formData;

    if (!customerName || !customerPhone || !pickupLocation || !dropLocation || !weight || !distance) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    if (customerPhone.length !== 10) {
      Alert.alert('Error', 'Enter valid 10 digit phone number');
      return;
    }

    const weightNum = parseInt(weight);
    const distanceNum = parseFloat(distance);
    if (isNaN(weightNum) || weightNum <= 0) {
      Alert.alert('Error', 'Enter valid weight');
      return;
    }
    if (weightNum > 50000) {
      Alert.alert('Error', 'Max weight is 50,000 kg');
      return;
    }

    setLoading(true);
    try {
      const customerId = await AsyncStorage.getItem('customerId');
      if (!customerId) {
        Alert.alert('Session Expired', 'Please login again');
        navigation.replace('Login');
        return;
      }

      const data = new FormData();
      data.append('customerName', customerName.trim());
      data.append('phoneNumber', customerPhone.trim());
      data.append('pickupLocation', formData.pickupLocation);
      data.append('dropLocation', formData.dropLocation);
      data.append('pickupLat', formData.pickupLat);
      data.append('pickupLng', formData.pickupLng);
      data.append('dropLat', formData.dropLat);
      data.append('dropLng', formData.dropLng);
      data.append('loadType', formData.loadType);
      data.append('weight', weightNum.toString());
      data.append('distance', distanceNum.toString());

      if (imageUri) {
        data.append('loadImage', {
          uri: imageUri,
          name: 'load.jpg',
          type: 'image/jpeg',
        });
      }

      const response = await customerAPI.createLoadRequest(customerId, data);
      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Load request created successfully', [
          { text: 'OK', onPress: () => navigation.navigate('MyLoadRequests') },
        ]);
      }
    } catch (error) {
      console.error('Create load error:', error);
      Alert.alert('Error', 'Failed to create load request');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- ESTIMATE ---------------- */
  const getEstimatedCost = () => {
    const weightNum = parseFloat(formData.weight) || 0;
    const distanceNum = parseFloat(formData.distance) || 0;
    const total = distanceNum * RATE_PER_KM + weightNum * RATE_PER_KG + EXTRA_CHARGES;
    return total > 0 ? `₹${total}` : '--';
  };

  /* ---------------- UI ---------------- */
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New Load Request</Text>
        <Text style={styles.subtitle}>Enter transportation details</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Customer Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter customer name"
          value={formData.customerName}
          onChangeText={(t) => handleInputChange('customerName', t)}
        />

        <Text style={styles.label}>Customer Phone *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          maxLength={10}
          value={formData.customerPhone}
          onChangeText={(t) => handleInputChange('customerPhone', t)}
        />

        <Text style={styles.label}>Pickup Location *</Text>
        <GooglePlacesAutocomplete
          placeholder="Enter pickup location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            handleInputChange('pickupLocation', details.formatted_address);
            handleInputChange('pickupLat', details.geometry.location.lat);
            handleInputChange('pickupLng', details.geometry.location.lng);
          }}
          query={{ key: GOOGLE_API_KEY, language: 'en' }}
          styles={{ textInput: styles.input, container: { flex: 0, marginTop: 6 } }}
        />

        <Text style={styles.label}>Drop Location *</Text>
        <GooglePlacesAutocomplete
          placeholder="Enter drop location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            handleInputChange('dropLocation', details.formatted_address);
            handleInputChange('dropLat', details.geometry.location.lat);
            handleInputChange('dropLng', details.geometry.location.lng);
          }}
          query={{ key: GOOGLE_API_KEY, language: 'en' }}
          styles={{ textInput: styles.input, container: { flex: 0, marginTop: 6 } }}
        />

        <Text style={styles.label}>Load Type *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {loadTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.loadTypeButton, formData.loadType === type && styles.selected]}
              onPress={() => handleInputChange('loadType', type)}
            >
              <Text style={[styles.loadTypeText, formData.loadType === type && styles.selectedText]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Weight (kg) *</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter weight"
          value={formData.weight}
          onChangeText={(t) => handleInputChange('weight', t)}
        />

        <Text style={styles.label}>Load Image (Optional)</Text>
        {imageUri ? (
          <View>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <TouchableOpacity style={styles.removeBtn} onPress={() => setImageUri(null)}>
              <Text style={{ color: 'white' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imageRow}>
            <TouchableOpacity style={styles.imageBtn} onPress={takePhoto}>
              <Icon name="camera-alt" size={22} color="white" />
              <Text style={styles.imageBtnText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
              <Icon name="photo" size={22} color="white" />
              <Text style={styles.imageBtnText}>Gallery</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.estimate}>
          <Text>Estimated Cost</Text>
          <Text style={styles.cost}>{getEstimatedCost()}</Text>
        </View>

        <TouchableOpacity style={styles.submit} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.submitText}>CREATE LOAD REQUEST</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 20, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#777' },
  form: { padding: 20 },
  label: { marginTop: 15, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
    backgroundColor: 'white',
  },
  loadTypeButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 10,
    marginTop: 8,
  },
  selected: { backgroundColor: '#3498db' },
  loadTypeText: { color: '#555' },
  selectedText: { color: 'white', fontWeight: '600' },
  imageRow: { flexDirection: 'row', marginTop: 10 },
  imageBtn: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 12,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  imageBtnText: { color: 'white', marginTop: 4 },
  image: { width: '100%', height: 200, borderRadius: 10, marginTop: 10 },
  removeBtn: {
    backgroundColor: '#e74c3c',
    padding: 8,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 6,
  },
  estimate: { alignItems: 'center', marginVertical: 20 },
  cost: { fontSize: 28, fontWeight: 'bold' },
  submit: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default CreateLoadRequestScreen;
