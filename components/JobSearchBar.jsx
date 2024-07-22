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
      inputContainerStyle={ styles.inputContainer }
      inputStyle={ { color: '#000' } }
    />
  );
};

const styles = StyleSheet.create( {
  container: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: width * 0.005,
    marginHorizontal: width * 0.03,
    marginVertical: width * 0.03,
    borderRadius: width,
    overflow: 'hidden',
    elevation: width * 0.03,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: width
  }
} );

export default JobSearchBar;