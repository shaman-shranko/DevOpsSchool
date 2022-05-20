import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { commonStyle } from "../../styles/common.style";
import Loader from "../../components/loader.component";
import Empty from "../../components/empty.component";
import Item from "../../components/item.component";
import Carousel from 'react-native-snap-carousel';
import { useLink } from "../../hooks/links.hook";
import { useHttp } from "../../hooks/http.hook";
import { View } from 'react-native';

export default function StudyScreen({ navigation }) {
  const [study, setStudy] = useState(null)
  const { loading, request } = useHttp();
  const auth = useContext(AuthContext)
  const { Links } = useLink()

  /**
   * Load courses data
   */
  const dataLoading = useCallback(async () => {
    try {
      let response = await request(
        Links?.StudyLink,
        "POST",
        {
          token: auth.token,
          user_id: auth.userId,
          device_id: auth.deviceId,
        }
      );
      if (response && response.data) {
        let courses = response.data.filter(element => element.isBought == 1)
        setStudy(courses)
      }
    } catch (err) {

    }
  }, [request, Links])

  /**
   * Move to screen 
   * @param {*} route 
   * @param {*} name 
   * @param {*} course_id 
   */
  const goToScreen = (route, name, course_id) => {
    navigation.navigate(route, { name: name, course_id: course_id })
  }

  /**
   * If screen is in focus
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dataLoading()
    });

    return unsubscribe;
  }, [dataLoading, navigation]);

  /**
   * Load data once component is mounted
   */
  useEffect(() => {
    dataLoading();
  }, [dataLoading])

  // Show spinner while loading
  if (loading) {
    return <Loader />
  }

  // Show message if empty courses list
  if (!study || study.length == 0) {
    return <Empty message="No courses is bought" />
  }

  /**
   * Render single item in carousel
   * @param {*} param0 
   * @returns Item component
   */
  const _renderItem = ({ item, index }) => {
    return (
      <Item key={`study_${index}`} navigation={goToScreen} data={item} />
    );
  }

  return (
    <View style={commonStyle.Container}>
      <View style={[commonStyle.CardContainer, commonStyle.PH0]}>
        <Carousel
          data={study}
          renderItem={_renderItem}
          sliderWidth={410}
          itemWidth={360}
        />
      </View>
    </View>
  );
}