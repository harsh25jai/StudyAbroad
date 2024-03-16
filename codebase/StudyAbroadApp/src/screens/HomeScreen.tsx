import React, { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, Dimensions, FlatList, Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton, RadioButton, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL, colors, fontSize, fonts, images, labels } from '../core';
import CourseCard from '../components/CourseCard';
import CustomButton from '../components/CustomButton';

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

const HomeScreen: FC<PropsWithChildren<{ navigation: any, route: any }>> = ({ navigation, route }) => {

  const height: any = Dimensions.get('screen').height;
  const scrollTrendX = useRef(new Animated.Value(0)).current;

  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);
  const [courses, setCourses] = useState<Array<courseInfo>>([]);
  const [isVisible, setIsVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const locationsData = ["New York", "London", "Paris", "Tokyo", "Sydney"];
  const durationData = Array.from({ length: 12 }, (_, index) => index + 1);
  const [filterLocation, setFilterLocation] = useState('');
  const [filterDuration, setFilterDuration] = useState(0);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fetchCourses = () => {
    setLoader(true);
    fetch(API_URL.base + '/program/all', { method: 'GET' })
      .then(response => response.json())
      .then(res => {
        setCourses(res);
        fadeIn();
        setLoader(false);
      })
      .catch(err => {
        console.log('fetchCourses', err);
        setLoader(false);
      });
  }

  const fetchFilteredCourses = (location: string, duration: number) => {
    if (location || duration) {
      setLoader(true);
      const filterString = location && !duration ? `?location=${location}` :
        duration && !location ? `?duration=${duration}` :
          `?location=${location}&duration=${duration}`;

      fetch(API_URL.base + '/program/all' + filterString, { method: 'GET' })
        .then(response => response.json())
        .then(res => {
          setCourses(res);
          fadeIn();
          setIsVisible(false);
          setLoader(false);
        })
        .catch(err => {
          console.log('fetchFilteredCourses', err);
          setLoader(false);
        });
    } else {
      Alert.alert('Please select one of location or duration.');
    }
  }

  useEffect(() => {
    return (
      fetchCourses()
    );
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: colors.app_color2 }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flexGrow: 1 }}
          contentContainerStyle={{ width: '90%', alignSelf: 'center', marginVertical: 10, paddingBottom: 100 }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.headerTitle}>Find your {'\n'}dream courses</Text>
          </View>
          <TextInput
            onPressIn={() => navigation.navigate(labels.SEARCH_STACK)}
            placeholder={'Search courses or universities'}
            value={search}
            onChangeText={setSearch}
            selectionColor={colors.border_grey}
            underlineColor={'transparent'}
            theme={{ colors: { primary: 'transparent' } }}
            textColor={colors.app_color}
            placeholderTextColor={colors.secondary_color}
            onMagicTap={() => navigation.navigate(labels.SEARCH_STACK)}
            contentStyle={{ fontFamily: fonts.Quicksand_Medium }}
            style={[styles.searchInput, { backgroundColor: colors.white }]}
            left={<TextInput.Icon icon='magnify' iconColor={colors.secondary_color} />} />

          {loader
            ? <ActivityIndicator size={'large'} color={colors.app_color} style={{ flex: 1, marginTop: '10%' }} />
            : courses && courses.length > 0
              ? <Animated.View style={[{ marginTop: 30, width: '100%' }, { opacity: fadeAnim }]}>
                <View style={{ flexDirection: 'row', marginBottom: '10%' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.sectionTitle}>
                      {filterLocation || filterDuration ? 'Filtered' : 'Popular'} Courses
                    </Text>
                    {!filterLocation || !filterDuration ?
                      <Text style={styles.sectionSubTitle}>Preferred courses by most users</Text>
                      : null}
                  </View>
                  <IconButton
                    icon="filter"
                    iconColor={filterLocation || filterDuration ? colors.white : colors.app_color}
                    size={28}
                    onPress={() => setIsVisible(true)}
                    style={{ backgroundColor: filterLocation || filterDuration ? colors.app_color : colors.white }}
                  />

                  {filterLocation || filterDuration
                    ? <IconButton
                      icon="close"
                      iconColor={colors.app_color}
                      size={28}
                      style={{ backgroundColor: colors.white }}
                      onPress={() => {
                        setFilterLocation('');
                        setFilterDuration(0);
                        fetchCourses();
                      }}
                    />
                    : null}
                </View>
                <Animated.FlatList
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollTrendX } } }],
                    { useNativeDriver: true }
                  )}
                  data={courses}
                  initialNumToRender={10}
                  keyExtractor={(i, x) => x.toString()}
                  ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
                  renderItem={({ item: { name, university, image_url, id, duration, location }, item, index }) => {
                    const inputRange = [
                      -1,
                      0,
                      (height * 0.2 + 12) * index,
                      (height * 0.2 + 12) * (index + 4),
                    ];

                    const opacity = scrollTrendX.interpolate({
                      inputRange,
                      outputRange: [1, 1, 1, 0],
                    });

                    const Offset = scrollTrendX.interpolate({
                      inputRange,
                      outputRange: [0, 0, 0, 100],
                    });

                    const scale = 1;

                    return (
                      <Animated.View
                        style={{
                          transform: [{ scale: scale }, { translateY: Offset }],
                          opacity: opacity,
                        }}>
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
                      </Animated.View>)
                  }}
                />
              </Animated.View>
              : <Text style={[styles.sectionTitle, { color: colors.secondary_color, textAlign: 'center', marginTop: '10%' }]}>
                No Results found {':)'}
              </Text>}
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <IconButton
                icon="close"
                iconColor={colors.app_color}
                size={28}
                onPress={() => setIsVisible(false)}
                style={{ alignSelf: 'flex-end' }}
              />

              <View style={{ flexDirection: 'row', width: '100%', marginBottom: '10%' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={[styles.sectionTitle, { marginBottom: '5%' }]}>
                    Location
                  </Text>

                  <FlatList
                    data={locationsData}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) =>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                          value={item}
                          status={filterLocation === item ? 'checked' : 'unchecked'}
                          color={colors.app_color}
                          uncheckedColor={colors.secondary_color}
                          onPress={() => setFilterLocation(item)}
                        />
                        <Text style={[styles.filterValue]} onPress={() => setFilterLocation(item)}>
                          {item}
                        </Text>
                      </View>
                    } />
                </View>
                <View style={{ width: 1, height: '100%', backgroundColor: colors.app_color }} />
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={[styles.sectionTitle, { marginBottom: '5%' }]}>
                    Duration
                  </Text>

                  <FlatList
                    data={durationData}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) =>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                          value={item.toString()}
                          status={filterDuration === item ? 'checked' : 'unchecked'}
                          color={colors.app_color}
                          uncheckedColor={colors.secondary_color}
                          onPress={() => setFilterDuration(item)}
                        />
                        <Text style={[styles.filterValue]} onPress={() => setFilterDuration(item)}>
                          {item} Month{item == 1 ? '' : 's'}
                        </Text>
                      </View>
                    } />
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <CustomButton
                  width={'40%'}
                  title='Apply Filter'
                  onPress={() => fetchFilteredCourses(filterLocation, filterDuration)}
                  style={{ paddingVertical: 20, paddingHorizontal: 15 }} />

                {filterLocation || filterDuration
                  ? <CustomButton
                    width={'40%'}
                    secondary
                    title='Clear Filter'
                    onPress={() => {
                      setFilterLocation('');
                      setFilterDuration(0);
                    }}
                    style={{ paddingVertical: 20, paddingHorizontal: 15 }} />
                  : null}
              </View>
            </View>
          </View>
        </Modal>
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
  searchInput: {
    width: '100%',
    borderRadius: 28,
    borderTopEndRadius: 28,
    borderTopStartRadius: 28,
  },
  sectionTitle: {
    color: colors.secondary_color,
    fontSize: fontSize[18],
    fontFamily: fonts.Laila_SemiBold,
  },
  sectionSubTitle: {
    color: colors.app_color,
    fontSize: fontSize[14],
    fontFamily: fonts.Quicksand_Regular,
    marginBottom: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: colors.white,
  },
  filterValue: {
    marginBottom: 5,
    textAlignVertical: 'center',
    color: colors.app_color,
    fontSize: fontSize[16],
    fontFamily: fonts.Quicksand_Medium,
  },

});

export default HomeScreen;