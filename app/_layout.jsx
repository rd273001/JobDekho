import React from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '../redux-store/storeConfig';

const queryClient = new QueryClient();

const RootLayout = () => {

  const [loaded, error] = useFonts( {
    'Roboto-Regular': require( '../assets/fonts/Roboto-Regular.ttf' ),
    'Roboto-Medium': require( '../assets/fonts/Roboto-Medium.ttf' ),
    'Roboto-Bold': require( '../assets/fonts/Roboto-Bold.ttf' ),
  } );

  if ( error ) console.log( error );

  return loaded ? (
    <Provider store={ store }>
      <QueryClientProvider client={ queryClient }>
        <Stack>
          <Stack.Screen name='(tabs)' options={ { headerShown: false } } />
        </Stack>
      </QueryClientProvider>
    </Provider>
  ) : null;
};

export default RootLayout;