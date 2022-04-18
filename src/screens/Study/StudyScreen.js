import React, { useState, useEffect, useCallback } from "react";
import { commonStyle } from "../../styles/common.style";
import Carousel from 'react-native-snap-carousel';
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import Empty from "../../components/Empty";
import Item from "../../components/Item";
import { Alert, View } from 'react-native';
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

  const _renderItem = ({item, index}) => {
    return (
      <Item key={`study_${index}`} navigation={goToScreen} data={item} />
    );
}

  return (
    <View style={commonStyle.Container}>
      <View style={[commonStyle.CardContainer,{paddingHorizontal:0}]}>
      <Carousel
              // ref={(c) => { this._carousel = c; }}
              data={study}
              renderItem={_renderItem}
              sliderWidth={410}
              itemWidth={360}
            />

        {/* {study && study.map((element, index) => {
          return (<Item key={`study_${index}`} navigation={goToScreen} data={element} />)
        })} */}
      </View>
    </View>
  );
}