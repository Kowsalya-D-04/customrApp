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

//   /* ================= LOGIN ================= */
//   const [loginAttempts, setLoginAttempts] = useState(0);

// const handleLogin = async () => {
//   const phone = phoneNumber.trim();
//   const pass = password.trim();

//   /* ✅ VALIDATION */
//   const phoneRegex = /^[6-9]\d{9}$/;

//   if (!phone || !pass) {
//     Alert.alert('Error', 'Enter phone number and password');
//     return;
//   }

//   if (!phoneRegex.test(phone)) {
//     Alert.alert('Error', 'Enter valid 10-digit phone number');
//     return;
//   }

//   if (pass.length < 6) {
//     Alert.alert('Error', 'Password must be at least 6 characters');
//     return;
//   }

//   /* 🚫 SIMPLE BRUTE FORCE PROTECTION */
//   if (loginAttempts >= 5) {
//     Alert.alert('Blocked', 'Too many attempts. Try again later.');
//     return;
//   }

//   setLoading(true);

//   try {
//     const response = await customerAPI.login({
//       phoneNumber: phone,
//       password: pass,
//     });

//     console.log('LOGIN RESPONSE:', response.data);

//     if (response.data?.success) {
//       const customerId = response.data.customerId;
//       const token = response.data.token; // ✅ expect JWT from backend

//       if (!customerId) {
//         Alert.alert('Error', 'Login failed');
//         return;
//       }

//       /* ✅ SAVE TOKEN (IMPORTANT) */
//       if (token) {
//         await AsyncStorage.setItem('authToken', token);
//       }

//       /* ✅ SAVE USER */
//       await AsyncStorage.setItem('customerId', customerId.toString());

//       await AsyncStorage.setItem(
//         'userData',
//         JSON.stringify({
//           customerId,
//           name: response.data.name || '',
//           email: response.data.email || '',
//           phoneNumber: phone
//         })
//       );

//       setLoginAttempts(0); // reset attempts

//       navigation.replace('Dashboard');

//       Alert.alert('Success', 'Login successful');
//     } else {
//       setLoginAttempts(prev => prev + 1);

//       /* ❗ COMMON ERROR MESSAGE */
//       Alert.alert('Login Failed', 'Invalid phone number or password');
//     }
//   } catch (error) {
//     console.log('LOGIN ERROR:', error?.response || error?.message);

//     Alert.alert(
//       'Error',
//       'User not found.Create a new customer account'
//     );
//   } finally {
//     setLoading(false);
//   }
// };

//   /* ================= UI ================= */
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* HEADER */}
//         <View style={styles.header}>
//           <Icon name="local-shipping" size={80} color="#2e6ee2" />
//           <Text style={styles.title}>Truck Booking</Text>
//           <Text style={styles.subtitle}>Customer Login</Text>
//         </View>

//         {/* FORM */}
//         <View style={styles.form}>
//           {/* PHONE */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>
//               <Icon name="phone" size={16} /> Phone Number
//             </Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter 10-digit phone number"
//               keyboardType="phone-pad"
//               maxLength={10}
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//               editable={!loading}
//             />
//           </View>

//           {/* PASSWORD */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>
//               <Icon name="lock" size={16} /> Password
//             </Text>
//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Enter password"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={setPassword}
//                 editable={!loading}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(!showPassword)}
//                 style={styles.eyeIcon}
//               >
//                 <Icon
//                   name={showPassword ? 'visibility' : 'visibility-off'}
//                   size={22}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* LOGIN BUTTON */}
//           <TouchableOpacity
//             style={[styles.loginButton, loading && styles.buttonDisabled]}
//             onPress={handleLogin}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <>
//                 <Icon name="login" size={20} color="#fff" />
//                 <Text style={styles.loginButtonText}>LOGIN</Text>
//               </>
//             )}
//           </TouchableOpacity>

//           {/* REGISTER */}
//           <View style={styles.linksContainer}>
//             <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//               <Text style={styles.link}>
//                 <Icon name="person-add" size={16} /> New Customer? Register
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* FOOTER */}
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>
//             Need help? Call: 1800-123-4567
//           </Text>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

/* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f8f9fa' },
//   scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },

//   header: { alignItems: 'center', marginBottom: 40 },
//   title: { fontSize: 32, fontWeight: 'bold', color: '#15171a' },
//   subtitle: { fontSize: 16, color: '#5a5d5e' },

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
//     borderColor: '#d3d4d9',
//     borderRadius: 10,
//     padding: 15,
//   },

//   passwordContainer: {
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderColor: '#d3d4d9',
//     borderRadius: 10,
//   },

//   passwordInput: { flex: 1, padding: 15 },
//   eyeIcon: { padding: 10 },

//   loginButton: {
//     backgroundColor: '#2e6ee2',
//     padding: 16,
//     borderRadius: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },

//   buttonDisabled: { backgroundColor: '#f3f8f8' },

//   loginButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },

//   linksContainer: { marginTop: 20, alignItems: 'center' },
//   link: { color: '#207406' },

//   footer: { marginTop: 30, alignItems: 'center' },
//   footerText: { color: '#7f8c8d', fontSize: 12 },
// });

// export default LoginScreen;


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
// };

// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber]   = useState('');
//   const [password, setPassword]         = useState('');
//   const [loading, setLoading]           = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loginAttempts, setLoginAttempts] = useState(0);

//   /* ─── LOGIN HANDLER ─── */
//   const handleLogin = async () => {
//     const phone = phoneNumber.trim();
//     const pass  = password.trim();

//     // Validation
//     if (!phone || !pass) {
//       Alert.alert('Error', 'Enter phone number and password');
//       return;
//     }
//     if (!/^[6-9]\d{9}$/.test(phone)) {
//       Alert.alert('Error', 'Enter valid 10-digit phone number');
//       return;
//     }
//     if (pass.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters');
//       return;
//     }
//     if (loginAttempts >= 5) {
//       Alert.alert('Blocked', 'Too many attempts. Try again later.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await customerAPI.login({ phoneNumber: phone, password: pass });

//       console.log('LOGIN RESPONSE:', response.data);

//       if (response.data?.success) {
//         const { customerId, token, name, email } = response.data;

//         if (!customerId) {
//           Alert.alert('Error', 'Login failed');
//           return;
//         }

//         // Save to AsyncStorage
//         if (token) await AsyncStorage.setItem('authToken', token);
//         await AsyncStorage.setItem('customerId', customerId.toString());
//         await AsyncStorage.setItem('userData', JSON.stringify({
//           customerId, name: name || '', email: email || '', phoneNumber: phone,
//         }));

//         setLoginAttempts(0);

//         // ✅ FIX: use navigate instead of replace for web compatibility
//         if (Platform.OS === 'web') {
//           navigation.navigate('Dashboard');
//         } else {
//           navigation.replace('Dashboard');
//         }

//       } else {
//         setLoginAttempts(prev => prev + 1);
//         Alert.alert('Login Failed', 'Invalid phone number or password');
//       }
//     } catch (error) {
//       console.log('LOGIN ERROR:', error?.response || error?.message);
//       Alert.alert('Error', 'User not found. Create a new customer account');
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ─── UI ─── */
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">

//         {/* HEADER */}
//         <View style={styles.header}>
//           <View style={styles.iconCircle}>
//             <Text style={styles.iconEmoji}>🚛</Text>
//           </View>
//           <Text style={styles.title}>Truck Booking</Text>
//           <Text style={styles.subtitle}>Customer Login</Text>
//         </View>

//         {/* FORM CARD */}
//         <View style={styles.card}>

//           {/* PHONE */}
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>📱 Phone Number</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter 10-digit phone number"
//               placeholderTextColor={Colors.gray}
//               keyboardType="phone-pad"
//               maxLength={10}
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//               editable={!loading}
//             />
//           </View>

//           {/* PASSWORD */}
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>🔒 Password</Text>
//             <View style={styles.passwordRow}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Enter password"
//                 placeholderTextColor={Colors.gray}
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={setPassword}
//                 editable={!loading}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(!showPassword)}
//                 style={styles.eyeBtn}
//               >
//                 <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* LOGIN BUTTON */}
//           <TouchableOpacity
//             style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
//             onPress={handleLogin}
//             disabled={loading}
//           >
//             {loading
//               ? <ActivityIndicator color={Colors.white} />
//               : <Text style={styles.loginBtnText}>LOGIN →</Text>
//             }
//           </TouchableOpacity>

//           {/* DIVIDER */}
//           <View style={styles.divider}>
//             <View style={styles.dividerLine} />
//             <Text style={styles.dividerText}>OR</Text>
//             <View style={styles.dividerLine} />
//           </View>

//           {/* REGISTER LINK */}
//           <TouchableOpacity
//             style={styles.registerBtn}
//             onPress={() => navigation.navigate('Register')}
//           >
//             <Text style={styles.registerBtnText}>New Customer? Register Here</Text>
//           </TouchableOpacity>

//         </View>

//         {/* FOOTER */}
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>📞 Need help? Call: 1800-123-4567</Text>
//         </View>

//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default LoginScreen;

// /* ─── STYLES ─── */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.bg,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },

//   // Header
//   header: {
//     alignItems: 'center',
//     marginBottom: 28,
//   },
//   iconCircle: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: Colors.primaryBg,
//     borderWidth: 2,
//     borderColor: Colors.primaryLight,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 14,
//   },
//   iconEmoji: {
//     fontSize: 42,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: '700',
//     color: Colors.primary,
//     letterSpacing: 0.5,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: Colors.gray,
//     marginTop: 4,
//   },

//   // Card
//   card: {
//     backgroundColor: Colors.white,
//     borderRadius: 20,
//     padding: 24,
//     borderWidth: 1,
//     borderColor: Colors.border,
//     shadowColor: Colors.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 4,
//   },

//   // Input
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: Colors.primaryDark,
//     marginBottom: 6,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1.5,
//     borderColor: Colors.border,
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     fontSize: 15,
//     color: Colors.black,
//     backgroundColor: Colors.bg,
//   },
//   passwordRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1.5,
//     borderColor: Colors.border,
//     borderRadius: 12,
//     backgroundColor: Colors.bg,
//     paddingRight: 8,
//   },
//   passwordInput: {
//     flex: 1,
//     height: 50,
//     paddingHorizontal: 14,
//     fontSize: 15,
//     color: Colors.black,
//   },
//   eyeBtn: {
//     padding: 8,
//   },
//   eyeText: {
//     fontSize: 18,
//   },

//   // Login button
//   loginBtn: {
//     height: 52,
//     backgroundColor: Colors.primary,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 8,
//     shadowColor: Colors.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.35,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   loginBtnDisabled: {
//     opacity: 0.7,
//   },
//   loginBtnText: {
//     color: Colors.white,
//     fontSize: 16,
//     fontWeight: '700',
//     letterSpacing: 1,
//   },

//   // Divider
//   divider: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 18,
//     gap: 10,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: Colors.border,
//   },
//   dividerText: {
//     fontSize: 12,
//     color: Colors.gray,
//     fontWeight: '500',
//   },

//   // Register button
//   registerBtn: {
//     height: 50,
//     borderRadius: 14,
//     borderWidth: 1.5,
//     borderColor: Colors.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   registerBtnText: {
//     color: Colors.primary,
//     fontSize: 14,
//     fontWeight: '600',
//   },

//   // Footer
//   footer: {
//     alignItems: 'center',
//     marginTop: 24,
//   },
//   footerText: {
//     fontSize: 13,
//     color: Colors.gray,
//   },
// });


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
// import { customerAPI } from '../services/api';
 
// // ─── THEME ───────────────────────────────────────────────
// const C = {
//   primary:      '#FF6A00',
//   primaryLight: '#FFF4EC',
//   white:        '#FFFFFF',
//   textPrimary:  '#111111',
//   textSecondary:'#666666',
//   border:       '#EEEEEE',
//   bg:           '#F8F8F8',
// };
 
// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber]     = useState('');
//   const [password, setPassword]           = useState('');
//   const [loading, setLoading]             = useState(false);
//   const [showPassword, setShowPassword]   = useState(false);
//   const [loginAttempts, setLoginAttempts] = useState(0);
 
//   const handleLogin = async () => {
//     const phone = phoneNumber.trim();
//     const pass  = password.trim();
 
//     if (!phone || !pass) { Alert.alert('Error', 'Enter phone number and password'); return; }
//     if (!/^[6-9]\d{9}$/.test(phone)) { Alert.alert('Error', 'Enter valid 10-digit phone number'); return; }
//     if (pass.length < 6) { Alert.alert('Error', 'Password must be at least 6 characters'); return; }
//     if (loginAttempts >= 5) { Alert.alert('Blocked', 'Too many attempts. Try again later.'); return; }
 
//     setLoading(true);
//     try {
//       const response = await customerAPI.login({ phoneNumber: phone, password: pass });
//       if (response.data?.success) {
//         const { customerId, token, name, email } = response.data;
//         if (!customerId) { Alert.alert('Error', 'Login failed'); return; }
//         if (token) await AsyncStorage.setItem('authToken', token);
//         await AsyncStorage.setItem('customerId', customerId.toString());
//         await AsyncStorage.setItem('userData', JSON.stringify({ customerId, name: name || '', email: email || '', phoneNumber: phone }));
//         setLoginAttempts(0);
//         Platform.OS === 'web' ? navigation.navigate('Dashboard') : navigation.replace('Dashboard');
//       } else {
//         setLoginAttempts(prev => prev + 1);
//         Alert.alert('Login Failed', 'Invalid phone number or password');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'User not found. Create a new customer account');
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={S.container}>
//       <ScrollView contentContainerStyle={S.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
 
//         {/* HERO */}
//         <View style={S.hero}>
//           <View style={S.logoWrap}>
//             <Text style={S.logoIcon}>🚛</Text>
//           </View>
//           <Text style={S.appName}>Truck Booking</Text>
//           <Text style={S.tagline}>Move anything, anywhere</Text>
//         </View>
 
//         {/* CARD */}
//         <View style={S.card}>
//           <Text style={S.cardTitle}>Welcome back</Text>
//           <Text style={S.cardSubtitle}>Sign in to continue</Text>
 
//           {/* PHONE */}
//           <View style={S.fieldWrap}>
//             <Text style={S.label}>Phone Number</Text>
//             <TextInput
//               style={S.input}
//               placeholder="Enter 10-digit number"
//               placeholderTextColor={C.textSecondary}
//               keyboardType="phone-pad"
//               maxLength={10}
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//               editable={!loading}
//             />
//           </View>
 
//           {/* PASSWORD */}
//           <View style={S.fieldWrap}>
//             <Text style={S.label}>Password</Text>
//             <View style={S.passwordRow}>
//               <TextInput
//                 style={S.passwordInput}
//                 placeholder="Enter password"
//                 placeholderTextColor={C.textSecondary}
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={setPassword}
//                 editable={!loading}
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={S.eyeBtn}>
//                 <Text style={S.eyeIcon}>{showPassword ? '👁️':'🙈' }</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
 
//           {/* PRIMARY BUTTON */}
//           <TouchableOpacity style={[S.primaryBtn, loading && S.btnDisabled]} onPress={handleLogin} disabled={loading}>
//             {loading
//               ? <ActivityIndicator color={C.white} />
//               : <Text style={S.primaryBtnText}>Sign In →</Text>
//             }
//           </TouchableOpacity>
 
          
 
//           {/* SECONDARY BUTTON */}
//           <TouchableOpacity style={S.secondaryBtn} onPress={() => navigation.navigate('Register')}>
//             <Text style={S.secondaryBtnText}>New here? Create Account</Text>
//           </TouchableOpacity>
//         </View>
 
//         {/* FOOTER */}
//         <Text style={S.footer}>📞 Need help? Call 9566137117</Text>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };
 
// export default LoginScreen;
 
