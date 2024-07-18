import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Fonts, Seperator, width } from '../../constants/Styles';
import { useJobsQuery } from '../../hooks/useJobsQuery';
import JobCard from '../../components/JobCard';
import { Colors } from '../../constants/Colors';

const BookmarksScreen = () => {
  // using latest updated data
  const bookmarks = useSelector( ( state ) => state.bookmarks.bookmarkedJobs );
  const { data, isLoading, error } = useJobsQuery();

  if ( isLoading ) {
    return <ActivityIndicator size='large' />;
  }
  if ( error ) {
    return <Text>Error loading job details.</Text>;
  }
  const jobs = data.pages.flatMap( page => page.results );
  // jobs data retrieved so retrieve bookmarked jobs from it
  const bookmarkedJobs = jobs.filter( job => bookmarks.includes( job.id ) );

  return (
    <ScrollView contentContainerStyle={ styles.container }>
      { bookmarkedJobs.length > 0 ? (
        bookmarkedJobs.map( ( job ) => (
          <View key={job.id}>
          <JobCard job={ job } />
            <Seperator />
            </View>
        ) )
      ) : (
        <Text style={ styles.text }>No bookmarks added yet.</Text>
      ) }
    </ScrollView>
  );
};

const styles = StyleSheet.create( {
  container: {
    flexGrow: 1,
    backgroundColor: Colors.PRIMARY_BACKGROUND,
    paddingTop: width * 0.035
  },
  text: {
    marginHorizontal: width * 0.03,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: Fonts.lg,
  }
} );

export default BookmarksScreen;