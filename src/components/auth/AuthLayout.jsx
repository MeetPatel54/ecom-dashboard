import { Zap } from 'lucide-react'

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      {/* Background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand mark */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30">
              <Zap size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">E-Commerce</span>
          </div>
        </div>

        <div className="card p-8">
          <h1 className="font-display text-2xl font-bold mb-1">{title}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-7">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  )
}
