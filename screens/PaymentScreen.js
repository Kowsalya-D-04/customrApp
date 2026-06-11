// import { useEffect, useState } from 'react';
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
//   View
// } from 'react-native';
// import QRCode from 'react-native-qrcode-svg';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { customerAPI } from '../services/api';

// const PaymentScreen = ({ route, navigation }) => {

//   const tripId = route?.params?.tripId;

//   const [paymentData, setPaymentData] = useState({
//     amount: '',
//     paymentMode: 'CASH',
//   });

//   const [loading, setLoading] = useState(false);
//   const [showQR, setShowQR] = useState(false);

//   useEffect(() => {
//     if (!tripId) {
//       Alert.alert(
//         'Error',
//         'Trip ID missing',
//         [{ text: 'Go Back', onPress: () => navigation.goBack() }]
//       );
//     }
//   }, []);

//   const handleChange = (field, value) => {
//     setPaymentData(prev => ({ ...prev, [field]: value }));
//   };

//   const handlePayment = async () => {

//     if (!tripId) return;

//     const { amount, paymentMode } = paymentData;

//     if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
//       Alert.alert('Error', 'Enter valid amount');
//       return;
//     }

//     setLoading(true);

//     try {

//       const payload = {
//         amount: parseFloat(amount),
//         paymentMode: paymentMode,
//       };

//       const response = await customerAPI.makePayment(tripId, payload);

//       if (response.data.success) {

//         Alert.alert(
//           "Payment Success",
//           `Payment ID: ${response.data.paymentId}`,
//           [
//             {
//               text: "OK",
//               onPress: () =>
//                 navigation.replace("TripStatus", {
//                   loadRequestId: route.params.loadRequestId,
//                 }),
//             },
//           ]
//         );

//       } else {
//         Alert.alert("Error", response.data.message);
//       }

//     } catch (error) {

//       Alert.alert(
//         "Payment Failed",
//         error.response?.data?.message || "Try again"
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>

//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >

//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           keyboardShouldPersistTaps="handled"
//         >

//           {/* HEADER */}
//           <View style={styles.header}>
//             <Text style={styles.title}>Payment</Text>
//             <Text style={styles.subtitle}>Trip ID: {tripId}</Text>
//           </View>

//           {/* CARD */}
//           <View style={styles.card}>

//             {/* AMOUNT */}
//             <Text style={styles.label}>Amount (₹)</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter amount"
//               keyboardType="numeric"
//               value={paymentData.amount}
//               onChangeText={(t) => handleChange('amount', t)}
//             />

//             {/* PAYMENT MODE */}
//             <Text style={styles.label}>Payment Mode</Text>

//             <View style={styles.modeRow}>
//               {['CASH', 'UPI', 'CARD'].map((mode) => (
//                 <TouchableOpacity
//                   key={mode}
//                   style={[
//                     styles.modeBtn,
//                     paymentData.paymentMode === mode && styles.selectedMode,
//                   ]}
//                   onPress={() => {
//                     handleChange('paymentMode', mode);
//                     setShowQR(mode === 'UPI');
//                   }}
//                 >
//                   <Icon
//                     name={
//                       mode === 'CASH'
//                         ? 'payments'
//                         : mode === 'UPI'
//                         ? 'qr-code'
//                         : 'credit-card'
//                     }
//                     size={22}
//                     color={paymentData.paymentMode === mode ? 'white' : '#555'}
//                   />
//                   <Text
//                     style={[
//                       styles.modeText,
//                       paymentData.paymentMode === mode && styles.selectedText,
//                     ]}
//                   >
//                     {mode}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* QR */}
//             {showQR && (
//               <View style={styles.qrContainer}>
//                 <Text style={styles.qrTitle}>Scan & Pay</Text>

//                 <QRCode
//                   value={`upi://pay?pa=abc@okaxis&pn=TruckApp&am=${paymentData.amount || 0}&cu=INR`}
//                   size={200}
//                 />

//                 <Text style={styles.qrNote}>UPI ID: abc@okaxis</Text>
//               </View>
//             )}

//             {/* PAY BUTTON */}
//             <TouchableOpacity
//               style={[styles.payButton, loading && styles.disabled]}
//               onPress={handlePayment}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="white" />
//               ) : (
//                 <Text style={styles.payText}>PAY NOW</Text>
//               )}
//             </TouchableOpacity>

