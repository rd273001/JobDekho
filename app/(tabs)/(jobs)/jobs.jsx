import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { IconFonts, Seperator, width } from '../../../constants/Styles';
import { Colors } from '../../../constants/Colors';
import { useJobsQuery } from '../../../hooks/useJobsQuery';
import JobCard from '../../../components/JobCard';
import JobSearchBar from '../../../components/JobSearchBar';
import { useDispatch } from 'react-redux';
import { loadBookmarksAsync } from '../../../redux-store/bookmarks/bookmarksSlice';
import Spinner from '../../../components/Spinner';

const JobsScreen = () => {
  const [searchQuery, setSearchQuery] = useState( '' );
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useJobsQuery();
  const dispatch = useDispatch();
  
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
      <FlatList
        data={ filteredJobs }
        renderItem={ ( { item } ) => <JobCard job={ item } /> }
        ListHeaderComponent={ <Seperator /> }
        keyExtractor={ ( item ) => item.id.toString() }
        ItemSeparatorComponent={ <Seperator size={ 0.04 } /> }
        onEndReached={ () => {
          if ( hasNextPage ) fetchNextPage();
        } }
        onEndReachedThreshold={ 0.5 }
        ListEmptyComponent={ isLoading && <Spinner /> }
        ListFooterComponent={ isFetchingNextPage ? <Spinner style={ { marginVertical: width * 0.05 } } /> : <Seperator size={ 0.055 } /> }
      />
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BACKGROUND,
  },
} );

export default JobsScreen;