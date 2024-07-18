import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Fonts, IconFonts, Seperator, width } from '../../../constants/Styles';
import { Colors } from '../../../constants/Colors';
import { useJobsQuery } from '../../../hooks/useJobsQuery';
import JobCard from '../../../components/JobCard';
import JobSearchBar from '../../../components/JobSearchBar';
import { useState } from 'react';
import { loadBookmarksAsync } from '../../../redux-store/bookmarks/bookmarksSlice';

const JobsScreen = () => {
  const [searchQuery, setSearchQuery] = useState( '' );
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useJobsQuery();
  
  useEffect( () => {
    // load bookmarked jobs data from storage
    dispatch( loadBookmarksAsync() );
  }, [] );

  // filter jobs based on searchQuery
  const filteredJobs = data?.pages.flatMap( page =>
    page.results.filter( job => job.title?.toLowerCase().includes( searchQuery?.toLowerCase() ) )
  );

  return (
    <View style={ styles.container }>
      <JobSearchBar searchQuery={ searchQuery } setSearchQuery={ setSearchQuery } />
      { status === 'loading' && <ActivityIndicator size='large' /> }
      { status === 'error' && <Text>Error fetching jobs</Text> }
      <FlatList
        data={ filteredJobs }
        renderItem={ ( { item } ) => <JobCard job={ item } /> }
        ListHeaderComponent={ <Seperator /> }
        keyExtractor={ ( item ) => item.id.toString() }
        ItemSeparatorComponent={ <Seperator /> }
        onEndReached={ () => {
          if ( hasNextPage ) fetchNextPage();
        } }
        onEndReachedThreshold={ 0.5 }
        ListEmptyComponent={ <ActivityIndicator size={ IconFonts.xl4 } color='#7786FC' /> }
        ListFooterComponent={ isFetchingNextPage ? <ActivityIndicator size={ IconFonts.xl4 } color='#7786FC' /> : <Seperator /> }
      />
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BACKGROUND
  },
  title: {
    fontSize: Fonts.xs,
    fontFamily: 'Roboto-Regular',
  }
} );

export default JobsScreen;