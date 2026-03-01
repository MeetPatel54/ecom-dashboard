import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, Pencil, Save, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSave = () => {
    if (!form.name || !form.email) {
      setError('Name and email are required')
      return
    }

    const updates = { name: form.name, email: form.email }
    if (form.password) {
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters')
        return
      }
      updates.password = form.password
    }

    try {
      updateProfile(updates)
      toast.success('Profile updated!')
      setEditing(false)
      setForm((f) => ({ ...f, password: '' }))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCancel = () => {
    setEditing(false)
    setError('')
    setForm({ name: user?.name || '', email: user?.email || '', password: '' })
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Profile</h1>
          <p className="text-sm text-zinc-400 mt-0.5">Manage your account details</p>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 btn-ghost text-sm"
          >
            <Pencil size={15} />
            Edit
          </button>
        )}
      </div>

      <div className="card p-6">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-7 pb-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center text-3xl font-display font-bold text-brand-500">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-display font-bold text-lg">{user?.name}</p>
            <p className="text-sm text-zinc-400">{user?.email}</p>
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Full name</label>
            {editing ? (
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-sm">{user?.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Email address</label>
            {editing ? (
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-sm">{user?.email}</p>
            )}
          </div>

          {editing && (
            <div>
              <label className="block text-sm font-medium mb-1.5">
                New password{' '}
                <span className="text-zinc-400 font-normal">(leave blank to keep current)</span>
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-500/10 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          {editing && (
            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <Save size={15} />
                Save changes
              </button>
              <button onClick={handleCancel} className="btn-ghost flex items-center gap-2">
                <X size={15} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}