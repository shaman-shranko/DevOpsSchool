import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { CheckBox, Button } from "react-native-elements";
import { commonStyle } from "../../styles/common.style";
import { useLink } from "../../hooks/links.hook";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import Empty from "../../components/Empty";
import { Text, View } from 'react-native'

export default function TestScreen({ navigation, route }) {
  const [questions, setQuestions] = useState(null)
  const [lessonId, setLessonId] = useState(null)
  const [active, setActive] = useState(0)
  const [data, setData] = useState(null)
  const { loading, request } = useHttp();
  const [count, setCount] = useState(0)
  const auth = useContext(AuthContext)
  const [form, setForm] = useState([])
  const { Links } = useLink()

  useEffect(() => {
    setLessonId(route?.params?.lessonId ?? 0)
  }, [lessonId])


  const dataLoading = useCallback(async () => {
    try {
      let response = await request(
        Links.TestLink + lessonId,
        "POST",
        {
          token: auth.token,
          user_id: auth.userId
        }
      );
      if (response && response.data) {
        setData(response.data)
        let q = JSON.parse(response.data.questions)
        console.log(q);
        setQuestions(q)
        setCount(q.length)
      }
    } catch (err) {
      console.log("Test screen reports:", err.message);
    }
  }, [request, Links])

  const checkAnswer = (index, answer) => {
    if (!form[index]) {
      form[index] = answer
      setForm({ ...form })
    }
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
  const Correct = { borderWidth: 1, borderColor: 'green' }
  const Incorrect = { borderWidth: 1, borderColor: 'red' }

  const checkSelection = (index, subindex, correct) => {
    let style = { marginHorizontal: 0, marginLeft: 0, marginRight: 0 }
    if (form[index] >= 0) {
      if (correct || form[index] == subindex) {
        style = { ...style, ...Correct }
      }
      if (!correct && form[index] == subindex) {
        style = { ...style, ...Incorrect }
      }
    }
    return style
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
          {/*  */}
          <View>
            {questions && Object.values(questions).map((element, index) => {
              if (index == active) {
                return (
                  <View key={`question_${index}`}>
                    <Text style={{ marginVertical: 5, fontSize: 18 }}>
                      {element.question}
                    </Text>
                    <View>
                      {Object.values(element.answers).map((answer, sub_index) => {
                        return (
                          <View key={`answer_${index}_${sub_index}`}>
                            <CheckBox
                              title={answer.answer}
                              disabled={form[index] >= 0}
                              containerStyle={checkSelection(index, sub_index, answer.correct)}
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