import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logout } from '../features/auth/authSlice'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', roles: ['admin', 'analyst', 'viewer'] },
  { to: '/records', label: 'Records', roles: ['admin', 'analyst', 'viewer'] },
  { to: '/users', label: 'Users', roles: ['admin'] },
]

export function AppShell() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)

  const allowedNavItems = navItems.filter((item) => item.roles.includes(user.role))

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6 md:px-6">
      <header className="glass reveal mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3">
        <div>
          <p className="mono text-xs uppercase tracking-widest text-slate-500">Finance Dashboard</p>
          <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-medium capitalize text-teal-800">
            {user.role}
          </span>
          <button
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm hover:bg-slate-100"
            onClick={() => {
              dispatch(logout())
              navigate('/login')
            }}
            type="button"
          >
            Logout
          </button>
        </div>
      </header>

      <nav className="mb-5 flex flex-wrap gap-2">
        {allowedNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-xl px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-teal-600 text-white shadow'
                  : 'glass text-slate-700 hover:border-teal-300 hover:text-teal-700'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </main>
  )
}
