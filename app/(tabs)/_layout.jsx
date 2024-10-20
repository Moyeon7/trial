<<<<<<< HEAD
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StripeProvider } from '@stripe/stripe-react-native';
import { store } from './components/store'
import { Provider } from 'react-redux';

const STRIPE_KEY = 'pk_test_51Q6XooRtZ7r4ujFNrHwWnkyny4Oc45ynbdtDv2TbZeyCyyhrvjk1tp1MghbPpYMNNUGcvMB9slHpXOHKLyEVQqoK00OnM3A68f';
const StackLayout = () => {
  return (
    <>
      <Provider store = {store}>
        <StripeProvider publishableKey={STRIPE_KEY}>
          <Stack>
            <Stack.Screen name="Home" options={{ headerShown: false }} />
            <Stack.Screen name="about" options={{ headerShown: false }} />
            <Stack.Screen name="gallery" options={{ headerShown: false }} />
            <Stack.Screen name="menu" options={{ headerShown: false }} />
            <Stack.Screen name="blog" options={{ headerShown: false }} />
            <Stack.Screen name="review" options={{ headerShown: false }} />
            <Stack.Screen name="contact" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="addreview" options={{ headerShown: false }} />
            <Stack.Screen name="addblog" options={{ headerShown: false }} />
            <Stack.Screen name="payment" options={{ headerShown: false }} />
            <Stack.Screen name="product" options={{ headerShown: false }} />
            <Stack.Screen name="orderhistory" options={{ headerShown: false }} />
          </Stack>
          <StatusBar backgroundColor="#161622" style='light'/>
        </StripeProvider>
      </Provider>
      
    </>
    
  );

};

export default StackLayout;
=======
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StripeProvider } from '@stripe/stripe-react-native';
import { store } from './components/store'
import { Provider } from 'react-redux';

const STRIPE_KEY = 'pk_test_51Q6XooRtZ7r4ujFNrHwWnkyny4Oc45ynbdtDv2TbZeyCyyhrvjk1tp1MghbPpYMNNUGcvMB9slHpXOHKLyEVQqoK00OnM3A68f';
const StackLayout = () => {
  return (
    <>
      <Provider store = {store}>
        <StripeProvider publishableKey={STRIPE_KEY}>
          <Stack>
            <Stack.Screen name="Home" options={{ headerShown: false }} />
            <Stack.Screen name="about" options={{ headerShown: false }} />
            <Stack.Screen name="gallery" options={{ headerShown: false }} />
            <Stack.Screen name="menu" options={{ headerShown: false }} />
            <Stack.Screen name="blog" options={{ headerShown: false }} />
            <Stack.Screen name="review" options={{ headerShown: false }} />
            <Stack.Screen name="contact" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="addreview" options={{ headerShown: false }} />
            <Stack.Screen name="addblog" options={{ headerShown: false }} />
            <Stack.Screen name="payment" options={{ headerShown: false }} />
            <Stack.Screen name="product" options={{ headerShown: false }} />
            <Stack.Screen name="orderhistory" options={{ headerShown: false }} />
          </Stack>
          <StatusBar backgroundColor="#161622" style='light'/>
        </StripeProvider>
      </Provider>
      
    </>
    
  );

};

export default StackLayout;
>>>>>>> 1b425caee791463b3c48f72f255386d0a0db0adc
