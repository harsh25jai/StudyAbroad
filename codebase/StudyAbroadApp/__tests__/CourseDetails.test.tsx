import React from 'react';
import { render } from '@testing-library/react-native';
import CourseDetails from '../src/screens/CourseDetails';

describe('CourseDetails component', () => {
    test('renders loader when loader state is true', () => {
        const { getByTestId } = render(<CourseDetails navigation={{}} route={{}} />);
        const loader = getByTestId('loader-container');

        expect(loader).toBeTruthy();
    });

    test('renders course details correctly', () => {
        const mockCourseInfo = {
            name: 'Course Name',
            university: 'University Name',
            duration: '6',
            location: 'New York',
            description: 'Course Description',
            start_date: '2024-01-01',
            end_date: '2024-07-01',
            image_url: 'https://example.com/image.jpg'
        };

        const { getByText } = render(<CourseDetails navigation={{}} route={{}} />);
        const courseTitle = getByText('Course Name');
        const universityTitle = getByText('University Name');
        const locationText = getByText('New York');
        const durationText = getByText('6 Months');
        const descriptionTitle = getByText('Description');
        const descriptionText = getByText('Course Description');
        const startDateText = getByText('2024-01-01');
        const endDateText = getByText('2024-07-01');

        expect(courseTitle).toBeTruthy();
        expect(universityTitle).toBeTruthy();
        expect(locationText).toBeTruthy();
        expect(durationText).toBeTruthy();
        expect(descriptionTitle).toBeTruthy();
        expect(descriptionText).toBeTruthy();
        expect(startDateText).toBeTruthy();
        expect(endDateText).toBeTruthy();
    });
});
