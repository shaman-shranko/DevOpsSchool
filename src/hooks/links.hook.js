import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

export const useLink = () => {
  const [URL, setURL] = useState("")
  const [URLS, setURLS] = useState({})

  useEffect(() => {
    getUrl()
  }, [getUrl])

  const getUrl = async () => {
    let url = await AsyncStorage.getItem('used_url')
    if (url) {
      setURL(url)
      setURLS(() => createURLs(url))
    }
  }

  const saveUrl = async (url) => {
    await AsyncStorage.setItem('used_url', url)
    setURL(url)
    setURLS(() => createURLs(url))
  }
  const createURLs = (url) => {
    return {
      Public: url + '_uploads/',

      StudyLink: url + `api/get-courses`,
      PlanLink: url + `api/get-plan-list/`,
      TopicLink: url + `api/get-plan/`,
      LessonLink: url + `api/get-lesson/`,
      TestLink: url + `api/devops/test`,

      CoursesLink: url + `api/get-courses`,

      LoginLink: url + `api/login`,
      SignUpLink: url + `api/registration`,
      ShellLink: url + `/shell_commander`
    }
  }
  return { Links: URLS, URL, saveUrl }
}