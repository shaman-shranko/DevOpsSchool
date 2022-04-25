import React, { useState, useEffect, useCallback, useContext } from "react";
import SectionComponent from "../../components/section.component";
import { AuthContext } from "../../context/auth.context";
import { commonStyle } from "../../styles/common.style";
import { useLink } from "../../hooks/links.hook";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function LessonScreen({ navigation, route }) {
  const { error, errors, loading, request } = useHttp();
  const [data, setData] = useState(null)
  const [section, setSection] = useState(0)

  const auth = useContext(AuthContext)
  const { Links } = useLink()

  const dataLoading = useCallback(async () => {
    try {
      let lesson_id = route?.params?.lesson_id ?? 0

      let response = await request(
        Links.LessonLink + lesson_id,
        "POST",
        {
          token: auth.token,
          user_id: auth.userId
        }
      );
      if (response && !error && !errors) {
        setData(response.data)
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

          <View style={{ flex: 1 }}>
            {data?.body?.map((element, index) => (index == section ? <SectionComponent key={`lesson_component_${index}`} index={index} data={element} /> : null))}
          </View>
          {/* <View style={{ height: 300, width: "100%", borderWidth: 1 }}>
            <WebView
              originWhitelist={['*']}
              source={{ uri: Links.ShellLink }}
            // javaScriptEnabled={true}
            />
          </View> */}
          {/* Button */}
          {/* <View style={commonStyle.PV10}>
            <Button
              title="Complete test"
              onPress={() => { navigation.navigate("Test") }}
            />
          </View> */}
        </View>
      </View>
    </View>
  );
}