import { useState, useCallback, useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userData, setUserData] = useState(null)

  const login = useCallback(async (data) => {
    setToken(data.token)
    setUserId(data.id)
    setUserData(data)

    await AsyncStorage.setItem(storageName, JSON.stringify({
      ...data
    }))
  }, [])


  const logout = useCallback(async () => {
    setToken(null)
    setUserId(null)

    await AsyncStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const checkAuth = useCallback(async () => {
    const data = JSON.parse(await AsyncStorage.getItem(storageName))
    if (data && data.token) {
      login(data.token, data.userId)
    }
    setReady(true)
  }, [login])

  return { login, logout, token, userId, ready, userData }
}