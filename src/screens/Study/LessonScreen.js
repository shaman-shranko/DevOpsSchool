import React, { useState, useEffect, useCallback, useContext } from "react";
import SectionComponent from "../../components/section.component";
import { AuthContext } from "../../context/auth.context";
import { commonStyle } from "../../styles/common.style";
import { useLink } from "../../hooks/links.hook";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import { Button, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function LessonScreen({ navigation, route }) {
  const { error, errors, loading, request } = useHttp();
  const [contentLength, setContentLength] = useState(1)
  const [lessonId, setLessonId] = useState(null)
  const [active, setActive] = useState(0)
  const [data, setData] = useState(null)
  const auth = useContext(AuthContext)
  const { Links } = useLink()

  useEffect(() => {
    setLessonId(route?.params?.lesson_id ?? 0)
  }, [lessonId])

  const dataLoading = useCallback(async () => {
    try {


      let response = await request(
        Links.LessonLink + lessonId,
        "POST",
        {
          token: auth.token,
          user_id: auth.userId
        }
      );
      if (response && !error && !errors) {
        setData(response.data)

        setContentLength(response.data.body.length)
      }
    } catch (err) {
      console.log("Lessons screen reports:", err.message);
    }
  }, [request, Links])

  useEffect(() => {
    dataLoading();
  }, [dataLoading])

  if (loading) {
    return <Loader />
  }

  return (
    <View style={commonStyle.Container}>
      <View style={[commonStyle.CardContainer, commonStyle.FullHight]}>
        <View style={commonStyle.Card}>
          {contentLength > 1 &&
            <View style={{ height: "5%", width: "100%", borderWidth: 1 }}>
              {Array.from({ length: contentLength }, (_, index) => (
                <View
                  key={`index_${index}`}
                  style={{
                    flex: 1,
                    height: 20,
                    margin: 1,
                    backgroundColor: !!(index <= active) ? "lightgreen" : "lightgrey"
                  }}>
                </View>
              ))}
            </View>
          }
          <View style={{ height: "90%" }}>
            <View style={{ flex: 1 }}>
              {data?.body?.map((element, index) => (index == active ? <SectionComponent key={`section_component_${index}`} index={index} data={element} /> : null))}
            </View>
          </View>
          {/* <View style={{ height: 300, width: "100%", borderWidth: 1 }}>
            <WebView
              originWhitelist={['*']}
              source={{ uri: Links.ShellLink }}
            // javaScriptEnabled={true}
            />
          </View> */}
          {/* Button */}
          {((contentLength > 1 && active == contentLength - 1) || contentLength == 1) ?
            <View style={commonStyle.PV10}>
              <Button
                title="Complete test"
                onPress={() => { navigation.navigate("Test", { lessonId: data.test_id }) }}
              />
            </View>
            :
            <View style={commonStyle.PV10}>
              <Button
                title="Next step"
                onPress={() => { setActive(prev => prev + 1) }}
              />
            </View>
          }
        </View>
      </View>
    </View>
  );
}