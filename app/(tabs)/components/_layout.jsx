<<<<<<< HEAD
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const StackLayout = () => {
  return (
    <>
          <Stack>
            <Stack.Screen name="comments" options={{ headerShown: false }} />
            {/* <Stack.Screen name="components" options={{ headerShown: false }} /> */}
          </Stack>
          <StatusBar backgroundColor="#161622" style='light'/>
    </>
    
  );

};

export default StackLayout;
=======
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const StackLayout = () => {
  return (
    <>
          <Stack>
            <Stack.Screen name="comments" options={{ headerShown: false }} />
            {/* <Stack.Screen name="components" options={{ headerShown: false }} /> */}
          </Stack>
          <StatusBar backgroundColor="#161622" style='light'/>
    </>
    
  );

};

export default StackLayout;
>>>>>>> 1b425caee791463b3c48f72f255386d0a0db0adc
