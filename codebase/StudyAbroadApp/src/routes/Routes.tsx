import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { labels } from '../core';
import Intro from '../screens/Intro';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CourseList from '../screens/CourseList';
import CourseDetails from '../screens/CourseDetails';

const Stack = createNativeStackNavigator();

const Routes = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					presentation: 'modal',
					animationTypeForReplace: 'push',
					animation: 'slide_from_right'
				}}>
				<Stack.Screen name={labels.INTRO} component={Intro} />
				<Stack.Screen name={labels?.HOME_SCREEN} component={HomeScreen} />
				<Stack.Screen name={labels?.SEARCH_STACK} component={SearchScreen} />
				<Stack.Screen name={labels?.COURSE_LIST} component={CourseList} />
				<Stack.Screen name={labels?.COURSE_DETAILS} component={CourseDetails} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;