// const S = StyleSheet.create({
//   container: { flex: 1, backgroundColor: C.bg },
//   scroll: { flexGrow: 1, justifyContent: 'center', padding: 16, paddingBottom: 32 },
 
//   hero: { alignItems: 'center', marginBottom: 32 },
//   logoWrap: {
//     width: 88, height: 88, borderRadius: 44,
//     backgroundColor: C.primaryLight,
//     alignItems: 'center', justifyContent: 'center', marginBottom: 16,
//   },
//   logoIcon: { fontSize: 40 },
//   appName: { fontSize: 28, fontWeight: '700', color: C.textPrimary, letterSpacing: 0.3 },
//   tagline: { fontSize: 14, color: C.textSecondary, marginTop: 4 },
 
//   card: {
//     backgroundColor: C.white, borderRadius: 20, padding: 24,
//     borderWidth: 1, borderColor: C.border,
//     shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3,
//   },
//   cardTitle: { fontSize: 22, fontWeight: '700', color: C.textPrimary, marginBottom: 4 },
//   cardSubtitle: { fontSize: 14, color: C.textSecondary, marginBottom: 24 },
 
//   fieldWrap: { marginBottom: 16 },
//   label: { fontSize: 12, fontWeight: '600', color: C.textSecondary, marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase' },
//   input: {
//     height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, fontSize: 15, color: C.textPrimary, backgroundColor: C.bg,
//   },
//   passwordRow: {
//     flexDirection: 'row', alignItems: 'center',
//     height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     backgroundColor: C.bg, paddingRight: 8,
//   },
//   passwordInput: { flex: 1, paddingHorizontal: 14, fontSize: 15, color: C.textPrimary },
//   eyeBtn: { padding: 8 },
//   eyeIcon: { fontSize: 18 },
 
//   primaryBtn: {
//     height: 52, backgroundColor: C.primary, borderRadius: 12,
//     alignItems: 'center', justifyContent: 'center', marginTop: 8,
//     shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
//   },
//   btnDisabled: { opacity: 0.6 },
//   primaryBtnText: { color: C.white, fontSize: 16, fontWeight: '700' },
 
//   dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
//   dividerLine: { flex: 1, height: 1, backgroundColor: C.border },
//   dividerLabel: { marginHorizontal: 12, fontSize: 12, color: C.textSecondary, fontWeight: '600' },
 
//   secondaryBtn: {
//     height: 48, borderWidth: 1.5, borderColor: C.primary, borderRadius: 12,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   secondaryBtnText: { color: C.primary, fontSize: 14, fontWeight: '600' },
 
//   footer: { textAlign: 'center', marginTop: 24, fontSize: 13, color: C.textSecondary },
// });


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
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
// import Svg, { Circle, Path, Rect } from 'react-native-svg';
// import { customerAPI } from '../services/api';

// // ── Colors ─────────────────────────────────────────────────
// const C = {
//   bg:          '#111111',
//   card:        '#111111',
//   surface:     '#1E1E1E',
//   border:      '#2E2E2E',
//   primary:     '#E55A00',   // darker orange
//   primaryDark: '#C44D00',
//   white:       '#FFFFFF',
//   text:        '#FFFFFF',
//   textMuted:   '#777777',
//   textDim:     '#444444',
//   hero:        '#E55A00',
// };

// // ── Icons ──────────────────────────────────────────────────
// const PhoneIcon = () => (
//   <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
//     <Path
//       d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
//       fill={C.primary}
//     />
//   </Svg>
// );

// const LockIcon = () => (
//   <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
//     <Rect x="5" y="11" width="14" height="10" rx="2" fill={C.primary} />
//     <Path
//       d="M8 11V7a4 4 0 018 0v4"
//       stroke={C.primary}
//       strokeWidth="2"
//       strokeLinecap="round"
//       fill="none"
//     />
//   </Svg>
// );

// const EyeIcon = ({ visible }) => (
//   <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
//     <Path
//       d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
//       stroke={visible ? C.primary : '#555'}
//       strokeWidth="2"
//       fill="none"
//     />
//     <Circle
//       cx="12" cy="12" r="3"
//       stroke={visible ? C.primary : '#555'}
//       strokeWidth="2"
//       fill="none"
//     />
//     {!visible && (
//       <Path d="M3 3l18 18" stroke="#555" strokeWidth="2" strokeLinecap="round" />
//     )}
//   </Svg>
// );

// // ── Component ──────────────────────────────────────────────
// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber]   = useState('');
//   const [password, setPassword]         = useState('');
//   const [loading, setLoading]           = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loginAttempts, setLoginAttempts] = useState(0);

//   const truckX      = useRef(new Animated.Value(-120)).current;
//   const heroOp      = useRef(new Animated.Value(0)).current;
//   const cardY       = useRef(new Animated.Value(60)).current;
//   const cardOp      = useRef(new Animated.Value(0)).current;
//   const field1Y     = useRef(new Animated.Value(30)).current;
//   const field1Op    = useRef(new Animated.Value(0)).current;
//   const field2Y     = useRef(new Animated.Value(30)).current;
//   const field2Op    = useRef(new Animated.Value(0)).current;
//   const btnY        = useRef(new Animated.Value(30)).current;
//   const btnOp       = useRef(new Animated.Value(0)).current;
//   const btnScale    = useRef(new Animated.Value(1)).current;
//   const shakeX      = useRef(new Animated.Value(0)).current;
//   const phoneBorder = useRef(new Animated.Value(0)).current;
//   const passBorder  = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(truckX, { toValue: 0, duration: 700, useNativeDriver: true }),
//         Animated.timing(heroOp, { toValue: 1, duration: 600, useNativeDriver: true }),
//       ]),
//       Animated.parallel([
//         Animated.timing(cardY,  { toValue: 0, duration: 500, useNativeDriver: true }),
//         Animated.timing(cardOp, { toValue: 1, duration: 500, useNativeDriver: true }),
//       ]),
//       Animated.parallel([
//         Animated.timing(field1Y,  { toValue: 0, duration: 380, useNativeDriver: true }),
//         Animated.timing(field1Op, { toValue: 1, duration: 380, useNativeDriver: true }),
//       ]),
//       Animated.parallel([
//         Animated.timing(field2Y,  { toValue: 0, duration: 380, useNativeDriver: true }),
//         Animated.timing(field2Op, { toValue: 1, duration: 380, useNativeDriver: true }),
//       ]),
//       Animated.parallel([
//         Animated.timing(btnY,  { toValue: 0, duration: 380, useNativeDriver: true }),
//         Animated.timing(btnOp, { toValue: 1, duration: 380, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, []);

//   const animateBorder = (anim, focused) =>
//     Animated.timing(anim, {
//       toValue: focused ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();

//   const phoneBorderColor = phoneBorder.interpolate({
//     inputRange: [0, 1], outputRange: [C.border, C.primary],
//   });
//   const passBorderColor = passBorder.interpolate({
//     inputRange: [0, 1], outputRange: [C.border, C.primary],
//   });

//   const onPressIn  = () => Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true }).start();
//   const onPressOut = () => Animated.spring(btnScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();

//   const triggerShake = () =>
//     Animated.sequence([
//       Animated.timing(shakeX, { toValue:  8, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue: -8, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue:  6, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue: -6, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue:  0, duration: 55, useNativeDriver: true }),
//     ]).start();

//   const handleLogin = async () => {
//     const phone = phoneNumber.trim();
//     const pass  = password.trim();

//     if (!phone || !pass) { triggerShake(); Alert.alert('Error', 'Enter phone number and password'); return; }
//     if (!/^[6-9]\d{9}$/.test(phone)) { triggerShake(); Alert.alert('Error', 'Enter valid 10-digit phone number'); return; }
//     if (pass.length < 6) { triggerShake(); Alert.alert('Error', 'Password must be at least 6 characters'); return; }
//     if (loginAttempts >= 5) { Alert.alert('Blocked', 'Too many attempts. Try again later.'); return; }

//     setLoading(true);
//     try {
//       const response = await customerAPI.login({ phoneNumber: phone, password: pass });
//       if (response.data?.success) {
//         const { customerId, token, name, email } = response.data;
//         if (!customerId) { Alert.alert('Error', 'Login failed'); return; }
//         if (token) await AsyncStorage.setItem('authToken', token);
//         await AsyncStorage.setItem('customerId', customerId.toString());
//         await AsyncStorage.setItem('userData', JSON.stringify({
//           customerId, name: name || '', email: email || '', phoneNumber: phone,
//         }));
//         setLoginAttempts(0);
//         Platform.OS === 'web'
//           ? navigation.navigate('CreateLoadRequest')
//           : navigation.replace('CreateLoadRequest');
//       } else {
//         setLoginAttempts(p => p + 1);
//         triggerShake();
//         Alert.alert('Login Failed', 'Invalid phone number or password');
//       }
//     } catch {
//       triggerShake();
//       Alert.alert('Error', 'User not found. Create a new customer account');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={S.container}>

//       {/* ── HERO (outside scroll — stays fixed at top) ── */}
//       <View style={S.hero}>
//         <View style={S.road}>
//           {[0,1,2,3,4].map(i => <View key={i} style={S.roadLine} />)}
//         </View>
//         <Animated.View style={[S.truckWrap, { transform: [{ translateX: truckX }] }]}>
//           <Text style={S.truckEmoji}>🚛</Text>
//         </Animated.View>
//         <Animated.View style={{ opacity: heroOp, alignItems: 'center' }}>
//           <View style={S.logoBox}>
//             <Text style={S.logoEmoji}>🚛</Text>
//           </View>
//           <Text style={S.appName}>TRUCK BOOKING</Text>
//           <Text style={S.tagline}>Move Anything, Anywhere</Text>
//         </Animated.View>
//       </View>

//       {/* ── KEYBOARD AVOIDING — only wraps the card ── */}
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={0}
//       >
//         <ScrollView
//           contentContainerStyle={S.scroll}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//           bounces={false}
//         >
//           <Animated.View style={[S.card, { opacity: cardOp, transform: [{ translateY: cardY }] }]}>
//             <Text style={S.cardTitle}>Welcome Back!</Text>
//             <Text style={S.cardSubtitle}>Login to Continue</Text>

//             {/* Phone */}
//             <Animated.View style={[S.fieldWrap, { opacity: field1Op, transform: [{ translateY: field1Y }] }]}>
//               <Text style={S.fieldLabel}>PHONE NUMBER</Text>
//               <Animated.View style={[S.inputRow, { borderColor: phoneBorderColor }]}>
//                 <View style={S.iconBox}><PhoneIcon /></View>
//                 <View style={S.prefixBox}>
//                   <Text style={S.prefix}>+91</Text>
//                 </View>
//                 <TextInput
//                   style={S.input}
//                   placeholder="9876543210"
//                   placeholderTextColor={C.textDim}
//                   keyboardType="phone-pad"
//                   maxLength={10}
//                   value={phoneNumber}
//                   onChangeText={setPhoneNumber}
//                   onFocus={() => animateBorder(phoneBorder, true)}
//                   onBlur={()  => animateBorder(phoneBorder, false)}
//                   editable={!loading}
//                   returnKeyType="next"
//                 />
//               </Animated.View>
//             </Animated.View>

//             {/* Password */}
//             <Animated.View style={[S.fieldWrap, { opacity: field2Op, transform: [{ translateY: field2Y }] }]}>
//               <Text style={S.fieldLabel}>PASSWORD</Text>
//               <Animated.View style={[S.inputRow, { borderColor: passBorderColor }]}>
//                 <View style={S.iconBox}><LockIcon /></View>
//                 <TextInput
//                   style={S.input}
//                   placeholder="Enter password"
//                   placeholderTextColor={C.textDim}
//                   secureTextEntry={!showPassword}
//                   value={password}
//                   onChangeText={setPassword}
//                   onFocus={() => animateBorder(passBorder, true)}
//                   onBlur={()  => animateBorder(passBorder, false)}
//                   editable={!loading}
//                   returnKeyType="done"
//                   onSubmitEditing={handleLogin}
//                 />
//                 <TouchableOpacity
//                   onPress={() => setShowPassword(p => !p)}
//                   style={S.eyeBtn}
//                   hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                 >
//                   <EyeIcon visible={showPassword} />
//                 </TouchableOpacity>
//               </Animated.View>
//             </Animated.View>

//             {/* Forgot */}
//             <Animated.View style={[S.forgotWrap, { opacity: field2Op }]}>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('ForgotPassword')}
//                 hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
//               >
//                 <Text style={S.forgotText}>Forgot Password?</Text>
//               </TouchableOpacity>
//             </Animated.View>

//             {/* Login Button */}
//             <Animated.View style={{
//               opacity: btnOp,
//               transform: [{ translateY: btnY }, { translateX: shakeX }, { scale: btnScale }],
//             }}>
//               <Pressable
//                 style={[S.loginBtn, loading && S.btnDisabled]}
//                 onPress={handleLogin}
//                 onPressIn={onPressIn}
//                 onPressOut={onPressOut}
//                 disabled={loading}
//               >
//                 {loading
//                   ? <ActivityIndicator color={C.white} />
//                   : <Text style={S.loginBtnText}>LOGIN</Text>
//                 }
//               </Pressable>
//             </Animated.View>

//             {/* Divider */}
//             <Animated.View style={[S.divider, { opacity: btnOp }]}>
//               <View style={S.dividerLine} />
//               <Text style={S.dividerText}>OR</Text>
//               <View style={S.dividerLine} />
//             </Animated.View>

//             {/* Register */}
//             <Animated.View style={[S.registerRow, { opacity: btnOp }]}>
//               <Text style={S.registerText}>New here? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//                 <Text style={S.registerLink}>Create Account</Text>
//               </TouchableOpacity>
//             </Animated.View>

//           </Animated.View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// export default LoginScreen;

// // ── Styles ─────────────────────────────────────────────────
// const S = StyleSheet.create({
//   container: { flex: 1, backgroundColor: C.bg },

//   // HERO — fixed height, outside scroll
//   hero: {
//     height: 210,
//     backgroundColor: C.hero,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     paddingBottom: 22,
//     overflow: 'hidden',
//   },
//   road: {
//     position: 'absolute',
//     bottom: 14,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//   },
//   roadLine: {
//     width: 34,
//     height: 3,
//     borderRadius: 2,
//     backgroundColor: 'rgba(255,255,255,0.18)',
//   },
//   truckWrap: {
//     position: 'absolute',
//     bottom: 26,
//     left: 14,
//   },
//   truckEmoji: { fontSize: 42 },
//   logoBox: {
//     width: 58,
//     height: 58,
//     borderRadius: 15,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 8,
//   },
//   logoEmoji: { fontSize: 26 },
//   appName: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: C.white,
//     letterSpacing: 2.5,
//     marginBottom: 2,
//   },
//   tagline: { fontSize: 11, color: 'rgba(255,255,255,0.78)' },

//   // SCROLL
//   scroll: { flexGrow: 1 },

//   // CARD
//   card: {
//     backgroundColor: C.card,
//     borderTopLeftRadius: 28,
//     borderTopRightRadius: 28,
//     marginTop: -18,
//     padding: 24,
//     paddingBottom: 36,
//     flex: 1,
//     minHeight: '100%',
//   },
//   cardTitle:    { fontSize: 20, fontWeight: '700', color: C.text,     marginBottom: 2 },
//   cardSubtitle: { fontSize: 13, color: C.textMuted, marginBottom: 22 },

//   // Fields
//   fieldWrap:  { marginBottom: 16 },
//   fieldLabel: {
//     fontSize: 10,
//     fontWeight: '700',
//     color: C.textMuted,
//     letterSpacing: 0.8,
//     marginBottom: 6,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: C.surface,
//     borderWidth: 1.5,
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     height: 50,
//   },
//   iconBox: { marginRight: 10 },
//   prefixBox: {
//     borderRightWidth: 1,
//     borderRightColor: C.border,
//     paddingRight: 10,
//     marginRight: 10,
//   },
//   prefix: { fontSize: 14, fontWeight: '600', color: C.text },
//   input:  { flex: 1, fontSize: 14, color: C.text, height: '100%' },
//   eyeBtn: { padding: 6 },

