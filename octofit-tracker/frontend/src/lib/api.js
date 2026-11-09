const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const configuredApiBase = import.meta.env.VITE_API_BASE_URL?.trim()
const codespaceApiBase = codespaceName && codespaceName !== 'undefined'
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const API_BASE_URL = (configuredApiBase || codespaceApiBase).replace(/\/+$/, '')

export async function fetchCollection(collection) {
  const response = await fetch(`${API_BASE_URL}/api/${collection}/`, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`데이터를 불러오지 못했습니다 (HTTP ${response.status}).`)
  }

  const payload = await response.json()
  const items = Array.isArray(payload)
    ? payload
    : [payload?.results, payload?.items, payload?.records, payload?.data].find(Array.isArray)

  if (!items) {
    throw new Error('API 응답 형식을 확인할 수 없습니다.')
  }

  return items
}