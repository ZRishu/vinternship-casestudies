import './App.css'
import { ArticleApproval } from './components/ArticleApproval'
import { CommentBox } from './components/CommentBox'

function App() {
  return (
    <main className="app">
      <section className="panel">
        <h1>NewsFleet QA Sandbox</h1>
        <p>Type-safe testing and debugging example for newsroom workflows.</p>
      </section>

      <section className="panel">
        <h2>Comment Publishing</h2>
        <CommentBox onPost={() => {}} />
      </section>

      <section className="panel">
        <h2>Approval Workflow</h2>
        <ArticleApproval
          article={{
            id: 'article-001',
            title: 'Breaking: City Council Approves New Transit Plan',
            author: 'Riya Shah',
          }}
        />
      </section>
    </main>
  )
}

export default App
