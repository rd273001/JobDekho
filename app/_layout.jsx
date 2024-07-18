import React from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const RootLayout = () => {

  const [loaded, error] = useFonts( {
    'Roboto-Regular': require( '../assets/fonts/Roboto-Regular.ttf' ),
    'Roboto-Medium': require( '../assets/fonts/Roboto-Medium.ttf' ),
    'Roboto-Bold': require( '../assets/fonts/Roboto-Bold.ttf' ),
  } );

  if ( error ) console.log( error );

  return loaded ? (
    <QueryClientProvider client={ queryClient }>
      <Stack>
        <Stack.Screen name='(tabs)' options={ { headerShown: false } } />
      </Stack>
    </QueryClientProvider>
  ) : null;
};

export default RootLayout;