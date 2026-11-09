import { Medal, RefreshCw, Trophy } from 'lucide-react'
import CollectionState from './CollectionState.jsx'
import PageHeading from './PageHeading.jsx'
import useApiCollection from '../hooks/useApiCollection.js'
import { displayName, initials } from '../lib/format.js'

function Leaderboard() {
  const { items, loading, error, reload } = useApiCollection('leaderboard')
  const ranked = [...items].sort((first, second) => first.rank - second.rank)
  const leader = ranked[0]

  return <>
    <PageHeading eyebrow="COMMUNITY RANKING" title="리더보드" description="꾸준한 움직임으로 쌓은 이번 시즌 포인트입니다." count={loading ? '…' : ranked.length} action={<button className="icon-button" type="button" onClick={reload} aria-label="리더보드 새로고침" title="새로고침"><RefreshCw size={17} /></button>} />
    <CollectionState loading={loading} error={error} items={ranked} reload={reload} emptyTitle="아직 등록된 순위가 없습니다">
      <>
        {leader && <section className="leader-feature"><div className="leader-feature-copy"><div className="eyebrow">CURRENT PACESETTER</div><h2>{displayName(leader.user)}</h2><p>{leader.team?.name ?? '개인 참가'} · 1위</p><div className="feature-points">{(leader.points ?? 0).toLocaleString('ko-KR')} <span>PTS</span></div></div><div className="feature-medal"><Trophy size={34} strokeWidth={1.5} aria-hidden="true" /></div><span className="feature-initials">{initials(displayName(leader.user))}</span></section>}
        <section className="surface-panel data-panel ranking-panel"><div className="panel-heading"><div><div className="eyebrow">SEASON TOTAL</div><h2>전체 순위</h2></div><span className="ranking-count">{ranked.length}명</span></div><div className="ranking-list">{ranked.map((entry) => <div className={`ranking-row${entry.rank === 1 ? ' is-first' : ''}`} key={entry._id ?? entry.id}><span className={`rank-badge rank-${entry.rank}`}>{entry.rank <= 3 ? <Medal size={17} aria-hidden="true" /> : entry.rank}</span><span className="avatar-circle">{initials(displayName(entry.user))}</span><div className="ranking-person"><strong>{displayName(entry.user)}</strong><span>{entry.team?.name ?? '개인 참가'}</span></div><div className="ranking-score"><strong>{(entry.points ?? 0).toLocaleString('ko-KR')}</strong><span>포인트</span></div></div>)}</div></section>
      </>
    </CollectionState>
  </>
}

export default Leaderboard