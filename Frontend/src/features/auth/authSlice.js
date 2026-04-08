import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiClient } from '../../api/client'

const saved = localStorage.getItem('finance_auth')
const initialAuth = saved ? JSON.parse(saved) : null

export const loginUser = createAsyncThunk('auth/loginUser', async (payload, thunkApi) => {
  try {
    const { data } = await apiClient.post('/auth/login', payload)
    return data.data
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data?.message || 'Login failed')
  }
})

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload, thunkApi) => {
    try {
      const { data } = await apiClient.post('/auth/register', payload)
      return data.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || 'Registration failed')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialAuth?.user || null,
    token: initialAuth?.token || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.error = null
      localStorage.removeItem('finance_auth')
    },
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem('finance_auth', JSON.stringify(action.payload))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem('finance_auth', JSON.stringify(action.payload))
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearAuthError } = authSlice.actions
export default authSlice.reducer
