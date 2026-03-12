type LoadingSpinnerProps = {
  label: string
}

export function LoadingSpinner({ label }: LoadingSpinnerProps) {
  return (
    <section className="spinner" aria-live="polite" aria-busy="true">
      <span className="spinner__dot" aria-hidden="true" />
      <strong>{label}</strong>
      <p>The feature bundle is loading on demand.</p>
    </section>
  )
}
