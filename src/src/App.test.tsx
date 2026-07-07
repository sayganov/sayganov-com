import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders a heading with the site owner name', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Georgy Sayganov')
  })

  it('renders all social links with correct destinations', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: 'LinkedIn profile' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/sayganov/',
    )
    expect(screen.getByRole('link', { name: 'GitHub profile' })).toHaveAttribute(
      'href',
      'https://github.com/sayganov',
    )
    expect(screen.getByRole('link', { name: 'DEV profile' })).toHaveAttribute(
      'href',
      'https://dev.to/sayganov',
    )
    expect(screen.getByRole('link', { name: 'Instagram profile' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/sayganov/',
    )
    expect(screen.getByRole('link', { name: 'Email me' })).toHaveAttribute(
      'href',
      'mailto:georgysay@gmail.com',
    )
  })

  it('opens external links in a new tab with noopener noreferrer', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: 'LinkedIn profile' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('does not open the email link in a new tab', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: 'Email me' })
    expect(link).not.toHaveAttribute('target')
  })
})
