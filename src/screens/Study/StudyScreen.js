import React, { useState, useEffect, useCallback } from "react";
import { commonStyle } from "../../styles/common.style";
import Carousel from 'react-native-snap-carousel';
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import Empty from "../../components/Empty";
import { Alert, View } from 'react-native';
import Item from "../../components/Item";
import { Links } from "../../constants";


export default function StudyScreen({ navigation }) {
  const { loading, request } = useHttp();
  const [study, setStudy] = useState(null)

  const dataLoading = useCallback(async () => {
    try {
      let response = await request(Links.StudyLink);
      setStudy(response)
    } catch (err) {
      Alert.alert(err.message)
    }
  }, [request])

  const goToScreen = (route, name) => {
    navigation.navigate(route, { name: name })
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