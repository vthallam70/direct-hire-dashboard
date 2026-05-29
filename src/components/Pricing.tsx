'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'

type Billing = 'monthly' | 'yearly'

interface Plan {
  name: string
  desc: string
  badge?: string
  popular?: boolean
  price: Record<Billing, string>
  original: Record<Billing, string>
  billing: Record<Billing, string>
  cta: 'primary' | 'dark'
  features: string[]
}

const plans: Plan[] = [
  {
    name: 'Basic',
    desc: 'For basic features to kickstart your job search efficiency',
    badge: 'Save 20%',
    price:    { monthly: '$9.99',  yearly: '$7.99'  },
    original: { monthly: '',        yearly: '$9.99/monthly' },
    billing:  { monthly: '',        yearly: 'BILLED YEARLY, $95.88' },
    cta: 'dark',
    features: ['50 Auto Apply per month', '10 Resume Credits'],
  },
  {
    name: 'Pro',
    desc: 'Unlock advanced AI capacities, maximize your job hunting success',
    popular: true,
    price:    { monthly: '$25.99', yearly: '$20.99' },
    original: { monthly: '',        yearly: '$25.99/monthly' },
    billing:  { monthly: '',        yearly: 'BILLED YEARLY, $251.88' },
    cta: 'primary',
    features: ['150 Auto Apply per month', '50 Resume Credits'],
  },
  {
    name: 'Pro+',
    desc: 'Unlock advanced AI capacities, maximize your job hunting success',
    badge: 'Save 20%',
    price:    { monthly: '$59.99', yearly: '$47.99' },
    original: { monthly: '',        yearly: '$59.99/monthly' },
    billing:  { monthly: '',        yearly: 'BILLED YEARLY, $575.88' },
    cta: 'dark',
    features: ['300 Auto Apply per month', '150 Resume Credits'],
  },
]

const checkSrc = '/img/Check.svg'

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly')
  const amountPeriodLabel = billing === 'monthly' ? '/Month' : '/Month'

  return (
    <section className="pricing" id="pricing">
      <div className="container">

        <div className="section-header section-header--center">
          <p className="section-label">✦ Pricing</p>
          <h2 className="section-title">
            We've got a plan that's{' '}
            <span className="text-accent-underline">Perfect</span>{' '}
            for you
          </h2>
          <p className="pricing-trial-note">
            Start with <span className="pricing-trial-pill">3-days free trial</span>
          </p>
        </div>

        <div className="pricing-toggle">
          <button
            className={`toggle-btn${billing === 'monthly' ? ' toggle-btn--active' : ''}`}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
          <button
            className={`toggle-btn${billing === 'yearly' ? ' toggle-btn--active' : ''}`}
            onClick={() => setBilling('yearly')}
          >
            Yearly <span className="toggle-save">Save 20%</span>
          </button>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`plan-card scroll-fade${plan.popular ? ' plan-card--featured' : ''}`}
            >
              {plan.popular && (
                <div className="plan-popular">
                  <Sparkles size={12} strokeWidth={2.2} />
                  <span>Most Popular{billing === 'yearly' ? ' (Save 20%)' : ''}</span>
                </div>
              )}
              {plan.badge && billing === 'yearly' && <span className="plan-badge">{plan.badge}</span>}

              <p className="plan-name">{plan.name}</p>
              <p className="plan-desc">{plan.desc}</p>

              <div className="plan-price">
                <span className="plan-amount">
                  {plan.price[billing]}
                  <span className="plan-amount-period">{amountPeriodLabel}</span>
                </span>
                <div className="plan-price-meta">
                  <span className={`plan-original${plan.original[billing] ? '' : ' is-empty'}`}>
                    {plan.original[billing] || ' '}
                  </span>
                  <span className={`plan-billing${plan.billing[billing] ? '' : ' is-empty'}`}>
                    {plan.billing[billing] || ' '}
                  </span>
                </div>
              </div>

              <button className={`btn btn-${plan.cta} plan-cta`}>Get started</button>

              <div className="plan-features">
                <p className="plan-features-label">Features</p>
                <p className="plan-features-note">Everything in our free plan plus...</p>
                <ul className="plan-list">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <span className="plan-check">
                        <img src={checkSrc} alt="" width="12" height="12" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
