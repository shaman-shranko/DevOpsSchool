import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { commonStyle } from "../styles/common.style";
import Loader from "../components/loader.component";
import Empty from "../components/empty.component";
import Carousel from 'react-native-snap-carousel';
import Item from "../components/item.component";
import { useLink } from "../hooks/links.hook";
import { useHttp } from "../hooks/http.hook";
import { View } from 'react-native'

export default function CourseScreen() {
  const [course, setCourse] = useState(null)
  const { loading, request } = useHttp()
  const auth = useContext(AuthContext)
  const { Links } = useLink()

  const dataLoading = useCallback(async () => {
    try {
      let response = await request(
        Links.CoursesLink,
        "POST",
        {
          token: auth.token,
          user_id: auth.userId,
          device_id: auth.deviceId,
        }
      );
      if (response && response.data) {
        setCourse(response.data)
      }
    } catch (err) {
      console.log("Course screen reports:", err.message);
    }
  }, [request, Links])

  const buyCourse = async (course_id) => {
    try {
      await request(
        Links.CoursesBuyLink,
        "POST",
        {
          token: auth.token,
          user_id: auth.userId,
          device_id: auth.deviceId,
          course_id: course_id
        }
      )
    } catch (error) {
      console.log("Buy course error", error.message);
    }
  }

  useEffect(() => {
    dataLoading();
    return () => { }
  }, [dataLoading])

  if (loading) {
    return <Loader />
  }
  if (!course) {
    return <Empty />
  }


  const _renderItem = ({ item, index }) => {
    return (
      <Item key={`course_${index}`} buyCourse={() => { buyCourse(item.id) }} data={item} isCourse />
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