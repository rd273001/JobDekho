import React from 'react';
import { Icon, SearchBar } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { width } from '../constants/Styles';

const JobSearchBar = ( { searchQuery, setSearchQuery } ) => {

  return (
    <SearchBar
      placeholder='Search Jobs...'
      onChangeText={ setSearchQuery }
      value={ searchQuery }
      searchIcon={ <Icon name='search' color='#7786FC' /> }
      containerStyle={ styles.container }
      inputContainerStyle={ { backgroundColor: '#fff', borderRadius: width * 0.03 } }
      inputStyle={ { color: '#000' } }
    />
  );
};

const styles = StyleSheet.create( {
  container: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    marginHorizontal: width * 0.035,
    marginVertical: width * 0.03,
    borderRadius: width * 0.04,
    elevation: 10
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.03
  }
} );

export default JobSearchBar;