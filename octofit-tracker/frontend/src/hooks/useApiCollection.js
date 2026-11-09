import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

export default function useApiCollection(collection) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let active = true

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const records = await fetchCollection(collection)
        if (active) setItems(records)
      } catch (requestError) {
        if (active) setError(requestError.message || '요청 중 문제가 발생했습니다.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadCollection()
    return () => { active = false }
  }, [collection, refreshKey])

  return { items, loading, error, reload: () => setRefreshKey((key) => key + 1) }
}