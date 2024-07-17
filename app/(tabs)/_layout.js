import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const TabLayout = () => {
  return (
    <Tabs screenOptions={ {
      tabBarActiveBackgroundColor: Colors.light.background,
      tabBarActiveTintColor: Colors.PRIMARY_LIGHT,
    }}>
      <Tabs.Screen
        name='jobs'
        options={ {
          tabBarLabel: 'Jobs',
          title: 'Jobs',
          tabBarIcon: ( { color } ) => (
            <FontAwesome
              size={ 28 }
              style={ { marginBottom: -3 } }
              name='suitcase'
              color={ color }
            />
          ),
        } }
      />
      <Tabs.Screen
        name='bookmarks'
        options={ {
          tabBarLabel: 'Bookmarks',
          title: 'Bookmarks',
          tabBarIcon: ( { color } ) => (
            <MaterialCommunityIcons
              size={ 28 }
              style={ { marginBottom: -3 } }
              name='bookmark-box-multiple-outline'
              color={ color }
            />
          ),
        } }
      />
    </Tabs>
  );
};

export default TabLayout;