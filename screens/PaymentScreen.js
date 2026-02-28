import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { customerAPI } from '../services/api';

const PaymentScreen = ({ route, navigation }) => {
  const tripId = route?.params?.tripId; // UUID string

  const [paymentData, setPaymentData] = useState({
    amount: '',
    paymentMode: 'CASH',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tripId) {
      Alert.alert(
        'Trip Error',
        'Trip ID is missing. Please go back and try again.',
        [{ text: 'Go Back', onPress: () => navigation.goBack() }]
      );
    }
  }, [tripId]);

  const handleChange = (field, value) => {
    setPaymentData({ ...paymentData, [field]: value });
  };

  const handlePayment = async () => {
    if (!tripId) return;

    const { amount, paymentMode } = paymentData;

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        amount: parseFloat(amount),
        paymentMode,
      };

      console.log('PAYMENT REQUEST →', tripId, payload);

      const response = await customerAPI.makePayment(tripId, payload);

      if (response.status === 200) {
        Alert.alert('Success', 'Payment completed successfully', [
          {
            text: 'OK',
            onPress: () =>
              navigation.replace('TripStatus', { loadRequestId: route.params.loadRequestId }),
          },
        ]);
      }
    } catch (error) {
      console.log('Payment error:', error.response?.data || error.message);

      Alert.alert(
        'Payment Failed',
        error.response?.data?.message ||
          'Unable to process payment. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment</Text>
        <Text style={styles.subtitle}>
          Complete payment for trip {tripId}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Amount (₹)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter amount"
          value={paymentData.amount}
          onChangeText={(t) => handleChange('amount', t)}
        />

        <Text style={styles.label}>Payment Mode</Text>

        <View style={styles.modeRow}>
          {['CASH', 'UPI', 'CARD'].map((mode) => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.modeBtn,
                paymentData.paymentMode === mode && styles.selectedMode,
              ]}
              onPress={() => handleChange('paymentMode', mode)}
            >
              <Icon
                name={
                  mode === 'CASH'
                    ? 'money'
                    : mode === 'UPI'
                    ? 'qr-code'
                    : 'credit-card'
                }
                size={20}
                color={paymentData.paymentMode === mode ? 'white' : '#555'}
              />
              <Text
                style={[
                  styles.modeText,
                  paymentData.paymentMode === mode && styles.selectedText,
                ]}
              >
                {mode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.payButton, (loading || !tripId) && styles.disabled]}
          onPress={handlePayment}
          disabled={loading || !tripId}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.payText}>PAY NOW</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 20, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#777', marginTop: 4 },
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
  },
  label: { marginTop: 10, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
  },
  modeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  modeBtn: {
    flex: 1,
    padding: 12,
    margin: 4,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  selectedMode: { backgroundColor: '#3498db' },
  modeText: { marginTop: 4, color: '#555' },
  selectedText: { color: 'white', fontWeight: '600' },
  payButton: { marginTop: 25, backgroundColor: '#3498db', padding: 16, borderRadius: 10, alignItems: 'center' },
  disabled: { backgroundColor: '#aaa' },
  payText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

