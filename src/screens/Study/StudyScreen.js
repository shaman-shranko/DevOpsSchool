import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { commonStyle } from "../../styles/common.style";
import Carousel from 'react-native-snap-carousel';
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import Empty from "../../components/Empty";
import Item from "../../components/Item";
import { Links } from "../../constants";
import { View } from 'react-native';

export default function StudyScreen({ navigation }) {
  const { loading, request } = useHttp();
  const [study, setStudy] = useState(null)
  const auth = useContext(AuthContext)
  const { URLS, URL } = Links()

  const dataLoading = useCallback(async () => {
    try {
      let response = await request(
        URL + URLS.StudyLink,
        "POST",
        {
          token: auth.token,
          user_id: auth.userId
        }
      );
      setStudy(response.data)
    } catch (err) {

    }
  }, [request, URL])

  const goToScreen = (route, name, course_id) => {
    navigation.navigate(route, { name: name, course_id: course_id })
  }

  useEffect(() => {
    dataLoading();
  }, [dataLoading])

  if (loading) {
    return <Loader />
  }

  if (!study) {
    return <Empty />
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