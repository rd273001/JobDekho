import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Fonts, IconFonts, width } from '../../constants/Styles';
import * as Linking from 'expo-linking';
import { useJobsQuery } from '../../hooks/useJobsQuery';
import { useDispatch, useSelector } from 'react-redux';

const JobDetailsScreen = () => {
  // Extract job ID from search params
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const bookmarks = useSelector( state => state.bookmarks.bookmarkedJobs );
  // retrieve jobs data
  const { data, isLoading, error } = useJobsQuery();

  if ( isLoading ) {
    return <ActivityIndicator size={ IconFonts.xl4 } />;
  }

  if ( error ) {
    return <Text>Error loading job details.</Text>;
  }
  
  // find job with matching ID
  const job = data.pages.flatMap( page => page.results ).find( job => String( job.id ) === id );

  // when job is not found
  if ( !job ) return <Text>Job not found!</Text>;

  const isBookmarked = bookmarks.includes( job.id );

  // open WhatsApp link
  const handleWhatsAppNavigation = () => {
    Linking.openURL( job.whatsapp_link );
  };

  // open phone dialer with contact number
  const handleContactNavigation = () => {
    Linking.openURL( job.contact_preference.whatsapp_link );
  };

  return (
    <ScrollView contentContainerStyle={ styles.container }>
      <Stack.Screen options={ { headerTitle: 'Job Details' } } />

      <Text style={ styles.title }>{ job?.title }</Text>
      <Text style={ styles.detail }>Place: { job.primary_details?.Place }</Text>
      <Text style={ styles.detail }>Salary: { job.primary_details?.Salary }</Text>
      <Text style={ styles.detail }>
        Experience: { job.primary_details?.Experience }
      </Text>
      <Text style={ styles.detail }>
        Contact: { job.custom_link?.replace( 'tel:', '' ) }
      </Text>
      <Text style={ styles.detail }>Description: { job?.content }</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create( {
  container: {
    flexGrow: 1,
    backgroundColor: Colors.PRIMARY_BACKGROUND,
  },
  title: {
    fontSize: Fonts.xl,
    fontFamily: 'Roboto-Regular',
  },
  detail: {
    fontSize: Fonts.lg,
    marginBottom: width * 0.03,
  },
} );

export default JobDetailsScreen;