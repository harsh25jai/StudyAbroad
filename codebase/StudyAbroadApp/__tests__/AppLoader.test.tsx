import React from 'react';
import { render } from '@testing-library/react-native';
import AppLoader from '../src/components/AppLoader'


describe('AppLoader component', () => {
  test('renders loader with correct style', () => {
    const { getByTestId } = render(<AppLoader />);
    const loaderContainer = getByTestId('loader-container');
    const activityIndicator = getByTestId('activity-indicator');

    expect(loaderContainer).toBeTruthy();
    expect(activityIndicator).toBeTruthy();
    expect(loaderContainer.props.style).toEqual(expect.objectContaining({
      height: '100%',
      width: '100%',
      zIndex: 1,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center'
    }));
    expect(activityIndicator.props.size).toBe('large');
    expect(activityIndicator.props.color).toBe('#5886b5');
  });
});