//   // Forgot
//   forgotWrap: { alignItems: 'flex-end', marginTop: -6, marginBottom: 20 },
//   forgotText: { fontSize: 13, color: C.primary, fontWeight: '600' },

//   // Button
//   loginBtn: {
//     height: 50,
//     backgroundColor: C.primary,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   btnDisabled:  { opacity: 0.6 },
//   loginBtnText: { color: C.white, fontSize: 15, fontWeight: '700', letterSpacing: 0.8 },

//   // Divider
//   divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
//   dividerLine: { flex: 1, height: 1, backgroundColor: C.border },
//   dividerText: { marginHorizontal: 12, fontSize: 12, color: C.textMuted, fontWeight: '600' },

//   // Register
//   registerRow: { flexDirection: 'row', justifyContent: 'center' },
//   registerText: { fontSize: 13, color: C.textMuted },
//   registerLink: { fontSize: 13, color: C.primary, fontWeight: '700' },
// });
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useRef, useState } from 'react';

// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   ImageBackground,
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
// import { customerAPI } from '../services/api';

// const C = {
//   primary:     '#FF6A00',
//   white:       '#FFFFFF',
//   bg:          '#FFFFFF',
//   text:        '#111111',
//   textMuted:   '#888888',
//   border:      '#E0E0E0',
//   inputBg:     '#FAFAFA',
//   surface:     '#F5F5F5',
// };

// // ── Eye Icon ───────────────────────────────────────────────
// const EyeIcon = ({ visible }) => (
//   <Text style={{ fontSize: 16, color: visible ? C.primary : '#AAAAAA' }}>
//     {visible ? '👁️' : '🙈'}
//   </Text>
// );

// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber]   = useState('');
//   const [password, setPassword]         = useState('');
//   const [loading, setLoading]           = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [phoneFocused, setPhoneFocused] = useState(false);
//   const [passFocused, setPassFocused]   = useState(false);
//   const [loginAttempts, setLoginAttempts] = useState(0);

//   // Animations
//   const heroOp   = useRef(new Animated.Value(0)).current;
//   const cardY    = useRef(new Animated.Value(50)).current;
//   const cardOp   = useRef(new Animated.Value(0)).current;
//   const shakeX   = useRef(new Animated.Value(0)).current;
//   const btnScale = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.timing(heroOp, { toValue: 1, duration: 600, useNativeDriver: true }),
//       Animated.parallel([
//         Animated.timing(cardY,  { toValue: 0, duration: 480, useNativeDriver: true }),
//         Animated.timing(cardOp, { toValue: 1, duration: 480, useNativeDriver: true }),
//       ]),
//     ]).start();
//   }, []);

//   const triggerShake = () =>
//     Animated.sequence([
//       Animated.timing(shakeX, { toValue:  9, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue: -9, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue:  6, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue: -6, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue:  0, duration: 55, useNativeDriver: true }),
//     ]).start();

//   const onPressIn  = () => Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true }).start();
//   const onPressOut = () => Animated.spring(btnScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();

//   const handleLogin = async () => {
//     const phone = phoneNumber.trim();
//     const pass  = password.trim();

//     if (!phone || !pass) {
//       triggerShake();
//       Alert.alert('Error', 'Enter phone number and password');
//       return;
//     }
//     if (!/^[6-9]\d{9}$/.test(phone)) {
//       triggerShake();
//       Alert.alert('Error', 'Enter valid 10-digit phone number');
//       return;
//     }
//     if (pass.length < 6) {
//       triggerShake();
//       Alert.alert('Error', 'Password must be at least 6 characters');
//       return;
//     }
//     if (loginAttempts >= 5) {
//       Alert.alert('Blocked', 'Too many attempts. Try again later.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await customerAPI.login({ phoneNumber: phone, password: pass });
//       if (response.data?.success) {
//         const { customerId, token, name, email } = response.data;
//         if (!customerId) { Alert.alert('Error', 'Login failed'); return; }
//         if (token) await AsyncStorage.setItem('authToken', token);
//         await AsyncStorage.setItem('customerId', customerId.toString());
//         await AsyncStorage.setItem('userData', JSON.stringify({
//           customerId, name: name || '', email: email || '', phoneNumber: phone,
//         }));
//         setLoginAttempts(0);
//         Platform.OS === 'web'
//           ? navigation.navigate('CreateLoadRequest')
//           : navigation.replace('CreateLoadRequest');
//       } else {
//         setLoginAttempts(p => p + 1);
//         triggerShake();
//         Alert.alert('Login Failed', 'Invalid phone number or password');
//       }
//     } catch {
//       triggerShake();
//       Alert.alert('Error', 'User not found. Create a new customer account');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={S.container}>

//       {/* ── HERO ── */}
//       <Animated.View style={[S.hero, { opacity: heroOp }]}>
//         <ImageBackground
//           source={{ uri: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80' }}
//           style={S.heroBg}
//           resizeMode="cover"
//         >
//           {/* Orange overlay */}
//           <View style={S.heroOverlay} />

//           {/* Top orange bar with step label */}
//           {/* <View style={S.stepBar}>
//             <Text style={S.stepText}>01. Login</Text>
//           </View> */}

//           {/* Logo + App Name */}
//           <View style={S.heroContent}>
//             <View style={S.logoBox}>
//               <Text style={S.logoEmoji}>🚛</Text>
//             </View>
//             <Text style={S.appName}>TRUCK BOOKING</Text>
//             <Text style={S.tagline}>Move Anything, Anywhere</Text>
//           </View>
//         </ImageBackground>
//       </Animated.View>

//       {/* ── CARD ── */}
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
//       >
//         <ScrollView
//           contentContainerStyle={S.scroll}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//           bounces={false}
//           keyboardDismissMode="on-drag"
//         >
//           <Animated.View style={[
//             S.card,
//             { opacity: cardOp, transform: [{ translateY: cardY }] },
//           ]}>
//             <Text style={S.cardTitle}>Welcome Back!</Text>
//             <Text style={S.cardSubtitle}>Login to Continue</Text>

//             {/* ── Phone Field ── */}
//             <View style={S.fieldWrap}>
//               <View style={[
//                 S.inputRow,
//                 phoneFocused && S.inputRowFocused,
//               ]}>
//                 {/* Phone icon */}
//                 <View style={S.iconCircle}>
//                   <Text style={S.fieldIcon}>📞</Text>
//                 </View>
//                 {/* +91 prefix */}
//                 <View style={S.prefixBox}>
//                   <Text style={S.prefix}>+91</Text>
//                 </View>
//                 <View style={S.dividerV} />
//                 <TextInput
//                   style={S.input}
//                   placeholder="9876543210"
//                   placeholderTextColor="#BBBBBB"
//                   keyboardType="phone-pad"
//                   maxLength={10}
//                   value={phoneNumber}
//                   onChangeText={setPhoneNumber}
//                   onFocus={() => setPhoneFocused(true)}
//                   onBlur={() => setPhoneFocused(false)}
//                   editable={!loading}
//                   returnKeyType="next"
//                 />
//               </View>
//             </View>

//             {/* ── Password Field ── */}
//             <View style={S.fieldWrap}>
//               <View style={[
//                 S.inputRow,
//                 passFocused && S.inputRowFocused,
//               ]}>
//                 {/* Lock icon */}
//                 <View style={S.iconCircle}>
//                   <Text style={S.fieldIcon}>🔒</Text>
//                 </View>
//                 <TextInput
//                   style={[S.input, { marginLeft: 4 }]}
//                   placeholder="Password"
//                   placeholderTextColor="#BBBBBB"
//                   secureTextEntry={!showPassword}
//                   value={password}
//                   onChangeText={setPassword}
//                   onFocus={() => setPassFocused(true)}
//                   onBlur={() => setPassFocused(false)}
//                   editable={!loading}
//                   returnKeyType="done"
//                   onSubmitEditing={handleLogin}
//                 />
//                 <TouchableOpacity
//                   onPress={() => setShowPassword(p => !p)}
//                   style={S.eyeBtn}
//                   hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//                 >
//                   <EyeIcon visible={showPassword} />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* ── Forgot Password ── */}
//             <View style={S.forgotWrap}>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('ForgotPassword')}
//                 hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
//               >
//                 <Text style={S.forgotText}>Forgot Password?</Text>
//               </TouchableOpacity>
//             </View>

//             {/* ── Login Button ── */}
//             <Animated.View style={{
//               transform: [{ translateX: shakeX }, { scale: btnScale }],
//               marginTop: 8,
//             }}>
//               <Pressable
//                 style={[S.loginBtn, loading && S.btnDisabled]}
//                 onPress={handleLogin}
//                 onPressIn={onPressIn}
//                 onPressOut={onPressOut}
//                 disabled={loading}
//               >
//                 {loading
//                   ? <ActivityIndicator color={C.white} />
//                   : <Text style={S.loginBtnText}>LOGIN</Text>
//                 }
//               </Pressable>
//             </Animated.View>

//             {/* ── Register ── */}
//             <View style={S.registerRow}>
//               <Text style={S.registerText}>Don't have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//                 <Text style={S.registerLink}>Register</Text>
//               </TouchableOpacity>
//             </View>

//             {/* ── Need Help ── */}
//             <TouchableOpacity style={S.helpCard} activeOpacity={0.85}>
//               <View style={S.helpIconWrap}>
//                 <Text style={S.helpIconEmoji}>🎧</Text>
//               </View>
//               <View style={{ flex: 1 }}>
//                 <Text style={S.helpTitle}>Need Help?</Text>
//                 <Text style={S.helpSub}>Call 9566137117</Text>
//               </View>
//               <Text style={S.helpArrow}>›</Text>
//             </TouchableOpacity>

//           </Animated.View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// export default LoginScreen;

// const S = StyleSheet.create({
//   container: { flex: 1, backgroundColor: C.white },

//   // ── Hero ──
//   hero: { height: 260 },
//   heroBg: { flex: 1, justifyContent: 'flex-end' },
//   heroOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(220, 90, 0, 0.55)',
//   },

//   stepBar: {
//     position: 'absolute',
//     top: 0, left: 0, right: 0,
//     backgroundColor: C.primary,
//     paddingVertical: 6,
//     paddingHorizontal: 18,
//   },
//   stepText: {
//     color: C.white,
//     fontSize: 13,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },

//   heroContent: {
//     alignItems: 'center',
//     paddingBottom: 28,
//   },
//   logoBox: {
//     width: 60,
//     height: 60,
//     borderRadius: 16,
//     backgroundColor: 'rgba(255,255,255,0.22)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 8,
//     borderWidth: 1.5,
//     borderColor: 'rgba(255,255,255,0.35)',
//   },
//   logoEmoji: { fontSize: 28 },
//   appName: {
//     fontSize: 17,
//     fontWeight: '800',
//     color: C.white,
//     letterSpacing: 2.5,
//     marginBottom: 3,
//   },
//   tagline: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.85)',
//     letterSpacing: 0.3,
//   },

//   // ── Scroll / Card ──
//   scroll: { flexGrow: 1 },
//   card: {
//     backgroundColor: C.white,
//     borderTopLeftRadius: 28,
//     borderTopRightRadius: 28,
//     marginTop: -22,
//     paddingHorizontal: 24,
//     paddingTop: 28,
//     paddingBottom: 40,
//     flex: 1,
//     // Shadow for the card lift
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.07,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   cardTitle: {
//     fontSize: 22,
//     fontWeight: '800',
//     color: C.text,
//     marginBottom: 3,
//   },
//   cardSubtitle: {
//     fontSize: 13,
//     color: C.textMuted,
//     marginBottom: 24,
//   },

//   // ── Fields ──
//   fieldWrap: { marginBottom: 14 },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: C.inputBg,
//     borderWidth: 1.5,
//     borderColor: C.border,
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 52,
//   },
//   inputRowFocused: {
//     borderColor: C.primary,
//     backgroundColor: '#FFF8F4',
//   },
//   iconCircle: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#FFF0E6',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 8,
//   },
//   fieldIcon: { fontSize: 13 },
//   prefixBox: { marginRight: 6 },
//   prefix: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: C.text,
//   },
//   dividerV: {
//     width: 1,
//     height: 22,
//     backgroundColor: C.border,
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 15,
//     color: C.text,
//     height: 52,
//   },
//   eyeBtn: { padding: 6 },

//   // ── Forgot ──
//   forgotWrap: {
//     alignItems: 'flex-end',
//     marginTop: -4,
//     marginBottom: 20,
//   },
//   forgotText: {
//     fontSize: 13,
//     color: C.primary,
//     fontWeight: '600',
//   },

//   // ── Button ──
//   loginBtn: {
//     height: 52,
//     backgroundColor: C.primary,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#FF6A00',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.35,
//     shadowRadius: 10,
//     elevation: 6,
//     marginBottom: 22,
//   },
//   btnDisabled: { opacity: 0.6 },
//   loginBtnText: {
//     color: C.white,
//     fontSize: 15,
//     fontWeight: '800',
//     letterSpacing: 1.5,
//   },

//   // ── Register ──
//   registerRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   registerText: { fontSize: 13, color: C.textMuted },
//   registerLink: {
//     fontSize: 13,
//     color: C.primary,
//     fontWeight: '700',
//   },

//   // ── Help Card ──
//   helpCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF4EC',
//     borderRadius: 14,
//     padding: 14,
//     gap: 12,
//     borderWidth: 1,
//     borderColor: '#FFD4A8',
//   },
//   helpIconWrap: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: C.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   helpIconEmoji: { fontSize: 18 },
//   helpTitle: { fontSize: 14, fontWeight: '700', color: '#111111' },
//   helpSub:   { fontSize: 13, color: C.primary, fontWeight: '600', marginTop: 1 },
//   helpArrow: { fontSize: 22, color: C.primary, fontWeight: '700', marginLeft: 'auto' },
// });


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useRef, useState } from 'react';

// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   Dimensions,
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
// import { customerAPI } from '../services/api';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// const C = {
//   primary:   '#FF6A00',
//   white:     '#FFFFFF',
//   bg:        '#FFFFFF',
//   text:      '#111111',
//   textMuted: '#888888',
//   border:    '#E0E0E0',
//   inputBg:   '#FAFAFA',
//   surface:   '#F5F5F5',
// };

// const EyeIcon = ({ visible }) => (
//   <Text style={{ fontSize: 16, color: visible ? C.primary : '#AAAAAA' }}>
//     {visible ? '👁️' : '🙈'}
//   </Text>
// );

// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber]     = useState('');
//   const [password, setPassword]           = useState('');
//   const [loading, setLoading]             = useState(false);
//   const [showPassword, setShowPassword]   = useState(false);
//   const [phoneFocused, setPhoneFocused]   = useState(false);
//   const [passFocused, setPassFocused]     = useState(false);
//   const [loginAttempts, setLoginAttempts] = useState(0);

//   const cardY    = useRef(new Animated.Value(40)).current;
//   const cardOp   = useRef(new Animated.Value(0)).current;
//   const shakeX   = useRef(new Animated.Value(0)).current;
//   const btnScale = useRef(new Animated.Value(1)).current;

//   const passwordRef = useRef(null);

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(cardY,  { toValue: 0, duration: 480, useNativeDriver: true }),
//       Animated.timing(cardOp, { toValue: 1, duration: 480, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   const triggerShake = () =>
//     Animated.sequence([
//       Animated.timing(shakeX, { toValue:  9, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue: -9, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue:  6, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue: -6, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue:  0, duration: 55, useNativeDriver: true }),
//     ]).start();

