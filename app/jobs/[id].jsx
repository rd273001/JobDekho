import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Fonts, IconFonts, width } from '../../constants/Styles';
import * as Linking from 'expo-linking';
import { useJobsQuery } from '../../hooks/useJobsQuery';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmarkAsync } from '../../redux-store/bookmarks/bookmarksSlice';
import { Icon } from '@rneui/themed';

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

  // Toggle bookmark state for the job
  const handleBookmarkToggle = () => {
    dispatch( toggleBookmarkAsync( job.id ) );
  };

  // open WhatsApp link
  const handleWhatsAppNavigation = () => {
    Linking.openURL( job.contact_preference.whatsapp_link );
  };

  // open phone dialer with contact number
  const handleContactNavigation = () => {
    Linking.openURL( job.custom_link );
  };

  // Decode the content
  const decodedContent = job?.content ? JSON.parse( job.content ) : {};
  const descriptionText = Object.values( decodedContent ).join( '\n' );

  return (
    <ScrollView contentContainerStyle={ styles.container }>
      <Stack.Screen options={ {
        headerTitle: 'Job Details',
        headerRight: () => (
          <TouchableOpacity onPress={ handleBookmarkToggle }>
            <Icon name={ isBookmarked ? 'bookmark' : 'bookmark-outline' } type='material-community' color={ isBookmarked ? '#ffc100' : Colors.light.tabIconDefault } size={ IconFonts.lg } />
          </TouchableOpacity> )
      } } />

      <Text style={ styles.title }>{ job?.title }</Text>

      <View style={ styles.detailsContainer }>
        <View style={ styles.flexCenter }>
          <Icon name='office-building' type='material-community' size={ IconFonts.md } color={ Colors.light.tabIconDefault } />
          <Text style={ styles.detail }>Company: { job.company_name }</Text>
        </View>
        <View style={ styles.flexCenter }>
          <Icon name='map-marker-outline' type='material-community' size={ IconFonts.md } color={ Colors.light.tabIconDefault } />
          <Text style={ styles.detail }>{ job.primary_details.Place }</Text>
        </View>
        <View style={ styles.flexCenter }>
          <Icon name='currency-inr' type='material-community' size={ IconFonts.md } color={ Colors.light.tabIconDefault } />
          <Text style={ styles.detail }>{ job.primary_details.Salary.length < 2 ? 'N/A' : job.primary_details.Salary?.replace( /₹/g, '' ) }</Text>
        </View>
        <View style={ styles.flexCenter }>
          <Icon name='work-history' type='material' size={ IconFonts.md } color={ Colors.light.tabIconDefault } />
          <Text style={ styles.detail }>Exp : { job.primary_details?.Experience }</Text>
        </View>
        <View style={styles.flexCenter}>
        <TouchableOpacity onPress={ handleContactNavigation } style={ styles.flexCenter }>
          <Icon name='phone' type='material-community' size={ IconFonts.md } color='#007AFF' />
          <Text style={ styles.contactLink }>
            { job?.custom_link?.replace( 'tel:', '' ) }
          </Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={ handleWhatsAppNavigation } style={ styles.flexCenter }>
          <Icon name='whatsapp' type='material-community' size={ IconFonts.md } color='#25D366' />
          <Text style={ styles.contactLink }>
            WhatsApp
          </Text>
          </TouchableOpacity>
          </View>
        <View style={ styles.flexCenter }>
          <Icon name='currency-inr' type='material-community' size={ IconFonts.md } color={ Colors.light.tabIconDefault } />
          <Text style={ styles.detail }>Qualification: { job.primary_details.Qualification }</Text>
        </View>
        <View style={ styles.flexCenter }>
          <Icon name='eye' type='material-community' size={ IconFonts.md } color={ Colors.light.tabIconDefault } />
          <Text style={ styles.detail }>Job Role: { job.job_role }</Text>
        </View>
        <View style={ styles.flexCenter }>
          <Icon name='account-multiple-plus-outline' type='material-community' size={ IconFonts.md } color={ Colors.light.tabIconDefault } />
          <Text style={ styles.detail }>Openings: { job.openings_count }</Text>
        </View>
        <View style={ styles.flexCenter }>
          <Icon name='file-document-edit-outline' type='material-community' size={ IconFonts.md } color={ Colors.light.tabIconDefault } />
          <Text style={ styles.detail }>Applications: { job.num_applications }</Text>
        </View>
        <View style={ styles.flexCenter }>
          <Icon name='eye-outline' type='material-community' size={ IconFonts.md } color={ Colors.light.tabIconDefault } />
          <Text style={ styles.detail }>Views: { job.views }</Text>
        </View>
        <Text style={ styles.detail }>Description: { descriptionText }</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create( {
  container: {
    flexGrow: 1,
    backgroundColor: Colors.PRIMARY_BACKGROUND,
    padding: width * 0.03
  },
  title: {
    fontSize: Fonts.md,
    fontFamily: 'Roboto-Bold',
    marginBottom: width * 0.04
  },
  detailsContainer: {
    gap: width * 0.025
  },
  flexCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.02,
  },
  details: {
    fontSize: Fonts.sm,
  },
  detail: {
    flex: 1,
    fontSize: Fonts.md,
    fontFamily: 'Roboto-Regular',
  },
  contactLink: {
    color: 'blue',
    fontFamily: 'Roboto-Regular',
    fontSize: Fonts.md
  },
} );

export default JobDetailsScreen;