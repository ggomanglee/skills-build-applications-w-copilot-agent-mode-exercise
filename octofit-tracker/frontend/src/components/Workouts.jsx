import { Activity, Bike, Dumbbell, Footprints, RefreshCw, Search, StretchHorizontal } from 'lucide-react'
import { useState } from 'react'
import CollectionState from './CollectionState.jsx'
import PageHeading from './PageHeading.jsx'
import useApiCollection from '../hooks/useApiCollection.js'
import { matchesQuery, titleCase } from '../lib/format.js'

const typeIcons = { running: Footprints, cycling: Bike, strength: Dumbbell, hiking: Footprints, yoga: StretchHorizontal }
const difficultyLabels = { beginner: '초급', intermediate: '중급', advanced: '고급' }
const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const workoutsEndpoint = codespaceName && codespaceName !== 'undefined'
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts'

function Workouts() {
  const { items, loading, error, reload } = useApiCollection('workouts', workoutsEndpoint)
  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState('all')
  const filtered = items.filter((workout) => (difficulty === 'all' || workout.difficulty === difficulty) && matchesQuery([workout.name, workout.description, workout.type], query))

  return <>
    <PageHeading eyebrow="TRAINING LIBRARY" title="운동" description="목표와 페이스에 맞는 세션을 찾아보세요." count={loading ? '…' : filtered.length} action={<button className="icon-button" type="button" onClick={reload} aria-label="운동 새로고침" title="새로고침"><RefreshCw size={17} /></button>} />
    <div className="workout-toolbar"><label className="search-field"><Search size={17} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="운동 검색" aria-label="운동 검색" /></label><div className="segmented-control" role="group" aria-label="난이도 필터">{[['all', '전체'], ['beginner', '초급'], ['intermediate', '중급'], ['advanced', '고급']].map(([value, label]) => <button type="button" key={value} className={difficulty === value ? 'is-selected' : ''} onClick={() => setDifficulty(value)} aria-pressed={difficulty === value}>{label}</button>)}</div></div>
    <CollectionState loading={loading} error={error} items={filtered} reload={reload} emptyTitle="조건에 맞는 운동이 없습니다"><div className="workout-grid">{filtered.map((workout) => { const Icon = typeIcons[workout.type] ?? Activity; return <article className="workout-card" key={workout._id ?? workout.id}>
      <div className="workout-card-top"><span className={`workout-icon workout-${workout.type}`}><Icon size={21} strokeWidth={1.8} aria-hidden="true" /></span><span className={`difficulty-tag difficulty-${workout.difficulty}`}>{difficultyLabels[workout.difficulty] ?? titleCase(workout.difficulty)}</span></div>
      <div className="workout-type">{titleCase(workout.type)}</div><h2>{workout.name}</h2><p>{workout.description}</p><div className="workout-meta"><span>{workout.durationMinutes}분</span><span>{(workout.calories ?? 0).toLocaleString('ko-KR')} kcal</span></div>
    </article> })}</div></CollectionState>
  </>
}

export default Workouts