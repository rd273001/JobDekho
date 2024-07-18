import { Tabs } from 'expo-router';
import React from 'react';
import { Icon } from '@rneui/themed';
import { Colors } from '../../constants/Colors';
import { Fonts, IconFonts } from '../../constants/Styles';

const TabLayout = () => {
  return (
    <Tabs screenOptions={ {
      tabBarActiveBackgroundColor: Colors.light.background,
      tabBarActiveTintColor: Colors.PRIMARY_LIGHT,
      tabBarInactiveTintColor: Colors.light.tabIconDefault,
      tabBarLabelStyle: { marginTop: -Fonts.xs2, fontSize: Fonts.xs2 }
    } }>
      <Tabs.Screen
        name='(jobs)'
        options={ {
          tabBarLabel: 'Jobs',
          title: 'Jobs',
          headerShown: false,
          tabBarIcon: ( { color } ) => (
            <Icon
              size={ IconFonts.md }
              type='font-awesome'
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
          headerTitleStyle: {fontFamily: 'Roboto-Bold', fontSize: Fonts.md},
          tabBarIcon: ( { color } ) => (
            <Icon
              size={ IconFonts.md }
              type='material-community'
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