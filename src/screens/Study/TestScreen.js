import React, { useState, useEffect, useCallback } from "react";
import { commonStyle } from "../../styles/common.style";
import { CheckBox, Button } from "react-native-elements";
import { useLink } from "../../hooks/links.hook";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import Empty from "../../components/Empty";
import { Text, View } from 'react-native'

export default function TestScreen({ navigation }) {
  const { loading, request } = useHttp();
  const { Links } = useLink()
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
  }, [request, Links])

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
      <View style={[commonStyle.CardContainer]}>
        <View style={commonStyle.Card}>
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
          {/* Next question button */}
          <View>
            <Button
              title={'Next question'}
              onPress={() => { if (active < count) setActive(active + 1) }}
              disabled={!(active < count - 1)}
            />
          </View>
          {/* Console section */}
          <View style={commonStyle.MT20}>
            <Text>Check your answer in console: </Text>
            {/* <WebView
            style={{ height: 200, width: "100%", borderWidth: 1, borderColor: "black" }}
            source={{ uri: 'https://reactnativeelements.com/docs/components/checkbox' }}
          /> */}
          </View>
        </View>
      </View>
    </View>
  );
}