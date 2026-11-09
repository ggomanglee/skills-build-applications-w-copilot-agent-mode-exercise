export default function MetricTile({ label, value, note, icon: Icon, tone = 'mint' }) {
  return <section className={`metric-tile tone-${tone}`}><div className="metric-topline"><span>{label}</span><span className="metric-icon"><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span></div><strong className="metric-value">{value}</strong><span className="metric-note">{note}</span></section>
}