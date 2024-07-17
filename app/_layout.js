import { useFonts } from 'expo-font';
import { Stack } from 'expo-router/stack';

const RootLayout = () => {

  const [loaded, error] = useFonts( {
    'Roboto-Regular': require( '../assets/fonts/Roboto-Regular.ttf' ),
    'Roboto-Medium': require( '../assets/fonts/Roboto-Medium.ttf' ),
    'Roboto-Bold': require( '../assets/fonts/Roboto-Bold.ttf' ),
  } );

  if ( error ) console.log( error );

  return loaded ? (
    <Stack>
      <Stack.Screen name='(tabs)' options={ { headerShown: false } } />
    </Stack>
  ) : null;
};

export default RootLayout;