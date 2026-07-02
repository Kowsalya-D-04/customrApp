// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
// import { useEffect, useRef, useState } from 'react';

// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// import MapLibreGL from '@maplibre/maplibre-react-native';
// import RNPickerSelect from "react-native-picker-select";
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { customerAPI } from '../services/api';

// /* DISTANCE */
// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371;
//   const dLat = (lat2 - lat1) * Math.PI / 180;
//   const dLon = (lon2 - lon1) * Math.PI / 180;

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(lat1 * Math.PI / 180) *
//     Math.cos(lat2 * Math.PI / 180) *
//     Math.sin(dLon / 2) ** 2;

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return (R * c).toFixed(2);
// };

// /* PRICE */
// const getWeightFlatCharge = (weight) => {
//   if (weight <= 500) return 200;
//   if (weight <= 1000) return 400;
//   if (weight <= 1500) return 600;
//   return 800;
// };

// const CreateLoadRequestScreen = ({ navigation }) => {

//   const searchTimeout = useRef(null);
//   const mapRef = useRef(null); // ✅ added

//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState(null);

//   const [pickupSearch, setPickupSearch] = useState("");
//   const [dropSearch, setDropSearch] = useState("");

//   const [pickupSuggestions, setPickupSuggestions] = useState([]);
//   const [dropSuggestions, setDropSuggestions] = useState([]);

//   const [pickupCoords, setPickupCoords] = useState({
//     latitude: 13.0827,
//     longitude: 80.2707
//   });

//   const [dropCoords, setDropCoords] = useState({
//     latitude: 12.9716,
//     longitude: 77.5946
//   });

//   const [formData, setFormData] = useState({
//     customerName: "",
//     phoneNumber: "",
//     alternativePhone: "",
//     pickupLocation: "",
//     dropLocation: "",
//     loadType: "Furniture",
//     weight: "",
//     distance: ""
//   });

//   /* ✅ FIT ROUTE FUNCTION */
//   const fitToRoute = (pickup, drop) => {

//     if (!mapRef.current) return;

//     mapRef.current.fitToCoordinates(
//       [pickup, drop],
//       {
//         edgePadding: {
//           top: 80,
//           right: 50,
//           bottom: 80,
//           left: 50,
//         },
//         animated: true,
//       }
//     );
//   };

//   useEffect(() => {
//     const loadUserData = async () => {
//       const userData = await AsyncStorage.getItem("userData");
//       if (userData) {
//         const parsed = JSON.parse(userData);
//         setFormData(prev => ({
//           ...prev,
//           phoneNumber: parsed.phoneNumber || "",
//           customerName: parsed.name || ""
//         }));
//       }
//     };
//     loadUserData();
//   }, []);

//   const loadTypes = [
//     { label: "Furniture", value: "Furniture" },
//     { label: "Cement", value: "Cement" },
//     { label: "Steel", value: "Steel" },
//     { label: "Electronics", value: "Electronics" },
//     { label: "Vegetables", value: "Vegetables" },
//     { label: "Fruits", value: "Fruits" },
//     { label: "Groceries", value: "Groceries" },
//     { label: "Construction Materials", value: "Construction Materials" },
//     { label: "Machinery", value: "Machinery" },
//     { label: "Industrial Goods", value: "Industrial Goods" },
//     { label: "Pharmaceuticals", value: "Pharmaceuticals" },
//     { label: "Textiles", value: "Textiles" },
//     { label: "Garments", value: "Garments" },
//     { label: "Others", value: "Others" }
//   ];

//   const searchLocation = (query, type) => {

//     if (searchTimeout.current) {
//       clearTimeout(searchTimeout.current);
//     }

//     searchTimeout.current = setTimeout(async () => {

//       if (query.length < 3) {
//         if (type === "pickup") setPickupSuggestions([]);
//         else setDropSuggestions([]);
//         return;
//       }

//       try {
//         const res = await axios.get(
//           "https://nominatim.openstreetmap.org/search",
//           {
//             params: {
//               q: query,
//               countrycodes: "in",
//               format: "json",
//               limit: 5
//             },
//             headers: {
//               "User-Agent": "truck-booking-app"
//             }
//           }
//         );

//         if (type === "pickup") {
//           setPickupSuggestions(res.data);
//         } else {
//           setDropSuggestions(res.data);
//         }

//       } catch (e) {
//         console.log("Location API Error", e);
//       }

//     }, 600);
//   };

//   const selectLocation = (item, type) => {

//     const lat = parseFloat(item.lat);
//     const lon = parseFloat(item.lon);
//     const address = item.display_name;

//     if (type === "pickup") {

//       setPickupCoords({ latitude: lat, longitude: lon });
//       setPickupSearch(address);
//       setPickupSuggestions([]);

//       setFormData(prev => ({
//         ...prev,
//         pickupLocation: address
//       }));

//     } else {

//       const drop = { latitude: lat, longitude: lon };

//       setDropCoords(drop);
//       setDropSearch(address);
//       setDropSuggestions([]);

//       const dist = calculateDistance(
//         pickupCoords.latitude,
//         pickupCoords.longitude,
//         lat,
//         lon
//       );

//       setFormData(prev => ({
//         ...prev,
//         dropLocation: address,
//         distance: dist
//       }));

//       // ✅ ZOOM OUT HERE
//       fitToRoute(pickupCoords, drop);
//     }
//   };

//   const pickImage = async () => {

//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (!permission.granted) {
//       Alert.alert("Permission required");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ['images'],
//       quality: 0.7
//     });

//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   const getEstimatedCost = () => {
//     const weight = Number(formData.weight);
//     const distance = Number(formData.distance);
//     if (!weight || !distance) return "--";
//     return `₹${Math.round(getWeightFlatCharge(weight) + distance * 6)}`;
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const customerId = await AsyncStorage.getItem("customerId");

//       const data = new FormData();

//       Object.entries(formData).forEach(([key, value]) => {
//         data.append(key, value);
//       });

//       data.append("latitude", pickupCoords.latitude);
//       data.append("longitude", pickupCoords.longitude);

//       if (imageUri) {
//         data.append("loadImage", {
//           uri: imageUri,
//           name: "image.jpg",
//           type: "image/jpeg"
//         });
//       }

//       await customerAPI.createLoadRequest(customerId, data);

//       Alert.alert("Success", "Load Created");
//       navigation.navigate("MyLoadRequests");

//     } catch (e) {
//       Alert.alert("Error", "Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView keyboardShouldPersistTaps="handled">

//         <MapView
//           ref={mapRef}   // ✅ added
//           style={styles.map}
//           initialRegion={{
//             latitude: 20.5937,
//             longitude: 78.9629,
//             latitudeDelta: 10,
//             longitudeDelta: 10
//           }}
//           minZoomLevel={4}
//           maxZoomLevel={18}
//         >
//           <UrlTile urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker coordinate={pickupCoords} />
//           <Marker coordinate={dropCoords} />
//           <Polyline coordinates={[pickupCoords, dropCoords]} strokeWidth={4} />
//         </MapView>

//              <View style={styles.form}>

//           {/* PICKUP */}
//           <View style={{ zIndex: 1000 }}>
//             <TextInput style={styles.input} placeholder="Pickup Location"
//               value={pickupSearch}
//               onChangeText={(t) => {
//                 setPickupSearch(t);
//                 searchLocation(t, "pickup");
//               }}
//             />
//             {pickupSuggestions.length > 0 && (
//               <View style={styles.suggestionBox}>
//                 {pickupSuggestions.map((item, i) => (
//                   <TouchableOpacity key={i} style={styles.dropdownItem}
//                     onPress={() => selectLocation(item, "pickup")}>
//                     <Text numberOfLines={2}>{item.display_name}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             )}
//           </View>

          

//           {/* DROP */}
//           <View style={{ zIndex: 999 }}>
//             <TextInput style={styles.input} placeholder="Drop Location"
//               value={dropSearch}
//               onChangeText={(t) => {
//                 setDropSearch(t);
//                 searchLocation(t, "drop");
//               }}
//             />
//             {dropSuggestions.length > 0 && (
//               <View style={styles.suggestionBox}>
//                 {dropSuggestions.map((item, i) => (
//                   <TouchableOpacity key={i} style={styles.dropdownItem}
//                     onPress={() => selectLocation(item, "drop")}>
//                     <Text numberOfLines={2}>{item.display_name}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             )}
//           </View>

//           <TextInput style={styles.input} placeholder="Distance"
//             value={formData.distance ? `${formData.distance} km` : ""}
//             editable={false}
//           />

//           <TextInput style={styles.input} placeholder="Customer Name"
//             value={formData.customerName}
//             onChangeText={(t) => setFormData({ ...formData, customerName: t })}
//           />

//           <TextInput style={styles.input} placeholder="Phone Number"
//             keyboardType="number-pad"
//             value={formData.phoneNumber}
//             onChangeText={(t) =>
//               setFormData({ ...formData, phoneNumber: t.replace(/[^0-9]/g, "") })
//             }
//           />

//           <View style={styles.dropdown}>
//             <RNPickerSelect
//               onValueChange={(v) => setFormData({ ...formData, loadType: v })}
//               items={loadTypes}
//               style={{ inputIOS: styles.dropdownText, inputAndroid: styles.dropdownText }}
//             />
//           </View>

//          <TextInput style={styles.input}
//   placeholder="Alternative Phone"
//   keyboardType="number-pad"
//   maxLength={10}   // ✅ restrict to 10 digits
//   value={formData.alternativePhone}
//   onChangeText={(t) =>
//     setFormData({
//       ...formData,
//       alternativePhone: t.replace(/[^0-9]/g, "") // ✅ only numbers
//     })
//   }
// />

//           <TextInput style={styles.input} placeholder="Weight"
//             keyboardType="numeric"
//             value={formData.weight}
//             onChangeText={(t) => setFormData({ ...formData, weight: t })}
//           />

//           {imageUri ?
//             <Image source={{ uri: imageUri }} style={styles.image} />
//             :
//             <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
//               <Text style={{ color: "#fff" }}>Upload Load Image</Text>
//             </TouchableOpacity>
//           }

//           {/* PRICE BOX */}
//           <View style={styles.priceBox}>
//             <Text style={styles.priceLabel}>Estimated Price</Text>
//             <Text style={styles.priceValue}>{getEstimatedCost()}</Text>
//           </View>

//           <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
//             {loading
//               ? <ActivityIndicator color="#fff" />
//               : <Text style={{ color: "#fff" }}>CREATE LOAD</Text>}
//           </TouchableOpacity>

//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default CreateLoadRequestScreen;

// /* STYLES */
// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#f5f5f5" },

//   mapCard: {
//     margin: 15,
//     borderRadius: 15,
//     overflow: "hidden"
//   },

//   map: { height: 220 },

//   form: { padding: 15 },

//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ddd6d6",
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     marginTop: 12,
//     backgroundColor: "#fff"
//   },

//   dropdown: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ddd6d6",
//     borderRadius: 12,
//     marginTop: 12,
//     justifyContent: "center",
//     backgroundColor: "#fff"
//   },

//   dropdownText: { fontSize: 15 },

//   suggestionBox: {
//     position: "absolute",
//     top: 55,
//     width: "100%",
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ddd6d6",
//     borderRadius: 10,
//     zIndex: 999,
//     elevation: 10
//   },

//   dropdownItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: "#ddd6d6"
//   },

//   imageBtn: {
//     height: 50,
//     backgroundColor: "#2e6ee2",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 12,
//     marginTop: 12
//   },

//   image: {
//     height: 200,
//     width: "100%",
//     borderRadius: 12,
//     marginTop: 12
//   },

// priceBox: {
//   height: 50,                // ✅ same height as input
//   borderWidth: 1,
//   borderColor: "#ddd6d6",
//   borderRadius: 12,
//   marginTop: 12,
//   backgroundColor: "#fff",
//   flexDirection: "row",      // ✅ align left + right
//   justifyContent: "space-between",
//   alignItems: "center",
//   paddingHorizontal: 14
// },

// priceLabel: {
//   fontSize: 14,
//   color: "#666"
// },

// priceValue: {
//   fontSize: 16,              // ✅ reduced to match inputs
//   fontWeight: "bold",
//   color: "#035f2a9d"
// },

//   submit: {
//     height: 50,
//     backgroundColor: "#2e6ee2",
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 15
//   }
// });   

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
// import { useEffect, useRef, useState } from 'react';

// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// import MapLibreGL from '@maplibre/maplibre-react-native';
// import RNPickerSelect from "react-native-picker-select";
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { customerAPI } from '../services/api';

// MapLibreGL.setAccessToken(null);

// /* DISTANCE */
// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371;
//   const dLat = (lat2 - lat1) * Math.PI / 180;
//   const dLon = (lon2 - lon1) * Math.PI / 180;

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(lat1 * Math.PI / 180) *
//     Math.cos(lat2 * Math.PI / 180) *
//     Math.sin(dLon / 2) ** 2;

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return (R * c).toFixed(2);
// };

// /* PRICE */
// const getWeightFlatCharge = (weight) => {
//   if (weight <= 500) return 200;
//   if (weight <= 1000) return 400;
//   if (weight <= 1500) return 600;
//   return 800;
// };

// const CreateLoadRequestScreen = ({ navigation }) => {

//   const searchTimeout = useRef(null);

//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState(null);

//   const [pickupSearch, setPickupSearch] = useState("");
//   const [dropSearch, setDropSearch] = useState("");

//   const [pickupSuggestions, setPickupSuggestions] = useState([]);
//   const [dropSuggestions, setDropSuggestions] = useState([]);

//   const [pickupCoords, setPickupCoords] = useState({
//     latitude: 13.0827,
//     longitude: 80.2707
//   });

//   const [dropCoords, setDropCoords] = useState({
//     latitude: 12.9716,
//     longitude: 77.5946
//   });

//   const [formData, setFormData] = useState({
//     customerName: "",
//     phoneNumber: "",
//     alternativePhone: "",
//     pickupLocation: "",
//     dropLocation: "",
//     loadType: "Furniture",
//     weight: "",
//     distance: ""
//   });

//   useEffect(() => {
//     const loadUserData = async () => {
//       const userData = await AsyncStorage.getItem("userData");
//       if (userData) {
//         const parsed = JSON.parse(userData);
//         setFormData(prev => ({
//           ...prev,
//           phoneNumber: parsed.phoneNumber || "",
//           customerName: parsed.name || ""
//         }));
//       }
//     };
//     loadUserData();
//   }, []);

//   const loadTypes = [
//     { label: "Furniture", value: "Furniture" },
//     { label: "Cement", value: "Cement" },
//     { label: "Steel", value: "Steel" },
//     { label: "Electronics", value: "Electronics" },
//     { label: "Vegetables", value: "Vegetables" },
//     { label: "Fruits", value: "Fruits" },
//     { label: "Groceries", value: "Groceries" },
//     { label: "Construction Materials", value: "Construction Materials" },
//     { label: "Machinery", value: "Machinery" },
//     { label: "Industrial Goods", value: "Industrial Goods" },
//     { label: "Pharmaceuticals", value: "Pharmaceuticals" },
//     { label: "Textiles", value: "Textiles" },
//     { label: "Garments", value: "Garments" },
//     { label: "Others", value: "Others" }
//   ];

//   const searchLocation = (query, type) => {

//     if (searchTimeout.current) {
//       clearTimeout(searchTimeout.current);
//     }

//     searchTimeout.current = setTimeout(async () => {

//       if (query.length < 3) {
//         if (type === "pickup") setPickupSuggestions([]);
//         else setDropSuggestions([]);
//         return;
//       }

//       try {
//         const res = await axios.get(
//           "https://nominatim.openstreetmap.org/search",
//           {
//             params: {
//               q: query,
//               countrycodes: "in",
//               format: "json",
//               limit: 5
//             },
//             headers: {
//               "User-Agent": "truck-booking-app"
//             }
//           }
//         );

//         type === "pickup"
//           ? setPickupSuggestions(res.data)
//           : setDropSuggestions(res.data);

//       } catch (e) {
//         console.log("Location API Error", e);
//       }

//     }, 600);
//   };

//   const selectLocation = (item, type) => {

//     const lat = parseFloat(item.lat);
//     const lon = parseFloat(item.lon);
//     const address = item.display_name;

//     if (type === "pickup") {

//       setPickupCoords({ latitude: lat, longitude: lon });
//       setPickupSearch(address);
//       setPickupSuggestions([]);

//       setFormData(prev => ({
//         ...prev,
//         pickupLocation: address
//       }));

//     } else {

//       setDropCoords({ latitude: lat, longitude: lon });
//       setDropSearch(address);
//       setDropSuggestions([]);

//       const dist = calculateDistance(
//         pickupCoords.latitude,
//         pickupCoords.longitude,
//         lat,
//         lon
//       );

//       setFormData(prev => ({
//         ...prev,
//         dropLocation: address,
//         distance: dist
//       }));
//     }
//   };

//   const pickImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) return Alert.alert("Permission required");

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ['images'],
//       quality: 0.7
//     });

//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   const getEstimatedCost = () => {
//     const weight = Number(formData.weight);
//     const distance = Number(formData.distance);
//     if (!weight || !distance) return "--";
//     return `₹${Math.round(getWeightFlatCharge(weight) + distance * 6)}`;
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       const customerId = await AsyncStorage.getItem("customerId");

//       const data = new FormData();

//       Object.entries(formData).forEach(([key, value]) => {
//         data.append(key, value);
//       });

//       data.append("latitude", pickupCoords.latitude);
//       data.append("longitude", pickupCoords.longitude);

//       if (imageUri) {
//         data.append("loadImage", {
//           uri: imageUri,
//           name: "image.jpg",
//           type: "image/jpeg"
//         });
//       }

//       await customerAPI.createLoadRequest(customerId, data);

//       Alert.alert("Success", "Load Created");
//       navigation.navigate("MyLoadRequests");

//     } catch (e) {
//       Alert.alert("Error", "Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView keyboardShouldPersistTaps="handled">

//         {/* MAP */}
//         <MapLibreGL.MapView style={styles.map}>
//           <MapLibreGL.Camera
//             zoomLevel={5}
//             centerCoordinate={[78.9629, 20.5937]}
//           />

//           <MapLibreGL.PointAnnotation
//             id="pickup"
//             coordinate={[pickupCoords.longitude, pickupCoords.latitude]}
//           />

//           <MapLibreGL.PointAnnotation
//             id="drop"
//             coordinate={[dropCoords.longitude, dropCoords.latitude]}
//           />

//           <MapLibreGL.ShapeSource
//             id="routeSource"
//             shape={{
//               type: "Feature",
//               geometry: {
//                 type: "LineString",
//                 coordinates: [
//                   [pickupCoords.longitude, pickupCoords.latitude],
//                   [dropCoords.longitude, dropCoords.latitude]
//                 ]
//               }
//             }}
//           >
//             <MapLibreGL.LineLayer
//               id="routeLine"
//               style={{ lineWidth: 4, lineColor: "#2e6ee2" }}
//             />
//           </MapLibreGL.ShapeSource>
//         </MapLibreGL.MapView>

//         {/* FORM */}
//         <View style={styles.form}>
//           <TextInput style={styles.input} placeholder="Pickup Location"
//             value={pickupSearch}
//             onChangeText={(t) => {
//               setPickupSearch(t);
//               searchLocation(t, "pickup");
//             }}
//           />
//           {pickupSuggestions.length > 0 && (
//   <View style={styles.suggestionBox}>
//     {pickupSuggestions.map((item, index) => (
//       <TouchableOpacity
//         key={index}
//         style={styles.suggestionItem}
//         onPress={() => selectLocation(item, "pickup")}
//       >
//         <Text numberOfLines={2}>{item.display_name}</Text>
//       </TouchableOpacity>
//     ))}
//   </View>
// )}

//           <TextInput style={styles.input} placeholder="Drop Location"
//             value={dropSearch}
//             onChangeText={(t) => {
//               setDropSearch(t);
//               searchLocation(t, "drop");
//             }}
//           />
//           {dropSuggestions.length > 0 && (
//   <View style={styles.suggestionBox}>
//     {dropSuggestions.map((item, index) => (
//       <TouchableOpacity
//         key={index}
//         style={styles.suggestionItem}
//         onPress={() => selectLocation(item, "drop")}
//       >
//         <Text numberOfLines={2}>{item.display_name}</Text>
//       </TouchableOpacity>
//     ))}
//   </View>
// )}

//           <TextInput style={styles.input} placeholder="Distance"
//             value={formData.distance ? `${formData.distance} km` : ""}
//             editable={false}
//           />

//           <TextInput style={styles.input} placeholder="Customer Name"
//             value={formData.customerName}
//             onChangeText={(t) => setFormData({ ...formData, customerName: t })}
//           />

//           <TextInput style={styles.input} placeholder="Phone Number"
//             keyboardType="number-pad"
//             value={formData.phoneNumber}
//             onChangeText={(t) =>
//               setFormData({ ...formData, phoneNumber: t.replace(/[^0-9]/g, "") })
//             }
//           />

//           <View style={styles.dropdown}>
//             <RNPickerSelect
//               onValueChange={(v) => setFormData({ ...formData, loadType: v })}
//               items={loadTypes}
//             />
//           </View>

//           <TextInput style={styles.input}
//             placeholder="Alternative Phone"
//             keyboardType="number-pad"
//             maxLength={10}
//             value={formData.alternativePhone}
//             onChangeText={(t) =>
//               setFormData({
//                 ...formData,
//                 alternativePhone: t.replace(/[^0-9]/g, "")
//               })
//             }
//           />

//           <TextInput style={styles.input} placeholder="Weight"
//             keyboardType="numeric"
//             value={formData.weight}
//             onChangeText={(t) => setFormData({ ...formData, weight: t })}
//           />

//           {imageUri ?
//             <Image source={{ uri: imageUri }} style={styles.image} />
//             :
//             <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
//               <Text style={{ color: "#fff" }}>Upload Load Image</Text>
//             </TouchableOpacity>
//           }

//           <View style={styles.priceBox}>
//             <Text style={styles.priceLabel}>Estimated Price</Text>
//             <Text style={styles.priceValue}>{getEstimatedCost()}</Text>
//           </View>

//           <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
//             {loading
//               ? <ActivityIndicator color="#fff" />
//               : <Text style={{ color: "#fff" }}>CREATE LOAD</Text>}
//           </TouchableOpacity>

//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default CreateLoadRequestScreen;

// /* STYLES */
// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
//   map: { height: 220 },
//   form: { padding: 15 },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ddd6d6",
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     marginTop: 12,
//     backgroundColor: "#e2d4d4"
//   },
//   dropdown: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ddd6d6",
//     borderRadius: 12,
//     marginTop: 12,
//     justifyContent: "center",
//     backgroundColor: "#fff"
//   },
//   imageBtn: {
//     height: 50,
//     backgroundColor: "#2e6ee2",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 12,
//     marginTop: 12
//   },
//   image: {
//     height: 200,
//     width: "100%",
//     borderRadius: 12,
//     marginTop: 12
//   },
//   suggestionBox: {
//   backgroundColor: "#fff",
//   borderWidth: 1,
//   borderColor: "#ddd",
//   borderRadius: 10,
//   marginTop: 5,
//   maxHeight: 150,
//   overflow: "hidden"
// },
// suggestionItem: {
//   padding: 10,
//   borderBottomWidth: 1,
//   borderBottomColor: "#eee"
// },
//   priceBox: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ddd6d6",
//     borderRadius: 12,
//     marginTop: 12,
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 14
//   },
//   priceLabel: { fontSize: 14, color: "#666" },
//   priceValue: { fontSize: 16, fontWeight: "bold", color: "#035f2a9d" },
//   submit: {
//     height: 50,
//     backgroundColor: "#2e6ee2",
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 15
//   }
// });
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
// import { useEffect, useRef, useState } from 'react';

// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import RNPickerSelect from "react-native-picker-select";
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { customerAPI } from '../services/api';

// // GOOGLE MAPS API KEY
// const GOOGLE_MAPS_API_KEY = 'AIzaSyDZwBw_ToWcWIggRVBSFA2Sy7mvEhKZUbU';

// /* DISTANCE CALCULATION using Haversine formula */
// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // Earth's radius in km
//   const dLat = (lat2 - lat1) * Math.PI / 180;
//   const dLon = (lon2 - lon1) * Math.PI / 180;
  
//   const a = Math.sin(dLat / 2) ** 2 +
//     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//     Math.sin(dLon / 2) ** 2;
  
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return (R * c).toFixed(2);
// };

// /* GET DISTANCE MATRIX from Google Maps API */
// const getRouteDistance = async (origin, destination) => {
//   try {
//     const response = await axios.get(
//       'https://maps.googleapis.com/maps/api/distancematrix/json',
//       {
//         params: {
//           origins: `${origin.latitude},${origin.longitude}`,
//           destinations: `${destination.latitude},${destination.longitude}`,
//           key: GOOGLE_MAPS_API_KEY,
//           units: 'metric'
//         }
//       }
//     );
    
//     if (response.data.rows[0]?.elements[0]?.status === 'OK') {
//       const distanceInKm = response.data.rows[0].elements[0].distance.value / 1000;
//       return distanceInKm.toFixed(2);
//     }
//     return calculateDistance(origin.latitude, origin.longitude, destination.latitude, destination.longitude);
//   } catch (error) {
//     console.log('Distance Matrix Error:', error);
//     return calculateDistance(origin.latitude, origin.longitude, destination.latitude, destination.longitude);
//   }
// };

// /* PRICE CALCULATION */
// const getWeightFlatCharge = (weight) => {
//   if (weight <= 500) return 200;
//   if (weight <= 1000) return 400;
//   if (weight <= 1500) return 600;
//   return 800;
// };

// const CreateLoadRequestScreen = ({ navigation }) => {
//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState(null);
  
//   const [pickupCoords, setPickupCoords] = useState({
//     latitude: 13.0827,
//     longitude: 80.2707
//   });
  
//   const [dropCoords, setDropCoords] = useState({
//     latitude: 12.9716,
//     longitude: 77.5946
//   });
  
//   const [pickupAddress, setPickupAddress] = useState('');
//   const [dropAddress, setDropAddress] = useState('');
//   const [routeCoords, setRouteCoords] = useState([]);
  
//   const [formData, setFormData] = useState({
//     customerName: "",
//     phoneNumber: "",
//     alternativePhone: "",
//     pickupLocation: "",
//     dropLocation: "",
//     loadType: "Furniture",
//     weight: "",
//     distance: ""
//   });

//   const mapRef = useRef(null);
//   const pickupAutocompleteRef = useRef(null);
//   const dropAutocompleteRef = useRef(null);

//   useEffect(() => {
//     const loadUserData = async () => {
//       const userData = await AsyncStorage.getItem("userData");
//       if (userData) {
//         const parsed = JSON.parse(userData);
//         setFormData(prev => ({
//           ...prev,
//           phoneNumber: parsed.phoneNumber || "",
//           customerName: parsed.name || ""
//         }));
//       }
//     };
//     loadUserData();
//   }, []);

//   const loadTypes = [
//     { label: "Furniture", value: "Furniture" },
//     { label: "Cement", value: "Cement" },
//     { label: "Steel", value: "Steel" },
//     { label: "Electronics", value: "Electronics" },
//     { label: "Vegetables", value: "Vegetables" },
//     { label: "Fruits", value: "Fruits" },
//     { label: "Groceries", value: "Groceries" },
//     { label: "Construction Materials", value: "Construction Materials" },
//     { label: "Machinery", value: "Machinery" },
//     { label: "Industrial Goods", value: "Industrial Goods" },
//     { label: "Pharmaceuticals", value: "Pharmaceuticals" },
//     { label: "Textiles", value: "Textiles" },
//     { label: "Garments", value: "Garments" },
//     { label: "Others", value: "Others" }
//   ];

//   const handlePickupSelect = async (data, details = null) => {
//     if (details) {
//       const lat = details.geometry.location.lat;
//       const lng = details.geometry.location.lng;
//       const address = details.formatted_address;
      
//       setPickupCoords({ latitude: lat, longitude: lng });
//       setPickupAddress(address);
      
//       setFormData(prev => ({
//         ...prev,
//         pickupLocation: address
//       }));
      
//       // Fit map to show both markers if drop is also selected
//       if (dropCoords.latitude && dropCoords.longitude) {
//         fitMapToCoordinates(lat, lng, dropCoords.latitude, dropCoords.longitude);
//       } else {
//         mapRef.current?.animateToRegion({
//           latitude: lat,
//           longitude: lng,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }, 1000);
//       }
      
//       // If drop location already selected, calculate distance
//       if (dropCoords.latitude && dropCoords.longitude) {
//         const distance = await getRouteDistance(
//           { latitude: lat, longitude: lng },
//           dropCoords
//         );
//         setFormData(prev => ({
//           ...prev,
//           distance: distance
//         }));
//       }
//     }
//   };

//   const handleDropSelect = async (data, details = null) => {
//     if (details) {
//       const lat = details.geometry.location.lat;
//       const lng = details.geometry.location.lng;
//       const address = details.formatted_address;
      
//       setDropCoords({ latitude: lat, longitude: lng });
//       setDropAddress(address);
      
//       setFormData(prev => ({
//         ...prev,
//         dropLocation: address
//       }));
      
//       // Fit map to show both markers
//       if (pickupCoords.latitude && pickupCoords.longitude) {
//         fitMapToCoordinates(pickupCoords.latitude, pickupCoords.longitude, lat, lng);
        
//         // Calculate distance using Google Distance Matrix
//         const distance = await getRouteDistance(pickupCoords, { latitude: lat, longitude: lng });
//         setFormData(prev => ({
//           ...prev,
//           distance: distance
//         }));
        
//         // Get route polyline
//         getRoutePolyline(pickupCoords, { latitude: lat, longitude: lng });
//       } else {
//         mapRef.current?.animateToRegion({
//           latitude: lat,
//           longitude: lng,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }, 1000);
//       }
//     }
//   };

//   const getRoutePolyline = async (origin, destination) => {
//     try {
//       const response = await axios.get(
//         'https://maps.googleapis.com/maps/api/directions/json',
//         {
//           params: {
//             origin: `${origin.latitude},${origin.longitude}`,
//             destination: `${destination.latitude},${destination.longitude}`,
//             key: GOOGLE_MAPS_API_KEY
//           }
//         }
//       );
      
//       if (response.data.routes[0]?.overview_polyline?.points) {
//         const points = decodePolyline(response.data.routes[0].overview_polyline.points);
//         setRouteCoords(points);
//       }
//     } catch (error) {
//       console.log('Directions API Error:', error);
//     }
//   };

//   const decodePolyline = (encoded) => {
//     let index = 0;
//     const len = encoded.length;
//     let lat = 0;
//     let lng = 0;
//     const array = [];
    
//     while (index < len) {
//       let b;
//       let shift = 0;
//       let result = 0;
//       do {
//         b = encoded.charCodeAt(index++) - 63;
//         result |= (b & 0x1f) << shift;
//         shift += 5;
//       } while (b >= 0x20);
//       const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
//       lat += dlat;
      
//       shift = 0;
//       result = 0;
//       do {
//         b = encoded.charCodeAt(index++) - 63;
//         result |= (b & 0x1f) << shift;
//         shift += 5;
//       } while (b >= 0x20);
//       const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
//       lng += dlng;
      
//       array.push({
//         latitude: lat / 1e5,
//         longitude: lng / 1e5
//       });
//     }
//     return array;
//   };

//   const fitMapToCoordinates = (lat1, lng1, lat2, lng2) => {
//     mapRef.current?.fitToCoordinates(
//       [
//         { latitude: lat1, longitude: lng1 },
//         { latitude: lat2, longitude: lng2 }
//       ],
//       {
//         edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
//         animated: true
//       }
//     );
//   };

//   const pickImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) return Alert.alert("Permission required");
    
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ['images'],
//       quality: 0.7
//     });
    
//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   const getEstimatedCost = () => {
//     const weight = Number(formData.weight);
//     const distance = Number(formData.distance);
//     if (!weight || !distance) return "--";
//     return `₹${Math.round(getWeightFlatCharge(weight) + distance * 6)}`;
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       const customerId = await AsyncStorage.getItem("customerId");
      
//       const data = new FormData();
      
//       Object.entries(formData).forEach(([key, value]) => {
//         data.append(key, value);
//       });
      
//       data.append("latitude", pickupCoords.latitude);
//       data.append("longitude", pickupCoords.longitude);
//       data.append("dropLatitude", dropCoords.latitude);
//       data.append("dropLongitude", dropCoords.longitude);
      
//       if (imageUri) {
//         data.append("loadImage", {
//           uri: imageUri,
//           name: "image.jpg",
//           type: "image/jpeg"
//         });
//       }
      
//       await customerAPI.createLoadRequest(customerId, data);
      
//       Alert.alert("Success", "Load Created");
//       navigation.navigate("MyLoadRequests");
      
//     } catch (e) {
//       Alert.alert("Error", "Failed to create load request");
//       console.log(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView keyboardShouldPersistTaps="handled">
        
//         {/* MAP VIEW */}
//         <MapView
//           ref={mapRef}
//           style={styles.map}
//           initialRegion={{
//             latitude: 20.5937,
//             longitude: 78.9629,
//             latitudeDelta: 5,
//             longitudeDelta: 5,
//           }}
//         >
//           {pickupCoords && (
//             <Marker
//               coordinate={pickupCoords}
//               title="Pickup Location"
//               pinColor="green"
//             />
//           )}
          
//           {dropCoords && (
//             <Marker
//               coordinate={dropCoords}
//               title="Drop Location"
//               pinColor="red"
//             />
//           )}
          
//           {routeCoords.length > 0 && (
//             <Polyline
//               coordinates={routeCoords}
//               strokeColor="#2e6ee2"
//               strokeWidth={4}
//             />
//           )}
//         </MapView>
        
//         {/* FORM */}
//         <View style={styles.form}>
//           {/* Pickup Location with Google Autocomplete */}
//           <View style={styles.autocompleteContainer}>
//             <GooglePlacesAutocomplete
//               ref={pickupAutocompleteRef}
//               placeholder="Search pickup location..."
//               onPress={handlePickupSelect}
//               query={{
//                 key: GOOGLE_MAPS_API_KEY,
//                 language: 'en',
//                 components: 'country:in',
//               }}
//               fetchDetails={true}
//               enablePoweredByContainer={false}
//               styles={{
//                 textInputContainer: styles.autocompleteTextInputContainer,
//                 textInput: styles.autocompleteTextInput,
//                 listView: styles.autocompleteListView,
//                 row: styles.autocompleteRow,
//               }}
//               debounce={300}
//             />
//           </View>
          
//           {/* Drop Location with Google Autocomplete */}
//           <View style={styles.autocompleteContainer}>
//             <GooglePlacesAutocomplete
//               ref={dropAutocompleteRef}
//               placeholder="Search drop location..."
//               onPress={handleDropSelect}
//               query={{
//                 key: GOOGLE_MAPS_API_KEY,
//                 language: 'en',
//                 components: 'country:in',
//               }}
//               fetchDetails={true}
//               enablePoweredByContainer={false}
//               styles={{
//                 textInputContainer: styles.autocompleteTextInputContainer,
//                 textInput: styles.autocompleteTextInput,
//                 listView: styles.autocompleteListView,
//                 row: styles.autocompleteRow,
//               }}
//               debounce={300}
//             />
//           </View>
          
//           <TextInput 
//             style={styles.input} 
//             placeholder="Distance (Auto-calculated)"
//             value={formData.distance ? `${formData.distance} km` : ""}
//             editable={false}
//           />
          
//           <TextInput 
//             style={styles.input} 
//             placeholder="Customer Name"
//             value={formData.customerName}
//             onChangeText={(t) => setFormData({ ...formData, customerName: t })}
//           />
          
//           <TextInput 
//             style={styles.input} 
//             placeholder="Phone Number"
//             keyboardType="number-pad"
//             value={formData.phoneNumber}
//             onChangeText={(t) =>
//               setFormData({ ...formData, phoneNumber: t.replace(/[^0-9]/g, "") })
//             }
//           />
          