//           </View>

//         </ScrollView>

//       </KeyboardAvoidingView>

//     </SafeAreaView>
//   );
// };

// export default PaymentScreen;

// /* STYLES */

// const styles = StyleSheet.create({

//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f5f6fa',
//   },

//   scrollContainer: {
//     paddingBottom: 30, // ✅ prevents bottom cut
//   },

//   header: {
//     padding: 20,
//     backgroundColor: 'white',
//   },

//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//   },

//   subtitle: {
//     marginTop: 5,
//     color: '#777',
//   },

//   card: {
//     margin: 20,
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 15,
//     elevation: 4,
//   },

// label: {
//   marginTop: 12,
//   marginBottom: 10,   // ✅ add this
//   fontWeight: '600',
//   color: '#444',
// },

// input: {
//   borderWidth: 1,
//   borderColor: '#ddd',
//   borderRadius: 10,
//   padding: 12,
//   marginTop: 4,      // ✅ remove this
// },

//   modeRow: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },

//   modeBtn: {
//     flex: 1,
//     padding: 14,
//     margin: 5,
//     borderRadius: 10,
//     alignItems: 'center',
//     backgroundColor: '#eee',
//   },

//   selectedMode: {
//     backgroundColor: '#3498db',
//   },

//   modeText: {
//     marginTop: 5,
//     color: '#555',
//   },

//   selectedText: {
//     color: 'white',
//   },

//   qrContainer: {
//     alignItems: 'center',
//     marginTop: 20,
//   },

//   qrTitle: {
//     fontWeight: '600',
//     marginBottom: 10,
//   },

//   qrNote: {
//     marginTop: 10,
//     color: '#555',
//   },

//   payButton: {
//     marginTop: 25,
//     backgroundColor: '#2E7D32',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//   },

//   disabled: {
//     backgroundColor: '#aaa',
//   },

//   payText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

// });

import { useEffect, useState } from 'react';
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
import QRCode from 'react-native-qrcode-svg';
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
};
 
const MODES = [
  { key: 'CASH', label: 'Cash', emoji: '💵' },
  { key: 'UPI',  label: 'UPI',  emoji: '📱' },
  { key: 'CARD', label: 'Card', emoji: '💳' },
];
 
