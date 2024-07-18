import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { width } from '../constants/Styles';

const JobSearchBar = ( { onSearch } ) => {
  const [search, setSearch] = useState( '' );

  const updateSearch = ( search ) => {
    setSearch( search );
    onSearch( search );
  };

  return (
    <SearchBar
      placeholder='Search Jobs...'
      onChangeText={ updateSearch }
      value={ search }
      containerStyle={ styles.container }
      inputContainerStyle={{backgroundColor: '#fff',}}
    />
  );
};

const styles = StyleSheet.create( {
  container: {
    backgroundColor: '#b2b',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    margin: width * 0.02,
    borderRadius: width * 0.05
  }
} );

export default JobSearchBar;