//           <View style={styles.dropdown}>
//             <RNPickerSelect
//               onValueChange={(v) => setFormData({ ...formData, loadType: v })}
//               items={loadTypes}
//               value={formData.loadType}
//               placeholder={{}}
//             />
//           </View>
          
//           <TextInput 
//             style={styles.input}
//             placeholder="Alternative Phone (Optional)"
//             keyboardType="number-pad"
//             maxLength={10}
//             value={formData.alternativePhone}
//             onChangeText={(t) =>
//               setFormData({
//                 ...formData,
//                 alternativePhone: t.replace(/[^0-9]/g, "")
//               })
//             }
//           />
          
//           <TextInput 
//             style={styles.input} 
//             placeholder="Weight (in kg)"
//             keyboardType="numeric"
//             value={formData.weight}
//             onChangeText={(t) => setFormData({ ...formData, weight: t })}
//           />
          
//           {imageUri ?
//             <Image source={{ uri: imageUri }} style={styles.image} />
//             :
//             <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
//               <Text style={{ color: "#fff" }}>Upload Load Image</Text>
//             </TouchableOpacity>
//           }
          
//           <View style={styles.priceBox}>
//             <Text style={styles.priceLabel}>Estimated Price</Text>
//             <Text style={styles.priceValue}>{getEstimatedCost()}</Text>
//           </View>
          
//           <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
//             {loading
//               ? <ActivityIndicator color="#fff" />
//               : <Text style={{ color: "#fff" }}>CREATE LOAD</Text>}
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default CreateLoadRequestScreen;

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
//   map: { height: 300, marginTop: 10 },
//   form: { padding: 15 },
//   autocompleteContainer: {
//     marginTop: 12,
//     zIndex: 1,
//   },
//   autocompleteTextInputContainer: {
//     borderWidth: 1,
//     borderColor: "#ddd6d6",
//     borderRadius: 12,
//     backgroundColor: "#fff",
//   },
//   autocompleteTextInput: {
//     height: 50,
//     fontSize: 16,
//     paddingHorizontal: 14,
//   },
//   autocompleteListView: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     marginTop: 5,
//     maxHeight: 200,
//     zIndex: 1000,
//   },
//   autocompleteRow: {
//     padding: 10,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ddd6d6",
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     marginTop: 12,
//     backgroundColor: "#fff"
//   },
//   dropdown: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ddd6d6",
//     borderRadius: 12,
//     marginTop: 12,
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     paddingHorizontal: 14
//   },
//   imageBtn: {
//     height: 50,
//     backgroundColor: "#2e6ee2",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 12,
//     marginTop: 12
//   },
//   image: {
//     height: 200,
//     width: "100%",
//     borderRadius: 12,
//     marginTop: 12
//   },
//   priceBox: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ddd6d6",
//     borderRadius: 12,
//     marginTop: 12,
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 14
//   },
//   priceLabel: { fontSize: 14, color: "#666" },
//   priceValue: { fontSize: 16, fontWeight: "bold", color: "#035f2a9d" },
//   submit: {
//     height: 50,
//     backgroundColor: "#2e6ee2",
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 15,
//     marginBottom: 20
//   }
// });
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
// import { useEffect, useRef, useState } from 'react';

// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// // Conditional imports for web vs native
// import MapLibreGL from '@maplibre/maplibre-react-native';
// import RNPickerSelect from "react-native-picker-select";
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { customerAPI } from '../services/api';

// // Google Maps API Key
// const GOOGLE_MAPS_API_KEY = 'AIzaSyDZwBw_ToWcWIggRVBSFA2Sy7mvEhKZUbU';

// MapLibreGL.setAccessToken(null);

// /* DISTANCE CALCULATION using Haversine formula */
// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371;
//   const dLat = (lat2 - lat1) * Math.PI / 180;
//   const dLon = (lon2 - lon1) * Math.PI / 180;
  
//   const a = Math.sin(dLat / 2) ** 2 +
//     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//     Math.sin(dLon / 2) ** 2;
  
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return (R * c).toFixed(2);
// };

// /* GET DISTANCE MATRIX from Google Maps API */
// const getRouteDistance = async (origin, destination) => {
//   try {
//     const response = await axios.get(
//       'https://maps.googleapis.com/maps/api/distancematrix/json',
//       {
//         params: {
//           origins: `${origin.latitude},${origin.longitude}`,
//           destinations: `${destination.latitude},${destination.longitude}`,
//           key: GOOGLE_MAPS_API_KEY,
//           units: 'metric'
//         }
//       }
//     );
    
//     if (response.data.rows[0]?.elements[0]?.status === 'OK') {
//       const distanceInKm = response.data.rows[0].elements[0].distance.value / 1000;
//       return distanceInKm.toFixed(2);
//     }
//     return calculateDistance(origin.latitude, origin.longitude, destination.latitude, destination.longitude);
//   } catch (error) {
//     console.log('Distance Matrix Error:', error);
//     return calculateDistance(origin.latitude, origin.longitude, destination.latitude, destination.longitude);
//   }
// };

// /* PRICE CALCULATION */
// const getWeightFlatCharge = (weight) => {
//   if (weight <= 500) return 200;
//   if (weight <= 1000) return 400;
//   if (weight <= 1500) return 600;
//   return 800;
// };

// const CreateLoadRequestScreen = ({ navigation }) => {
//   const searchTimeout = useRef(null);
//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState(null);
  
//   const [pickupSearch, setPickupSearch] = useState("");
//   const [dropSearch, setDropSearch] = useState("");
  
//   const [pickupSuggestions, setPickupSuggestions] = useState([]);
//   const [dropSuggestions, setDropSuggestions] = useState([]);
  
//   const [pickupCoords, setPickupCoords] = useState({
//     latitude: 13.0827,
//     longitude: 80.2707
//   });
  
//   const [dropCoords, setDropCoords] = useState({
//     latitude: 12.9716,
//     longitude: 77.5946
//   });
  
//   const [formData, setFormData] = useState({
//     customerName: "",
//     phoneNumber: "",
//     alternativePhone: "",
//     pickupLocation: "",
//     dropLocation: "",
//     loadType: "Furniture",
//     weight: "",
//     distance: ""
//   });

//   useEffect(() => {
//     const loadUserData = async () => {
//       const userData = await AsyncStorage.getItem("userData");
//       if (userData) {
//         const parsed = JSON.parse(userData);
//         setFormData(prev => ({
//           ...prev,
//           phoneNumber: parsed.phoneNumber || "",
//           customerName: parsed.name || ""
//         }));
//       }
//     };
//     loadUserData();
//   }, []);

//   const loadTypes = [
//     { label: "Furniture", value: "Furniture" },
//     { label: "Cement", value: "Cement" },
//     { label: "Steel", value: "Steel" },
//     { label: "Electronics", value: "Electronics" },
//     { label: "Vegetables", value: "Vegetables" },
//     { label: "Fruits", value: "Fruits" },
//     { label: "Groceries", value: "Groceries" },
//     { label: "Construction Materials", value: "Construction Materials" },
//     { label: "Machinery", value: "Machinery" },
//     { label: "Industrial Goods", value: "Industrial Goods" },
//     { label: "Pharmaceuticals", value: "Pharmaceuticals" },
//     { label: "Textiles", value: "Textiles" },
//     { label: "Garments", value: "Garments" },
//     { label: "Others", value: "Others" }
//   ];

//   // Google Places API search for web compatibility
//   const searchLocation = async (query, type) => {
//     if (searchTimeout.current) {
//       clearTimeout(searchTimeout.current);
//     }

//     searchTimeout.current = setTimeout(async () => {
//       if (query.length < 3) {
//         if (type === "pickup") setPickupSuggestions([]);
//         else setDropSuggestions([]);
//         return;
//       }

//       try {
//         // Using Google Places API instead of Nominatim
//         const response = await axios.get(
//           'https://maps.googleapis.com/maps/api/place/autocomplete/json',
//           {
//             params: {
//               input: query,
//               key: GOOGLE_MAPS_API_KEY,
//               components: 'country:in',
//               types: 'geocode'
//             }
//           }
//         );

//         if (response.data.predictions) {
//           const suggestions = response.data.predictions.map(prediction => ({
//             description: prediction.description,
//             place_id: prediction.place_id
//           }));
          
//           type === "pickup"
//             ? setPickupSuggestions(suggestions)
//             : setDropSuggestions(suggestions);
//         }
//       } catch (e) {
//         console.log("Google Places API Error", e);
//       }
//     }, 600);
//   };

//   // Get place details from place_id
//   const getPlaceDetails = async (placeId) => {
//     try {
//       const response = await axios.get(
//         'https://maps.googleapis.com/maps/api/place/details/json',
//         {
//           params: {
//             place_id: placeId,
//             key: GOOGLE_MAPS_API_KEY,
//             fields: 'geometry,formatted_address'
//           }
//         }
//       );
      
//       if (response.data.result) {
//         const location = response.data.result.geometry.location;
//         const address = response.data.result.formatted_address;
//         return {
//           lat: location.lat,
//           lng: location.lng,
//           address: address
//         };
//       }
//       return null;
//     } catch (error) {
//       console.log("Place Details Error", error);
//       return null;
//     }
//   };

//   const selectLocation = async (item, type) => {
//     const placeDetails = await getPlaceDetails(item.place_id);
    
//     if (!placeDetails) return;
    
//     const { lat, lng, address } = placeDetails;

//     if (type === "pickup") {
//       setPickupCoords({ latitude: lat, longitude: lng });
//       setPickupSearch(address);
//       setPickupSuggestions([]);
      
//       setFormData(prev => ({
//         ...prev,
//         pickupLocation: address
//       }));
      
//       // If drop location exists, calculate distance
//       if (dropCoords.latitude && dropCoords.longitude) {
//         const distance = await getRouteDistance(
//           { latitude: lat, longitude: lng },
//           dropCoords
//         );
//         setFormData(prev => ({
//           ...prev,
//           distance: distance
//         }));
//       }
//     } else {
//       setDropCoords({ latitude: lat, longitude: lng });
//       setDropSearch(address);
//       setDropSuggestions([]);
      
//       const distance = await getRouteDistance(
//         pickupCoords,
//         { latitude: lat, longitude: lng }
//       );
      
//       setFormData(prev => ({
//         ...prev,
//         dropLocation: address,
//         distance: distance
//       }));
//     }
//   };

//   const pickImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) return Alert.alert("Permission required");
    
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ['images'],
//       quality: 0.7
//     });
    
//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   const getEstimatedCost = () => {
//     const weight = Number(formData.weight);
//     const distance = Number(formData.distance);
//     if (!weight || !distance) return "--";
//     return `₹${Math.round(getWeightFlatCharge(weight) + distance * 6)}`;
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       const customerId = await AsyncStorage.getItem("customerId");
      
//       const data = new FormData();
      
//       Object.entries(formData).forEach(([key, value]) => {
//         data.append(key, value);
//       });
      
//       data.append("latitude", pickupCoords.latitude);
//       data.append("longitude", pickupCoords.longitude);
//       data.append("dropLatitude", dropCoords.latitude);
//       data.append("dropLongitude", dropCoords.longitude);
      
//       if (imageUri) {
//         data.append("loadImage", {
//           uri: imageUri,
//           name: "image.jpg",
//           type: "image/jpeg"
//         });
//       }
      
//       await customerAPI.createLoadRequest(customerId, data);
      
//       Alert.alert("Success", "Load Created");
//       navigation.navigate("MyLoadRequests");
      
//     } catch (e) {
//       Alert.alert("Error", "Failed to create load request");
//       console.log(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView keyboardShouldPersistTaps="handled">
        
//         {/* MAP - Using MapLibreGL (web compatible) */}
//         <MapLibreGL.MapView style={styles.map}>
//           <MapLibreGL.Camera
//             zoomLevel={5}
//             centerCoordinate={[78.9629, 20.5937]}
//           />
          
//           <MapLibreGL.PointAnnotation
//             id="pickup"
//             coordinate={[pickupCoords.longitude, pickupCoords.latitude]}
//             title="Pickup Location"
//           />
          
//           <MapLibreGL.PointAnnotation
//             id="drop"
//             coordinate={[dropCoords.longitude, dropCoords.latitude]}
//             title="Drop Location"
//           />
          
//           <MapLibreGL.ShapeSource
//             id="routeSource"
//             shape={{
//               type: "Feature",
//               geometry: {
//                 type: "LineString",
//                 coordinates: [
//                   [pickupCoords.longitude, pickupCoords.latitude],
//                   [dropCoords.longitude, dropCoords.latitude]
//                 ]
//               }
//             }}
//           >
//             <MapLibreGL.LineLayer
//               id="routeLine"
//               style={{ lineWidth: 4, lineColor: "#2e6ee2" }}
//             />
//           </MapLibreGL.ShapeSource>
//         </MapLibreGL.MapView>
        
//         {/* FORM */}
//         <View style={styles.form}>
//           {/* Pickup Location with Google Places Suggestions */}
//           <View>
//             <TextInput 
//               style={styles.input} 
//               placeholder="Pickup Location (Search with Google)"
//               value={pickupSearch}
//               onChangeText={(t) => {
//                 setPickupSearch(t);
//                 searchLocation(t, "pickup");
//               }}
//             />
//             {pickupSuggestions.length > 0 && (
//               <View style={styles.suggestionBox}>
//                 <ScrollView style={{ maxHeight: 200 }}>
//                   {pickupSuggestions.map((item, index) => (
//                     <TouchableOpacity
//                       key={index}
//                       style={styles.suggestionItem}
//                       onPress={() => selectLocation(item, "pickup")}
//                     >
//                       <Text numberOfLines={2}>{item.description}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </ScrollView>
//               </View>
//             )}
//           </View>
          
//           {/* Drop Location with Google Places Suggestions */}
//           <View>
//             <TextInput 
//               style={styles.input} 
//               placeholder="Drop Location (Search with Google)"
//               value={dropSearch}
//               onChangeText={(t) => {
//                 setDropSearch(t);
//                 searchLocation(t, "drop");
//               }}
//             />
//             {dropSuggestions.length > 0 && (
//               <View style={styles.suggestionBox}>
//                 <ScrollView style={{ maxHeight: 200 }}>
//                   {dropSuggestions.map((item, index) => (
//                     <TouchableOpacity
//                       key={index}
//                       style={styles.suggestionItem}
//                       onPress={() => selectLocation(item, "drop")}
//                     >
//                       <Text numberOfLines={2}>{item.description}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </ScrollView>
//               </View>
//             )}
//           </View>
          
//           <TextInput 
//             style={styles.input} 
//             placeholder="Distance (Auto-calculated)"
//             value={formData.distance ? `${formData.distance} km` : ""}
//             editable={false}
//           />
          
//           <TextInput 
//             style={styles.input} 
//             placeholder="Customer Name"
//             value={formData.customerName}
//             onChangeText={(t) => setFormData({ ...formData, customerName: t })}
//           />
          
//           <TextInput 
//             style={styles.input} 
//             placeholder="Phone Number"
//             keyboardType="number-pad"
//             value={formData.phoneNumber}
//             onChangeText={(t) =>
//               setFormData({ ...formData, phoneNumber: t.replace(/[^0-9]/g, "") })
//             }
//           />
          
//           <View style={styles.dropdown}>
//             <RNPickerSelect
//               onValueChange={(v) => setFormData({ ...formData, loadType: v })}
//               items={loadTypes}
//               value={formData.loadType}
//               placeholder={{}}
//             />
//           </View>
          
//           <TextInput 
//             style={styles.input}
//             placeholder="Alternative Phone (Optional)"
//             keyboardType="number-pad"
//             maxLength={10}
//             value={formData.alternativePhone}
//             onChangeText={(t) =>
//               setFormData({
//                 ...formData,
//                 alternativePhone: t.replace(/[^0-9]/g, "")
//               })
//             }
//           />
          
//           <TextInput 
//             style={styles.input} 
//             placeholder="Weight (in kg)"
//             keyboardType="numeric"
//             value={formData.weight}
//             onChangeText={(t) => setFormData({ ...formData, weight: t })}
//           />
          
//           {imageUri ?
//             <Image source={{ uri: imageUri }} style={styles.image} />
//             :
//             <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
//               <Text style={{ color: "#fff" }}>Upload Load Image</Text>
//             </TouchableOpacity>
//           }
          
//           <View style={styles.priceBox}>
//             <Text style={styles.priceLabel}>Estimated Price</Text>
//             <Text style={styles.priceValue}>{getEstimatedCost()}</Text>
//           </View>
          
//           <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
//             {loading
//               ? <ActivityIndicator color="#fff" />
//               : <Text style={{ color: "#fff" }}>CREATE LOAD</Text>}
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default CreateLoadRequestScreen;

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
//   map: { height: 250, marginTop: 10 },
//   form: { padding: 15 },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ddd6d6",
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     marginTop: 12,
//     backgroundColor: "#fff"
//   },
//   dropdown: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ddd6d6",
//     borderRadius: 12,
//     marginTop: 12,
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     paddingHorizontal: 14
//   },
//   imageBtn: {
//     height: 50,
//     backgroundColor: "#2e6ee2",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 12,
//     marginTop: 12
//   },
//   image: {
//     height: 200,
//     width: "100%",
//     borderRadius: 12,
//     marginTop: 12
//   },
//   suggestionBox: {
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     marginTop: 5,
//     maxHeight: 200,
//     overflow: "hidden",
//     zIndex: 1000,
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   suggestionItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee"
//   },
//   priceBox: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ddd6d6",
//     borderRadius: 12,
//     marginTop: 12,
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 14
//   },
//   priceLabel: { fontSize: 14, color: "#666" },
//   priceValue: { fontSize: 16, fontWeight: "bold", color: "#035f2a9d" },
//   submit: {
//     height: 50,
//     backgroundColor: "#2e6ee2",
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 15,
//     marginBottom: 20
//   }
// });







// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { WebView } from 'react-native-webview';

// import { customerAPI } from '../services/api';

// // ─── THEME ───────────────────────────────────────────────
// const Colors = {
//   primary:     '#FF6B00',
//   primaryDark: '#CC4400',
//   primaryLight:'#FFD4A8',
//   primaryBg:   '#FFF3E8',
//   white:       '#FFFFFF',
//   black:       '#1A1A1A',
//   gray:        '#888888',
//   border:      '#E0D8D0',
//   bg:          '#F9F4EF',
//   success:     '#28A745',
// };

// // ─── KEYS ────────────────────────────────────────────────
// const GOOGLE_MAPS_API_KEY = 'AIzaSyDZwBw_ToWcWIggRVBSFA2Sy7mvEhKZUbU';

// // ─── HELPERS ─────────────────────────────────────────────
// const haversine = (lat1, lon1, lat2, lon2) => {
//   const R = 6371;
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) ** 2;
//   return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
// };

// const getRouteDistance = async (origin, destination) => {
//   try {
//     const res = await axios.get(
//       'https://maps.googleapis.com/maps/api/distancematrix/json',
//       {
//         params: {
//           origins: `${origin.latitude},${origin.longitude}`,
//           destinations: `${destination.latitude},${destination.longitude}`,
//           key: GOOGLE_MAPS_API_KEY,
//           units: 'metric',
//         },
//       }
//     );
//     const el = res.data.rows[0]?.elements[0];
//     if (el?.status === 'OK') return (el.distance.value / 1000).toFixed(2);
//   } catch (_) {}
//   return haversine(
//     origin.latitude, origin.longitude,
//     destination.latitude, destination.longitude
//   );
// };

// const weightCharge = (w) => {
//   if (w <= 500)  return 200;
//   if (w <= 1000) return 400;
//   if (w <= 1500) return 600;
//   return 800;
// };

// // ─── GOOGLE MAPS WEBVIEW HTML ────────────────────────────
// // Full Google Maps JS API with Places Autocomplete
// // Sends selected place data back via postMessage
// const buildMapHTML = (pickupLat, pickupLng, dropLat, dropLng) => `
// <!DOCTYPE html>
// <html>
// <head>
// <meta name="viewport" content="width=device-width,initial-scale=1">
// <style>
//   * { margin:0; padding:0; box-sizing:border-box; font-family:Arial,sans-serif; }
//   body { background:#FFF3E8; }

//   .search-wrap {
//     padding: 10px;
//     background: #FFF3E8;
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//   }

//   .input-row {
//     display: flex;
//     align-items: center;
//     background: #fff;
//     border: 1.5px solid #FF6B00;
//     border-radius: 10px;
//     padding: 0 10px;
//     gap: 8px;
//   }

//   .dot {
//     width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0;
//   }
//   .dot-green { background: #28A745; }
//   .dot-red   { background: #FF6B00; }

//   input {
//     flex: 1;
//     height: 42px;
//     border: none;
//     outline: none;
//     font-size: 13px;
//     background: transparent;
//     color: #1A1A1A;
//   }

//   #map { height: 280px; width: 100%; }

//   .pac-container { z-index: 9999 !important; }
// </style>
// </head>
// <body>

// <div class="search-wrap">
//   <div class="input-row">
//     <span class="dot dot-green"></span>
//     <input id="pickup-input" type="text" placeholder="Pickup Location...">
//   </div>
//   <div class="input-row">
//     <span class="dot dot-red"></span>
//     <input id="drop-input" type="text" placeholder="Drop Location...">
//   </div>
// </div>

// <div id="map"></div>

// <script>
// let map, pickupMarker, dropMarker, routeLine;

// const PICKUP_COORDS = { lat: ${pickupLat}, lng: ${pickupLng} };
// const DROP_COORDS   = { lat: ${dropLat},   lng: ${dropLng}   };

// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: 20.5937, lng: 78.9629 },
//     zoom: 5,
//     mapTypeControl: false,
//     fullscreenControl: false,
//     streetViewControl: false,
//     zoomControl: true,
//     styles: [
//       { featureType:'poi', stylers:[{visibility:'off'}] }
//     ]
//   });

//   pickupMarker = new google.maps.Marker({
//     position: PICKUP_COORDS,
//     map,
//     icon: { url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' },
//     title: 'Pickup'
//   });

//   dropMarker = new google.maps.Marker({
//     position: DROP_COORDS,
//     map,
//     icon: { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' },
//     title: 'Drop'
//   });

//   routeLine = new google.maps.Polyline({
//     path: [PICKUP_COORDS, DROP_COORDS],
//     geodesic: true,
//     strokeColor: '#FF6B00',
//     strokeOpacity: 0.9,
//     strokeWeight: 3,
//     map
//   });

//   setupAutocomplete('pickup-input', 'pickup');
//   setupAutocomplete('drop-input', 'drop');
// }

// function setupAutocomplete(inputId, type) {
//   const input = document.getElementById(inputId);
//   const ac = new google.maps.places.Autocomplete(input, {
//     componentRestrictions: { country: 'in' }
//   });
//   ac.bindTo('bounds', map);

//   ac.addListener('place_changed', () => {
//     const place = ac.getPlace();
//     if (!place.geometry?.location) return;

//     const lat = place.geometry.location.lat();
//     const lng = place.geometry.location.lng();
//     const address = place.formatted_address;

//     if (type === 'pickup') {
//       pickupMarker.setPosition({ lat, lng });
//       updateRoute(
//         { lat, lng },
//         dropMarker.getPosition().toJSON()
//       );
//     } else {
//       dropMarker.setPosition({ lat, lng });
//       updateRoute(
//         pickupMarker.getPosition().toJSON(),
//         { lat, lng }
//       );
//     }

//     map.panTo({ lat, lng });
//     map.setZoom(13);

//     // Send data back to React Native
//     const msg = JSON.stringify({ type, lat, lng, address });
//     if (window.ReactNativeWebView) {
//       window.ReactNativeWebView.postMessage(msg);
//     }
//   });
// }

// function updateRoute(p1, p2) {
//   routeLine.setPath([p1, p2]);
// }
// </script>

// <script src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap" async defer></script>
// </body>
// </html>
// `;

// // ─── LOAD TYPES ──────────────────────────────────────────
// const LOAD_TYPES = [
//   'Furniture','Cement','Steel','Electronics','Vegetables',
//   'Fruits','Groceries','Construction Materials','Machinery',
//   'Industrial Goods','Pharmaceuticals','Textiles','Garments','Others',
// ];

// // ─── MAIN COMPONENT ──────────────────────────────────────
// const CreateLoadRequestScreen = ({ navigation }) => {
//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState(null);
//   const [showLoadTypePicker, setShowLoadTypePicker] = useState(false);

//   const [pickupCoords, setPickupCoords] = useState({ latitude: 13.0827, longitude: 80.2707 });
//   const [dropCoords,   setDropCoords]   = useState({ latitude: 12.9716, longitude: 77.5946 });

//   const [formData, setFormData] = useState({
//     customerName: '',
//     phoneNumber: '',
//     alternativePhone: '',
//     pickupLocation: '',
//     dropLocation: '',
//     loadType: 'Furniture',
//     weight: '',
//     distance: '',
//   });

//   // Load saved user data
//   useEffect(() => {
//     (async () => {
//       const raw = await AsyncStorage.getItem('userData');
//       if (raw) {
//         const u = JSON.parse(raw);
//         setFormData(prev => ({
//           ...prev,
//           phoneNumber:  u.phoneNumber || '',
//           customerName: u.name || '',
//         }));
//       }
//     })();
//   }, []);

//   // ── WebView → React Native message handler ──
//   const handleWebViewMessage = async (event) => {
//     try {
//       const { type, lat, lng, address } = JSON.parse(event.nativeEvent.data);

//       if (type === 'pickup') {
//         const newPickup = { latitude: lat, longitude: lng };
//         setPickupCoords(newPickup);
//         setFormData(prev => ({ ...prev, pickupLocation: address }));

//         if (dropCoords.latitude && dropCoords.longitude) {
//           const dist = await getRouteDistance(newPickup, dropCoords);
//           setFormData(prev => ({ ...prev, distance: dist }));
//         }
//       } else {
//         const newDrop = { latitude: lat, longitude: lng };
//         setDropCoords(newDrop);
//         const dist = await getRouteDistance(pickupCoords, newDrop);
//         setFormData(prev => ({ ...prev, dropLocation: address, distance: dist }));
//       }
//     } catch (e) {
//       console.log('WebView message error:', e);
//     }
//   };

//   // ── Image picker ──
//   const pickImage = async () => {
//     const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!perm.granted) return Alert.alert('Permission required');
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ['images'],
//       quality: 0.7,
//     });
//     if (!result.canceled) setImageUri(result.assets[0].uri);
//   };

//   // ── Estimated cost ──
//   const getEstimatedCost = () => {
//     const w = Number(formData.weight);
//     const d = Number(formData.distance);
//     if (!w || !d) return '--';
//     return `₹${Math.round(weightCharge(w) + d * 6)}`;
//   };

//   // ── Submit ──
//   const handleSubmit = async () => {
//     if (!formData.pickupLocation) return Alert.alert('Error', 'Please select pickup location');
//     if (!formData.dropLocation)   return Alert.alert('Error', 'Please select drop location');
//     if (!formData.weight)         return Alert.alert('Error', 'Please enter weight');

//     try {
//       setLoading(true);
//       const customerId = await AsyncStorage.getItem('customerId');
//       const data = new FormData();

//       Object.entries(formData).forEach(([k, v]) => data.append(k, v));
//       data.append('latitude',      pickupCoords.latitude);
//       data.append('longitude',     pickupCoords.longitude);
//       data.append('dropLatitude',  dropCoords.latitude);
//       data.append('dropLongitude', dropCoords.longitude);

//       if (imageUri) {
//         data.append('loadImage', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });
//       }

//       await customerAPI.createLoadRequest(customerId, data);
//       Alert.alert('Success', 'Load request created!');
//       navigation.navigate('MyLoadRequests');
//     } catch (e) {
//       Alert.alert('Error', 'Failed to create load request');
//       console.log(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── Map HTML ──
//   const mapHTML = buildMapHTML(
//     pickupCoords.latitude, pickupCoords.longitude,
//     dropCoords.latitude,   dropCoords.longitude
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

//         {/* ── HEADER ── */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
//             <Text style={styles.backArrow}>←</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Create Load Request</Text>
//         </View>

//         {/* ── GOOGLE MAP WEBVIEW (with Places Autocomplete) ── */}
//         <View style={styles.mapContainer}>
//           <WebView
//             source={{ html: mapHTML }}
//             style={styles.map}
//             javaScriptEnabled
//             domStorageEnabled
//             onMessage={handleWebViewMessage}
//             scrollEnabled={false}
//             showsHorizontalScrollIndicator={false}
//             showsVerticalScrollIndicator={false}
//           />
//         </View>

//         {/* ── SELECTED LOCATIONS DISPLAY ── */}
//         {(formData.pickupLocation || formData.dropLocation) && (
//           <View style={styles.locationsCard}>
//             {formData.pickupLocation ? (
//               <View style={styles.locationRow}>
//                 <View style={[styles.dot, { backgroundColor: Colors.success }]} />
//                 <Text style={styles.locationText} numberOfLines={2}>
//                   {formData.pickupLocation}
//                 </Text>
//               </View>
//             ) : null}
//             {formData.dropLocation ? (
//               <View style={styles.locationRow}>
//                 <View style={[styles.dot, { backgroundColor: Colors.primary }]} />
//                 <Text style={styles.locationText} numberOfLines={2}>
//                   {formData.dropLocation}
//                 </Text>
//               </View>
//             ) : null}
//           </View>
//         )}

//         {/* ── FORM ── */}
//         <View style={styles.form}>

//           {/* Distance (auto) */}
//           <View style={styles.readonlyInput}>
//             <Text style={styles.readonlyLabel}>📏 Distance</Text>
//             <Text style={styles.readonlyValue}>
//               {formData.distance ? `${formData.distance} km` : 'Auto-calculated'}
//             </Text>
//           </View>

//           {/* Customer Name */}
//           <TextInput
//             style={styles.input}
//             placeholder="Customer Name"
//             placeholderTextColor={Colors.gray}
//             value={formData.customerName}
//             onChangeText={(t) => setFormData({ ...formData, customerName: t })}
//           />

//           {/* Phone */}
//           <TextInput
//             style={styles.input}
//             placeholder="Phone Number"
//             placeholderTextColor={Colors.gray}
//             keyboardType="number-pad"
//             maxLength={10}
//             value={formData.phoneNumber}
//             onChangeText={(t) =>
//               setFormData({ ...formData, phoneNumber: t.replace(/[^0-9]/g, '') })
//             }
//           />

//           {/* Alternative Phone */}
//           <TextInput
//             style={styles.input}
//             placeholder="Alternative Phone (Optional)"
//             placeholderTextColor={Colors.gray}
//             keyboardType="number-pad"
//             maxLength={10}
//             value={formData.alternativePhone}
//             onChangeText={(t) =>
//               setFormData({ ...formData, alternativePhone: t.replace(/[^0-9]/g, '') })
//             }
//           />

//           {/* Load Type Picker */}
//           <TouchableOpacity
//             style={styles.pickerBtn}
//             onPress={() => setShowLoadTypePicker(!showLoadTypePicker)}
//           >
//             <Text style={styles.pickerBtnText}>{formData.loadType}</Text>
//             <Text style={{ color: Colors.primary }}>▼</Text>
//           </TouchableOpacity>

//           {showLoadTypePicker && (
//             <View style={styles.pickerDropdown}>
//               <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled>
//                 {LOAD_TYPES.map((lt) => (
//                   <TouchableOpacity
//                     key={lt}
//                     style={[
//                       styles.pickerItem,
//                       formData.loadType === lt && styles.pickerItemActive,
//                     ]}
//                     onPress={() => {
//                       setFormData({ ...formData, loadType: lt });
//                       setShowLoadTypePicker(false);
//                     }}
//                   >
//                     <Text
//                       style={[
//                         styles.pickerItemText,
//                         formData.loadType === lt && { color: Colors.primary, fontWeight: '600' },
//                       ]}
//                     >
//                       {lt}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>
//             </View>
//           )}

//           {/* Weight */}
//           <TextInput
//             style={styles.input}
//             placeholder="Weight (in kg)"
//             placeholderTextColor={Colors.gray}
//             keyboardType="numeric"
//             value={formData.weight}
//             onChangeText={(t) => setFormData({ ...formData, weight: t })}
//           />

//           {/* Image Upload */}
//           {imageUri ? (
//             <View>
//               <Image source={{ uri: imageUri }} style={styles.image} />
//               <TouchableOpacity
//                 style={styles.changeImageBtn}
//                 onPress={pickImage}
//               >
//                 <Text style={styles.changeImageText}>Change Image</Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
//               <Text style={styles.imageBtnIcon}>📷</Text>
//               <Text style={styles.imageBtnText}>Upload Load Image</Text>
//             </TouchableOpacity>
//           )}

//           {/* Estimated Price */}
//           <View style={styles.priceBox}>
//             <View>
//               <Text style={styles.priceLabel}>Estimated Price</Text>
//               <Text style={styles.priceSubLabel}>Based on weight + distance</Text>
//             </View>
//             <Text style={styles.priceValue}>{getEstimatedCost()}</Text>
//           </View>

//           {/* Submit */}
//           <TouchableOpacity
//             style={[styles.submit, loading && { opacity: 0.7 }]}
//             onPress={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color={Colors.white} />
//             ) : (
//               <Text style={styles.submitText}>CREATE LOAD REQUEST</Text>
//             )}
//           </TouchableOpacity>

//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default CreateLoadRequestScreen;

// // ─── STYLES ──────────────────────────────────────────────
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: Colors.bg,
//   },

//   // Header
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: Colors.white,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.border,
//   },
//   backBtn: {
//     marginRight: 12,
//     padding: 4,
//   },
//   backArrow: {
//     fontSize: 20,
//     color: Colors.primary,
//   },
//   headerTitle: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: Colors.black,
//   },

//   // Map
//   mapContainer: {
//     height: 370,
//     margin: 12,
//     borderRadius: 14,
//     overflow: 'hidden',
//     borderWidth: 1.5,
//     borderColor: Colors.primaryLight,
//   },
//   map: {
//     flex: 1,
//   },

//   // Selected locations
//   locationsCard: {
//     marginHorizontal: 12,
//     marginBottom: 4,
//     backgroundColor: Colors.white,
//     borderRadius: 12,
//     padding: 12,
//     borderWidth: 1,
//     borderColor: Colors.border,
//     gap: 8,
//   },
//   locationRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     gap: 8,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginTop: 3,
//     flexShrink: 0,
//   },
//   locationText: {
//     flex: 1,
//     fontSize: 12,
//     color: Colors.black,
//     lineHeight: 18,
//   },

