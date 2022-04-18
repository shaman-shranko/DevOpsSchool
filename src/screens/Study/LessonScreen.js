import React, { useState, useEffect, useCallback } from "react";
import { commonStyle } from "../../styles/common.style";
import VideoPlayer from 'react-native-video-player';
import { useHttp } from "../../hooks/http.hook";
import { Button } from 'react-native-elements';
import Loader from "../../components/Loader";
import { Links } from "../../constants";
import { View } from 'react-native';

export default function LessonScreen({ navigation }) {
  const { loading, request } = useHttp();
  const [data, setData] = useState(null)

  const dataLoading = useCallback(async () => {
    try {
      let response = await request(Links.LessonLink);
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
      <View style={[commonStyle.CardContainer, commonStyle.FullHight]}>
        <View style={commonStyle.Card}>{/*{ backgroundColor: "white", padding: 10, borderRadius: 5 } */}
          {data && data.video &&
            <VideoPlayer
              video={{ uri: Links.Public + data.video }}
              videoWidth={1600}
              videoHeight={900}
              thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
            />
          }
          {/* Button */}
          <View style={commonStyle.PV10}>
            <Button
              title="Complete test"
              onPress={() => { navigation.navigate("Test") }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}