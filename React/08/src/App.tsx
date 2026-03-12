import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import './App.css'

const starterTags = [
  'live-feed',
  'analytics',
  'moderation',
  'overlay',
  'retention',
  'engagement',
  'latency',
  'comment-alert',
]

function App() {
  const [tags, setTags] = useState(starterTags)
  const [filter, setFilter] = useState('')
  const [draft, setDraft] = useState('')
  const [unrelatedCount, setUnrelatedCount] = useState(0)
  const [panelOpen, setPanelOpen] = useState(true)

  useEffect(() => {
    console.count('App rendered')
  })

  const handleDraftChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDraft(event.target.value)
  }, [])

  const handleAddTag = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const nextTag = draft.trim().toLowerCase()
      if (!nextTag || tags.includes(nextTag)) {
        return
      }

      setTags((currentTags) => [...currentTags, nextTag])
      setDraft('')
    },
    [draft, tags],
  )

  return (
    <main className="app-shell">
      <section className="panel">
        <p className="eyebrow">Memoization demo</p>
        <h1>StreamVision tag controls</h1>
        <p className="lede">
          This example shows how <code>useMemo</code>, <code>useCallback</code>, and{' '}
          <code>React.memo</code> prevent unnecessary work when unrelated parent state changes.
        </p>
      </section>

      <section className="layout-grid">
        <section className="panel panel--sidebar">
          <div className="panel__header">
            <div>
              <p className="panel__eyebrow">Parent state</p>
              <h2>Dashboard controls</h2>
            </div>
            <span className="badge">Console demo</span>
          </div>

          <div className="stack">
            <label className="field">
              <span>Filter tags</span>
              <input
                className="input"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder="Type to filter tags"
              />
            </label>

            <div className="toolbar">
              <button
                type="button"
                className="button"
                onClick={() => setUnrelatedCount((count) => count + 1)}
              >
                Change unrelated state
              </button>
              <button
                type="button"
                className="button button--ghost"
                onClick={() => setPanelOpen((open) => !open)}
              >
                Toggle panel flag
              </button>
            </div>

            <div className="surface">
              <strong>Unrelated counter</strong>
              <p>{unrelatedCount}</p>
            </div>

            <div className="surface">
              <strong>Panel flag</strong>
              <p>{panelOpen ? 'Open' : 'Closed'}</p>
            </div>

            <p className="hint">
              Clicking the unrelated buttons re-renders the parent only. The memoized tag
              components below should not log new renders in the browser console unless
              their own props change.
            </p>
          </div>
        </section>

        <section className="panel panel--content">
          <div className="demo-grid">
            <TagInput value={draft} onValueChange={handleDraftChange} onAddTag={handleAddTag} />
            <TagList tags={tags} filter={filter} />
          </div>
        </section>
      </section>
    </main>
  )
}

type TagInputProps = {
  value: string
  onValueChange: (event: ChangeEvent<HTMLInputElement>) => void
  onAddTag: (event: FormEvent<HTMLFormElement>) => void
}

const TagInput = memo(function TagInput({
  value,
  onValueChange,
  onAddTag,
}: TagInputProps) {
  useEffect(() => {
    console.count('TagInput rendered')
  })

  return (
    <section className="surface surface--full">
      <div className="panel__header">
        <div>
          <p className="panel__eyebrow">React.memo + useCallback</p>
          <h2>Tag input</h2>
        </div>
        <span className="badge">Memoized component</span>
      </div>

      <form className="stack" onSubmit={onAddTag}>
        <label className="field">
          <span>New tag</span>
          <input
            className="input"
            value={value}
            onChange={onValueChange}
            placeholder="Add a dashboard tag"
          />
        </label>
        <button type="submit" className="button" disabled={!value.trim()}>
          Add tag
        </button>
      </form>

      <p className="hint">
        This component only re-renders when the input value changes or one of its callback
        props changes.
      </p>
    </section>
  )
})

type TagListProps = {
  tags: string[]
  filter: string
}

const TagList = memo(function TagList({ tags, filter }: TagListProps) {
  useEffect(() => {
    console.count('TagList rendered')
  })

  const filteredTags = useMemo(() => {
    console.count('TagList filtered with useMemo')
    const normalizedFilter = filter.trim().toLowerCase()

    for (let index = 0; index < 20000; index += 1) {
      Math.sqrt(index)
    }

    if (!normalizedFilter) {
      return tags
    }

    return tags.filter((tag) => tag.includes(normalizedFilter))
  }, [filter, tags])

  return (
    <section className="surface surface--full">
      <div className="panel__header">
        <div>
          <p className="panel__eyebrow">React.memo + useMemo</p>
          <h2>Tag list</h2>
        </div>
        <div className="meta-group">
          <span className="badge">Memoized component</span>
          <span className="badge">useMemo filter</span>
        </div>
      </div>

      <p className="hint">
        Filtered tags are memoized and recompute only when <code>tags</code> or{' '}
        <code>filter</code> changes. Open the browser console and click the unrelated
        parent buttons to confirm that only the parent logs change.
      </p>

      <div className="tag-grid">
        {filteredTags.length > 0 ? (
          filteredTags.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))
        ) : (
          <p>No tags match the current filter.</p>
        )}
      </div>
    </section>
  )
})

export default App
