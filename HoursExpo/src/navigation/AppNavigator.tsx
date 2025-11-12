import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { InsightsScreen } from '../screens/InsightsScreen';
import { TimerScreen } from '../screens/TimerScreen';
import { MoodCheckScreen } from '../screens/MoodCheckScreen';
import { ProjectDetailScreen } from '../screens/ProjectDetailScreen';
import { CreateProjectScreen } from '../screens/CreateProjectScreen';
import { CompletionCelebrationScreen } from '../screens/CompletionCelebrationScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 8,
          height: 90,
          paddingBottom: 30,
          paddingTop: 12,
        },
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.3,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <TabIcon name="home" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{
          tabBarLabel: 'Projects',
          tabBarIcon: ({ color }) => (
            <TabIcon name="projects" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarLabel: 'Insights',
          tabBarIcon: ({ color }) => (
            <TabIcon name="insights" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Simple text-based tab icons
const TabIcon = ({ name, color }: { name: string; color: string }) => {
  const icons: Record<string, string> = {
    home: '◉',
    projects: '⊞',
    insights: '◈',
  };

  return (
    <Text style={{ fontSize: 24, color }}>
      {icons[name] || '•'}
    </Text>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen
          name="CreateProject"
          component={CreateProjectScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="ProjectDetail"
          component={ProjectDetailScreen}
        />
        <Stack.Screen
          name="Timer"
          component={TimerScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="MoodCheck"
          component={MoodCheckScreen}
        />
        <Stack.Screen
          name="CompletionCelebration"
          component={CompletionCelebrationScreen}
          options={{ animation: 'fade' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
