import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'

const endpointGroups = [
  {
    title: 'Auth',
    endpoints: [
      {
        name: 'Register User',
        method: 'POST',
        path: '/auth/register',
        auth: 'No',
        description: 'Registers user. First registered user becomes admin.',
        request: {
          body: {
            name: 'Admin One',
            email: 'admin1@test.com',
            password: 'password123',
          },
        },
        response: {
          success: true,
          message: 'User registered successfully',
          data: {
            user: {
              _id: 'USER_ID',
              name: 'Admin One',
              email: 'admin1@test.com',
              role: 'admin',
              status: 'active',
            },
            token: 'JWT_TOKEN',
          },
        },
      },
      {
        name: 'Login User',
        method: 'POST',
        path: '/auth/login',
        auth: 'No',
        description: 'Logs in user and returns JWT token.',
        request: {
          body: {
            email: 'admin1@test.com',
            password: 'password123',
          },
        },
        response: {
          success: true,
          message: 'Login successful',
          data: {
            user: {
              _id: 'USER_ID',
              name: 'Admin One',
              email: 'admin1@test.com',
              role: 'admin',
              status: 'active',
            },
            token: 'JWT_TOKEN',
          },
        },
      },
    ],
  },
  {
    title: 'Users (Admin Only)',
    endpoints: [
      {
        name: 'Create User',
        method: 'POST',
        path: '/users',
        auth: 'Bearer Token (admin)',
        description: 'Create a new user with role and status.',
        request: {
          headers: {
            Authorization: 'Bearer JWT_TOKEN',
          },
          body: {
            name: 'Analyst User',
            email: 'analyst@test.com',
            password: 'password123',
            role: 'analyst',
            status: 'active',
          },
        },
        response: {
          success: true,
          message: 'User created successfully',
          data: {
            _id: 'USER_ID',
            name: 'Analyst User',
            email: 'analyst@test.com',
            role: 'analyst',
            status: 'active',
          },
        },
      },
      {
        name: 'List Users',
        method: 'GET',
        path: '/users',
        auth: 'Bearer Token (admin)',
        description: 'Get paginated users list with optional filters.',
        request: {
          headers: {
            Authorization: 'Bearer JWT_TOKEN',
          },
          query: {
            page: 1,
            limit: 10,
            role: 'analyst',
            status: 'active',
          },
        },
        response: {
          success: true,
          message: 'Users fetched successfully',
          data: [
            {
              _id: 'USER_ID',
              name: 'Analyst User',
              email: 'analyst@test.com',
              role: 'analyst',
              status: 'active',
            },
          ],
          pagination: {
            total: 1,
            page: 1,
            limit: 10,
            pages: 1,
          },
        },
      },
      {
        name: 'Get User By Id',
        method: 'GET',
        path: '/users/:id',
        auth: 'Bearer Token (admin)',
        description: 'Fetch a single user by id.',
        request: {
          headers: {
            Authorization: 'Bearer JWT_TOKEN',
          },
          pathParams: {
            id: 'USER_ID',
          },
        },
        response: {
          success: true,
          message: 'User fetched successfully',
          data: {
            _id: 'USER_ID',
            name: 'Analyst User',
            email: 'analyst@test.com',
            role: 'analyst',
            status: 'active',
          },
        },
      },
      {
        name: 'Update User',
        method: 'PATCH',
        path: '/users/:id',
        auth: 'Bearer Token (admin)',
        description: 'Update user fields like role or status.',
        request: {
          headers: {
            Authorization: 'Bearer JWT_TOKEN',
          },
          pathParams: {
            id: 'USER_ID',
          },
          body: {
            status: 'inactive',
          },
        },
        response: {
          success: true,
          message: 'User updated successfully',
          data: {
            _id: 'USER_ID',
            status: 'inactive',
          },
        },
      },
      {
        name: 'Update User Role',
        method: 'PATCH',
        path: '/users/:id/role',
        auth: 'Bearer Token (admin)',
        description: 'Update only user role.',
        request: {
          headers: {
            Authorization: 'Bearer JWT_TOKEN',
          },
          pathParams: {
            id: 'USER_ID',
          },
          body: {
            role: 'viewer',
          },
        },
        response: {
          success: true,
          message: 'User role updated successfully',
          data: {
            _id: 'USER_ID',
            role: 'viewer',
          },
        },
      },
      {
        name: 'Update User Status',
        method: 'PATCH',
        path: '/users/:id/status',
        auth: 'Bearer Token (admin)',
        description: 'Update only user status to active/inactive.',
        request: {
          headers: {
            Authorization: 'Bearer JWT_TOKEN',
          },
          pathParams: {
            id: 'USER_ID',
          },
          body: {
            status: 'inactive',
          },
        },
        response: {
          success: true,
          message: 'User status updated successfully',
          data: {
            _id: 'USER_ID',
            status: 'inactive',
          },
        },
      },
      {
        name: 'Delete User',
        method: 'DELETE',
        path: '/users/:id',
        auth: 'Bearer Token (admin)',
        description: 'Delete user by id.',
        request: {
          headers: {
            Authorization: 'Bearer JWT_TOKEN',
          },
          pathParams: {
            id: 'USER_ID',
          },
        },
        response: {
          success: true,
          message: 'User deleted successfully',
        },
      },
    ],
  },
  {
    title: 'Financial Records',
    endpoints: [
      {
        name: 'Create Record',
        method: 'POST',
        path: '/records',
        auth: 'Bearer Token (admin)',
        description: 'Create a financial record.',
        request: {
          headers: {
            Authorization: 'Bearer JWT_TOKEN',
          },
          body: {
            amount: 5000,
            type: 'income',
            category: 'Salary',
            date: '2026-04-01',
            notes: 'April salary',
          },
        },
        response: {
          success: true,
          message: 'Record created successfully',
          data: {
            _id: 'RECORD_ID',
            amount: 5000,
            type: 'income',
            category: 'Salary',
          },
        },
      },
      {
        name: 'List Records',
        method: 'GET',
        path: '/records',
        auth: 'Bearer Token (all roles)',
        description: 'Fetch records with filters and pagination.',
        request: {
          headers: {
            Authorization: 'Bearer JWT_TOKEN',
          },
          query: {
            page: 1,
            limit: 10,
            type: 'expense',
            category: 'Food',
            search: 'lunch',
          },
        },
        response: {
          success: true,
          message: 'Records fetched successfully',
          data: [
            {
              _id: 'RECORD_ID',
              amount: 300,
              type: 'expense',
              category: 'Food',
              notes: 'Groceries',
            },
          ],
          pagination: {
            total: 1,
            page: 1,
            limit: 10,
            pages: 1,
          },
        },
      },
      {
        name: 'Get Record By Id',
        method: 'GET',
        path: '/records/:id',
        auth: 'Bearer Token (all roles)',
        description: 'Fetch one record by id.',
        request: {
          headers: {
            Authorization: 'Bearer JWT_TOKEN',
          },
          pathParams: {
            id: 'RECORD_ID',
          },
        },
        response: {
          success: true,
          message: 'Record fetched successfully',
          data: {
            _id: 'RECORD_ID',
            amount: 300,
            type: 'expense',
          },
        },
      },
      {
        name: 'Update Record',
        method: 'PATCH',
        path: '/records/:id',
        auth: 'Bearer Token (admin)',
        description: 'Update record fields.',
        request: {
          headers: {
            Authorization: 'Bearer JWT_TOKEN',
          },
          pathParams: {
            id: 'RECORD_ID',
          },
          body: {
            notes: 'Updated note',
          },
        },
        response: {
          success: true,
          message: 'Record updated successfully',
          data: {
            _id: 'RECORD_ID',
            notes: 'Updated note',
          },
        },
      },
      {
        name: 'Delete Record',
        method: 'DELETE',
        path: '/records/:id',
        auth: 'Bearer Token (admin)',
        description: 'Delete record by id.',
        request: {
          headers: {
            Authorization: 'Bearer JWT_TOKEN',
          },
          pathParams: {
            id: 'RECORD_ID',
          },
        },
        response: {
          success: true,
          message: 'Record deleted successfully',
        },
      },
    ],
  },
  {
    title: 'Dashboard',
    endpoints: [
      {
        name: 'Dashboard Summary',
        method: 'GET',
        path: '/dashboard/summary',
        auth: 'Bearer Token (all roles)',
        description: 'Get summary analytics for dashboard.',
        request: {
          headers: {
            Authorization: 'Bearer JWT_TOKEN',
          },
        },
        response: {
          success: true,
          message: 'Dashboard summary fetched successfully',
          data: {
            totals: {
              income: 5000,
              expenses: 1500,
              netBalance: 3500,
            },
            categoryTotals: [
              {
                type: 'expense',
                category: 'Food',
                total: 300,
              },
            ],
            recentActivity: [],
            monthlyTrends: [],
          },
        },
      },
      {
        name: 'Health Check',
        method: 'GET',
        path: '/health',
        auth: 'No',
        description: 'Service health check endpoint.',
        request: {},
        response: {
          success: true,
          message: 'Finance dashboard API is healthy',
        },
      },
    ],
  },
]

