import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Divider, Icon } from '@rneui/themed';
import { Fonts, FontStyles, IconFonts, width } from '../constants/Styles';
import * as Linking from 'expo-linking';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmarkAsync } from '../redux-store/bookmarks/bookmarksSlice';
import { Colors } from '../constants/Colors';

const JobCard = ( { job } ) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const bookmarks = useSelector( ( state ) => state.bookmarks.bookmarkedJobs );
  const isBookmarked = bookmarks.includes( job.id );

  const handleNavigation = () => {
    router.push( {
      pathname: 'jobs/[id]',
      params: { id: job.id }
    } );
  };

  // Toggle bookmark state for the job
  const handleBookmarkToggle = () => {
    dispatch( toggleBookmarkAsync( job.id ) );
  };

  // Open WhatsApp link
  const handleWhatsAppNavigation = () => {
    Linking.openURL( job.contact_preference.whatsapp_link );
  };

  // Open phone dialer with contact number
  const handleContactNavigation = () => {
    Linking.openURL( job.custom_link );
  };

  return (
    <TouchableOpacity activeOpacity={ 0.7 } onPress={ handleNavigation } style={ styles.card }>
      <View style={ styles.cardContent }>
        <Text numberOfLines={ 2 } style={ styles.title }>{ job.title }</Text>
        <Divider style={ { flex: 1, justifyContent: 'center' } } />

        <View style={ styles.flexCenter }>
          <Icon name='map-marker-outline' type='material-community' size={ IconFonts.sm } color={ Colors.light.tabIconDefault } />
          <Text style={ styles.details }>{ job.primary_details.Place }</Text>
        </View>

        <View style={ styles.flexCenter }>
          <Icon name='currency-inr' type='material-community' size={ IconFonts.sm } color={ Colors.light.tabIconDefault } />
          <Text style={ styles.details }>{ job.primary_details.Salary.length < 2 ? 'N/A' : job.primary_details.Salary?.replace( /₹/g, '' ) }</Text>
        </View>

        <View style={ styles.contactInfo }>
          <TouchableOpacity onPress={ handleWhatsAppNavigation } style={ styles.flexCenter }>
            <Icon name='whatsapp' type='material-community' size={ IconFonts.sm } color='#25D366' />
            <Text style={ styles.contactLink } onPress={ handleWhatsAppNavigation }>
              WhatsApp
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ handleContactNavigation } style={ styles.flexCenter }>
            <Icon name='phone' type='material-community' size={ IconFonts.sm } color='#007AFF' />
            <Text style={ styles.contactLink } onPress={ handleContactNavigation }>
              { job?.custom_link?.replace( 'tel:', '' ) }
            </Text>
          </TouchableOpacity>

          {/* Bookmark Icon */ }
          <TouchableOpacity onPress={ handleBookmarkToggle }>
            <Icon name={ isBookmarked ? 'bookmark' : 'bookmark-outline' } type='material-community' color={ isBookmarked ? '#ffc100' : Colors.light.icon } size={ IconFonts.lg } />
          </TouchableOpacity>

        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create( {
  card: {
    backgroundColor: '#FFFFFF',
    elevation: 10,
    padding: width * 0.025,
    marginHorizontal: width * 0.035,
    borderRadius: width * 0.025,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    marginBottom: width * 0.02,
  },
  flexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: width * 0.02,
    gap: width * 0.01
  },
  details: {
    ...FontStyles.base,
    fontSize: Fonts.sm
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: width * 0.01
  },
  contactLink: {
    color: 'blue',
  }
} );

export default JobCard;