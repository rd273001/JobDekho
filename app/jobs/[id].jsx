import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { CommonStyles, Fonts, FontStyles, IconFonts, width } from '../../constants/Styles';
import * as Linking from 'expo-linking';
import { useJobsQuery } from '../../hooks/useJobsQuery';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmarkAsync } from '../../redux-store/bookmarks/bookmarksSlice';
import { Icon } from '@rneui/themed';
import Spinner from '../../components/Spinner';
import Detail from '../../components/Detail';

const JobDetailsScreen = () => {
  // Extract job ID from search params
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const bookmarks = useSelector( state => state.bookmarks.bookmarkedJobs );
  // retrieve jobs data
  const { data, isLoading } = useJobsQuery();

  if ( isLoading ) return <Spinner />;

  // find job with matching ID
  const job = data.pages.flatMap( page => page.results ).find( job => String( job.id ) === id );

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

  // content
  // const content = job?.contentV3.V3;
  // console.log( 'ContentV3 => ', content );

  return (
    <ScrollView contentContainerStyle={ styles.container }>
      <Stack.Screen options={ {
        headerTitle: 'Job Details',
        headerRight: () => (
          <TouchableOpacity onPress={ handleBookmarkToggle }>
            <Icon name={ isBookmarked ? 'bookmark' : 'bookmark-outline' } type='material-community' color={ isBookmarked ? '#ffc100' : Colors.light.icon } size={ IconFonts.lg } />
          </TouchableOpacity> )
      } } />

      <Text style={ styles.title }>{ job?.title }</Text>

      <View style={ styles.detailsContainer }>
        <Detail title='Company' value={ job?.company_name } icon='office-building' />
        <Detail value={ job?.primary_details?.Place } icon='map-marker-outline' />
        <Detail value={ job.primary_details.Salary.length < 2 ? 'N/A' : job.primary_details.Salary?.replace( /₹/g, '' ) } icon='currency-inr' />
        <Detail title='Experience' value={ job?.primary_details?.Experience } icon='work-history' type='material' />

        <View style={ styles.flexCenter }>
          <TouchableOpacity onPress={ handleContactNavigation } style={ styles.flexCenter }>
            <Icon name='phone' type='material-community' size={ IconFonts.base } color='#007AFF' />
            <Text style={ styles.contactLink }>
              { job?.custom_link?.replace( 'tel:', '' ) }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ handleWhatsAppNavigation } style={ styles.flexCenter }>
            <Icon name='whatsapp' type='material-community' size={ IconFonts.base } color='#25D366' />
            <Text style={ styles.contactLink }>
              WhatsApp
            </Text>
          </TouchableOpacity>
        </View>

        <Detail title='Qualification' value={ job?.primary_details?.Qualification } icon='book-education-outline' />
        <Detail title='Job Role' value={ job?.job_role } icon='person-pin' type='material' />
        <Detail title='Openings' value={ job?.openings_count } icon='account-multiple-plus-outline' />
        <Detail title='Applications' value={ job?.num_applications } icon='file-document-edit-outline' />
        <Detail title='Views' value={ job?.views } icon='eye-outline' />

        <Text style={ [styles.detail, styles.description] }>Description:-</Text>
        {
          job?.contentV3?.V3?.length > 0 ? job.contentV3.V3.map( ( item, index ) => (
            <Text key={ index } style={ [styles.detail, styles.descriptionText] }><Text style={ [styles.detail, styles.descriptionText, styles.descriptionHeading ] }>{ `${ item.field_key }:\n` }</Text>{`${ item.field_name } : ${ item.field_value.replace( /:/g, ' : ' ) }` }</Text>
          ) )
            : <Text style={ [styles.detail, styles.descriptionText] }>N/A</Text>
        }
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
    fontSize: Fonts.base,
    fontFamily: 'Roboto-Bold',
    marginBottom: width * 0.04
  },
  detailsContainer: {
    gap: width * 0.025
  },
  flexCenter: {
    ...CommonStyles.flexRowCenterCenter,
    justifyContent: 'flex-start',
    gap: width * 0.01,
  },
  detail: {
    flex: 1,
    ...FontStyles.base,
  },
  contactLink: {
    color: 'blue',
    ...FontStyles.base
  },
  description: {
    fontFamily: 'Roboto-Bold',
  },
  descriptionHeading: {
    fontFamily: 'Roboto-Medium',
  },
  descriptionText: {
    marginTop: -width * 0.01
  }
} );

export default JobDetailsScreen;