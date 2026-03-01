import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import {
    LayoutDashboard,
    ShoppingBag,
    ShoppingCart,
    User,
    LogOut,
    X,
    Zap,
} from 'lucide-react'

const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/products', label: 'Products', icon: ShoppingBag },
    { to: '/cart', label: 'Cart', icon: ShoppingCart, badge: true },
    { to: '/profile', label: 'Profile', icon: User },
]

export default function Sidebar({ open, onClose }) {
    const { user, logout } = useAuth()
    const { itemCount } = useCart()

    return (
        <aside
            className={`
        fixed top-0 left-0 z-30 h-full w-64 flex flex-col
        bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800
        transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:z-auto
      `}
        >
            {/* Logo */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                        <Zap size={16} className="text-white" />
                    </div>
          <span className="font-display font-bold text-xl tracking-tight">E-Commerce</span>
                </div>
                <button
                    onClick={onClose}
                    className="lg:hidden p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                    <X size={18} />
                </button>
            </div>

            {/* User info */}
            <div className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-700/20 flex items-center justify-center">
                        <span className="text-brand-600 dark:text-brand-400 font-display font-bold text-sm">
                            {user?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold font-display truncate">{user?.name}</p>
                        <p className="text-xs text-zinc-400 truncate">{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-2 space-y-1">
                {navItems.map(({ to, label, icon: Icon, badge }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={onClose}
                        className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                                ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400'
                                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                            }`
                        }
                    >
                        <Icon size={18} />
                        <span className="flex-1">{label}</span>
                        {badge && itemCount > 0 && (
                            <span className="bg-brand-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {itemCount > 9 ? '9+' : itemCount}
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="px-3 py-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-all duration-150"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    )
}