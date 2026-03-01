import { Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useSessionTimer } from '../../hooks/useSessionTimer'

export default function Topbar({ onMenuClick }) {
  const { dark, toggle } = useTheme()
  const { minutes, seconds, percent } = useSessionTimer()

  const timerColor =
    percent > 50 ? 'text-emerald-500' : percent > 20 ? 'text-amber-500' : 'text-red-500'

  return (
    <header className="h-16 px-4 lg:px-8 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <Menu size={20} />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-3">
        {/* Session timer */}
        <div className={`flex items-center gap-1.5 text-sm font-medium font-display ${timerColor}`}>
          <div className="relative w-6 h-6">
            <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
              <circle
                cx="12" cy="12" r="10" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 10}`}
                strokeDashoffset={`${2 * Math.PI * 10 * (1 - percent / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
          </div>
          <span>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}