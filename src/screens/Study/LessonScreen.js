import React, { useState, useEffect, useCallback } from "react";
import { commonStyle } from "../../styles/common.style";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import { View } from 'react-native'
// import VideoPlayer from 'react-native-video-player';

export default function LessonScreen({ navigation }) {
  const { loading, request } = useHttp();
  const [data, setData] = useState(null)

  const dataLoading = useCallback(async () => {
    try {
      let response = await request('http://192.168.0.113:5000/api/devops/single');
      setData(response)
    } catch (err) {
      console.log("Lessons screen reports:", err.message);
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
      <View style={[commonStyle.CardContainer, { height: "100%" }]}>
        {/* {data && data.video &&
          <VideoPlayer
            video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
            videoWidth={1600}
            videoHeight={900}
            thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
          />
        } */}
      </View>
    </View>
  );
}