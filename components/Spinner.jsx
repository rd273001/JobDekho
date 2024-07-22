import { ActivityIndicator } from 'react-native'
import React from 'react'
import { CommonStyles, IconFonts } from '../constants/Styles';

const Spinner = ( props ) => {
  return (
    <ActivityIndicator size={ props?.size ?? IconFonts.xl4 } color={ props?.color ?? '#7786FC' } style={ props?.style ?? CommonStyles.flexColCenterCenter } { ...props } />
  );
};

export default Spinner;