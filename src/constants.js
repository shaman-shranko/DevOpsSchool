import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useCallback } from "react";


export const Links = () => {
  const [URL, setURL] = useState("")

  const [URLS, setURLS] = useState({
    Public: '_uploads/',

    StudyLink: `api/get-courses`,
    PlanLink: `api/ge-plan-ist/`,
    TopicLink: `api/devops/topic`,
    LessonLink: `api/devops/single`,
    TestLink: `api/devops/test`,

    CoursesLink: `api/get-courses`,

    LoginLink: `api/login`,
    SignUpLink: `api/registration`
  })

  useEffect(() => {
    getUrl()
  }, [getUrl])

  const getUrl = useCallback(async () => {
    let url = await AsyncStorage.getItem('used_url')
    if (url) {
      setURL(url)
    }
  }, [])

  const saveUrl = useCallback(async (url) => {
    await AsyncStorage.setItem('used_url', url)
    setURL(url)
  }, [])
  return { URLS, saveUrl, URL }
}