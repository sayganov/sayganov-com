import { Fragment } from 'react'
import { FaLinkedinIn, FaGithub, FaDev, FaInstagram, FaTelegramPlane } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import type { IconType } from 'react-icons'

interface NavLink {
  href: string
  label: string
  Icon: IconType
  ariaLabel: string
  external?: boolean
}

const NAV_LINKS: NavLink[] = [
  {
    href: 'https://www.linkedin.com/in/sayganov/',
    label: 'LinkedIn',
    Icon: FaLinkedinIn,
    ariaLabel: 'LinkedIn profile',
    external: true,
  },
  {
    href: 'https://github.com/sayganov',
    label: 'GitHub',
    Icon: FaGithub,
    ariaLabel: 'GitHub profile',
    external: true,
  },
  {
    href: 'https://dev.to/sayganov',
    label: 'DEV',
    Icon: FaDev,
    ariaLabel: 'DEV profile',
    external: true,
  },
  {
    href: 'https://www.instagram.com/sayganov/',
    label: 'Instagram',
    Icon: FaInstagram,
    ariaLabel: 'Instagram profile',
    external: true,
  },
  {
    href: 'https://t.me/georgysay',
    label: 'Telegram',
    Icon: FaTelegramPlane,
    ariaLabel: 'Telegram profile',
    external: true,
  },
  {
    href: 'mailto:georgysay@gmail.com',
    label: 'Email',
    Icon: HiOutlineMail,
    ariaLabel: 'Email me',
  },
]

const linkClass =
  'flex items-center justify-center gap-2 min-h-[44px] px-3 py-2 sm:px-2 sm:py-1 ' +
  'text-base sm:text-lg font-medium tracking-wide ' +
  'text-zinc-700 transition-colors duration-200 hover:text-zinc-900 ' +
  'dark:text-white/90 dark:hover:text-white ' +
  'hover:underline underline-offset-4 decoration-2 ' +
  'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40 ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 ' +
  'dark:focus-visible:ring-white/50 dark:focus-visible:ring-offset-zinc-900'

export default function App() {
  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-zinc-50 p-4 text-zinc-900 dark:bg-zinc-900 dark:text-white">
      <h1 className="sr-only">Georgy Sayganov — Software Engineer</h1>
      <nav
        aria-label="Social links"
        className="flex flex-col items-center gap-2 sm:flex-row sm:gap-0 sm:space-x-2"
      >
        {NAV_LINKS.map(({ href, label, Icon, ariaLabel, external }, i) => (
          <Fragment key={href}>
            <a
              href={href}
              className={linkClass}
              aria-label={ariaLabel}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
              <Icon aria-hidden="true" />
              {label}
            </a>
            {i < NAV_LINKS.length - 1 && (
              <span
                className="hidden select-none text-lg text-zinc-400 sm:block dark:text-white/30"
                aria-hidden="true"
              >
                •
              </span>
            )}
          </Fragment>
        ))}
      </nav>
    </main>
  )
}
