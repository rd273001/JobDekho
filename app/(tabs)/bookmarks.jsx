import { View, Text, StyleSheet } from 'react-native';

const BookmarksScreen = () => {
  return (
    <View style={styles.container}>
      <Text>No Bookmarks added yet.</Text>
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
} );

export default BookmarksScreen;