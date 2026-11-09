import { RefreshCw, Search, Users } from 'lucide-react'
import { useState } from 'react'
import CollectionState from './CollectionState.jsx'
import PageHeading from './PageHeading.jsx'
import useApiCollection from '../hooks/useApiCollection.js'
import { displayName, initials, matchesQuery } from '../lib/format.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const usersEndpoint = codespaceName && codespaceName !== 'undefined'
  ? `https://${codespaceName}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users'

function UsersPage() {
  const { items, loading, error, reload } = useApiCollection('users', usersEndpoint)
  const [query, setQuery] = useState('')
  const filtered = items.filter((user) => matchesQuery([displayName(user), user.username, user.email, user.team?.name], query))

  return <>
    <PageHeading eyebrow="MEMBER DIRECTORY" title="사용자" description="커뮤니티 멤버와 소속 팀을 확인하세요." count={loading ? '…' : filtered.length} action={<button className="icon-button" type="button" onClick={reload} aria-label="사용자 새로고침" title="새로고침"><RefreshCw size={17} /></button>} />
    <section className="surface-panel data-panel"><div className="table-toolbar"><label className="search-field search-wide"><Search size={17} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="이름, 사용자명, 이메일 또는 팀 검색" aria-label="사용자 검색" /></label><span className="toolbar-total"><Users size={16} aria-hidden="true" /> {filtered.length}명</span></div>
      <CollectionState loading={loading} error={error} items={filtered} reload={reload} emptyTitle="조건에 맞는 사용자가 없습니다"><div className="table-scroll"><table className="data-table user-table"><thead><tr><th>멤버</th><th>이메일</th><th>팀</th><th>나이</th></tr></thead><tbody>{filtered.map((user, index) => <tr key={user._id ?? user.id ?? user.username}><td><span className={`avatar-circle avatar-tone-${index % 4}`}>{initials(displayName(user))}</span><div className="member-cell"><strong>{displayName(user)}</strong><span>@{user.username}</span></div></td><td>{user.email}</td><td><span className="team-tag">{user.team?.name ?? '미배정'}</span></td><td>{user.age == null ? '—' : `${user.age}세`}</td></tr>)}</tbody></table></div></CollectionState>
    </section>
  </>
}

export default UsersPage