//   const onPressIn  = () => Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true }).start();
//   const onPressOut = () => Animated.spring(btnScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();

//   const handleLogin = async () => {
//     const phone = phoneNumber.trim();
//     const pass  = password.trim();

//     if (!phone || !pass) {
//       triggerShake();
//       Alert.alert('Error', 'Enter phone number and password');
//       return;
//     }
//     if (!/^[6-9]\d{9}$/.test(phone)) {
//       triggerShake();
//       Alert.alert('Error', 'Enter valid 10-digit phone number');
//       return;
//     }
//     if (pass.length < 6) {
//       triggerShake();
//       Alert.alert('Error', 'Password must be at least 6 characters');
//       return;
//     }
//     if (loginAttempts >= 5) {
//       Alert.alert('Blocked', 'Too many attempts. Try again later.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await customerAPI.login({ phoneNumber: phone, password: pass });
//       if (response.data?.success) {
//         const { customerId, token, name, email } = response.data;
//         if (!customerId) { Alert.alert('Error', 'Login failed'); return; }
//         if (token) await AsyncStorage.setItem('authToken', token);
//         await AsyncStorage.setItem('customerId', customerId.toString());
//         await AsyncStorage.setItem('userData', JSON.stringify({
//           customerId, name: name || '', email: email || '', phoneNumber: phone,
//         }));
//         setLoginAttempts(0);
//         Platform.OS === 'web'
//           ? navigation.navigate('CreateLoadRequest')
//           : navigation.replace('CreateLoadRequest');
//       } else {
//         setLoginAttempts(p => p + 1);
//         triggerShake();
//         Alert.alert('Login Failed', 'Invalid phone number or password');
//       }
//     } catch {
//       triggerShake();
//       Alert.alert('Error', 'User not found. Create a new customer account');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     /**
//      * FIX 1 — KeyboardAvoidingView
//      *   • iOS   → behavior="padding"  (pushes content up by keyboard height)
//      *   • Android → behavior="height" (shrinks the view height)
//      *   • keyboardVerticalOffset: iOS-only extra gap between keyboard top & content.
//      *     Set to 0 unless you have a header above this screen.
//      */
//     <KeyboardAvoidingView
//       style={S.flex1}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
//     >
//       {/**
//        * FIX 2 — ScrollView
//        *   • contentContainerStyle has flexGrow:1 so short content fills screen.
//        *   • keyboardShouldPersistTaps="handled" → tapping a button while
//        *     keyboard is open fires the button handler instead of dismissing.
//        *   • keyboardDismissMode="interactive" → drag down to dismiss (iOS).
//        */}
//       <ScrollView
//         style={S.flex1}
//         contentContainerStyle={S.scrollContent}
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//         bounces={false}
//         keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
//       >

//         {/* ── HERO ── */}
//         <View style={S.hero}>
//           <View style={S.heroOverlay} />
//           <View style={S.heroContent}>
//             <View style={S.logoBox}>
//               <Text style={S.logoEmoji}>🚛</Text>
//             </View>
//             <Text style={S.appName}>TRUCK BOOKING</Text>
//             <Text style={S.tagline}>Move Anything, Anywhere</Text>
//           </View>
//         </View>

//         {/* ── CARD ── */}
//         <Animated.View style={[
//           S.card,
//           { opacity: cardOp, transform: [{ translateY: cardY }] },
//         ]}>
//           <Text style={S.cardTitle}>Welcome Back!</Text>
//           <Text style={S.cardSubtitle}>Login to Continue</Text>

//           {/* ── Phone Field ── */}
//           <View style={S.fieldWrap}>
//             <View style={[S.inputRow, phoneFocused && S.inputRowFocused]}>
//               <View style={S.iconCircle}>
//                 <Text style={S.fieldIcon}>📞</Text>
//               </View>
//               <View style={S.prefixBox}>
//                 <Text style={S.prefix}>+91</Text>
//               </View>
//               <View style={S.dividerV} />
//               <TextInput
//                 style={S.input}
//                 placeholder="9876543210"
//                 placeholderTextColor="#BBBBBB"
//                 keyboardType="phone-pad"
//                 maxLength={10}
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//                 onFocus={() => setPhoneFocused(true)}
//                 onBlur={() => setPhoneFocused(false)}
//                 editable={!loading}
//                 returnKeyType="next"
//                 // FIX 3 — "next" key jumps focus to password field
//                 onSubmitEditing={() => passwordRef.current?.focus()}
//                 blurOnSubmit={false}
//               />
//             </View>
//           </View>

//           {/* ── Password Field ── */}
//           <View style={S.fieldWrap}>
//             <View style={[S.inputRow, passFocused && S.inputRowFocused]}>
//               <View style={S.iconCircle}>
//                 <Text style={S.fieldIcon}>🔒</Text>
//               </View>
//               <TextInput
//                 ref={passwordRef}
//                 style={[S.input, { marginLeft: 4 }]}
//                 placeholder="Password"
//                 placeholderTextColor="#BBBBBB"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={setPassword}
//                 onFocus={() => setPassFocused(true)}
//                 onBlur={() => setPassFocused(false)}
//                 editable={!loading}
//                 returnKeyType="done"
//                 onSubmitEditing={handleLogin}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(p => !p)}
//                 style={S.eyeBtn}
//                 hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//               >
//                 <EyeIcon visible={showPassword} />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* ── Forgot Password ── */}
//           <View style={S.forgotWrap}>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('ForgotPassword')}
//               hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
//             >
//               <Text style={S.forgotText}>Forgot Password?</Text>
//             </TouchableOpacity>
//           </View>

//           {/* ── Login Button ── */}
//           <Animated.View style={{
//             transform: [{ translateX: shakeX }, { scale: btnScale }],
//             marginTop: 8,
//           }}>
//             <Pressable
//               style={[S.loginBtn, loading && S.btnDisabled]}
//               onPress={handleLogin}
//               onPressIn={onPressIn}
//               onPressOut={onPressOut}
//               disabled={loading}
//             >
//               {loading
//                 ? <ActivityIndicator color={C.white} />
//                 : <Text style={S.loginBtnText}>LOGIN</Text>
//               }
//             </Pressable>
//           </Animated.View>

//           {/* ── Register ── */}
//           <View style={S.registerRow}>
//             <Text style={S.registerText}>Don't have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//               <Text style={S.registerLink}>Register</Text>
//             </TouchableOpacity>
//           </View>

//           {/* ── Need Help ── */}
//           <TouchableOpacity style={S.helpCard} activeOpacity={0.85}>
//             <View style={S.helpIconWrap}>
//               <Text style={S.helpIconEmoji}>🎧</Text>
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={S.helpTitle}>Need Help?</Text>
//               <Text style={S.helpSub}>Call 9566137117</Text>
//             </View>
//             <Text style={S.helpArrow}>›</Text>
//           </TouchableOpacity>

//         </Animated.View>

//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default LoginScreen;

// const S = StyleSheet.create({

//   flex1: { flex: 1, backgroundColor: C.primary },

//   // FIX 4 — flexGrow:1 + paddingBottom
//   // flexGrow:1  → short screens: card fills remaining space
//   // paddingBottom → long screens / keyboard open: extra scroll room at bottom
//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: 24,
//   },

//   // ── Hero ──────────────────────────────────────────────
//   hero: {
//     height: 240,
//     backgroundColor: '#e85e00',
//     justifyContent: 'flex-end',
//   },
//   heroOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(220, 90, 0, 0.35)',
//   },
//   heroContent: {
//     alignItems: 'center',
//     paddingBottom: 28,
//   },
//   logoBox: {
//     width: 64,
//     height: 64,
//     borderRadius: 18,
//     backgroundColor: 'rgba(255,255,255,0.22)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//     borderWidth: 1.5,
//     borderColor: 'rgba(255,255,255,0.4)',
//   },
//   logoEmoji: { fontSize: 30 },
//   appName: {
//     fontSize: 18,
//     fontWeight: '800',
//     color: C.white,
//     letterSpacing: 2.5,
//     marginBottom: 4,
//   },
//   tagline: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.85)',
//     letterSpacing: 0.3,
//   },

//   // ── Card ──────────────────────────────────────────────
//   card: {
//     backgroundColor: C.white,
//     borderTopLeftRadius: 28,
//     borderTopRightRadius: 28,
//     marginTop: -24,
//     paddingHorizontal: 24,
//     paddingTop: 28,
//     paddingBottom: 40,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.07,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   cardTitle: {
//     fontSize: 22,
//     fontWeight: '800',
//     color: C.text,
//     marginBottom: 3,
//   },
//   cardSubtitle: {
//     fontSize: 13,
//     color: C.textMuted,
//     marginBottom: 24,
//   },

//   // ── Fields ────────────────────────────────────────────
//   fieldWrap: { marginBottom: 14 },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: C.inputBg,
//     borderWidth: 1.5,
//     borderColor: C.border,
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 52,
//   },
//   inputRowFocused: {
//     borderColor: C.primary,
//     backgroundColor: '#FFF8F4',
//   },
//   iconCircle: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#FFF0E6',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 8,
//   },
//   fieldIcon:  { fontSize: 13 },
//   prefixBox:  { marginRight: 6 },
//   prefix: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: C.text,
//   },
//   dividerV: {
//     width: 1,
//     height: 22,
//     backgroundColor: C.border,
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 15,
//     color: C.text,
//     height: 52,
//   },
//   eyeBtn: { padding: 6 },

//   // ── Forgot ────────────────────────────────────────────
//   forgotWrap: {
//     alignItems: 'flex-end',
//     marginTop: -4,
//     marginBottom: 20,
//   },
//   forgotText: {
//     fontSize: 13,
//     color: C.primary,
//     fontWeight: '600',
//   },

//   // ── Button ────────────────────────────────────────────
//   loginBtn: {
//     height: 52,
//     backgroundColor: C.primary,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#FF6A00',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.35,
//     shadowRadius: 10,
//     elevation: 6,
//     marginBottom: 22,
//   },
//   btnDisabled: { opacity: 0.6 },
//   loginBtnText: {
//     color: C.white,
//     fontSize: 15,
//     fontWeight: '800',
//     letterSpacing: 1.5,
//   },

//   // ── Register ──────────────────────────────────────────
//   registerRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   registerText: { fontSize: 13, color: C.textMuted },
//   registerLink: {
//     fontSize: 13,
//     color: C.primary,
//     fontWeight: '700',
//   },

//   // ── Help Card ─────────────────────────────────────────
//   helpCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF4EC',
//     borderRadius: 14,
//     padding: 14,
//     gap: 12,
//     borderWidth: 1,
//     borderColor: '#FFD4A8',
//   },
//   helpIconWrap: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: C.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   helpIconEmoji: { fontSize: 18 },
//   helpTitle: { fontSize: 14, fontWeight: '700', color: '#111111' },
//   helpSub:   { fontSize: 13, color: C.primary, fontWeight: '600', marginTop: 1 },
//   helpArrow: { fontSize: 22, color: C.primary, fontWeight: '700', marginLeft: 'auto' },
// });


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useRef, useState } from 'react';

// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   Dimensions,
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
// import { customerAPI } from '../services/api';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// const C = {
//   primary:   '#FF6A00',
//   white:     '#FFFFFF',
//   bg:        '#FFFFFF',
//   text:      '#111111',
//   textMuted: '#888888',
//   border:    '#E0E0E0',
//   inputBg:   '#FAFAFA',
//   surface:   '#F5F5F5',
// };

// const EyeIcon = ({ visible }) => (
//   <Text style={{ fontSize: 16, color: visible ? C.primary : '#AAAAAA' }}>
//     {visible ? '👁️' : '🙈'}
//   </Text>
// );

// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber]     = useState('');
//   const [password, setPassword]           = useState('');
//   const [loading, setLoading]             = useState(false);
//   const [showPassword, setShowPassword]   = useState(false);
//   const [phoneFocused, setPhoneFocused]   = useState(false);
//   const [passFocused, setPassFocused]     = useState(false);
//   const [loginAttempts, setLoginAttempts] = useState(0);

//   const cardY    = useRef(new Animated.Value(40)).current;
//   const cardOp   = useRef(new Animated.Value(0)).current;
//   const shakeX   = useRef(new Animated.Value(0)).current;
//   const btnScale = useRef(new Animated.Value(1)).current;

//   const passwordRef = useRef(null);

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(cardY,  { toValue: 0, duration: 480, useNativeDriver: true }),
//       Animated.timing(cardOp, { toValue: 1, duration: 480, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   const triggerShake = () =>
//     Animated.sequence([
//       Animated.timing(shakeX, { toValue:  9, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue: -9, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue:  6, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue: -6, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue:  0, duration: 55, useNativeDriver: true }),
//     ]).start();

//   const onPressIn  = () => Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true }).start();
//   const onPressOut = () => Animated.spring(btnScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();

//   const handleLogin = async () => {
//     const phone = phoneNumber.trim();
//     const pass  = password.trim();

//     if (!phone || !pass) {
//       triggerShake();
//       Alert.alert('Error', 'Enter phone number and password');
//       return;
//     }
//     if (!/^[6-9]\d{9}$/.test(phone)) {
//       triggerShake();
//       Alert.alert('Error', 'Enter valid 10-digit phone number');
//       return;
//     }
//     if (pass.length < 6) {
//       triggerShake();
//       Alert.alert('Error', 'Password must be at least 6 characters');
//       return;
//     }
//     if (loginAttempts >= 5) {
//       Alert.alert('Blocked', 'Too many attempts. Try again later.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await customerAPI.login({ phoneNumber: phone, password: pass });
//       if (response.data?.success) {
//         const { customerId, token, name, email } = response.data;
//         if (!customerId) { Alert.alert('Error', 'Login failed'); return; }
//         if (token) await AsyncStorage.setItem('authToken', token);
//         await AsyncStorage.setItem('customerId', customerId.toString());
//         await AsyncStorage.setItem('userData', JSON.stringify({
//           customerId, name: name || '', email: email || '', phoneNumber: phone,
//         }));
//         setLoginAttempts(0);
//         Platform.OS === 'web'
//           ? navigation.navigate('CreateLoadRequest')
//           : navigation.replace('CreateLoadRequest');
//       } else {
//         setLoginAttempts(p => p + 1);
//         triggerShake();
//         Alert.alert('Login Failed', 'Invalid phone number or password');
//       }
//     } catch {
//       triggerShake();
//       Alert.alert('Error', 'User not found. Create a new customer account');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     /**
//      * FIX 1 — KeyboardAvoidingView
//      *   • iOS   → behavior="padding"  (pushes content up by keyboard height)
//      *   • Android → behavior="height" (shrinks the view height)
//      *   • keyboardVerticalOffset: iOS-only extra gap between keyboard top & content.
//      *     Set to 0 unless you have a header above this screen.
//      */
//     <KeyboardAvoidingView
//       style={S.flex1}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
//     >
//       {/**
//        * FIX 2 — ScrollView
//        *   • contentContainerStyle has flexGrow:1 so short content fills screen.
//        *   • keyboardShouldPersistTaps="handled" → tapping a button while
//        *     keyboard is open fires the button handler instead of dismissing.
//        *   • keyboardDismissMode="interactive" → drag down to dismiss (iOS).
//        */}
//       <ScrollView
//         style={S.flex1}
//         contentContainerStyle={S.scrollContent}
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//         bounces={false}
//         keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
//       >

//         {/* ── HERO ── */}
//         <View style={S.hero}>
//           <View style={S.heroOverlay} />
//           <View style={S.heroContent}>
//             <View style={S.logoBox}>
//               <Text style={S.logoEmoji}>🚛</Text>
//             </View>
//             <Text style={S.appName}>TRUCK BOOKING</Text>
//             <Text style={S.tagline}>Move Anything, Anywhere</Text>
//           </View>
//         </View>

