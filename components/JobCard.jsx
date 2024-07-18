import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@rneui/themed';
import { Fonts, width } from '../constants/Styles';

const JobCard = ({ job }) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.navigate( {
      pathname: 'jobs/[id]',
      params: { id: job.id }
    } );
  };

  return (
    <TouchableOpacity onPress={ handleNavigation } style={ styles.card }>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{job.title}</Text>
        <Text>{job.primary_details.Place}</Text>
        <Text>{job.primary_details.Salary}</Text>
        <Text>{job.contact_preference.whatsapp_link}</Text>
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
    marginBottom: width * 0.035,
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