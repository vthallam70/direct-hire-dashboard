'use client'

import { useMemo, useState } from 'react'
import { Search, Bookmark, BookmarkCheck, Send, CheckCircle2, MapPin, Building2, DollarSign, Sparkles } from 'lucide-react'

type Job = {
  id: string
  title: string
  company: string
  location: string
  salary: string
  tags: string[]
  match: number
  remote: boolean
}

const JOBS: Job[] = [
  { id: '1', title: 'Senior Product Designer', company: 'Linear',   location: 'Remote',        salary: '$160k–$210k', tags: ['Design', 'Senior'],     match: 96, remote: true  },
  { id: '2', title: 'Frontend Engineer',       company: 'Vercel',   location: 'San Francisco', salary: '$170k–$230k', tags: ['React', 'TypeScript'],  match: 94, remote: false },
  { id: '3', title: 'Design Engineer',         company: 'Stripe',   location: 'Remote',        salary: '$180k–$240k', tags: ['Design', 'React'],      match: 91, remote: true  },
  { id: '4', title: 'Staff Product Manager',   company: 'Notion',   location: 'New York',      salary: '$200k–$260k', tags: ['Product'],              match: 88, remote: false },
  { id: '5', title: 'Full-stack Engineer',     company: 'Supabase', location: 'Remote',        salary: '$140k–$190k', tags: ['TypeScript', 'Postgres'], match: 87, remote: true },
  { id: '6', title: 'DevTools PM',             company: 'Anthropic',location: 'London',        salary: '$190k–$250k', tags: ['Product', 'AI'],        match: 82, remote: false },
]

export default function LiveDemo() {
  const [query, setQuery] = useState('')
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [minMatch, setMinMatch] = useState(0)
  const [applied, setApplied] = useState<Set<string>>(new Set())
  const [saved, setSaved] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return JOBS.filter((j) => {
      if (remoteOnly && !j.remote) return false
      if (j.match < minMatch) return false
      if (!q) return true
      return [j.title, j.company, ...j.tags].join(' ').toLowerCase().includes(q)
    })
  }, [query, remoteOnly, minMatch])

  const toggleSet = (set: Set<string>, fn: (s: Set<string>) => void, id: string) => {
    const next = new Set(set)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    fn(next)
  }

  const applyOne = (id: string) => {
    if (applied.has(id)) return
    const next = new Set(applied)
    next.add(id)
    setApplied(next)
  }

  const applyAll = () => {
    const next = new Set(applied)
    filtered.forEach((j) => next.add(j.id))
    setApplied(next)
  }

  return (
    <section className="demo" id="demo">
      <div className="container">
        <div className="section-header section-header--center">
          <p className="section-label">✦ Live Demo</p>
          <h2 className="section-title">
            Try the{' '}
            <span className="text-accent-underline">JobNova</span>{' '}
            dashboard
          </h2>
          <p className="section-body">
            Filter, save, and auto-apply. Everything below is interactive — nothing is sent to real companies.
          </p>
        </div>

        <div className="demo-card scroll-fade">
          <div className="demo-toolbar">
            <div className="demo-pill">
              <Sparkles size={14} strokeWidth={2.2} />
              <span>Demo data</span>
            </div>
            <div className="demo-stats">
              <DemoStat label="Saved" value={saved.size} />
              <DemoStat label="Applied" value={applied.size} />
              <DemoStat label="Matches" value={filtered.length} />
            </div>
          </div>

          <div className="demo-grid">
            <aside className="demo-side">
              <label className="demo-field">
                <span className="demo-field-label">Search</span>
                <span className="demo-search">
                  <Search size={14} strokeWidth={2} />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Role, company, skill…"
                  />
                </span>
              </label>

              <label className="demo-check">
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                />
                <span>Remote only</span>
              </label>

              <div className="demo-field">
                <div className="demo-range-head">
                  <span className="demo-field-label">Min match</span>
                  <span className="demo-range-val">{minMatch}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={minMatch}
                  onChange={(e) => setMinMatch(+e.target.value)}
                  className="demo-range"
                />
              </div>

              <button className="btn btn-primary demo-apply-all" onClick={applyAll}>
                <Send size={16} strokeWidth={2} />
                Auto-apply to all
              </button>

              <p className="demo-disclaimer">
                Nothing is sent to real companies. This is just JobNova's UI you'd use every day.
              </p>
            </aside>

            <div className="demo-list">
              {filtered.length === 0 && (
                <div className="demo-empty">
                  No matches. Lower the score or clear the filters.
                </div>
              )}
              {filtered.map((j) => {
                const isApplied = applied.has(j.id)
                const isSaved = saved.has(j.id)
                const hot = j.match >= 90
                return (
                  <div key={j.id} className="demo-job">
                    <div className="demo-job-main">
                      <div className="demo-job-head">
                        <h3>{j.title}</h3>
                        <span className={`demo-match${hot ? ' is-hot' : ''}`}>{j.match}% match</span>
                      </div>
                      <div className="demo-job-meta">
                        <span><Building2 size={13} strokeWidth={2} />{j.company}</span>
                        <span><MapPin size={13} strokeWidth={2} />{j.location}</span>
                        <span><DollarSign size={13} strokeWidth={2} />{j.salary}</span>
                      </div>
                      <div className="demo-tags">
                        {j.tags.map((t) => (
                          <span key={t} className="demo-tag">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="demo-job-actions">
                      <button
                        className={`demo-save${isSaved ? ' is-on' : ''}`}
                        onClick={() => toggleSet(saved, setSaved, j.id)}
                        aria-label={isSaved ? 'Unsave' : 'Save'}
                      >
                        {isSaved ? <BookmarkCheck size={16} strokeWidth={2} /> : <Bookmark size={16} strokeWidth={2} />}
                      </button>
                      <button
                        className={`btn ${isApplied ? 'btn-dark' : 'btn-primary'} demo-apply`}
                        onClick={() => applyOne(j.id)}
                        disabled={isApplied}
                      >
                        {isApplied
                          ? <><CheckCircle2 size={15} strokeWidth={2.2} />Applied</>
                          : <><Send size={15} strokeWidth={2} />Apply</>}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DemoStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="demo-stat">
      <span className="demo-stat-label">{label}</span>
      <span className="demo-stat-value">{value}</span>
    </div>
  )
}