//         {/* ── CARD ── */}
//         <Animated.View style={[
//           S.card,
//           { opacity: cardOp, transform: [{ translateY: cardY }] },
//         ]}>
//           <Text style={S.cardTitle}>Welcome Back!</Text>
//           <Text style={S.cardSubtitle}>Login to Continue</Text>

//           {/* ── Phone Field ── */}
//           <View style={S.fieldWrap}>
//             <View style={[S.inputRow, phoneFocused && S.inputRowFocused]}>
//               <View style={S.iconCircle}>
//                 <Text style={S.fieldIcon}>📞</Text>
//               </View>
//               <View style={S.prefixBox}>
//                 <Text style={S.prefix}>+91</Text>
//               </View>
//               <View style={S.dividerV} />
//               <TextInput
//                 style={S.input}
//                 placeholder="9876543210"
//                 placeholderTextColor="#BBBBBB"
//                 keyboardType="phone-pad"
//                 maxLength={10}
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//                 onFocus={() => setPhoneFocused(true)}
//                 onBlur={() => setPhoneFocused(false)}
//                 editable={!loading}
//                 returnKeyType="next"
//                 // FIX 3 — "next" key jumps focus to password field
//                 onSubmitEditing={() => passwordRef.current?.focus()}
//                 blurOnSubmit={false}
//               />
//             </View>
//           </View>

//           {/* ── Password Field ── */}
//           <View style={S.fieldWrap}>
//             <View style={[S.inputRow, passFocused && S.inputRowFocused]}>
//               <View style={S.iconCircle}>
//                 <Text style={S.fieldIcon}>🔒</Text>
//               </View>
//               <TextInput
//                 ref={passwordRef}
//                 style={[S.input, { marginLeft: 4 }]}
//                 placeholder="Password"
//                 placeholderTextColor="#BBBBBB"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={setPassword}
//                 onFocus={() => setPassFocused(true)}
//                 onBlur={() => setPassFocused(false)}
//                 editable={!loading}
//                 returnKeyType="done"
//                 onSubmitEditing={handleLogin}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(p => !p)}
//                 style={S.eyeBtn}
//                 hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//               >
//                 <EyeIcon visible={showPassword} />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* ── Forgot Password ── */}
//           <View style={S.forgotWrap}>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('ForgotPassword')}
//               hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
//             >
//               <Text style={S.forgotText}>Forgot Password?</Text>
//             </TouchableOpacity>
//           </View>

//           {/* ── Login Button ── */}
//           <Animated.View style={{
//             transform: [{ translateX: shakeX }, { scale: btnScale }],
//             marginTop: 8,
//           }}>
//             <Pressable
//               style={[S.loginBtn, loading && S.btnDisabled]}
//               onPress={handleLogin}
//               onPressIn={onPressIn}
//               onPressOut={onPressOut}
//               disabled={loading}
//             >
//               {loading
//                 ? <ActivityIndicator color={C.white} />
//                 : <Text style={S.loginBtnText}>LOGIN</Text>
//               }
//             </Pressable>
//           </Animated.View>

//           {/* ── Register ── */}
//           <View style={S.registerRow}>
//             <Text style={S.registerText}>Don't have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//               <Text style={S.registerLink}>Register</Text>
//             </TouchableOpacity>
//           </View>

//           {/* ── Need Help ── */}
//           <TouchableOpacity style={S.helpCard} activeOpacity={0.85}>
//             <View style={S.helpIconWrap}>
//               <Text style={S.helpIconEmoji}>🎧</Text>
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={S.helpTitle}>Need Help?</Text>
//               <Text style={S.helpSub}>Call 9566137117</Text>
//             </View>
//             <Text style={S.helpArrow}>›</Text>
//           </TouchableOpacity>

//         </Animated.View>

//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default LoginScreen;

// const S = StyleSheet.create({

//   flex1: { flex: 1, backgroundColor: C.primary },

//   // FIX 4 — flexGrow:1 + paddingBottom
//   // flexGrow:1  → short screens: card fills remaining space
//   // paddingBottom → long screens / keyboard open: extra scroll room at bottom
//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: 24,
//   },

//   // ── Hero ──────────────────────────────────────────────
//   hero: {
//     height: 160,
//     backgroundColor: '#e85e00',
//     justifyContent: 'flex-end',
//   },
//   heroOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(220, 90, 0, 0.35)',
//   },
//   heroContent: {
//     alignItems: 'center',
//     paddingBottom: 16,
//   },
//   logoBox: {
//     width: 48,
//     height: 48,
//     borderRadius: 13,
//     backgroundColor: 'rgba(255,255,255,0.22)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 7,
//     borderWidth: 1.5,
//     borderColor: 'rgba(255,255,255,0.4)',
//   },
//   logoEmoji: { fontSize: 22 },
//   appName: {
//     fontSize: 15,
//     fontWeight: '800',
//     color: C.white,
//     letterSpacing: 2.5,
//     marginBottom: 2,
//   },
//   tagline: {
//     fontSize: 11,
//     color: 'rgba(255,255,255,0.85)',
//     letterSpacing: 0.3,
//   },

//   // ── Card ──────────────────────────────────────────────
//   card: {
//     backgroundColor: C.white,
//     borderTopLeftRadius: 28,
//     borderTopRightRadius: 28,
//     marginTop: -28,
//     paddingHorizontal: 24,
//     paddingTop: 22,
//     paddingBottom: 40,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.07,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   cardTitle: {
//     fontSize: 22,
//     fontWeight: '800',
//     color: C.text,
//     marginBottom: 3,
//   },
//   cardSubtitle: {
//     fontSize: 13,
//     color: C.textMuted,
//     marginBottom: 24,
//   },

//   // ── Fields ────────────────────────────────────────────
//   fieldWrap: { marginBottom: 14 },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: C.inputBg,
//     borderWidth: 1.5,
//     borderColor: C.border,
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 52,
//   },
//   inputRowFocused: {
//     borderColor: C.primary,
//     backgroundColor: '#FFF8F4',
//   },
//   iconCircle: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#FFF0E6',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 8,
//   },
//   fieldIcon:  { fontSize: 13 },
//   prefixBox:  { marginRight: 6 },
//   prefix: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: C.text,
//   },
//   dividerV: {
//     width: 1,
//     height: 22,
//     backgroundColor: C.border,
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 15,
//     color: C.text,
//     height: 52,
//   },
//   eyeBtn: { padding: 6 },

//   // ── Forgot ────────────────────────────────────────────
//   forgotWrap: {
//     alignItems: 'flex-end',
//     marginTop: -4,
//     marginBottom: 20,
//   },
//   forgotText: {
//     fontSize: 13,
//     color: C.primary,
//     fontWeight: '600',
//   },

//   // ── Button ────────────────────────────────────────────
//   loginBtn: {
//     height: 52,
//     backgroundColor: C.primary,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#FF6A00',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.35,
//     shadowRadius: 10,
//     elevation: 6,
//     marginBottom: 22,
//   },
//   btnDisabled: { opacity: 0.6 },
//   loginBtnText: {
//     color: C.white,
//     fontSize: 15,
//     fontWeight: '800',
//     letterSpacing: 1.5,
//   },

//   // ── Register ──────────────────────────────────────────
//   registerRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   registerText: { fontSize: 13, color: C.textMuted },
//   registerLink: {
//     fontSize: 13,
//     color: C.primary,
//     fontWeight: '700',
//   },

//   // ── Help Card ─────────────────────────────────────────
//   helpCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF4EC',
//     borderRadius: 14,
//     padding: 14,
//     gap: 12,
//     borderWidth: 1,
//     borderColor: '#FFD4A8',
//   },
//   helpIconWrap: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: C.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   helpIconEmoji: { fontSize: 18 },
//   helpTitle: { fontSize: 14, fontWeight: '700', color: '#111111' },
//   helpSub:   { fontSize: 13, color: C.primary, fontWeight: '600', marginTop: 1 },
//   helpArrow: { fontSize: 22, color: C.primary, fontWeight: '700', marginLeft: 'auto' },
// });




// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useRef, useState } from 'react';

// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   Dimensions,
//   ImageBackground,
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
// import { customerAPI } from '../services/api';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// const C = {
//   primary:   '#FF6A00',
//   white:     '#FFFFFF',
//   bg:        '#FFFFFF',
//   text:      '#111111',
//   textMuted: '#888888',
//   border:    '#E0E0E0',
//   inputBg:   '#FAFAFA',
//   surface:   '#F5F5F5',
// };

// const EyeIcon = ({ visible }) => (
//   <Text style={{ fontSize: 16, color: visible ? C.primary : '#AAAAAA' }}>
//     {visible ? '👁️' : '🙈'}
//   </Text>
// );

// // // ── Trust strip data ──────────────────────────────────────
// // const TRUST_ITEMS = [
// //   { icon: '🚚', value: '500+',  label: 'Trucks' },
// //   { icon: '👨‍✈️', value: '1200+', label: 'Drivers' },
// //   { icon: '📦', value: '10K+',  label: 'Deliveries' },
// //   { icon: '⭐', value: '4.8',   label: 'Rating' },
// // ];

// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber]   = useState('');
//   const [password, setPassword]         = useState('');
//   const [loading, setLoading]           = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [phoneFocused, setPhoneFocused] = useState(false);
//   const [passFocused, setPassFocused]   = useState(false);
//   const [loginAttempts, setLoginAttempts] = useState(0);

//   // Animations
//   const cardY    = useRef(new Animated.Value(40)).current;
//   const cardOp   = useRef(new Animated.Value(0)).current;
//   const shakeX   = useRef(new Animated.Value(0)).current;
//   const btnScale = useRef(new Animated.Value(1)).current;
//   // Shimmer loop for LOGIN button
//   const shimmerX = useRef(new Animated.Value(-120)).current;

//   const passwordRef = useRef(null);

//   // ── Entry animation ──────────────────────────────────
//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(cardY,  { toValue: 0, duration: 480, useNativeDriver: true }),
//       Animated.timing(cardOp, { toValue: 1, duration: 480, useNativeDriver: true }),
//     ]).start();

