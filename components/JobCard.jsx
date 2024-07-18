import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Divider, Icon } from '@rneui/themed';
import { IconFonts, width } from '../constants/Styles';
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
        <Text numberOfLines={2} style={ styles.title }>{ job.title }</Text>
        <Divider style={{flex: 1, justifyContent: 'center'}} />
        <Text style={{marginVertical: 5}}>{ job.primary_details.Place }</Text>
        <Text style={{marginVertical: 5}}>{ job.primary_details.Salary }</Text>
        <View style={ styles.contactInfo }>
          <TouchableOpacity onPress={ handleWhatsAppNavigation } style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={ styles.contactLink } onPress={ handleWhatsAppNavigation }>
              WhatsApp
            </Text>
            <Icon name='whatsapp' type='font-awesome' size={ IconFonts.md } color='#25D366' />
          </TouchableOpacity>

          <TouchableOpacity onPress={ handleContactNavigation } style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={ styles.contactLink } onPress={ handleContactNavigation }>
              { job?.custom_link?.replace('tel:', '') }
            </Text>
            <Icon name='phone' type='font-awesome' size={ IconFonts.md } color='#007AFF' />
            </TouchableOpacity>
          
          {/* Bookmark Icon */ }
      <TouchableOpacity onPress={ handleBookmarkToggle }>
        <Icon name={ isBookmarked ? 'bookmark' : 'bookmark-o' } type='font-awesome' color={ isBookmarked ? '#ffc100' : Colors.light.icon } size={ IconFonts.lg } />
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
    fontWeight: 'bold',
    marginBottom: width * 0.02,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 5
  },
  contactLink: {
    color: 'blue',
    marginRight: width * 0.01
  }
} );

export default JobCard;