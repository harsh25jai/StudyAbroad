import React from 'react';
import { render } from '@testing-library/react-native';
import CourseList from '../src/screens/CourseList';

describe('CourseList component', () => {
    test('renders loader when loader state is true', () => {
        const { getByTestId } = render(<CourseList navigation={{}} route={{}} />);
        const loader = getByTestId('app-loader');

        expect(loader).toBeTruthy();
    });

    test('renders course list correctly', () => {
        const mockCourseData = [
            { id: '1', name: 'Course 1', university: 'University 1', duration: '4', location: 'New York', description: 'Description 1', start_date: '2024-01-01', end_date: '2024-06-01', image_url: 'https://example.com/image1.jpg' },
            { id: '2', name: 'Course 2', university: 'University 2', duration: '6', location: 'London', description: 'Description 2', start_date: '2024-02-01', end_date: '2024-07-01', image_url: 'https://example.com/image2.jpg' }
        ];

        const { getByText, queryByText } = render(<CourseList navigation={{}} route={{}} />);
        const course1 = getByText('Course 1');
        const course2 = getByText('Course 2');
        const noResultsText = queryByText('No Results found :)');

        expect(course1).toBeTruthy();
        expect(course2).toBeTruthy();
        expect(noResultsText).toBeNull();
    });

});
