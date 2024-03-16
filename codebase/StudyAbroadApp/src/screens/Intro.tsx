import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { colors, fontSize, fonts, images, labels } from '../core';

const Intro: FC<PropsWithChildren<{ navigation: any, route: any }>> = ({ navigation, route }) => {
  const introImages = [images.intro, images.intro2, images.intro3];

  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      let increase = count + 1 > introImages.length - 1 ? 0 : count + 1;
      setCount(increase);
    }, 2000)

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
      <ImageBackground source={introImages[count]} style={{ height: '100%', width: '100%' }}>
        <View style={styles.cardContainer}>
          <Text style={styles.titleStyle}>Study abroad:{'\n'}
            <Text style={{ fontSize: fontSize[24] }}>Expand your world, broaden perspectives.</Text>
          </Text>
          <Text style={styles.subTitleStyle}>Discover 50+ customizable courses for your academic journey.</Text>
        </View>

        <IconButton
          testID='intro-navigation-button'
          icon="pan-right"
          iconColor={'white'}
          size={40}
          onPress={() => navigation.navigate(labels.HOME_SCREEN)}
          style={{ backgroundColor: colors.app_color, alignSelf: 'center' }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  appHomeButton: {
    margin: 10,
    marginTop: 40,
    elevation: 3,
    zIndex: 1,
    borderRadius: 30,
    position: 'absolute',
  },
  cardContainer: {
    height: '40%',
    width: '70%',
    margin: 20,
    marginTop: '15%',
    marginBottom: '50%',
    borderRadius: 12,
    backgroundColor: colors.white
  },
  titleStyle: {
    margin: 20,
    alignSelf: 'flex-start',
    color: colors.app_color,
    fontFamily: fonts.Laila_Bold,
    fontSize: fontSize[28]
  },
  subTitleStyle: {
    margin: 20,
    alignSelf: 'flex-start',
    color: colors.app_color,
    fontFamily: fonts.Quicksand_Medium,
    fontSize: fontSize[16]
  }
});

export default Intro;