//   // Form
//   form: {
//     padding: 12,
//     gap: 10,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1.5,
//     borderColor: Colors.border,
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     backgroundColor: Colors.white,
//     fontSize: 14,
//     color: Colors.black,
//   },
//   readonlyInput: {
//     height: 50,
//     borderWidth: 1.5,
//     borderColor: Colors.border,
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     backgroundColor: Colors.primaryBg,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   readonlyLabel: {
//     fontSize: 13,
//     color: Colors.primaryDark,
//   },
//   readonlyValue: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: Colors.primary,
//   },

//   // Load type picker
//   pickerBtn: {
//     height: 50,
//     borderWidth: 1.5,
//     borderColor: Colors.border,
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     backgroundColor: Colors.white,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   pickerBtnText: {
//     fontSize: 14,
//     color: Colors.black,
//   },
//   pickerDropdown: {
//     backgroundColor: Colors.white,
//     borderWidth: 1.5,
//     borderColor: Colors.primaryLight,
//     borderRadius: 12,
//     overflow: 'hidden',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.12,
//     shadowRadius: 4,
//   },
//   pickerItem: {
//     padding: 13,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F0E8E0',
//   },
//   pickerItemActive: {
//     backgroundColor: Colors.primaryBg,
//   },
//   pickerItemText: {
//     fontSize: 14,
//     color: Colors.black,
//   },

//   // Image
//   imageBtn: {
//     height: 54,
//     backgroundColor: Colors.primary,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8,
//   },
//   imageBtnIcon: { fontSize: 18 },
//   imageBtnText: {
//     color: Colors.white,
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   image: {
//     height: 200,
//     width: '100%',
//     borderRadius: 12,
//   },
//   changeImageBtn: {
//     marginTop: 6,
//     alignSelf: 'flex-end',
//   },
//   changeImageText: {
//     color: Colors.primary,
//     fontSize: 13,
//     fontWeight: '500',
//   },

//   // Price
//   priceBox: {
//     height: 64,
//     borderWidth: 1.5,
//     borderColor: Colors.primaryLight,
//     borderRadius: 12,
//     backgroundColor: Colors.primaryBg,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 14,
//   },
//   priceLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: Colors.primaryDark,
//   },
//   priceSubLabel: {
//     fontSize: 11,
//     color: Colors.gray,
//     marginTop: 2,
//   },
//   priceValue: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: Colors.primary,
//   },

//   // Submit
//   submit: {
//     height: 54,
//     backgroundColor: Colors.primary,
//     borderRadius: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 4,
//     marginBottom: 24,
//     elevation: 3,
//     shadowColor: Colors.primary,
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.35,
//     shadowRadius: 6,
//   },
//   submitText: {
//     color: Colors.white,
//     fontSize: 15,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },
// });


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
// import { useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { customerAPI } from '../services/api';

// // ─── THEME ───────────────────────────────────────────────
// const Colors = {
//   primary:     '#FF6B00',
//   primaryDark: '#CC4400',
//   primaryLight:'#FFD4A8',
//   primaryBg:   '#FFF3E8',
//   white:       '#FFFFFF',
//   black:       '#1A1A1A',
//   gray:        '#888888',
//   border:      '#E0D8D0',
//   bg:          '#F9F4EF',
//   success:     '#28A745',
// };

// const GOOGLE_MAPS_API_KEY = 'AIzaSyDZwBw_ToWcWIggRVBSFA2Sy7mvEhKZUbU';

// // ─── HELPERS ─────────────────────────────────────────────
// const haversine = (lat1, lon1, lat2, lon2) => {
//   const R = 6371;
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) ** 2;
//   return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
// };

// const getRouteDistance = async (origin, destination) => {
//   try {
//     const res = await axios.get(
//       'https://maps.googleapis.com/maps/api/distancematrix/json',
//       {
//         params: {
//           origins: `${origin.latitude},${origin.longitude}`,
//           destinations: `${destination.latitude},${destination.longitude}`,
//           key: GOOGLE_MAPS_API_KEY,
//           units: 'metric',
//         },
//       }
//     );
//     const el = res.data.rows[0]?.elements[0];
//     if (el?.status === 'OK') return (el.distance.value / 1000).toFixed(2);
//   } catch (_) {}
//   return haversine(
//     origin.latitude, origin.longitude,
//     destination.latitude, destination.longitude
//   );
// };

// const weightCharge = (w) => {
//   if (w <= 500)  return 200;
//   if (w <= 1000) return 400;
//   if (w <= 1500) return 600;
//   return 800;
// };

// const LOAD_TYPES = [
//   'Furniture','Cement','Steel','Electronics','Vegetables',
//   'Fruits','Groceries','Construction Materials','Machinery',
//   'Industrial Goods','Pharmaceuticals','Textiles','Garments','Others',
// ];

// // ─── WEB MAP COMPONENT ───────────────────────────────────
// // Uses Google Maps JS API directly injected into the DOM (web only)
// const WebMapView = ({ onPickupSelect, onDropSelect, pickupCoords, dropCoords }) => {
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const pickupMarkerRef = useRef(null);
//   const dropMarkerRef = useRef(null);
//   const polylineRef = useRef(null);

//   const initMap = () => {
//     if (!mapRef.current || mapInstanceRef.current) return;

//     const map = new window.google.maps.Map(mapRef.current, {
//       center: { lat: 20.5937, lng: 78.9629 },
//       zoom: 5,
//       mapTypeControl: false,
//       fullscreenControl: false,
//       streetViewControl: false,
//     });
//     mapInstanceRef.current = map;

//     pickupMarkerRef.current = new window.google.maps.Marker({
//       position: { lat: pickupCoords.latitude, lng: pickupCoords.longitude },
//       map,
//       icon: { url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' },
//     });

//     dropMarkerRef.current = new window.google.maps.Marker({
//       position: { lat: dropCoords.latitude, lng: dropCoords.longitude },
//       map,
//       icon: { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' },
//     });

//     polylineRef.current = new window.google.maps.Polyline({
//       path: [
//         { lat: pickupCoords.latitude, lng: pickupCoords.longitude },
//         { lat: dropCoords.latitude,   lng: dropCoords.longitude },
//       ],
//       strokeColor: '#FF6B00',
//       strokeOpacity: 0.9,
//       strokeWeight: 3,
//       map,
//     });

//     // Pickup Autocomplete
//     const pickupInput = document.getElementById('pickup-search-input');
//     if (pickupInput) {
//       const pickupAC = new window.google.maps.places.Autocomplete(pickupInput, {
//         componentRestrictions: { country: 'in' },
//       });
//       pickupAC.bindTo('bounds', map);
//       pickupAC.addListener('place_changed', () => {
//         const place = pickupAC.getPlace();
//         if (!place.geometry?.location) return;
//         const lat = place.geometry.location.lat();
//         const lng = place.geometry.location.lng();
//         const address = place.formatted_address;
//         pickupMarkerRef.current.setPosition({ lat, lng });
//         polylineRef.current.setPath([
//           { lat, lng },
//           dropMarkerRef.current.getPosition().toJSON(),
//         ]);
//         map.panTo({ lat, lng });
//         map.setZoom(13);
//         onPickupSelect({ lat, lng, address });
//       });
//     }

//     // Drop Autocomplete
//     const dropInput = document.getElementById('drop-search-input');
//     if (dropInput) {
//       const dropAC = new window.google.maps.places.Autocomplete(dropInput, {
//         componentRestrictions: { country: 'in' },
//       });
//       dropAC.bindTo('bounds', map);
//       dropAC.addListener('place_changed', () => {
//         const place = dropAC.getPlace();
//         if (!place.geometry?.location) return;
//         const lat = place.geometry.location.lat();
//         const lng = place.geometry.location.lng();
//         const address = place.formatted_address;
//         dropMarkerRef.current.setPosition({ lat, lng });
//         polylineRef.current.setPath([
//           pickupMarkerRef.current.getPosition().toJSON(),
//           { lat, lng },
//         ]);
//         map.panTo({ lat, lng });
//         map.setZoom(13);
//         onDropSelect({ lat, lng, address });
//       });
//     }
//   };

//   useEffect(() => {
//     const tryInit = () => {
//       if (window.google && window.google.maps) {
//         initMap();
//         return true;
//       }
//       return false;
//     };

//     if (tryInit()) return;

//     // Load script if not already
//     const scriptId = 'google-maps-script';
//     if (!document.getElementById(scriptId)) {
//       window.__initGoogleMapCallback = () => initMap();
//       const script = document.createElement('script');
//       script.id = scriptId;
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=__initGoogleMapCallback`;
//       script.async = true;
//       script.defer = true;
//       document.head.appendChild(script);
//     } else {
//       // Script already added, poll until ready
//       const iv = setInterval(() => {
//         if (tryInit()) clearInterval(iv);
//       }, 200);
//     }
//   }, []);

//   // Render using raw DOM elements (web only)
//   return (
//     <div style={{
//       display: 'flex', flexDirection: 'column', gap: 8,
//       padding: 10, background: '#FFF3E8', borderRadius: 14,
//     }}>
//       {/* Pickup Input */}
//       <div style={{
//         display: 'flex', alignItems: 'center', background: '#fff',
//         border: '1.5px solid #FF6B00', borderRadius: 10, padding: '0 10px', gap: 8,
//       }}>
//         <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28A745', flexShrink: 0 }} />
//         <input
//           id="pickup-search-input"
//           type="text"
//           placeholder="🔍 Search Pickup Location..."
//           style={{
//             flex: 1, height: 42, border: 'none', outline: 'none',
//             fontSize: 13, background: 'transparent', color: '#1A1A1A',
//           }}
//         />
//       </div>

//       {/* Drop Input */}
//       <div style={{
//         display: 'flex', alignItems: 'center', background: '#fff',
//         border: '1.5px solid #FF6B00', borderRadius: 10, padding: '0 10px', gap: 8,
//       }}>
//         <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF6B00', flexShrink: 0 }} />
//         <input
//           id="drop-search-input"
//           type="text"
//           placeholder="🔍 Search Drop Location..."
//           style={{
//             flex: 1, height: 42, border: 'none', outline: 'none',
//             fontSize: 13, background: 'transparent', color: '#1A1A1A',
//           }}
//         />
//       </div>

//       {/* Map container */}
//       <div
//         ref={mapRef}
//         style={{
//           height: 280, width: '100%', borderRadius: 10,
//           overflow: 'hidden', border: '1px solid #FFD4A8',
//         }}
//       />
//     </div>
//   );
// };

// // ─── NATIVE MAP HTML (for WebView) ───────────────────────
// const buildMapHTML = (pickupLat, pickupLng, dropLat, dropLng) => `
// <!DOCTYPE html><html>
// <head>
// <meta name="viewport" content="width=device-width,initial-scale=1">
// <style>
// *{margin:0;padding:0;box-sizing:border-box;font-family:Arial,sans-serif;}
// body{background:#FFF3E8;}
// .wrap{padding:10px;display:flex;flex-direction:column;gap:8px;}
// .row{display:flex;align-items:center;background:#fff;border:1.5px solid #FF6B00;border-radius:10px;padding:0 10px;gap:8px;}
// .dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
// .g{background:#28A745;}.o{background:#FF6B00;}
// input{flex:1;height:42px;border:none;outline:none;font-size:13px;background:transparent;color:#1A1A1A;}
// #map{height:260px;width:100%;}
// </style>
// </head>
// <body>
// <div class="wrap">
//   <div class="row"><span class="dot g"></span><input id="pi" type="text" placeholder="Pickup Location..."></div>
//   <div class="row"><span class="dot o"></span><input id="di" type="text" placeholder="Drop Location..."></div>
// </div>
// <div id="map"></div>
// <script>
// let map,pm,dm,rl;
// function initMap(){
//   map=new google.maps.Map(document.getElementById('map'),{center:{lat:20.5937,lng:78.9629},zoom:5,mapTypeControl:false,fullscreenControl:false,streetViewControl:false});
//   pm=new google.maps.Marker({position:{lat:${pickupLat},lng:${pickupLng}},map,icon:{url:'https://maps.google.com/mapfiles/ms/icons/green-dot.png'}});
//   dm=new google.maps.Marker({position:{lat:${dropLat},lng:${dropLng}},map,icon:{url:'https://maps.google.com/mapfiles/ms/icons/red-dot.png'}});
//   rl=new google.maps.Polyline({path:[{lat:${pickupLat},lng:${pickupLng}},{lat:${dropLat},lng:${dropLng}}],strokeColor:'#FF6B00',strokeOpacity:0.9,strokeWeight:3,map});
//   setup('pi','pickup');
//   setup('di','drop');
// }
// function setup(id,type){
//   const inp=document.getElementById(id);
//   const ac=new google.maps.places.Autocomplete(inp,{componentRestrictions:{country:'in'}});
//   ac.bindTo('bounds',map);
//   ac.addListener('place_changed',()=>{
//     const p=ac.getPlace();
//     if(!p.geometry?.location)return;
//     const lat=p.geometry.location.lat(),lng=p.geometry.location.lng(),address=p.formatted_address;
//     if(type==='pickup'){pm.setPosition({lat,lng});rl.setPath([{lat,lng},dm.getPosition().toJSON()]);}
//     else{dm.setPosition({lat,lng});rl.setPath([pm.getPosition().toJSON(),{lat,lng}]);}
//     map.panTo({lat,lng});map.setZoom(13);
//     if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage(JSON.stringify({type,lat,lng,address}));
//   });
// }
// </script>
// <script src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap" async defer></script>
// </body></html>`;

// // ─── MAIN COMPONENT ──────────────────────────────────────
// const CreateLoadRequestScreen = ({ navigation }) => {
//   const [loading, setLoading]   = useState(false);
//   const [imageUri, setImageUri] = useState(null);
//   const [showLoadTypePicker, setShowLoadTypePicker] = useState(false);

//   const [pickupCoords, setPickupCoords] = useState({ latitude: 13.0827, longitude: 80.2707 });
//   const [dropCoords,   setDropCoords]   = useState({ latitude: 12.9716, longitude: 77.5946 });

//   const [formData, setFormData] = useState({
//     customerName: '', phoneNumber: '', alternativePhone: '',
//     pickupLocation: '', dropLocation: '',
//     loadType: 'Furniture', weight: '', distance: '',
//   });

//   useEffect(() => {
//     (async () => {
//       const raw = await AsyncStorage.getItem('userData');
//       if (raw) {
//         const u = JSON.parse(raw);
//         setFormData(prev => ({ ...prev, phoneNumber: u.phoneNumber || '', customerName: u.name || '' }));
//       }
//     })();
//   }, []);

//   const handlePickupSelect = async ({ lat, lng, address }) => {
//     const newPickup = { latitude: lat, longitude: lng };
//     setPickupCoords(newPickup);
//     setFormData(prev => ({ ...prev, pickupLocation: address }));
//     if (dropCoords.latitude) {
//       const dist = await getRouteDistance(newPickup, dropCoords);
//       setFormData(prev => ({ ...prev, distance: dist }));
//     }
//   };

//   const handleDropSelect = async ({ lat, lng, address }) => {
//     const newDrop = { latitude: lat, longitude: lng };
//     setDropCoords(newDrop);
//     const dist = await getRouteDistance(pickupCoords, newDrop);
//     setFormData(prev => ({ ...prev, dropLocation: address, distance: dist }));
//   };

//   // Native WebView message
//   const handleWebViewMessage = async (event) => {
//     try {
//       const { type, lat, lng, address } = JSON.parse(event.nativeEvent.data);
//       if (type === 'pickup') await handlePickupSelect({ lat, lng, address });
//       else await handleDropSelect({ lat, lng, address });
//     } catch (e) { console.log(e); }
//   };

//   const pickImage = async () => {
//     const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!perm.granted) return Alert.alert('Permission required');
//     const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
//     if (!result.canceled) setImageUri(result.assets[0].uri);
//   };

//   const getEstimatedCost = () => {
//     const w = Number(formData.weight), d = Number(formData.distance);
//     if (!w || !d) return '--';
//     return `₹${Math.round(weightCharge(w) + d * 6)}`;
//   };

//   const handleSubmit = async () => {
//     if (!formData.pickupLocation) return Alert.alert('Error', 'Please select pickup location');
//     if (!formData.dropLocation)   return Alert.alert('Error', 'Please select drop location');
//     if (!formData.weight)         return Alert.alert('Error', 'Please enter weight');
//     try {
//       setLoading(true);
//       const customerId = await AsyncStorage.getItem('customerId');
//       const data = new FormData();
//       Object.entries(formData).forEach(([k, v]) => data.append(k, v));
//       data.append('latitude', pickupCoords.latitude);
//       data.append('longitude', pickupCoords.longitude);
//       data.append('dropLatitude', dropCoords.latitude);
//       data.append('dropLongitude', dropCoords.longitude);
//       if (imageUri) data.append('loadImage', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });
//       await customerAPI.createLoadRequest(customerId, data);
//       Alert.alert('Success', 'Load request created!');
//       navigation.navigate('MyLoadRequests');
//     } catch (e) {
//       Alert.alert('Error', 'Failed to create load request');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── Platform-based map render ──
//   const renderMap = () => {
//     if (Platform.OS === 'web') {
//       return (
//         <WebMapView
//           pickupCoords={pickupCoords}
//           dropCoords={dropCoords}
//           onPickupSelect={handlePickupSelect}
//           onDropSelect={handleDropSelect}
//         />
//       );
//     }
//     // Native only — lazy require so web bundle doesn't include it
//     const { WebView } = require('react-native-webview');
//     return (
//       <View style={styles.mapContainer}>
//         <WebView
//           source={{ html: buildMapHTML(pickupCoords.latitude, pickupCoords.longitude, dropCoords.latitude, dropCoords.longitude) }}
//           style={styles.map}
//           javaScriptEnabled
//           domStorageEnabled
//           onMessage={handleWebViewMessage}
//           scrollEnabled={false}
//         />
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

//         {/* HEADER */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
//             <Text style={styles.backArrow}>←</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Create Load Request</Text>
//         </View>

//         {/* MAP */}
//         <View style={styles.mapWrapper}>{renderMap()}</View>

//         {/* LOCATION DISPLAY */}
//         {(formData.pickupLocation || formData.dropLocation) && (
//           <View style={styles.locationsCard}>
//             {formData.pickupLocation ? (
//               <View style={styles.locationRow}>
//                 <View style={[styles.dot, { backgroundColor: Colors.success }]} />
//                 <Text style={styles.locationText} numberOfLines={2}>{formData.pickupLocation}</Text>
//               </View>
//             ) : null}
//             {formData.dropLocation ? (
//               <View style={styles.locationRow}>
//                 <View style={[styles.dot, { backgroundColor: Colors.primary }]} />
//                 <Text style={styles.locationText} numberOfLines={2}>{formData.dropLocation}</Text>
//               </View>
//             ) : null}
//           </View>
//         )}

//         {/* FORM */}
//         <View style={styles.form}>

//           <View style={styles.readonlyInput}>
//             <Text style={styles.readonlyLabel}>📏 Distance</Text>
//             <Text style={styles.readonlyValue}>
//               {formData.distance ? `${formData.distance} km` : 'Auto-calculated'}
//             </Text>
//           </View>

//           <TextInput style={styles.input} placeholder="Customer Name" placeholderTextColor={Colors.gray}
//             value={formData.customerName} onChangeText={(t) => setFormData({ ...formData, customerName: t })} />

//           <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor={Colors.gray}
//             keyboardType="number-pad" maxLength={10} value={formData.phoneNumber}
//             onChangeText={(t) => setFormData({ ...formData, phoneNumber: t.replace(/[^0-9]/g, '') })} />

//           <TextInput style={styles.input} placeholder="Alternative Phone (Optional)" placeholderTextColor={Colors.gray}
//             keyboardType="number-pad" maxLength={10} value={formData.alternativePhone}
//             onChangeText={(t) => setFormData({ ...formData, alternativePhone: t.replace(/[^0-9]/g, '') })} />

//           <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowLoadTypePicker(!showLoadTypePicker)}>
//             <Text style={styles.pickerBtnText}>{formData.loadType}</Text>
//             <Text style={{ color: Colors.primary }}>{showLoadTypePicker ? '▲' : '▼'}</Text>
//           </TouchableOpacity>

//           {showLoadTypePicker && (
//             <View style={styles.pickerDropdown}>
//               <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled>
//                 {LOAD_TYPES.map((lt) => (
//                   <TouchableOpacity key={lt}
//                     style={[styles.pickerItem, formData.loadType === lt && styles.pickerItemActive]}
//                     onPress={() => { setFormData({ ...formData, loadType: lt }); setShowLoadTypePicker(false); }}>
//                     <Text style={[styles.pickerItemText, formData.loadType === lt && { color: Colors.primary, fontWeight: '600' }]}>{lt}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>
//             </View>
//           )}

//           <TextInput style={styles.input} placeholder="Weight (in kg)" placeholderTextColor={Colors.gray}
//             keyboardType="numeric" value={formData.weight}
//             onChangeText={(t) => setFormData({ ...formData, weight: t })} />

//           {imageUri ? (
//             <View>
//               <Image source={{ uri: imageUri }} style={styles.image} />
//               <TouchableOpacity style={styles.changeImageBtn} onPress={pickImage}>
//                 <Text style={styles.changeImageText}>Change Image</Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
//               <Text style={styles.imageBtnText}>📷  Upload Load Image</Text>
//             </TouchableOpacity>
//           )}

//           <View style={styles.priceBox}>
//             <View>
//               <Text style={styles.priceLabel}>Estimated Price</Text>
//               <Text style={styles.priceSubLabel}>Weight + Distance based</Text>
//             </View>
//             <Text style={styles.priceValue}>{getEstimatedCost()}</Text>
//           </View>

//           <TouchableOpacity style={[styles.submit, loading && { opacity: 0.7 }]} onPress={handleSubmit} disabled={loading}>
//             {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.submitText}>CREATE LOAD REQUEST</Text>}
//           </TouchableOpacity>

//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default CreateLoadRequestScreen;

// // ─── STYLES ──────────────────────────────────────────────
// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: Colors.bg },
//   header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
//   backBtn: { marginRight: 12, padding: 4 },
//   backArrow: { fontSize: 20, color: Colors.primary },
//   headerTitle: { fontSize: 17, fontWeight: '600', color: Colors.black },
//   mapWrapper: { margin: 12 },
//   mapContainer: { height: 370, borderRadius: 14, overflow: 'hidden', borderWidth: 1.5, borderColor: Colors.primaryLight },
//   map: { flex: 1 },
//   locationsCard: { marginHorizontal: 12, marginBottom: 4, backgroundColor: Colors.white, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: Colors.border, gap: 8 },
//   locationRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
//   dot: { width: 10, height: 10, borderRadius: 5, marginTop: 3, flexShrink: 0 },
//   locationText: { flex: 1, fontSize: 12, color: Colors.black, lineHeight: 18 },
//   form: { padding: 12, gap: 10 },
//   input: { height: 50, borderWidth: 1.5, borderColor: Colors.border, borderRadius: 12, paddingHorizontal: 14, backgroundColor: Colors.white, fontSize: 14, color: Colors.black },
//   readonlyInput: { height: 50, borderWidth: 1.5, borderColor: Colors.border, borderRadius: 12, paddingHorizontal: 14, backgroundColor: Colors.primaryBg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
//   readonlyLabel: { fontSize: 13, color: Colors.primaryDark },
//   readonlyValue: { fontSize: 14, fontWeight: '600', color: Colors.primary },
//   pickerBtn: { height: 50, borderWidth: 1.5, borderColor: Colors.border, borderRadius: 12, paddingHorizontal: 14, backgroundColor: Colors.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
//   pickerBtnText: { fontSize: 14, color: Colors.black },
//   pickerDropdown: { backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.primaryLight, borderRadius: 12, overflow: 'hidden', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 4 },
//   pickerItem: { padding: 13, borderBottomWidth: 1, borderBottomColor: '#F0E8E0' },
//   pickerItemActive: { backgroundColor: Colors.primaryBg },
//   pickerItemText: { fontSize: 14, color: Colors.black },
//   imageBtn: { height: 54, backgroundColor: Colors.primary, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
//   imageBtnText: { color: Colors.white, fontSize: 14, fontWeight: '600' },
//   image: { height: 200, width: '100%', borderRadius: 12 },
//   changeImageBtn: { marginTop: 6, alignSelf: 'flex-end' },
//   changeImageText: { color: Colors.primary, fontSize: 13, fontWeight: '500' },
//   priceBox: { height: 64, borderWidth: 1.5, borderColor: Colors.primaryLight, borderRadius: 12, backgroundColor: Colors.primaryBg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14 },
//   priceLabel: { fontSize: 14, fontWeight: '600', color: Colors.primaryDark },
//   priceSubLabel: { fontSize: 11, color: Colors.gray, marginTop: 2 },
//   priceValue: { fontSize: 22, fontWeight: '700', color: Colors.primary },
//   submit: { height: 54, backgroundColor: Colors.primary, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 4, marginBottom: 24, elevation: 3, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.35, shadowRadius: 6 },
//   submitText: { color: Colors.white, fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
// });

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
// import { useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { customerAPI } from '../services/api';
 
// const C = {
//   primary:      '#FF6A00',
//   primaryLight: '#FFF4EC',
//   white:        '#FFFFFF',
//   textPrimary:  '#111111',
//   textSecondary:'#666666',
//   border:       '#EEEEEE',
//   bg:           '#F8F8F8',
//   success:      '#22C55E',
// };
 
// const GOOGLE_MAPS_API_KEY = 'AIzaSyDZwBw_ToWcWIggRVBSFA2Sy7mvEhKZUbU';
 
// const haversine = (lat1, lon1, lat2, lon2) => {
//   const R = 6371, dLat = ((lat2 - lat1) * Math.PI) / 180, dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
//   return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
// };
 
// const getRouteDistance = async (origin, dest) => {
//   try {
//     const res = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
//       params: { origins: `${origin.latitude},${origin.longitude}`, destinations: `${dest.latitude},${dest.longitude}`, key: GOOGLE_MAPS_API_KEY, units: 'metric' },
//     });
//     const el = res.data.rows[0]?.elements[0];
//     if (el?.status === 'OK') return (el.distance.value / 1000).toFixed(2);
//   } catch (_) {}
//   return haversine(origin.latitude, origin.longitude, dest.latitude, dest.longitude);
// };
 
// const weightCharge = (w) => { if (w <= 500) return 200; if (w <= 1000) return 400; if (w <= 1500) return 600; return 800; };
 
// const LOAD_TYPES = ['Furniture','Cement','Steel','Electronics','Vegetables','Fruits','Groceries','Construction Materials','Machinery','Industrial Goods','Pharmaceuticals','Textiles','Garments','Others'];
 
// // ─── WEB MAP COMPONENT ───────────────────────────────────
// const WebMapView = ({ onPickupSelect, onDropSelect, pickupCoords, dropCoords }) => {
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const pickupMarkerRef = useRef(null);
//   const dropMarkerRef = useRef(null);
//   const polylineRef = useRef(null);
 
//   const initMap = () => {
//     if (!mapRef.current || mapInstanceRef.current) return;
//     const map = new window.google.maps.Map(mapRef.current, { center: { lat: 20.5937, lng: 78.9629 }, zoom: 5, mapTypeControl: false, fullscreenControl: false, streetViewControl: false });
//     mapInstanceRef.current = map;
//     pickupMarkerRef.current = new window.google.maps.Marker({ position: { lat: pickupCoords.latitude, lng: pickupCoords.longitude }, map, icon: { url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' } });
//     dropMarkerRef.current = new window.google.maps.Marker({ position: { lat: dropCoords.latitude, lng: dropCoords.longitude }, map, icon: { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' } });
//     polylineRef.current = new window.google.maps.Polyline({ path: [{ lat: pickupCoords.latitude, lng: pickupCoords.longitude }, { lat: dropCoords.latitude, lng: dropCoords.longitude }], strokeColor: '#FF6A00', strokeOpacity: 0.9, strokeWeight: 3, map });
 
//     ['pickup-search-input', 'drop-search-input'].forEach((id, idx) => {
//       const inp = document.getElementById(id);
//       if (!inp) return;
//       const ac = new window.google.maps.places.Autocomplete(inp, { componentRestrictions: { country: 'in' } });
//       ac.bindTo('bounds', map);
//       ac.addListener('place_changed', () => {
//         const place = ac.getPlace();
//         if (!place.geometry?.location) return;
//         const lat = place.geometry.location.lat(), lng = place.geometry.location.lng(), address = place.formatted_address;
//         if (idx === 0) {
//           pickupMarkerRef.current.setPosition({ lat, lng });
//           polylineRef.current.setPath([{ lat, lng }, dropMarkerRef.current.getPosition().toJSON()]);
//           onPickupSelect({ lat, lng, address });
//         } else {
//           dropMarkerRef.current.setPosition({ lat, lng });
//           polylineRef.current.setPath([pickupMarkerRef.current.getPosition().toJSON(), { lat, lng }]);
//           onDropSelect({ lat, lng, address });
//         }
//         map.panTo({ lat, lng }); map.setZoom(13);
//       });
//     });
//   };
 
//   useEffect(() => {
//     if (window.google?.maps) { initMap(); return; }
//     const scriptId = 'google-maps-script';
//     if (!document.getElementById(scriptId)) {
//       window.__initGoogleMapCallback = () => initMap();
//       const script = document.createElement('script');
//       script.id = scriptId;
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=__initGoogleMapCallback`;
//       script.async = true; script.defer = true;
//       document.head.appendChild(script);
//     } else {
//       const iv = setInterval(() => { if (window.google?.maps) { initMap(); clearInterval(iv); } }, 200);
//     }
//   }, []);
 
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//       {[{ id: 'pickup-search-input', dot: '#22C55E', ph: '🟢 Pickup location...' }, { id: 'drop-search-input', dot: '#FF6A00', ph: '🔴 Drop location...' }].map((row) => (
//         <div key={row.id} style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1.5px solid #EEEEEE', borderRadius: 12, padding: '0 12px', gap: 8 }}>
//           <div style={{ width: 10, height: 10, borderRadius: '50%', background: row.dot, flexShrink: 0 }} />
//           <input id={row.id} type="text" placeholder={row.ph} style={{ flex: 1, height: 46, border: 'none', outline: 'none', fontSize: 14, background: 'transparent', color: '#111' }} />
//         </div>
//       ))}
//       <div ref={mapRef} style={{ height: 260, width: '100%', borderRadius: 12, overflow: 'hidden', border: '1px solid #EEEEEE' }} />
//     </div>
//   );
// };
 
// const buildMapHTML = (pLat, pLng, dLat, dLng) => `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{margin:0;padding:0;box-sizing:border-box;font-family:Arial,sans-serif;}body{background:#F8F8F8;}.wrap{padding:10px;display:flex;flex-direction:column;gap:8px;}.row{display:flex;align-items:center;background:#fff;border:1.5px solid #EEEEEE;border-radius:12px;padding:0 12px;gap:8px;}.dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}.g{background:#22C55E;}.o{background:#FF6A00;}input{flex:1;height:44px;border:none;outline:none;font-size:14px;background:transparent;color:#111;}#map{height:250px;width:100%;}</style></head><body><div class="wrap"><div class="row"><span class="dot g"></span><input id="pi" type="text" placeholder="Pickup Location..."></div><div class="row"><span class="dot o"></span><input id="di" type="text" placeholder="Drop Location..."></div></div><div id="map"></div><script>let map,pm,dm,rl;function initMap(){map=new google.maps.Map(document.getElementById('map'),{center:{lat:20.5937,lng:78.9629},zoom:5,mapTypeControl:false,fullscreenControl:false,streetViewControl:false});pm=new google.maps.Marker({position:{lat:${pLat},lng:${pLng}},map,icon:{url:'https://maps.google.com/mapfiles/ms/icons/green-dot.png'}});dm=new google.maps.Marker({position:{lat:${dLat},lng:${dLng}},map,icon:{url:'https://maps.google.com/mapfiles/ms/icons/red-dot.png'}});rl=new google.maps.Polyline({path:[{lat:${pLat},lng:${pLng}},{lat:${dLat},lng:${dLng}}],strokeColor:'#FF6A00',strokeOpacity:0.9,strokeWeight:3,map});setup('pi','pickup');setup('di','drop');}function setup(id,type){const inp=document.getElementById(id);const ac=new google.maps.places.Autocomplete(inp,{componentRestrictions:{country:'in'}});ac.bindTo('bounds',map);ac.addListener('place_changed',()=>{const p=ac.getPlace();if(!p.geometry?.location)return;const lat=p.geometry.location.lat(),lng=p.geometry.location.lng(),address=p.formatted_address;if(type==='pickup'){pm.setPosition({lat,lng});rl.setPath([{lat,lng},dm.getPosition().toJSON()]);}else{dm.setPosition({lat,lng});rl.setPath([pm.getPosition().toJSON(),{lat,lng}]);}map.panTo({lat,lng});map.setZoom(13);if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage(JSON.stringify({type,lat,lng,address}));});}</script><script src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap" async defer></script></body></html>`;
 
// // ─── MAIN COMPONENT ──────────────────────────────────────
// const CreateLoadRequestScreen = ({ navigation }) => {
//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState(null);
//   const [showLoadTypePicker, setShowLoadTypePicker] = useState(false);
//   const [pickupCoords, setPickupCoords] = useState({ latitude: 13.0827, longitude: 80.2707 });
//   const [dropCoords, setDropCoords]     = useState({ latitude: 12.9716, longitude: 77.5946 });
//   const [formData, setFormData] = useState({ customerName: '', phoneNumber: '', alternativePhone: '', pickupLocation: '', dropLocation: '', loadType: 'Furniture', weight: '', distance: '' });
 
//   useEffect(() => {
//     (async () => {
//       const raw = await AsyncStorage.getItem('userData');
//       if (raw) { const u = JSON.parse(raw); setFormData(prev => ({ ...prev, phoneNumber: u.phoneNumber || '', customerName: u.name || '' })); }
//     })();
//   }, []);
 
//   const handlePickupSelect = async ({ lat, lng, address }) => {
//     const newPickup = { latitude: lat, longitude: lng };
//     setPickupCoords(newPickup);
//     setFormData(prev => ({ ...prev, pickupLocation: address }));
//     if (dropCoords.latitude) { const dist = await getRouteDistance(newPickup, dropCoords); setFormData(prev => ({ ...prev, distance: dist })); }
//   };
 
//  const handleDropSelect = async ({ lat, lng, address }) => {
//     const newDrop = { latitude: lat, longitude: lng };
//     setDropCoords(newDrop);
//     const dist = await getRouteDistance(pickupCoords, newDrop);
//     setFormData(prev => ({ ...prev, dropLocation: address, distance: dist }));
//   };  
 
//   const handleWebViewMessage = async (event) => {
//     try {
//       const { type, lat, lng, address } = JSON.parse(event.nativeEvent.data);
//       if (type === 'pickup') await handlePickupSelect({ lat, lng, address });
//       else await handleDropSelect({ lat, lng, address });
//     } catch (e) {}
//   };
 
//   const pickImage = async () => {
//     const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!perm.granted) return Alert.alert('Permission required');
//     const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
//     if (!result.canceled) setImageUri(result.assets[0].uri);
//   };
 
//   const getEstimatedCost = () => {
//     const w = Number(formData.weight), d = Number(formData.distance);
//     if (!w || !d) return '--';
//     return `₹${Math.round(weightCharge(w) + d * 6)}`;
//   };
 
//   const handleSubmit = async () => {
//     if (!formData.pickupLocation) return Alert.alert('Error', 'Please select pickup location');
//     if (!formData.dropLocation)   return Alert.alert('Error', 'Please select drop location');
//     if (!formData.weight)         return Alert.alert('Error', 'Please enter weight');
//     try {
//       setLoading(true);
//       const customerId = await AsyncStorage.getItem('customerId');
//       const data = new FormData();
//       Object.entries(formData).forEach(([k, v]) => data.append(k, v));
//       data.append('latitude', pickupCoords.latitude); data.append('longitude', pickupCoords.longitude);
//       data.append('dropLatitude', dropCoords.latitude); data.append('dropLongitude', dropCoords.longitude);
//       if (imageUri) data.append('loadImage', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });
//       await customerAPI.createLoadRequest(customerId, data);
//       Alert.alert('Success 🎉', 'Load request created!');
//       navigation.navigate('MyLoadRequests');
//     } catch (e) {
//       Alert.alert('Error', 'Failed to create load request');
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const renderMap = () => {
//     if (Platform.OS === 'web') {
//       return <WebMapView pickupCoords={pickupCoords} dropCoords={dropCoords} onPickupSelect={handlePickupSelect} onDropSelect={handleDropSelect} />;
//     }
//     const { WebView } = require('react-native-webview');
//     return (
//       <View style={S.mapContainer}>
//         <WebView source={{ html: buildMapHTML(pickupCoords.latitude, pickupCoords.longitude, dropCoords.latitude, dropCoords.longitude) }}
//           style={S.map} javaScriptEnabled domStorageEnabled onMessage={handleWebViewMessage} scrollEnabled={false} />
//       </View>
//     );
//   };
 
//   const fd = (field, val) => setFormData(prev => ({ ...prev, [field]: val }));
 
//   return (
//     <SafeAreaView style={S.safe}>
//       <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
 
//         {/* HEADER */}
//         <View style={S.header}>
//           <TouchableOpacity style={S.backBtn} onPress={() => navigation.goBack()}>
//             <Text style={S.backArrow}>←</Text>
//           </TouchableOpacity>
//           <View>
//             <Text style={S.headerTitle}>Create Load Request</Text>
//             <Text style={S.headerSub}>Fill in the details below</Text>
//           </View>
//         </View>
 
//         {/* MAP */}
//         <View style={S.mapWrapper}>{renderMap()}</View>
 
//         {/* LOCATION DISPLAY */}
//         {(formData.pickupLocation || formData.dropLocation) && (
//           <View style={S.locCard}>
//             {formData.pickupLocation ? (
//               <View style={S.locRow}><View style={[S.locDot, { backgroundColor: C.success }]} /><Text style={S.locText} numberOfLines={2}>{formData.pickupLocation}</Text></View>
//             ) : null}
//             {formData.dropLocation ? (
//               <View style={S.locRow}><View style={[S.locDot, { backgroundColor: C.primary }]} /><Text style={S.locText} numberOfLines={2}>{formData.dropLocation}</Text></View>
//             ) : null}
//           </View>
//         )}
 
//         {/* FORM */}
//         <View style={S.form}>
 
//           {/* Distance */}
//           <View style={S.readonlyField}>
//             <Text style={S.readonlyLabel}>📏 Distance</Text>
//             <Text style={S.readonlyValue}>{formData.distance ? `${formData.distance} km` : 'Auto-calculated'}</Text>
//           </View>
 
//           {[
//             { label: 'Customer Name', field: 'customerName', placeholder: 'Your name', keyboard: 'default' },
//             { label: 'Phone Number', field: 'phoneNumber', placeholder: '10-digit mobile', keyboard: 'number-pad', max: 10 },
//             { label: 'Alternative Phone (Optional)', field: 'alternativePhone', placeholder: 'Alternative number', keyboard: 'number-pad', max: 10 },
//             { label: 'Weight (kg)', field: 'weight', placeholder: 'Enter weight in kg', keyboard: 'numeric' },
//           ].map(({ label, field, placeholder, keyboard, max }) => (
//             <View key={field} style={S.fieldWrap}>
//               <Text style={S.label}>{label}</Text>
//               <TextInput
//                 style={S.input}
//                 placeholder={placeholder}
//                 placeholderTextColor="#999"
//                 keyboardType={keyboard}
//                 maxLength={max}
//                 value={formData[field]}
//                 onChangeText={t => fd(field, keyboard === 'number-pad' || keyboard === 'numeric' ? t.replace(/[^0-9]/g, '') : t)}
//               />
//             </View>
//           ))}
 
//           {/* Load Type Picker */}
//           <View style={S.fieldWrap}>
//             <Text style={S.label}>Load Type</Text>
//             <TouchableOpacity style={S.pickerBtn} onPress={() => setShowLoadTypePicker(!showLoadTypePicker)}>
//               <Text style={S.pickerBtnText}>{formData.loadType}</Text>
//               <Text style={{ color: C.primary }}>{showLoadTypePicker ? '▲' : '▼'}</Text>
//             </TouchableOpacity>
//             {showLoadTypePicker && (
//               <View style={S.pickerDropdown}>
//                 <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled>
//                   {LOAD_TYPES.map(lt => (
//                     <TouchableOpacity key={lt} style={[S.pickerItem, formData.loadType === lt && S.pickerItemActive]}
//                       onPress={() => { fd('loadType', lt); setShowLoadTypePicker(false); }}>
//                       <Text style={[S.pickerItemText, formData.loadType === lt && { color: C.primary, fontWeight: '700' }]}>{lt}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </ScrollView>
//               </View>
//             )}
//           </View>
 
//           {/* Image Upload */}
//           {imageUri ? (
//             <View style={S.fieldWrap}>
//               <Image source={{ uri: imageUri }} style={S.previewImage} />
//               <TouchableOpacity style={S.changeImageBtn} onPress={pickImage}>
//                 <Text style={S.changeImageText}>Change Image</Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <TouchableOpacity style={S.imageUploadBtn} onPress={pickImage}>
//               <Text style={S.imageUploadEmoji}>📷</Text>
//               <Text style={S.imageUploadText}>Upload Load Image</Text>
//             </TouchableOpacity>
//           )}
 
//           {/* Estimated Price */}
//           <View style={S.priceCard}>
//             <View>
//               <Text style={S.priceLabel}>Estimated Price</Text>
//               <Text style={S.priceSub}>Based on weight + distance</Text>
//             </View>
//             <Text style={S.priceValue}>{getEstimatedCost()}</Text>
//           </View>
 
//           {/* SUBMIT */}
//           <TouchableOpacity style={[S.submitBtn, loading && S.submitBtnDisabled]} onPress={handleSubmit} disabled={loading}>
//             {loading ? <ActivityIndicator color={C.white} /> : <Text style={S.submitBtnText}>Create Load Request →</Text>}
//           </TouchableOpacity>
 
//           <View style={{ height: 32 }} />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
 
// export default CreateLoadRequestScreen;
 
// const S = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: '#F8F8F8' },
 
//   header: {
//     flexDirection: 'row', alignItems: 'center', gap: 14,
//     backgroundColor: C.white, padding: 20, paddingTop: 16,
//     borderBottomWidth: 1, borderBottomColor: C.border,
//   },
//   backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.primaryLight, alignItems: 'center', justifyContent: 'center' },
//   backArrow: { fontSize: 18, color: C.primary },
//   headerTitle: { fontSize: 20, fontWeight: '700', color: C.textPrimary },
//   headerSub: { fontSize: 13, color: C.textSecondary, marginTop: 2 },
 
//   mapWrapper: { margin: 12 },
//   mapContainer: { height: 380, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
//   map: { flex: 1 },
 
//   locCard: {
//     marginHorizontal: 12, marginBottom: 4, backgroundColor: C.white,
//     borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.border, gap: 10,
//   },
//   locRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
//   locDot: { width: 10, height: 10, borderRadius: 5, marginTop: 4, flexShrink: 0 },
//   locText: { flex: 1, fontSize: 13, color: C.textPrimary, lineHeight: 18 },
 
//   form: { padding: 12, gap: 12 },
 
//   fieldWrap: {},
//   label: { fontSize: 12, fontWeight: '600', color: C.textSecondary, marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase' },
//   input: {
//     height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, backgroundColor: C.white, fontSize: 15, color: C.textPrimary,
//   },
 
//   readonlyField: {
//     height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, backgroundColor: C.primaryLight,
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//   },
//   readonlyLabel: { fontSize: 14, color: '#CC4400' },
//   readonlyValue: { fontSize: 15, fontWeight: '700', color: C.primary },
 
//   pickerBtn: {
//     height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, backgroundColor: C.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//   },
//   pickerBtnText: { fontSize: 15, color: C.textPrimary },
//   pickerDropdown: {
//     backgroundColor: C.white, borderWidth: 1, borderColor: C.border, borderRadius: 12, overflow: 'hidden',
//     shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 5, marginTop: 4,
//   },
//   pickerItem: { padding: 14, borderBottomWidth: 1, borderBottomColor: C.border },
//   pickerItemActive: { backgroundColor: C.primaryLight },
//   pickerItemText: { fontSize: 15, color: C.textPrimary },
 
//   imageUploadBtn: {
//     height: 54, borderWidth: 1.5, borderColor: C.border, borderRadius: 12,
//     borderStyle: 'dashed', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: C.white,
//   },
//   imageUploadEmoji: { fontSize: 20 },
//   imageUploadText: { fontSize: 15, fontWeight: '600', color: C.textSecondary },
//   previewImage: { width: '100%', height: 200, borderRadius: 14 },
//   changeImageBtn: { alignSelf: 'flex-end', marginTop: 8 },
//   changeImageText: { color: C.primary, fontSize: 13, fontWeight: '600' },
 
//   priceCard: {
//     height: 64, borderWidth: 1.5, borderColor: '#FFD4A8', borderRadius: 14,
//     backgroundColor: C.primaryLight, flexDirection: 'row', alignItems: 'center',
//     justifyContent: 'space-between', paddingHorizontal: 16,
//   },
//   priceLabel: { fontSize: 14, fontWeight: '600', color: '#CC4400' },
//   priceSub: { fontSize: 11, color: C.textSecondary, marginTop: 2 },
//   priceValue: { fontSize: 24, fontWeight: '800', color: C.primary },
 
//   submitBtn: {
//     height: 56, backgroundColor: C.primary, borderRadius: 16,
//     alignItems: 'center', justifyContent: 'center',
//     shadowColor: '#ee801f', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6,
//   },
//   submitBtnDisabled: { opacity: 0.6 },
//   submitBtnText: { color: C.white, fontSize: 16, fontWeight: '700' },
// });


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
// import { useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   Image,
//   Platform,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { customerAPI } from '../services/api';

// const C = {
//   primary:      '#FF6A00',
//   primaryLight: '#FFF4EC',
//   white:        '#FFFFFF',
//   textPrimary:  '#111111',
//   textSecondary:'#666666',
//   border:       '#EEEEEE',
//   bg:           '#F8F8F8',
//   success:      '#22C55E',
// };

// const GOOGLE_MAPS_API_KEY = 'AIzaSyDZwBw_ToWcWIggRVBSFA2Sy7mvEhKZUbU';

// const haversine = (lat1, lon1, lat2, lon2) => {
//   const R = 6371, dLat = ((lat2 - lat1) * Math.PI) / 180, dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
//   return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
// };

// const getRouteDistance = async (origin, dest) => {
//   try {
//     const res = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
//       params: { origins: `${origin.latitude},${origin.longitude}`, destinations: `${dest.latitude},${dest.longitude}`, key: GOOGLE_MAPS_API_KEY, units: 'metric' },
//     });
//     const el = res.data.rows[0]?.elements[0];
//     if (el?.status === 'OK') return (el.distance.value / 1000).toFixed(2);
//   } catch (_) {}
//   return haversine(origin.latitude, origin.longitude, dest.latitude, dest.longitude);
// };

// const weightCharge = (w) => { if (w <= 500) return 200; if (w <= 1000) return 400; if (w <= 1500) return 600; return 800; };

// // ─── EXPANDED LOAD TYPES ─────────────────────────────────
// const LOAD_TYPES = [
//   // Building & Construction
//   'Cement', 'Steel', 'Bricks', 'Sand', 'Gravel', 'Iron Rods', 'Tiles', 'Plywood', 'Glass Panels', 'Construction Materials',
//   // Household
//   'Furniture', 'Home Appliances', 'Electronics', 'Household Items', 'Kitchen Equipment',
//   // Food & Perishables
//   'Vegetables', 'Fruits', 'Fish & Seafood', 'Meat & Poultry', 'Dairy Products', 'Groceries', 'Frozen Foods', 'Packaged Foods',
//   // Industrial
//   'Machinery', 'Industrial Goods', 'Auto Parts', 'Heavy Equipment', 'Generators', 'Pumps & Motors', 'Chemicals',
//   // Textile & Garments
//   'Textiles', 'Garments', 'Leather Goods', 'Cotton Bales',
//   // Pharma & Medical
//   'Pharmaceuticals', 'Medical Equipment', 'Lab Supplies',
//   // Agri
//   'Seeds & Fertilizers', 'Agricultural Equipment', 'Animal Feed',
//   // E-commerce & Retail
//   'E-commerce Goods', 'Retail Products', 'Stationery', 'Books & Paper',
//   // Liquids
//   'Water Cans', 'Oil & Lubricants', 'Beverages',
//   // Other
//   'Scrap Metal', 'Waste Material', 'Hazardous Goods', 'Others',
// ];

// // ─── ANIMATED PRESSABLE BUTTON ────────────────────────────
// const AnimatedPressable = ({ onPress, style, children, disabled }) => {
//   const scale = useRef(new Animated.Value(1)).current;
//   const press = () => {
//     Animated.sequence([
//       Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 2 }),
//       Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }),
//     ]).start();
//     onPress?.();
//   };
//   return (
//     <Animated.View style={[{ transform: [{ scale }] }, style]}>
//       <Pressable onPress={disabled ? null : press} style={{ width: '100%' }}>{children}</Pressable>
//     </Animated.View>
//   );
// };

// // ─── FADE-IN CARD ─────────────────────────────────────────
// const FadeInView = ({ delay = 0, children, style }) => {
//   const opacity = useRef(new Animated.Value(0)).current;
//   const translateY = useRef(new Animated.Value(18)).current;
//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(opacity, { toValue: 1, duration: 380, delay, useNativeDriver: true }),
//       Animated.spring(translateY, { toValue: 0, delay, speed: 14, bounciness: 4, useNativeDriver: true }),
//     ]).start();
//   }, []);
//   return <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>{children}</Animated.View>;
// };

// // ─── WEB MAP COMPONENT ───────────────────────────────────
// const WebMapView = ({ onPickupSelect, onDropSelect, pickupCoords, dropCoords }) => {
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const pickupMarkerRef = useRef(null);
//   const dropMarkerRef = useRef(null);
//   const polylineRef = useRef(null);

//   const initMap = () => {
//     if (!mapRef.current || mapInstanceRef.current) return;
//     const map = new window.google.maps.Map(mapRef.current, { center: { lat: 20.5937, lng: 78.9629 }, zoom: 5, mapTypeControl: false, fullscreenControl: false, streetViewControl: false });
//     mapInstanceRef.current = map;
//     pickupMarkerRef.current = new window.google.maps.Marker({ position: { lat: pickupCoords.latitude, lng: pickupCoords.longitude }, map, icon: { url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' } });
//     dropMarkerRef.current = new window.google.maps.Marker({ position: { lat: dropCoords.latitude, lng: dropCoords.longitude }, map, icon: { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' } });
//     polylineRef.current = new window.google.maps.Polyline({ path: [{ lat: pickupCoords.latitude, lng: pickupCoords.longitude }, { lat: dropCoords.latitude, lng: dropCoords.longitude }], strokeColor: '#FF6A00', strokeOpacity: 0.9, strokeWeight: 3, map });

//     ['pickup-search-input', 'drop-search-input'].forEach((id, idx) => {
//       const inp = document.getElementById(id);
//       if (!inp) return;
//       const ac = new window.google.maps.places.Autocomplete(inp, { componentRestrictions: { country: 'in' } });
//       ac.bindTo('bounds', map);
//       ac.addListener('place_changed', () => {
//         const place = ac.getPlace();
//         if (!place.geometry?.location) return;
//         const lat = place.geometry.location.lat(), lng = place.geometry.location.lng(), address = place.formatted_address;
//         if (idx === 0) {
//           pickupMarkerRef.current.setPosition({ lat, lng });
//           polylineRef.current.setPath([{ lat, lng }, dropMarkerRef.current.getPosition().toJSON()]);
//           onPickupSelect({ lat, lng, address });
//         } else {
//           dropMarkerRef.current.setPosition({ lat, lng });
//           polylineRef.current.setPath([pickupMarkerRef.current.getPosition().toJSON(), { lat, lng }]);
//           onDropSelect({ lat, lng, address });
//         }
//         map.panTo({ lat, lng }); map.setZoom(13);
//       });
//     });
//   };

//   useEffect(() => {
//     if (window.google?.maps) { initMap(); return; }
//     const scriptId = 'google-maps-script';
//     if (!document.getElementById(scriptId)) {
//       window.__initGoogleMapCallback = () => initMap();
//       const script = document.createElement('script');
//       script.id = scriptId;
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=__initGoogleMapCallback`;
//       script.async = true; script.defer = true;
//       document.head.appendChild(script);
//     } else {
//       const iv = setInterval(() => { if (window.google?.maps) { initMap(); clearInterval(iv); } }, 200);
//     }
//   }, []);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//       {[{ id: 'pickup-search-input', dot: '#22C55E', ph: '🟢 Pickup location...' }, { id: 'drop-search-input', dot: '#FF6A00', ph: '🔴 Drop location...' }].map((row) => (
//         <div key={row.id} style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1.5px solid #EEEEEE', borderRadius: 12, padding: '0 12px', gap: 8 }}>
//           <div style={{ width: 10, height: 10, borderRadius: '50%', background: row.dot, flexShrink: 0 }} />
//           <input id={row.id} type="text" placeholder={row.ph} style={{ flex: 1, height: 46, border: 'none', outline: 'none', fontSize: 14, background: 'transparent', color: '#111' }} />
//         </div>
//       ))}
//       <div ref={mapRef} style={{ height: 260, width: '100%', borderRadius: 12, overflow: 'hidden', border: '1px solid #EEEEEE' }} />
//     </div>
//   );
// };

// const buildMapHTML = (pLat, pLng, dLat, dLng) => `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{margin:0;padding:0;box-sizing:border-box;font-family:Arial,sans-serif;}body{background:#F8F8F8;}.wrap{padding:10px;display:flex;flex-direction:column;gap:8px;}.row{display:flex;align-items:center;background:#fff;border:1.5px solid #EEEEEE;border-radius:12px;padding:0 12px;gap:8px;}.dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}.g{background:#22C55E;}.o{background:#FF6A00;}input{flex:1;height:44px;border:none;outline:none;font-size:14px;background:transparent;color:#111;}#map{height:250px;width:100%;}</style></head><body><div class="wrap"><div class="row"><span class="dot g"></span><input id="pi" type="text" placeholder="Pickup Location..."></div><div class="row"><span class="dot o"></span><input id="di" type="text" placeholder="Drop Location..."></div></div><div id="map"></div><script>let map,pm,dm,rl;function initMap(){map=new google.maps.Map(document.getElementById('map'),{center:{lat:20.5937,lng:78.9629},zoom:5,mapTypeControl:false,fullscreenControl:false,streetViewControl:false});pm=new google.maps.Marker({position:{lat:${pLat},lng:${pLng}},map,icon:{url:'https://maps.google.com/mapfiles/ms/icons/green-dot.png'}});dm=new google.maps.Marker({position:{lat:${dLat},lng:${dLng}},map,icon:{url:'https://maps.google.com/mapfiles/ms/icons/red-dot.png'}});rl=new google.maps.Polyline({path:[{lat:${pLat},lng:${pLng}},{lat:${dLat},lng:${dLng}}],strokeColor:'#FF6A00',strokeOpacity:0.9,strokeWeight:3,map});setup('pi','pickup');setup('di','drop');}function setup(id,type){const inp=document.getElementById(id);const ac=new google.maps.places.Autocomplete(inp,{componentRestrictions:{country:'in'}});ac.bindTo('bounds',map);ac.addListener('place_changed',()=>{const p=ac.getPlace();if(!p.geometry?.location)return;const lat=p.geometry.location.lat(),lng=p.geometry.location.lng(),address=p.formatted_address;if(type==='pickup'){pm.setPosition({lat,lng});rl.setPath([{lat,lng},dm.getPosition().toJSON()]);}else{dm.setPosition({lat,lng});rl.setPath([pm.getPosition().toJSON(),{lat,lng}]);}map.panTo({lat,lng});map.setZoom(13);if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage(JSON.stringify({type,lat,lng,address}));});}</script><script src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap" async defer></script></body></html>`;

// // ─── ANIMATED INPUT ───────────────────────────────────────
// const AnimatedInput = ({ label, value, onChangeText, placeholder, keyboardType, maxLength }) => {
//   const focused = useRef(new Animated.Value(0)).current;
//   const onFocus = () => Animated.timing(focused, { toValue: 1, duration: 180, useNativeDriver: false }).start();
//   const onBlur  = () => Animated.timing(focused, { toValue: 0, duration: 180, useNativeDriver: false }).start();
//   const borderColor = focused.interpolate({ inputRange: [0, 1], outputRange: [C.border, C.primary] });
//   return (
//     <View style={S.fieldWrap}>
//       <Text style={S.label}>{label}</Text>
//       <Animated.View style={[S.inputWrap, { borderColor }]}>
//         <TextInput
//           style={S.input}
//           placeholder={placeholder}
//           placeholderTextColor="#999"
//           keyboardType={keyboardType}
//           maxLength={maxLength}
//           value={value}
//           onFocus={onFocus}
//           onBlur={onBlur}
//           onChangeText={onChangeText}
//         />
//       </Animated.View>
//     </View>
//   );
// };

// // ─── MAIN COMPONENT ──────────────────────────────────────
// const CreateLoadRequestScreen = ({ navigation }) => {
//   const [loading, setLoading] = useState(false);
//   const [imageUri, setImageUri] = useState(null);
//   const [showLoadTypePicker, setShowLoadTypePicker] = useState(false);
//   const [loadTypeSearch, setLoadTypeSearch] = useState('');
//   const [pickupCoords, setPickupCoords] = useState({ latitude: 13.0827, longitude: 80.2707 });
//   const [dropCoords, setDropCoords]     = useState({ latitude: 12.9716, longitude: 77.5946 });
//   const [formData, setFormData] = useState({ customerName: '', phoneNumber: '', alternativePhone: '', pickupLocation: '', dropLocation: '', loadType: 'Furniture', weight: '', distance: '' });

//   // Picker dropdown animation
//   const dropdownHeight = useRef(new Animated.Value(0)).current;
//   const dropdownOpacity = useRef(new Animated.Value(0)).current;

//   // Submit button pulse
//   const submitScale = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     (async () => {
//       const raw = await AsyncStorage.getItem('userData');
//       if (raw) { const u = JSON.parse(raw); setFormData(prev => ({ ...prev, phoneNumber: u.phoneNumber || '', customerName: u.name || '' })); }
//     })();
//   }, []);

//   const togglePicker = () => {
//     const opening = !showLoadTypePicker;
//     setShowLoadTypePicker(opening);
//     setLoadTypeSearch('');
//     Animated.parallel([
//       Animated.spring(dropdownHeight, { toValue: opening ? 220 : 0, speed: 18, bounciness: 3, useNativeDriver: false }),
//       Animated.timing(dropdownOpacity, { toValue: opening ? 1 : 0, duration: 200, useNativeDriver: false }),
//     ]).start();
//   };

//   const selectLoadType = (lt) => {
//     fd('loadType', lt);
//     Animated.parallel([
//       Animated.spring(dropdownHeight, { toValue: 0, speed: 18, bounciness: 3, useNativeDriver: false }),
//       Animated.timing(dropdownOpacity, { toValue: 0, duration: 150, useNativeDriver: false }),
//     ]).start(() => setShowLoadTypePicker(false));
//   };

//   const filteredTypes = LOAD_TYPES.filter(lt =>
//     lt.toLowerCase().includes(loadTypeSearch.toLowerCase())
//   );

//   const handlePickupSelect = async ({ lat, lng, address }) => {
//     const newPickup = { latitude: lat, longitude: lng };
//     setPickupCoords(newPickup);
//     setFormData(prev => ({ ...prev, pickupLocation: address }));
//     if (dropCoords.latitude) { const dist = await getRouteDistance(newPickup, dropCoords); setFormData(prev => ({ ...prev, distance: dist })); }
//   };

//   const handleDropSelect = async ({ lat, lng, address }) => {
//     const newDrop = { latitude: lat, longitude: lng };
//     setDropCoords(newDrop);
//     const dist = await getRouteDistance(pickupCoords, newDrop);
//     setFormData(prev => ({ ...prev, dropLocation: address, distance: dist }));
//   };

//   const handleWebViewMessage = async (event) => {
//     try {
//       const { type, lat, lng, address } = JSON.parse(event.nativeEvent.data);
//       if (type === 'pickup') await handlePickupSelect({ lat, lng, address });
//       else await handleDropSelect({ lat, lng, address });
//     } catch (e) {}
//   };

//   const pickImage = async () => {
//     const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!perm.granted) return Alert.alert('Permission required');
//     const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
//     if (!result.canceled) setImageUri(result.assets[0].uri);
//   };

//   const getEstimatedCost = () => {
//     const w = Number(formData.weight), d = Number(formData.distance);
//     if (!w || !d) return '--';
//     return `₹${Math.round(weightCharge(w) + d * 6)}`;
//   };

//   const handleSubmit = async () => {
//     if (!formData.pickupLocation) return Alert.alert('Error', 'Please select pickup location');
//     if (!formData.dropLocation)   return Alert.alert('Error', 'Please select drop location');
//     if (!formData.weight)         return Alert.alert('Error', 'Please enter weight');
//     // Pulse animation on tap
//     Animated.sequence([
//       Animated.spring(submitScale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 2 }),
//       Animated.spring(submitScale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 8 }),
//     ]).start();
//     try {
//       setLoading(true);
//       const customerId = await AsyncStorage.getItem('customerId');
//       const data = new FormData();
//       Object.entries(formData).forEach(([k, v]) => data.append(k, v));
//       data.append('latitude', pickupCoords.latitude); data.append('longitude', pickupCoords.longitude);
//       data.append('dropLatitude', dropCoords.latitude); data.append('dropLongitude', dropCoords.longitude);
//       if (imageUri) data.append('loadImage', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });
//       await customerAPI.createLoadRequest(customerId, data);
//       Alert.alert('Success 🎉', 'Load request created!');
//       navigation.navigate('MyLoadRequests');
//     } catch (e) {
//       Alert.alert('Error', 'Failed to create load request');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderMap = () => {
//     if (Platform.OS === 'web') {
//       return <WebMapView pickupCoords={pickupCoords} dropCoords={dropCoords} onPickupSelect={handlePickupSelect} onDropSelect={handleDropSelect} />;
//     }
//     const { WebView } = require('react-native-webview');
//     return (
//       <View style={S.mapContainer}>
//         <WebView source={{ html: buildMapHTML(pickupCoords.latitude, pickupCoords.longitude, dropCoords.latitude, dropCoords.longitude) }}
//           style={S.map} javaScriptEnabled domStorageEnabled onMessage={handleWebViewMessage} scrollEnabled={false} />
//       </View>
//     );
//   };

//   const fd = (field, val) => setFormData(prev => ({ ...prev, [field]: val }));

//   return (
//     <SafeAreaView style={S.safe}>
//       <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

//         {/* HEADER */}
//         <FadeInView delay={0} style={S.header}>
//           <AnimatedPressable onPress={() => navigation.goBack()} style={S.backBtn}>
//             <Text style={S.backArrow}>←</Text>
//           </AnimatedPressable>
//           <View>
//             <Text style={S.headerTitle}>Create Load Request</Text>
//             <Text style={S.headerSub}>Fill in the details below</Text>
//           </View>
//         </FadeInView>

//         {/* MAP */}
//         <FadeInView delay={80} style={S.mapWrapper}>{renderMap()}</FadeInView>

//         {/* LOCATION DISPLAY */}
//         {(formData.pickupLocation || formData.dropLocation) && (
//           <FadeInView delay={0} style={S.locCard}>
//             {formData.pickupLocation ? (
//               <View style={S.locRow}><View style={[S.locDot, { backgroundColor: C.success }]} /><Text style={S.locText} numberOfLines={2}>{formData.pickupLocation}</Text></View>
//             ) : null}
//             {formData.dropLocation ? (
//               <View style={S.locRow}><View style={[S.locDot, { backgroundColor: C.primary }]} /><Text style={S.locText} numberOfLines={2}>{formData.dropLocation}</Text></View>
//             ) : null}
//           </FadeInView>
//         )}

//         {/* FORM */}
//         <View style={S.form}>

//           {/* Distance */}
//           <FadeInView delay={120} style={S.readonlyField}>
//             <Text style={S.readonlyLabel}>📏 Distance</Text>
//             <Text style={S.readonlyValue}>{formData.distance ? `${formData.distance} km` : 'Auto-calculated'}</Text>
//           </FadeInView>

//           {/* Animated text fields */}
//           {[
//             { label: 'Customer Name', field: 'customerName', placeholder: 'Your name', keyboard: 'default' },
//             { label: 'Phone Number', field: 'phoneNumber', placeholder: '10-digit mobile', keyboard: 'number-pad', max: 10 },
//             { label: 'Alternative Phone (Optional)', field: 'alternativePhone', placeholder: 'Alternative number', keyboard: 'number-pad', max: 10 },
//             { label: 'Weight (kg)', field: 'weight', placeholder: 'Enter weight in kg', keyboard: 'numeric' },
//           ].map(({ label, field, placeholder, keyboard, max }, i) => (
//             <FadeInView key={field} delay={160 + i * 50}>
//               <AnimatedInput
//                 label={label}
//                 value={formData[field]}
//                 placeholder={placeholder}
//                 keyboardType={keyboard}
//                 maxLength={max}
//                 onChangeText={t => fd(field, keyboard === 'number-pad' || keyboard === 'numeric' ? t.replace(/[^0-9]/g, '') : t)}
//               />
//             </FadeInView>
//           ))}

//           {/* Load Type Picker */}
//           <FadeInView delay={400} style={S.fieldWrap}>
//             <Text style={S.label}>Load Type</Text>
//             <AnimatedPressable onPress={togglePicker} style={S.pickerBtn}>
//               <View style={S.pickerBtnInner}>
//                 <Text style={S.pickerBtnText}>{formData.loadType}</Text>
//                 <Text style={{ color: C.primary, fontSize: 13 }}>{showLoadTypePicker ? '▲' : '▼'}</Text>
//               </View>
//             </AnimatedPressable>

//             {/* Animated dropdown */}
//             <Animated.View style={[S.pickerDropdown, { maxHeight: dropdownHeight, opacity: dropdownOpacity, overflow: 'hidden' }]}>
//               {/* Search inside dropdown */}
//               <View style={S.searchWrap}>
//                 <TextInput
//                   style={S.searchInput}
//                   placeholder="Search load type..."
//                   placeholderTextColor="#aaa"
//                   value={loadTypeSearch}
//                   onChangeText={setLoadTypeSearch}
//                 />
//               </View>
//               <ScrollView style={{ maxHeight: 160 }} nestedScrollEnabled>
//                 {filteredTypes.map(lt => (
//                   <TouchableOpacity key={lt} style={[S.pickerItem, formData.loadType === lt && S.pickerItemActive]}
//                     onPress={() => selectLoadType(lt)}>
//                     <Text style={[S.pickerItemText, formData.loadType === lt && { color: C.primary, fontWeight: '700' }]}>{lt}</Text>
//                   </TouchableOpacity>
//                 ))}
//                 {filteredTypes.length === 0 && (
//                   <View style={{ padding: 16, alignItems: 'center' }}>
//                     <Text style={{ color: '#aaa', fontSize: 13 }}>No match found</Text>
//                   </View>
//                 )}
//               </ScrollView>
//             </Animated.View>
//           </FadeInView>

//           {/* Image Upload */}
//           <FadeInView delay={440}>
//             {imageUri ? (
//               <View style={S.fieldWrap}>
//                 <Image source={{ uri: imageUri }} style={S.previewImage} />
//                 <AnimatedPressable onPress={pickImage} style={S.changeImageBtn}>
//                   <Text style={S.changeImageText}>Change Image</Text>
//                 </AnimatedPressable>
//               </View>
//             ) : (
//               <AnimatedPressable onPress={pickImage} style={S.imageUploadBtn}>
//                 <View style={S.imageUploadInner}>
//                   <Text style={S.imageUploadEmoji}>📷</Text>
//                   <Text style={S.imageUploadText}>Upload Load Image</Text>
//                 </View>
//               </AnimatedPressable>
//             )}
//           </FadeInView>

//           {/* Estimated Price */}
//           <FadeInView delay={480} style={S.priceCard}>
//             <View>
//               <Text style={S.priceLabel}>Estimated Price</Text>
//               <Text style={S.priceSub}>Based on weight + distance</Text>
//             </View>
//             <Text style={S.priceValue}>{getEstimatedCost()}</Text>
//           </FadeInView>

//           {/* SUBMIT */}
//           <FadeInView delay={520}>
//             <Animated.View style={{ transform: [{ scale: submitScale }] }}>
//               <TouchableOpacity style={[S.submitBtn, loading && S.submitBtnDisabled]} onPress={handleSubmit} disabled={loading} activeOpacity={0.85}>
//                 {loading ? <ActivityIndicator color={C.white} /> : <Text style={S.submitBtnText}>Create Load Request →</Text>}
//               </TouchableOpacity>
//             </Animated.View>
//           </FadeInView>

//           <View style={{ height: 32 }} />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default CreateLoadRequestScreen;

// const S = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: C.bg },

//   header: {
//     flexDirection: 'row', alignItems: 'center', gap: 14,
//     backgroundColor: C.white, padding: 20, paddingTop: 16,
//     borderBottomWidth: 1, borderBottomColor: C.border,
//   },
//   backBtn: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: C.primaryLight, alignItems: 'center', justifyContent: 'center',
//   },
//   backArrow: { fontSize: 18, color: C.primary },
//   headerTitle: { fontSize: 20, fontWeight: '700', color: C.textPrimary },
//   headerSub: { fontSize: 13, color: C.textSecondary, marginTop: 2 },

//   mapWrapper: { margin: 12 },
//   mapContainer: { height: 380, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
//   map: { flex: 1 },

//   locCard: {
//     marginHorizontal: 12, marginBottom: 4, backgroundColor: C.white,
//     borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.border, gap: 10,
//   },
//   locRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
//   locDot: { width: 10, height: 10, borderRadius: 5, marginTop: 4, flexShrink: 0 },
//   locText: { flex: 1, fontSize: 13, color: C.textPrimary, lineHeight: 18 },

//   form: { padding: 12, gap: 12 },

//   fieldWrap: {},
//   label: { fontSize: 12, fontWeight: '600', color: C.textSecondary, marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase' },

//   inputWrap: {
//     height: 48, borderWidth: 1.5, borderRadius: 12,
//     backgroundColor: C.white, paddingHorizontal: 14,
//     justifyContent: 'center',
//   },
//   input: { fontSize: 15, color: C.textPrimary, height: 48 },

//   readonlyField: {
//     height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, backgroundColor: C.primaryLight,
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//   },
//   readonlyLabel: { fontSize: 14, color: '#CC4400' },
//   readonlyValue: { fontSize: 15, fontWeight: '700', color: C.primary },

//   pickerBtn: { borderRadius: 12 },
//   pickerBtnInner: {
//     height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, backgroundColor: C.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//   },
//   pickerBtnText: { fontSize: 15, color: C.textPrimary },
//   pickerDropdown: {
//     backgroundColor: C.white, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 5, marginTop: 4,
//   },
//   searchWrap: {
//     paddingHorizontal: 12, paddingVertical: 8,
//     borderBottomWidth: 1, borderBottomColor: C.border,
//   },
//   searchInput: {
//     height: 36, borderWidth: 1, borderColor: C.border, borderRadius: 8,
//     paddingHorizontal: 10, fontSize: 13, color: C.textPrimary, backgroundColor: C.bg,
//   },
//   pickerItem: { padding: 14, borderBottomWidth: 1, borderBottomColor: C.border },
//   pickerItemActive: { backgroundColor: C.primaryLight },
//   pickerItemText: { fontSize: 15, color: C.textPrimary },

//   imageUploadBtn: { borderRadius: 12 },
//   imageUploadInner: {
//     height: 54, borderWidth: 1.5, borderColor: C.border, borderRadius: 12,
//     borderStyle: 'dashed', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: C.white,
//   },
//   imageUploadEmoji: { fontSize: 20 },
//   imageUploadText: { fontSize: 15, fontWeight: '600', color: C.textSecondary },
//   previewImage: { width: '100%', height: 200, borderRadius: 14 },
//   changeImageBtn: { alignSelf: 'flex-end', marginTop: 8 },
//   changeImageText: { color: C.primary, fontSize: 13, fontWeight: '600' },

//   priceCard: {
//     height: 64, borderWidth: 1.5, borderColor: '#FFD4A8', borderRadius: 14,
//     backgroundColor: C.primaryLight, flexDirection: 'row', alignItems: 'center',
//     justifyContent: 'space-between', paddingHorizontal: 16,
//   },
//   priceLabel: { fontSize: 14, fontWeight: '600', color: '#CC4400' },
//   priceSub: { fontSize: 11, color: C.textSecondary, marginTop: 2 },
//   priceValue: { fontSize: 24, fontWeight: '800', color: C.primary },

//   submitBtn: {
//     height: 56, backgroundColor: C.primary, borderRadius: 16,
//     alignItems: 'center', justifyContent: 'center',
//     shadowColor: '#ee801f', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6,
//   },
//   submitBtnDisabled: { opacity: 0.6 },
//   submitBtnText: { color: C.white, fontSize: 16, fontWeight: '700' },
// });



// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
// import { useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   Image,
//   Platform,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { customerAPI } from '../services/api';

// const C = {
//   primary:      '#FF6A00',
//   primaryLight: '#FFF4EC',
//   white:        '#FFFFFF',
//   textPrimary:  '#111111',
//   textSecondary:'#666666',
//   border:       '#EEEEEE',
//   bg:           '#F8F8F8',
//   success:      '#22C55E',
//   danger:       '#EF4444',
// };

// const GOOGLE_MAPS_API_KEY = 'AIzaSyDZwBw_ToWcWIggRVBSFA2Sy7mvEhKZUbU';

// const haversine = (lat1, lon1, lat2, lon2) => {
//   const R = 6371, dLat = ((lat2 - lat1) * Math.PI) / 180, dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
//   return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
// };

// const getRouteDistance = async (origin, dest) => {
//   try {
//     const res = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
//       params: { origins: `${origin.latitude},${origin.longitude}`, destinations: `${dest.latitude},${dest.longitude}`, key: GOOGLE_MAPS_API_KEY, units: 'metric' },
//     });
//     const el = res.data.rows[0]?.elements[0];
//     if (el?.status === 'OK') return (el.distance.value / 1000).toFixed(2);
//   } catch (_) {}
//   return haversine(origin.latitude, origin.longitude, dest.latitude, dest.longitude);
// };

// const weightCharge = (w) => { if (w <= 500) return 200; if (w <= 1000) return 400; if (w <= 1500) return 600; return 800; };

// const LOAD_TYPES = [
//   'Cement', 'Steel', 'Bricks', 'Sand', 'Gravel', 'Iron Rods', 'Tiles', 'Plywood', 'Glass Panels', 'Construction Materials',
//   'Furniture', 'Home Appliances', 'Electronics', 'Household Items', 'Kitchen Equipment',
//   'Vegetables', 'Fruits', 'Fish & Seafood', 'Meat & Poultry', 'Dairy Products', 'Groceries', 'Frozen Foods', 'Packaged Foods',
//   'Machinery', 'Industrial Goods', 'Auto Parts', 'Heavy Equipment', 'Generators', 'Pumps & Motors', 'Chemicals',
//   'Textiles', 'Garments', 'Leather Goods', 'Cotton Bales',
//   'Pharmaceuticals', 'Medical Equipment', 'Lab Supplies',
//   'Seeds & Fertilizers', 'Agricultural Equipment', 'Animal Feed',
//   'E-commerce Goods', 'Retail Products', 'Stationery', 'Books & Paper',
//   'Water Cans', 'Oil & Lubricants', 'Beverages',
//   'Scrap Metal', 'Waste Material', 'Hazardous Goods', 'Others',
// ];

// // ─── ANIMATED PRESSABLE BUTTON ────────────────────────────
// const AnimatedPressable = ({ onPress, style, children, disabled }) => {
//   const scale = useRef(new Animated.Value(1)).current;
//   const press = () => {
//     Animated.sequence([
//       Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 2 }),
//       Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }),
//     ]).start();
//     onPress?.();
//   };
//   return (
//     <Animated.View style={[{ transform: [{ scale }] }, style]}>
//       <Pressable onPress={disabled ? null : press} style={{ width: '100%' }}>{children}</Pressable>
//     </Animated.View>
//   );
// };

// // ─── FADE-IN CARD ─────────────────────────────────────────
// const FadeInView = ({ delay = 0, children, style }) => {
//   const opacity = useRef(new Animated.Value(0)).current;
//   const translateY = useRef(new Animated.Value(18)).current;
//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(opacity, { toValue: 1, duration: 380, delay, useNativeDriver: true }),
//       Animated.spring(translateY, { toValue: 0, delay, speed: 14, bounciness: 4, useNativeDriver: true }),
//     ]).start();
//   }, []);
//   return <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>{children}</Animated.View>;
// };

// // ─── WEB MAP COMPONENT ───────────────────────────────────
// const WebMapView = ({ onPickupSelect, onDropSelect, pickupCoords, dropCoords }) => {
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const pickupMarkerRef = useRef(null);
//   const dropMarkerRef = useRef(null);
//   const polylineRef = useRef(null);

//   const initMap = () => {
//     if (!mapRef.current || mapInstanceRef.current) return;
//     const map = new window.google.maps.Map(mapRef.current, { center: { lat: 20.5937, lng: 78.9629 }, zoom: 5, mapTypeControl: false, fullscreenControl: false, streetViewControl: false });
//     mapInstanceRef.current = map;
//     pickupMarkerRef.current = new window.google.maps.Marker({ position: { lat: pickupCoords.latitude, lng: pickupCoords.longitude }, map, icon: { url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' } });
//     dropMarkerRef.current = new window.google.maps.Marker({ position: { lat: dropCoords.latitude, lng: dropCoords.longitude }, map, icon: { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' } });
//     polylineRef.current = new window.google.maps.Polyline({ path: [{ lat: pickupCoords.latitude, lng: pickupCoords.longitude }, { lat: dropCoords.latitude, lng: dropCoords.longitude }], strokeColor: '#FF6A00', strokeOpacity: 0.9, strokeWeight: 3, map });

//     ['pickup-search-input', 'drop-search-input'].forEach((id, idx) => {
//       const inp = document.getElementById(id);
//       if (!inp) return;
//       const ac = new window.google.maps.places.Autocomplete(inp, { componentRestrictions: { country: 'in' } });
//       ac.bindTo('bounds', map);
//       ac.addListener('place_changed', () => {
//         const place = ac.getPlace();
//         if (!place.geometry?.location) return;
//         const lat = place.geometry.location.lat(), lng = place.geometry.location.lng(), address = place.formatted_address;
//         if (idx === 0) {
//           pickupMarkerRef.current.setPosition({ lat, lng });
//           polylineRef.current.setPath([{ lat, lng }, dropMarkerRef.current.getPosition().toJSON()]);
//           onPickupSelect({ lat, lng, address });
//         } else {
//           dropMarkerRef.current.setPosition({ lat, lng });
//           polylineRef.current.setPath([pickupMarkerRef.current.getPosition().toJSON(), { lat, lng }]);
//           onDropSelect({ lat, lng, address });
//         }
//         map.panTo({ lat, lng }); map.setZoom(13);
//       });
//     });
//   };

//   useEffect(() => {
//     if (window.google?.maps) { initMap(); return; }
//     const scriptId = 'google-maps-script';
//     if (!document.getElementById(scriptId)) {
//       window.__initGoogleMapCallback = () => initMap();
//       const script = document.createElement('script');
//       script.id = scriptId;
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=__initGoogleMapCallback`;
//       script.async = true; script.defer = true;
//       document.head.appendChild(script);
//     } else {
//       const iv = setInterval(() => { if (window.google?.maps) { initMap(); clearInterval(iv); } }, 200);
//     }
//   }, []);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//       {[{ id: 'pickup-search-input', dot: '#22C55E', ph: '🟢 Pickup location...' }, { id: 'drop-search-input', dot: '#FF6A00', ph: '🔴 Drop location...' }].map((row) => (
//         <div key={row.id} style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1.5px solid #EEEEEE', borderRadius: 12, padding: '0 12px', gap: 8 }}>
//           <div style={{ width: 10, height: 10, borderRadius: '50%', background: row.dot, flexShrink: 0 }} />
//           <input id={row.id} type="text" placeholder={row.ph} style={{ flex: 1, height: 46, border: 'none', outline: 'none', fontSize: 14, background: 'transparent', color: '#111' }} />
//         </div>
//       ))}
//       <div ref={mapRef} style={{ height: 260, width: '100%', borderRadius: 12, overflow: 'hidden', border: '1px solid #EEEEEE' }} />
//     </div>
//   );
// };

// const buildMapHTML = (pLat, pLng, dLat, dLng) => `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{margin:0;padding:0;box-sizing:border-box;font-family:Arial,sans-serif;}body{background:#F8F8F8;}.wrap{padding:10px;display:flex;flex-direction:column;gap:8px;}.row{display:flex;align-items:center;background:#fff;border:1.5px solid #EEEEEE;border-radius:12px;padding:0 12px;gap:8px;}.dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}.g{background:#22C55E;}.o{background:#FF6A00;}input{flex:1;height:44px;border:none;outline:none;font-size:14px;background:transparent;color:#111;}#map{height:250px;width:100%;}</style></head><body><div class="wrap"><div class="row"><span class="dot g"></span><input id="pi" type="text" placeholder="Pickup Location..."></div><div class="row"><span class="dot o"></span><input id="di" type="text" placeholder="Drop Location..."></div></div><div id="map"></div><script>let map,pm,dm,rl;function initMap(){map=new google.maps.Map(document.getElementById('map'),{center:{lat:20.5937,lng:78.9629},zoom:5,mapTypeControl:false,fullscreenControl:false,streetViewControl:false});pm=new google.maps.Marker({position:{lat:${pLat},lng:${pLng}},map,icon:{url:'https://maps.google.com/mapfiles/ms/icons/green-dot.png'}});dm=new google.maps.Marker({position:{lat:${dLat},lng:${dLng}},map,icon:{url:'https://maps.google.com/mapfiles/ms/icons/red-dot.png'}});rl=new google.maps.Polyline({path:[{lat:${pLat},lng:${pLng}},{lat:${dLat},lng:${dLng}}],strokeColor:'#FF6A00',strokeOpacity:0.9,strokeWeight:3,map});setup('pi','pickup');setup('di','drop');}function setup(id,type){const inp=document.getElementById(id);const ac=new google.maps.places.Autocomplete(inp,{componentRestrictions:{country:'in'}});ac.bindTo('bounds',map);ac.addListener('place_changed',()=>{const p=ac.getPlace();if(!p.geometry?.location)return;const lat=p.geometry.location.lat(),lng=p.geometry.location.lng(),address=p.formatted_address;if(type==='pickup'){pm.setPosition({lat,lng});rl.setPath([{lat,lng},dm.getPosition().toJSON()]);}else{dm.setPosition({lat,lng});rl.setPath([pm.getPosition().toJSON(),{lat,lng}]);}map.panTo({lat,lng});map.setZoom(13);if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage(JSON.stringify({type,lat,lng,address}));});}</script><script src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap" async defer></script></body></html>`;

// // ─── ANIMATED INPUT ───────────────────────────────────────
// const AnimatedInput = ({ label, value, onChangeText, placeholder, keyboardType, maxLength }) => {
//   const focused = useRef(new Animated.Value(0)).current;
//   const onFocus = () => Animated.timing(focused, { toValue: 1, duration: 180, useNativeDriver: false }).start();
//   const onBlur  = () => Animated.timing(focused, { toValue: 0, duration: 180, useNativeDriver: false }).start();
//   const borderColor = focused.interpolate({ inputRange: [0, 1], outputRange: [C.border, C.primary] });
//   return (
//     <View style={S.fieldWrap}>
//       <Text style={S.label}>{label}</Text>
//       <Animated.View style={[S.inputWrap, { borderColor }]}>
//         <TextInput
//           style={S.input}
//           placeholder={placeholder}
//           placeholderTextColor="#999"
//           keyboardType={keyboardType}
//           maxLength={maxLength}
//           value={value}
//           onFocus={onFocus}
//           onBlur={onBlur}
//           onChangeText={onChangeText}
//         />
//       </Animated.View>
//     </View>
//   );
// };

// // ─── MAIN COMPONENT ──────────────────────────────────────
// const CreateLoadRequestScreen = ({ navigation }) => {
//   const [loading, setLoading]               = useState(false);
//   const [imageUri, setImageUri]             = useState(null);
//   const [showLoadTypePicker, setShowLoadTypePicker] = useState(false);
//   const [loadTypeSearch, setLoadTypeSearch] = useState('');
//   const [menuVisible, setMenuVisible]       = useState(false);       // ← NEW
//   const [userName, setUserName]             = useState('');           // ← NEW
//   const [pickupCoords, setPickupCoords]     = useState({ latitude: 13.0827, longitude: 80.2707 });
//   const [dropCoords, setDropCoords]         = useState({ latitude: 12.9716, longitude: 77.5946 });
//   const [formData, setFormData]             = useState({
//     customerName: '', phoneNumber: '', alternativePhone: '',
//     pickupLocation: '', dropLocation: '', loadType: 'Furniture', weight: '', distance: '',
//   });

//   const dropdownHeight  = useRef(new Animated.Value(0)).current;
//   const dropdownOpacity = useRef(new Animated.Value(0)).current;
//   const submitScale     = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     (async () => {
//       const raw = await AsyncStorage.getItem('userData');
//       if (raw) {
//         const u = JSON.parse(raw);
//         setFormData(prev => ({ ...prev, phoneNumber: u.phoneNumber || '', customerName: u.name || '' }));
//         setUserName(u.name || '');   // ← NEW
//       }
//     })();
//   }, []);

//   // ─── LOGOUT ──────────────────────────────────────────── NEW
//   const handleLogout = () => {
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Logout',
//         style: 'destructive',
//         onPress: async () => {
//           await AsyncStorage.multiRemove(['userData', 'customerId']);
//           navigation.replace('Login');
//         },
//       },
//     ]);
//   };

//   const togglePicker = () => {
//     const opening = !showLoadTypePicker;
//     setShowLoadTypePicker(opening);
//     setLoadTypeSearch('');
//     Animated.parallel([
//       Animated.spring(dropdownHeight, { toValue: opening ? 220 : 0, speed: 18, bounciness: 3, useNativeDriver: false }),
//       Animated.timing(dropdownOpacity, { toValue: opening ? 1 : 0, duration: 200, useNativeDriver: false }),
//     ]).start();
//   };

//   const selectLoadType = (lt) => {
//     fd('loadType', lt);
//     Animated.parallel([
//       Animated.spring(dropdownHeight, { toValue: 0, speed: 18, bounciness: 3, useNativeDriver: false }),
//       Animated.timing(dropdownOpacity, { toValue: 0, duration: 150, useNativeDriver: false }),
//     ]).start(() => setShowLoadTypePicker(false));
//   };

//   const filteredTypes = LOAD_TYPES.filter(lt =>
//     lt.toLowerCase().includes(loadTypeSearch.toLowerCase())
//   );

//   const handlePickupSelect = async ({ lat, lng, address }) => {
//     const newPickup = { latitude: lat, longitude: lng };
//     setPickupCoords(newPickup);
//     setFormData(prev => ({ ...prev, pickupLocation: address }));
//     if (dropCoords.latitude) { const dist = await getRouteDistance(newPickup, dropCoords); setFormData(prev => ({ ...prev, distance: dist })); }
//   };

//   const handleDropSelect = async ({ lat, lng, address }) => {
//     const newDrop = { latitude: lat, longitude: lng };
//     setDropCoords(newDrop);
//     const dist = await getRouteDistance(pickupCoords, newDrop);
//     setFormData(prev => ({ ...prev, dropLocation: address, distance: dist }));
//   };

//   const handleWebViewMessage = async (event) => {
//     try {
//       const { type, lat, lng, address } = JSON.parse(event.nativeEvent.data);
//       if (type === 'pickup') await handlePickupSelect({ lat, lng, address });
//       else await handleDropSelect({ lat, lng, address });
//     } catch (e) {}
//   };

//   const pickImage = async () => {
//     const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!perm.granted) return Alert.alert('Permission required');
//     const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
//     if (!result.canceled) setImageUri(result.assets[0].uri);
//   };

//   const getEstimatedCost = () => {
//     const w = Number(formData.weight), d = Number(formData.distance);
//     if (!w || !d) return '--';
//     return `₹${Math.round(weightCharge(w) + d * 6)}`;
//   };

//   const handleSubmit = async () => {
//     if (!formData.pickupLocation) return Alert.alert('Error', 'Please select pickup location');
//     if (!formData.dropLocation)   return Alert.alert('Error', 'Please select drop location');
//     if (!formData.weight)         return Alert.alert('Error', 'Please enter weight');
//     Animated.sequence([
//       Animated.spring(submitScale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 2 }),
//       Animated.spring(submitScale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 8 }),
//     ]).start();
//     try {
//       setLoading(true);
//       const customerId = await AsyncStorage.getItem('customerId');
//       const data = new FormData();
//       Object.entries(formData).forEach(([k, v]) => data.append(k, v));
//       data.append('latitude', pickupCoords.latitude); data.append('longitude', pickupCoords.longitude);
//       data.append('dropLatitude', dropCoords.latitude); data.append('dropLongitude', dropCoords.longitude);
//       if (imageUri) data.append('loadImage', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });
//       await customerAPI.createLoadRequest(customerId, data);
//       Alert.alert('Success 🎉', 'Load request created!');
//       navigation.navigate('MyLoadRequests');
//     } catch (e) {
//       Alert.alert('Error', 'Failed to create load request');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderMap = () => {
//     if (Platform.OS === 'web') {
//       return <WebMapView pickupCoords={pickupCoords} dropCoords={dropCoords} onPickupSelect={handlePickupSelect} onDropSelect={handleDropSelect} />;
//     }
//     const { WebView } = require('react-native-webview');
//     return (
//       <View style={S.mapContainer}>
//         <WebView source={{ html: buildMapHTML(pickupCoords.latitude, pickupCoords.longitude, dropCoords.latitude, dropCoords.longitude) }}
//           style={S.map} javaScriptEnabled domStorageEnabled onMessage={handleWebViewMessage} scrollEnabled={false} />
//       </View>
//     );
//   };
//   const takePhoto = async () => {
//   const perm = await ImagePicker.requestCameraPermissionsAsync();
//   if (!perm.granted) return Alert.alert('Camera permission required');

//   const result = await ImagePicker.launchCameraAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     quality: 0.7,
//   });

//   if (!result.canceled) {
//     setImageUri(result.assets[0].uri);
//   }
// };

//   const fd = (field, val) => setFormData(prev => ({ ...prev, [field]: val }));

//   // Initials avatar for menu button
//   const initials = userName ? userName.charAt(0).toUpperCase() : '?';

//   return (
//     <SafeAreaView style={S.safe}>

//       {/* ── DROPDOWN MENU OVERLAY ── NEW */}
//       {menuVisible && (
//         <TouchableOpacity
//           style={S.menuOverlay}
//           activeOpacity={1}
//           onPress={() => setMenuVisible(false)}
//         >
//           <View style={S.menuDropdown}>
//             {/* User greeting */}
//             <View style={S.menuUserRow}>
//               <View style={S.menuAvatar}>
//                 <Text style={S.menuAvatarText}>{initials}</Text>
//               </View>
//               <View>
//                 <Text style={S.menuUserName}>{userName || 'User'}</Text>
//                 <Text style={S.menuUserSub}>Customer</Text>
//               </View>
//             </View>
//             <View style={S.menuDivider} />
//             {/* My Bookings */}
//             <TouchableOpacity
//               style={S.menuItem}
//               onPress={() => { setMenuVisible(false); navigation.navigate('MyLoadRequests'); }}
//             >
//               <Text style={S.menuItemIcon}>📋</Text>
//               <Text style={S.menuItemText}>My Bookings</Text>
//             </TouchableOpacity>
//             {/* Profile */}
//             <TouchableOpacity
//               style={S.menuItem}
//               onPress={() => { setMenuVisible(false); navigation.navigate('Profile'); }}
//             >
//               <Text style={S.menuItemIcon}>👤</Text>
//               <Text style={S.menuItemText}>My Profile</Text>
//             </TouchableOpacity>
//             {/* Support */}
//             <TouchableOpacity
//               style={S.menuItem}
//               onPress={() => { setMenuVisible(false); navigation.navigate('Support'); }}
//             >
//               <Text style={S.menuItemIcon}>🎧</Text>
//               <Text style={S.menuItemText}>Support</Text>
//             </TouchableOpacity>
//             <View style={S.menuDivider} />
//             {/* Logout */}
//             <TouchableOpacity
//               style={S.menuItem}
//               onPress={() => { setMenuVisible(false); handleLogout(); }}
//             >
//               <Text style={S.menuItemIcon}>🚪</Text>
//               <Text style={[S.menuItemText, { color: C.danger }]}>Logout</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       )}

//       <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

//         {/* ── HEADER ── UPDATED: no back button, avatar menu on right */}
//         <FadeInView delay={0} style={S.header}>
//           <View>
//             <Text style={S.headerTitle}>Create Load Request</Text>
//             <Text style={S.headerSub}>Fill in the details below</Text>
//           </View>

//           {/* Avatar / menu trigger */}
//           <TouchableOpacity
//             style={S.avatarBtn}
//             onPress={() => setMenuVisible(v => !v)}
//             activeOpacity={0.8}
//           >
//             <Text style={S.avatarText}>{initials}</Text>
//           </TouchableOpacity>
//         </FadeInView>

//         {/* MAP */}
//         <FadeInView delay={80} style={S.mapWrapper}>{renderMap()}</FadeInView>

//         {/* LOCATION DISPLAY */}
//         {(formData.pickupLocation || formData.dropLocation) && (
//           <FadeInView delay={0} style={S.locCard}>
//             {formData.pickupLocation ? (
//               <View style={S.locRow}><View style={[S.locDot, { backgroundColor: C.success }]} /><Text style={S.locText} numberOfLines={2}>{formData.pickupLocation}</Text></View>
//             ) : null}
//             {formData.dropLocation ? (
//               <View style={S.locRow}><View style={[S.locDot, { backgroundColor: C.primary }]} /><Text style={S.locText} numberOfLines={2}>{formData.dropLocation}</Text></View>
//             ) : null}
//           </FadeInView>
//         )}

//         {/* FORM */}
//         <View style={S.form}>

//           {/* Distance */}
//           <FadeInView delay={120} style={S.readonlyField}>
//             <Text style={S.readonlyLabel}>📏 Distance</Text>
//             <Text style={S.readonlyValue}>{formData.distance ? `${formData.distance} km` : 'Auto-calculated'}</Text>
//           </FadeInView>

//            <FadeInView delay={310}>
//   <AnimatedInput
//     label="Weight (kg)"
//     value={formData.weight}
//     placeholder="Enter weight in kg"
//     keyboardType="numeric"
//     onChangeText={t => fd('weight', t.replace(/[^0-9]/g, ''))}
//   />
// </FadeInView>
              

//           {/* Load Type Picker */}
//           <FadeInView delay={400} style={S.fieldWrap}>
//             <Text style={S.label}>Load Type</Text>
//             <AnimatedPressable onPress={togglePicker} style={S.pickerBtn}>
//               <View style={S.pickerBtnInner}>
//                 <Text style={S.pickerBtnText}>{formData.loadType}</Text>
//                 <Text style={{ color: C.primary, fontSize: 13 }}>{showLoadTypePicker ? '▲' : '▼'}</Text>
//               </View>
//             </AnimatedPressable>

//             <Animated.View style={[S.pickerDropdown, { maxHeight: dropdownHeight, opacity: dropdownOpacity, overflow: 'hidden' }]}>
//               <View style={S.searchWrap}>
//                 <TextInput
//                   style={S.searchInput}
//                   placeholder="Search load type..."
//                   placeholderTextColor="#aaa"
//                   value={loadTypeSearch}
//                   onChangeText={setLoadTypeSearch}
//                 />
//               </View>
//               <ScrollView style={{ maxHeight: 160 }} nestedScrollEnabled>
//                 {filteredTypes.map(lt => (
//                   <TouchableOpacity key={lt} style={[S.pickerItem, formData.loadType === lt && S.pickerItemActive]}
//                     onPress={() => selectLoadType(lt)}>
//                     <Text style={[S.pickerItemText, formData.loadType === lt && { color: C.primary, fontWeight: '700' }]}>{lt}</Text>
//                   </TouchableOpacity>
//                 ))}
//                 {filteredTypes.length === 0 && (
//                   <View style={{ padding: 16, alignItems: 'center' }}>
//                     <Text style={{ color: '#aaa', fontSize: 13 }}>No match found</Text>
//                   </View>
//                 )}
//               </ScrollView>
//             </Animated.View>
//           </FadeInView>

//           <FadeInView delay={440}>
//   <View style={S.fieldWrap}>
    
//     {/* Title */}
//     <Text style={S.label}>Upload Load Image</Text>

//     {imageUri ? (
//       <>
//         <Image source={{ uri: imageUri }} style={S.previewImage} />

//         {/* Buttons Row */}
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          
//           {/* Camera */}
//           <AnimatedPressable onPress={takePhoto} style={{ flex: 1, marginRight: 6 }}>
//             <View style={S.imageUploadInner}>
//               <Text style={S.imageUploadEmoji}>📷</Text>
//               <Text style={S.imageUploadText}>Camera</Text>
//             </View>
//           </AnimatedPressable>

//           {/* Gallery */}
//           <AnimatedPressable onPress={pickImage} style={{ flex: 1, marginLeft: 6 }}>
//             <View style={S.imageUploadInner}>
//               <Text style={S.imageUploadEmoji}>🖼️</Text>
//               <Text style={S.imageUploadText}>Gallery</Text>
//             </View>
//           </AnimatedPressable>

//         </View>
//       </>
//     ) : (
//       <View style={{ flexDirection: 'row', gap: 10 }}>
        
//         {/* Camera */}
//         <AnimatedPressable onPress={takePhoto} style={{ flex: 1 }}>
//           <View style={S.imageUploadInner}>
//             <Text style={S.imageUploadEmoji}>📷</Text>
//             <Text style={S.imageUploadText}>Camera</Text>
//           </View>
//         </AnimatedPressable>

//         {/* Gallery */}
//         <AnimatedPressable onPress={pickImage} style={{ flex: 1 }}>
//           <View style={S.imageUploadInner}>
//             <Text style={S.imageUploadEmoji}>🖼️</Text>
//             <Text style={S.imageUploadText}>Gallery</Text>
//           </View>
//         </AnimatedPressable>

//       </View>
//     )}

//   </View>
// </FadeInView>

// {/* Estimated Price */}
//           <FadeInView delay={480} style={S.priceCard}>
//             <View>
//               <Text style={S.priceLabel}>Estimated Price</Text>
//               <Text style={S.priceSub}>Based on weight + distance</Text>
//             </View>
//             <Text style={S.priceValue}>{getEstimatedCost()}</Text>
//           </FadeInView>
           
      
     
        
//        <FadeInView delay={160}>
//   <AnimatedInput
//     label="Customer Name"
//     value={formData.customerName}
//     placeholder="Your name"
//     keyboardType="default"
//     onChangeText={t => fd('customerName', t)}
//   />
// </FadeInView>

// <FadeInView delay={210}>
//   <AnimatedInput
//     label="Phone Number"
//     value={formData.phoneNumber}
//     placeholder="10-digit mobile"
//     keyboardType="number-pad"
//     maxLength={10}
//     onChangeText={t => fd('phoneNumber', t.replace(/[^0-9]/g, ''))}
//   />
// </FadeInView>

// <FadeInView delay={260}>
//   <AnimatedInput
//     label="Alternative Phone (Optional)"
//     value={formData.alternativePhone}
//     placeholder="Alternative number"
//     keyboardType="number-pad"
//     maxLength={10}
//     onChangeText={t => fd('alternativePhone', t.replace(/[^0-9]/g, ''))}
//   />
// </FadeInView>
          

          

//           {/* SUBMIT */}
//           <FadeInView delay={520}>
//             <Animated.View style={{ transform: [{ scale: submitScale }] }}>
//               <TouchableOpacity style={[S.submitBtn, loading && S.submitBtnDisabled]} onPress={handleSubmit} disabled={loading} activeOpacity={0.85}>
//                 {loading ? <ActivityIndicator color={C.white} /> : <Text style={S.submitBtnText}>Create Load Request →</Text>}
//               </TouchableOpacity>
//             </Animated.View>
//           </FadeInView>

//           <View style={{ height: 32 }} />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default CreateLoadRequestScreen;

// const S = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: C.bg },

//   // ── Header ──────────────────────────────────────────────
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',   // title left, avatar right
//     backgroundColor: C.white,
//     padding: 20,
//     paddingTop: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: C.border,
//   },
//   headerTitle: { fontSize: 20, fontWeight: '700', color: C.textPrimary },
//   headerSub:   { fontSize: 13, color: C.textSecondary, marginTop: 2 },

//   // Avatar button (top-right)
//   avatarBtn: {
//     width: 40, height: 40, borderRadius: 20,
//     backgroundColor: C.primary,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   avatarText: { color: C.white, fontWeight: '800', fontSize: 16 },

//   // ── Dropdown menu ────────────────────────────────────────
//   menuOverlay: {
//     position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999,
//   },
//   menuDropdown: {
//     position: 'absolute',
//     top: 70, right: 16,
//     backgroundColor: C.white,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: C.border,
//     paddingVertical: 8,
//     minWidth: 200,
//     zIndex: 1000,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.12,
//     shadowRadius: 16,
//     elevation: 10,
//   },
//   menuUserRow: {
//     flexDirection: 'row', alignItems: 'center', gap: 10,
//     paddingHorizontal: 16, paddingVertical: 12,
//   },
//   menuAvatar: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
//   },
//   menuAvatarText: { color: C.white, fontWeight: '800', fontSize: 15 },
//   menuUserName:   { fontSize: 14, fontWeight: '700', color: C.textPrimary },
//   menuUserSub:    { fontSize: 11, color: C.textSecondary, marginTop: 1 },
//   menuDivider:    { height: 1, backgroundColor: C.border, marginHorizontal: 12, marginVertical: 4 },
//   menuItem: {
//     flexDirection: 'row', alignItems: 'center', gap: 10,
//     paddingHorizontal: 16, paddingVertical: 12,
//   },
//   menuItemIcon: { fontSize: 16 },
//   menuItemText: { fontSize: 14, fontWeight: '600', color: C.textPrimary },

//   // ── Map ──────────────────────────────────────────────────
//   mapWrapper:   { margin: 12 },
//   mapContainer: { height: 380, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
//   map:          { flex: 1 },

//   // ── Location card ────────────────────────────────────────
//   locCard: {
//     marginHorizontal: 12, marginBottom: 4, backgroundColor: C.white,
//     borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.border, gap: 10,
//   },
//   locRow:  { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
//   locDot:  { width: 10, height: 10, borderRadius: 5, marginTop: 4, flexShrink: 0 },
//   locText: { flex: 1, fontSize: 13, color: C.textPrimary, lineHeight: 18 },

//   // ── Form ─────────────────────────────────────────────────
//   form:      { padding: 12, gap: 12 },
//   fieldWrap: {},
//   label: {
//     fontSize: 12, fontWeight: '600', color: C.textSecondary,
//     marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase',
//   },
//   inputWrap: {
//     height: 48, borderWidth: 1.5, borderRadius: 12,
//     backgroundColor: C.white, paddingHorizontal: 14, justifyContent: 'center',
//   },
//   input: { fontSize: 15, color: C.textPrimary, height: 48 },

//   readonlyField: {
//     height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, backgroundColor: C.primaryLight,
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//   },
//   readonlyLabel: { fontSize: 14, color: '#CC4400' },
//   readonlyValue: { fontSize: 15, fontWeight: '700', color: C.primary },

//   pickerBtn: { borderRadius: 12 },
//   pickerBtnInner: {
//     height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, backgroundColor: C.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//   },
//   pickerBtnText: { fontSize: 15, color: C.textPrimary },
//   pickerDropdown: {
//     backgroundColor: C.white, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 5, marginTop: 4,
//   },
//   searchWrap:  { paddingHorizontal: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: C.border },
//   searchInput: {
//     height: 36, borderWidth: 1, borderColor: C.border, borderRadius: 8,
//     paddingHorizontal: 10, fontSize: 13, color: C.textPrimary, backgroundColor: C.bg,
//   },
//   pickerItem:       { padding: 14, borderBottomWidth: 1, borderBottomColor: C.border },
//   pickerItemActive: { backgroundColor: C.primaryLight },
//   pickerItemText:   { fontSize: 15, color: C.textPrimary },

//   imageUploadBtn:   { borderRadius: 12 },
//   imageUploadInner: {
//     height: 54, borderWidth: 1.5, borderColor: C.border, borderRadius: 12,
//     borderStyle: 'dashed', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: C.white,
//   },
//   imageUploadEmoji: { fontSize: 20 },
//   imageUploadText:  { fontSize: 15, fontWeight: '600', color: C.textSecondary },
//   previewImage:     { width: '100%', height: 200, borderRadius: 14 },
//   changeImageBtn:   { alignSelf: 'flex-end', marginTop: 8 },
//   changeImageText:  { color: C.primary, fontSize: 13, fontWeight: '600' },

//   priceCard: {
//     height: 64, borderWidth: 1.5, borderColor: '#FFD4A8', borderRadius: 14,
//     backgroundColor: C.primaryLight, flexDirection: 'row', alignItems: 'center',
//     justifyContent: 'space-between', paddingHorizontal: 16,
//   },
//   priceLabel: { fontSize: 14, fontWeight: '600', color: '#CC4400' },
//   priceSub:   { fontSize: 11, color: C.textSecondary, marginTop: 2 },
//   priceValue: { fontSize: 24, fontWeight: '800', color: C.primary },

//   submitBtn: {
//     height: 56, backgroundColor: C.primary, borderRadius: 16,
//     alignItems: 'center', justifyContent: 'center',
//     shadowColor: '#ee801f', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6,
//   },
//   submitBtnDisabled: { opacity: 0.6 },
//   submitBtnText:     { color: C.white, fontSize: 16, fontWeight: '700' },
// });


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
// import { useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { customerAPI } from '../services/api';

// const C = {
//   primary:      '#FF6A00',
//   primaryLight: '#FFF4EC',
//   white:        '#FFFFFF',
//   textPrimary:  '#111111',
//   textSecondary:'#666666',
//   border:       '#EEEEEE',
//   bg:           '#F8F8F8',
//   success:      '#22C55E',
//   danger:       '#EF4444',
// };

// const GOOGLE_MAPS_API_KEY = 'AIzaSyDZwBw_ToWcWIggRVBSFA2Sy7mvEhKZUbU';

// const haversine = (lat1, lon1, lat2, lon2) => {
//   const R = 6371, dLat = ((lat2 - lat1) * Math.PI) / 180, dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
//   return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
// };

// const getRouteDistance = async (origin, dest) => {
//   try {
//     const res = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
//       params: { origins: `${origin.latitude},${origin.longitude}`, destinations: `${dest.latitude},${dest.longitude}`, key: GOOGLE_MAPS_API_KEY, units: 'metric' },
//     });
//     const el = res.data.rows[0]?.elements[0];
//     if (el?.status === 'OK') return (el.distance.value / 1000).toFixed(2);
//   } catch (_) {}
//   return haversine(origin.latitude, origin.longitude, dest.latitude, dest.longitude);
// };

// const weightCharge = (w) => { if (w <= 500) return 200; if (w <= 1000) return 400; if (w <= 1500) return 600; return 800; };

// const LOAD_TYPES = [
//   'Cement', 'Steel', 'Bricks', 'Sand', 'Gravel', 'Iron Rods', 'Tiles', 'Plywood', 'Glass Panels', 'Construction Materials',
//   'Furniture', 'Home Appliances', 'Electronics', 'Household Items', 'Kitchen Equipment',
//   'Vegetables', 'Fruits', 'Fish & Seafood', 'Meat & Poultry', 'Dairy Products', 'Groceries', 'Frozen Foods', 'Packaged Foods',
//   'Machinery', 'Industrial Goods', 'Auto Parts', 'Heavy Equipment', 'Generators', 'Pumps & Motors', 'Chemicals',
//   'Textiles', 'Garments', 'Leather Goods', 'Cotton Bales',
//   'Pharmaceuticals', 'Medical Equipment', 'Lab Supplies',
//   'Seeds & Fertilizers', 'Agricultural Equipment', 'Animal Feed',
//   'E-commerce Goods', 'Retail Products', 'Stationery', 'Books & Paper',
//   'Water Cans', 'Oil & Lubricants', 'Beverages',
//   'Scrap Metal', 'Waste Material', 'Hazardous Goods', 'Others',
// ];

// // ─── ANIMATED PRESSABLE BUTTON ────────────────────────────
// const AnimatedPressable = ({ onPress, style, children, disabled }) => {
//   const scale = useRef(new Animated.Value(1)).current;
//   const press = () => {
//     Animated.sequence([
//       Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 2 }),
//       Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }),
//     ]).start();
//     onPress?.();
//   };
//   return (
//     <Animated.View style={[{ transform: [{ scale }] }, style]}>
//       <Pressable onPress={disabled ? null : press} style={{ width: '100%' }}>{children}</Pressable>
//     </Animated.View>
//   );
// };

// // ─── FADE-IN CARD ─────────────────────────────────────────
// const FadeInView = ({ delay = 0, children, style }) => {
//   const opacity = useRef(new Animated.Value(0)).current;
//   const translateY = useRef(new Animated.Value(18)).current;
//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(opacity, { toValue: 1, duration: 380, delay, useNativeDriver: true }),
//       Animated.spring(translateY, { toValue: 0, delay, speed: 14, bounciness: 4, useNativeDriver: true }),
//     ]).start();
//   }, []);
//   return <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>{children}</Animated.View>;
// };

// // ─── WEB MAP COMPONENT ───────────────────────────────────
// const WebMapView = ({ onPickupSelect, onDropSelect, pickupCoords, dropCoords }) => {
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const pickupMarkerRef = useRef(null);
//   const dropMarkerRef = useRef(null);
//   const polylineRef = useRef(null);

//   const initMap = () => {
//     if (!mapRef.current || mapInstanceRef.current) return;
//     const map = new window.google.maps.Map(mapRef.current, { center: { lat: 20.5937, lng: 78.9629 }, zoom: 5, mapTypeControl: false, fullscreenControl: false, streetViewControl: false });
//     mapInstanceRef.current = map;
//     pickupMarkerRef.current = new window.google.maps.Marker({ position: { lat: pickupCoords.latitude, lng: pickupCoords.longitude }, map, icon: { url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' } });
//     dropMarkerRef.current = new window.google.maps.Marker({ position: { lat: dropCoords.latitude, lng: dropCoords.longitude }, map, icon: { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' } });
//     polylineRef.current = new window.google.maps.Polyline({ path: [{ lat: pickupCoords.latitude, lng: pickupCoords.longitude }, { lat: dropCoords.latitude, lng: dropCoords.longitude }], strokeColor: '#FF6A00', strokeOpacity: 0.9, strokeWeight: 3, map });

//     ['pickup-search-input', 'drop-search-input'].forEach((id, idx) => {
//       const inp = document.getElementById(id);
//       if (!inp) return;
//       const ac = new window.google.maps.places.Autocomplete(inp, { componentRestrictions: { country: 'in' } });
//       ac.bindTo('bounds', map);
//       ac.addListener('place_changed', () => {
//         const place = ac.getPlace();
//         if (!place.geometry?.location) return;
//         const lat = place.geometry.location.lat(), lng = place.geometry.location.lng(), address = place.formatted_address;
//         if (idx === 0) {
//           pickupMarkerRef.current.setPosition({ lat, lng });
//           polylineRef.current.setPath([{ lat, lng }, dropMarkerRef.current.getPosition().toJSON()]);
//           onPickupSelect({ lat, lng, address });
//         } else {
//           dropMarkerRef.current.setPosition({ lat, lng });
//           polylineRef.current.setPath([pickupMarkerRef.current.getPosition().toJSON(), { lat, lng }]);
//           onDropSelect({ lat, lng, address });
//         }
//         map.panTo({ lat, lng }); map.setZoom(13);
//       });
//     });
//   };

//   useEffect(() => {
//     if (window.google?.maps) { initMap(); return; }
//     const scriptId = 'google-maps-script';
//     if (!document.getElementById(scriptId)) {
//       window.__initGoogleMapCallback = () => initMap();
//       const script = document.createElement('script');
//       script.id = scriptId;
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=__initGoogleMapCallback`;
//       script.async = true; script.defer = true;
//       document.head.appendChild(script);
//     } else {
//       const iv = setInterval(() => { if (window.google?.maps) { initMap(); clearInterval(iv); } }, 200);
//     }
//   }, []);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//       {[{ id: 'pickup-search-input', dot: '#22C55E', ph: '🟢 Pickup location...' }, { id: 'drop-search-input', dot: '#FF6A00', ph: '🔴 Drop location...' }].map((row) => (
//         <div key={row.id} style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1.5px solid #EEEEEE', borderRadius: 12, padding: '0 12px', gap: 8 }}>
//           <div style={{ width: 10, height: 10, borderRadius: '50%', background: row.dot, flexShrink: 0 }} />
//           <input id={row.id} type="text" placeholder={row.ph} style={{ flex: 1, height: 46, border: 'none', outline: 'none', fontSize: 14, background: 'transparent', color: '#111' }} />
//         </div>
//       ))}
//       <div ref={mapRef} style={{ height: 260, width: '100%', borderRadius: 12, overflow: 'hidden', border: '1px solid #EEEEEE' }} />
//     </div>
//   );
// };

// const buildMapHTML = (pLat, pLng, dLat, dLng) => `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{margin:0;padding:0;box-sizing:border-box;font-family:Arial,sans-serif;}body{background:#F8F8F8;}.wrap{padding:10px;display:flex;flex-direction:column;gap:8px;}.row{display:flex;align-items:center;background:#fff;border:1.5px solid #EEEEEE;border-radius:12px;padding:0 12px;gap:8px;}.dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}.g{background:#22C55E;}.o{background:#FF6A00;}input{flex:1;height:44px;border:none;outline:none;font-size:14px;background:transparent;color:#111;}#map{height:250px;width:100%;}</style></head><body><div class="wrap"><div class="row"><span class="dot g"></span><input id="pi" type="text" placeholder="Pickup Location..."></div><div class="row"><span class="dot o"></span><input id="di" type="text" placeholder="Drop Location..."></div></div><div id="map"></div><script>let map,pm,dm,rl;function initMap(){map=new google.maps.Map(document.getElementById('map'),{center:{lat:20.5937,lng:78.9629},zoom:5,mapTypeControl:false,fullscreenControl:false,streetViewControl:false});pm=new google.maps.Marker({position:{lat:${pLat},lng:${pLng}},map,icon:{url:'https://maps.google.com/mapfiles/ms/icons/green-dot.png'}});dm=new google.maps.Marker({position:{lat:${dLat},lng:${dLng}},map,icon:{url:'https://maps.google.com/mapfiles/ms/icons/red-dot.png'}});rl=new google.maps.Polyline({path:[{lat:${pLat},lng:${pLng}},{lat:${dLat},lng:${dLng}}],strokeColor:'#FF6A00',strokeOpacity:0.9,strokeWeight:3,map});setup('pi','pickup');setup('di','drop');}function setup(id,type){const inp=document.getElementById(id);const ac=new google.maps.places.Autocomplete(inp,{componentRestrictions:{country:'in'}});ac.bindTo('bounds',map);ac.addListener('place_changed',()=>{const p=ac.getPlace();if(!p.geometry?.location)return;const lat=p.geometry.location.lat(),lng=p.geometry.location.lng(),address=p.formatted_address;if(type==='pickup'){pm.setPosition({lat,lng});rl.setPath([{lat,lng},dm.getPosition().toJSON()]);}else{dm.setPosition({lat,lng});rl.setPath([pm.getPosition().toJSON(),{lat,lng}]);}map.panTo({lat,lng});map.setZoom(13);if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage(JSON.stringify({type,lat,lng,address}));});}</script><script src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap" async defer></script></body></html>`;

// // ─── ANIMATED INPUT ───────────────────────────────────────
// const AnimatedInput = ({ label, value, onChangeText, placeholder, keyboardType, maxLength }) => {
//   const focused = useRef(new Animated.Value(0)).current;
//   const onFocus = () => Animated.timing(focused, { toValue: 1, duration: 180, useNativeDriver: false }).start();
//   const onBlur  = () => Animated.timing(focused, { toValue: 0, duration: 180, useNativeDriver: false }).start();
//   const borderColor = focused.interpolate({ inputRange: [0, 1], outputRange: [C.border, C.primary] });
//   return (
//     <View style={S.fieldWrap}>
//       <Text style={S.label}>{label}</Text>
//       <Animated.View style={[S.inputWrap, { borderColor }]}>
//         <TextInput
//           style={S.input}
//           placeholder={placeholder}
//           placeholderTextColor="#999"
//           keyboardType={keyboardType}
//           maxLength={maxLength}
//           value={value}
//           onFocus={onFocus}
//           onBlur={onBlur}
//           onChangeText={onChangeText}
//         />
//       </Animated.View>
//     </View>
//   );
// };

// // ─── MAIN COMPONENT ──────────────────────────────────────
// const CreateLoadRequestScreen = ({ navigation }) => {
//   const [loading, setLoading]               = useState(false);
//   const [imageUri, setImageUri]             = useState(null);
//   const [showLoadTypePicker, setShowLoadTypePicker] = useState(false);
//   const [loadTypeSearch, setLoadTypeSearch] = useState('');
//   const [menuVisible, setMenuVisible]       = useState(false);
//   const [userName, setUserName]             = useState('');
//   const [pickupCoords, setPickupCoords]     = useState({ latitude: 13.0827, longitude: 80.2707 });
//   const [dropCoords, setDropCoords]         = useState({ latitude: 12.9716, longitude: 77.5946 });
//   const [formData, setFormData]             = useState({
//     customerName: '', phoneNumber: '', alternativePhone: '',
//     pickupLocation: '', dropLocation: '', loadType: 'Furniture', weight: '', distance: '',
//   });

//   const dropdownHeight  = useRef(new Animated.Value(0)).current;
//   const dropdownOpacity = useRef(new Animated.Value(0)).current;
//   const submitScale     = useRef(new Animated.Value(1)).current;

//   // ✅ ScrollView ref — alternative phone focus பண்ணும்போது scroll பண்ண
//   const scrollViewRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       const raw = await AsyncStorage.getItem('userData');
//       if (raw) {
//         const u = JSON.parse(raw);
//         setFormData(prev => ({ ...prev, phoneNumber: u.phoneNumber || '', customerName: u.name || '' }));
//         setUserName(u.name || '');
//       }
//     })();
//   }, []);

//   const handleLogout = () => {
//     Alert.alert('Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Logout',
//         style: 'destructive',
//         onPress: async () => {
//           await AsyncStorage.multiRemove(['userData', 'customerId']);
//           navigation.replace('Login');
//         },
//       },
//     ]);
//   };

//   const togglePicker = () => {
//     const opening = !showLoadTypePicker;
//     setShowLoadTypePicker(opening);
//     setLoadTypeSearch('');
//     Animated.parallel([
//       Animated.spring(dropdownHeight, { toValue: opening ? 220 : 0, speed: 18, bounciness: 3, useNativeDriver: false }),
//       Animated.timing(dropdownOpacity, { toValue: opening ? 1 : 0, duration: 200, useNativeDriver: false }),
//     ]).start();
//   };

//   const selectLoadType = (lt) => {
//     fd('loadType', lt);
//     Animated.parallel([
//       Animated.spring(dropdownHeight, { toValue: 0, speed: 18, bounciness: 3, useNativeDriver: false }),
//       Animated.timing(dropdownOpacity, { toValue: 0, duration: 150, useNativeDriver: false }),
//     ]).start(() => setShowLoadTypePicker(false));
//   };

//   const filteredTypes = LOAD_TYPES.filter(lt =>
//     lt.toLowerCase().includes(loadTypeSearch.toLowerCase())
//   );

//   const handlePickupSelect = async ({ lat, lng, address }) => {
//     const newPickup = { latitude: lat, longitude: lng };
//     setPickupCoords(newPickup);
//     setFormData(prev => ({ ...prev, pickupLocation: address }));
//     if (dropCoords.latitude) { const dist = await getRouteDistance(newPickup, dropCoords); setFormData(prev => ({ ...prev, distance: dist })); }
//   };

//   const handleDropSelect = async ({ lat, lng, address }) => {
//     const newDrop = { latitude: lat, longitude: lng };
//     setDropCoords(newDrop);
//     const dist = await getRouteDistance(pickupCoords, newDrop);
//     setFormData(prev => ({ ...prev, dropLocation: address, distance: dist }));
//   };

//   const handleWebViewMessage = async (event) => {
//     try {
//       const { type, lat, lng, address } = JSON.parse(event.nativeEvent.data);
//       if (type === 'pickup') await handlePickupSelect({ lat, lng, address });
//       else await handleDropSelect({ lat, lng, address });
//     } catch (e) {}
//   };

//   const pickImage = async () => {
//     const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!perm.granted) return Alert.alert('Permission required');
//     const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
//     if (!result.canceled) setImageUri(result.assets[0].uri);
//   };

//   const takePhoto = async () => {
//     const perm = await ImagePicker.requestCameraPermissionsAsync();
//     if (!perm.granted) return Alert.alert('Camera permission required');
//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.7,
//     });
//     if (!result.canceled) setImageUri(result.assets[0].uri);
//   };

//   const getEstimatedCost = () => {
//     const w = Number(formData.weight), d = Number(formData.distance);
//     if (!w || !d) return '--';
//     return `₹${Math.round(weightCharge(w) + d * 6)}`;
//   };

//   const handleSubmit = async () => {
//     if (!formData.pickupLocation) return Alert.alert('Error', 'Please select pickup location');
//     if (!formData.dropLocation)   return Alert.alert('Error', 'Please select drop location');
//     if (!formData.weight)         return Alert.alert('Error', 'Please enter weight');
//     Animated.sequence([
//       Animated.spring(submitScale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 2 }),
//       Animated.spring(submitScale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 8 }),
//     ]).start();
//     try {
//       setLoading(true);
//       const customerId = await AsyncStorage.getItem('customerId');
//       const data = new FormData();
//       Object.entries(formData).forEach(([k, v]) => data.append(k, v));
//       data.append('latitude', pickupCoords.latitude); data.append('longitude', pickupCoords.longitude);
//       data.append('dropLatitude', dropCoords.latitude); data.append('dropLongitude', dropCoords.longitude);
//       if (imageUri) data.append('loadImage', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });
//       await customerAPI.createLoadRequest(customerId, data);
//       Alert.alert('Success 🎉', 'Load request created!');
//       navigation.navigate('MyLoadRequests');
//     } catch (e) {
//       Alert.alert('Error', 'Failed to create load request');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderMap = () => {
//     if (Platform.OS === 'web') {
//       return <WebMapView pickupCoords={pickupCoords} dropCoords={dropCoords} onPickupSelect={handlePickupSelect} onDropSelect={handleDropSelect} />;
//     }
//     const { WebView } = require('react-native-webview');
//     return (
//       <View style={S.mapContainer}>
//         <WebView
//           source={{ html: buildMapHTML(pickupCoords.latitude, pickupCoords.longitude, dropCoords.latitude, dropCoords.longitude) }}
//           style={S.map}
//           javaScriptEnabled
//           domStorageEnabled
//           onMessage={handleWebViewMessage}
//           scrollEnabled={false}
//         />
//       </View>
//     );
//   };

//   const fd = (field, val) => setFormData(prev => ({ ...prev, [field]: val }));

//   const initials = userName ? userName.charAt(0).toUpperCase() : '?';

//   return (
//     // ✅ FIX: SafeAreaView → KeyboardAvoidingView → ScrollView
//     <SafeAreaView style={S.safe}>

//       {/* ── DROPDOWN MENU OVERLAY ── */}
//       {menuVisible && (
//         <TouchableOpacity
//           style={S.menuOverlay}
//           activeOpacity={1}
//           onPress={() => setMenuVisible(false)}
//         >
//           <View style={S.menuDropdown}>
//             <View style={S.menuUserRow}>
//               <View style={S.menuAvatar}>
//                 <Text style={S.menuAvatarText}>{initials}</Text>
//               </View>
//               <View>
//                 <Text style={S.menuUserName}>{userName || 'User'}</Text>
//                 <Text style={S.menuUserSub}>Customer</Text>
//               </View>
//             </View>
//             <View style={S.menuDivider} />
//             <TouchableOpacity style={S.menuItem} onPress={() => { setMenuVisible(false); navigation.navigate('MyLoadRequests'); }}>
//               <Text style={S.menuItemIcon}>📋</Text>
//               <Text style={S.menuItemText}>My Bookings</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={S.menuItem} onPress={() => { setMenuVisible(false); navigation.navigate('Profile'); }}>
//               <Text style={S.menuItemIcon}>👤</Text>
//               <Text style={S.menuItemText}>My Profile</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={S.menuItem} onPress={() => { setMenuVisible(false); navigation.navigate('Support'); }}>
//               <Text style={S.menuItemIcon}>🎧</Text>
//               <Text style={S.menuItemText}>Support</Text>
//             </TouchableOpacity>
//             <View style={S.menuDivider} />
//             <TouchableOpacity style={S.menuItem} onPress={() => { setMenuVisible(false); handleLogout(); }}>
//               <Text style={S.menuItemIcon}>🚪</Text>
//               <Text style={[S.menuItemText, { color: C.danger }]}>Logout</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       )}

//       {/* ✅ KEY FIX: KeyboardAvoidingView wraps ScrollView */}
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//       >
//         <ScrollView
//           ref={scrollViewRef}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ flexGrow: 1 }}  // ✅ இது important
//         >

//           {/* ── HEADER ── */}
//           <FadeInView delay={0} style={S.header}>
//             <View>
//               <Text style={S.headerTitle}>Create Load Request</Text>
//               <Text style={S.headerSub}>Fill in the details below</Text>
//             </View>
//             <TouchableOpacity
//               style={S.avatarBtn}
//               onPress={() => setMenuVisible(v => !v)}
//               activeOpacity={0.8}
//             >
//               <Text style={S.avatarText}>{initials}</Text>
//             </TouchableOpacity>
//           </FadeInView>

//           {/* MAP */}
//           <FadeInView delay={80} style={S.mapWrapper}>{renderMap()}</FadeInView>

//           {/* LOCATION DISPLAY */}
//           {(formData.pickupLocation || formData.dropLocation) && (
//             <FadeInView delay={0} style={S.locCard}>
//               {formData.pickupLocation ? (
//                 <View style={S.locRow}>
//                   <View style={[S.locDot, { backgroundColor: C.success }]} />
//                   <Text style={S.locText} numberOfLines={2}>{formData.pickupLocation}</Text>
//                 </View>
//               ) : null}
//               {formData.dropLocation ? (
//                 <View style={S.locRow}>
//                   <View style={[S.locDot, { backgroundColor: C.primary }]} />
//                   <Text style={S.locText} numberOfLines={2}>{formData.dropLocation}</Text>
//                 </View>
//               ) : null}
//             </FadeInView>
//           )}

//           {/* FORM */}
//           <View style={S.form}>

//             {/* Distance */}
//             <FadeInView delay={120} style={S.readonlyField}>
//               <Text style={S.readonlyLabel}>📏 Distance</Text>
//               <Text style={S.readonlyValue}>{formData.distance ? `${formData.distance} km` : 'Auto-calculated'}</Text>
//             </FadeInView>

//             {/* Weight */}
//             <FadeInView delay={310}>
//               <AnimatedInput
//                 label="Weight (kg)"
//                 value={formData.weight}
//                 placeholder="Enter weight in kg"
//                 keyboardType="numeric"
//                 onChangeText={t => fd('weight', t.replace(/[^0-9]/g, ''))}
//               />
//             </FadeInView>

//             {/* Load Type Picker */}
//             <FadeInView delay={400} style={S.fieldWrap}>
//               <Text style={S.label}>Load Type</Text>
//               <AnimatedPressable onPress={togglePicker} style={S.pickerBtn}>
//                 <View style={S.pickerBtnInner}>
//                   <Text style={S.pickerBtnText}>{formData.loadType}</Text>
//                   <Text style={{ color: C.primary, fontSize: 13 }}>{showLoadTypePicker ? '▲' : '▼'}</Text>
//                 </View>
//               </AnimatedPressable>

//               <Animated.View style={[S.pickerDropdown, { maxHeight: dropdownHeight, opacity: dropdownOpacity, overflow: 'hidden' }]}>
//                 <View style={S.searchWrap}>
//                   <TextInput
//                     style={S.searchInput}
//                     placeholder="Search load type..."
//                     placeholderTextColor="#aaa"
//                     value={loadTypeSearch}
//                     onChangeText={setLoadTypeSearch}
//                   />
//                 </View>
//                 <ScrollView style={{ maxHeight: 160 }} nestedScrollEnabled>
//                   {filteredTypes.map(lt => (
//                     <TouchableOpacity key={lt} style={[S.pickerItem, formData.loadType === lt && S.pickerItemActive]}
//                       onPress={() => selectLoadType(lt)}>
//                       <Text style={[S.pickerItemText, formData.loadType === lt && { color: C.primary, fontWeight: '700' }]}>{lt}</Text>
//                     </TouchableOpacity>
//                   ))}
//                   {filteredTypes.length === 0 && (
//                     <View style={{ padding: 16, alignItems: 'center' }}>
//                       <Text style={{ color: '#aaa', fontSize: 13 }}>No match found</Text>
//                     </View>
//                   )}
//                 </ScrollView>
//               </Animated.View>
//             </FadeInView>

//             {/* Image Upload */}
//             <FadeInView delay={440}>
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>Upload Load Image</Text>
//                 {imageUri ? (
//                   <>
//                     <Image source={{ uri: imageUri }} style={S.previewImage} />
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
//                       <AnimatedPressable onPress={takePhoto} style={{ flex: 1, marginRight: 6 }}>
//                         <View style={S.imageUploadInner}>
//                           <Text style={S.imageUploadEmoji}>📷</Text>
//                           <Text style={S.imageUploadText}>Camera</Text>
//                         </View>
//                       </AnimatedPressable>
//                       <AnimatedPressable onPress={pickImage} style={{ flex: 1, marginLeft: 6 }}>
//                         <View style={S.imageUploadInner}>
//                           <Text style={S.imageUploadEmoji}>🖼️</Text>
//                           <Text style={S.imageUploadText}>Gallery</Text>
//                         </View>
//                       </AnimatedPressable>
//                     </View>
//                   </>
//                 ) : (
//                   <View style={{ flexDirection: 'row', gap: 10 }}>
//                     <AnimatedPressable onPress={takePhoto} style={{ flex: 1 }}>
//                       <View style={S.imageUploadInner}>
//                         <Text style={S.imageUploadEmoji}>📷</Text>
//                         <Text style={S.imageUploadText}>Camera</Text>
//                       </View>
//                     </AnimatedPressable>
//                     <AnimatedPressable onPress={pickImage} style={{ flex: 1 }}>
//                       <View style={S.imageUploadInner}>
//                         <Text style={S.imageUploadEmoji}>🖼️</Text>
//                         <Text style={S.imageUploadText}>Gallery</Text>
//                       </View>
//                     </AnimatedPressable>
//                   </View>
//                 )}
//               </View>
//             </FadeInView>

//             {/* Estimated Price */}
//             <FadeInView delay={480} style={S.priceCard}>
//               <View>
//                 <Text style={S.priceLabel}>Estimated Price</Text>
//                 <Text style={S.priceSub}>Based on weight + distance</Text>
//               </View>
//               <Text style={S.priceValue}>{getEstimatedCost()}</Text>
//             </FadeInView>

//             {/* Customer Name */}
//             <FadeInView delay={160}>
//               <AnimatedInput
//                 label="Customer Name"
//                 value={formData.customerName}
//                 placeholder="Your name"
//                 keyboardType="default"
//                 onChangeText={t => fd('customerName', t)}
//               />
//             </FadeInView>

//             {/* Phone Number */}
//             <FadeInView delay={210}>
//               <AnimatedInput
//                 label="Phone Number"
//                 value={formData.phoneNumber}
//                 placeholder="10-digit mobile"
//                 keyboardType="number-pad"
//                 maxLength={10}
//                 onChangeText={t => fd('phoneNumber', t.replace(/[^0-9]/g, ''))}
//               />
//             </FadeInView>

//             {/* ✅ Alternative Phone — onFocus-ல் scroll to end */}
//             <FadeInView delay={260}>
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>Alternative Phone (Optional)</Text>
//                 <Animated.View style={[S.inputWrap, { borderColor: C.border }]}>
//                   <TextInput
//                     style={S.input}
//                     placeholder="Alternative number"
//                     placeholderTextColor="#999"
//                     keyboardType="number-pad"
//                     maxLength={10}
//                     value={formData.alternativePhone}
//                     onChangeText={t => fd('alternativePhone', t.replace(/[^0-9]/g, ''))}
//                     onFocus={() => {
//                       // ✅ Keyboard வரும்போது scroll to bottom — overlap fix
//                       setTimeout(() => {
//                         scrollViewRef.current?.scrollToEnd({ animated: true });
//                       }, 300);
//                     }}
//                   />
//                 </Animated.View>
//               </View>
//             </FadeInView>

//             {/* SUBMIT */}
//             <FadeInView delay={520}>
//               <Animated.View style={{ transform: [{ scale: submitScale }] }}>
//                 <TouchableOpacity
//                   style={[S.submitBtn, loading && S.submitBtnDisabled]}
//                   onPress={handleSubmit}
//                   disabled={loading}
//                   activeOpacity={0.85}
//                 >
//                   {loading ? <ActivityIndicator color={C.white} /> : <Text style={S.submitBtnText}>Create Load Request →</Text>}
//                 </TouchableOpacity>
//               </Animated.View>
//             </FadeInView>

//             <View style={{ height: 32 }} />
//           </View>

//         </ScrollView>
//       </KeyboardAvoidingView>

//     </SafeAreaView>
//   );
// };

// export default CreateLoadRequestScreen;

// const S = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: C.bg },

//   // ── Header ──────────────────────────────────────────────
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: C.white,
//     padding: 20,
//     paddingTop: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: C.border,
//   },
//   headerTitle: { fontSize: 20, fontWeight: '700', color: C.textPrimary },
//   headerSub:   { fontSize: 13, color: C.textSecondary, marginTop: 2 },

//   avatarBtn: {
//     width: 40, height: 40, borderRadius: 20,
//     backgroundColor: C.primary,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   avatarText: { color: C.white, fontWeight: '800', fontSize: 16 },

//   // ── Dropdown menu ────────────────────────────────────────
//   menuOverlay: {
//     position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999,
//   },
//   menuDropdown: {
//     position: 'absolute',
//     top: 70, right: 16,
//     backgroundColor: C.white,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: C.border,
//     paddingVertical: 8,
//     minWidth: 200,
//     zIndex: 1000,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.12,
//     shadowRadius: 16,
//     elevation: 10,
//   },
//   menuUserRow: {
//     flexDirection: 'row', alignItems: 'center', gap: 10,
//     paddingHorizontal: 16, paddingVertical: 12,
//   },
//   menuAvatar: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
//   },
//   menuAvatarText: { color: C.white, fontWeight: '800', fontSize: 15 },
//   menuUserName:   { fontSize: 14, fontWeight: '700', color: C.textPrimary },
//   menuUserSub:    { fontSize: 11, color: C.textSecondary, marginTop: 1 },
//   menuDivider:    { height: 1, backgroundColor: C.border, marginHorizontal: 12, marginVertical: 4 },
//   menuItem: {
//     flexDirection: 'row', alignItems: 'center', gap: 10,
//     paddingHorizontal: 16, paddingVertical: 12,
//   },
//   menuItemIcon: { fontSize: 16 },
//   menuItemText: { fontSize: 14, fontWeight: '600', color: C.textPrimary },

//   // ── Map ──────────────────────────────────────────────────
//   mapWrapper:   { margin: 12 },
//   mapContainer: { height: 380, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
//   map:          { flex: 1 },

//   // ── Location card ────────────────────────────────────────
//   locCard: {
//     marginHorizontal: 12, marginBottom: 4, backgroundColor: C.white,
//     borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.border, gap: 10,
//   },
//   locRow:  { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
//   locDot:  { width: 10, height: 10, borderRadius: 5, marginTop: 4, flexShrink: 0 },
//   locText: { flex: 1, fontSize: 13, color: C.textPrimary, lineHeight: 18 },

//   // ── Form ─────────────────────────────────────────────────
//   form:      { padding: 12, gap: 12 },
//   fieldWrap: {},
//   label: {
//     fontSize: 12, fontWeight: '600', color: C.textSecondary,
//     marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase',
//   },
//   inputWrap: {
//     height: 48, borderWidth: 1.5, borderRadius: 12,
//     backgroundColor: C.white, paddingHorizontal: 14, justifyContent: 'center',
//   },
//   input: { fontSize: 15, color: C.textPrimary, height: 48 },

//   readonlyField: {
//     height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, backgroundColor: C.primaryLight,
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//   },
//   readonlyLabel: { fontSize: 14, color: '#CC4400' },
//   readonlyValue: { fontSize: 15, fontWeight: '700', color: C.primary },

//   pickerBtn: { borderRadius: 12 },
//   pickerBtnInner: {
//     height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, backgroundColor: C.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//   },
//   pickerBtnText: { fontSize: 15, color: C.textPrimary },
//   pickerDropdown: {
//     backgroundColor: C.white, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 5, marginTop: 4,
//   },
//   searchWrap:  { paddingHorizontal: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: C.border },
//   searchInput: {
//     height: 36, borderWidth: 1, borderColor: C.border, borderRadius: 8,
//     paddingHorizontal: 10, fontSize: 13, color: C.textPrimary, backgroundColor: C.bg,
//   },
//   pickerItem:       { padding: 14, borderBottomWidth: 1, borderBottomColor: C.border },
//   pickerItemActive: { backgroundColor: C.primaryLight },
//   pickerItemText:   { fontSize: 15, color: C.textPrimary },

//   imageUploadInner: {
//     height: 54, borderWidth: 1.5, borderColor: C.border, borderRadius: 12,
//     borderStyle: 'dashed', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: C.white,
//   },
//   imageUploadEmoji: { fontSize: 20 },
//   imageUploadText:  { fontSize: 15, fontWeight: '600', color: C.textSecondary },
//   previewImage:     { width: '100%', height: 200, borderRadius: 14 },

//   priceCard: {
//     height: 64, borderWidth: 1.5, borderColor: '#FFD4A8', borderRadius: 14,
//     backgroundColor: C.primaryLight, flexDirection: 'row', alignItems: 'center',
//     justifyContent: 'space-between', paddingHorizontal: 16,
//   },
//   priceLabel: { fontSize: 14, fontWeight: '600', color: '#CC4400' },
//   priceSub:   { fontSize: 11, color: C.textSecondary, marginTop: 2 },
//   priceValue: { fontSize: 24, fontWeight: '800', color: C.primary },

//   submitBtn: {
//     height: 56, backgroundColor: C.primary, borderRadius: 16,
//     alignItems: 'center', justifyContent: 'center',
//     shadowColor: '#ee801f', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6,
//   },
//   submitBtnDisabled: { opacity: 0.6 },
//   submitBtnText:     { color: C.white, fontSize: 16, fontWeight: '700' },
// });



// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
// import { useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { customerAPI } from '../services/api';

// const C = {
//   primary:      '#FF6A00',
//   primaryLight: '#FFF4EC',
//   white:        '#FFFFFF',
//   textPrimary:  '#111111',
//   textSecondary:'#666666',
//   border:       '#EEEEEE',
//   bg:           '#F8F8F8',
//   success:      '#22C55E',
//   danger:       '#EF4444',
// };

// const GOOGLE_MAPS_API_KEY = 'AIzaSyDZwBw_ToWcWIggRVBSFA2Sy7mvEhKZUbU';

// // ─── TRANSLATIONS ─────────────────────────────────────────
// const LANG = {
//   en: {
//     headerTitle:     'Create Load Request',
//     headerSub:       'Fill in the details below',
//     labelDistance:   '📏 Distance',
//     labelWeight:     'Weight (kg)',
//     phWeight:        'Enter weight in kg',
//     labelLoadType:   'Load Type',
//     labelImage:      'Upload Load Image',
//     imgCamera:       'Camera',
//     imgGallery:      'Gallery',
//     priceLabel:      'Estimated Price',
//     priceSub:        'Based on weight + distance',
//     labelCustName:   'Customer Name',
//     phCustName:      'Your name',
//     labelPhone:      'Phone Number',
//     phPhone:         '10-digit mobile',
//     labelAltPhone:   'Alternative Phone (Optional)',
//     phAltPhone:      'Alternative number',
//     btnSubmit:       'Create Load Request →',
//     searchPh:        'Search load type...',
//     noMatch:         'No match found',
//     menuBookings:    'My Bookings',
//     menuProfile:     'My Profile',
//     menuSupport:     'Support',
//     menuLogout:      'Logout',
//     logoutTitle:     'Logout',
//     logoutMsg:       'Are you sure you want to logout?',
//     logoutCancel:    'Cancel',
//     logoutConfirm:   'Logout',
//     errPickup:       'Please select pickup location',
//     errDrop:         'Please select drop location',
//     errWeight:       'Please enter weight',
//     successTitle:    'Success 🎉',
//     successMsg:      'Load request created!',
//     errTitle:        'Error',
//     errMsg:          'Failed to create load request',
//     permGallery:     'Permission required',
//     permCamera:      'Camera permission required',
//     pickupPh:        '🟢 Pickup location...',
//     dropPh:          '🔴 Drop location...',
//     customerRole:    'Customer',
//   },
//   ta: {
//     headerTitle:     'சரக்கு கோரிக்கை உருவாக்கு',
//     headerSub:       'கீழே விவரங்களை நிரப்பவும்',
//     labelDistance:   '📏 தூரம்',
//     labelWeight:     'எடை (கிலோ)',
//     phWeight:        'கிலோவில் எடையை உள்ளிடவும்',
//     labelLoadType:   'சரக்கு வகை',
//     labelImage:      'சரக்கு படம் பதிவேற்றவும்',
//     imgCamera:       'கேமரா',
//     imgGallery:      'கேலரி',
//     priceLabel:      'மதிப்பீட்டு விலை',
//     priceSub:        'எடை + தூரம் அடிப்படையில்',
//     labelCustName:   'வாடிக்கையாளர் பெயர்',
//     phCustName:      'உங்கள் பெயர்',
//     labelPhone:      'தொலைபேசி எண்',
//     phPhone:         '10 இலக்க மொபைல்',
//     labelAltPhone:   'மாற்று தொலைபேசி (விருப்பத்திற்குரியது)',
//     phAltPhone:      'மாற்று எண்',
//     btnSubmit:       'சரக்கு கோரிக்கை உருவாக்கு →',
//     searchPh:        'சரக்கு வகை தேடவும்...',
//     noMatch:         'பொருத்தம் இல்லை',
//     menuBookings:    'என் முன்பதிவுகள்',
//     menuProfile:     'என் சுயவிவரம்',
//     menuSupport:     'ஆதரவு',
//     menuLogout:      'வெளியேறு',
//     logoutTitle:     'வெளியேறு',
//     logoutMsg:       'நீங்கள் நிச்சயமாக வெளியேற விரும்புகிறீர்களா?',
//     logoutCancel:    'ரத்து செய்',
//     logoutConfirm:   'வெளியேறு',
//     errPickup:       'பிக்கப் இடத்தை தேர்ந்தெடுக்கவும்',
//     errDrop:         'டிராப் இடத்தை தேர்ந்தெடுக்கவும்',
//     errWeight:       'எடையை உள்ளிடவும்',
//     successTitle:    'வெற்றி 🎉',
//     successMsg:      'சரக்கு கோரிக்கை உருவாக்கப்பட்டது!',
//     errTitle:        'பிழை',
//     errMsg:          'சரக்கு கோரிக்கை உருவாக்க தோல்வி',
//     permGallery:     'அனுமதி தேவை',
//     permCamera:      'கேமரா அனுமதி தேவை',
//     pickupPh:        '🟢 பொருள் எடுக்கும் இடம்...',
//     dropPh:          '🔴 பொருள் இறக்கும் இடம்...',
//     customerRole:    'வாடிக்கையாளர்',
//   },
// };

// const haversine = (lat1, lon1, lat2, lon2) => {
//   const R = 6371, dLat = ((lat2 - lat1) * Math.PI) / 180, dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
//   return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
// };

// const getRouteDistance = async (origin, dest) => {
//   try {
//     const res = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
//       params: { origins: `${origin.latitude},${origin.longitude}`, destinations: `${dest.latitude},${dest.longitude}`, key: GOOGLE_MAPS_API_KEY, units: 'metric' },
//     });
//     const el = res.data.rows[0]?.elements[0];
//     if (el?.status === 'OK') return (el.distance.value / 1000).toFixed(2);
//   } catch (_) {}
//   return haversine(origin.latitude, origin.longitude, dest.latitude, dest.longitude);
// };

// const weightCharge = (w) => { if (w <= 500) return 200; if (w <= 1000) return 400; if (w <= 1500) return 600; return 800; };

// const LOAD_TYPES = [
//   'Cement', 'Steel', 'Bricks', 'Sand', 'Gravel', 'Iron Rods', 'Tiles', 'Plywood', 'Glass Panels', 'Construction Materials',
//   'Furniture', 'Home Appliances', 'Electronics', 'Household Items', 'Kitchen Equipment',
//   'Vegetables', 'Fruits', 'Fish & Seafood', 'Meat & Poultry', 'Dairy Products', 'Groceries', 'Frozen Foods', 'Packaged Foods',
//   'Machinery', 'Industrial Goods', 'Auto Parts', 'Heavy Equipment', 'Generators', 'Pumps & Motors', 'Chemicals',
//   'Textiles', 'Garments', 'Leather Goods', 'Cotton Bales',
//   'Pharmaceuticals', 'Medical Equipment', 'Lab Supplies',
//   'Seeds & Fertilizers', 'Agricultural Equipment', 'Animal Feed',
//   'E-commerce Goods', 'Retail Products', 'Stationery', 'Books & Paper',
//   'Water Cans', 'Oil & Lubricants', 'Beverages',
//   'Scrap Metal', 'Waste Material', 'Hazardous Goods', 'Others',
// ];

// // ─── ANIMATED PRESSABLE BUTTON ────────────────────────────
// const AnimatedPressable = ({ onPress, style, children, disabled }) => {
//   const scale = useRef(new Animated.Value(1)).current;
//   const press = () => {
//     Animated.sequence([
//       Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 2 }),
//       Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }),
//     ]).start();
//     onPress?.();
//   };
//   return (
//     <Animated.View style={[{ transform: [{ scale }] }, style]}>
//       <Pressable onPress={disabled ? null : press} style={{ width: '100%' }}>{children}</Pressable>
//     </Animated.View>
//   );
// };

// // ─── FADE-IN CARD ─────────────────────────────────────────
// const FadeInView = ({ delay = 0, children, style }) => {
//   const opacity = useRef(new Animated.Value(0)).current;
//   const translateY = useRef(new Animated.Value(18)).current;
//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(opacity, { toValue: 1, duration: 380, delay, useNativeDriver: true }),
//       Animated.spring(translateY, { toValue: 0, delay, speed: 14, bounciness: 4, useNativeDriver: true }),
//     ]).start();
//   }, []);
//   return <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>{children}</Animated.View>;
// };

// // ─── WEB MAP COMPONENT ───────────────────────────────────
// const WebMapView = ({ onPickupSelect, onDropSelect, pickupCoords, dropCoords, pickupPh, dropPh }) => {
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const pickupMarkerRef = useRef(null);
//   const dropMarkerRef = useRef(null);
//   const polylineRef = useRef(null);

//   const initMap = () => {
//     if (!mapRef.current || mapInstanceRef.current) return;
//     const map = new window.google.maps.Map(mapRef.current, { center: { lat: 20.5937, lng: 78.9629 }, zoom: 5, mapTypeControl: false, fullscreenControl: false, streetViewControl: false });
//     mapInstanceRef.current = map;
//     pickupMarkerRef.current = new window.google.maps.Marker({ position: { lat: pickupCoords.latitude, lng: pickupCoords.longitude }, map, icon: { url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' } });
//     dropMarkerRef.current = new window.google.maps.Marker({ position: { lat: dropCoords.latitude, lng: dropCoords.longitude }, map, icon: { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' } });
//     polylineRef.current = new window.google.maps.Polyline({ path: [{ lat: pickupCoords.latitude, lng: pickupCoords.longitude }, { lat: dropCoords.latitude, lng: dropCoords.longitude }], strokeColor: '#FF6A00', strokeOpacity: 0.9, strokeWeight: 3, map });

//     ['pickup-search-input', 'drop-search-input'].forEach((id, idx) => {
//       const inp = document.getElementById(id);
//       if (!inp) return;
//       const ac = new window.google.maps.places.Autocomplete(inp, { componentRestrictions: { country: 'in' } });
//       ac.bindTo('bounds', map);
//       ac.addListener('place_changed', () => {
//         const place = ac.getPlace();
//         if (!place.geometry?.location) return;
//         const lat = place.geometry.location.lat(), lng = place.geometry.location.lng(), address = place.formatted_address;
//         if (idx === 0) {
//           pickupMarkerRef.current.setPosition({ lat, lng });
//           polylineRef.current.setPath([{ lat, lng }, dropMarkerRef.current.getPosition().toJSON()]);
//           onPickupSelect({ lat, lng, address });
//         } else {
//           dropMarkerRef.current.setPosition({ lat, lng });
//           polylineRef.current.setPath([pickupMarkerRef.current.getPosition().toJSON(), { lat, lng }]);
//           onDropSelect({ lat, lng, address });
//         }
//         map.panTo({ lat, lng }); map.setZoom(13);
//       });
//     });
//   };

//   useEffect(() => {
//     if (window.google?.maps) { initMap(); return; }
//     const scriptId = 'google-maps-script';
//     if (!document.getElementById(scriptId)) {
//       window.__initGoogleMapCallback = () => initMap();
//       const script = document.createElement('script');
//       script.id = scriptId;
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=__initGoogleMapCallback`;
//       script.async = true; script.defer = true;
//       document.head.appendChild(script);
//     } else {
//       const iv = setInterval(() => { if (window.google?.maps) { initMap(); clearInterval(iv); } }, 200);
//     }
//   }, []);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//       {[
//         { id: 'pickup-search-input', dot: '#22C55E', ph: pickupPh },
//         { id: 'drop-search-input',   dot: '#FF6A00', ph: dropPh },
//       ].map((row) => (
//         <div key={row.id} style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1.5px solid #EEEEEE', borderRadius: 12, padding: '0 12px', gap: 8 }}>
//           <div style={{ width: 10, height: 10, borderRadius: '50%', background: row.dot, flexShrink: 0 }} />
//           <input id={row.id} type="text" placeholder={row.ph} style={{ flex: 1, height: 46, border: 'none', outline: 'none', fontSize: 14, background: 'transparent', color: '#111' }} />
//         </div>
//       ))}
//       <div ref={mapRef} style={{ height: 260, width: '100%', borderRadius: 12, overflow: 'hidden', border: '1px solid #EEEEEE' }} />
//     </div>
//   );
// };

// const buildMapHTML = (pLat, pLng, dLat, dLng, pickupPh, dropPh) =>
//   `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{margin:0;padding:0;box-sizing:border-box;font-family:Arial,sans-serif;}body{background:#F8F8F8;}.wrap{padding:10px;display:flex;flex-direction:column;gap:8px;}.row{display:flex;align-items:center;background:#fff;border:1.5px solid #EEEEEE;border-radius:12px;padding:0 12px;gap:8px;}.dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}.g{background:#22C55E;}.o{background:#FF6A00;}input{flex:1;height:44px;border:none;outline:none;font-size:14px;background:transparent;color:#111;}#map{height:250px;width:100%;}</style></head><body><div class="wrap"><div class="row"><span class="dot g"></span><input id="pi" type="text" placeholder="${pickupPh}"></div><div class="row"><span class="dot o"></span><input id="di" type="text" placeholder="${dropPh}"></div></div><div id="map"></div><script>let map,pm,dm,rl;function initMap(){map=new google.maps.Map(document.getElementById('map'),{center:{lat:20.5937,lng:78.9629},zoom:5,mapTypeControl:false,fullscreenControl:false,streetViewControl:false});pm=new google.maps.Marker({position:{lat:${pLat},lng:${pLng}},map,icon:{url:'https://maps.google.com/mapfiles/ms/icons/green-dot.png'}});dm=new google.maps.Marker({position:{lat:${dLat},lng:${dLng}},map,icon:{url:'https://maps.google.com/mapfiles/ms/icons/red-dot.png'}});rl=new google.maps.Polyline({path:[{lat:${pLat},lng:${pLng}},{lat:${dLat},lng:${dLng}}],strokeColor:'#FF6A00',strokeOpacity:0.9,strokeWeight:3,map});setup('pi','pickup');setup('di','drop');}function setup(id,type){const inp=document.getElementById(id);const ac=new google.maps.places.Autocomplete(inp,{componentRestrictions:{country:'in'}});ac.bindTo('bounds',map);ac.addListener('place_changed',()=>{const p=ac.getPlace();if(!p.geometry?.location)return;const lat=p.geometry.location.lat(),lng=p.geometry.location.lng(),address=p.formatted_address;if(type==='pickup'){pm.setPosition({lat,lng});rl.setPath([{lat,lng},dm.getPosition().toJSON()]);}else{dm.setPosition({lat,lng});rl.setPath([pm.getPosition().toJSON(),{lat,lng}]);}map.panTo({lat,lng});map.setZoom(13);if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage(JSON.stringify({type,lat,lng,address}));});}<\/script><script src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap" async defer><\/script></body></html>`;

// // ─── ANIMATED INPUT ───────────────────────────────────────
// const AnimatedInput = ({ label, value, onChangeText, placeholder, keyboardType, maxLength, onFocus }) => {
//   const focused = useRef(new Animated.Value(0)).current;
//   const handleFocus = () => {
//     Animated.timing(focused, { toValue: 1, duration: 180, useNativeDriver: false }).start();
//     onFocus?.();
//   };
//   const onBlur = () => Animated.timing(focused, { toValue: 0, duration: 180, useNativeDriver: false }).start();
//   const borderColor = focused.interpolate({ inputRange: [0, 1], outputRange: [C.border, C.primary] });
//   return (
//     <View style={S.fieldWrap}>
//       <Text style={S.label}>{label}</Text>
//       <Animated.View style={[S.inputWrap, { borderColor }]}>
//         <TextInput
//           style={S.input}
//           placeholder={placeholder}
//           placeholderTextColor="#999"
//           keyboardType={keyboardType}
//           maxLength={maxLength}
//           value={value}
//           onFocus={handleFocus}
//           onBlur={onBlur}
//           onChangeText={onChangeText}
//         />
//       </Animated.View>
//     </View>
//   );
// };

// // ─── LANG TOGGLE PILL ─────────────────────────────────────
// const LangToggle = ({ lang, setLang }) => (
//   <View style={S.langToggle}>
//     <TouchableOpacity
//       style={[S.langOption, lang === 'en' && S.langActive]}
//       onPress={() => setLang('en')}
//     >
//       <Text style={[S.langOptionText, lang === 'en' && S.langActiveText]}>EN</Text>
//     </TouchableOpacity>
//     <TouchableOpacity
//       style={[S.langOption, lang === 'ta' && S.langActive]}
//       onPress={() => setLang('ta')}
//     >
//       <Text style={[S.langOptionText, lang === 'ta' && S.langActiveText]}>த</Text>
//     </TouchableOpacity>
//   </View>
// );

// // ─── MAIN COMPONENT ──────────────────────────────────────
// const CreateLoadRequestScreen = ({ navigation }) => {
//   const [loading, setLoading]               = useState(false);
//   const [imageUri, setImageUri]             = useState(null);
//   const [showLoadTypePicker, setShowLoadTypePicker] = useState(false);
//   const [loadTypeSearch, setLoadTypeSearch] = useState('');
//   const [menuVisible, setMenuVisible]       = useState(false);
//   const [userName, setUserName]             = useState('');
//   const [lang, setLang]                     = useState('en');
//   const [pickupCoords, setPickupCoords]     = useState({ latitude: 13.0827, longitude: 80.2707 });
//   const [dropCoords, setDropCoords]         = useState({ latitude: 12.9716, longitude: 77.5946 });
//   const [formData, setFormData]             = useState({
//     customerName: '', phoneNumber: '', alternativePhone: '',
//     pickupLocation: '', dropLocation: '', loadType: 'Furniture', weight: '', distance: '',
//   });

//   const t = LANG[lang];

//   const dropdownHeight  = useRef(new Animated.Value(0)).current;
//   const dropdownOpacity = useRef(new Animated.Value(0)).current;
//   const submitScale     = useRef(new Animated.Value(1)).current;
//   const scrollViewRef   = useRef(null);

//   useEffect(() => {
//     (async () => {
//       const raw = await AsyncStorage.getItem('userData');
//       if (raw) {
//         const u = JSON.parse(raw);
//         setFormData(prev => ({ ...prev, phoneNumber: u.phoneNumber || '', customerName: u.name || '' }));
//         setUserName(u.name || '');
//       }
//     })();
//   }, []);

//   const handleLogout = () => {
//     Alert.alert(t.logoutTitle, t.logoutMsg, [
//       { text: t.logoutCancel, style: 'cancel' },
//       {
//         text: t.logoutConfirm,
//         style: 'destructive',
//         onPress: async () => {
//           await AsyncStorage.multiRemove(['userData', 'customerId']);
//           navigation.replace('Login');
//         },
//       },
//     ]);
//   };

//   const togglePicker = () => {
//     const opening = !showLoadTypePicker;
//     setShowLoadTypePicker(opening);
//     setLoadTypeSearch('');
//     Animated.parallel([
//       Animated.spring(dropdownHeight, { toValue: opening ? 220 : 0, speed: 18, bounciness: 3, useNativeDriver: false }),
//       Animated.timing(dropdownOpacity, { toValue: opening ? 1 : 0, duration: 200, useNativeDriver: false }),
//     ]).start();
//   };

//   const selectLoadType = (lt) => {
//     fd('loadType', lt);
//     Animated.parallel([
//       Animated.spring(dropdownHeight, { toValue: 0, speed: 18, bounciness: 3, useNativeDriver: false }),
//       Animated.timing(dropdownOpacity, { toValue: 0, duration: 150, useNativeDriver: false }),
//     ]).start(() => setShowLoadTypePicker(false));
//   };

//   const filteredTypes = LOAD_TYPES.filter(lt =>
//     lt.toLowerCase().includes(loadTypeSearch.toLowerCase())
//   );

//   const handlePickupSelect = async ({ lat, lng, address }) => {
//     const newPickup = { latitude: lat, longitude: lng };
//     setPickupCoords(newPickup);
//     setFormData(prev => ({ ...prev, pickupLocation: address }));
//     if (dropCoords.latitude) { const dist = await getRouteDistance(newPickup, dropCoords); setFormData(prev => ({ ...prev, distance: dist })); }
//   };

//   const handleDropSelect = async ({ lat, lng, address }) => {
//     const newDrop = { latitude: lat, longitude: lng };
//     setDropCoords(newDrop);
//     const dist = await getRouteDistance(pickupCoords, newDrop);
//     setFormData(prev => ({ ...prev, dropLocation: address, distance: dist }));
//   };

//   const handleWebViewMessage = async (event) => {
//     try {
//       const { type, lat, lng, address } = JSON.parse(event.nativeEvent.data);
//       if (type === 'pickup') await handlePickupSelect({ lat, lng, address });
//       else await handleDropSelect({ lat, lng, address });
//     } catch (e) {}
//   };

//   const pickImage = async () => {
//     const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!perm.granted) return Alert.alert(t.permGallery);
//     const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
//     if (!result.canceled) setImageUri(result.assets[0].uri);
//   };

//   const takePhoto = async () => {
//     const perm = await ImagePicker.requestCameraPermissionsAsync();
//     if (!perm.granted) return Alert.alert(t.permCamera);
//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.7,
//     });
//     if (!result.canceled) setImageUri(result.assets[0].uri);
//   };

//   const getEstimatedCost = () => {
//     const w = Number(formData.weight), d = Number(formData.distance);
//     if (!w || !d) return '--';
//     return `₹${Math.round(weightCharge(w) + d * 6)}`;
//   };

//   const handleSubmit = async () => {
//     if (!formData.pickupLocation) return Alert.alert('Error', t.errPickup);
//     if (!formData.dropLocation)   return Alert.alert('Error', t.errDrop);
//     if (!formData.weight)         return Alert.alert('Error', t.errWeight);
//     Animated.sequence([
//       Animated.spring(submitScale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 2 }),
//       Animated.spring(submitScale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 8 }),
//     ]).start();
//     try {
//       setLoading(true);
//       const customerId = await AsyncStorage.getItem('customerId');
//       const data = new FormData();
//       Object.entries(formData).forEach(([k, v]) => data.append(k, v));
//       data.append('latitude', pickupCoords.latitude); data.append('longitude', pickupCoords.longitude);
//       data.append('dropLatitude', dropCoords.latitude); data.append('dropLongitude', dropCoords.longitude);
//       if (imageUri) data.append('loadImage', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });
//       await customerAPI.createLoadRequest(customerId, data);
//       Alert.alert(t.successTitle, t.successMsg);
//       navigation.navigate('MyLoadRequests');
//     } catch (e) {
//       Alert.alert(t.errTitle, t.errMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderMap = () => {
//     if (Platform.OS === 'web') {
//       return (
//         <WebMapView
//           pickupCoords={pickupCoords}
//           dropCoords={dropCoords}
//           onPickupSelect={handlePickupSelect}
//           onDropSelect={handleDropSelect}
//           pickupPh={t.pickupPh}
//           dropPh={t.dropPh}
//         />
//       );
//     }
//     const { WebView } = require('react-native-webview');
//     return (
//       <View style={S.mapContainer}>
//         <WebView
//           source={{ html: buildMapHTML(pickupCoords.latitude, pickupCoords.longitude, dropCoords.latitude, dropCoords.longitude, t.pickupPh, t.dropPh) }}
//           style={S.map}
//           javaScriptEnabled
//           domStorageEnabled
//           onMessage={handleWebViewMessage}
//           scrollEnabled={false}
//         />
//       </View>
//     );
//   };

//   const fd = (field, val) => setFormData(prev => ({ ...prev, [field]: val }));

//   const initials = userName ? userName.charAt(0).toUpperCase() : '?';

//   return (
//     <SafeAreaView style={S.safe}>

//       {/* ── DROPDOWN MENU OVERLAY ── */}
//       {menuVisible && (
//         <TouchableOpacity
//           style={S.menuOverlay}
//           activeOpacity={1}
//           onPress={() => setMenuVisible(false)}
//         >
//           <View style={S.menuDropdown}>
//             <View style={S.menuUserRow}>
//               <View style={S.menuAvatar}>
//                 <Text style={S.menuAvatarText}>{initials}</Text>
//               </View>
//               <View>
//                 <Text style={S.menuUserName}>{userName || 'User'}</Text>
//                 <Text style={S.menuUserSub}>{t.customerRole}</Text>
//               </View>
//             </View>
//             <View style={S.menuDivider} />
//             <TouchableOpacity style={S.menuItem} onPress={() => { setMenuVisible(false); navigation.navigate('MyLoadRequests'); }}>
//               <Text style={S.menuItemIcon}>📋</Text>
//               <Text style={S.menuItemText}>{t.menuBookings}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={S.menuItem} onPress={() => { setMenuVisible(false); navigation.navigate('Profile'); }}>
//               <Text style={S.menuItemIcon}>👤</Text>
//               <Text style={S.menuItemText}>{t.menuProfile}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={S.menuItem} onPress={() => { setMenuVisible(false); navigation.navigate('Support'); }}>
//               <Text style={S.menuItemIcon}>🎧</Text>
//               <Text style={S.menuItemText}>{t.menuSupport}</Text>
//             </TouchableOpacity>
//             <View style={S.menuDivider} />
//             <TouchableOpacity style={S.menuItem} onPress={() => { setMenuVisible(false); handleLogout(); }}>
//               <Text style={S.menuItemIcon}>🚪</Text>
//               <Text style={[S.menuItemText, { color: C.danger }]}>{t.menuLogout}</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       )}

//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//       >
//         <ScrollView
//           ref={scrollViewRef}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ flexGrow: 1 }}
//         >

//           {/* ── HEADER ── */}
//           <FadeInView delay={0} style={S.header}>
//             <View style={{ flex: 1 }}>
//               <Text style={S.headerTitle}>{t.headerTitle}</Text>
//               <Text style={S.headerSub}>{t.headerSub}</Text>
//             </View>
//             {/* EN / த toggle */}
//             <LangToggle lang={lang} setLang={setLang} />
//             {/* Avatar */}
//             <TouchableOpacity
//               style={S.avatarBtn}
//               onPress={() => setMenuVisible(v => !v)}
//               activeOpacity={0.8}
//             >
//               <Text style={S.avatarText}>{initials}</Text>
//             </TouchableOpacity>
//           </FadeInView>

//           {/* MAP */}
//           <FadeInView delay={80} style={S.mapWrapper}>{renderMap()}</FadeInView>

//           {/* LOCATION DISPLAY */}
//           {(formData.pickupLocation || formData.dropLocation) && (
//             <FadeInView delay={0} style={S.locCard}>
//               {formData.pickupLocation ? (
//                 <View style={S.locRow}>
//                   <View style={[S.locDot, { backgroundColor: C.success }]} />
//                   <Text style={S.locText} numberOfLines={2}>{formData.pickupLocation}</Text>
//                 </View>
//               ) : null}
//               {formData.dropLocation ? (
//                 <View style={S.locRow}>
//                   <View style={[S.locDot, { backgroundColor: C.primary }]} />
//                   <Text style={S.locText} numberOfLines={2}>{formData.dropLocation}</Text>
//                 </View>
//               ) : null}
//             </FadeInView>
//           )}

//           {/* FORM */}
//           <View style={S.form}>

//             {/* Distance */}
//             <FadeInView delay={120} style={S.readonlyField}>
//               <Text style={S.readonlyLabel}>{t.labelDistance}</Text>
//               <Text style={S.readonlyValue}>{formData.distance ? `${formData.distance} km` : t.distanceAuto}</Text>
//             </FadeInView>

//             {/* Weight */}
//             <FadeInView delay={310}>
//               <AnimatedInput
//                 label={t.labelWeight}
//                 value={formData.weight}
//                 placeholder={t.phWeight}
//                 keyboardType="numeric"
//                 onChangeText={text => fd('weight', text.replace(/[^0-9]/g, ''))}
//               />
//             </FadeInView>

//             {/* Load Type Picker */}
//             <FadeInView delay={400} style={S.fieldWrap}>
//               <Text style={S.label}>{t.labelLoadType}</Text>
//               <AnimatedPressable onPress={togglePicker} style={S.pickerBtn}>
//                 <View style={S.pickerBtnInner}>
//                   <Text style={S.pickerBtnText}>{formData.loadType}</Text>
//                   <Text style={{ color: C.primary, fontSize: 13 }}>{showLoadTypePicker ? '▲' : '▼'}</Text>
//                 </View>
//               </AnimatedPressable>

//               <Animated.View style={[S.pickerDropdown, { maxHeight: dropdownHeight, opacity: dropdownOpacity, overflow: 'hidden' }]}>
//                 <View style={S.searchWrap}>
//                   <TextInput
//                     style={S.searchInput}
//                     placeholder={t.searchPh}
//                     placeholderTextColor="#aaa"
//                     value={loadTypeSearch}
//                     onChangeText={setLoadTypeSearch}
//                   />
//                 </View>
//                 <ScrollView style={{ maxHeight: 160 }} nestedScrollEnabled>
//                   {filteredTypes.map(lt => (
//                     <TouchableOpacity key={lt} style={[S.pickerItem, formData.loadType === lt && S.pickerItemActive]}
//                       onPress={() => selectLoadType(lt)}>
//                       <Text style={[S.pickerItemText, formData.loadType === lt && { color: C.primary, fontWeight: '700' }]}>{lt}</Text>
//                     </TouchableOpacity>
//                   ))}
//                   {filteredTypes.length === 0 && (
//                     <View style={{ padding: 16, alignItems: 'center' }}>
//                       <Text style={{ color: '#aaa', fontSize: 13 }}>{t.noMatch}</Text>
//                     </View>
//                   )}
//                 </ScrollView>
//               </Animated.View>
//             </FadeInView>

//             {/* Image Upload */}
//             <FadeInView delay={440}>
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>{t.labelImage}</Text>
//                 {imageUri ? (
//                   <>
//                     <Image source={{ uri: imageUri }} style={S.previewImage} />
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
//                       <AnimatedPressable onPress={takePhoto} style={{ flex: 1, marginRight: 6 }}>
//                         <View style={S.imageUploadInner}>
//                           <Text style={S.imageUploadEmoji}>📷</Text>
//                           <Text style={S.imageUploadText}>{t.imgCamera}</Text>
//                         </View>
//                       </AnimatedPressable>
//                       <AnimatedPressable onPress={pickImage} style={{ flex: 1, marginLeft: 6 }}>
//                         <View style={S.imageUploadInner}>
//                           <Text style={S.imageUploadEmoji}>🖼️</Text>
//                           <Text style={S.imageUploadText}>{t.imgGallery}</Text>
//                         </View>
//                       </AnimatedPressable>
//                     </View>
//                   </>
//                 ) : (
//                   <View style={{ flexDirection: 'row', gap: 10 }}>
//                     <AnimatedPressable onPress={takePhoto} style={{ flex: 1 }}>
//                       <View style={S.imageUploadInner}>
//                         <Text style={S.imageUploadEmoji}>📷</Text>
//                         <Text style={S.imageUploadText}>{t.imgCamera}</Text>
//                       </View>
//                     </AnimatedPressable>
//                     <AnimatedPressable onPress={pickImage} style={{ flex: 1 }}>
//                       <View style={S.imageUploadInner}>
//                         <Text style={S.imageUploadEmoji}>🖼️</Text>
//                         <Text style={S.imageUploadText}>{t.imgGallery}</Text>
//                       </View>
//                     </AnimatedPressable>
//                   </View>
//                 )}
//               </View>
//             </FadeInView>

//             {/* Estimated Price */}
//             <FadeInView delay={480} style={S.priceCard}>
//               <View>
//                 <Text style={S.priceLabel}>{t.priceLabel}</Text>
//                 <Text style={S.priceSub}>{t.priceSub}</Text>
//               </View>
//               <Text style={S.priceValue}>{getEstimatedCost()}</Text>
//             </FadeInView>

//             {/* Customer Name */}
//             <FadeInView delay={160}>
//               <AnimatedInput
//                 label={t.labelCustName}
//                 value={formData.customerName}
//                 placeholder={t.phCustName}
//                 keyboardType="default"
//                 onChangeText={text => fd('customerName', text)}
//               />
//             </FadeInView>

//             {/* Phone Number */}
//             <FadeInView delay={210}>
//               <AnimatedInput
//                 label={t.labelPhone}
//                 value={formData.phoneNumber}
//                 placeholder={t.phPhone}
//                 keyboardType="number-pad"
//                 maxLength={10}
//                 onChangeText={text => fd('phoneNumber', text.replace(/[^0-9]/g, ''))}
//               />
//             </FadeInView>

//             {/* Alternative Phone */}
//             <FadeInView delay={260}>
//               <AnimatedInput
//                 label={t.labelAltPhone}
//                 value={formData.alternativePhone}
//                 placeholder={t.phAltPhone}
//                 keyboardType="number-pad"
//                 maxLength={10}
//                 onChangeText={text => fd('alternativePhone', text.replace(/[^0-9]/g, ''))}
//                 onFocus={() => {
//                   setTimeout(() => {
//                     scrollViewRef.current?.scrollToEnd({ animated: true });
//                   }, 300);
//                 }}
//               />
//             </FadeInView>

//             {/* SUBMIT */}
//             <FadeInView delay={520}>
//               <Animated.View style={{ transform: [{ scale: submitScale }] }}>
//                 <TouchableOpacity
//                   style={[S.submitBtn, loading && S.submitBtnDisabled]}
//                   onPress={handleSubmit}
//                   disabled={loading}
//                   activeOpacity={0.85}
//                 >
//                   {loading ? <ActivityIndicator color={C.white} /> : <Text style={S.submitBtnText}>{t.btnSubmit}</Text>}
//                 </TouchableOpacity>
//               </Animated.View>
//             </FadeInView>

//             <View style={{ height: 32 }} />
//           </View>

//         </ScrollView>
//       </KeyboardAvoidingView>

//     </SafeAreaView>
//   );
// };

// export default CreateLoadRequestScreen;

// const S = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: C.bg },

//   // ── Header ──────────────────────────────────────────────
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     backgroundColor: C.white,
//     padding: 20,
//     paddingTop: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: C.border,
//   },
//   headerTitle: { fontSize: 20, fontWeight: '700', color: C.textPrimary },
//   headerSub:   { fontSize: 13, color: C.textSecondary, marginTop: 2 },

//   avatarBtn: {
//     width: 40, height: 40, borderRadius: 20,
//     backgroundColor: C.primary,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   avatarText: { color: C.white, fontWeight: '800', fontSize: 16 },

//   // ── Lang toggle pill ─────────────────────────────────────
//   langToggle: {
//     flexDirection: 'row',
//     borderWidth: 1.5, borderColor: C.border,
//     borderRadius: 10, overflow: 'hidden',
//   },
//   langOption: {
//     paddingVertical: 6, paddingHorizontal: 14,
//     backgroundColor: C.white,
//   },
//   langActive: {
//     backgroundColor: C.primary,
//   },
//   langOptionText: {
//     fontSize: 13, fontWeight: '700', color: C.textSecondary,
//   },
//   langActiveText: {
//     color: C.white,
//   },

//   // ── Dropdown menu ────────────────────────────────────────
//   menuOverlay: {
//     position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999,
//   },
//   menuDropdown: {
//     position: 'absolute',
//     top: 70, right: 16,
//     backgroundColor: C.white,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: C.border,
//     paddingVertical: 8,
//     minWidth: 200,
//     zIndex: 1000,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.12,
//     shadowRadius: 16,
//     elevation: 10,
//   },
//   menuUserRow: {
//     flexDirection: 'row', alignItems: 'center', gap: 10,
//     paddingHorizontal: 16, paddingVertical: 12,
//   },
//   menuAvatar: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
//   },
//   menuAvatarText: { color: C.white, fontWeight: '800', fontSize: 15 },
//   menuUserName:   { fontSize: 14, fontWeight: '700', color: C.textPrimary },
//   menuUserSub:    { fontSize: 11, color: C.textSecondary, marginTop: 1 },
//   menuDivider:    { height: 1, backgroundColor: C.border, marginHorizontal: 12, marginVertical: 4 },
//   menuItem: {
//     flexDirection: 'row', alignItems: 'center', gap: 10,
//     paddingHorizontal: 16, paddingVertical: 12,
//   },
//   menuItemIcon: { fontSize: 16 },
//   menuItemText: { fontSize: 14, fontWeight: '600', color: C.textPrimary },

//   // ── Map ──────────────────────────────────────────────────
//   mapWrapper:   { margin: 12 },
//   mapContainer: { height: 380, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
//   map:          { flex: 1 },

//   // ── Location card ────────────────────────────────────────
//   locCard: {
//     marginHorizontal: 12, marginBottom: 4, backgroundColor: C.white,
//     borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.border, gap: 10,
//   },
//   locRow:  { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
//   locDot:  { width: 10, height: 10, borderRadius: 5, marginTop: 4, flexShrink: 0 },
//   locText: { flex: 1, fontSize: 13, color: C.textPrimary, lineHeight: 18 },

//   // ── Form ─────────────────────────────────────────────────
//   form:      { padding: 12, gap: 12 },
//   fieldWrap: {},
//   label: {
//     fontSize: 12, fontWeight: '600', color: C.textSecondary,
//     marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase',
//   },
//   inputWrap: {
//     height: 48, borderWidth: 1.5, borderRadius: 12,
//     backgroundColor: C.white, paddingHorizontal: 14, justifyContent: 'center',
//   },
//   input: { fontSize: 15, color: C.textPrimary, height: 48 },

//   readonlyField: {
//     height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, backgroundColor: C.primaryLight,
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//   },
//   readonlyLabel: { fontSize: 14, color: '#CC4400' },
//   readonlyValue: { fontSize: 15, fontWeight: '700', color: C.primary },

//   pickerBtn: { borderRadius: 12 },
//   pickerBtnInner: {
//     height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, backgroundColor: C.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
//   },
//   pickerBtnText: { fontSize: 15, color: C.textPrimary },
//   pickerDropdown: {
//     backgroundColor: C.white, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 5, marginTop: 4,
//   },
//   searchWrap:  { paddingHorizontal: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: C.border },
//   searchInput: {
//     height: 36, borderWidth: 1, borderColor: C.border, borderRadius: 8,
//     paddingHorizontal: 10, fontSize: 13, color: C.textPrimary, backgroundColor: C.bg,
//   },
//   pickerItem:       { padding: 14, borderBottomWidth: 1, borderBottomColor: C.border },
//   pickerItemActive: { backgroundColor: C.primaryLight },
//   pickerItemText:   { fontSize: 15, color: C.textPrimary },

//   imageUploadInner: {
//     height: 54, borderWidth: 1.5, borderColor: C.border, borderRadius: 12,
//     borderStyle: 'dashed', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: C.white,
//   },
//   imageUploadEmoji: { fontSize: 20 },
//   imageUploadText:  { fontSize: 15, fontWeight: '600', color: C.textSecondary },
//   previewImage:     { width: '100%', height: 200, borderRadius: 14 },

//   priceCard: {
//     height: 64, borderWidth: 1.5, borderColor: '#FFD4A8', borderRadius: 14,
//     backgroundColor: C.primaryLight, flexDirection: 'row', alignItems: 'center',
//     justifyContent: 'space-between', paddingHorizontal: 16,
//   },
//   priceLabel: { fontSize: 14, fontWeight: '600', color: '#CC4400' },
//   priceSub:   { fontSize: 11, color: C.textSecondary, marginTop: 2 },
//   priceValue: { fontSize: 24, fontWeight: '800', color: C.primary },

//   submitBtn: {
//     height: 56, backgroundColor: C.primary, borderRadius: 16,
//     alignItems: 'center', justifyContent: 'center',
//     shadowColor: '#ee801f', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6,
//   },
//   submitBtnDisabled: { opacity: 0.6 },
//   submitBtnText:     { color: C.white, fontSize: 16, fontWeight: '700' },
// });


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { customerAPI } from '../services/api';

const C = {
  primary:      '#FF6A00',
  primaryLight: '#FFF4EC',
  white:        '#FFFFFF',
  textPrimary:  '#111111',
  textSecondary:'#666666',
  border:       '#EEEEEE',
  bg:           '#F8F8F8',
  success:      '#22C55E',
  danger:       '#EF4444',
};

const GOOGLE_MAPS_API_KEY = 'AIzaSyDZwBw_ToWcWIggRVBSFA2Sy7mvEhKZUbU';

// ─── TRANSLATIONS ─────────────────────────────────────────
const LANG = {
  en: {
    headerTitle:     'Create Load Request',
    headerSub:       'Fill in the details below',
    labelDistance:   '📏 Distance',
    labelWeight:     'Weight (kg)',
    phWeight:        'Enter weight in kg',
    labelLoadType:   'Load Type',
    labelImage:      'Upload Load Image',
    imgCamera:       'Camera',
    imgGallery:      'Gallery',
    priceLabel:      'Estimated Price',
    priceSub:        'Based on weight + distance',
    labelCustName:   'Customer Name',
    phCustName:      'Your name',
    labelPhone:      'Phone Number',
    phPhone:         '10-digit mobile',
    labelAltPhone:   'Alternative Phone (Optional)',
    phAltPhone:      'Alternative number',
    btnSubmit:       'Create Load Request →',
    searchPh:        'Search load type...',
    noMatch:         'No match found',
    menuBookings:    'My Bookings',
    menuProfile:     'My Profile',
    menuSupport:     'Support',
    menuLogout:      'Logout',
    logoutTitle:     'Logout',
    logoutMsg:       'Are you sure you want to logout?',
    logoutCancel:    'Cancel',
    logoutConfirm:   'Logout',
    errPickup:       'Please select pickup location',
    errDrop:         'Please select drop location',
    errWeight:       'Please enter weight',
    successTitle:    'Success 🎉',
    successMsg:      'Load request created!',
    errTitle:        'Error',
    errMsg:          'Failed to create load request',
    permGallery:     'Permission required',
    permCamera:      'Camera permission required',
    pickupPh:        'Pickup location...',
    dropPh:          'Drop location...',
    customerRole:    'Customer',
    distanceAuto:    'Auto calculated',
  },
  ta: {
    headerTitle:     'சரக்கு கோரிக்கை உருவாக்கு',
    headerSub:       'கீழே விவரங்களை நிரப்பவும்',
    labelDistance:   '📏 தூரம்',
    labelWeight:     'எடை (கிலோ)',
    phWeight:        'கிலோவில் எடையை உள்ளிடவும்',
    labelLoadType:   'சரக்கு வகை',
    labelImage:      'சரக்கு படம் பதிவேற்றவும்',
    imgCamera:       'கேமரா',
    imgGallery:      'கேலரி',
    priceLabel:      'மதிப்பீட்டு விலை',
    priceSub:        'எடை + தூரம் அடிப்படையில்',
    labelCustName:   'வாடிக்கையாளர் பெயர்',
    phCustName:      'உங்கள் பெயர்',
    labelPhone:      'தொலைபேசி எண்',
    phPhone:         '10 இலக்க மொபைல்',
    labelAltPhone:   'மாற்று தொலைபேசி (விருப்பத்திற்குரியது)',
    phAltPhone:      'மாற்று எண்',
    btnSubmit:       'சரக்கு கோரிக்கை உருவாக்கு →',
    searchPh:        'சரக்கு வகை தேடவும்...',
    noMatch:         'பொருத்தம் இல்லை',
    menuBookings:    'என் முன்பதிவுகள்',
    menuProfile:     'என் சுயவிவரம்',
    menuSupport:     'ஆதரவு',
    menuLogout:      'வெளியேறு',
    logoutTitle:     'வெளியேறு',
    logoutMsg:       'நீங்கள் நிச்சயமாக வெளியேற விரும்புகிறீர்களா?',
    logoutCancel:    'ரத்து செய்',
    logoutConfirm:   'வெளியேறு',
    errPickup:       'பிக்கப் இடத்தை தேர்ந்தெடுக்கவும்',
    errDrop:         'டிராப் இடத்தை தேர்ந்தெடுக்கவும்',
    errWeight:       'எடையை உள்ளிடவும்',
    successTitle:    'வெற்றி 🎉',
    successMsg:      'சரக்கு கோரிக்கை உருவாக்கப்பட்டது!',
    errTitle:        'பிழை',
    errMsg:          'சரக்கு கோரிக்கை உருவாக்க தோல்வி',
    permGallery:     'அனுமதி தேவை',
    permCamera:      'கேமரா அனுமதி தேவை',
    pickupPh:        'பொருள் எடுக்கும் இடம்...',
    dropPh:          'பொருள் இறக்கும் இடம்...',
    customerRole:    'வாடிக்கையாளர்',
    distanceAuto:    'தானாக கணக்கிடப்படும்',
  },
};

const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371, dLat = ((lat2 - lat1) * Math.PI) / 180, dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
};

const getRouteDistance = async (origin, dest) => {
  try {
    const res = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: { origins: `${origin.latitude},${origin.longitude}`, destinations: `${dest.latitude},${dest.longitude}`, key: GOOGLE_MAPS_API_KEY, units: 'metric' },
    });
    const el = res.data.rows[0]?.elements[0];
    if (el?.status === 'OK') return (el.distance.value / 1000).toFixed(2);
  } catch (_) {}
  return haversine(origin.latitude, origin.longitude, dest.latitude, dest.longitude);
};

const weightCharge = (w) => { if (w <= 500) return 200; if (w <= 1000) return 400; if (w <= 1500) return 600; return 800; };

const LOAD_TYPES = [
  'Cement', 'Steel', 'Bricks', 'Sand', 'Gravel', 'Iron Rods', 'Tiles', 'Plywood', 'Glass Panels', 'Construction Materials',
  'Furniture', 'Home Appliances', 'Electronics', 'Household Items', 'Kitchen Equipment',
  'Vegetables', 'Fruits', 'Fish & Seafood', 'Meat & Poultry', 'Dairy Products', 'Groceries', 'Frozen Foods', 'Packaged Foods',
  'Machinery', 'Industrial Goods', 'Auto Parts', 'Heavy Equipment', 'Generators', 'Pumps & Motors', 'Chemicals',
  'Textiles', 'Garments', 'Leather Goods', 'Cotton Bales',
  'Pharmaceuticals', 'Medical Equipment', 'Lab Supplies',
  'Seeds & Fertilizers', 'Agricultural Equipment', 'Animal Feed',
  'E-commerce Goods', 'Retail Products', 'Stationery', 'Books & Paper',
  'Water Cans', 'Oil & Lubricants', 'Beverages',
  'Scrap Metal', 'Waste Material', 'Hazardous Goods', 'Others',
];

// ─── DEFAULT COORDS ────────────────────────────────────────
const DEFAULT_PICKUP = { latitude: 13.0827, longitude: 80.2707 };
const DEFAULT_DROP   = { latitude: 12.9716, longitude: 77.5946 };

// ─── RESET FORM HELPER ────────────────────────────────────
const buildResetForm = (userData) => ({
  customerName:     userData?.name || '',
  phoneNumber:      userData?.phoneNumber || '',
  alternativePhone: '',
  pickupLocation:   '',
  dropLocation:     '',
  loadType:         'Furniture',
  weight:           '',
  distance:         '',
});

// ─── ANIMATED PRESSABLE BUTTON ────────────────────────────
const AnimatedPressable = ({ onPress, style, children, disabled }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const press = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 2 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }),
    ]).start();
    onPress?.();
  };
  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable onPress={disabled ? null : press} style={{ width: '100%' }}>{children}</Pressable>
    </Animated.View>
  );
};

