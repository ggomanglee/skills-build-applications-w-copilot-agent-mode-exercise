export function displayName(person) {
  if (!person) return '알 수 없는 사용자'
  const name = [person.firstName, person.lastName].filter(Boolean).join(' ')
  return name || person.username || '알 수 없는 사용자'
}

export function initials(value = '') {
  return value.trim().split(/[\s._-]+/).filter(Boolean).slice(0, 2).map((part) => part[0].toLocaleUpperCase()).join('') || 'O'
}

export function formatDate(value, options = { month: 'short', day: 'numeric' }) {
  if (!value) return '날짜 없음'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '날짜 없음' : new Intl.DateTimeFormat('ko-KR', options).format(date)
}

export function titleCase(value = '') {
  return value.replace(/\b\w/g, (letter) => letter.toLocaleUpperCase())
}

export function matchesQuery(values, query) {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  return !normalizedQuery || values.filter(Boolean).join(' ').toLocaleLowerCase().includes(normalizedQuery)
}