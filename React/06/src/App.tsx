import { type FormEvent, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { NotificationsPanel } from './components/NotificationsPanel'
import { teamUsers } from './store/demoData'
import { useDesignHubStore } from './store'
import type { DesignFile } from './store/types'
import { createId, formatTimestamp } from './utils/formatters'
import './App.css'

function App() {
  const currentUser = useDesignHubStore((state) => state.currentUser)
  const activeFile = useDesignHubStore(
    (state) =>
      state.files.find((file) => file.id === state.activeFileId) ??
      state.files[0] ??
      null,
  )
  const totalFiles = useDesignHubStore((state) => state.files.length)
  const totalComments = useDesignHubStore((state) => state.comments.length)
  const unreadCount = useDesignHubStore(
    (state) => state.notifications.filter((notification) => !notification.read).length,
  )

  return (
    <main className="app-shell">
      <section className="panel">
        <div>
          <p className="eyebrow">Zustand slices demo</p>
          <h1>DesignHub store architecture</h1>
          <p className="lede">A simple example of modular slices for users, files, comments, and notifications.</p>
        </div>
        <div className="summary-row">
          <div className="summary-item">
            <span>Active user</span>
            <strong>{currentUser?.name ?? 'Unassigned'}</strong>
          </div>
          <div className="summary-item">
            <span>Unread notifications</span>
            <strong>{unreadCount}</strong>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Files slice</span>
          <strong>{totalFiles}</strong>
          <p>Focused subscriptions keep file editing isolated from comments.</p>
        </article>
        <article className="stat-card">
          <span>Comments slice</span>
          <strong>{totalComments}</strong>
          <p>File-scoped discussions stay modular and easy to test.</p>
        </article>
        <article className="stat-card">
          <span>Notifications slice</span>
          <strong>{unreadCount}</strong>
          <p>Unread items update in place without touching unrelated panels.</p>
        </article>
      </section>

      <section className="workspace-grid">
        <OwnerPanel />
        <FileWorkspace activeFile={activeFile} />
        <CommentsPanel fileId={activeFile?.id ?? null} />
        <NotificationsPanel />
      </section>
    </main>
  )
}

function OwnerPanel() {
  const currentUser = useDesignHubStore((state) => state.currentUser)
  const setCurrentUser = useDesignHubStore((state) => state.setCurrentUser)
  const clearCurrentUser = useDesignHubStore((state) => state.clearCurrentUser)

  return (
    <section className="panel panel--compact">
      <div className="panel__header">
        <div>
          <p className="panel__eyebrow">User slice</p>
          <h2>Team ownership</h2>
        </div>
        <span className="badge">{currentUser?.role ?? 'Guest mode'}</span>
      </div>

      <div className="owner-grid">
        {teamUsers.map((user) => {
          const isActive = currentUser?.id === user.id

          return (
            <button
              key={user.id}
              type="button"
              className={`owner-card ${isActive ? 'is-active' : ''}`}
              onClick={() => setCurrentUser(user)}
            >
              <span>{user.name}</span>
              <small>{user.role}</small>
            </button>
          )
        })}
      </div>

      <button type="button" className="button button--ghost" onClick={clearCurrentUser}>
        Clear session
      </button>
    </section>
  )
}

function FileWorkspace({ activeFile }: { activeFile: DesignFile | null }) {
  const files = useDesignHubStore((state) => state.files)
  const activeFileId = useDesignHubStore((state) => state.activeFileId)
  const selectFile = useDesignHubStore((state) => state.selectFile)
  const addFile = useDesignHubStore((state) => state.addFile)
  const updateFileContent = useDesignHubStore((state) => state.updateFileContent)
  const addNotification = useDesignHubStore((state) => state.addNotification)
  const currentUser = useDesignHubStore((state) => state.currentUser)

  const handleCreateFile = () => {
    const nextFile: DesignFile = {
      id: createId('file'),
      name: `Exploration ${files.length + 1}`,
      content:
        'New design brief:\n- Clarify the user flow\n- Add reviewer checkpoints\n- Capture notification impact',
      updatedAt: new Date().toISOString(),
    }

    addFile(nextFile)
    selectFile(nextFile.id)
    addNotification({
      id: createId('notification'),
      message: `${currentUser?.name ?? 'A guest'} created ${nextFile.name}.`,
      read: false,
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <section className="panel panel--wide">
      <div className="panel__header">
        <div>
          <p className="panel__eyebrow">Files slice</p>
          <h2>Design workspace</h2>
        </div>
        <button type="button" className="button" onClick={handleCreateFile}>
          Add file
        </button>
      </div>

      <div className="workspace">
        <aside className="file-list" aria-label="Design files">
          {files.map((file) => (
            <button
              key={file.id}
              type="button"
              className={`file-item ${file.id === activeFileId ? 'is-active' : ''}`}
              onClick={() => selectFile(file.id)}
            >
              <span>{file.name}</span>
              <small>Updated {formatTimestamp(file.updatedAt)}</small>
            </button>
          ))}
        </aside>

        <div className="editor">
          {activeFile ? (
            <FileEditor
              key={activeFile.id}
              activeFile={activeFile}
              onSaveRevision={(content) => {
                if (content === activeFile.content) {
                  return
                }

                updateFileContent(activeFile.id, content)
                addNotification({
                  id: createId('notification'),
                  message: `${currentUser?.name ?? 'A guest'} saved changes to ${activeFile.name}.`,
                  read: false,
                  createdAt: new Date().toISOString(),
                })
              }}
            />
          ) : (
            <p>No file selected.</p>
          )}
        </div>
      </div>
    </section>
  )
}

function FileEditor({
  activeFile,
  onSaveRevision,
}: {
  activeFile: DesignFile
  onSaveRevision: (content: string) => void
}) {
  const [draft, setDraft] = useState(activeFile.content)

  return (
    <>
      <div className="editor__header">
        <div>
          <h3>{activeFile.name}</h3>
          <p>Selected collaborators can edit, comment, and trigger notifications.</p>
        </div>
        <span className="badge">Live draft</span>
      </div>
      <textarea
        className="textarea"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        spellCheck={false}
        aria-label={`Content for ${activeFile.name}`}
      />
      <div className="editor__actions">
        <small>Last synced {formatTimestamp(activeFile.updatedAt)}</small>
        <button type="button" className="button" onClick={() => onSaveRevision(draft)}>
          Save revision
        </button>
      </div>
    </>
  )
}

function CommentsPanel({ fileId }: { fileId: string | null }) {
  const currentUser = useDesignHubStore((state) => state.currentUser)
  const activeFileName = useDesignHubStore(
    (state) => state.files.find((file) => file.id === fileId)?.name ?? 'No file selected',
  )
  const comments = useDesignHubStore(
    useShallow((state) =>
      fileId ? state.comments.filter((comment) => comment.fileId === fileId) : [],
    ),
  )
  const addComment = useDesignHubStore((state) => state.addComment)
  const addNotification = useDesignHubStore((state) => state.addNotification)
  const [text, setText] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!fileId || !text.trim()) {
      return
    }

    const author = currentUser?.name ?? 'Guest reviewer'

    addComment({
      id: createId('comment'),
      fileId,
      author,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    })
    addNotification({
      id: createId('notification'),
      message: `${author} commented on ${activeFileName}.`,
      read: false,
      createdAt: new Date().toISOString(),
    })
    setText('')
  }

  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <p className="panel__eyebrow">Comments slice</p>
          <h2>Review thread</h2>
        </div>
        <span className="badge">{comments.length} notes</span>
      </div>

      <div className="stack">
        <div className="surface">
          <strong>{activeFileName}</strong>
          <p>Comments are filtered by the selected file.</p>
        </div>

        <div className="comment-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <article key={comment.id} className="comment-card">
                <div className="comment-card__meta">
                  <strong>{comment.author}</strong>
                  <small>{formatTimestamp(comment.createdAt)}</small>
                </div>
                <p>{comment.text}</p>
              </article>
            ))
          ) : (
            <p className="empty-state">No comments for this file yet.</p>
          )}
        </div>

        <form className="stack" onSubmit={handleSubmit}>
          <textarea
            className="textarea textarea--compact"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Leave a collaboration note"
            aria-label="New comment"
          />
          <button type="submit" className="button" disabled={!fileId || !text.trim()}>
            Add comment
          </button>
        </form>
      </div>
    </section>
  )
}

export default App
