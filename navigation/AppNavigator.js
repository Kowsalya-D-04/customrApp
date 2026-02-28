import { createNativeStackNavigator } from '@react-navigation/native-stack';

// SCREENS
import CreateLoadRequestScreen from '../screens/CreateLoadRequestScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LoginScreen from '../screens/LoginScreen';
import MyLoadRequestsScreen from '../screens/MyLoadRequestsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TripStatusScreen from '../screens/TripStatusScreen';
import UpdateLocationScreen from '../screens/UpdateLocationScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {/* AUTH SCREENS */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* MAIN APP SCREENS */}
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="MyLoadRequests" component={MyLoadRequestsScreen} />
      <Stack.Screen name="CreateLoadRequest" component={CreateLoadRequestScreen} />
      <Stack.Screen name="TripStatus" component={TripStatusScreen} />
      <Stack.Screen name="UpdateLocation" component={UpdateLocationScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />

    </Stack.Navigator>
  );
}
