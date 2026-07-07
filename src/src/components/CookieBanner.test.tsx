import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CookieBanner } from './CookieBanner'

type WindowWithGtag = Window & { gtag?: (...args: unknown[]) => void }

function getGtagMock() {
  return (window as WindowWithGtag).gtag
}

beforeEach(() => {
  localStorage.clear()
  ;(window as WindowWithGtag).gtag = vi.fn()
})

describe('CookieBanner', () => {
  it('shows the banner when no consent is stored', () => {
    render(<CookieBanner />)
    expect(screen.getByRole('region', { name: 'Cookie consent' })).toBeInTheDocument()
  })

  it('hides the banner and grants analytics consent on accept', async () => {
    const user = userEvent.setup()
    render(<CookieBanner />)

    await user.click(screen.getByRole('button', { name: 'Accept' }))

    expect(screen.queryByRole('region', { name: 'Cookie consent' })).not.toBeInTheDocument()
    expect(localStorage.getItem('cookie-consent')).toBe('accepted')
    expect(getGtagMock()).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'granted',
    })
  })

  it('hides the banner and denies analytics consent on decline', async () => {
    const user = userEvent.setup()
    render(<CookieBanner />)

    await user.click(screen.getByRole('button', { name: 'Decline' }))

    expect(screen.queryByRole('region', { name: 'Cookie consent' })).not.toBeInTheDocument()
    expect(localStorage.getItem('cookie-consent')).toBe('rejected')
    expect(getGtagMock()).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'denied',
    })
  })

  it('does not render when consent was already given', () => {
    localStorage.setItem('cookie-consent', 'accepted')
    render(<CookieBanner />)
    expect(screen.queryByRole('region', { name: 'Cookie consent' })).not.toBeInTheDocument()
  })
})
