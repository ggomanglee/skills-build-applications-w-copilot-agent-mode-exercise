export default function PageHeading({ eyebrow, title, description, count, action }) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <div className="heading-line"><h1>{title}</h1>{count !== undefined && <span className="heading-count">{count}</span>}</div>
        <p className="page-description">{description}</p>
      </div>
      {action && <div className="heading-action">{action}</div>}
    </div>
  )
}