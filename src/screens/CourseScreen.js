import React, { useState, useEffect, useCallback } from "react";
import { commonStyle } from "../styles/common.style";
import Carousel from 'react-native-snap-carousel';
import { useHttp } from "../hooks/http.hook";
import Loader from "../components/Loader";
import Item from "../components/Item";
import { View } from 'react-native'
import { Links } from "../constants";

export default function CourseScreen() {
  const { loading, request } = useHttp();
  const [course, setCourse] = useState(null)
  const { URLS, URL } = Links()

  const dataLoading = useCallback(async () => {
    try {
      let response = await request(URL + URLS.CoursesLink);
      setCourse(response.data)
    } catch (err) {
      console.log("Course screen reports:", err.message);
    }
  }, [request, URL])

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
      <View style={[commonStyle.CardContainer, commonStyle.PH0]}>
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