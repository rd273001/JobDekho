import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Fonts, width } from '../../constants/Styles';
import { useJobsQuery } from '../../hooks/useJobsQuery';

const BookmarksScreen = () => {
  const bookmarks = useSelector( ( state ) => state.bookmarks.bookmarkedJobs );
  const { data, isLoading, error } = useJobsQuery();

   if (isLoading) {
    return <ActivityIndicator size="large" />;
  }
  if (error) {
    return <Text>Error loading job details.</Text>;
  }
  const jobs = data.pages.flatMap( page => page.results );
  // jobs data retrieved so retrieve bookmarked jobs from it
  const bookmarkedJobs = jobs.filter( job => bookmarks.includes( job.id ) );

  return (
    <ScrollView style={ styles.container }>
      { bookmarkedJobs.length > 0 ? (
        bookmarkedJobs.map( ( job ) => (
          <JobCard key={ job.id } job={ job } />
        ) )
      ) : (
        <Text style={ styles.text }>No bookmarks added yet.</Text>
      ) }
    </ScrollView>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    flexGrow: 1,
  },
  text: {
    flex: 1,
    margin: width * 0.03,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: Fonts.lg
  }
} );

export default BookmarksScreen;