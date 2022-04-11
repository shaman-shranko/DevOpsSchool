import React, { useState, useEffect, useCallback } from "react";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import { Image, Text, View } from 'react-native';

export default function LessonScreen() {
  const { loading, request } = useHttp();
  const [lessons, setLessons] = useState(null)

  const dataLoading = useCallback(async () => {
    try {
      let response = await request('http://192.168.0.113:5000/api/devops/lesson');
      setLessons(response)
    } catch (err) {
      console.log("Lessons screen reports:", err.message);
    }
  }, [request])

  useEffect(() => {
    dataLoading();
  }, [dataLoading])

  if (loading && !lessons) {
    return <Loader />
  }
  console.log("lesson",lessons);
  return (
    <View>
      {/* <Text>{lessons.name}</Text> */}
      {/* <Image
          style={{
            width: "100%",
            height: 200,
            borderRadius: 35,
            borderWidth: 1,
            borderColor: 'lightgrey'
          }}
          resizeMode={"contain"}
          source={{
            uri: `http://192.168.0.113:5000/${lessons.picture}`
          }}
          onLoad={() => (<ActivityIndicator size={40} color={"red"} />)}
        /> */}
    </View>
  )
}