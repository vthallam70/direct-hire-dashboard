'use client'

import { useState } from 'react'
import { Bell, FileText, Send, MessagesSquare } from 'lucide-react'

type Step = {
  icon: typeof Bell
  title: string
  body: string
  bullets: string[]
}

const STEPS: Step[] = [
  {
    icon: Bell,
    title: '1. Discover hidden roles',
    body: 'Our agent scans 50,000+ job sources every minute and surfaces roles before they hit public boards.',
    bullets: ['Real-time alerts', 'Insider listings', 'Match scoring'],
  },
  {
    icon: FileText,
    title: '2. Tailor your resume',
    body: 'Each role gets a uniquely optimized resume — keyword-matched and ATS-friendly, generated in seconds.',
    bullets: ['100% ATS-safe', 'Per-role keywords', 'Reviewed before send'],
  },
  {
    icon: Send,
    title: '3. Auto-apply 24/7',
    body: 'Set your filters once. JobNova applies for you around the clock — across hundreds of platforms.',
    bullets: ['300+ apps/week', 'Cover letters drafted', 'Pause anytime'],
  },
  {
    icon: MessagesSquare,
    title: '4. Interview & decide',
    body: 'Recruiters reach out directly. You get a daily digest of interview requests and pipeline status.',
    bullets: ['Daily digest', 'Calendar sync', 'Pipeline tracker'],
  },
]

export default function Features() {
  const [active, setActive] = useState(0)
  const step = STEPS[active]
  const Icon = step.icon

  return (
    <section className="how" id="features">
      <div className="container">
        <div className="section-header section-header--center">
          <p className="section-label">✦ How JobNova Works</p>
          <h2 className="section-title">From zero clicks to job offers.</h2>
          <p className="section-body">
            Four simple steps. Tap any of them — no scroll-hijacking, ever.
          </p>
        </div>

        <div className="how-grid">
          <div className="how-tabs">
            {STEPS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActive(i)}
                className={`how-tab${i === active ? ' is-active' : ''}`}
              >
                {s.title}
              </button>
            ))}
          </div>

          <div className="how-card">
            <div className="how-card-icon">
              <Icon size={24} strokeWidth={2} />
            </div>
            <h3 className="how-card-title">{step.title}</h3>
            <p className="how-card-body">{step.body}</p>
            <ul className="how-card-bullets">
              {step.bullets.map((b) => (
                <li key={b} className="how-card-bullet">{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
