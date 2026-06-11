// import { useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { customerAPI } from '../services/api';

// const RegisterScreen = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phoneNumber: '',
//     email: '',
//     password: '',
//     address: '',
//   });

//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleInputChange = (field, value) => {
//     // allow only numbers for phone
//     if (field === 'phoneNumber') {
//       value = value.replace(/[^0-9]/g, '');
//     }

//     setFormData({
//       ...formData,
//       [field]: value,
//     });
//   };

//   const handleRegister = async () => {
//     const { name, phoneNumber, email, password, address } = formData;

//     if (!name || !phoneNumber || !email || !password || !address) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     if (!/^\d{10}$/.test(phoneNumber)) {
//       Alert.alert('Error', 'Phone number must be exactly 10 digits');
//       return;
//     }

//     if (password.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await customerAPI.register(formData);

// if (response) {
//   Alert.alert(
//     'Success',
//     'Registration successful!',
//     [{ text: 'OK', onPress: () => navigation.goBack() }]
//   );
// } {
//         Alert.alert(
//           'Success',
//           'Registration successful!',
//           [{ text: 'OK', onPress: () => navigation.goBack() }]
//         );
//       }
//     } catch (error) {
//   Alert.alert(
//     'Registration Failed',
//     error.message || 'Something went wrong'
//   );
// } finally {
//       setLoading(false);
//     }
//   };

//   const renderInput = (label, field, icon, keyboardType = 'default') => (
//     <View style={styles.inputContainer}>
//       <View style={styles.labelRow}>
//         <Icon name={icon} size={18} color="#333" />
//         <Text style={styles.labelText}>
//           {label}
//           <Text style={styles.required}> *</Text>
//         </Text>
//       </View>

//       <TextInput
//         style={styles.input}
//         placeholder={`Enter ${label}`}
//         placeholderTextColor="#888"
//         value={formData[field]}
//         onChangeText={(text) => handleInputChange(field, text)}
//         keyboardType={keyboardType}
//         maxLength={field === 'phoneNumber' ? 10 : undefined}
//       />
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 40 }}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.title}>Customer Registration</Text>
//           <Text style={styles.subtitle}>Create your account</Text>
//         </View>

//         {/* Form */}
//         <View style={styles.form}>
//           {renderInput('Full Name', 'name', 'person')}
//           {renderInput('Phone Number', 'phoneNumber', 'phone', 'number-pad')}
//           {renderInput('Email', 'email', 'email', 'email-address')}

//           {/* Password */}
//           <View style={styles.inputContainer}>
//             <View style={styles.labelRow}>
//               <Icon name="lock" size={18} color="#333" />
//               <Text style={styles.labelText}>
//                 Password <Text style={styles.required}>*</Text>
//               </Text>
//             </View>

//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Enter password"
//                 placeholderTextColor="#888"
//                 value={formData.password}
//                 onChangeText={(text) => handleInputChange('password', text)}
//                 secureTextEntry={!showPassword}
//               />

//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Icon
//                   name={showPassword ? 'visibility' : 'visibility-off'}
//                   size={22}
//                   color="#555"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Confirm Password */}
//           <View style={styles.inputContainer}>
//             <View style={styles.labelRow}>
//               <Icon name="lock-outline" size={18} color="#333" />
//               <Text style={styles.labelText}>
//                 Confirm Password <Text style={styles.required}>*</Text>
//               </Text>
//             </View>

//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Confirm password"
//                 placeholderTextColor="#888"
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 secureTextEntry={!showConfirmPassword}
//               />

//               <TouchableOpacity
//                 onPress={() =>
//                   setShowConfirmPassword(!showConfirmPassword)
//                 }
//               >
//                 <Icon
//                   name={showConfirmPassword ? 'visibility' : 'visibility-off'}
//                   size={22}
//                   color="#555"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Address */}
//           <View style={styles.inputContainer}>
//             <View style={styles.labelRow}>
//               <Icon name="home" size={18} color="#333" />
//               <Text style={styles.labelText}>
//                 Address <Text style={styles.required}></Text>
//               </Text>
//             </View>

//             <TextInput
//               style={styles.input}
//               placeholder="Enter address"
//               placeholderTextColor="#888"
//               value={formData.address}
//               onChangeText={(text) => handleInputChange('address', text)}
//               multiline
//               scrollEnabled={true}
//             />
//           </View>

//           {/* Register Button */}
//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleRegister}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <>
//                 <Icon name="how-to-reg" size={20} color="#fff" />
//                 <Text style={styles.buttonText}>REGISTER</Text>
//               </>
//             )}
//           </TouchableOpacity>

//           {/* Back */}
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={styles.backText}>← Back to Login</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default RegisterScreen;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f4f6f8',
//   },
//   header: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingTop: 10,
//     paddingBottom: 15,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#222',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   form: {
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   inputContainer: {
//     marginBottom: 18,
//   },
//   labelRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 6,
//   },
//   labelText: {
//     fontSize: 14,
//     color: '#333',
//     marginLeft: 6,
//     fontWeight: '500',
//   },
//   required: {
//     color: 'red',
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     fontSize: 15,
//     backgroundColor: '#fff',
//     color: '#000',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 12,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//   },
//   passwordInput: {
//     flex: 1,
//     fontSize: 15,
//     color: '#000',
//   },
//   button: {
//     flexDirection: 'row',
//     backgroundColor: '#2e6ee2',
//     padding: 16,
//     borderRadius: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 15,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     marginLeft: 8,
//     fontWeight: 'bold',
//   },
//   backText: {
//     textAlign: 'center',
//     marginTop: 15,
//     color: '#2e6ee2',
//     fontSize: 14,
//   },
// });

// import { useState } from 'react';
// import { Platform } from 'react-native';
// import {
//   ActivityIndicator,
//   Alert,
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
//   error:        '#EF4444',
// };
 
// const RegisterScreen = ({ navigation }) => {
//   const [formData, setFormData] = useState({ name: '', phoneNumber: '', email: '', password: '', address: '' });
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
 
//   const handleChange = (field, value) => {
//     if (field === 'phoneNumber') value = value.replace(/[^0-9]/g, '');
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };
 
//   const handleRegister = async () => {
//     const { name, phoneNumber, email, password, address } = formData;
//     if (!name || !phoneNumber || !email || !password || !address) { Alert.alert('Error', 'Please fill all required fields'); return; }
//     if (!/^\d{10}$/.test(phoneNumber)) { Alert.alert('Error', 'Phone number must be exactly 10 digits'); return; }
//     if (password.length < 6) { Alert.alert('Error', 'Password must be at least 6 characters'); return; }
//     if (password !== confirmPassword) { Alert.alert('Error', 'Passwords do not match'); return; }
//     setLoading(true);
//     try {
//       await customerAPI.register(formData);
//       Alert.alert('Success', 'Registration successful!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
//     } catch (error) {
//       Alert.alert('Registration Failed', error.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const InputField = ({ label, field, placeholder, keyboardType = 'default', maxLength }) => (
//     <View style={S.fieldWrap}>
//       <Text style={S.label}>{label} <Text style={S.required}>*</Text></Text>
//       <TextInput
//         style={S.input}
//         placeholder={placeholder}
//         placeholderTextColor={C.textSecondary}
//         value={formData[field]}
//         onChangeText={t => handleChange(field, t)}
//         keyboardType={keyboardType}
//         maxLength={maxLength}
//       />
//     </View>
//   );
 
//   return (
//     <SafeAreaView style={S.safe}>
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={S.scroll}>
 
//         {/* HEADER */}
//         <View style={S.header}>
//           <TouchableOpacity style={S.backBtn} onPress={() => navigation.goBack()}>
//             <Text style={S.backArrow}>←</Text>
//           </TouchableOpacity>
//           <View>
//             <Text style={S.headerTitle}>Create Account</Text>
//             <Text style={S.headerSub}>Join us today, it's free</Text>
//           </View>
//         </View>
 
//         <View style={S.form}>
 
//           <InputField label="Full Name" field="name" placeholder="Your full name" />
//           <InputField label="Phone Number" field="phoneNumber" placeholder="10-digit mobile number" keyboardType="number-pad" maxLength={10} />
//           <InputField label="Email" field="email" placeholder="your@email.com" keyboardType="email-address" />
 
//           {/* Password */}
//           <View style={S.fieldWrap}>
//             <Text style={S.label}>Password <Text style={S.required}>*</Text></Text>
//             <View style={S.passwordRow}>
//               <TextInput
//                 style={S.passwordInput}
//                 placeholder="Min 6 characters"
//                 placeholderTextColor={C.textSecondary}
//                 value={formData.password}
//                 onChangeText={t => handleChange('password', t)}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={S.eyeBtn}>
//                 <Text style={S.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
 
//           {/* Confirm Password */}
//           <View style={S.fieldWrap}>
//             <Text style={S.label}>Confirm Password <Text style={S.required}>*</Text></Text>
//             <View style={S.passwordRow}>
//               <TextInput
//                 style={S.passwordInput}
//                 placeholder="Re-enter password"
//                 placeholderTextColor={C.textSecondary}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 secureTextEntry={!showConfirm}
//               />
//               <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={S.eyeBtn}>
//                 <Text style={S.eyeIcon}>{showConfirm ? '🙈' : '👁️'}</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
 
