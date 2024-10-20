<<<<<<< HEAD
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name = "sign-in"
          options={{headerShown: false}}
        />

        <Stack.Screen
          name = "sign-up"
          options={{headerShown: false}}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style='light'/>
    </>
  )
}

=======
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name = "sign-in"
          options={{headerShown: false}}
        />

        <Stack.Screen
          name = "sign-up"
          options={{headerShown: false}}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style='light'/>
    </>
  )
}

>>>>>>> 1b425caee791463b3c48f72f255386d0a0db0adc
export default AuthLayout