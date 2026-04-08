import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { createUserByAdmin, fetchUsers } from '../features/users/usersSlice'

const blank = { name: '', email: '', password: '', role: 'analyst', status: 'active' }

export function UserManager() {
  const dispatch = useAppDispatch()
  const { list, loading, creating, error } = useAppSelector((state) => state.users)
  const [form, setForm] = useState(blank)

  const onSubmit = async (event) => {
    event.preventDefault()
    const action = await dispatch(createUserByAdmin(form))

    if (createUserByAdmin.fulfilled.match(action)) {
      setForm(blank)
      toast.success('User created successfully')
    } else {
      toast.error(action.payload || 'Failed to create user')
    }
  }

  return (
    <div className="glass reveal rounded-2xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">Admin User Management</h3>
        <button
          className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm"
          onClick={() => dispatch(fetchUsers())}
          type="button"
        >
          Refresh
        </button>
      </div>

      <form className="mt-3 grid gap-2 md:grid-cols-5" onSubmit={onSubmit}>
        <input
          className="rounded-lg border border-slate-200 px-3 py-2"
          placeholder="Name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          required
        />
        <input
          className="rounded-lg border border-slate-200 px-3 py-2"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          required
        />
        <input
          className="rounded-lg border border-slate-200 px-3 py-2"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          required
        />
        <select
          className="rounded-lg border border-slate-200 px-3 py-2"
          value={form.role}
          onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
        >
          <option value="analyst">Analyst</option>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
        <button
          className="rounded-lg bg-teal-600 px-3 py-2 font-medium text-white hover:bg-teal-700 disabled:opacity-60"
          disabled={creating}
          type="submit"
        >
          {creating ? 'Creating...' : 'Create user'}
        </button>
      </form>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[620px] text-sm">
          <thead className="border-b border-slate-200 text-left text-slate-500">
            <tr>
              <th className="pb-2">Name</th>
              <th className="pb-2">Email</th>
              <th className="pb-2">Role</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td className="py-2 text-slate-500" colSpan={4}>
                  Loading users...
                </td>
              </tr>
            )}
            {!loading &&
              list.map((user) => (
                <tr className="border-b border-slate-100" key={user._id}>
                  <td className="py-2">{user.name}</td>
                  <td className="py-2">{user.email}</td>
                  <td className="py-2 capitalize">{user.role}</td>
                  <td className="py-2 capitalize">{user.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