function prettyJson(value) {
  return JSON.stringify(value, null, 2)
}

function buildCurl(endpoint) {
  const fullUrl = `http://localhost:8080/api/v1${endpoint.path.replace(':id', 'RECORD_OR_USER_ID')}`
  const parts = [
    `curl --location '${fullUrl}'`,
    `--request ${endpoint.method}`,
    `--header 'Content-Type: application/json'`,
  ]

  if (endpoint.auth !== 'No') {
    parts.push(`--header 'Authorization: Bearer JWT_TOKEN'`)
  }

  if (endpoint.request?.body) {
    parts.push(`--data-raw '${JSON.stringify(endpoint.request.body)}'`)
  }

  return parts.join(' \\\n+  ')
}

export function ApiDocsPage() {
  const copyCurl = async (endpoint) => {
    try {
      await navigator.clipboard.writeText(buildCurl(endpoint))
      toast.success('cURL copied')
    } catch {
      toast.error('Could not copy cURL')
    }
  }

  const copyJson = async (value, label) => {
    try {
      await navigator.clipboard.writeText(prettyJson(value))
      toast.success(`${label} copied`)
    } catch {
      toast.error(`Could not copy ${label.toLowerCase()}`)
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6 md:px-6">
      <header className="glass mb-5 rounded-2xl p-4">
        <p className="mono text-xs uppercase tracking-widest text-slate-500">Public API Docs</p>
        <h1 className="mt-1 text-3xl font-semibold">Finance Dashboard API Documentation</h1>
        <p className="mt-2 text-slate-600">
          API structure with request/response examples and cURL copy for every endpoint.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link className="rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-medium text-white" to="/login">
            Back To Login
          </Link>
          <Link className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm" to="/dashboard">
            Open App Dashboard
          </Link>
        </div>
      </header>

      <section className="space-y-4">
        {endpointGroups.map((group) => (
          <article className="glass rounded-2xl p-4" key={group.title}>
            <h2 className="text-xl font-semibold">{group.title}</h2>
            <div className="mt-3 space-y-4">
              {group.endpoints.map((endpoint) => (
                <div className="rounded-xl border border-slate-200 bg-white/80 p-4" key={endpoint.name}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium text-slate-900">{endpoint.name}</p>
                      <p className="mono mt-1 text-sm text-teal-700">
                        {endpoint.method} {endpoint.path}
                      </p>
                    </div>
                    <button
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm"
                      onClick={() => copyCurl(endpoint)}
                      type="button"
                    >
                      Copy cURL
                    </button>
                  </div>

                  <p className="mt-2 text-sm text-slate-600">{endpoint.description}</p>
                  <p className="mt-1 text-xs text-slate-500">Auth: {endpoint.auth}</p>

                  <div className="mt-3 grid gap-3 lg:grid-cols-2">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-700">Request</p>
                        <button
                          className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
                          onClick={() => copyJson(endpoint.request, 'Request JSON')}
                          type="button"
                        >
                          Copy Request JSON
                        </button>
                      </div>
                      <pre className="mono mt-1 max-h-80 overflow-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">
                        {prettyJson(endpoint.request)}
                      </pre>
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-700">Response</p>
                        <button
                          className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
                          onClick={() => copyJson(endpoint.response, 'Response JSON')}
                          type="button"
                        >
                          Copy Response JSON
                        </button>
                      </div>
                      <pre className="mono mt-1 max-h-80 overflow-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">
                        {prettyJson(endpoint.response)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
