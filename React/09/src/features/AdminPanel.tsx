export default function AdminPanel() {
  return (
    <section className="panel">
      <p className="panel__eyebrow">Route-based lazy loading</p>
      <h2>Admin panel</h2>
      <div className="admin-grid">
        <div className="surface">
          <strong>Course moderation</strong>
          <p>Review reported lessons, forum posts, and flagged quiz attempts.</p>
        </div>
        <div className="surface">
          <strong>Bundle strategy</strong>
          <p>
            This route is code-split from the main dashboard and only loads when the user
            visits <code>/admin</code>.
          </p>
        </div>
      </div>
    </section>
  )
}
