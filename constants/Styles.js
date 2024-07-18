import { Dimensions } from "react-native";
export const { width, height } = Dimensions.get( 'screen' );

export const Fonts = {
  xs2: width * 0.027,
  xs: width * 0.03,
  sm: width * 0.04,
  md: width * 0.05,
  lg: width * 0.06,
  xl: width * 0.07,
  xl2: width * 0.08,
  xl3: width * 0.09
};

export const IconFonts = {
  md: width * 0.06,
  lg: width * 0.07,
  xl: width * 0.08,
  xl2: width * 0.09,
  xl3: width * 0.1,
  xl4: width * 0.12
}

export const FontStyles = {
  base: {
    fontFamily: 'Roboto-Regular',
    fontSize: Fonts.sm
  }
};

export const CommonStyles = {
  flexRowCenterCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexColCenterCenter: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
};