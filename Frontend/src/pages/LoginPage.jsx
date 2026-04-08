import { AuthPanel } from '../components/AuthPanel'
import { Link } from 'react-router-dom'

export function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10">
      <div className="grid w-full gap-6 lg:grid-cols-2">
        <div className="reveal rounded-3xl p-8">
          <p className="mono text-sm uppercase tracking-wider text-teal-700">Live Recruiter Demo</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            Finance Command Center
          </h1>
          <p className="mt-4 max-w-lg text-slate-600">
            Multi-role demo for your backend APIs. Recruiters can quickly verify auth, RBAC,
            record operations, and dashboard analytics from one polished interface.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
            <div className="glass rounded-2xl p-4">
              <p className="text-slate-500">Backend</p>
              <p className="font-medium text-slate-800">Express + MongoDB</p>
            </div>
            <div className="glass rounded-2xl p-4">
              <p className="text-slate-500">Frontend</p>
              <p className="font-medium text-slate-800">React + Redux Toolkit</p>
            </div>
          </div>
          <Link
            className="mt-4 inline-flex rounded-xl border border-teal-300 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 hover:bg-teal-100"
            to="/api-docs"
          >
            View API Documentation
          </Link>
        </div>
        <AuthPanel />
      </div>
    </main>
  )
}