//           {/* Address */}
//           <View style={S.fieldWrap}>
//             <Text style={S.label}>Address <Text style={S.required}>*</Text></Text>
//             <TextInput
//               style={[S.input, { height: 80, paddingTop: 12, textAlignVertical: 'top' }]}
//               placeholder="Your full address"
//               placeholderTextColor={C.textSecondary}
//               value={formData.address}
//               onChangeText={t => handleChange('address', t)}
//               multiline
//             />
//           </View>
 
//           {/* REGISTER BUTTON */}
//           <TouchableOpacity style={[S.primaryBtn, loading && S.btnDisabled]} onPress={handleRegister} disabled={loading}>
//             {loading ? <ActivityIndicator color={C.white} /> : <Text style={S.primaryBtnText}>Create Account →</Text>}
//           </TouchableOpacity>
 
//           <TouchableOpacity onPress={() => navigation.goBack()} style={S.linkBtn}>
//             <Text style={S.linkText}>Already have an account? Sign In</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
 
// export default RegisterScreen;
 
// const S = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: '#F8F8F8' },
//   scroll: { paddingBottom: 40 },
 
//   header: {
//     flexDirection: 'row', alignItems: 'center', gap: 12,
//     backgroundColor: C.white, padding: 20, paddingTop: 16,
//     borderBottomWidth: 1, borderBottomColor: C.border,
//   },
//   backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.primaryLight, alignItems: 'center', justifyContent: 'center' },
//   backArrow: { fontSize: 18, color: C.primary },
//   headerTitle: { fontSize: 22, fontWeight: '700', color: C.textPrimary },
//   headerSub: { fontSize: 13, color: C.textSecondary, marginTop: 2 },
 
//   form: { padding: 16 },
 
//   fieldWrap: { marginBottom: 16 },
//   label: { fontSize: 12, fontWeight: '600', color: C.textSecondary, marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase' },
//   required: { color: C.error },
//   input: {
//     height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, fontSize: 15, color: C.textPrimary, backgroundColor: C.white,
//   },
//   passwordRow: {
//     flexDirection: 'row', alignItems: 'center',
//     height: 48, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     backgroundColor: C.white, paddingRight: 8,
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
 
//   linkBtn: { alignItems: 'center', marginTop: 20 },
//   linkText: { color: C.primary, fontSize: 14, fontWeight: '600' },
// });
 
// import { useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { customerAPI } from '../services/api';

// const C = {
//   primary:       '#FF6A00',
//   primaryLight:  '#FFF4EC',
//   white:         '#FFFFFF',
//   textPrimary:   '#111111',
//   textSecondary: '#666666',
//   border:        '#EEEEEE',
//   bg:            '#F8F8F8',
//   error:         '#EF4444',
// };

