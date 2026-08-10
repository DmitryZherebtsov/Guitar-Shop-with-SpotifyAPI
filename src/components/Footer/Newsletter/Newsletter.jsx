import React, { useState } from 'react'
import './Newsletter.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const STORAGE_KEY = 'gg_newsletter_subscribers'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | success

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!EMAIL_REGEX.test(email.trim())) {
      setStatus('error')
      return
    }

    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      if (!stored.includes(email.trim())) {
        stored.push(email.trim())
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
      }
    } catch {
      // ignore storage errors, still show success to the user
    }

    setStatus('success')
    setEmail('')
  }

  return (
    <div className='newsletter'>
      <h2>Stay in Tune</h2>
      <p>Get news about new guitars and customization drops.</p>

      {status === 'success' ? (
        <p className='newsletter_success'>Thanks for subscribing! 🎸</p>
      ) : (
        <form className='newsletter_form' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Your email address'
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
          />
          <button type='submit'>Subscribe</button>
        </form>
      )}

      {status === 'error' && <p className='newsletter_error'>Please enter a valid email address.</p>}
    </div>
  )
}

export default Newsletter
