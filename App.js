import 'react-native-get-random-values';
import { NavigationContainer } from '@react-navigation/native';
import LanguageProvider from './components/contexts/LanguageContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}