import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useSessionTimer } from '../hooks/useSessionTimer'
import { ShoppingBag, ShoppingCart, User, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const { items, itemCount, total } = useCart()
  const { minutes, seconds } = useSessionTimer()
  const navigate = useNavigate()

  const stats = [
    {
      label: 'Items in Cart',
      value: itemCount,
      sub: `$${total.toFixed(2)} total`,
      icon: ShoppingCart,
      color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-500',
      link: '/cart',
    },
    {
      label: 'Session Time Left',
      value: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
      sub: 'Auto logout on expiry',
      icon: ShoppingBag,
      color: 'bg-amber-50 dark:bg-amber-500/10 text-amber-500',
      link: null,
    },
    {
      label: 'Your Account',
      value: user?.name,
      sub: user?.email,
      icon: User,
      color: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500',
      link: '/profile',
    },
  ]

  const quickLinks = [
    {
      label: 'Browse Products',
      desc: 'Explore our full catalog',
      link: '/products',
      icon: ShoppingBag,
    },
    {
      label: 'View Cart',
      desc: `${itemCount} item${itemCount !== 1 ? 's' : ''} waiting`,
      link: '/cart',
      icon: ShoppingCart,
    },
    {
      label: 'Edit Profile',
      desc: 'Update your details',
      link: '/profile',
      icon: User,
    },
  ]

  return (
    <div className="max-w-5xl mx-auto animate-slide-up">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">
          Hey, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
          Welcome to your dashboard. Here's a quick overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            onClick={() => s.link && navigate(s.link)}
            className={`card p-5 ${s.link ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-1">
                  {s.label}
                </p>
                <p className="font-display font-bold text-xl truncate">{s.value}</p>
                <p className="text-xs text-zinc-400 mt-0.5 truncate">{s.sub}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <h2 className="font-display font-semibold text-lg mb-4">Quick access</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickLinks.map((q) => (
          <button
            key={q.label}
            onClick={() => navigate(q.link)}
            className="card p-5 text-left group hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-500 mb-3">
                <q.icon size={18} />
              </div>
              <ArrowRight
                size={16}
                className="text-zinc-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all"
              />
            </div>
            <p className="font-display font-semibold text-sm">{q.label}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{q.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}