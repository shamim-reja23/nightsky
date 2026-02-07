import { Stack } from 'expo-router';
import './globals.css';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {


  return (
    <>
      <StatusBar hidden />
      
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(tabs)/index" />
        
        <Stack.Screen 
          name="(modal)/Memory" 
          options={{
            presentation: 'transparentModal',
          }}  
        />
      </Stack>
    </>
  );
}
