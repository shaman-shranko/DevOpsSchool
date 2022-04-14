import React, { useState, useEffect, useCallback } from "react";
import { commonStyle } from "../../styles/common.style";
import { CheckBox, Button } from "react-native-elements";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import Empty from "../../components/Empty";
import { Text, View } from 'react-native'
import { Links } from "../../constants";
import { WebView } from 'react-native-webview';

export default function TestScreen({ navigation }) {
  const { loading, request } = useHttp();
  const [data, setData] = useState(null)
  const [active, setActive] = useState(0)
  const [count, setCount] = useState(0)
  const [form, setForm] = useState([])

  const dataLoading = useCallback(async () => {
    try {
      let response = await request(Links.TestLink);
      setData(response)
      setCount(response.length)
    } catch (err) {
      console.log("Test screen reports:", err.message);
    }
  }, [request])

  const checkAnswer = (index, answer) => {
    form[index] = answer
    setForm({ ...form })
  }

  useEffect(() => {
    dataLoading();
  }, [dataLoading])

  if (loading) {
    return <Loader />
  }

  if (!data) {
    return <Empty />
  }

  return (
    <View style={commonStyle.Container}>
      <View style={[commonStyle.CardContainer, { height: "90%", width: "90%", marginTop: 20, borderRadius: 20, backgroundColor: "white" }]}>

        <View style={{ flexDirection: "row" }}>
          {Array.from({ length: count }, (item, index) => (<View
            key={`index_${index}`}
            style={{
              flex: 1,
              height: 20,
              margin: 1,
              backgroundColor: !!(index <= active) ? "lightgreen" : "lightgrey"
            }}>
          </View>
          )
          )}
        </View>
        <View>
          {data && data.map((element, index) => {
            if (index == active) {
              return (
                <View key={`question_${index}`}>
                  <Text style={{ marginVertical: 5, fontSize: 18 }}>
                    {element.question}
                  </Text>
                  <View>
                    {element.answers.map((answer, sub_index) => {
                      return (
                        <View key={`answer_${index}_${sub_index}`}>
                          <CheckBox
                            title={answer.label}
                            containerStyle={{ marginHorizontal: 0, marginLeft: 0, marginRight: 0 }}
                            checked={sub_index == form[index]}
                            onPress={() => { checkAnswer(index, sub_index) }}
                          />
                        </View>
                      )
                    })}
                  </View>
                </View>
              )
            }
          })}
        </View>
        <Button
          title={'Next question'}
          onPress={() => { if (active < count) setActive(active + 1) }}
          disabled={!(active < count - 1)}
        />
        <View style={{ marginTop: 20 }}>
          <Text>Check your answer in console: </Text>
          {/* <WebView
            style={{ height: 200, width: "100%", borderWidth: 1, borderColor: "black" }}
            source={{ uri: 'https://reactnativeelements.com/docs/components/checkbox' }}
          /> */}
        </View>
      </View>
    </View>
  );
}