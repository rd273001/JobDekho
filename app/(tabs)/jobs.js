import { View, Text, StyleSheet } from 'react-native';

const JobsScreen = () => {
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Jobs</Text>
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
  }
} );

export default JobsScreen;