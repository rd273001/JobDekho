import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import { Fonts } from '../../../constants/Styles';

const { width } = Dimensions.get( 'screen' );

const JobsStackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='jobs'
        options={ {
          headerLeft: () => <Image
            source={ require( '../../../assets/images/icon.png' ) }
            style={ styles.logoImg }
          />,
          headerTitle: () => <Text style={ styles.title }>JobDekho</Text>
        } } />
    </Stack>
  );
};

const styles = StyleSheet.create( {
  logoImg: {
    height: width * 0.12,
    width: width * 0.12,
    resizeMode: 'contain',
    marginBottom: -Fonts.xs2
  },
  title: {
    color: Colors.PRIMARY_LIGHT,
    fontFamily: 'Roboto-Bold',
    fontSize: width * 0.06,
    marginBottom: -Fonts.xs2,
  },
} );

export default JobsStackLayout;