//     // Shimmer loop on LOGIN button
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(shimmerX, {
//           toValue: 300,
//           duration: 1800,
//           useNativeDriver: true,
//         }),
//         Animated.delay(1200),
//         Animated.timing(shimmerX, {
//           toValue: -120,
//           duration: 0,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   }, []);

//   // ── Shake on error ────────────────────────────────────
//   const triggerShake = () =>
//     Animated.sequence([
//       Animated.timing(shakeX, { toValue:  9, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue: -9, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue:  6, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue: -6, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue:  0, duration: 55, useNativeDriver: true }),
//     ]).start();

//   const onPressIn  = () =>
//     Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true }).start();
//   const onPressOut = () =>
//     Animated.spring(btnScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();

//   // ── Login handler ─────────────────────────────────────
//   const handleLogin = async () => {
//     const phone = phoneNumber.trim();
//     const pass  = password.trim();

//     if (!phone || !pass) {
//       triggerShake();
//       Alert.alert('Error', 'Enter phone number and password');
//       return;
//     }
//     if (!/^[6-9]\d{9}$/.test(phone)) {
//       triggerShake();
//       Alert.alert('Error', 'Enter valid 10-digit phone number');
//       return;
//     }
//     if (pass.length < 6) {
//       triggerShake();
//       Alert.alert('Error', 'Password must be at least 6 characters');
//       return;
//     }
//     if (loginAttempts >= 5) {
//       Alert.alert('Blocked', 'Too many attempts. Try again later.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await customerAPI.login({ phoneNumber: phone, password: pass });
//       if (response.data?.success) {
//         const { customerId, token, name, email } = response.data;
//         if (!customerId) { Alert.alert('Error', 'Login failed'); return; }
//         if (token) await AsyncStorage.setItem('authToken', token);
//         await AsyncStorage.setItem('customerId', customerId.toString());
//         await AsyncStorage.setItem('userData', JSON.stringify({
//           customerId, name: name || '', email: email || '', phoneNumber: phone,
//         }));
//         setLoginAttempts(0);
//         Platform.OS === 'web'
//           ? navigation.navigate('CreateLoadRequest')
//           : navigation.replace('CreateLoadRequest');
//       } else {
//         setLoginAttempts(p => p + 1);
//         triggerShake();
//         Alert.alert('Login Failed', 'Invalid phone number or password');
//       }
//     } catch {
//       triggerShake();
//       Alert.alert('Error', 'User not found. Create a new customer account');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     /*
//      * KeyboardAvoidingView — outermost wrapper
//      *   iOS   → 'padding'  : pushes content up by keyboard height
//      *   Android → 'height' : shrinks view to avoid keyboard
//      *
//      * KEYBOARD OVERLAP FIX:
//      *   • ScrollView with keyboardShouldPersistTaps="handled" ensures
//      *     button taps fire even while keyboard is open.
//      *   • automaticallyAdjustKeyboardInsets (iOS 15+) handles safe-area.
//      *   • ScrollView scrolls the fields into view when focused.
//      */
//     <KeyboardAvoidingView
//       style={S.flex1}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
//     >
//       <ScrollView
//         style={S.flex1}
//         contentContainerStyle={S.scrollContent}
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//         bounces={false}
//         keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
//         // iOS 15+ — automatically insets scroll area above keyboard
//         automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
//       >

//         {/* ── HERO — ImageBackground ── */}
//         <ImageBackground
//           source={require('../assets/images/truck-hero.png')}
//           style={S.hero}
//           resizeMode="cover"
//           // fade in the image gracefully
//           imageStyle={{ opacity: 0.92 }}
//         >
//           {/* dark gradient so text is always readable */}
//           <View style={S.heroOverlay} />

//           {/* Brand tag — top left */}
//           <View style={S.heroTagRow}>
//             <View style={S.heroTag}>
//               <Text style={S.heroTagText}></Text>
//             </View>
//           </View>

//           {/* Main headline */}
//           <View style={S.heroContent}>
//             <Text style={S.heroTitle}>
//               Deliver <Text style={S.heroTitleAccent}>Faster.</Text>{'\n'}Earn Better.
//             </Text>
//             <Text style={S.heroTagline}></Text>
//           </View>
//         </ImageBackground>

//         {/* ── CARD ── */}
//         <Animated.View style={[
//           S.card,
//           { opacity: cardOp, transform: [{ translateY: cardY }] },
//         ]}>
//           <Text style={S.cardTitle}>Welcome Back!</Text>
//           <Text style={S.cardSubtitle}>Login to continue</Text>

//           {/* ── Phone Field ── */}
//           <View style={S.fieldWrap}>
//             <View style={[S.inputRow, phoneFocused && S.inputRowFocused]}>
//               <View style={S.iconCircle}>
//                 <Text style={S.fieldIcon}>📱</Text>
//               </View>
//               <View style={S.prefixBox}>
//                 <Text style={S.prefix}>+91</Text>
//               </View>
//               <View style={S.dividerV} />
//               <TextInput
//                 style={S.input}
//                 placeholder="9876543210"
//                 placeholderTextColor="#BBBBBB"
//                 keyboardType="phone-pad"
//                 maxLength={10}
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//                 onFocus={() => setPhoneFocused(true)}
//                 onBlur={() => setPhoneFocused(false)}
//                 editable={!loading}
//                 returnKeyType="next"
//                 onSubmitEditing={() => passwordRef.current?.focus()}
//                 blurOnSubmit={false}
//               />
//             </View>
//           </View>

//           {/* ── Password Field ── */}
//           <View style={S.fieldWrap}>
//             <View style={[S.inputRow, passFocused && S.inputRowFocused]}>
//               <View style={S.iconCircle}>
//                 <Text style={S.fieldIcon}>🔒</Text>
//               </View>
//               <TextInput
//                 ref={passwordRef}
//                 style={[S.input, { marginLeft: 4 }]}
//                 placeholder="Password"
//                 placeholderTextColor="#BBBBBB"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={setPassword}
//                 onFocus={() => setPassFocused(true)}
//                 onBlur={() => setPassFocused(false)}
//                 editable={!loading}
//                 returnKeyType="done"
//                 onSubmitEditing={handleLogin}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(p => !p)}
//                 style={S.eyeBtn}
//                 hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//               >
//                 <EyeIcon visible={showPassword} />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* ── Forgot Password ── */}
//           <View style={S.forgotWrap}>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('ForgotPassword')}
//               hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
//             >
//               <Text style={S.forgotText}>Forgot Password?</Text>
//             </TouchableOpacity>
//           </View>

//           {/* ── Login Button (shake + scale + shimmer) ── */}
//           <Animated.View style={{
//             transform: [{ translateX: shakeX }, { scale: btnScale }],
//             marginTop: 8,
//             marginBottom: 22,
//           }}>
//             <Pressable
//               style={[S.loginBtn, loading && S.btnDisabled]}
//               onPress={handleLogin}
//               onPressIn={onPressIn}
//               onPressOut={onPressOut}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color={C.white} />
//               ) : (
//                 <>
//                   <Text style={S.loginBtnText}>LOGIN</Text>
//                   {/* shimmer sweep */}
//                   <Animated.View
//                     style={[S.shimmer, { transform: [{ translateX: shimmerX }] }]}
//                     pointerEvents="none"
//                   />
//                 </>
//               )}
//             </Pressable>
//           </Animated.View>

//           {/* ── Register ── */}
//           <View style={S.registerRow}>
//             <Text style={S.registerText}>Don't have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//               <Text style={S.registerLink}>Register</Text>
//             </TouchableOpacity>
//           </View>

//           {/* ── Divider ── */}
//           <View style={S.dividerRow}>
//             <View style={S.dividerLine} />
//             <Text style={S.dividerLabel}>TRUSTED BY</Text>
//             <View style={S.dividerLine} />
//           </View>

//           {/* ── Trust Strip ── */}
//           {/* <View style={S.trustStrip}>
//             {TRUST_ITEMS.map((item, i) => (
//               <View key={i} style={S.trustItem}>
//                 <Text style={S.trustIcon}>{item.icon}</Text>
//                 <Text style={S.trustValue}>{item.value}</Text>
//                 <Text style={S.trustLabel}>{item.label}</Text>
//               </View>
//             ))}
//           </View> */}

//           {/* ── Need Help ── */}
//           <TouchableOpacity style={S.helpCard} activeOpacity={0.85}>
//             <View style={S.helpIconWrap}>
//               <Text style={S.helpIconEmoji}>🎧</Text>
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={S.helpTitle}>Need Help?</Text>
//               <Text style={S.helpSub}>Call 9566137117</Text>
//             </View>
//             <Text style={S.helpArrow}>›</Text>
//           </TouchableOpacity>

//         </Animated.View>

//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default LoginScreen;

// // ─────────────────────────────────────────────────────────
// //  STYLES
// // ─────────────────────────────────────────────────────────
// const S = StyleSheet.create({

//   flex1: { flex: 1, backgroundColor: C.white }, // ✅ C.primary → C.white,

//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: 32,          // extra room when keyboard is open
//   },

//   // ── Hero ─────────────────────────────────────────────
//   hero: {
//     height: 240,                // taller for the truck image
//     justifyContent: 'flex-end',
//     backgroundColor: '#1a0a00', // fallback while image loads
//   },
//   heroOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     // gradient: light on top → dark at bottom so text pops
//     backgroundColor: 'transparent',
//     background: undefined,      // RN doesn't support CSS gradient; use below approach
//     // Use two layers for gradient effect:
//     // top half: semi-transparent orange tint
//     // bottom half: darker for text contrast
//   },
//   // Note: For true gradient overlay use expo-linear-gradient:
//   //   <LinearGradient colors={['rgba(255,106,0,0.3)','rgba(150,50,0,0.82)']}
//   //     style={StyleSheet.absoluteFill} />
//   // Replace <View style={S.heroOverlay}/> with the LinearGradient above.

//   heroTagRow: {
//     position: 'absolute',
//     top: 14,
//     left: 16,
//     zIndex: 2,
//   },
//   heroTag: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.4)',
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//   },
//   heroTagText: {
//     fontSize: 11,
//     fontWeight: '700',
//     color: C.white,
//     letterSpacing: 0.5,
//   },
//   heroContent: {
//     paddingHorizontal: 18,
//     paddingBottom: 28,
//     zIndex: 2,
//   },
//   heroTitle: {
//     fontSize: 26,
//     fontWeight: '900',
//     color: C.white,
//     lineHeight: 31,
//     textShadowColor: 'rgba(0,0,0,0.3)',
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 6,
//   },
//   heroTitleAccent: {
//     color: '#FFE0B2',
//   },
//   heroTagline: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.88)',
//     marginTop: 4,
//     fontStyle: 'italic',
//   },

//   // ── Card ──────────────────────────────────────────────
//   card: {
//     backgroundColor: C.white,
//     borderTopLeftRadius: 28,
//     borderTopRightRadius: 28,
//     marginTop: -28,
//     paddingHorizontal: 22,
//     paddingTop: 22,
//     paddingBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.07,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   cardTitle: {
//     fontSize: 22,
//     fontWeight: '800',
//     color: C.text,
//     marginBottom: 3,
//   },
//   cardSubtitle: {
//     fontSize: 13,
//     color: C.textMuted,
//     marginBottom: 22,
//   },

//   // ── Fields ────────────────────────────────────────────
//   fieldWrap: { marginBottom: 12 },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: C.inputBg,
//     borderWidth: 1.5,
//     borderColor: C.border,
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 52,
//   },
//   inputRowFocused: {
//     borderColor: C.primary,
//     backgroundColor: '#FFF8F4',
//   },
//   iconCircle: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#FFF0E6',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 8,
//   },
//   fieldIcon:  { fontSize: 13 },
//   prefixBox:  { marginRight: 6 },
//   prefix: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: C.text,
//   },
//   dividerV: {
//     width: 1,
//     height: 22,
//     backgroundColor: C.border,
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 15,
//     color: C.text,
//     height: 52,
//   },
//   eyeBtn: { padding: 6 },

//   // ── Forgot ────────────────────────────────────────────
//   forgotWrap: {
//     alignItems: 'flex-end',
//     marginTop: 2,
//     marginBottom: 18,
//   },
//   forgotText: {
//     fontSize: 13,
//     color: C.primary,
//     fontWeight: '600',
//   },

//   // ── Login Button ──────────────────────────────────────
//   loginBtn: {
//     height: 52,
//     backgroundColor: C.primary,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',         // clips shimmer inside rounded corners
//     shadowColor: '#FF6A00',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 10,
//     elevation: 6,
//   },
//   btnDisabled: { opacity: 0.6 },
//   loginBtnText: {
//     color: C.white,
//     fontSize: 15,
//     fontWeight: '800',
//     letterSpacing: 1.5,
//   },
//   // shimmer overlay inside the button
//   shimmer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: 80,
//     height: '100%',
//     backgroundColor: 'rgba(255,255,255,0.18)',
//     transform: [{ skewX: '-20deg' }],
//   },

//   // ── Register ──────────────────────────────────────────
//   registerRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 18,
//   },
//   registerText: { fontSize: 13, color: C.textMuted },
//   registerLink: {
//     fontSize: 13,
//     color: C.primary,
//     fontWeight: '700',
//     textDecorationLine: 'underline',
//   },

//   // ── Divider ───────────────────────────────────────────
//   dividerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 14,
//   },
//   dividerLine: { flex: 1, height: 1, backgroundColor: '#ECECEC' },
//   dividerLabel: {
//     fontSize: 10,
//     color: '#BBBBBB',
//     fontWeight: '600',
//     letterSpacing: 0.5,
//   },

//   // ── Trust Strip ───────────────────────────────────────
//   trustStrip: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#FFF8F3',
//     borderRadius: 14,
//     paddingVertical: 12,
//     paddingHorizontal: 6,
//     borderWidth: 1,
//     borderColor: '#FFE8D5',
//     marginBottom: 16,
//   },
//   trustItem: { alignItems: 'center', gap: 2 },
//   trustIcon:  { fontSize: 18 },
//   trustValue: { fontSize: 14, fontWeight: '800', color: C.primary },
//   trustLabel: { fontSize: 9, color: C.textMuted, textAlign: 'center' },

//   // ── Help Card ─────────────────────────────────────────
//   helpCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF4EC',
//     borderRadius: 14,
//     padding: 14,
//     gap: 12,
//     borderWidth: 1,
//     borderColor: '#FFD4A8',
//   },
//   helpIconWrap: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: C.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   helpIconEmoji: { fontSize: 18 },
//   helpTitle: { fontSize: 14, fontWeight: '700', color: '#111111' },
//   helpSub:   { fontSize: 13, color: C.primary, fontWeight: '600', marginTop: 1 },
//   helpArrow: { fontSize: 22, color: C.primary, fontWeight: '700', marginLeft: 'auto' },
// });

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   Dimensions,
//   ImageBackground,
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
// import { customerAPI } from '../services/api';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// const C = {
//   primary:   '#FF6A00',
//   white:     '#FFFFFF',
//   bg:        '#FFFFFF',
//   text:      '#111111',
//   textMuted: '#888888',
//   border:    '#E0E0E0',
//   inputBg:   '#FAFAFA',
//   surface:   '#F5F5F5',
// };

// // ── All UI strings ────────────────────────────────────────
// const STRINGS = {
//   en: {
//     heroTitle:       'Ship ',
//     heroAccent:      'Anything.',
//     heroTitle2:      '\nAnywhere.',
//     cardTitle:       'Welcome Back!',
//     cardSubtitle:    'Login to continue',
//     phonePlaceholder:'9876543210',
//     passPlaceholder: 'Password',
//     forgotPassword:  'Forgot Password?',
//     login:           'LOGIN',
//     noAccount:       "Don't have an account? ",
//     register:        'Register',
//     trustedBy:       'TRUSTED BY',
//     needHelp:        'Need Help?',
//     helpSub:         'Call 9566137117',
//     errEmpty:        'Enter phone number and password',
//     errPhone:        'Enter valid 10-digit phone number',
//     errPass:         'Password must be at least 6 characters',
//     errBlocked:      'Too many attempts. Try again later.',
//     errLogin:        'Invalid phone number or password',
//     errNotFound:     'User not found. Create a new customer account',
//     errGeneral:      'Login failed',
//     loginFailed:     'Login Failed',
//     error:           'Error',
//     blocked:         'Blocked',
//   },
//   ta: {
//     heroTitle:       'எதையும் ',
//     heroAccent:      'அனுப்பு.',
//     heroTitle2:      '\nஎங்கும் சேர்க்கும்.',
//     cardTitle:       'மீண்டும் வருக!',
//     cardSubtitle:    'தொடர உள்நுழையவும்',
//     phonePlaceholder:'9876543210',
//     passPlaceholder: 'கடவுச்சொல்',
//     forgotPassword:  'கடவுச்சொல் மறந்தீர்களா?',
//     login:           'உள்நுழை',
//     noAccount:       'கணக்கு இல்லையா? ',
//     register:        'பதிவு செய்யுங்கள்',
//     trustedBy:       'நம்பகமான சேவை',
//     needHelp:        'உதவி வேணுமா?',
//     helpSub:         'அழைக்கவும்: 9566137117',
//     errEmpty:        'தொலைபேசி எண் மற்றும் கடவுச்சொல் உள்ளிடவும்',
//     errPhone:        'சரியான 10 இலக்க தொலைபேசி எண் உள்ளிடவும்',
//     errPass:         'கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்',
//     errBlocked:      'பல முயற்சிகள். சிறிது நேரம் கழித்து முயற்சிக்கவும்.',
//     errLogin:        'தொலைபேசி எண் அல்லது கடவுச்சொல் தவறானது',
//     errNotFound:     'பயனர் இல்லை. புதிய கணக்கு உருவாக்கவும்',
//     errGeneral:      'உள்நுழைவு தோல்வி',
//     loginFailed:     'உள்நுழைவு தோல்வியடைந்தது',
//     error:           'பிழை',
//     blocked:         'தடுக்கப்பட்டது',
//   },
// };

// const EyeIcon = ({ visible }) => (
//   <Text style={{ fontSize: 16, color: visible ? C.primary : '#AAAAAA' }}>
//     {visible ? '👁️' : '🙈'}
//   </Text>
// );

// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber]   = useState('');
//   const [password, setPassword]         = useState('');
//   const [loading, setLoading]           = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [phoneFocused, setPhoneFocused] = useState(false);
//   const [passFocused, setPassFocused]   = useState(false);
//   const [loginAttempts, setLoginAttempts] = useState(0);
//   const [lang, setLang]                 = useState('en'); // 'en' | 'ta'

//   const t = STRINGS[lang];

//   // Animations
//   const cardY    = useRef(new Animated.Value(40)).current;
//   const cardOp   = useRef(new Animated.Value(0)).current;
//   const shakeX   = useRef(new Animated.Value(0)).current;
//   const btnScale = useRef(new Animated.Value(1)).current;
//   const shimmerX = useRef(new Animated.Value(-120)).current;

//   const passwordRef = useRef(null);

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(cardY,  { toValue: 0, duration: 480, useNativeDriver: true }),
//       Animated.timing(cardOp, { toValue: 1, duration: 480, useNativeDriver: true }),
//     ]).start();

//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(shimmerX, { toValue: 300, duration: 1800, useNativeDriver: true }),
//         Animated.delay(1200),
//         Animated.timing(shimmerX, { toValue: -120, duration: 0, useNativeDriver: true }),
//       ])
//     ).start();
//   }, []);

//   const triggerShake = () =>
//     Animated.sequence([
//       Animated.timing(shakeX, { toValue:  9, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue: -9, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue:  6, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue: -6, duration: 55, useNativeDriver: true }),
//       Animated.timing(shakeX, { toValue:  0, duration: 55, useNativeDriver: true }),
//     ]).start();

//   const onPressIn  = () =>
//     Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true }).start();
//   const onPressOut = () =>
//     Animated.spring(btnScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();

//   const toggleLang = () => setLang(l => (l === 'en' ? 'ta' : 'en'));

//   const handleLogin = async () => {
//     const phone = phoneNumber.trim();
//     const pass  = password.trim();

//     if (!phone || !pass) {
//       triggerShake();
//       Alert.alert(t.error, t.errEmpty);
//       return;
//     }
//     if (!/^[6-9]\d{9}$/.test(phone)) {
//       triggerShake();
//       Alert.alert(t.error, t.errPhone);
//       return;
//     }
//     if (pass.length < 6) {
//       triggerShake();
//       Alert.alert(t.error, t.errPass);
//       return;
//     }
//     if (loginAttempts >= 5) {
//       Alert.alert(t.blocked, t.errBlocked);
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await customerAPI.login({ phoneNumber: phone, password: pass });
//       if (response.data?.success) {
//         const { customerId, token, name, email } = response.data;
//         if (!customerId) { Alert.alert(t.error, t.errGeneral); return; }
//         if (token) await AsyncStorage.setItem('authToken', token);
//         await AsyncStorage.setItem('customerId', customerId.toString());
//         await AsyncStorage.setItem('userData', JSON.stringify({
//           customerId, name: name || '', email: email || '', phoneNumber: phone,
//         }));
//         setLoginAttempts(0);
//         Platform.OS === 'web'
//           ? navigation.navigate('CreateLoadRequest')
//           : navigation.replace('CreateLoadRequest');
//       } else {
//         setLoginAttempts(p => p + 1);
//         triggerShake();
//         Alert.alert(t.loginFailed, t.errLogin);
//       }
//     } catch {
//       triggerShake();
//       Alert.alert(t.error, t.errNotFound);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={S.flex1}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
//     >
//       <ScrollView
//         style={S.flex1}
//         contentContainerStyle={S.scrollContent}
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//         bounces={false}
//         keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
//         automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
//       >

//         {/* ── HERO ── */}
//         <ImageBackground
//           source={require('../assets/images/truck-hero.png')}
//           style={S.hero}
//           resizeMode="cover"
//           imageStyle={{ opacity: 0.92 }}
//         >
//           <View style={S.heroOverlay} />

//           {/* Brand tag — top left */}
//           <View style={S.heroTagRow}>
//             <View style={S.heroTag}>
//               <Text style={S.heroTagText}></Text>
//             </View>
//           </View>

//           {/* Main headline */}
//           <View style={S.heroContent}>
//             <Text style={S.heroTitle}>
//               {t.heroTitle}<Text style={S.heroTitleAccent}>{t.heroAccent}</Text>{t.heroTitle2}
//             </Text>
//             <Text style={S.heroTagline}></Text>
//           </View>
//         </ImageBackground>

//         {/* ── CARD ── */}
//         <Animated.View style={[
//           S.card,
//           { opacity: cardOp, transform: [{ translateY: cardY }] },
//         ]}>
//           {/* ── Card top row: title + lang toggle ── */}
//           <View style={S.cardTopRow}>
//             <View>
//               <Text style={S.cardTitle}>{t.cardTitle}</Text>
//               <Text style={S.cardSubtitle}>{t.cardSubtitle}</Text>
//             </View>
//             <TouchableOpacity style={S.langToggle} onPress={toggleLang} activeOpacity={0.8}>
//               <Text style={[S.langOption, lang === 'en' && S.langActive]}>EN</Text>
//               <View style={S.langDivider} />
//               <Text style={[S.langOption, lang === 'ta' && S.langActive]}>த</Text>
//             </TouchableOpacity>
//           </View>

//           {/* ── Phone Field ── */}
//           <View style={S.fieldWrap}>
//             <View style={[S.inputRow, phoneFocused && S.inputRowFocused]}>
//               <View style={S.iconCircle}>
//                 <Text style={S.fieldIcon}>📱</Text>
//               </View>
//               <View style={S.prefixBox}>
//                 <Text style={S.prefix}>+91</Text>
//               </View>
//               <View style={S.dividerV} />
//               <TextInput
//                 style={S.input}
//                 placeholder={t.phonePlaceholder}
//                 placeholderTextColor="#BBBBBB"
//                 keyboardType="phone-pad"
//                 maxLength={10}
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//                 onFocus={() => setPhoneFocused(true)}
//                 onBlur={() => setPhoneFocused(false)}
//                 editable={!loading}
//                 returnKeyType="next"
//                 onSubmitEditing={() => passwordRef.current?.focus()}
//                 blurOnSubmit={false}
//               />
//             </View>
//           </View>

//           {/* ── Password Field ── */}
//           <View style={S.fieldWrap}>
//             <View style={[S.inputRow, passFocused && S.inputRowFocused]}>
//               <View style={S.iconCircle}>
//                 <Text style={S.fieldIcon}>🔒</Text>
//               </View>
//               <TextInput
//                 ref={passwordRef}
//                 style={[S.input, { marginLeft: 4 }]}
//                 placeholder={t.passPlaceholder}
//                 placeholderTextColor="#BBBBBB"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={setPassword}
//                 onFocus={() => setPassFocused(true)}
//                 onBlur={() => setPassFocused(false)}
//                 editable={!loading}
//                 returnKeyType="done"
//                 onSubmitEditing={handleLogin}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(p => !p)}
//                 style={S.eyeBtn}
//                 hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//               >
//                 <EyeIcon visible={showPassword} />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* ── Forgot Password ── */}
//           <View style={S.forgotWrap}>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('ForgotPassword')}
//               hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
//             >
//               <Text style={S.forgotText}>{t.forgotPassword}</Text>
//             </TouchableOpacity>
//           </View>

//           {/* ── Login Button ── */}
//           <Animated.View style={{
//             transform: [{ translateX: shakeX }, { scale: btnScale }],
//             marginTop: 8,
//             marginBottom: 22,
//           }}>
//             <Pressable
//               style={[S.loginBtn, loading && S.btnDisabled]}
//               onPress={handleLogin}
//               onPressIn={onPressIn}
//               onPressOut={onPressOut}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color={C.white} />
//               ) : (
//                 <>
//                   <Text style={S.loginBtnText}>{t.login}</Text>
//                   <Animated.View
//                     style={[S.shimmer, { transform: [{ translateX: shimmerX }] }]}
//                     pointerEvents="none"
//                   />
//                 </>
//               )}
//             </Pressable>
//           </Animated.View>

//           {/* ── Register ── */}
//           <View style={S.registerRow}>
//             <Text style={S.registerText}>{t.noAccount}</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//               <Text style={S.registerLink}>{t.register}</Text>
//             </TouchableOpacity>
//           </View>

//           {/* ── Divider ── */}
//           <View style={S.dividerRow}>
//             <View style={S.dividerLine} />
//             <Text style={S.dividerLabel}>{t.trustedBy}</Text>
//             <View style={S.dividerLine} />
//           </View>

//           {/* ── Need Help ── */}
//           <TouchableOpacity style={S.helpCard} activeOpacity={0.85}>
//             <View style={S.helpIconWrap}>
//               <Text style={S.helpIconEmoji}>🎧</Text>
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={S.helpTitle}>{t.needHelp}</Text>
//               <Text style={S.helpSub}>{t.helpSub}</Text>
//             </View>
//             <Text style={S.helpArrow}>›</Text>
//           </TouchableOpacity>

//         </Animated.View>

//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default LoginScreen;

// const S = StyleSheet.create({

//   flex1: { flex: 1, backgroundColor: C.white },

//   scrollContent: {
//     flexGrow: 1,
//   },

//   // ── Hero ─────────────────────────────────────────────
//   hero: {
//     height: 240,
//     justifyContent: 'flex-end',
//     backgroundColor: '#1a0a00',
//   },
//   heroOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'transparent',
//   },
//   heroTagRow: {
//     position: 'absolute',
//     top: 14,
//     left: 16,
//     zIndex: 2,
//   },
//   heroTag: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.4)',
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//   },
//   heroTagText: {
//     fontSize: 11,
//     fontWeight: '700',
//     color: C.white,
//     letterSpacing: 0.5,
//   },

//   // Language Toggle — inside card top row
//   langToggle: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1.5,
//     borderColor: '#E0E0E0',
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: C.white,
//     alignSelf: 'flex-start',
//   },
//   langOption: {
//     paddingHorizontal: 12,
//     paddingVertical: 7,
//     fontSize: 12,
//     fontWeight: '800',
//     color: '#AAAAAA',
//   },
//   langActive: {
//     color: C.white,
//     backgroundColor: C.primary,
//   },
//   langDivider: {
//     width: 1,
//     height: '100%',
//     backgroundColor: '#E0E0E0',
//   },

//   heroContent: {
//     paddingHorizontal: 18,
//     paddingBottom: 28,
//     zIndex: 2,
//   },
//   heroTitle: {
//     fontSize: 26,
//     fontWeight: '900',
//     color: C.white,
//     lineHeight: 31,
//     textShadowColor: 'rgba(0,0,0,0.3)',
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 6,
//   },
//   heroTitleAccent: {
//     color: '#FFE0B2',
//   },
//   heroTagline: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.88)',
//     marginTop: 4,
//     fontStyle: 'italic',
//   },

//   // ── Card ──────────────────────────────────────────────
//   card: {
//     backgroundColor: C.white,
//     borderTopLeftRadius: 28,
//     borderTopRightRadius: 28,
//     marginTop: -28,
//     paddingHorizontal: 22,
//     paddingTop: 22,
//     paddingBottom: 40,
//     flexGrow: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.07,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   cardTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 22,
//   },
//   cardTitle: {
//     fontSize: 22,
//     fontWeight: '800',
//     color: C.text,
//     marginBottom: 3,
//   },
//   cardSubtitle: {
//     fontSize: 13,
//     color: C.textMuted,
//   },

//   // ── Fields ────────────────────────────────────────────
//   fieldWrap: { marginBottom: 12 },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: C.inputBg,
//     borderWidth: 1.5,
//     borderColor: C.border,
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 52,
//   },
//   inputRowFocused: {
//     borderColor: C.primary,
//     backgroundColor: '#FFF8F4',
//   },
//   iconCircle: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#FFF0E6',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 8,
//   },
//   fieldIcon:  { fontSize: 13 },
//   prefixBox:  { marginRight: 6 },
//   prefix: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: C.text,
//   },
//   dividerV: {
//     width: 1,
//     height: 22,
//     backgroundColor: C.border,
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 15,
//     color: C.text,
//     height: 52,
//   },
//   eyeBtn: { padding: 6 },

//   // ── Forgot ────────────────────────────────────────────
//   forgotWrap: {
//     alignItems: 'flex-end',
//     marginTop: 2,
//     marginBottom: 18,
//   },
//   forgotText: {
//     fontSize: 13,
//     color: C.primary,
//     fontWeight: '600',
//   },

//   // ── Login Button ──────────────────────────────────────
//   loginBtn: {
//     height: 52,
//     backgroundColor: C.primary,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',
//     shadowColor: '#FF6A00',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 10,
//     elevation: 6,
//   },
//   btnDisabled: { opacity: 0.6 },
//   loginBtnText: {
//     color: C.white,
//     fontSize: 15,
//     fontWeight: '800',
//     letterSpacing: 1.5,
//   },
//   shimmer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: 80,
//     height: '100%',
//     backgroundColor: 'rgba(255,255,255,0.18)',
//     transform: [{ skewX: '-20deg' }],
//   },

//   // ── Register ──────────────────────────────────────────
//   registerRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 18,
//   },
//   registerText: { fontSize: 13, color: C.textMuted },
//   registerLink: {
//     fontSize: 13,
//     color: C.primary,
//     fontWeight: '700',
//     textDecorationLine: 'underline',
//   },

//   // ── Divider ───────────────────────────────────────────
//   dividerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 14,
//   },
//   dividerLine: { flex: 1, height: 1, backgroundColor: '#ECECEC' },
//   dividerLabel: {
//     fontSize: 10,
//     color: '#BBBBBB',
//     fontWeight: '600',
//     letterSpacing: 0.5,
//   },

//   // ── Trust Strip ───────────────────────────────────────
//   trustStrip: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#FFF8F3',
//     borderRadius: 14,
//     paddingVertical: 12,
//     paddingHorizontal: 6,
//     borderWidth: 1,
//     borderColor: '#FFE8D5',
//     marginBottom: 16,
//   },
//   trustItem: { alignItems: 'center', gap: 2 },
//   trustIcon:  { fontSize: 18 },
//   trustValue: { fontSize: 14, fontWeight: '800', color: C.primary },
//   trustLabel: { fontSize: 9, color: C.textMuted, textAlign: 'center' },

//   // ── Help Card ─────────────────────────────────────────
//   helpCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF4EC',
//     borderRadius: 14,
//     padding: 14,
//     gap: 12,
//     borderWidth: 1,
//     borderColor: '#FFD4A8',
//   },
//   helpIconWrap: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: C.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   helpIconEmoji: { fontSize: 18 },
//   helpTitle: { fontSize: 14, fontWeight: '700', color: '#111111' },
//   helpSub:   { fontSize: 13, color: C.primary, fontWeight: '600', marginTop: 1 },
//   helpArrow: { fontSize: 22, color: C.primary, fontWeight: '700', marginLeft: 'auto' },
// });



import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  ImageBackground,
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
import { customerAPI } from '../services/api';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const C = {
  primary:   '#FF6A00',
  white:     '#FFFFFF',
  bg:        '#FFFFFF',
  text:      '#111111',
  textMuted: '#888888',
  border:    '#E0E0E0',
  inputBg:   '#FAFAFA',
  surface:   '#F5F5F5',
};

// ── All UI strings ────────────────────────────────────────
const STRINGS = {
  en: {
    heroTitle:        'Ship ',
    heroAccent:       'Anything.',
    heroTitle2:       '\nAnywhere.',
    // ── CHANGE 3: Quote text in hero image ──
    heroQuote:        '"Fast. Reliable. Delivered."',
    cardTitle:        'Welcome Back!',
    cardSubtitle:     'Login to continue your journey',
    phonePlaceholder: '9876543210',
    passPlaceholder:  'Password',
    forgotPassword:   'Forgot Password?',
    rememberMe:       'Remember Me',
    login:            'LOGIN',
    newhere:          'New here?',
    noAccount:        "Create an Account ",
    register:         'in 30 sec',
    trustedBy:        'TRUSTED BY',
    needHelp:         'Need Help?',
    helpSub:          'Call 9566137117',
    errEmpty:         'Enter phone number and password',
    errPhone:         'Enter valid 10-digit phone number',
    errPass:          'Password must be at least 8 characters with uppercase, number & special character',
    errPassWeak:      'Password must include uppercase, number & special character (!@#$%^&*)',
    errBlocked:       'Too many attempts. Try again later.',
    errLogin:         'Invalid phone number or password',
    errNotFound:      'User not found. Create a new customer account',
    errGeneral:       'Login failed',
    loginFailed:      'Login Failed',
    error:            'Error',
    blocked:          'Blocked',
    passStrengthWeak: 'Weak',
    passStrengthFair: 'Fair',
    passStrengthGood: 'Good',
    passStrengthStrong: 'Strong',
  },
  ta: {
    heroTitle:        'எதையும் ',
    heroAccent:       'அனுப்பு.',
    heroTitle2:       '\nஎங்கும் சேர்க்கும்.',
    // ── CHANGE 3: Quote text in hero image (Tamil) ──
    heroQuote:        '"வேகமாக. நம்பகமாக. டெலிவரி."',
    cardTitle:        'மீண்டும் வருக!',
    cardSubtitle:     'தொடர உள்நுழையவும்',
    phonePlaceholder: '9876543210',
    passPlaceholder:  'கடவுச்சொல்',
    forgotPassword:   'கடவுச்சொல் மறந்தீர்களா?',
    rememberMe:       'என்னை நினைவில் வை',
    login:            'உள்நுழை',
    noAccount:        'கணக்கு இல்லையா? ',
    register:         'பதிவு செய்யுங்கள்',
    trustedBy:        'நம்பகமான சேவை',
    needHelp:         'உதவி வேணுமா?',
    helpSub:          'அழைக்கவும்: 9566137117',
    errEmpty:         'தொலைபேசி எண் மற்றும் கடவுச்சொல் உள்ளிடவும்',
    errPhone:         'சரியான 10 இலக்க தொலைபேசி எண் உள்ளிடவும்',
    errPass:          'கடவுச்சொல் குறைந்தது 8 எழுத்துகள், பெரிய எழுத்து, எண் & சிறப்பு எழுத்து இருக்க வேண்டும்',
    errPassWeak:      'கடவுச்சொல்லில் பெரிய எழுத்து, எண் & சிறப்பு எழுத்து (!@#$%^&*) இருக்க வேண்டும்',
    errBlocked:       'பல முயற்சிகள். சிறிது நேரம் கழித்து முயற்சிக்கவும்.',
    errLogin:         'தொலைபேசி எண் அல்லது கடவுச்சொல் தவறானது',
    errNotFound:      'பயனர் இல்லை. புதிய கணக்கு உருவாக்கவும்',
    errGeneral:       'உள்நுழைவு தோல்வி',
    loginFailed:      'உள்நுழைவு தோல்வியடைந்தது',
    error:            'பிழை',
    blocked:          'தடுக்கப்பட்டது',
    passStrengthWeak: 'பலவீனம்',
    passStrengthFair: 'சாதாரணம்',
    passStrengthGood: 'நல்லது',
    passStrengthStrong: 'வலுவான',
  },
};

// ── CHANGE 1: Password strength checker ──────────────────
const getPasswordStrength = (pass) => {
  if (!pass) return null;
  const hasUpper   = /[A-Z]/.test(pass);
  const hasLower   = /[a-z]/.test(pass);
  const hasNumber  = /[0-9]/.test(pass);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);
  const isLong     = pass.length >= 8;
  const score = [hasUpper, hasLower, hasNumber, hasSpecial, isLong].filter(Boolean).length;
  if (score <= 2) return 'weak';
  if (score === 3) return 'fair';
  if (score === 4) return 'good';
  return 'strong';
};

const STRENGTH_COLOR = {
  weak:   '#F44336',
  fair:   '#FF9800',
  good:   '#2196F3',
  strong: '#4CAF50',
};

const STRENGTH_WIDTH = {
  weak:   '25%',
  fair:   '50%',
  good:   '75%',
  strong: '100%',
};

const EyeIcon = ({ visible }) => (
  <Text style={{ fontSize: 16, color: visible ? C.primary : '#AAAAAA' }}>
    {visible ? '👁️' : '🙈'}
  </Text>
);

// ── CHANGE 2: Simple checkbox component ──────────────────
const Checkbox = ({ checked, onToggle, label }) => (
  <TouchableOpacity
    style={S.checkboxRow}
    onPress={onToggle}
    activeOpacity={0.7}
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
  >
    <View style={[S.checkboxBox, checked && S.checkboxChecked]}>
      {checked && <Text style={S.checkboxTick}>✓</Text>}
    </View>
    <Text style={S.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber]   = useState('');
  const [password, setPassword]         = useState('');
  const [loading, setLoading]           = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passFocused, setPassFocused]   = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lang, setLang]                 = useState('en');
  // ── CHANGE 2: Remember Me state ──
  const [rememberMe, setRememberMe]     = useState(false);

  const t = STRINGS[lang];

  // ── CHANGE 1: Password strength ──
  const passStrength = getPasswordStrength(password);

  const getStrengthLabel = () => {
    if (!passStrength) return '';
    const map = { weak: t.passStrengthWeak, fair: t.passStrengthFair, good: t.passStrengthGood, strong: t.passStrengthStrong };
    return map[passStrength];
  };

  // Animations
  const cardY    = useRef(new Animated.Value(40)).current;
  const cardOp   = useRef(new Animated.Value(0)).current;
  const shakeX   = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(1)).current;
  const shimmerX = useRef(new Animated.Value(-120)).current;

  const passwordRef = useRef(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(cardY,  { toValue: 0, duration: 480, useNativeDriver: true }),
      Animated.timing(cardOp, { toValue: 1, duration: 480, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerX, { toValue: 300, duration: 1800, useNativeDriver: true }),
        Animated.delay(1200),
        Animated.timing(shimmerX, { toValue: -120, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    // ── CHANGE 2: Load saved phone number if Remember Me was checked ──
    const loadRemembered = async () => {
      try {
        const saved = await AsyncStorage.getItem('rememberedPhone');
        const rem   = await AsyncStorage.getItem('rememberMe');
        if (rem === 'true' && saved) {
          setPhoneNumber(saved);
          setRememberMe(true);
        }
      } catch {}
    };
    loadRemembered();
  }, []);

  const triggerShake = () =>
    Animated.sequence([
      Animated.timing(shakeX, { toValue:  9, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: -9, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue:  6, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: -6, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue:  0, duration: 55, useNativeDriver: true }),
    ]).start();

  const onPressIn  = () =>
    Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true }).start();
  const onPressOut = () =>
    Animated.spring(btnScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();

  const toggleLang = () => setLang(l => (l === 'en' ? 'ta' : 'en'));

  // ── CHANGE 1: Strong password validation ──
  const isStrongPassword = (pass) => {
    return (
      pass.length >= 8 &&
      /[A-Z]/.test(pass) &&
      /[0-9]/.test(pass) &&
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)
    );
  };

  const handleLogin = async () => {
    const phone = phoneNumber.trim();
    const pass  = password.trim();

    if (!phone || !pass) {
      triggerShake();
      Alert.alert(t.error, t.errEmpty);
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      triggerShake();
      Alert.alert(t.error, t.errPhone);
      return;
    }
    // ── CHANGE 1: Strong password check ──
    if (pass.length < 8) {
      triggerShake();
      Alert.alert(t.error, t.errPass);
      return;
    }
    if (!isStrongPassword(pass)) {
      triggerShake();
      Alert.alert(t.error, t.errPassWeak);
      return;
    }
    if (loginAttempts >= 5) {
      Alert.alert(t.blocked, t.errBlocked);
      return;
    }

    setLoading(true);
    try {
      const response = await customerAPI.login({ phoneNumber: phone, password: pass });
      if (response.data?.success) {
        const { customerId, token, name, email } = response.data;
        if (!customerId) { Alert.alert(t.error, t.errGeneral); return; }
        if (token) await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('customerId', customerId.toString());
        await AsyncStorage.setItem('userData', JSON.stringify({
          customerId, name: name || '', email: email || '', phoneNumber: phone,
        }));

        // ── CHANGE 2: Save phone if Remember Me is checked ──
        if (rememberMe) {
          await AsyncStorage.setItem('rememberedPhone', phone);
          await AsyncStorage.setItem('rememberMe', 'true');
        } else {
          await AsyncStorage.removeItem('rememberedPhone');
          await AsyncStorage.setItem('rememberMe', 'false');
        }

        setLoginAttempts(0);
        Platform.OS === 'web'
          ? navigation.navigate('CreateLoadRequest')
          : navigation.replace('CreateLoadRequest');
      } else {
        setLoginAttempts(p => p + 1);
        triggerShake();
        Alert.alert(t.loginFailed, t.errLogin);
      }
    } catch {
      triggerShake();
      Alert.alert(t.error, t.errNotFound);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={S.flex1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <ScrollView
        style={S.flex1}
        contentContainerStyle={S.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
      >

        {/* ── HERO ── */}
        <ImageBackground
          source={require('../assets/images/truck-hero.png')}
          style={S.hero}
          resizeMode="cover"
          imageStyle={{ opacity: 0.92 }}
        >
          <View style={S.heroOverlay} />

          {/* Brand tag — top left */}
          <View style={S.heroTagRow}>
            <View style={S.heroTag}>
              <Text style={S.heroTagText}></Text>
            </View>
          </View>

          {/* Main headline */}
          <View style={S.heroContent}>
            <Text style={S.heroTitle}>
              {t.heroTitle}<Text style={S.heroTitleAccent}>{t.heroAccent}</Text>{t.heroTitle2}
            </Text>
            {/* ── CHANGE 3: Quote text inside hero image ── */}
            <View style={S.heroQuoteBox}>
              <Text style={S.heroQuoteText}>{t.heroQuote}</Text>
            </View>
          </View>
        </ImageBackground>

        {/* ── CARD ── */}
        <Animated.View style={[
          S.card,
          { opacity: cardOp, transform: [{ translateY: cardY }] },
        ]}>
          {/* ── Card top row: title + lang toggle ── */}
          <View style={S.cardTopRow}>
            <View>
              <Text style={S.cardTitle}>{t.cardTitle}</Text>
              <Text style={S.cardSubtitle}>{t.cardSubtitle}</Text>
            </View>
            <TouchableOpacity style={S.langToggle} onPress={toggleLang} activeOpacity={0.8}>
              <Text style={[S.langOption, lang === 'en' && S.langActive]}>EN</Text>
              <View style={S.langDivider} />
              <Text style={[S.langOption, lang === 'ta' && S.langActive]}>த</Text>
            </TouchableOpacity>
          </View>

          {/* ── Phone Field ── */}
          <View style={S.fieldWrap}>
            <View style={[S.inputRow, phoneFocused && S.inputRowFocused]}>
              <View style={S.iconCircle}>
                <Text style={S.fieldIcon}>📱</Text>
              </View>
              <View style={S.prefixBox}>
                <Text style={S.prefix}>+91</Text>
              </View>
              <View style={S.dividerV} />
              <TextInput
                style={S.input}
                placeholder={t.phonePlaceholder}
                placeholderTextColor="#BBBBBB"
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                onFocus={() => setPhoneFocused(true)}
                onBlur={() => setPhoneFocused(false)}
                editable={!loading}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                blurOnSubmit={false}
              />
            </View>
          </View>

          {/* ── CHANGE 4: Extra spacing between phone and password ── */}
          <View style={S.fieldSpacing} />

          {/* ── Password Field ── */}
          <View style={S.fieldWrap}>
            <View style={[S.inputRow, passFocused && S.inputRowFocused]}>
              <View style={S.iconCircle}>
                <Text style={S.fieldIcon}>🔒</Text>
              </View>
              <TextInput
                ref={passwordRef}
                style={[S.input, { marginLeft: 4 }]}
                placeholder={t.passPlaceholder}
                placeholderTextColor="#BBBBBB"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPassFocused(true)}
                onBlur={() => setPassFocused(false)}
                editable={!loading}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(p => !p)}
                style={S.eyeBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <EyeIcon visible={showPassword} />
              </TouchableOpacity>
            </View>

            {/* ── CHANGE 1: Password strength bar ── */}
            {password.length > 0 && (
              <View style={S.strengthWrap}>
                <View style={S.strengthBarBg}>
                  <View style={[
                    S.strengthBarFill,
                    {
                      width: STRENGTH_WIDTH[passStrength],
                      backgroundColor: STRENGTH_COLOR[passStrength],
                    },
                  ]} />
                </View>
                <Text style={[S.strengthLabel, { color: STRENGTH_COLOR[passStrength] }]}>
                  {getStrengthLabel()}
                </Text>
              </View>
            )}
          </View>

          {/* ── Forgot Password + Remember Me row ── */}
          <View style={S.forgotRememberRow}>
            {/* ── CHANGE 2: Remember Me checkbox ── */}
            <Checkbox
              checked={rememberMe}
              onToggle={() => setRememberMe(p => !p)}
              label={t.rememberMe}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={S.forgotText}>{t.forgotPassword}</Text>
            </TouchableOpacity>
          </View>

          {/* ── Login Button ── */}
          <Animated.View style={{
            transform: [{ translateX: shakeX }, { scale: btnScale }],
            marginTop: 8,
            marginBottom: 22,
          }}>
            <Pressable
              style={[S.loginBtn, loading && S.btnDisabled]}
              onPress={handleLogin}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={C.white} />
              ) : (
                <>
                  <Text style={S.loginBtnText}>{t.login}</Text>
                  <Animated.View
                    style={[S.shimmer, { transform: [{ translateX: shimmerX }] }]}
                    pointerEvents="none"
                  />
                </>
              )}
            </Pressable>
          </Animated.View>

          {/* ── Register ── */}
          <View style={S.registerRow}>
            <Text style={S.registerText}>{t.noAccount}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={S.registerLink}>{t.register}</Text>
            </TouchableOpacity>
          </View>

          {/* ── Divider ── */}
          <View style={S.dividerRow}>
            <View style={S.dividerLine} />
            <Text style={S.dividerLabel}>{t.trustedBy}</Text>
            <View style={S.dividerLine} />
          </View>

          {/* ── Need Help ── */}
          <TouchableOpacity style={S.helpCard} activeOpacity={0.85}>
            <View style={S.helpIconWrap}>
              <Text style={S.helpIconEmoji}>🎧</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={S.helpTitle}>{t.needHelp}</Text>
              <Text style={S.helpSub}>{t.helpSub}</Text>
            </View>
            <Text style={S.helpArrow}>›</Text>
          </TouchableOpacity>

        </Animated.View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const S = StyleSheet.create({

  flex1: { flex: 1, backgroundColor: C.white },

  scrollContent: {
    flexGrow: 1,
  },

  // ── Hero ─────────────────────────────────────────────
  hero: {
    height: 240,
    justifyContent: 'flex-end',
    backgroundColor: '#1a0a00',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  heroTagRow: {
    position: 'absolute',
    top: 14,
    left: 16,
    zIndex: 2,
  },
  heroTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  heroTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: C.white,
    letterSpacing: 0.5,
  },

  // Language Toggle
  langToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: C.white,
    alignSelf: 'flex-start',
  },
  langOption: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontSize: 12,
    fontWeight: '800',
    color: '#AAAAAA',
  },
  langActive: {
    color: C.white,
    backgroundColor: C.primary,
  },
  langDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E0E0E0',
  },

  heroContent: {
    paddingHorizontal: 18,
    paddingBottom: 28,
    zIndex: 2,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: C.white,
    lineHeight: 31,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroTitleAccent: {
    color: '#FFE0B2',
  },

  // ── CHANGE 3: Hero quote box ──────────────────────────
  heroQuoteBox: {
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: C.primary,
    paddingLeft: 10,
  },
  heroQuoteText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.92)',
    fontStyle: 'italic',
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  // ── Card ──────────────────────────────────────────────
  card: {
    backgroundColor: C.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -28,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 40,
    flexGrow: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 8,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 22,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: C.text,
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 13,
    color: C.textMuted,
  },

  // ── Fields ────────────────────────────────────────────
  fieldWrap: { marginBottom: 12 },

  // ── CHANGE 4: Extra spacing between phone & password ──
  fieldSpacing: { height: 10 },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.inputBg,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
  },
  inputRowFocused: {
    borderColor: C.primary,
    backgroundColor: '#FFF8F4',
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  fieldIcon:  { fontSize: 13 },
  prefixBox:  { marginRight: 6 },
  prefix: {
    fontSize: 14,
    fontWeight: '700',
    color: C.text,
  },
  dividerV: {
    width: 1,
    height: 22,
    backgroundColor: C.border,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: C.text,
    height: 52,
  },
  eyeBtn: { padding: 6 },

  // ── CHANGE 1: Password strength bar ──────────────────
  strengthWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  strengthBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: '#ECECEC',
    borderRadius: 2,
    overflow: 'hidden',
  },
  strengthBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 11,
    fontWeight: '700',
    minWidth: 48,
    textAlign: 'right',
  },

  // ── Forgot + Remember Me row ──────────────────────────
  forgotRememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 18,
  },
  forgotText: {
    fontSize: 13,
    color: C.primary,
    fontWeight: '600',
  },

  // ── CHANGE 2: Checkbox styles ─────────────────────────
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: C.border,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: C.primary,
    borderColor: C.primary,
  },
  checkboxTick: {
    fontSize: 12,
    color: C.white,
    fontWeight: '900',
    lineHeight: 14,
  },
  checkboxLabel: {
    fontSize: 13,
    color: C.text,
    fontWeight: '500',
  },

  // ── Login Button ──────────────────────────────────────
  loginBtn: {
    height: 52,
    backgroundColor: C.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#FF6A00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  btnDisabled: { opacity: 0.6 },
  loginBtnText: {
    color: C.white,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 80,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.18)',
    transform: [{ skewX: '-20deg' }],
  },

  // ── Register ──────────────────────────────────────────
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  registerText: { fontSize: 13, color: C.textMuted },
  registerLink: {
    fontSize: 13,
    color: C.primary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  // ── Divider ───────────────────────────────────────────
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#ECECEC' },
  dividerLabel: {
    fontSize: 10,
    color: '#BBBBBB',
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // ── Help Card ─────────────────────────────────────────
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4EC',
    borderRadius: 14,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#FFD4A8',
  },
  helpIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpIconEmoji: { fontSize: 18 },
  helpTitle: { fontSize: 14, fontWeight: '700', color: '#111111' },
  helpSub:   { fontSize: 13, color: C.primary, fontWeight: '600', marginTop: 1 },
  helpArrow: { fontSize: 22, color: C.primary, fontWeight: '700', marginLeft: 'auto' },
});