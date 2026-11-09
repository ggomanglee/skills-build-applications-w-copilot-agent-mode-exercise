import { Activity, ArrowUpRight, Flame, RefreshCw, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import CollectionState from './CollectionState.jsx'
import MetricTile from './MetricTile.jsx'
import PageHeading from './PageHeading.jsx'
import useApiCollection from '../hooks/useApiCollection.js'
import { displayName, formatDate, titleCase } from '../lib/format.js'

function Overview() {
  const users = useApiCollection('users')
  const teams = useApiCollection('teams')
  const activities = useApiCollection('activities')
  const leaderboard = useApiCollection('leaderboard')
  const loading = users.loading || teams.loading || activities.loading || leaderboard.loading
  const error = users.error || teams.error || activities.error || leaderboard.error
  const refreshAll = () => [users.reload, teams.reload, activities.reload, leaderboard.reload].forEach((reload) => reload())
  const totalMinutes = activities.items.reduce((total, item) => total + (item.durationMinutes || 0), 0)
  const totalCalories = activities.items.reduce((total, item) => total + (item.calories || 0), 0)
  const recentActivities = activities.items.slice(0, 4)

  return <>
    <PageHeading eyebrow="COMMUNITY PULSE" title="움직임을 한눈에" description="OctoFit 커뮤니티의 이번 기록을 살펴보세요." action={<button className="button-secondary" type="button" onClick={refreshAll}><RefreshCw size={16} aria-hidden="true" /> 새로고침</button>} />
    {error && <div className="inline-error" role="alert">{error}</div>}
    {loading && <div className="loading-strip" role="status"><span className="loader-mark" /> 최신 기록을 불러오는 중입니다</div>}
    <section className="metrics-grid" aria-label="커뮤니티 요약">
      <MetricTile label="등록 사용자" value={users.items.length} note="OctoFit 멤버" icon={Users} tone="mint" />
      <MetricTile label="참여 팀" value={teams.items.length} note="함께 움직이는 크루" icon={Activity} tone="coral" />
      <MetricTile label="활동 시간" value={`${totalMinutes.toLocaleString('ko-KR')}분`} note={`${activities.items.length}개 기록`} icon={Activity} tone="blue" />
      <MetricTile label="소모 칼로리" value={totalCalories.toLocaleString('ko-KR')} note="커뮤니티 합계 kcal" icon={Flame} tone="yellow" />
    </section>
    <section className="overview-grid">
      <div className="surface-panel activity-panel">
        <div className="panel-heading"><div><div className="eyebrow">LATEST LOGS</div><h2>최근 활동</h2></div><Link className="text-link" to="/activities">전체 보기 <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
        <CollectionState loading={loading} error="" items={recentActivities} emptyTitle="아직 활동 기록이 없습니다"><div className="recent-list">{recentActivities.map((activity) => <div className="recent-item" key={activity._id ?? activity.id}><span className={`activity-mark type-${activity.type}`}><Activity size={17} aria-hidden="true" /></span><div className="recent-main"><strong>{displayName(activity.user)}</strong><span>{titleCase(activity.type)} · {activity.durationMinutes}분</span></div><time>{formatDate(activity.date)}</time></div>)}</div></CollectionState>
      </div>
      <div className="surface-panel leaders-panel">
        <div className="panel-heading"><div><div className="eyebrow">TOP PERFORMERS</div><h2>리더보드</h2></div><Link className="text-link" to="/leaderboard">순위 보기 <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
        <CollectionState loading={loading} error="" items={leaderboard.items.slice(0, 3)} emptyTitle="순위가 아직 없습니다"><ol className="mini-leader-list">{leaderboard.items.slice(0, 3).map((entry) => <li key={entry._id ?? entry.id}><span className={`rank-badge rank-${entry.rank}`}>{entry.rank}</span><div className="leader-name"><strong>{displayName(entry.user)}</strong><span>{entry.team?.name ?? '개인'}</span></div><strong className="leader-points">{(entry.points ?? 0).toLocaleString('ko-KR')} <small>점</small></strong></li>)}</ol></CollectionState>
      </div>
    </section>
  </>
}

export default Overview