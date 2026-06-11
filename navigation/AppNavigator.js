// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // SCREENS
// import CreateLoadRequestScreen from '../screens/CreateLoadRequestScreen';
// import DashboardScreen from '../screens/DashboardScreen';
// import LoginScreen from '../screens/LoginScreen';
// import MyLoadRequestsScreen from '../screens/MyLoadRequestsScreen';
// import PaymentScreen from '../screens/PaymentScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import RegisterScreen from '../screens/RegisterScreen';
// import TripStatusScreen from '../screens/TripStatusScreen';
// import UpdateLocationScreen from '../screens/UpdateLocationScreen';

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
      
//       {/* AUTH SCREENS */}
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Register" component={RegisterScreen} />

//       {/* MAIN APP SCREENS */}
//       <Stack.Screen name="Dashboard" component={DashboardScreen} />
//       <Stack.Screen name="MyLoadRequests" component={MyLoadRequestsScreen} />
//       <Stack.Screen name="CreateLoadRequest" component={CreateLoadRequestScreen} />
//       <Stack.Screen name="TripStatus" component={TripStatusScreen} />
//       <Stack.Screen name="UpdateLocation" component={UpdateLocationScreen} />
//       <Stack.Screen name="Payment" component={PaymentScreen} />
//       <Stack.Screen name="Profile" component={ProfileScreen} />

//     </Stack.Navigator>
//   );
// }

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// // ── CUSTOMER SCREENS ──────────────────────────────────────────────────────────
// import CreateLoadRequestScreen from '../screens/CreateLoadRequestScreen';

// import LoginScreen from '../screens/LoginScreen';
// import MyLoadRequestsScreen from '../screens/MyLoadRequestsScreen';
// import PaymentScreen from '../screens/PaymentScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import RegisterScreen from '../screens/RegisterScreen';
// import TripStatusScreen from '../screens/TripStatusScreen';


// // ── DRIVER SCREENS ────────────────────────────────────────────────────────────
// // ✅ Step 1: DriverDashboardScreen.jsx-ஐ screens/ folder-ல paste பண்ணுங்க
// // ✅ Step 2: கீழே உள்ள line-ஐ uncomment பண்ணுங்க
// // import DriverDashboardScreen from '../screens/DriverDashboardScreen';

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>

//       {/* ── AUTH ───────────────────────────────────── */}
//       <Stack.Screen name="Login"    component={LoginScreen} />
//       <Stack.Screen name="Register" component={RegisterScreen} />

//       {/* ── CUSTOMER ───────────────────────────────── */}
     
//       <Stack.Screen name="MyLoadRequests"     component={MyLoadRequestsScreen} />
//       <Stack.Screen name="CreateLoadRequest"  component={CreateLoadRequestScreen} />
//       <Stack.Screen name="TripStatus"         component={TripStatusScreen} />
      
//       <Stack.Screen name="Payment"            component={PaymentScreen} />
//       <Stack.Screen name="Profile"            component={ProfileScreen} />

//       {/* ── DRIVER ─────────────────────────────────── */}
//       {/* DriverDashboardScreen ready ஆனதும் Placeholder-ஐ replace பண்ணுங்க:
//           <Stack.Screen name="DriverDashboard" component={DriverDashboardScreen} /> */}
//       <Stack.Screen name="DriverDashboard"    component={Placeholder('Driver Dashboard 🚛')} />

//       {/* ── PLACEHOLDERS (navigate errors தடுக்க) ─── */}
//       <Stack.Screen name="Notifications"      component={Placeholder('Notifications 🔔')} />
//       <Stack.Screen name="TripDetails"        component={Placeholder('Trip Details 🗺️')} />
//       <Stack.Screen name="MyTrips"            component={Placeholder('My Trips 📋')} />
//       <Stack.Screen name="Earnings"           component={Placeholder('Earnings 💰')} />
//       <Stack.Screen name="Support"            component={Placeholder('Support 🎧')} />

//     </Stack.Navigator>
//   );
// }

// // ─── Placeholder factory ──────────────────────────────────────────────────────
// function Placeholder(title) {
//   const Screen = ({ navigation }) => (
//     <View style={ph.container}>
//       <Text style={ph.emoji}>🚧</Text>
//       <Text style={ph.title}>{title}</Text>
//       <Text style={ph.sub}>Coming soon...</Text>
//       <TouchableOpacity style={ph.btn} onPress={() => navigation.goBack()}>
//         <Text style={ph.btnText}>← Go Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
//   Screen.displayName = title;
//   return Screen;
// }

// const ph = StyleSheet.create({
//   container: {
//     flex: 1, backgroundColor: '#F8F8F8',
//     alignItems: 'center', justifyContent: 'center',
//   },
//   emoji:   { fontSize: 56, marginBottom: 16 },
//   title:   { fontSize: 22, fontWeight: '800', color: '#111' },
//   sub:     { fontSize: 14, color: '#999', marginTop: 6 },
//   btn: {
//     marginTop: 32, backgroundColor: '#FF6A00',
//     paddingHorizontal: 28, paddingVertical: 12, borderRadius: 12,
//   },
//   btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
// });





import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CreateLoadRequestScreen from '../screens/CreateLoadRequestScreen';
import LoginScreen from '../screens/LoginScreen';
import MyLoadRequestsScreen from '../screens/MyLoadRequestsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TripStatusScreen from '../screens/TripStatusScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login"             component={LoginScreen} />
      <Stack.Screen name="Register"          component={RegisterScreen} />
      <Stack.Screen name="MyLoadRequests"    component={MyLoadRequestsScreen} />
      <Stack.Screen name="CreateLoadRequest" component={CreateLoadRequestScreen} />
      <Stack.Screen name="TripStatus"        component={TripStatusScreen} />
      <Stack.Screen name="Payment"           component={PaymentScreen} />
      <Stack.Screen name="Profile"           component={ProfileScreen} />
      <Stack.Screen name="DriverDashboard"   component={Placeholder('Driver Dashboard 🚛')} />
      <Stack.Screen name="Notifications"     component={Placeholder('Notifications 🔔')} />
      <Stack.Screen name="TripDetails"       component={Placeholder('Trip Details 🗺️')} />
      <Stack.Screen name="MyTrips"           component={Placeholder('My Trips 📋')} />
      <Stack.Screen name="Earnings"          component={Placeholder('Earnings 💰')} />
      <Stack.Screen name="Support"           component={Placeholder('Support 🎧')} />
    </Stack.Navigator>
  );
}

function Placeholder(title) {
  const Screen = ({ navigation }) => (
    <View style={ph.container}>
      <Text style={ph.emoji}>🚧</Text>
      <Text style={ph.title}>{title}</Text>
      <Text style={ph.sub}>Coming soon...</Text>
      <TouchableOpacity style={ph.btn} onPress={() => navigation.goBack()}>
        <Text style={ph.btnText}>← Go Back</Text>
      </TouchableOpacity>
    </View>
  );
  Screen.displayName = title;
  return Screen;
}

const ph = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8', alignItems: 'center', justifyContent: 'center' },
  emoji:     { fontSize: 56, marginBottom: 16 },
  title:     { fontSize: 22, fontWeight: '800', color: '#111' },
  sub:       { fontSize: 14, color: '#999', marginTop: 6 },
  btn:       { marginTop: 32, backgroundColor: '#FF6A00', paddingHorizontal: 28, paddingVertical: 12, borderRadius: 12 },
  btnText:   { color: '#fff', fontWeight: '700', fontSize: 15 },
});