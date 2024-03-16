import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';

describe('HomeScreen component', () => {
    test('renders correctly', () => {
        const { getByText, getByPlaceholderText } = render(<HomeScreen navigation={{}} route={{}} />);
        const headerTitle = getByText('Find your\ndream courses');
        const searchInput = getByPlaceholderText('Search courses or universities');

        expect(headerTitle).toBeTruthy();
        expect(searchInput).toBeTruthy();
    });

    test('navigates to course details screen on course card press', () => {
        const mockNavigation = {
            navigate: jest.fn(),
        };
        const { getAllByTestId } = render(<HomeScreen navigation={mockNavigation} route={{}} />);
        const courseCards = getAllByTestId('course-card');

        fireEvent.press(courseCards[0]);

        expect(mockNavigation.navigate).toHaveBeenCalled();
        expect(mockNavigation.navigate.mock.calls[0][0]).toBe('COURSE_DETAILS');
    });
});