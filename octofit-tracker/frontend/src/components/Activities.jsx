import { Activity, Flame, RefreshCw, Search, Timer } from 'lucide-react'
import { useState } from 'react'
import CollectionState from './CollectionState.jsx'
import MetricTile from './MetricTile.jsx'
import PageHeading from './PageHeading.jsx'
import useApiCollection from '../hooks/useApiCollection.js'
import { displayName, formatDate, matchesQuery, titleCase } from '../lib/format.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const activitiesEndpoint = codespaceName && codespaceName !== 'undefined'
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities'

function Activities() {
  const { items, loading, error, reload } = useApiCollection('activities', activitiesEndpoint)
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const filtered = items.filter((item) => (type === 'all' || item.type === type) && matchesQuery([displayName(item.user), item.user?.username, item.type], query))
  const minutes = filtered.reduce((total, item) => total + (item.durationMinutes || 0), 0)
  const calories = filtered.reduce((total, item) => total + (item.calories || 0), 0)

  return <>
    <PageHeading eyebrow="MOVEMENT LOG" title="활동 기록" description="멤버들이 기록한 움직임과 운동량을 확인하세요." count={loading ? '…' : filtered.length} action={<button className="icon-button" type="button" onClick={reload} aria-label="활동 새로고침" title="새로고침"><RefreshCw size={17} /></button>} />
    <div className="metrics-grid metrics-grid-compact"><MetricTile label="활동 횟수" value={filtered.length} note="현재 필터 기준" icon={Activity} tone="mint" /><MetricTile label="운동 시간" value={`${minutes.toLocaleString('ko-KR')}분`} note="누적 시간" icon={Timer} tone="blue" /><MetricTile label="소모 칼로리" value={calories.toLocaleString('ko-KR')} note="누적 kcal" icon={Flame} tone="coral" /></div>
    <section className="surface-panel data-panel">
      <div className="table-toolbar"><label className="search-field"><Search size={17} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="멤버 또는 활동 검색" aria-label="활동 검색" /></label><label className="select-field"><span>유형</span><select value={type} onChange={(event) => setType(event.target.value)} aria-label="활동 유형 선택"><option value="all">전체 활동</option>{['running', 'cycling', 'strength', 'hiking', 'yoga'].map((value) => <option key={value} value={value}>{titleCase(value)}</option>)}</select></label></div>
      <CollectionState loading={loading} error={error} items={filtered} reload={reload} emptyTitle="조건에 맞는 활동이 없습니다"><div className="table-scroll"><table className="data-table"><thead><tr><th>활동</th><th>멤버</th><th>날짜</th><th>시간</th><th>거리</th><th>칼로리</th></tr></thead><tbody>{filtered.map((item) => <tr key={item._id ?? item.id}><td><span className={`activity-mark type-${item.type}`}><Activity size={16} /></span><strong>{titleCase(item.type)}</strong></td><td>{displayName(item.user)}</td><td>{formatDate(item.date, { year: 'numeric', month: 'short', day: 'numeric' })}</td><td>{item.durationMinutes}분</td><td>{item.distanceKm == null ? '—' : `${item.distanceKm} km`}</td><td><strong>{(item.calories ?? 0).toLocaleString('ko-KR')}</strong> kcal</td></tr>)}</tbody></table></div></CollectionState>
    </section>
  </>
}

export default Activities