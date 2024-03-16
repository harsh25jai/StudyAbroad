import React, { FC } from 'react';
import { GestureResponderEvent, ImageSourcePropType, ImageStyle, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Card, } from 'react-native-paper';
import { colors, fontSize, fonts } from '../core';

interface CardProps {
  /**
   * The image source (either a remote URL or a local file resource).
   *
   * This prop can also contain several remote URLs, specified together with their width and height and potentially with scale/other URI arguments.
   * The native side will then choose the best uri to display based on the measured size of the image container.
   * A cache property can be added to control how networked request interacts with the local cache.
   *
   * The currently supported formats are png, jpg, jpeg, bmp, gif, webp (Android only), psd (iOS only).
   */
  image: ImageSourcePropType;

  /**
   * Title 
   */
  title: String;

  /**
   * Subtitle
   */
  subTitle: String;

  /**
   * Style for Card Container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Style for Image Card Container
   */
  imageCardStyle?: StyleProp<ViewStyle>;

  /**
   * Style for Image
   */
  imageStyle?: StyleProp<ImageStyle>;

  /**
   * On Pressing Card
   */
  onPress?: (event: GestureResponderEvent) => void;

  /**
   * Duration of the course 
   */
  duration?: String;

  /**
   * Location of the course
   */
  location?: String;
}

const CourseCard: FC<CardProps>
  = ({ image, title, subTitle, onPress, style, imageCardStyle, imageStyle, duration, location, ...props }) => {
    return (
      <Pressable style={[styles.cardContainer, style]} onPress={onPress} {...props}>
        <Card elevation={3} mode='elevated' style={[styles.CardStyle, imageCardStyle]}>
          <Card.Cover source={image} style={[{ height: '100%', width: '100%' }, imageStyle]} />
        </Card>

        <View style={{ height: '25%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={styles.titleStyle} numberOfLines={subTitle == '' ? 2 : 1}>{title}</Text>
            <Text style={styles.subtext} numberOfLines={1}>{duration} Month{duration == '1' ? '' : 's'}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={styles.subTitleStyle} numberOfLines={1}>{subTitle}</Text>
            <Text style={styles.subtext} numberOfLines={location == '' ? 2 : 1}>{location}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

const styles = StyleSheet.create({
  cardContainer: {
    height: 300,
    width: '100%',
    padding: 12,
    borderRadius: 24,
    backgroundColor: colors.white
  },
  CardStyle: {
    marginBottom: 10,
    width: '100%',
    height: '75%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.white
  },
  titleStyle: {
    flex: 1,
    padding: 2,
    color: colors.secondary_color,
    fontSize: fontSize[20],
    fontFamily: fonts.Laila_SemiBold
  },
  subTitleStyle: {
    flex: 1,
    color: colors.secondary_color,
    paddingHorizontal: 2,
    fontSize: fontSize[16],
    fontFamily: fonts.Quicksand_Medium
  },
  subtext: {
    textDecorationLine: 'underline',
    color: colors.secondary_color,
    fontSize: fontSize[14],
    fontFamily: fonts.Quicksand_Regular
  }
});

export default CourseCard;