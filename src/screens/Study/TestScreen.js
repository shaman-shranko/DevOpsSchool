import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { commonStyle } from "../../styles/common.style";
import Loader from "../../components/loader.component";
import Empty from "../../components/empty.component";
import Tests from '../../components/tests.component';
import { useLink } from "../../hooks/links.hook";
import { useHttp } from "../../hooks/http.hook";
import { View } from 'react-native'

export default function TestScreen({ navigation, route }) {
  const [questions, setQuestions] = useState(null)
  const [lessonId, setLessonId] = useState(null)
  const [answers, setAnswers] = useState([])
  const { loading, request } = useHttp();
  const [data, setData] = useState(null)
  const auth = useContext(AuthContext)
  const { Links } = useLink()

  useEffect(() => {
    setLessonId(route?.params?.lessonId ?? 0)
  }, [lessonId])

  const dataLoading = useCallback(async () => {
    try {
      let response = await request(
        Links?.TestLink + lessonId,
        "POST",
        {
          token: auth.token,
          user_id: auth.userId,
          device_id: auth.deviceId,
        }
      );
      if (response && response.data) {
        setData(response.data)
        let quiz = Object.values(JSON.parse(response.data.questions));
        quiz.map(element => { element.answers = Object.values(element.answers) })

        setQuestions(quiz)
        console.log("Got data", response.data);
      }
    } catch (err) {
      console.log("Test screen reports:", err.message);
    }
  }, [request, Links])

  const rateLesson = useCallback(async () => {
    try {
      await request(
        Links?.TestRateLink,
        "POST",
        {
          token: auth.token,
          test_id: data?.id,
          user_id: auth.userId,
          device_id: auth.deviceId,
          correct_answers: Object.values(answers).filter(x => !!x.correct).length,
        },
        {},
        false
      )
    } catch (error) {
      console.log("Rate Lesson error:", error.message);
    }
  }, [request, Links, data, answers])

  const finishTest = useCallback(async () => {
    await request(
      Links?.LessonFinishLink,
      "POST",
      {
        token: auth.token,
        test_id: data?.id,
        user_id: auth.userId,
        course_id: data?.course_id,
        device_id: auth.deviceId
      },
      {},
      false
    )
  }, [request, data])

  const testDone = async () => {
    await rateLesson();
    if (data?.rate == 1) {
      await finishTest()
    }
    navigation.popToTop();
    navigation.navigate("Plan", { plan_id: route?.params?.plan_id })

  }

  useEffect(() => {
    dataLoading();
    return () => { }
  }, [dataLoading])

  if (loading) {
    return <Loader />
  }

  if (!questions) {
    return <Empty />
  }

  return (
    <View style={commonStyle.Container}>
      <View style={[commonStyle.CardContainer]}>
        <View style={commonStyle.Card}>
          <Tests
            needFinish
            questions={questions}
            onChange={state => { setAnswers(state) }}
            onSave={testDone} />
        </View>
      </View>
    </View>
  );
}