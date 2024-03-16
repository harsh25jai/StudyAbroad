import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../core';

const AppLoader = () => {
  return (
    <View testID='loader-container' style={styles.loaderContainer} >
      <ActivityIndicator testID='activity-indicator' size={'large'} color={colors.app_color} />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    height: '100%',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AppLoader;