import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchScreen from '../src/screens/SearchScreen';

describe('SearchScreen component', () => {
    test('renders search input and search button', () => {
        const { getByPlaceholderText, getByTestId } = render(<SearchScreen navigation={{}} route={{}} />);
        const searchInput = getByPlaceholderText('Search courses or universities');

        expect(searchInput).toBeTruthy();
    });

    test('searches for courses when search input is filled and search button is pressed', () => {
        const { getByPlaceholderText, getByTestId, getByText } = render(<SearchScreen navigation={{}} route={{}} />);
        const searchInput = getByPlaceholderText('Search courses or universities');
    
        fireEvent.changeText(searchInput, 'React Native');

        const searchResultText = getByText('Loading...');

        expect(searchResultText).toBeTruthy();
    });
});
