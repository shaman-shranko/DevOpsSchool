import React, { useState, useEffect, useCallback } from "react";
import { commonStyle } from "../../styles/common.style";
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

  return (
    <View style={commonStyle.Container}>
      <View style={commonStyle.CardContainer}>
        {study && study.map((element, index) => {
          return (<Item key={`study_${index}`} navigation={goToScreen} data={element} />)
        })}
      </View>
    </View>
  );
}