// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { customerAPI } from '../services/api';

// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async () => {
//     // Basic validation
//     if (!phoneNumber || !password) {
//       Alert.alert('Error', 'Please enter phone number and password');
//       return;
//     }

//     if (phoneNumber.length !== 10) {
//       Alert.alert('Error', 'Please enter a valid 10-digit phone number');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await customerAPI.login({ phoneNumber, password });
//       console.log('LOGIN RESPONSE:', response.data);

//       if (response.data?.success) {
//         // Save user info in AsyncStorage
//         const user = {
//           customerId: response.data.customerId,
//           name: response.data.name,
//           email: response.data.email,
//         };
//         await AsyncStorage.setItem('userData', JSON.stringify(user));

//         // Navigate to Dashboard
//         navigation.replace('Dashboard');

//         Alert.alert('Success', response.data.message || 'Login successful');
//       } else {
//         Alert.alert('Error', response.data?.message || 'Login failed');
//       }
//     } catch (error) {
//       console.log('LOGIN ERROR:', error.response || error.message);
//       Alert.alert(
//         'Login Failed',
//         error.response?.data?.message || 'Server error'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.header}>
//           <Icon name="local-shipping" size={80} color="#3498db" />
//           <Text style={styles.title}>Truck Booking</Text>
//           <Text style={styles.subtitle}>Customer Login</Text>
//         </View>

//         <View style={styles.form}>
//           {/* Phone */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>
//               <Icon name="phone" size={16} color="#666" /> Phone Number
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter 10-digit phone number"
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//               keyboardType="phone-pad"
//               maxLength={10}
//               editable={!loading}
//             />
//           </View>

//           {/* Password */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>
//               <Icon name="lock" size={16} color="#666" /> Password
//             </Text>
//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Enter password"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!showPassword}
//                 editable={!loading}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(!showPassword)}
//                 style={styles.eyeIcon}
//               >
//                 <Icon
//                   name={showPassword ? 'visibility-off' : 'visibility'}
//                   size={24}
//                   color="#666"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Login Button */}
//           <TouchableOpacity
//             style={[styles.loginButton, loading && styles.buttonDisabled]}
//             onPress={handleLogin}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="white" />
//             ) : (
//               <>
//                 <Icon name="login" size={20} color="white" />
//                 <Text style={styles.loginButtonText}>LOGIN</Text>
//               </>
//             )}
//           </TouchableOpacity>

//           {/* Links */}
//           <View style={styles.linksContainer}>
//             <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//               <Text style={styles.link}>
//                 <Icon name="person-add" size={16} /> New Customer? Register
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Need help? Call: 1800-123-4567</Text>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f8f9fa' },
//   scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },
//   header: { alignItems: 'center', marginBottom: 40 },
//   title: { fontSize: 32, fontWeight: 'bold', color: '#2c3e50' },
//   subtitle: { fontSize: 16, color: '#7f8c8d' },
//   form: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 25,
//     elevation: 5,
//   },
//   inputContainer: { marginBottom: 20 },
//   label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 10,
//     padding: 15,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 10,
//   },
//   passwordInput: { flex: 1, padding: 15 },
//   eyeIcon: { padding: 10 },
//   loginButton: {
//     backgroundColor: '#3498db',
//     padding: 16,
//     borderRadius: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   buttonDisabled: { backgroundColor: '#95a5a6' },
//   loginButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   linksContainer: { marginTop: 20, alignItems: 'center' },
//   link: { color: '#3498db' },
//   footer: { marginTop: 30, alignItems: 'center' },
//   footerText: { color: '#7f8c8d', fontSize: 12 },
// });

// export default LoginScreen;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { customerAPI } from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Please enter phone number and password');
      return;
    }

    if (phoneNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);

    try {
      const response = await customerAPI.login({
        phoneNumber,
        password,
      });

      console.log('LOGIN RESPONSE:', response.data);

      if (response.data?.success) {
        const customerId = response.data.customerId;

        if (!customerId) {
          Alert.alert('Error', 'Invalid login response');
          return;
        }

        /* ✅ SAVE SESSION */
        await AsyncStorage.setItem(
          'customerId',
          customerId.toString()
        );

        await AsyncStorage.setItem(
          'userData',
          JSON.stringify({
            customerId,
            name: response.data.name || '',
            email: response.data.email || '',
          })
        );

        console.log('SAVED CUSTOMER ID:', customerId);

        /* ✅ GO TO DASHBOARD */
        navigation.replace('Dashboard');

        Alert.alert('Success', response.data.message || 'Login successful');
      } else {
        Alert.alert(
          'Login Failed',
          response.data?.message || 'Invalid credentials'
        );
      }
    } catch (error) {
      console.log('LOGIN ERROR:', error?.response || error?.message);
      Alert.alert(
        'Login Failed',
        error?.response?.data?.message || 'Server error'
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* HEADER */}
        <View style={styles.header}>
          <Icon name="local-shipping" size={80} color="#3498db" />
          <Text style={styles.title}>Truck Booking</Text>
          <Text style={styles.subtitle}>Customer Login</Text>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          {/* PHONE */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              <Icon name="phone" size={16} /> Phone Number
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 10-digit phone number"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              editable={!loading}
            />
          </View>

          {/* PASSWORD */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              <Icon name="lock" size={16} /> Password
            </Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Icon
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={22}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* LOGIN BUTTON */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Icon name="login" size={20} color="#fff" />
                <Text style={styles.loginButtonText}>LOGIN</Text>
              </>
            )}
          </TouchableOpacity>

          {/* REGISTER */}
          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>
                <Icon name="person-add" size={16} /> New Customer? Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Need help? Call: 1800-123-4567
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },

  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#2c3e50' },
  subtitle: { fontSize: 16, color: '#7f8c8d' },

  form: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    elevation: 5,
  },

  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
  },

  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },

  passwordInput: { flex: 1, padding: 15 },
  eyeIcon: { padding: 10 },

  loginButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  buttonDisabled: { backgroundColor: '#95a5a6' },

  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  linksContainer: { marginTop: 20, alignItems: 'center' },
  link: { color: '#098ee7' },

  footer: { marginTop: 30, alignItems: 'center' },
  footerText: { color: '#7f8c8d', fontSize: 12 },
});

export default LoginScreen;