// ─── FADE-IN CARD ─────────────────────────────────────────
const FadeInView = ({ delay = 0, children, style }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 380, delay, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, delay, speed: 14, bounciness: 4, useNativeDriver: true }),
    ]).start();
  }, []);
  return <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>{children}</Animated.View>;
};

// ─── WEB MAP COMPONENT ───────────────────────────────────
const WebMapView = ({ onPickupSelect, onDropSelect, pickupCoords, dropCoords, pickupPh, dropPh }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const pickupMarkerRef = useRef(null);
  const dropMarkerRef = useRef(null);
  const polylineRef = useRef(null);

  const initMap = () => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const map = new window.google.maps.Map(mapRef.current, { center: { lat: 20.5937, lng: 78.9629 }, zoom: 5, mapTypeControl: false, fullscreenControl: false, streetViewControl: false });
    mapInstanceRef.current = map;
    pickupMarkerRef.current = new window.google.maps.Marker({ position: { lat: pickupCoords.latitude, lng: pickupCoords.longitude }, map, icon: { url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' } });
    dropMarkerRef.current = new window.google.maps.Marker({ position: { lat: dropCoords.latitude, lng: dropCoords.longitude }, map, icon: { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' } });
    polylineRef.current = new window.google.maps.Polyline({ path: [{ lat: pickupCoords.latitude, lng: pickupCoords.longitude }, { lat: dropCoords.latitude, lng: dropCoords.longitude }], strokeColor: '#FF6A00', strokeOpacity: 0.9, strokeWeight: 3, map });

    ['pickup-search-input', 'drop-search-input'].forEach((id, idx) => {
      const inp = document.getElementById(id);
      if (!inp) return;
      const ac = new window.google.maps.places.Autocomplete(inp, { componentRestrictions: { country: 'in' } });
      ac.bindTo('bounds', map);
      ac.addListener('place_changed', () => {
        const place = ac.getPlace();
        if (!place.geometry?.location) return;
        const lat = place.geometry.location.lat(), lng = place.geometry.location.lng(), address = place.formatted_address;
        if (idx === 0) {
          pickupMarkerRef.current.setPosition({ lat, lng });
          polylineRef.current.setPath([{ lat, lng }, dropMarkerRef.current.getPosition().toJSON()]);
          onPickupSelect({ lat, lng, address });
        } else {
          dropMarkerRef.current.setPosition({ lat, lng });
          polylineRef.current.setPath([pickupMarkerRef.current.getPosition().toJSON(), { lat, lng }]);
          onDropSelect({ lat, lng, address });
        }
        map.panTo({ lat, lng }); map.setZoom(13);
      });
    });
  };

  useEffect(() => {
    if (window.google?.maps) { initMap(); return; }
    const scriptId = 'google-maps-script';
    if (!document.getElementById(scriptId)) {
      window.__initGoogleMapCallback = () => initMap();
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=__initGoogleMapCallback`;
      script.async = true; script.defer = true;
      document.head.appendChild(script);
    } else {
      const iv = setInterval(() => { if (window.google?.maps) { initMap(); clearInterval(iv); } }, 200);
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[
        { id: 'pickup-search-input', dot: '#22C55E', ph: pickupPh },
        { id: 'drop-search-input',   dot: '#FF6A00', ph: dropPh },
      ].map((row) => (
        <div key={row.id} style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1.5px solid #EEEEEE', borderRadius: 12, padding: '0 12px', gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: row.dot, flexShrink: 0 }} />
          <input id={row.id} type="text" placeholder={row.ph} style={{ flex: 1, height: 46, border: 'none', outline: 'none', fontSize: 14, background: 'transparent', color: '#111' }} />
        </div>
      ))}
      <div ref={mapRef} style={{ height: 260, width: '100%', borderRadius: 12, overflow: 'hidden', border: '1px solid #EEEEEE' }} />
    </div>
  );
};

const buildMapHTML = (pLat, pLng, dLat, dLng, pickupPh, dropPh) =>
  `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{margin:0;padding:0;box-sizing:border-box;font-family:Arial,sans-serif;}body{background:#F8F8F8;}.wrap{padding:10px;display:flex;flex-direction:column;gap:8px;}.row{display:flex;align-items:center;background:#fff;border:1.5px solid #EEEEEE;border-radius:12px;padding:0 12px;gap:8px;}.dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}.g{background:#22C55E;}.o{background:#FF6A00;}input{flex:1;height:44px;border:none;outline:none;font-size:14px;background:transparent;color:#111;}#map{height:250px;width:100%;}</style></head><body><div class="wrap"><div class="row"><span class="dot g"></span><input id="pi" type="text" placeholder="${pickupPh}"></div><div class="row"><span class="dot o"></span><input id="di" type="text" placeholder="${dropPh}"></div></div><div id="map"></div><script>let map,pm,dm,rl;function initMap(){map=new google.maps.Map(document.getElementById('map'),{center:{lat:20.5937,lng:78.9629},zoom:5,mapTypeControl:false,fullscreenControl:false,streetViewControl:false});pm=new google.maps.Marker({position:{lat:${pLat},lng:${pLng}},map,icon:{url:'https://maps.google.com/mapfiles/ms/icons/green-dot.png'}});dm=new google.maps.Marker({position:{lat:${dLat},lng:${dLng}},map,icon:{url:'https://maps.google.com/mapfiles/ms/icons/red-dot.png'}});rl=new google.maps.Polyline({path:[{lat:${pLat},lng:${pLng}},{lat:${dLat},lng:${dLng}}],strokeColor:'#FF6A00',strokeOpacity:0.9,strokeWeight:3,map});setup('pi','pickup');setup('di','drop');}function setup(id,type){const inp=document.getElementById(id);const ac=new google.maps.places.Autocomplete(inp,{componentRestrictions:{country:'in'}});ac.bindTo('bounds',map);ac.addListener('place_changed',()=>{const p=ac.getPlace();if(!p.geometry?.location)return;const lat=p.geometry.location.lat(),lng=p.geometry.location.lng(),address=p.formatted_address;if(type==='pickup'){pm.setPosition({lat,lng});rl.setPath([{lat,lng},dm.getPosition().toJSON()]);}else{dm.setPosition({lat,lng});rl.setPath([pm.getPosition().toJSON(),{lat,lng}]);}map.panTo({lat,lng});map.setZoom(13);if(window.ReactNativeWebView)window.ReactNativeWebView.postMessage(JSON.stringify({type,lat,lng,address}));});}<\/script><script src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap" async defer><\/script></body></html>`;

// ─── ANIMATED INPUT ───────────────────────────────────────
const AnimatedInput = ({ label, value, onChangeText, placeholder, keyboardType, maxLength, onFocus }) => {
  const focused = useRef(new Animated.Value(0)).current;
  const handleFocus = () => {
    Animated.timing(focused, { toValue: 1, duration: 180, useNativeDriver: false }).start();
    onFocus?.();
  };
  const onBlur = () => Animated.timing(focused, { toValue: 0, duration: 180, useNativeDriver: false }).start();
  const borderColor = focused.interpolate({ inputRange: [0, 1], outputRange: [C.border, C.primary] });
  return (
    <View style={S.fieldWrap}>
      <Text style={S.label}>{label}</Text>
      <Animated.View style={[S.inputWrap, { borderColor }]}>
        <TextInput
          style={S.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          keyboardType={keyboardType}
          maxLength={maxLength}
          value={value}
          onFocus={handleFocus}
          onBlur={onBlur}
          onChangeText={onChangeText}
        />
      </Animated.View>
    </View>
  );
};

// ─── LANG TOGGLE PILL ─────────────────────────────────────
const LangToggle = ({ lang, setLang }) => (
  <View style={S.langToggle}>
    <TouchableOpacity
      style={[S.langOption, lang === 'en' && S.langActive]}
      onPress={() => setLang('en')}
    >
      <Text style={[S.langOptionText, lang === 'en' && S.langActiveText]}>EN</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[S.langOption, lang === 'ta' && S.langActive]}
      onPress={() => setLang('ta')}
    >
      <Text style={[S.langOptionText, lang === 'ta' && S.langActiveText]}>த</Text>
    </TouchableOpacity>
  </View>
);

// ─── MAIN COMPONENT ──────────────────────────────────────
const CreateLoadRequestScreen = ({ navigation }) => {
  const [loading, setLoading]               = useState(false);
  const [imageUri, setImageUri]             = useState(null);
  const [showLoadTypePicker, setShowLoadTypePicker] = useState(false);
  const [loadTypeSearch, setLoadTypeSearch] = useState('');
  const [menuVisible, setMenuVisible]       = useState(false);
  const [userName, setUserName]             = useState('');
  const [lang, setLang]                     = useState('en');
  const [pickupCoords, setPickupCoords]     = useState(DEFAULT_PICKUP);
  const [dropCoords, setDropCoords]         = useState(DEFAULT_DROP);
  const [formData, setFormData]             = useState(buildResetForm(null));

  const t = LANG[lang];

  const dropdownHeight  = useRef(new Animated.Value(0)).current;
  const dropdownOpacity = useRef(new Animated.Value(0)).current;
  const submitScale     = useRef(new Animated.Value(1)).current;
  const scrollViewRef   = useRef(null);

  // ── Load user data from storage ──────────────────────────
  const loadUserData = useCallback(async () => {
    const raw = await AsyncStorage.getItem('userData');
    if (raw) {
      const u = JSON.parse(raw);
      setUserName(u.name || '');
      return u;
    }
    return null;
  }, []);

  // ── Initial mount: fill name + phone ─────────────────────
  useEffect(() => {
    (async () => {
      const u = await loadUserData();
      if (u) {
        setFormData(prev => ({
          ...prev,
          phoneNumber:  u.phoneNumber || '',
          customerName: u.name || '',
        }));
      }
    })();
  }, []);

  // ✅ FIX: Page focus ஆகும் ஒவ்வொரு முறையும் form reset
  useFocusEffect(
    useCallback(() => {
      const resetOnFocus = async () => {
        const raw = await AsyncStorage.getItem('userData');
        const u = raw ? JSON.parse(raw) : null;
        setUserName(u?.name || '');

        // Reset all fields — name + phone மட்டும் keep
        setFormData(buildResetForm(u));
        setImageUri(null);
        setPickupCoords(DEFAULT_PICKUP);
        setDropCoords(DEFAULT_DROP);

        // Close dropdown if open
        setShowLoadTypePicker(false);
        setLoadTypeSearch('');
        Animated.parallel([
          Animated.timing(dropdownHeight, { toValue: 0, duration: 0, useNativeDriver: false }),
          Animated.timing(dropdownOpacity, { toValue: 0, duration: 0, useNativeDriver: false }),
        ]).start();
      };
      resetOnFocus();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert(t.logoutTitle, t.logoutMsg, [
      { text: t.logoutCancel, style: 'cancel' },
      {
        text: t.logoutConfirm,
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.multiRemove(['userData', 'customerId']);
          navigation.replace('Login');
        },
      },
    ]);
  };

  const togglePicker = () => {
    const opening = !showLoadTypePicker;
    setShowLoadTypePicker(opening);
    setLoadTypeSearch('');
    Animated.parallel([
      Animated.spring(dropdownHeight, { toValue: opening ? 220 : 0, speed: 18, bounciness: 3, useNativeDriver: false }),
      Animated.timing(dropdownOpacity, { toValue: opening ? 1 : 0, duration: 200, useNativeDriver: false }),
    ]).start();
  };

  const selectLoadType = (lt) => {
    fd('loadType', lt);
    Animated.parallel([
      Animated.spring(dropdownHeight, { toValue: 0, speed: 18, bounciness: 3, useNativeDriver: false }),
      Animated.timing(dropdownOpacity, { toValue: 0, duration: 150, useNativeDriver: false }),
    ]).start(() => setShowLoadTypePicker(false));
  };

  const filteredTypes = LOAD_TYPES.filter(lt =>
    lt.toLowerCase().includes(loadTypeSearch.toLowerCase())
  );

  const handlePickupSelect = async ({ lat, lng, address }) => {
    const newPickup = { latitude: lat, longitude: lng };
    setPickupCoords(newPickup);
    setFormData(prev => ({ ...prev, pickupLocation: address }));
    if (dropCoords.latitude) {
      const dist = await getRouteDistance(newPickup, dropCoords);
      setFormData(prev => ({ ...prev, distance: dist }));
    }
  };

  const handleDropSelect = async ({ lat, lng, address }) => {
    const newDrop = { latitude: lat, longitude: lng };
    setDropCoords(newDrop);
    const dist = await getRouteDistance(pickupCoords, newDrop);
    setFormData(prev => ({ ...prev, dropLocation: address, distance: dist }));
  };

  const handleWebViewMessage = async (event) => {
    try {
      const { type, lat, lng, address } = JSON.parse(event.nativeEvent.data);
      if (type === 'pickup') await handlePickupSelect({ lat, lng, address });
      else await handleDropSelect({ lat, lng, address });
    } catch (e) {}
  };

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return Alert.alert(t.permGallery);
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) return Alert.alert(t.permCamera);
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const getEstimatedCost = () => {
    const w = Number(formData.weight), d = Number(formData.distance);
    if (!w || !d) return '--';
    return `₹${Math.round(weightCharge(w) + d * 6)}`;
  };

  // ✅ FIX: Submit success-ல full reset
  const handleSubmit = async () => {
    if (!formData.pickupLocation) return Alert.alert('Error', t.errPickup);
    if (!formData.dropLocation)   return Alert.alert('Error', t.errDrop);
    if (!formData.weight)         return Alert.alert('Error', t.errWeight);

    Animated.sequence([
      Animated.spring(submitScale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 2 }),
      Animated.spring(submitScale, { toValue: 1,    useNativeDriver: true, speed: 20, bounciness: 8 }),
    ]).start();

    try {
      setLoading(true);
      const customerId = await AsyncStorage.getItem('customerId');
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      data.append('latitude',      pickupCoords.latitude);
      data.append('longitude',     pickupCoords.longitude);
      data.append('dropLatitude',  dropCoords.latitude);
      data.append('dropLongitude', dropCoords.longitude);
      if (imageUri) data.append('loadImage', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });

      await customerAPI.createLoadRequest(customerId, data);

      // ✅ Success — reset everything immediately
      const raw = await AsyncStorage.getItem('userData');
      const u = raw ? JSON.parse(raw) : null;
      setFormData(buildResetForm(u));
      setImageUri(null);
      setPickupCoords(DEFAULT_PICKUP);
      setDropCoords(DEFAULT_DROP);

      Alert.alert(t.successTitle, t.successMsg);
      navigation.navigate('MyLoadRequests');

    } catch (e) {
      Alert.alert(t.errTitle, t.errMsg);
    } finally {
      setLoading(false);
    }
  };

  const renderMap = () => {
    if (Platform.OS === 'web') {
      return (
        <WebMapView
          pickupCoords={pickupCoords}
          dropCoords={dropCoords}
          onPickupSelect={handlePickupSelect}
          onDropSelect={handleDropSelect}
          pickupPh={t.pickupPh}
          dropPh={t.dropPh}
        />
      );
    }
    const { WebView } = require('react-native-webview');
    return (
      <View style={S.mapContainer}>
        <WebView
          source={{ html: buildMapHTML(pickupCoords.latitude, pickupCoords.longitude, dropCoords.latitude, dropCoords.longitude, t.pickupPh, t.dropPh) }}
          style={S.map}
          javaScriptEnabled
          domStorageEnabled
          onMessage={handleWebViewMessage}
          scrollEnabled={false}
        />
      </View>
    );
  };

  const fd = (field, val) => setFormData(prev => ({ ...prev, [field]: val }));

  const initials = userName ? userName.charAt(0).toUpperCase() : '?';

  return (
    <SafeAreaView style={S.safe}>

      {/* ── DROPDOWN MENU OVERLAY ── */}
      {menuVisible && (
        <TouchableOpacity
          style={S.menuOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={S.menuDropdown}>
            <View style={S.menuUserRow}>
              <View style={S.menuAvatar}>
                <Text style={S.menuAvatarText}>{initials}</Text>
              </View>
              <View>
                <Text style={S.menuUserName}>{userName || 'User'}</Text>
                <Text style={S.menuUserSub}>{t.customerRole}</Text>
              </View>
            </View>
            <View style={S.menuDivider} />
            <TouchableOpacity style={S.menuItem} onPress={() => { setMenuVisible(false); navigation.navigate('MyLoadRequests'); }}>
              <Text style={S.menuItemIcon}>📋</Text>
              <Text style={S.menuItemText}>{t.menuBookings}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={S.menuItem} onPress={() => { setMenuVisible(false); navigation.navigate('Profile'); }}>
              <Text style={S.menuItemIcon}>👤</Text>
              <Text style={S.menuItemText}>{t.menuProfile}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={S.menuItem} onPress={() => { setMenuVisible(false); navigation.navigate('Support'); }}>
              <Text style={S.menuItemIcon}>🎧</Text>
              <Text style={S.menuItemText}>{t.menuSupport}</Text>
            </TouchableOpacity>
            <View style={S.menuDivider} />
            <TouchableOpacity style={S.menuItem} onPress={() => { setMenuVisible(false); handleLogout(); }}>
              <Text style={S.menuItemIcon}>🚪</Text>
              <Text style={[S.menuItemText, { color: C.danger }]}>{t.menuLogout}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >

          {/* ── HEADER ── */}
          <FadeInView delay={0} style={S.header}>
            <View style={{ flex: 1 }}>
              <Text style={S.headerTitle}>{t.headerTitle}</Text>
              <Text style={S.headerSub}>{t.headerSub}</Text>
            </View>
            <LangToggle lang={lang} setLang={setLang} />
            <TouchableOpacity
              style={S.avatarBtn}
              onPress={() => setMenuVisible(v => !v)}
              activeOpacity={0.8}
            >
              <Text style={S.avatarText}>{initials}</Text>
            </TouchableOpacity>
          </FadeInView>

          {/* MAP */}
          <FadeInView delay={80} style={S.mapWrapper}>{renderMap()}</FadeInView>

          {/* LOCATION DISPLAY */}
          {(formData.pickupLocation || formData.dropLocation) && (
            <FadeInView delay={0} style={S.locCard}>
              {formData.pickupLocation ? (
                <View style={S.locRow}>
                  <View style={[S.locDot, { backgroundColor: C.success }]} />
                  <Text style={S.locText} numberOfLines={2}>{formData.pickupLocation}</Text>
                </View>
              ) : null}
              {formData.dropLocation ? (
                <View style={S.locRow}>
                  <View style={[S.locDot, { backgroundColor: C.primary }]} />
                  <Text style={S.locText} numberOfLines={2}>{formData.dropLocation}</Text>
                </View>
              ) : null}
            </FadeInView>
          )}

          {/* FORM */}
          <View style={S.form}>

            {/* Distance */}
            <FadeInView delay={120} style={S.readonlyField}>
              <Text style={S.readonlyLabel}>{t.labelDistance}</Text>
              <Text style={S.readonlyValue}>{formData.distance ? `${formData.distance} km` : t.distanceAuto}</Text>
            </FadeInView>

            {/* Weight */}
            <FadeInView delay={310}>
              <AnimatedInput
                label={t.labelWeight}
                value={formData.weight}
                placeholder={t.phWeight}
                keyboardType="numeric"
                onChangeText={text => fd('weight', text.replace(/[^0-9]/g, ''))}
              />
            </FadeInView>

            {/* Load Type Picker */}
            <FadeInView delay={400} style={S.fieldWrap}>
              <Text style={S.label}>{t.labelLoadType}</Text>
              <AnimatedPressable onPress={togglePicker} style={S.pickerBtn}>
                <View style={S.pickerBtnInner}>
                  <Text style={S.pickerBtnText}>{formData.loadType}</Text>
                  <Text style={{ color: C.primary, fontSize: 13 }}>{showLoadTypePicker ? '▲' : '▼'}</Text>
                </View>
              </AnimatedPressable>

              <Animated.View style={[S.pickerDropdown, { maxHeight: dropdownHeight, opacity: dropdownOpacity, overflow: 'hidden' }]}>
                <View style={S.searchWrap}>
                  <TextInput
                    style={S.searchInput}
                    placeholder={t.searchPh}
                    placeholderTextColor="#aaa"
                    value={loadTypeSearch}
                    onChangeText={setLoadTypeSearch}
                  />
                </View>
                <ScrollView style={{ maxHeight: 160 }} nestedScrollEnabled>
                  {filteredTypes.map(lt => (
                    <TouchableOpacity key={lt} style={[S.pickerItem, formData.loadType === lt && S.pickerItemActive]}
                      onPress={() => selectLoadType(lt)}>
                      <Text style={[S.pickerItemText, formData.loadType === lt && { color: C.primary, fontWeight: '700' }]}>{lt}</Text>
                    </TouchableOpacity>
                  ))}
                  {filteredTypes.length === 0 && (
                    <View style={{ padding: 16, alignItems: 'center' }}>
                      <Text style={{ color: '#aaa', fontSize: 13 }}>{t.noMatch}</Text>
                    </View>
                  )}
                </ScrollView>
              </Animated.View>
            </FadeInView>

            {/* Image Upload */}
            <FadeInView delay={440}>
              <View style={S.fieldWrap}>
                <Text style={S.label}>{t.labelImage}</Text>
                {imageUri ? (
                  <>
                    <Image source={{ uri: imageUri }} style={S.previewImage} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                      <AnimatedPressable onPress={takePhoto} style={{ flex: 1, marginRight: 6 }}>
                        <View style={S.imageUploadInner}>
                          <Text style={S.imageUploadEmoji}>📷</Text>
                          <Text style={S.imageUploadText}>{t.imgCamera}</Text>
                        </View>
                      </AnimatedPressable>
                      <AnimatedPressable onPress={pickImage} style={{ flex: 1, marginLeft: 6 }}>
                        <View style={S.imageUploadInner}>
                          <Text style={S.imageUploadEmoji}>🖼️</Text>
                          <Text style={S.imageUploadText}>{t.imgGallery}</Text>
                        </View>
                      </AnimatedPressable>
                    </View>
                  </>
                ) : (
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    <AnimatedPressable onPress={takePhoto} style={{ flex: 1 }}>
                      <View style={S.imageUploadInner}>
                        <Text style={S.imageUploadEmoji}>📷</Text>
                        <Text style={S.imageUploadText}>{t.imgCamera}</Text>
                      </View>
                    </AnimatedPressable>
                    <AnimatedPressable onPress={pickImage} style={{ flex: 1 }}>
                      <View style={S.imageUploadInner}>
                        <Text style={S.imageUploadEmoji}>🖼️</Text>
                        <Text style={S.imageUploadText}>{t.imgGallery}</Text>
                      </View>
                    </AnimatedPressable>
                  </View>
                )}
              </View>
            </FadeInView>

            {/* Estimated Price */}
            <FadeInView delay={480} style={S.priceCard}>
              <View>
                <Text style={S.priceLabel}>{t.priceLabel}</Text>
                <Text style={S.priceSub}>{t.priceSub}</Text>
              </View>
              <Text style={S.priceValue}>{getEstimatedCost()}</Text>
            </FadeInView>

            {/* Customer Name */}
            <FadeInView delay={160}>
              <AnimatedInput
                label={t.labelCustName}
                value={formData.customerName}
                placeholder={t.phCustName}
                keyboardType="default"
                onChangeText={text => fd('customerName', text)}
              />
            </FadeInView>

            {/* Phone Number */}
            <FadeInView delay={210}>
              <AnimatedInput
                label={t.labelPhone}
                value={formData.phoneNumber}
                placeholder={t.phPhone}
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={text => fd('phoneNumber', text.replace(/[^0-9]/g, ''))}
              />
            </FadeInView>

            {/* Alternative Phone */}
            <FadeInView delay={260}>
              <AnimatedInput
                label={t.labelAltPhone}
                value={formData.alternativePhone}
                placeholder={t.phAltPhone}
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={text => fd('alternativePhone', text.replace(/[^0-9]/g, ''))}
                onFocus={() => {
                  setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                  }, 300);
                }}
              />
            </FadeInView>

            {/* SUBMIT */}
            <FadeInView delay={520}>
              <Animated.View style={{ transform: [{ scale: submitScale }] }}>
                <TouchableOpacity
                  style={[S.submitBtn, loading && S.submitBtnDisabled]}
                  onPress={handleSubmit}
                  disabled={loading}
                  activeOpacity={0.85}
                >
                  {loading ? <ActivityIndicator color={C.white} /> : <Text style={S.submitBtnText}>{t.btnSubmit}</Text>}
                </TouchableOpacity>
              </Animated.View>
            </FadeInView>

            <View style={{ height: 32 }} />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

export default CreateLoadRequestScreen;

const S = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: C.white,
    padding: 20,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: C.textPrimary },
  headerSub:   { fontSize: 13, color: C.textSecondary, marginTop: 2 },

  avatarBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: C.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: C.white, fontWeight: '800', fontSize: 16 },

  langToggle: {
    flexDirection: 'row',
    borderWidth: 1.5, borderColor: C.border,
    borderRadius: 10, overflow: 'hidden',
  },
  langOption: {
    paddingVertical: 6, paddingHorizontal: 14,
    backgroundColor: C.white,
  },
  langActive: {
    backgroundColor: C.primary,
  },
  langOptionText: {
    fontSize: 13, fontWeight: '700', color: C.textSecondary,
  },
  langActiveText: {
    color: C.white,
  },

  menuOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999,
  },
  menuDropdown: {
    position: 'absolute',
    top: 70, right: 16,
    backgroundColor: C.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    paddingVertical: 8,
    minWidth: 200,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  menuUserRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingVertical: 12,
  },
  menuAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center',
  },
  menuAvatarText: { color: C.white, fontWeight: '800', fontSize: 15 },
  menuUserName:   { fontSize: 14, fontWeight: '700', color: C.textPrimary },
  menuUserSub:    { fontSize: 11, color: C.textSecondary, marginTop: 1 },
  menuDivider:    { height: 1, backgroundColor: C.border, marginHorizontal: 12, marginVertical: 4 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingVertical: 12,
  },
  menuItemIcon: { fontSize: 16 },
  menuItemText: { fontSize: 14, fontWeight: '600', color: C.textPrimary },

  mapWrapper:   { margin: 12 },
  mapContainer: { height: 380, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
  map:          { flex: 1 },

  locCard: {
    marginHorizontal: 12, marginBottom: 4, backgroundColor: C.white,
    borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.border, gap: 10,
  },
  locRow:  { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  locDot:  { width: 10, height: 10, borderRadius: 5, marginTop: 4, flexShrink: 0 },
  locText: { flex: 1, fontSize: 13, color: C.textPrimary, lineHeight: 18 },

  form:      { padding: 12, gap: 12 },
  fieldWrap: {},
  label: {
    fontSize: 12, fontWeight: '600', color: C.textSecondary,
    marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase',
  },
  inputWrap: {
    height: 48, borderWidth: 1.5, borderRadius: 12,
    backgroundColor: C.white, paddingHorizontal: 14, justifyContent: 'center',
  },
  input: { fontSize: 15, color: C.textPrimary, height: 48 },

  readonlyField: {
    height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
    paddingHorizontal: 14, backgroundColor: C.primaryLight,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  readonlyLabel: { fontSize: 14, color: '#CC4400' },
  readonlyValue: { fontSize: 15, fontWeight: '700', color: C.primary },

  pickerBtn: { borderRadius: 12 },
  pickerBtnInner: {
    height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
    paddingHorizontal: 14, backgroundColor: C.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  pickerBtnText: { fontSize: 15, color: C.textPrimary },
  pickerDropdown: {
    backgroundColor: C.white, borderWidth: 1, borderColor: C.border, borderRadius: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 5, marginTop: 4,
  },
  searchWrap:  { paddingHorizontal: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: C.border },
  searchInput: {
    height: 36, borderWidth: 1, borderColor: C.border, borderRadius: 8,
    paddingHorizontal: 10, fontSize: 13, color: C.textPrimary, backgroundColor: C.bg,
  },
  pickerItem:       { padding: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  pickerItemActive: { backgroundColor: C.primaryLight },
  pickerItemText:   { fontSize: 15, color: C.textPrimary },

  imageUploadInner: {
    height: 54, borderWidth: 1.5, borderColor: C.border, borderRadius: 12,
    borderStyle: 'dashed', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: C.white,
  },
  imageUploadEmoji: { fontSize: 20 },
  imageUploadText:  { fontSize: 15, fontWeight: '600', color: C.textSecondary },
  previewImage:     { width: '100%', height: 200, borderRadius: 14 },

  priceCard: {
    height: 64, borderWidth: 1.5, borderColor: '#FFD4A8', borderRadius: 14,
    backgroundColor: C.primaryLight, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 16,
  },
  priceLabel: { fontSize: 14, fontWeight: '600', color: '#CC4400' },
  priceSub:   { fontSize: 11, color: C.textSecondary, marginTop: 2 },
  priceValue: { fontSize: 24, fontWeight: '800', color: C.primary },

  submitBtn: {
    height: 56, backgroundColor: C.primary, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#ee801f', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6,
  },
  submitBtnDisabled: { opacity: 0.6 },
  submitBtnText:     { color: C.white, fontSize: 16, fontWeight: '700' },
});