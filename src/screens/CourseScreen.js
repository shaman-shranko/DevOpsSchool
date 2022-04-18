import React, { useState, useEffect, useCallback } from "react";
import { commonStyle } from "../styles/common.style";
import Carousel from 'react-native-snap-carousel';
import { useHttp } from "../hooks/http.hook";
import Loader from "../components/Loader";
import Item from "../components/Item";
import { View } from 'react-native'

export default function CourseScreen() {
  const { loading, request } = useHttp();
  const [course, setCourse] = useState(null)

  const dataLoading = useCallback(async () => {
    try {
      let response = await request('http://192.168.0.113:5000/api/devops/courses');
      setCourse(response)
    } catch (err) {
      console.log("Course screen reports:", err.message);
    }
  }, [request])

  useEffect(() => {
    dataLoading();
  }, [dataLoading])

  if (loading) {
    return <Loader />
  }

  const _renderItem = ({ item, index }) => {
    return (
      <Item key={`course_${index}`} data={item} isCourse />
    );
  }

  return (
    <View style={commonStyle.Container}>
      <View style={[commonStyle.CardContainer, { paddingHorizontal: 0 }]}>
        <Carousel
          data={course}
          renderItem={_renderItem}
          sliderWidth={410}
          itemWidth={360}
        />
      </View>
    </View>
  );
}