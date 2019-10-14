import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import MedicationSearchScreen from '../screens/MedicationSearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ManageMedicationScreen from '../screens/ManageMedicationScreen';
import Colors from '../constants/Colors';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <AntDesign
    name="home"
    size={26}
    style={{ marginBottom: -3}}
    color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const MedicationSearchStack = createStackNavigator(
  {
    MedicationSearch: MedicationSearchScreen,
  },
  config
);

MedicationSearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
  ),
};

MedicationSearchStack.path = '';

const ManageMedicationStack = createStackNavigator(
  {
    ManageMedication: ManageMedicationScreen,
  },
  config
);

ManageMedicationStack.navigationOptions = {
  tabBarLabel: 'Manage',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name="pill"
      size={26}
      style={{ marginBottom: -3}}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};

ManageMedicationStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <AntDesign
    name="user"
    size={26}
    style={{ marginBottom: -3}}
    color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />
  ),
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ManageMedicationStack,
  MedicationSearchStack,
  LinksStack,
  ProfileStack
});

tabNavigator.path = '';

export default tabNavigator;
