export default function ProfileSettings() {
  return (
    <section className="surface">
      <p className="panel__eyebrow">Component-based lazy loading</p>
      <h2>Profile settings</h2>
      <div className="settings-grid">
        <div className="surface">
          <strong>Playback quality</strong>
          <p>Auto-adjust streaming quality for slower student connections.</p>
        </div>
        <div className="surface">
          <strong>Notification digest</strong>
          <p>Bundle alerts into a single daily summary instead of immediate emails.</p>
        </div>
        <div className="surface">
          <strong>Privacy preferences</strong>
          <p>Control whether peers can see your current course activity.</p>
        </div>
      </div>
    </section>
  )
}
