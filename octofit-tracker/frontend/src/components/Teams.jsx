import { ArrowUpRight, RefreshCw, UsersRound } from 'lucide-react'
import CollectionState from './CollectionState.jsx'
import PageHeading from './PageHeading.jsx'
import useApiCollection from '../hooks/useApiCollection.js'
import { displayName, initials } from '../lib/format.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const teamsEndpoint = codespaceName && codespaceName !== 'undefined'
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

function Teams() {
  const { items, loading, error, reload } = useApiCollection('teams', teamsEndpoint)
  const teams = [...items].sort((first, second) => (second.points ?? 0) - (first.points ?? 0))

  return <>
    <PageHeading eyebrow="TRAIN TOGETHER" title="팀" description="크루별 멤버와 누적 포인트를 비교하세요." count={loading ? '…' : teams.length} action={<button className="icon-button" type="button" onClick={reload} aria-label="팀 새로고침" title="새로고침"><RefreshCw size={17} /></button>} />
    <CollectionState loading={loading} error={error} items={teams} reload={reload} emptyTitle="등록된 팀이 없습니다"><div className="team-grid">{teams.map((team, index) => <article className={`team-card team-card-${index % 3}`} key={team._id ?? team.id}>
      <div className="team-card-top"><span className="team-icon"><UsersRound size={20} aria-hidden="true" /></span><span className="team-rank">TEAM {String(index + 1).padStart(2, '0')}</span></div><h2>{team.name}</h2><p>{team.description}</p>
      <div className="team-scoreline"><strong>{(team.points ?? 0).toLocaleString('ko-KR')}</strong><span>PTS</span><ArrowUpRight size={16} aria-hidden="true" /></div><div className="team-members-label"><span>멤버</span><strong>{team.members?.length ?? 0}명</strong></div>
      <div className="team-member-list">{(team.members ?? []).map((member, memberIndex) => <div className="team-member" key={member._id ?? member.id ?? memberIndex}><span className={`avatar-circle avatar-tone-${memberIndex % 4}`}>{initials(displayName(member))}</span><div><strong>{displayName(member)}</strong><span>@{member.username ?? 'member'}</span></div></div>)}{!team.members?.length && <span className="muted-copy">아직 팀에 등록된 멤버가 없습니다.</span>}</div>
    </article>)}</div></CollectionState>
  </>
}

export default Teams