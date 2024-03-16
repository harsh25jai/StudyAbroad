import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL, colors, fontSize, fonts, images, labels } from '../core';
import AppLoader from '../components/AppLoader';
import CustomHeader from '../components/CustomHeader';
import CourseCard from '../components/CourseCard';

interface courseInfo {
  id: string;
  name: string;
  university: string;
  duration: string;
  location: string;
  description: string;
  start_date: string;
  end_date: string;
  image_url: string;
}

const CourseList: FC<PropsWithChildren<{ navigation: any, route: any }>> = ({ navigation, route }) => {

  const params = route?.params;

  const [loader, setLoader] = useState(false);
  const [courseData, setCourseData] = useState<Array<courseInfo>>([]);

  const fetchFilterLocation = (location: string | undefined) => {
    fetch(API_URL.base + `/program/all?location=${location}`, { method: 'GET' })
      .then(response => response.json())
      .then(res => {
        setLoader(false);
        setCourseData(res);
      })
      .catch(err => {
        console.log('fetchFilterLocation', err)
      });
  }

  const fetchFilterDuration = (duration: string | undefined) => {
    fetch(API_URL.base + `/program/all?duration=${duration}`, { method: 'GET' })
      .then(response => response.json())
      .then(res => {
        setLoader(false);
        setCourseData(res);
      })
      .catch(err => {
        console.log('fetchFilterDuration', err)
      });
  }

  useEffect(() => {
    setLoader(true);
    return (
      params?.request == 'location' ? fetchFilterLocation(params?.name) :
        params?.request == 'duration' ? fetchFilterDuration(params?.name) :
          setLoader(false)
    );
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.app_color2 }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />
      {loader && <AppLoader />}
      <SafeAreaView style={{ flexGrow: 1, alignSelf: 'center', width: '98%' }}>
        <CustomHeader
          dark={false}
          title={params?.request == 'duration' ? params?.name + ' Months' : params?.name}
          iconOnPress={() => navigation.goBack()}
          titleOnPress={() => navigation.goBack()} />

        {courseData && courseData.length > 0
          ? <FlatList
            initialNumToRender={10}
            data={courseData}
            keyExtractor={(i, x) => x.toString()}
            contentContainerStyle={{ alignSelf: 'center', paddingBottom: 100, width: '90%' }}
            ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
            renderItem={({ item: { name, university, image_url, id, duration, location }, item, index }) => {
              return (
                <CourseCard
                  image={{
                    uri: image_url
                      ? image_url
                      : images.NoImageUrl
                  }}
                  title={name}
                  subTitle={university ? university : ''}
                  duration={duration ? duration : ''}
                  location={location ? location : ''}
                  onPress={() => navigation.push(labels.COURSE_DETAILS, { courseId: id })} />
              )
            }}
          />
          : <Text style={[styles.searchItemText, { color: colors.secondary_color }]}>
            No Results found {':)'}
          </Text>}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchItemText: {
    marginVertical: '10%',
    alignSelf: 'center',
    fontSize: fontSize[18],
    fontFamily: fonts.Quicksand_SemiBold,
  }
});

export default CourseList;