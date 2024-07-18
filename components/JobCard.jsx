import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Icon } from '@rneui/themed';
import { width } from '../constants/Styles';
import * as Linking from 'expo-linking';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmarkAsync } from '../redux-store/bookmarks/bookmarksSlice';

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
    <TouchableOpacity activeOpacity={0.7} onPress={ handleNavigation } style={ styles.card }>
      <View style={ styles.cardContent }>
        <Text style={ styles.title }>{ job.title }</Text>
        <Text>{ job.primary_details.Place }</Text>
        <Text>{ job.primary_details.Salary }</Text>
        <View style={ styles.contactInfo }>
          <TouchableOpacity onPress={ handleWhatsAppNavigation }>
            <Icon name="whatsapp" type="font-awesome" size={ 20 } color="#25D366" />
          </TouchableOpacity>
          <Text style={ styles.contactLink } onPress={ handleWhatsAppNavigation }>
            WhatsApp
          </Text>
          <TouchableOpacity onPress={ handleContactNavigation }>
            <Icon name="phone" type="font-awesome" size={ 20 } color="#007AFF" />
          </TouchableOpacity>
          <Text style={ styles.contactLink } onPress={ handleContactNavigation }>
            { job.custom_link }
          </Text>
        </View>
      </View>
      <Icon name='bookmark-outline' type='material-community' color='gray' />
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
} );

export default JobCard;