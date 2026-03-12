import { type FormEvent, useState } from 'react'
import { useCollaboratorsSync } from './hooks/useCollaboratorsSync'
import { useCollaboratorStore } from './store/collaboratorStore'
import { useNoteHistoryStore } from './store/noteHistoryStore'
import { useNoteStore } from './store/noteStore'
import { useSessionStore } from './store/sessionStore'
import type { Note } from './store/types'
import { createId } from './utils/createId'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <section className="panel">
        <p className="eyebrow">Advanced Zustand demo</p>
        <h1>CollabNotes state management</h1>
        <p className="lede">
          This example combines persisted session state, middleware-backed note history,
          and React Query collaborator syncing with minimal boilerplate.
        </p>
      </section>

      <section className="layout-grid">
        <SessionPanel />
        <CollaboratorsPanel />
        <NotesPanel />
        <HistoryPanel />
      </section>
    </main>
  )
}

function SessionPanel() {
  const userId = useSessionStore((state) => state.userId)
  const token = useSessionStore((state) => state.token)
  const expiresAt = useSessionStore((state) => state.expiresAt)
  const role = useSessionStore((state) => state.role)
  const setSession = useSessionStore((state) => state.setSession)
  const setRole = useSessionStore((state) => state.setRole)
  const extendSession = useSessionStore((state) => state.extendSession)
  const clearSession = useSessionStore((state) => state.clearSession)

  const handleSwitchUser = () => {
    const nextId = userId === 'alex' ? 'maya' : 'alex'

    setSession({
      userId: nextId,
      token: `${nextId}-token-${Math.random().toString(36).slice(2, 8)}`,
      expiresAt: Date.now() + 1000 * 60 * 45,
      role: nextId === 'alex' ? 'admin' : 'user',
    })
  }

  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <p className="panel__eyebrow">Persist middleware</p>
          <h2>User session</h2>
        </div>
        <span className="badge">Version 2</span>
      </div>

      <div className="stack">
        <div className="surface">
          <strong>User ID</strong>
          <p>{userId}</p>
        </div>
        <div className="surface">
          <strong>Token</strong>
          <p>{token}</p>
        </div>
        <div className="surface">
          <strong>Role</strong>
          <p>{role}</p>
        </div>
        <div className="surface">
          <strong>Expires at</strong>
          <p>{new Date(expiresAt).toLocaleString()}</p>
        </div>

        <div className="toolbar">
          <button type="button" className="button" onClick={handleSwitchUser}>
            Switch session
          </button>
          <button type="button" className="button" onClick={extendSession}>
            Extend expiry
          </button>
          <button
            type="button"
            className="button button--ghost"
            onClick={() => setRole(role === 'admin' ? 'user' : 'admin')}
          >
            Toggle role
          </button>
          <button type="button" className="button button--danger" onClick={clearSession}>
            Clear session
          </button>
        </div>

        <p className="hint">
          Persisted fields: <code>userId</code> and <code>token</code>. The expiry stays in
          memory only, and <code>role</code> defaults to <code>user</code> through the version
          2 migration path.
        </p>
      </div>
    </section>
  )
}

function CollaboratorsPanel() {
  const { isLoading, isFetching, refetch, error } = useCollaboratorsSync()
  const collaborators = useCollaboratorStore((state) => state.collaborators)

  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <p className="panel__eyebrow">React Query + Zustand</p>
          <h2>Collaborators</h2>
        </div>
        <button type="button" className="button" onClick={() => void refetch()}>
          Refresh
        </button>
      </div>

      {isLoading ? <p>Loading collaborators...</p> : null}
      {error ? <p>Unable to load collaborators.</p> : null}

      <div className="stack">
        <p className="hint">
          Query status: {isFetching ? 'syncing with API' : 'idle'}.
        </p>

        <div className="list">
          {collaborators.map((collaborator) => (
            <article key={collaborator.id} className="surface">
              <strong>{collaborator.name}</strong>
              <p>{collaborator.role}</p>
              <small>{collaborator.status}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function NotesPanel() {
  const notes = useNoteStore((state) => state.notes)
  const addNote = useNoteStore((state) => state.addNote)
  const updateNote = useNoteStore((state) => state.updateNote)
  const deleteNote = useNoteStore((state) => state.deleteNote)
  const syncNote = useNoteStore((state) => state.syncNote)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim() || !text.trim()) {
      return
    }

    addNote({
      id: createId('note'),
      title: title.trim(),
      text: text.trim(),
      updatedAt: Date.now(),
    })
    setTitle('')
    setText('')
  }

  return (
    <section className="panel panel--wide">
      <div className="panel__header">
        <div>
          <p className="panel__eyebrow">Notes workspace</p>
          <h2>Notes and audit events</h2>
        </div>
        <span className="badge">{notes.length} notes</span>
      </div>

      <div className="stack">
        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            className="input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Note title"
          />
          <textarea
            className="textarea"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Write a note"
          />
          <button type="submit" className="button" disabled={!title.trim() || !text.trim()}>
            Add note
          </button>
        </form>

        <div className="list">
          {notes.map((note) => (
            <NoteRow
              key={note.id}
              note={note}
              onSave={(nextText) => updateNote(note.id, nextText)}
              onDelete={() => deleteNote(note.id)}
              onSync={() => syncNote(note.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function NoteRow({
  note,
  onSave,
  onDelete,
  onSync,
}: {
  note: Note
  onSave: (nextText: string) => void
  onDelete: () => void
  onSync: () => void
}) {
  const [draft, setDraft] = useState(note.text)

  return (
    <article className="surface">
      <div className="panel__header">
        <div>
          <strong>{note.title}</strong>
          <p className="hint">Updated {new Date(note.updatedAt).toLocaleTimeString()}</p>
        </div>
        <div className="toolbar">
          <button type="button" className="button button--ghost" onClick={onSync}>
            Sync
          </button>
          <button type="button" className="button button--danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="stack">
        <textarea
          className="textarea textarea--compact"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button
          type="button"
          className="button"
          onClick={() => onSave(draft)}
          disabled={draft === note.text}
        >
          Save edit
        </button>
      </div>
    </article>
  )
}

function HistoryPanel() {
  const history = useNoteHistoryStore((state) => state.history)
  const clearHistory = useNoteHistoryStore((state) => state.clearHistory)

  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <p className="panel__eyebrow">Devtools + immer + logger</p>
          <h2>History log</h2>
        </div>
        <button
          type="button"
          className="button button--ghost"
          onClick={clearHistory}
          disabled={history.length === 0}
        >
          Clear history
        </button>
      </div>

      <div className="list">
        {history.length > 0 ? (
          history.map((entry) => (
            <article key={entry.id} className="surface">
              <strong>{entry.action}</strong>
              <p>{entry.noteId}</p>
              <small>{new Date(entry.timestamp).toLocaleTimeString()}</small>
            </article>
          ))
        ) : (
          <p>No history entries yet.</p>
        )}
      </div>
    </section>
  )
}

export default App
