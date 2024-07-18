import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Fonts, width } from '../../constants/Styles';

// JobDetail component to display detailed information of a job
const JobDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View style={ styles.container }>
      <Stack.Screen options={ { headerTitle: `Job Details : ${ id }` } } />
      
      <Text style={ styles.title }>{ job.title }</Text>
      <Text style={ styles.detail }>Place: { job.primary_details.Place }</Text>
      <Text style={ styles.detail }>Salary: { job.primary_details.Salary }</Text>
      <Text style={ styles.detail }>Experience: { job.primary_details.Experience }</Text>
      <Text style={ styles.detail }>Contact: { job.custom_link.replace( 'tel:', '' ) }</Text>
      <Text style={ styles.detail }>Description: { job.content }</Text>
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BACKGROUND,
  },
  title: {
    fontSize: Fonts.xl,
    fontFamily: 'Roboto-Regular',
  },
  detail: {
    fontSize: Fonts.lg,
    marginBottom: width * 0.03,
  },
} );

export default JobDetailsScreen;