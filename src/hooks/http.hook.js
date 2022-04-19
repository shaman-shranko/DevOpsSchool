import { useState, useCallback } from 'react'

export const useHttp = () => {
  const [error, setError] = useState(null)
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    clearError()

    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = "application/json"
      }

      const response = await fetch(url, { method, body, headers })
      const data = await response.json()
      console.log(data);
      if (data.status == 0) {
        if (data.error) {
          if ('string' == typeof data.error) {
            setError(data.error)
            throw new Error(data.error)
          } else {
            setErrors(data.error)
            throw new Error('Check errors')
          }
        }
      }

      if (!response.ok) {
        throw new Error(data.message || 'Something goes wrong')
      }

      setLoading(false)
      return data

    } catch (e) {
      console.log("Common error:", e.message);
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])

  const clearError = useCallback(() => { setError(null), setErrors(null) }, [])

  return { loading, request, error, errors, clearError }
}