// const RegisterScreen = ({ navigation }) => {
//   const [formData, setFormData] = useState({ name: '', phoneNumber: '', email: '', password: '', address: '' });
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleChange = (field, value) => {
//     if (field === 'phoneNumber') value = value.replace(/[^0-9]/g, '');
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleRegister = async () => {
//     Keyboard.dismiss();
//     const { name, phoneNumber, email, password, address } = formData;
//     if (!name || !phoneNumber || !email || !password || !address) { Alert.alert('Error', 'Please fill all required fields'); return; }
//     if (!/^\d{10}$/.test(phoneNumber)) { Alert.alert('Error', 'Phone number must be exactly 10 digits'); return; }
//     if (password.length < 6) { Alert.alert('Error', 'Password must be at least 6 characters'); return; }
//     if (password !== confirmPassword) { Alert.alert('Error', 'Passwords do not match'); return; }
//     setLoading(true);
//     try {
//       await customerAPI.register(formData);
//       // ✅ goBack() → navigate('Login')
//       Alert.alert('Success', 'Registration successful!', [
//         { text: 'OK', onPress: () => navigation.navigate('Login') }
//       ]);
//     } catch (error) {
//       Alert.alert('Registration Failed', error.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const InputField = ({ label, field, placeholder, keyboardType = 'default', maxLength, returnKeyType = 'next', onSubmitEditing }) => (
//     <View style={S.fieldWrap}>
//       <Text style={S.label}>{label} <Text style={S.required}>*</Text></Text>
//       <TextInput
//         style={S.input}
//         placeholder={placeholder}
//         placeholderTextColor={C.textSecondary}
//         value={formData[field]}
//         onChangeText={t => handleChange(field, t)}
//         keyboardType={keyboardType}
//         maxLength={maxLength}
//         returnKeyType={returnKeyType}
//         onSubmitEditing={onSubmitEditing}
//         blurOnSubmit={false}
//       />
//     </View>
//   );

//   return (
//     <SafeAreaView style={S.safe}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={S.scroll}
//             keyboardShouldPersistTaps="handled"
//             bounces={false}
//           >
//             {/* HEADER */}
//             <View style={S.header}>
//               {/* ✅ goBack() → navigate('Login') */}
//               <TouchableOpacity
//                 style={S.backBtn}
//                 onPress={() => navigation.navigate('Login')}
//               >
//                 <Text style={S.backArrow}></Text>
//               </TouchableOpacity>
//               <View>
//                 <Text style={S.headerTitle}>Create Account</Text>
//                 <Text style={S.headerSub}>Join us today, it's free</Text>
//               </View>
//             </View>

//             <View style={S.form}>

//               <InputField label="Full Name"    field="name"        placeholder="Your full name" />
//               <InputField label="Phone Number" field="phoneNumber" placeholder="10-digit mobile number" keyboardType="number-pad" maxLength={10} />
//               <InputField label="Email"        field="email"       placeholder="your@email.com" keyboardType="email-address" />

//               {/* Password */}
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>Password <Text style={S.required}>*</Text></Text>
//                 <View style={S.passwordRow}>
//                   <TextInput
//                     style={S.passwordInput}
//                     placeholder="Min 6 characters"
//                     placeholderTextColor={C.textSecondary}
//                     value={formData.password}
//                     onChangeText={t => handleChange('password', t)}
//                     secureTextEntry={!showPassword}
//                     returnKeyType="next"
//                     blurOnSubmit={false}
//                   />
//                   <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={S.eyeBtn}>
//                     <Text style={S.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* Confirm Password */}
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>Confirm Password <Text style={S.required}>*</Text></Text>
//                 <View style={S.passwordRow}>
//                   <TextInput
//                     style={S.passwordInput}
//                     placeholder="Re-enter password"
//                     placeholderTextColor={C.textSecondary}
//                     value={confirmPassword}
//                     onChangeText={setConfirmPassword}
//                     secureTextEntry={!showConfirm}
//                     returnKeyType="next"
//                     blurOnSubmit={false}
//                   />
//                   <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={S.eyeBtn}>
//                     <Text style={S.eyeIcon}>{showConfirm ? '👁️' : '🙈'}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* Address */}
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>Address <Text style={S.required}>*</Text></Text>
//                 <TextInput
//                   style={[S.input, { height: 80, paddingTop: 12, textAlignVertical: 'top' }]}
//                   placeholder="Your full address"
//                   placeholderTextColor={C.textSecondary}
//                   value={formData.address}
//                   onChangeText={t => handleChange('address', t)}
//                   multiline
//                   returnKeyType="done"
//                   onSubmitEditing={handleRegister}
//                 />
//               </View>

//               {/* REGISTER BUTTON */}
//               <TouchableOpacity
//                 style={[S.primaryBtn, loading && S.btnDisabled]}
//                 onPress={handleRegister}
//                 disabled={loading}
//               >
//                 {loading
//                   ? <ActivityIndicator color={C.white} />
//                   : <Text style={S.primaryBtnText}>Create Account →</Text>
//                 }
//               </TouchableOpacity>

//               {/* ✅ goBack() → navigate('Login') */}
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Login')}
//                 style={S.linkBtn}
//               >
//                 <Text style={S.linkText}>Already have an account? Sign In</Text>
//               </TouchableOpacity>

//             </View>

//             <View style={{ height: 60 }} />

//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default RegisterScreen;

// const S = StyleSheet.create({
//   safe:   { flex: 1, backgroundColor: '#F8F8F8' },
//   scroll: { flexGrow: 1, paddingBottom: 20 },

//   header: {
//     flexDirection: 'row', alignItems: 'center', gap: 12,
//     backgroundColor: C.white, padding: 20, paddingTop: 16,
//     borderBottomWidth: 1, borderBottomColor: C.border,
//   },
//   backBtn: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: C.primaryLight, alignItems: 'center', justifyContent: 'center',
//   },
//   backArrow:   { fontSize: 18, color: C.primary },
//   headerTitle: { fontSize: 22, fontWeight: '700', color: C.textPrimary },
//   headerSub:   { fontSize: 13, color: C.textSecondary, marginTop: 2 },

//   form: { padding: 16 },

//   fieldWrap: { marginBottom: 16 },
//   label: {
//     fontSize: 12, fontWeight: '600', color: C.textSecondary,
//     marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase',
//   },
//   required: { color: C.error },
//   input: {
//     height: 50, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, fontSize: 15, color: C.textPrimary, backgroundColor: C.white,
//   },
//   passwordRow: {
//     flexDirection: 'row', alignItems: 'center', height: 50,
//     borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     backgroundColor: C.white, paddingRight: 8,
//   },
//   passwordInput: { flex: 1, paddingHorizontal: 14, fontSize: 15, color: C.textPrimary },
//   eyeBtn:  { padding: 8 },
//   eyeIcon: { fontSize: 18 },

//   primaryBtn: {
//     height: 52, backgroundColor: C.primary, borderRadius: 12,
//     alignItems: 'center', justifyContent: 'center', marginTop: 8,
//     shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
//   },
//   btnDisabled:    { opacity: 0.6 },
//   primaryBtnText: { color: C.white, fontSize: 16, fontWeight: '700' },

//   linkBtn:  { alignItems: 'center', marginTop: 20 },
//   linkText: { color: C.primary, fontSize: 14, fontWeight: '600' },
// });

// import { useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { customerAPI } from '../services/api';

// const C = {
//   primary:       '#FF6A00',
//   primaryLight:  '#FFF4EC',
//   white:         '#FFFFFF',
//   textPrimary:   '#111111',
//   textSecondary: '#666666',
//   border:        '#EEEEEE',
//   bg:            '#F8F8F8',
//   error:         '#EF4444',
// };

// // ✅ Outside RegisterScreen - no re-create on every render
// const InputField = ({ label, field, placeholder, keyboardType = 'default', maxLength, returnKeyType = 'next', onSubmitEditing, formData, handleChange }) => (
//   <View style={S.fieldWrap}>
//     <Text style={S.label}>{label} <Text style={S.required}>*</Text></Text>
//     <TextInput
//       style={S.input}
//       placeholder={placeholder}
//       placeholderTextColor={C.textSecondary}
//       value={formData[field]}
//       onChangeText={t => handleChange(field, t)}
//       keyboardType={keyboardType}
//       maxLength={maxLength}
//       returnKeyType={returnKeyType}
//       onSubmitEditing={onSubmitEditing}
//       blurOnSubmit={false}
//     />
//   </View>
// );

// const RegisterScreen = ({ navigation }) => {
//   const [formData, setFormData] = useState({ name: '', phoneNumber: '', email: '', password: '', address: '' });
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleChange = (field, value) => {
//     if (field === 'phoneNumber') value = value.replace(/[^0-9]/g, '');
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleRegister = async () => {
//     Keyboard.dismiss();
//     const { name, phoneNumber, email, password, address } = formData;
//     if (!name || !phoneNumber || !email || !password || !address) { Alert.alert('Error', 'Please fill all required fields'); return; }
//     if (!/^\d{10}$/.test(phoneNumber)) { Alert.alert('Error', 'Phone number must be exactly 10 digits'); return; }
//     if (password.length < 6) { Alert.alert('Error', 'Password must be at least 6 characters'); return; }
//     if (password !== confirmPassword) { Alert.alert('Error', 'Passwords do not match'); return; }
//     setLoading(true);
//     try {
//       await customerAPI.register(formData);
//       Alert.alert('Success', 'Registration successful!', [
//         { text: 'OK', onPress: () => navigation.navigate('Login') }
//       ]);
//     } catch (error) {
//       Alert.alert('Registration Failed', error.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={S.safe}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={S.scroll}
//             keyboardShouldPersistTaps="handled"
//             bounces={false}
//           >
//             {/* HEADER */}
//             <View style={S.header}>
//               <TouchableOpacity
//                 style={S.backBtn}
//                 onPress={() => navigation.navigate('Login')}
//               >
//                 <Text style={S.backArrow}>←</Text>
//               </TouchableOpacity>
//               <View>
//                 <Text style={S.headerTitle}>Create Account</Text>
//                 <Text style={S.headerSub}>Join us today, it's free</Text>
//               </View>
//             </View>

//             <View style={S.form}>

//               {/* ✅ formData & handleChange passed as props */}
//               <InputField
//                 label="Full Name"
//                 field="name"
//                 placeholder="Your full name"
//                 formData={formData}
//                 handleChange={handleChange}
//               />
//               <InputField
//                 label="Phone Number"
//                 field="phoneNumber"
//                 placeholder="10-digit mobile number"
//                 keyboardType="number-pad"
//                 maxLength={10}
//                 formData={formData}
//                 handleChange={handleChange}
//               />
//               <InputField
//                 label="Email"
//                 field="email"
//                 placeholder="your@email.com"
//                 keyboardType="email-address"
//                 formData={formData}
//                 handleChange={handleChange}
//               />

//               {/* Password */}
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>Password <Text style={S.required}>*</Text></Text>
//                 <View style={S.passwordRow}>
//                   <TextInput
//                     style={S.passwordInput}
//                     placeholder="Min 6 characters"
//                     placeholderTextColor={C.textSecondary}
//                     value={formData.password}
//                     onChangeText={t => handleChange('password', t)}
//                     secureTextEntry={!showPassword}
//                     returnKeyType="next"
//                     blurOnSubmit={false}
//                   />
//                   <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={S.eyeBtn}>
//                     <Text style={S.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* Confirm Password */}
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>Confirm Password <Text style={S.required}>*</Text></Text>
//                 <View style={S.passwordRow}>
//                   <TextInput
//                     style={S.passwordInput}
//                     placeholder="Re-enter password"
//                     placeholderTextColor={C.textSecondary}
//                     value={confirmPassword}
//                     onChangeText={setConfirmPassword}
//                     secureTextEntry={!showConfirm}
//                     returnKeyType="next"
//                     blurOnSubmit={false}
//                   />
//                   <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={S.eyeBtn}>
//                     <Text style={S.eyeIcon}>{showConfirm ? '👁️' : '🙈'}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* Address */}
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>Address <Text style={S.required}>*</Text></Text>
//                 <TextInput
//                   style={[S.input, { height: 80, paddingTop: 12, textAlignVertical: 'top' }]}
//                   placeholder="Your full address"
//                   placeholderTextColor={C.textSecondary}
//                   value={formData.address}
//                   onChangeText={t => handleChange('address', t)}
//                   multiline
//                   returnKeyType="done"
//                   onSubmitEditing={handleRegister}
//                 />
//               </View>

//               {/* REGISTER BUTTON */}
//               <TouchableOpacity
//                 style={[S.primaryBtn, loading && S.btnDisabled]}
//                 onPress={handleRegister}
//                 disabled={loading}
//               >
//                 {loading
//                   ? <ActivityIndicator color={C.white} />
//                   : <Text style={S.primaryBtnText}>Create Account →</Text>
//                 }
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Login')}
//                 style={S.linkBtn}
//               >
//                 <Text style={S.linkText}>Already have an account? Sign In</Text>
//               </TouchableOpacity>

//             </View>

//             <View style={{ height: 60 }} />

//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default RegisterScreen;

// const S = StyleSheet.create({
//   safe:   { flex: 1, backgroundColor: '#F8F8F8' },
//   scroll: { flexGrow: 1, paddingBottom: 20 },

//   header: {
//     flexDirection: 'row', alignItems: 'center', gap: 12,
//     backgroundColor: C.white, padding: 20, paddingTop: 16,
//     borderBottomWidth: 1, borderBottomColor: C.border,
//   },
//   backBtn: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: C.primaryLight, alignItems: 'center', justifyContent: 'center',
//   },
//   backArrow:   { fontSize: 18, color: C.primary },
//   headerTitle: { fontSize: 22, fontWeight: '700', color: C.textPrimary },
//   headerSub:   { fontSize: 13, color: C.textSecondary, marginTop: 2 },

//   form: { padding: 16 },

//   fieldWrap: { marginBottom: 16 },
//   label: {
//     fontSize: 12, fontWeight: '600', color: C.textSecondary,
//     marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase',
//   },
//   required: { color: C.error },
//   input: {
//     height: 50, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, fontSize: 15, color: C.textPrimary, backgroundColor: C.white,
//   },
//   passwordRow: {
//     flexDirection: 'row', alignItems: 'center', height: 50,
//     borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     backgroundColor: C.white, paddingRight: 8,
//   },
//   passwordInput: { flex: 1, paddingHorizontal: 14, fontSize: 15, color: C.textPrimary },
//   eyeBtn:  { padding: 8 },
//   eyeIcon: { fontSize: 18 },

//   primaryBtn: {
//     height: 52, backgroundColor: C.primary, borderRadius: 12,
//     alignItems: 'center', justifyContent: 'center', marginTop: 8,
//     shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
//   },
//   btnDisabled:    { opacity: 0.6 },
//   primaryBtnText: { color: C.white, fontSize: 16, fontWeight: '700' },

//   linkBtn:  { alignItems: 'center', marginTop: 20 },
//   linkText: { color: C.primary, fontSize: 14, fontWeight: '600' },
// });


// import { useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { customerAPI } from '../services/api';

// const C = {
//   primary:       '#FF6A00',
//   primaryLight:  '#FFF4EC',
//   white:         '#FFFFFF',
//   textPrimary:   '#111111',
//   textSecondary: '#666666',
//   border:        '#EEEEEE',
//   bg:            '#F8F8F8',
//   error:         '#EF4444',
// };

// const InputField = ({ label, field, placeholder, keyboardType = 'default', maxLength, returnKeyType = 'next', onSubmitEditing, formData, handleChange, optional }) => (
//   <View style={S.fieldWrap}>
//     <Text style={S.label}>
//       {label}{' '}
//       {optional
//         ? <Text style={S.optional}>(optional)</Text>
//         : <Text style={S.required}>*</Text>
//       }
//     </Text>
//     <TextInput
//       style={S.input}
//       placeholder={placeholder}
//       placeholderTextColor={C.textSecondary}
//       value={formData[field]}
//       onChangeText={t => handleChange(field, t)}
//       keyboardType={keyboardType}
//       maxLength={maxLength}
//       returnKeyType={returnKeyType}
//       onSubmitEditing={onSubmitEditing}
//       blurOnSubmit={false}
//     />
//   </View>
// );

// const RegisterScreen = ({ navigation }) => {
//   const [formData, setFormData] = useState({ name: '', phoneNumber: '', email: '', password: '', address: '' });
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleChange = (field, value) => {
//     if (field === 'phoneNumber') value = value.replace(/[^0-9]/g, '');
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleRegister = async () => {
//     Keyboard.dismiss();
//     const { name, phoneNumber, password } = formData;

//     // ✅ email & address compulsory இல்லை
//     if (!name || !phoneNumber || !password) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }
//     if (!/^\d{10}$/.test(phoneNumber)) {
//       Alert.alert('Error', 'Phone number must be exactly 10 digits');
//       return;
//     }
//     if (password.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters');
//       return;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     try {
//       await customerAPI.register(formData);
//       Alert.alert('Success', 'Registration successful!', [
//         { text: 'OK', onPress: () => navigation.navigate('Login') }
//       ]);
//     } catch (error) {
//       Alert.alert('Registration Failed', error.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={S.safe}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={S.scroll}
//             keyboardShouldPersistTaps="handled"
//             bounces={false}
//           >
//             {/* HEADER */}
//             <View style={S.header}>
//               <TouchableOpacity
//                 style={S.backBtn}
//                 onPress={() => navigation.navigate('Login')}
//               >
//                 <Text style={S.backArrow}>←</Text>
//               </TouchableOpacity>
//               <View>
//                 <Text style={S.headerTitle}>Create Account</Text>
//                 <Text style={S.headerSub}>Join us today, it's free</Text>
//               </View>
//             </View>

//             <View style={S.form}>

//               {/* ✅ Required fields */}
//               <InputField
//                 label="Full Name"
//                 field="name"
//                 placeholder="Your full name"
//                 formData={formData}
//                 handleChange={handleChange}
//               />
//               <InputField
//                 label="Phone Number"
//                 field="phoneNumber"
//                 placeholder="10-digit mobile number"
//                 keyboardType="number-pad"
//                 maxLength={10}
//                 formData={formData}
//                 handleChange={handleChange}
//               />

             

//               {/* Password - Required */}
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>Password <Text style={S.required}>*</Text></Text>
//                 <View style={S.passwordRow}>
//                   <TextInput
//                     style={S.passwordInput}
//                     placeholder="Min 6 characters"
//                     placeholderTextColor={C.textSecondary}
//                     value={formData.password}
//                     onChangeText={t => handleChange('password', t)}
//                     secureTextEntry={!showPassword}
//                     returnKeyType="next"
//                     blurOnSubmit={false}
//                   />
//                   <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={S.eyeBtn}>
//                     <Text style={S.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* Confirm Password - Required */}
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>Confirm Password <Text style={S.required}>*</Text></Text>
//                 <View style={S.passwordRow}>
//                   <TextInput
//                     style={S.passwordInput}
//                     placeholder="Re-enter password"
//                     placeholderTextColor={C.textSecondary}
//                     value={confirmPassword}
//                     onChangeText={setConfirmPassword}
//                     secureTextEntry={!showConfirm}
//                     returnKeyType="next"
//                     blurOnSubmit={false}
//                   />
//                   <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={S.eyeBtn}>
//                     <Text style={S.eyeIcon}>{showConfirm ? '👁️' : '🙈'}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//                {/* ✅ Optional field */}
//               <InputField
//                 label="Email"
//                 field="email"
//                 placeholder="your@email.com"
//                 keyboardType="email-address"
//                 formData={formData}
//                 handleChange={handleChange}
//                 optional
//               />

//               {/* ✅ Address - Optional */}
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>
//                   Address <Text style={S.optional}>(optional)</Text>
//                 </Text>
//                 <TextInput
//                   style={[S.input, { height: 80, paddingTop: 12, textAlignVertical: 'top' }]}
//                   placeholder="Your full address"
//                   placeholderTextColor={C.textSecondary}
//                   value={formData.address}
//                   onChangeText={t => handleChange('address', t)}
//                   multiline
//                   returnKeyType="done"
//                   onSubmitEditing={handleRegister}
//                 />
//               </View>

//               {/* REGISTER BUTTON */}
//               <TouchableOpacity
//                 style={[S.primaryBtn, loading && S.btnDisabled]}
//                 onPress={handleRegister}
//                 disabled={loading}
//               >
//                 {loading
//                   ? <ActivityIndicator color={C.white} />
//                   : <Text style={S.primaryBtnText}>Create Account →</Text>
//                 }
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Login')}
//                 style={S.linkBtn}
//               >
//                 <Text style={S.linkText}>Already have an account? Sign In</Text>
//               </TouchableOpacity>

//             </View>

//             <View style={{ height: 60 }} />

//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default RegisterScreen;

// const S = StyleSheet.create({
//   safe:   { flex: 1, backgroundColor: '#F8F8F8' },
//   scroll: { flexGrow: 1, paddingBottom: 20 },

//   header: {
//     flexDirection: 'row', alignItems: 'center', gap: 12,
//     backgroundColor: C.white, padding: 20, paddingTop: 16,
//     borderBottomWidth: 1, borderBottomColor: C.border,
//   },
//   backBtn: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: C.primaryLight, alignItems: 'center', justifyContent: 'center',
//   },
//   backArrow:   { fontSize: 18, color: C.primary },
//   headerTitle: { fontSize: 22, fontWeight: '700', color: C.textPrimary },
//   headerSub:   { fontSize: 13, color: C.textSecondary, marginTop: 2 },

//   form: { padding: 16 },

//   fieldWrap: { marginBottom: 16 },
//   label: {
//     fontSize: 12, fontWeight: '600', color: C.textSecondary,
//     marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase',
//   },
//   required: { color: C.error },
//   optional: { color: C.textSecondary, fontWeight: '400' }, // ✅ optional style

//   input: {
//     height: 50, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, fontSize: 15, color: C.textPrimary, backgroundColor: C.white,
//   },
//   passwordRow: {
//     flexDirection: 'row', alignItems: 'center', height: 50,
//     borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     backgroundColor: C.white, paddingRight: 8,
//   },
//   passwordInput: { flex: 1, paddingHorizontal: 14, fontSize: 15, color: C.textPrimary },
//   eyeBtn:  { padding: 8 },
//   eyeIcon: { fontSize: 18 },

//   primaryBtn: {
//     height: 52, backgroundColor: C.primary, borderRadius: 12,
//     alignItems: 'center', justifyContent: 'center', marginTop: 8,
//     shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
//   },
//   btnDisabled:    { opacity: 0.6 },
//   primaryBtnText: { color: C.white, fontSize: 16, fontWeight: '700' },

//   linkBtn:  { alignItems: 'center', marginTop: 20 },
//   linkText: { color: C.primary, fontSize: 14, fontWeight: '600' },
// });

// import { useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { customerAPI } from '../services/api';

// const C = {
//   primary:       '#FF6A00',
//   primaryLight:  '#FFF4EC',
//   white:         '#FFFFFF',
//   textPrimary:   '#111111',
//   textSecondary: '#666666',
//   border:        '#EEEEEE',
//   bg:            '#F8F8F8',
//   error:         '#EF4444',
// };

// const LANG = {
//   en: {
//     headerTitle: 'Create Account',
//     headerSub:   "Join us today, it's free",
//     labelName:    'Full Name',
//     labelPhone:   'Phone Number',
//     labelPassword:'Password',
//     labelConfirm: 'Confirm Password',
//     labelEmail:   'Email',
//     labelAddress: 'Address',
//     optional:     '(optional)',
//     phName:   'Your full name',
//     phPhone:  '10-digit mobile number',
//     phPwd:    'Min 6 characters',
//     phCpwd:   'Re-enter password',
//     phEmail:  'your@email.com',
//     phAddr:   'Your full address',
//     btnCreate:  'Create Account →',
//     btnSignin:  'Already have an account? Sign In',
//     toggle:     'தமிழ்',
//     errRequired: 'Please fill all required fields',
//     errPhone:    'Phone number must be exactly 10 digits',
//     errPwd:      'Password must be at least 6 characters',
//     errMatch:    'Passwords do not match',
//     successTitle:'Success',
//     successMsg:  'Registration successful!',
//     ok:          'OK',
//     errTitle:    'Registration Failed',
//   },
//   ta: {
//     headerTitle: 'கணக்கு உருவாக்கு',
//     headerSub:   'இன்றே சேருங்கள், இலவசம்',
//     labelName:    'முழு பெயர்',
//     labelPhone:   'தொலைபேசி எண்',
//     labelPassword:'கடவுச்சொல்',
//     labelConfirm: 'கடவுச்சொல் உறுதிப்படுத்து',
//     labelEmail:   'மின்னஞ்சல்',
//     labelAddress: 'முகவரி',
//     optional:     '(விருப்பத்திற்குரியது)',
//     phName:   'உங்கள் முழு பெயர்',
//     phPhone:  '10 இலக்க மொபைல் எண்',
//     phPwd:    'குறைந்தது 6 எழுத்துகள்',
//     phCpwd:   'கடவுச்சொல்லை மீண்டும் உள்ளிடவும்',
//     phEmail:  'உங்கள்@மின்னஞ்சல்.com',
//     phAddr:   'உங்கள் முழு முகவரி',
//     btnCreate:  'கணக்கு உருவாக்கு →',
//     btnSignin:  'ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக',
//     toggle:     'English',
//     errRequired: 'தேவையான அனைத்து தகவல்களையும் நிரப்பவும்',
//     errPhone:    'தொலைபேசி எண் சரியாக 10 இலக்கங்களாக இருக்க வேண்டும்',
//     errPwd:      'கடவுச்சொல் குறைந்தது 6 எழுத்துகளாக இருக்க வேண்டும்',
//     errMatch:    'கடவுச்சொற்கள் பொருந்தவில்லை',
//     successTitle:'வெற்றி',
//     successMsg:  'பதிவு வெற்றிகரமாக முடிந்தது!',
//     ok:          'சரி',
//     errTitle:    'பதிவு தோல்வியடைந்தது',
//   },
// };

// const InputField = ({ label, field, placeholder, keyboardType = 'default', maxLength, returnKeyType = 'next', onSubmitEditing, formData, handleChange, optional, optionalText }) => (
//   <View style={S.fieldWrap}>
//     <Text style={S.label}>
//       {label}{' '}
//       {optional
//         ? <Text style={S.optional}>{optionalText}</Text>
//         : <Text style={S.required}>*</Text>
//       }
//     </Text>
//     <TextInput
//       style={S.input}
//       placeholder={placeholder}
//       placeholderTextColor={C.textSecondary}
//       value={formData[field]}
//       onChangeText={t => handleChange(field, t)}
//       keyboardType={keyboardType}
//       maxLength={maxLength}
//       returnKeyType={returnKeyType}
//       onSubmitEditing={onSubmitEditing}
//       blurOnSubmit={false}
//     />
//   </View>
// );

// const RegisterScreen = ({ navigation }) => {
//   const [formData, setFormData] = useState({ name: '', phoneNumber: '', email: '', password: '', address: '' });
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [lang, setLang] = useState('en');

//   const t = LANG[lang];

//   const handleChange = (field, value) => {
//     if (field === 'phoneNumber') value = value.replace(/[^0-9]/g, '');
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleRegister = async () => {
//     Keyboard.dismiss();
//     const { name, phoneNumber, password } = formData;

//     if (!name || !phoneNumber || !password) {
//       Alert.alert('Error', t.errRequired);
//       return;
//     }
//     if (!/^\d{10}$/.test(phoneNumber)) {
//       Alert.alert('Error', t.errPhone);
//       return;
//     }
//     if (password.length < 6) {
//       Alert.alert('Error', t.errPwd);
//       return;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert('Error', t.errMatch);
//       return;
//     }

//     setLoading(true);
//     try {
//       await customerAPI.register(formData);
//       Alert.alert(t.successTitle, t.successMsg, [
//         { text: t.ok, onPress: () => navigation.navigate('Login') }
//       ]);
//     } catch (error) {
//       Alert.alert(t.errTitle, error.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={S.safe}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={S.scroll}
//             keyboardShouldPersistTaps="handled"
//             bounces={false}
//           >
//             {/* HEADER */}
//             <View style={S.header}>
//               <TouchableOpacity
//                 style={S.backBtn}
//                 onPress={() => navigation.navigate('Login')}
//               >
//                 <Text style={S.backArrow}>←</Text>
//               </TouchableOpacity>
//               <View style={{ flex: 1 }}>
//                 <Text style={S.headerTitle}>{t.headerTitle}</Text>
//                 <Text style={S.headerSub}>{t.headerSub}</Text>
//               </View>
//               <TouchableOpacity
//                 style={S.langBtn}
//                 onPress={() => setLang(l => l === 'en' ? 'ta' : 'en')}
//               >
//                 <Text style={S.langBtnText}>🌐 {t.toggle}</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={S.form}>

//               <InputField
//                 label={t.labelName}
//                 field="name"
//                 placeholder={t.phName}
//                 formData={formData}
//                 handleChange={handleChange}
//               />
//               <InputField
//                 label={t.labelPhone}
//                 field="phoneNumber"
//                 placeholder={t.phPhone}
//                 keyboardType="number-pad"
//                 maxLength={10}
//                 formData={formData}
//                 handleChange={handleChange}
//               />

//               {/* Password */}
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>{t.labelPassword} <Text style={S.required}>*</Text></Text>
//                 <View style={S.passwordRow}>
//                   <TextInput
//                     style={S.passwordInput}
//                     placeholder={t.phPwd}
//                     placeholderTextColor={C.textSecondary}
//                     value={formData.password}
//                     onChangeText={text => handleChange('password', text)}
//                     secureTextEntry={!showPassword}
//                     returnKeyType="next"
//                     blurOnSubmit={false}
//                   />
//                   <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={S.eyeBtn}>
//                     <Text style={S.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* Confirm Password */}
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>{t.labelConfirm} <Text style={S.required}>*</Text></Text>
//                 <View style={S.passwordRow}>
//                   <TextInput
//                     style={S.passwordInput}
//                     placeholder={t.phCpwd}
//                     placeholderTextColor={C.textSecondary}
//                     value={confirmPassword}
//                     onChangeText={setConfirmPassword}
//                     secureTextEntry={!showConfirm}
//                     returnKeyType="next"
//                     blurOnSubmit={false}
//                   />
//                   <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={S.eyeBtn}>
//                     <Text style={S.eyeIcon}>{showConfirm ? '👁️' : '🙈'}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* Email - Optional */}
//               <InputField
//                 label={t.labelEmail}
//                 field="email"
//                 placeholder={t.phEmail}
//                 keyboardType="email-address"
//                 formData={formData}
//                 handleChange={handleChange}
//                 optional
//                 optionalText={t.optional}
//               />

//               {/* Address - Optional */}
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>
//                   {t.labelAddress} <Text style={S.optional}>{t.optional}</Text>
//                 </Text>
//                 <TextInput
//                   style={[S.input, { height: 80, paddingTop: 12, textAlignVertical: 'top' }]}
//                   placeholder={t.phAddr}
//                   placeholderTextColor={C.textSecondary}
//                   value={formData.address}
//                   onChangeText={text => handleChange('address', text)}
//                   multiline
//                   returnKeyType="done"
//                   onSubmitEditing={handleRegister}
//                 />
//               </View>

//               {/* REGISTER BUTTON */}
//               <TouchableOpacity
//                 style={[S.primaryBtn, loading && S.btnDisabled]}
//                 onPress={handleRegister}
//                 disabled={loading}
//               >
//                 {loading
//                   ? <ActivityIndicator color={C.white} />
//                   : <Text style={S.primaryBtnText}>{t.btnCreate}</Text>
//                 }
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Login')}
//                 style={S.linkBtn}
//               >
//                 <Text style={S.linkText}>{t.btnSignin}</Text>
//               </TouchableOpacity>

//             </View>

//             <View style={{ height: 60 }} />

//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default RegisterScreen;

// const S = StyleSheet.create({
//   safe:   { flex: 1, backgroundColor: '#F8F8F8' },
//   scroll: { flexGrow: 1, paddingBottom: 20 },

//   header: {
//     flexDirection: 'row', alignItems: 'center', gap: 12,
//     backgroundColor: C.white, padding: 20, paddingTop: 16,
//     borderBottomWidth: 1, borderBottomColor: C.border,
//   },
//   backBtn: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: C.primaryLight, alignItems: 'center', justifyContent: 'center',
//   },
//   backArrow:   { fontSize: 18, color: C.primary },
//   headerTitle: { fontSize: 22, fontWeight: '700', color: C.textPrimary },
//   headerSub:   { fontSize: 13, color: C.textSecondary, marginTop: 2 },

//   langBtn: {
//     borderWidth: 1.5, borderColor: C.primary, borderRadius: 20,
//     paddingVertical: 5, paddingHorizontal: 12,
//   },
//   langBtnText: { color: C.primary, fontSize: 13, fontWeight: '600' },

//   form: { padding: 16 },

//   fieldWrap: { marginBottom: 16 },
//   label: {
//     fontSize: 12, fontWeight: '600', color: C.textSecondary,
//     marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase',
//   },
//   required: { color: C.error },
//   optional: { color: C.textSecondary, fontWeight: '400', textTransform: 'none' },

//   input: {
//     height: 50, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, fontSize: 15, color: C.textPrimary, backgroundColor: C.white,
//   },
//   passwordRow: {
//     flexDirection: 'row', alignItems: 'center', height: 50,
//     borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     backgroundColor: C.white, paddingRight: 8,
//   },
//   passwordInput: { flex: 1, paddingHorizontal: 14, fontSize: 15, color: C.textPrimary },
//   eyeBtn:  { padding: 8 },
//   eyeIcon: { fontSize: 18 },

//   primaryBtn: {
//     height: 52, backgroundColor: C.primary, borderRadius: 12,
//     alignItems: 'center', justifyContent: 'center', marginTop: 8,
//     shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
//   },
//   btnDisabled:    { opacity: 0.6 },
//   primaryBtnText: { color: C.white, fontSize: 16, fontWeight: '700' },

//   linkBtn:  { alignItems: 'center', marginTop: 20 },
//   linkText: { color: C.primary, fontSize: 14, fontWeight: '600' },
// });

// import { useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { customerAPI } from '../services/api';

// const C = {
//   primary:       '#FF6A00',
//   primaryLight:  '#FFF4EC',
//   white:         '#FFFFFF',
//   textPrimary:   '#111111',
//   textSecondary: '#666666',
//   border:        '#EEEEEE',
//   bg:            '#F8F8F8',
//   error:         '#EF4444',
// };

// const LANG = {
//   en: {
//     headerTitle: 'Create Account',
//     headerSub:   "Join us today, it's free",
//     labelName:    'Full Name',
//     labelPhone:   'Phone Number',
//     labelPassword:'Password',
//     labelConfirm: 'Confirm Password',
//     labelEmail:   'Email',
//     labelAddress: 'Address',
//     optional:     '(optional)',
//     phName:   'Your full name',
//     phPhone:  '10-digit mobile number',
//     phPwd:    'Min 6 characters',
//     phCpwd:   'Re-enter password',
//     phEmail:  'your@email.com',
//     phAddr:   'Your full address',
//     btnCreate:  'Create Account →',
//     btnSignin:  'Already have an account? Sign In',
//     toggle:     'தமிழ்',
//     errRequired: 'Please fill all required fields',
//     errPhone:    'Phone number must be exactly 10 digits',
//     errPwd:      'Password must be at least 6 characters',
//     errMatch:    'Passwords do not match',
//     successTitle:'Success',
//     successMsg:  'Registration successful!',
//     ok:          'OK',
//     errTitle:    'Registration Failed',
//   },
//   ta: {
//     headerTitle: 'கணக்கு உருவாக்கு',
//     headerSub:   'இன்றே சேருங்கள், இலவசம்',
//     labelName:    'முழு பெயர்',
//     labelPhone:   'தொலைபேசி எண்',
//     labelPassword:'கடவுச்சொல்',
//     labelConfirm: 'கடவுச்சொல் உறுதிப்படுத்து',
//     labelEmail:   'மின்னஞ்சல்',
//     labelAddress: 'முகவரி',
//     optional:     '(விருப்பத்திற்குரியது)',
//     phName:   'உங்கள் முழு பெயர்',
//     phPhone:  '10 இலக்க மொபைல் எண்',
//     phPwd:    'குறைந்தது 6 எழுத்துகள்',
//     phCpwd:   'கடவுச்சொல்லை மீண்டும் உள்ளிடவும்',
//     phEmail:  'உங்கள்@மின்னஞ்சல்.com',
//     phAddr:   'உங்கள் முழு முகவரி',
//     btnCreate:  'கணக்கு உருவாக்கு →',
//     btnSignin:  'ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக',
//     toggle:     'English',
//     errRequired: 'தேவையான அனைத்து தகவல்களையும் நிரப்பவும்',
//     errPhone:    'தொலைபேசி எண் சரியாக 10 இலக்கங்களாக இருக்க வேண்டும்',
//     errPwd:      'கடவுச்சொல் குறைந்தது 6 எழுத்துகளாக இருக்க வேண்டும்',
//     errMatch:    'கடவுச்சொற்கள் பொருந்தவில்லை',
//     successTitle:'வெற்றி',
//     successMsg:  'பதிவு வெற்றிகரமாக முடிந்தது!',
//     ok:          'சரி',
//     errTitle:    'பதிவு தோல்வியடைந்தது',
//   },
// };

// const InputField = ({ label, field, placeholder, keyboardType = 'default', maxLength, returnKeyType = 'next', onSubmitEditing, formData, handleChange, optional, optionalText }) => (
//   <View style={S.fieldWrap}>
//     <Text style={S.label}>
//       {label}{' '}
//       {optional
//         ? <Text style={S.optional}>{optionalText}</Text>
//         : <Text style={S.required}>*</Text>
//       }
//     </Text>
//     <TextInput
//       style={S.input}
//       placeholder={placeholder}
//       placeholderTextColor={C.textSecondary}
//       value={formData[field]}
//       onChangeText={t => handleChange(field, t)}
//       keyboardType={keyboardType}
//       maxLength={maxLength}
//       returnKeyType={returnKeyType}
//       onSubmitEditing={onSubmitEditing}
//       blurOnSubmit={false}
//     />
//   </View>
// );

// const RegisterScreen = ({ navigation }) => {
//   const [formData, setFormData] = useState({ name: '', phoneNumber: '', email: '', password: '', address: '' });
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [lang, setLang] = useState('en');

//   const t = LANG[lang];

//   const handleChange = (field, value) => {
//     if (field === 'phoneNumber') value = value.replace(/[^0-9]/g, '');
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleRegister = async () => {
//     Keyboard.dismiss();
//     const { name, phoneNumber, password } = formData;

//     if (!name || !phoneNumber || !password) {
//       Alert.alert('Error', t.errRequired);
//       return;
//     }
//     if (!/^\d{10}$/.test(phoneNumber)) {
//       Alert.alert('Error', t.errPhone);
//       return;
//     }
//     if (password.length < 6) {
//       Alert.alert('Error', t.errPwd);
//       return;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert('Error', t.errMatch);
//       return;
//     }

//     setLoading(true);
//     try {
//       await customerAPI.register(formData);
//       Alert.alert(t.successTitle, t.successMsg, [
//         { text: t.ok, onPress: () => navigation.navigate('Login') }
//       ]);
//     } catch (error) {
//       Alert.alert(t.errTitle, error.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={S.safe}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={S.scroll}
//             keyboardShouldPersistTaps="handled"
//             bounces={false}
//           >
//             {/* HEADER */}
//             <View style={S.header}>
//               <TouchableOpacity
//                 style={S.backBtn}
//                 onPress={() => navigation.navigate('Login')}
//               >
//                 <Text style={S.backArrow}>←</Text>
//               </TouchableOpacity>
//               <View style={{ flex: 1 }}>
//                 <Text style={S.headerTitle}>{t.headerTitle}</Text>
//                 <Text style={S.headerSub}>{t.headerSub}</Text>
//               </View>
//               <View style={S.langToggle}>
//                 <TouchableOpacity
//                   style={[S.langOption, lang === 'en' && S.langActive]}
//                   onPress={() => setLang('en')}
//                 >
//                   <Text style={[S.langOptionText, lang === 'en' && S.langActiveText]}>EN</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[S.langOption, lang === 'ta' && S.langActive]}
//                   onPress={() => setLang('ta')}
//                 >
//                   <Text style={[S.langOptionText, lang === 'ta' && S.langActiveText]}>த</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View style={S.form}>

//               <InputField
//                 label={t.labelName}
//                 field="name"
//                 placeholder={t.phName}
//                 formData={formData}
//                 handleChange={handleChange}
//               />
//               <InputField
//                 label={t.labelPhone}
//                 field="phoneNumber"
//                 placeholder={t.phPhone}
//                 keyboardType="number-pad"
//                 maxLength={10}
//                 formData={formData}
//                 handleChange={handleChange}
//               />

//               {/* Password */}
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>{t.labelPassword} <Text style={S.required}>*</Text></Text>
//                 <View style={S.passwordRow}>
//                   <TextInput
//                     style={S.passwordInput}
//                     placeholder={t.phPwd}
//                     placeholderTextColor={C.textSecondary}
//                     value={formData.password}
//                     onChangeText={text => handleChange('password', text)}
//                     secureTextEntry={!showPassword}
//                     returnKeyType="next"
//                     blurOnSubmit={false}
//                   />
//                   <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={S.eyeBtn}>
//                     <Text style={S.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* Confirm Password */}
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>{t.labelConfirm} <Text style={S.required}>*</Text></Text>
//                 <View style={S.passwordRow}>
//                   <TextInput
//                     style={S.passwordInput}
//                     placeholder={t.phCpwd}
//                     placeholderTextColor={C.textSecondary}
//                     value={confirmPassword}
//                     onChangeText={setConfirmPassword}
//                     secureTextEntry={!showConfirm}
//                     returnKeyType="next"
//                     blurOnSubmit={false}
//                   />
//                   <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={S.eyeBtn}>
//                     <Text style={S.eyeIcon}>{showConfirm ? '👁️' : '🙈'}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* Email - Optional */}
//               <InputField
//                 label={t.labelEmail}
//                 field="email"
//                 placeholder={t.phEmail}
//                 keyboardType="email-address"
//                 formData={formData}
//                 handleChange={handleChange}
//                 optional
//                 optionalText={t.optional}
//               />

//               {/* Address - Optional */}
//               <View style={S.fieldWrap}>
//                 <Text style={S.label}>
//                   {t.labelAddress} <Text style={S.optional}>{t.optional}</Text>
//                 </Text>
//                 <TextInput
//                   style={[S.input, { height: 80, paddingTop: 12, textAlignVertical: 'top' }]}
//                   placeholder={t.phAddr}
//                   placeholderTextColor={C.textSecondary}
//                   value={formData.address}
//                   onChangeText={text => handleChange('address', text)}
//                   multiline
//                   returnKeyType="done"
//                   onSubmitEditing={handleRegister}
//                 />
//               </View>

//               {/* REGISTER BUTTON */}
//               <TouchableOpacity
//                 style={[S.primaryBtn, loading && S.btnDisabled]}
//                 onPress={handleRegister}
//                 disabled={loading}
//               >
//                 {loading
//                   ? <ActivityIndicator color={C.white} />
//                   : <Text style={S.primaryBtnText}>{t.btnCreate}</Text>
//                 }
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Login')}
//                 style={S.linkBtn}
//               >
//                 <Text style={S.linkText}>{t.btnSignin}</Text>
//               </TouchableOpacity>

//             </View>

//             <View style={{ height: 60 }} />

//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default RegisterScreen;

// const S = StyleSheet.create({
//   safe:   { flex: 1, backgroundColor: '#F8F8F8' },
//   scroll: { flexGrow: 1, paddingBottom: 20 },

//   header: {
//     flexDirection: 'row', alignItems: 'center', gap: 12,
//     backgroundColor: C.white, padding: 20, paddingTop: 16,
//     borderBottomWidth: 1, borderBottomColor: C.border,
//   },
//   backBtn: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: C.primaryLight, alignItems: 'center', justifyContent: 'center',
//   },
//   backArrow:   { fontSize: 18, color: C.primary },
//   headerTitle: { fontSize: 22, fontWeight: '700', color: C.textPrimary },
//   headerSub:   { fontSize: 13, color: C.textSecondary, marginTop: 2 },

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

//   form: { padding: 16 },

//   fieldWrap: { marginBottom: 16 },
//   label: {
//     fontSize: 12, fontWeight: '600', color: C.textSecondary,
//     marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase',
//   },
//   required: { color: C.error },
//   optional: { color: C.textSecondary, fontWeight: '400', textTransform: 'none' },

//   input: {
//     height: 50, borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     paddingHorizontal: 14, fontSize: 15, color: C.textPrimary, backgroundColor: C.white,
//   },
//   passwordRow: {
//     flexDirection: 'row', alignItems: 'center', height: 50,
//     borderWidth: 1, borderColor: C.border, borderRadius: 12,
//     backgroundColor: C.white, paddingRight: 8,
//   },
//   passwordInput: { flex: 1, paddingHorizontal: 14, fontSize: 15, color: C.textPrimary },
//   eyeBtn:  { padding: 8 },
//   eyeIcon: { fontSize: 18 },

//   primaryBtn: {
//     height: 52, backgroundColor: C.primary, borderRadius: 12,
//     alignItems: 'center', justifyContent: 'center', marginTop: 8,
//     shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
//   },
//   btnDisabled:    { opacity: 0.6 },
//   primaryBtnText: { color: C.white, fontSize: 16, fontWeight: '700' },

//   linkBtn:  { alignItems: 'center', marginTop: 20 },
//   linkText: { color: C.primary, fontSize: 14, fontWeight: '600' },
// });


import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
  error:         '#EF4444',
};

const LANG = {
  en: {
    headerTitle:  'Create Account',
    headerSub:    "Join us today, it's free",
    labelName:    'Full Name',
    labelPhone:   'Phone Number',
    labelPassword:'Password',
    labelConfirm: 'Confirm Password',
    labelEmail:   'Email',
    labelAddress: 'Address',
    optional:     '(optional)',
    phName:   'Your full name',
    phPhone:  '10-digit mobile number',
    phPwd:    'Min 8 chars, uppercase, number & symbol',
    phCpwd:   'Re-enter password',
    phEmail:  'your@email.com',
    phAddr:   'Your full address',
    btnCreate:  'Create Account →',
    btnSignin:  'Already have an account? Sign In',
    errRequired: 'Please fill all required fields',
    errPhone:    'Phone number must be exactly 10 digits',
    errPwd:      'Password must be at least 8 characters',
    errPwdWeak:  'Password must include uppercase letter, number & special character (!@#$%^&*)',
    errMatch:    'Passwords do not match',
    successTitle:'Success',
    successMsg:  'Registration successful!',
    ok:          'OK',
    errTitle:    'Registration Failed',
    passStrengthWeak:   'Weak',
    passStrengthFair:   'Fair',
    passStrengthGood:   'Good',
    passStrengthStrong: 'Strong',
  },
  ta: {
    headerTitle:  'கணக்கு உருவாக்கு',
    headerSub:    'இன்றே சேருங்கள், இலவசம்',
    labelName:    'முழு பெயர்',
    labelPhone:   'தொலைபேசி எண்',
    labelPassword:'கடவுச்சொல்',
    labelConfirm: 'கடவுச்சொல் உறுதிப்படுத்து',
    labelEmail:   'மின்னஞ்சல்',
    labelAddress: 'முகவரி',
    optional:     '(விருப்பத்திற்குரியது)',
    phName:   'உங்கள் முழு பெயர்',
    phPhone:  '10 இலக்க மொபைல் எண்',
    phPwd:    'குறைந்தது 8 எழுத்துகள், பெரிய எழுத்து, எண் & சின்னம்',
    phCpwd:   'கடவுச்சொல்லை மீண்டும் உள்ளிடவும்',
    phEmail:  'உங்கள்@மின்னஞ்சல்.com',
    phAddr:   'உங்கள் முழு முகவரி',
    btnCreate:  'கணக்கு உருவாக்கு →',
    btnSignin:  'ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக',
    errRequired: 'தேவையான அனைத்து தகவல்களையும் நிரப்பவும்',
    errPhone:    'தொலைபேசி எண் சரியாக 10 இலக்கங்களாக இருக்க வேண்டும்',
    errPwd:      'கடவுச்சொல் குறைந்தது 8 எழுத்துகளாக இருக்க வேண்டும்',
    errPwdWeak:  'கடவுச்சொல்லில் பெரிய எழுத்து, எண் & சிறப்பு எழுத்து (!@#$%^&*) இருக்க வேண்டும்',
    errMatch:    'கடவுச்சொற்கள் பொருந்தவில்லை',
    successTitle:'வெற்றி',
    successMsg:  'பதிவு வெற்றிகரமாக முடிந்தது!',
    ok:          'சரி',
    errTitle:    'பதிவு தோல்வியடைந்தது',
    passStrengthWeak:   'பலவீனம்',
    passStrengthFair:   'சாதாரணம்',
    passStrengthGood:   'நல்லது',
    passStrengthStrong: 'வலுவான',
  },
};

// ── Password strength (same logic as LoginScreen) ────────
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

const isStrongPassword = (pass) =>
  pass.length >= 8 &&
  /[A-Z]/.test(pass) &&
  /[0-9]/.test(pass) &&
  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);

const STRENGTH_COLOR = {
  weak:   '#F44336',
  fair:   '#FF9800',
  good:   '#2196F3',
  strong: '#4CAF50',
};
const STRENGTH_WIDTH = { weak: '25%', fair: '50%', good: '75%', strong: '100%' };

// ── Confirm password match indicator ─────────────────────
const MatchIndicator = ({ password, confirm, t }) => {
  if (!confirm) return null;
  const match = password === confirm;
  return (
    <View style={S.matchRow}>
      <Text style={{ fontSize: 12, color: match ? '#4CAF50' : '#F44336', fontWeight: '600' }}>
        {match ? '✓ Passwords match' : '✗ Passwords do not match'}
      </Text>
    </View>
  );
};

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData]         = useState({ name: '', phoneNumber: '', email: '', password: '', address: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading]           = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [lang, setLang]                 = useState('en');

  const t = LANG[lang];

  const passStrength   = getPasswordStrength(formData.password);
  const strengthLabel  = passStrength ? t[`passStrength${passStrength.charAt(0).toUpperCase() + passStrength.slice(1)}`] : '';

  const handleChange = (field, value) => {
    if (field === 'phoneNumber') value = value.replace(/[^0-9]/g, '');
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    Keyboard.dismiss();
    const { name, phoneNumber, password } = formData;

    if (!name || !phoneNumber || !password) {
      Alert.alert('Error', t.errRequired);
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert('Error', t.errPhone);
      return;
    }
    if (password.length < 8) {
      Alert.alert('Error', t.errPwd);
      return;
    }
    if (!isStrongPassword(password)) {
      Alert.alert('Error', t.errPwdWeak);
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', t.errMatch);
      return;
    }

    setLoading(true);
    try {
      await customerAPI.register(formData);
      Alert.alert(t.successTitle, t.successMsg, [
        { text: t.ok, onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      Alert.alert(t.errTitle, error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={S.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={S.scroll}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            {/* ── HEADER ── */}
            <View style={S.header}>
              <TouchableOpacity
                style={S.backBtn}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={S.backArrow}>←</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Text style={S.headerTitle}>{t.headerTitle}</Text>
                <Text style={S.headerSub}>{t.headerSub}</Text>
              </View>
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
            </View>

            <View style={S.form}>

              {/* ── Full Name ── */}
              <View style={S.fieldWrap}>
                <Text style={S.label}>{t.labelName} <Text style={S.required}>*</Text></Text>
                <TextInput
                  style={S.input}
                  placeholder={t.phName}
                  placeholderTextColor={C.textSecondary}
                  value={formData.name}
                  onChangeText={v => handleChange('name', v)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>

              {/* ── Phone ── */}
              <View style={S.fieldWrap}>
                <Text style={S.label}>{t.labelPhone} <Text style={S.required}>*</Text></Text>
                <View style={S.prefixRow}>
                  <View style={S.prefixBox}>
                    <Text style={S.prefixText}>+91</Text>
                  </View>
                  <View style={S.prefixDivider} />
                  <TextInput
                    style={S.prefixInput}
                    placeholder={t.phPhone}
                    placeholderTextColor={C.textSecondary}
                    value={formData.phoneNumber}
                    onChangeText={v => handleChange('phoneNumber', v)}
                    keyboardType="number-pad"
                    maxLength={10}
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                </View>
              </View>

              {/* ── Password ── */}
              <View style={S.fieldWrap}>
                <Text style={S.label}>{t.labelPassword} <Text style={S.required}>*</Text></Text>
                <View style={S.passwordRow}>
                  <TextInput
                    style={S.passwordInput}
                    placeholder={t.phPwd}
                    placeholderTextColor={C.textSecondary}
                    value={formData.password}
                    onChangeText={v => handleChange('password', v)}
                    secureTextEntry={!showPassword}
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(p => !p)} style={S.eyeBtn}>
                    <Text style={S.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
                  </TouchableOpacity>
                </View>
                {/* Strength bar */}
                {formData.password.length > 0 && (
                  <View style={S.strengthWrap}>
                    <View style={S.strengthBarBg}>
                      <View style={[
                        S.strengthBarFill,
                        { width: STRENGTH_WIDTH[passStrength], backgroundColor: STRENGTH_COLOR[passStrength] },
                      ]} />
                    </View>
                    <Text style={[S.strengthLabel, { color: STRENGTH_COLOR[passStrength] }]}>
                      {strengthLabel}
                    </Text>
                  </View>
                )}
                {/* Hint text */}
                {formData.password.length > 0 && passStrength !== 'strong' && (
                  <Text style={S.passHint}>
                    {lang === 'en'
                      ? 'Use uppercase, number & special char (!@#$%^&*)'
                      : 'பெரிய எழுத்து, எண் & சிறப்பு குறி (!@#$%^&*) சேர்க்கவும்'}
                  </Text>
                )}
              </View>

              {/* ── Confirm Password ── */}
              <View style={S.fieldWrap}>
                <Text style={S.label}>{t.labelConfirm} <Text style={S.required}>*</Text></Text>
                <View style={S.passwordRow}>
                  <TextInput
                    style={S.passwordInput}
                    placeholder={t.phCpwd}
                    placeholderTextColor={C.textSecondary}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirm}
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                  <TouchableOpacity onPress={() => setShowConfirm(p => !p)} style={S.eyeBtn}>
                    <Text style={S.eyeIcon}>{showConfirm ? '👁️' : '🙈'}</Text>
                  </TouchableOpacity>
                </View>
                {/* Match indicator */}
                <MatchIndicator password={formData.password} confirm={confirmPassword} t={t} />
              </View>

              {/* ── Email (optional) ── */}
              <View style={S.fieldWrap}>
                <Text style={S.label}>
                  {t.labelEmail} <Text style={S.optional}>{t.optional}</Text>
                </Text>
                <TextInput
                  style={S.input}
                  placeholder={t.phEmail}
                  placeholderTextColor={C.textSecondary}
                  value={formData.email}
                  onChangeText={v => handleChange('email', v)}
                  keyboardType="email-address"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>

              {/* ── Address (optional) ── */}
              <View style={S.fieldWrap}>
                <Text style={S.label}>
                  {t.labelAddress} <Text style={S.optional}>{t.optional}</Text>
                </Text>
                <TextInput
                  style={[S.input, { height: 80, paddingTop: 12, textAlignVertical: 'top' }]}
                  placeholder={t.phAddr}
                  placeholderTextColor={C.textSecondary}
                  value={formData.address}
                  onChangeText={v => handleChange('address', v)}
                  multiline
                  returnKeyType="done"
                  onSubmitEditing={handleRegister}
                />
              </View>

              {/* ── Register Button ── */}
              <TouchableOpacity
                style={[S.primaryBtn, loading && S.btnDisabled]}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading
                  ? <ActivityIndicator color={C.white} />
                  : <Text style={S.primaryBtnText}>{t.btnCreate}</Text>
                }
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={S.linkBtn}
              >
                <Text style={S.linkText}>{t.btnSignin}</Text>
              </TouchableOpacity>

            </View>

            <View style={{ height: 60 }} />

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const S = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#F8F8F8' },
  scroll: { flexGrow: 1, paddingBottom: 20 },

  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: C.white, padding: 20, paddingTop: 16,
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: C.primaryLight, alignItems: 'center', justifyContent: 'center',
  },
  backArrow:   { fontSize: 18, color: C.primary },
  headerTitle: { fontSize: 22, fontWeight: '700', color: C.textPrimary },
  headerSub:   { fontSize: 13, color: C.textSecondary, marginTop: 2 },

  langToggle: {
    flexDirection: 'row', borderWidth: 1.5,
    borderColor: C.border, borderRadius: 10, overflow: 'hidden',
  },
  langOption:     { paddingVertical: 6, paddingHorizontal: 14, backgroundColor: C.white },
  langActive:     { backgroundColor: C.primary },
  langOptionText: { fontSize: 13, fontWeight: '700', color: C.textSecondary },
  langActiveText: { color: C.white },

  form: { padding: 16 },

  fieldWrap: { marginBottom: 16 },
  label: {
    fontSize: 12, fontWeight: '600', color: C.textSecondary,
    marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase',
  },
  required: { color: C.error },
  optional: { color: C.textSecondary, fontWeight: '400', textTransform: 'none' },

  input: {
    height: 50, borderWidth: 1, borderColor: C.border, borderRadius: 12,
    paddingHorizontal: 14, fontSize: 15, color: C.textPrimary, backgroundColor: C.white,
  },

  // ── Phone prefix row ──────────────────────────────────
  prefixRow: {
    flexDirection: 'row', alignItems: 'center', height: 50,
    borderWidth: 1, borderColor: C.border, borderRadius: 12,
    backgroundColor: C.white, paddingHorizontal: 14,
  },
  prefixBox:    { marginRight: 6 },
  prefixText:   { fontSize: 14, fontWeight: '700', color: C.textPrimary },
  prefixDivider:{ width: 1, height: 22, backgroundColor: C.border, marginRight: 10 },
  prefixInput:  { flex: 1, fontSize: 15, color: C.textPrimary },

  // ── Password row ──────────────────────────────────────
  passwordRow: {
    flexDirection: 'row', alignItems: 'center', height: 50,
    borderWidth: 1, borderColor: C.border, borderRadius: 12,
    backgroundColor: C.white, paddingRight: 8,
  },
  passwordInput: { flex: 1, paddingHorizontal: 14, fontSize: 15, color: C.textPrimary },
  eyeBtn:        { padding: 8 },
  eyeIcon:       { fontSize: 18 },

  // ── Strength bar ──────────────────────────────────────
  strengthWrap: {
    flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8,
  },
  strengthBarBg: {
    flex: 1, height: 4, backgroundColor: '#ECECEC', borderRadius: 2, overflow: 'hidden',
  },
  strengthBarFill: { height: '100%', borderRadius: 2 },
  strengthLabel:   { fontSize: 11, fontWeight: '700', minWidth: 52, textAlign: 'right' },

  passHint: {
    fontSize: 11, color: C.textSecondary, marginTop: 5, marginLeft: 2,
  },

  // ── Match indicator ───────────────────────────────────
  matchRow: { marginTop: 6, marginLeft: 2 },

  // ── Buttons ───────────────────────────────────────────
  primaryBtn: {
    height: 52, backgroundColor: C.primary, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
    shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  btnDisabled:    { opacity: 0.6 },
  primaryBtnText: { color: C.white, fontSize: 16, fontWeight: '700' },

  linkBtn:  { alignItems: 'center', marginTop: 20 },
  linkText: { color: C.primary, fontSize: 14, fontWeight: '600' },
});