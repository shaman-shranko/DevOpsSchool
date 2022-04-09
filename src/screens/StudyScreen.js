import React, { useState, useEffect, useCallback } from "react";
import { commonStyle } from "../styles/common.style";
import { useHttp } from "../hooks/http.hook";
import Loader from "../components/Loader";
import Item from "../components/Item";
import { View } from 'react-native'

export default function StudyScreen() {
  const { loading, request } = useHttp();
  const [study, setStudy] = useState(null)

  const dataLoading = useCallback(async () => {
    try {
      let response = await request('http://192.168.0.113:5000/api/devops/study');
      setStudy(response)
    } catch (err) {
      console.log("Study screen reports:", err.message);
    }
  }, [request])

  useEffect(() => {
    dataLoading();
  }, [dataLoading])

  if (loading) {
    return <Loader />
  }

  return (
    <View style={commonStyle.Container}>
      <View style={commonStyle.CardContainer}>
        {study && study.map((element, index) => {
          return (<Item key={`study_${index}`} data={element} />)
        })}
      </View>
    </View>
  );
}