import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed';
import { CommonStyles, FontStyles, IconFonts, width } from '../constants/Styles';
import { Colors } from '../constants/Colors';

const Detail = ( { title, value, icon, type } ) => {
  return (
    <View style={ styles.flexCenter }>
      <Icon name={ icon } type={ type ?? 'material-community' } size={ IconFonts.base } color={ Colors.light.tabIconDefault } />
      <Text style={ styles.detail }>{ title ? `${ title }: ${ value }` : `${ value }` }</Text>
    </View>
  );
};

const styles = StyleSheet.create( {
  flexCenter: {
    ...CommonStyles.flexRowCenterCenter,
    justifyContent: 'flex-start',
    gap: width * 0.01,
  },
  detail: {
    flex: 1,
    ...FontStyles.base,
  }
} );

export default Detail;