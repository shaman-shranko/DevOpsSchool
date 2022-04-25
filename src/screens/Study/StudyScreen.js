import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { commonStyle } from "../../styles/common.style";
import Carousel from 'react-native-snap-carousel';
import { useLink } from "../../hooks/links.hook";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import Empty from "../../components/Empty";
import Item from "../../components/Item";
import { View } from 'react-native';

export default function StudyScreen({ navigation }) {
  const { loading, error, errors, request } = useHttp();
  const [study, setStudy] = useState(null)
  const auth = useContext(AuthContext)
  const { Links } = useLink()

  const dataLoading = useCallback(async () => {
    try {
      let response = await request(
        Links.StudyLink,
        "POST",
        {
          token: auth.token,
          user_id: auth.userId
        }
      );
      if (response && !error && !errors) {
        setStudy(response.data)
      }
    } catch (err) {

    }
  }, [request, Links])

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