import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Fonts } from '../../../constants/Styles';
import { Colors } from '../../../constants/Colors';
import { useJobsQuery } from '../../../hooks/useJobsQuery';
import JobCard from '../../../components/JobCard';
import JobSearchBar from '../../../components/JobSearchBar';
import { useState } from 'react';

const JobsScreen = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useJobsQuery();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = ( query ) => {
    setSearchQuery( query );
  };

  const filteredJobs = data?.pages.flatMap( page =>
    page.results.filter( job => job.title?.toLowerCase().includes( String( searchQuery ).toLowerCase() ) )
  );

  return (
    <View style={styles.container}>
      <JobSearchBar onSearch={handleSearch} />
      {status === 'loading' && <ActivityIndicator size='large' />}
      {status === 'error' && <Text>Error fetching jobs</Text>}
      <FlatList
        data={filteredJobs}
        renderItem={({ item }) => <JobCard job={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size='large' /> : null}
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