import { useState, useEffect, useCallback } from 'react'

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async (fetchUrl = url, fetchOptions = options) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(fetchUrl, {
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
        ...fetchOptions,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [url, options])

  const refetch = useCallback(() => {
    return fetchData()
  }, [fetchData])

  useEffect(() => {
    if (url) {
      fetchData()
    }
  }, [url, fetchData])

  return {
    data,
    loading,
    error,
    refetch,
    setData,
    setError,
  }
}

export const usePost = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const postData = useCallback(async (postData, postOptions = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
          ...postOptions.headers,
        },
        body: JSON.stringify(postData),
        ...options,
        ...postOptions,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [url, options])

  return {
    data,
    loading,
    error,
    postData,
    setData,
    setError,
  }
}

export const usePut = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const putData = useCallback(async (putData, putOptions = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
          ...putOptions.headers,
        },
        body: JSON.stringify(putData),
        ...options,
        ...putOptions,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [url, options])

  return {
    data,
    loading,
    error,
    putData,
    setData,
    setError,
  }
}

export const useDelete = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const deleteData = useCallback(async (deleteOptions = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
          ...deleteOptions.headers,
        },
        ...options,
        ...deleteOptions,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [url, options])

  return {
    data,
    loading,
    error,
    deleteData,
    setData,
    setError,
  }
}
