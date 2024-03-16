import React, { FC, PropsWithChildren, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, StatusBar, StyleSheet, Text, View } from 'react-native';
import { TextInput, } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL, colors, fontSize, fonts, images, labels } from '../core';
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

const SearchScreen: FC<PropsWithChildren<{ navigation: any, route: any }>> = ({ navigation, route }) => {

  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState('');
  const [coursesData, setCoursesData] = useState<Array<courseInfo>>([]);


  const fetchSearchResults = (search: string) => {
    setLoader(true);
    fetch(API_URL.base + `/program/search?query=${search}`, { method: 'GET' })
      .then(response => response.json())
      .then(res => {
        setLoader(false);
        setCoursesData(res);
      })
      .catch(err => {
        console.log('fetchSearchResults', err)
      });
  }

  const searchCourses = (search: string) => {
    if (search !== '' && search.length > 3) {
      Keyboard.dismiss();
      fetchSearchResults(search);
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: colors.app_color2 }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />
      <SafeAreaView style={{ flex: 1, width: '90%', alignSelf: 'center', marginVertical: 10 }}>
        <CustomHeader
          dark={false}
          title={'Search Courses'}
          iconOnPress={() => navigation.goBack()}
          titleOnPress={() => navigation.goBack()} />
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.headerSubTitle}>Start Searching your favourite course or university here...</Text>
        </View>

        <TextInput
          placeholder={'Search courses or universities'}
          value={search}
          onChangeText={(text) => {
            setSearch(text);
          }}
          selectionColor={colors.border_grey}
          underlineColor={'transparent'}
          theme={{ colors: { primary: 'transparent' } }}
          textColor={colors.app_color}
          placeholderTextColor={colors.secondary_color}
          contentStyle={{ fontFamily: fonts.Quicksand_Medium }}
          style={[styles.searchInput, { backgroundColor: colors.white }]}
          onSubmitEditing={() => searchCourses(search)}
          left={<TextInput.Icon
            icon='magnify'
            iconColor={search !== '' && search.length > 3 ? colors.app_color : colors.secondary_color}
            onPress={() => searchCourses(search)} />}
          right={<TextInput.Icon
            icon='close'
            iconColor={search !== '' && search.length > 3 ? colors.black : colors.white}
            onPress={() => setSearch('')} />}
        />

        <View style={{ flex: 1, marginTop: 20 }}>
          {search !== '' && search.length > 3
            ? loader
              ? <ActivityIndicator size={'large'} color={colors.app_color} style={{ flex: 1 }} />
              : coursesData && coursesData.length > 0
                ? <FlatList
                  initialNumToRender={10}
                  data={coursesData}
                  keyExtractor={(i, x) => x.toString()}
                  contentContainerStyle={{ alignSelf: 'center', paddingBottom: 100, width: '100%' }}
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
                        onPress={() => navigation.navigate(labels.COURSE_DETAILS, { courseId: id })} />
                    )
                  }}
                />
                : <Text style={[styles.searchItemText, { color: colors.secondary_color }]}>
                  No Results found {':)'}
                </Text>
            : null}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: colors.secondary_color,
    fontSize: fontSize[36],
    fontFamily: fonts.Laila_SemiBold,
  },
  headerSubTitle: {
    color: colors.secondary_color,
    fontSize: fontSize[16],
    fontFamily: fonts.Quicksand_Regular,
  },
  recentTitle: {
    color: colors.app_color,
    fontSize: fontSize[16],
    fontFamily: fonts.Laila_Medium,
  },
  searchInput: {
    width: '100%',
    borderRadius: 28,
    borderTopEndRadius: 28,
    borderTopStartRadius: 28,
  },
  searchItemText: {
    marginVertical: '10%',
    alignSelf: 'center',
    fontSize: fontSize[18],
    fontFamily: fonts.Quicksand_SemiBold,
  },
  recentSearchContainer: {
    height: 200,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.white
  },
  recentSearchItem: {
    padding: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.grey,
    color: colors.black,
    fontSize: fontSize[16],
    fontFamily: fonts.Quicksand_Regular,
  },
  recentSearchText: {
    color: colors.black,
    fontSize: fontSize[16],
    fontFamily: fonts.Quicksand_Regular,
  }
});

export default SearchScreen;