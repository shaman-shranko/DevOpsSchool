import { createContext } from 'react'

function noop() { }

export const AuthContext = createContext({
  userId: null,
  token: null,
  deviceId: null,
  userData: null,
  isAuthenticated: false,
  ready: false,
  connected: true,
  login: noop,
  logout: noop,
  setConnected: noop,
  setUserData: noop,
  refreshConnection: noop,
})