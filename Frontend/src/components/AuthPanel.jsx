import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearAuthError, loginUser, registerUser } from '../features/auth/authSlice'

const demoCredentials = {
  admin: { email: 'admin1@test.com', password: 'password123' },
  analyst: { email: 'analyst@test.com', password: 'password123' },
  viewer: { email: 'viewer@test.com', password: 'password123' },
}

export function AuthPanel() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading, error } = useAppSelector((state) => state.auth)
  const [isRegister, setIsRegister] = useState(false)
  const [quickRole, setQuickRole] = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const onQuickRoleChange = (value) => {
    setQuickRole(value)

    if (!value || !demoCredentials[value]) {
      return
    }

    setForm((prev) => ({
      ...prev,
      email: demoCredentials[value].email,
      password: demoCredentials[value].password,
    }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    dispatch(clearAuthError())

    if (isRegister) {
      const action = await dispatch(registerUser(form))
      if (registerUser.fulfilled.match(action)) {
        toast.success('Registration successful')
        navigate('/dashboard')
      } else {
        toast.error(action.payload || 'Registration failed')
      }
      return
    }

    const action = await dispatch(loginUser({ email: form.email, password: form.password }))
    if (loginUser.fulfilled.match(action)) {
      toast.success('Login successful')
      navigate('/dashboard')
    } else {
      toast.error(action.payload || 'Login failed')
    }
  }

  return (
    <div className="glass reveal mx-auto w-full max-w-md rounded-3xl p-6 shadow-xl">
      <h2 className="text-2xl font-semibold">{isRegister ? 'Create account' : 'Welcome back'}</h2>
      <p className="mt-1 text-sm text-slate-600">
        {isRegister
          ? 'First registered user becomes admin automatically.'
          : 'Login with admin, analyst, or viewer credentials.'}
      </p>

      <form className="mt-6 space-y-3" onSubmit={onSubmit}>
        {!isRegister && (
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="quick-role">
              Quick Login Role
            </label>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 outline-none focus:border-teal-500"
              id="quick-role"
              value={quickRole}
              onChange={(event) => onQuickRoleChange(event.target.value)}
            >
              <option value="">Select role to auto-fill credentials</option>
              <option value="admin">Admin</option>
              <option value="analyst">Analyst</option>
              <option value="viewer">Viewer</option>
            </select>
            <p className="mt-1 text-xs text-slate-500">
              You can still edit email and password after selecting a role.
            </p>
          </div>
        )}

        {isRegister && (
          <input
            className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 outline-none focus:border-teal-500"
            placeholder="Name"
            value={form.name}
            onChange={(event) => onChange('name', event.target.value)}
            required
          />
        )}
        <input
          className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 outline-none focus:border-teal-500"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => onChange('email', event.target.value)}
          required
        />
        <input
          className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 outline-none focus:border-teal-500"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(event) => onChange('password', event.target.value)}
          required
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          className="w-full rounded-xl bg-teal-600 px-4 py-2.5 font-medium text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
          type="submit"
        >
          {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
        </button>
      </form>

      <button
        className="mt-4 text-sm text-teal-700 underline underline-offset-2"
        onClick={() => {
          setIsRegister((prev) => !prev)
          setQuickRole('')
        }}
        type="button"
      >
        {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
      </button>
    </div>
  )
}
