import { createContext } from 'react'

function noop() { }

export const AuthContext = createContext({
  userId: null,
  token: null,
  isAuthenticated: false,
  login: noop,
  logout: noop,
})