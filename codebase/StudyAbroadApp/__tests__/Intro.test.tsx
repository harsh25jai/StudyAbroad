import React from 'react';
import Intro from '../src/screens/Intro';
import { fireEvent, render } from '@testing-library/react-native';

describe('Intro component', () => {
    test('renders title and subtitle correctly', () => {
        const { getByText } = render(<Intro navigation={{}} route={{}} />);
        const titleText = getByText('Study abroad:\nExpand your world, broaden perspectives.');
        const subtitleText = getByText('Discover 50+ customizable courses for your academic journey.');

        expect(titleText).toBeTruthy();
        expect(subtitleText).toBeTruthy();
    });

    test('navigation button navigates to home screen', () => {
        const navigationMock = { navigate: jest.fn() };
        const { getByTestId } = render(<Intro navigation={navigationMock} route={{}} />);
        const button = getByTestId('intro-navigation-button');

        fireEvent.press(button);

        expect(navigationMock.navigate).toHaveBeenCalledWith('CoursesAppHomeScreen');
    });
});