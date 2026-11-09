import { AlertCircle, Database, RefreshCw } from 'lucide-react'

export default function CollectionState({ loading, error, items, reload, emptyTitle = '표시할 데이터가 없습니다', children }) {
  if (loading) return <div className="collection-state" role="status"><span className="loader-mark" aria-hidden="true" /><span>데이터를 불러오는 중입니다</span></div>
  if (error) return <div className="collection-error" role="alert"><AlertCircle size={20} aria-hidden="true" /><div><strong>연결을 확인해 주세요</strong><p>{error}</p></div><button className="icon-button" type="button" onClick={reload} aria-label="다시 불러오기" title="다시 불러오기"><RefreshCw size={17} aria-hidden="true" /></button></div>
  if (!items.length) return <div className="collection-empty"><Database size={22} strokeWidth={1.6} aria-hidden="true" /><strong>{emptyTitle}</strong><span>검색 조건을 바꾸거나 나중에 다시 확인해 주세요.</span></div>
  return children
}