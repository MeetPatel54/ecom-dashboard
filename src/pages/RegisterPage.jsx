import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/auth/AuthLayout'
import { Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

export default function RegisterPage() {
    const { register } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [showPw, setShowPw] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
        setError('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.password) {
            setError('Please fill in all fields')
            return
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }
        setLoading(true)
        try {
            register(form.name, form.email, form.password)
            toast.success('Account created! Please login.')
            navigate('/login')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout title="Create account" subtitle="Join ShopLane and start shopping">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1.5">Full name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="input-field"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="input-field"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">Password</label>
                    <div className="relative">
                        <input
                            type={showPw ? 'text' : 'password'}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="At least 6 characters"
                            className="input-field pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPw((s) => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                        >
                            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {error && (
                    <p className="text-sm text-red-500 bg-red-50 dark:bg-red-500/10 px-3 py-2 rounded-lg">
                        {error}
                    </p>
                )}

                <button type="submit" className="btn-primary w-full" disabled={loading}>
                    {loading ? 'Creating account...' : 'Create account'}
                </button>
            </form>

            <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-brand-500 hover:text-brand-600 font-medium">
                    Sign in
                </Link>
            </p>
        </AuthLayout>
    )
}