const PaymentScreen = ({ route, navigation }) => {
  const tripId = route?.params?.tripId;
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('CASH');
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    if (!tripId) Alert.alert('Error', 'Trip ID missing', [{ text: 'Go Back', onPress: () => navigation.goBack() }]);
  }, []);
 
  const handlePayment = async () => {
    if (!tripId) return;
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) { Alert.alert('Error', 'Enter a valid amount'); return; }
    setLoading(true);
    try {
      const response = await customerAPI.makePayment(tripId, { amount: parseFloat(amount), paymentMode });
      if (response.data.success) {
        Alert.alert('Payment Successful 🎉', `Payment ID: ${response.data.paymentId}`, [
          { text: 'OK', onPress: () => navigation.replace('TripStatus', { loadRequestId: route.params.loadRequestId }) },
        ]);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert('Payment Failed', error.response?.data?.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <SafeAreaView style={S.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={S.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
 
          {/* HEADER */}
          <View style={S.header}>
            <TouchableOpacity style={S.backBtn} onPress={() => navigation.goBack()}>
              <Text style={S.backArrow}>←</Text>
            </TouchableOpacity>
            <View>
              <Text style={S.headerTitle}>Payment</Text>
              <Text style={S.headerSub}>Trip ID: {tripId}</Text>
            </View>
          </View>
 
          {/* AMOUNT CARD */}
          <View style={S.card}>
            <Text style={S.cardLabel}>AMOUNT (₹)</Text>
            <TextInput
              style={S.amountInput}
              placeholder="0.00"
              placeholderTextColor="#CCC"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <Text style={S.amountHint}>Enter the amount to pay for your trip</Text>
          </View>
 
          {/* MODE CARD */}
          <View style={S.card}>
            <Text style={S.cardLabel}>PAYMENT METHOD</Text>
            <View style={S.modesRow}>
              {MODES.map((m) => {
                const active = paymentMode === m.key;
                return (
                  <TouchableOpacity
                    key={m.key}
                    style={[S.modeBtn, active && S.modeBtnActive]}
                    onPress={() => setPaymentMode(m.key)}
                  >
                    <Text style={S.modeEmoji}>{m.emoji}</Text>
                    <Text style={[S.modeLabel, active && S.modeLabelActive]}>{m.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
 
          {/* UPI QR */}
          {paymentMode === 'UPI' && (
            <View style={S.card}>
              <Text style={S.cardLabel}>SCAN & PAY</Text>
              <View style={S.qrWrap}>
                <View style={S.qrBox}>
                  <QRCode
                    value={`upi://pay?pa=abc@okaxis&pn=TruckApp&am=${amount || 0}&cu=INR`}
                    size={180}
                  />
                </View>
                <Text style={S.qrUpiId}>UPI ID: abc@okaxis</Text>
                {amount ? (
                  <Text style={S.qrAmount}>Amount: ₹{amount}</Text>
                ) : (
                  <Text style={S.qrHint}>Enter amount above to generate QR</Text>
                )}
              </View>
            </View>
          )}
 
          {/* SUMMARY */}
          <View style={S.summaryCard}>
            <View style={S.summaryRow}>
              <Text style={S.summaryLabel}>Amount</Text>
              <Text style={S.summaryValue}>₹{amount || '0.00'}</Text>
            </View>
            <View style={S.summaryRow}>
              <Text style={S.summaryLabel}>Method</Text>
              <Text style={S.summaryValue}>{MODES.find(m => m.key === paymentMode)?.label}</Text>
            </View>
          </View>
 
          {/* PAY BUTTON */}
          <TouchableOpacity style={[S.payBtn, loading && S.payBtnDisabled]} onPress={handlePayment} disabled={loading}>
            {loading
              ? <ActivityIndicator color={C.white} />
              : <Text style={S.payBtnText}>Confirm Payment →</Text>
            }
          </TouchableOpacity>
 
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
 
export default PaymentScreen;
 
const S = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F8F8' },
  scroll: { padding: 16, paddingBottom: 32 },
 
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#FFFFFF', margin: -16, marginBottom: 0,
    padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEEEEE', marginBottom: 16,
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFF4EC', alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 18, color: '#FF6A00' },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#111111' },
  headerSub: { fontSize: 13, color: '#666666', marginTop: 2 },
 
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 12,
    borderWidth: 1, borderColor: '#EEEEEE',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3,
  },
  cardLabel: { fontSize: 11, fontWeight: '700', color: '#999999', marginBottom: 14, letterSpacing: 1, textTransform: 'uppercase' },
 
  amountInput: {
    fontSize: 40, fontWeight: '800', color: '#111111',
    textAlign: 'center', paddingVertical: 16,
    borderBottomWidth: 2, borderBottomColor: '#FF6A00',
    marginBottom: 10,
  },
  amountHint: { textAlign: 'center', fontSize: 13, color: '#999999' },
 
  modesRow: { flexDirection: 'row', gap: 10 },
  modeBtn: {
    flex: 1, alignItems: 'center', paddingVertical: 16, borderRadius: 12,
    borderWidth: 1.5, borderColor: '#EEEEEE', backgroundColor: '#F8F8F8',
  },
  modeBtnActive: { borderColor: '#FF6A00', backgroundColor: '#FFF4EC' },
  modeEmoji: { fontSize: 24, marginBottom: 6 },
  modeLabel: { fontSize: 13, fontWeight: '600', color: '#666666' },
  modeLabelActive: { color: '#FF6A00' },
 
  qrWrap: { alignItems: 'center', paddingVertical: 8 },
  qrBox: { padding: 16, borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEEEEE', marginBottom: 16 },
  qrUpiId: { fontSize: 15, fontWeight: '600', color: '#111111', marginBottom: 6 },
  qrAmount: { fontSize: 20, fontWeight: '800', color: '#FF6A00' },
  qrHint: { fontSize: 13, color: '#999999', textAlign: 'center' },
 
  summaryCard: {
    backgroundColor: '#FFF4EC', borderRadius: 16, padding: 20, marginBottom: 16,
    borderWidth: 1, borderColor: '#FFD4A8',
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: '#666666' },
  summaryValue: { fontSize: 14, fontWeight: '700', color: '#111111' },
 
  payBtn: {
    backgroundColor: '#FF6A00', borderRadius: 16, paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#FF6A00', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6,
  },
  payBtnDisabled: { opacity: 0.6 },
  payBtnText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
});