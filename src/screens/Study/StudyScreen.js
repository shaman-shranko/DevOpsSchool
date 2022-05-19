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
  const { loading, request } = useHttp();
  const [study, setStudy] = useState(null)
  const auth = useContext(AuthContext)
  const { Links } = useLink()

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

  const goToScreen = (route, name, course_id) => {
    navigation.navigate(route, { name: name, course_id: course_id })
  }

  useEffect(() => {
    dataLoading();
    return () => { }
  }, [dataLoading])

  if (loading) {
    return <Loader />
  }

  if (!study || study.length == 0) {
    return <Empty message="No courses is bought" />
  }

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