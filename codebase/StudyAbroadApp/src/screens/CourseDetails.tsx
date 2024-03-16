import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { API_URL, colors, fontSize, fonts, images, labels } from '../core';
import AppLoader from '../components/AppLoader';
import CustomButton from '../components/CustomButton';
import { IconButton } from 'react-native-paper';

interface courseInfo {
  name: string;
  university: string;
  duration: string;
  location: string;
  description: string;
  start_date: string;
  end_date: string;
  image_url: string;
}

const CourseDetails: FC<PropsWithChildren<{ navigation: any, route: any }>> = ({ navigation, route }) => {

  const [loader, setLoader] = useState(false);
  const [courseInfoData, setCourseInfoData] = useState<courseInfo>();

  const fetchCourseInfo = (courseId: string) => {
    fetch(API_URL.base + `/program/${courseId}`, { method: 'GET' })
      .then(response => response.json())
      .then(res => {
        setLoader(false);
        setCourseInfoData(res);
      })
      .catch(err => {
        console.log('fetchCourseInfo', err)
      });
  }

  const navigateToList = (input: string | undefined, request: string | undefined) => {
    if (input) {
      navigation.push(labels.COURSE_LIST, {
        name: input,
        request: request,
      })
    }
  }

  useEffect(() => {
    setLoader(true);
    return (
      fetchCourseInfo(route?.params?.courseId)
    );
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: colors.app_color2 }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />
      {loader && <AppLoader  />}
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={styles.imageContainer}>
          <IconButton
            icon={"chevron-left"}
            iconColor={colors.app_color}
            size={30}
            style={styles.iconButton}
            onPress={() => navigation.goBack()} />
          {courseInfoData && courseInfoData?.image_url &&
            <Image
              source={{
                uri: courseInfoData?.image_url
                  ? courseInfoData?.image_url
                  : images.NoImageUrl
              }}
              style={{ width: '100%', height: '100%' }}
              resizeMethod='auto'
              resizeMode='cover'
            />}
        </View>
        <View
          style={{ backgroundColor: colors.white, paddingVertical: 30, paddingHorizontal: 20 }}>
          <View style={styles.imageAbsoluteDesign} />
          <Text style={styles.courseTitle} numberOfLines={3}>
            {courseInfoData?.name}
          </Text>

          {courseInfoData?.university &&
            <Text style={styles.universityTitle}>
              {courseInfoData?.university}{',\t\t'}
              {courseInfoData?.location &&
                <Text
                  onPress={() => navigateToList(courseInfoData?.location, 'location')}
                  style={[styles.descriptionText, { textDecorationLine: 'underline' }]}>
                  {courseInfoData?.location}
                </Text>}
            </Text>}

          {courseInfoData?.duration &&
            <Text
              onPress={() => navigateToList(courseInfoData?.duration, 'duration')}
              style={[styles.descriptionText, { textDecorationLine: 'underline' }]}>
              {courseInfoData?.duration} Months
            </Text>}


          {courseInfoData?.description &&
            <View style={{ marginVertical: 20, }}>
              <Text style={styles.descriptionTitle}>
                Description
              </Text>
              <Text style={styles.descriptionText}>
                {courseInfoData?.description
                  ? courseInfoData?.description
                  : ''}
              </Text>
            </View>}

          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.descriptionText}>
                Start Date
              </Text>
              <Text style={styles.descriptionTitle}>
                {courseInfoData?.start_date}
              </Text>
            </View>
            <View style={{ width: 1, height: '100%', backgroundColor: colors.app_color }} />
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.descriptionText}>
                End Date
              </Text>
              <Text style={styles.descriptionTitle}>
                {courseInfoData?.end_date}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 30 }}>
            <CustomButton width={'36%'} secondary title='Apply Now' style={{ paddingVertical: 20, paddingHorizontal: 15 }} />
            <CustomButton width={'58%'} title='Get Consultaion' />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 400,
    overflow: 'hidden',
    elevation: 5,
    zIndex: 10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: colors.white,
  },
  iconButton: {
    top: 40,
    left: 10,
    padding: 0,
    zIndex: 10,
    elevation: 5,
    position: 'absolute',
    backgroundColor: colors.white,
  },
  imageAbsoluteDesign: {
    position: 'absolute',
    height: 40,
    top: -30,
    width: '100%',
    zIndex: 10,
    backgroundColor: colors.white,
  },
  courseTitle: {
    color: colors.app_color,
    fontSize: fontSize[32],
    fontFamily: fonts.Laila_SemiBold,
  },
  universityTitle: {
    marginTop: 5,
    color: colors.app_color,
    fontSize: fontSize[24],
    fontFamily: fonts.Laila_Medium,
  },
  descriptionTitle: {
    color: colors.app_color,
    fontSize: fontSize[22],
    fontFamily: fonts.Quicksand_SemiBold,
  },
  descriptionText: {
    marginVertical: 5,
    color: colors.app_color,
    fontSize: fontSize[16],
    fontFamily: fonts.Quicksand_Regular,
  }
});

export default CourseDetails;