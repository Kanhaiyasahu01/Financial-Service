import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiClient } from '../../api/client'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkApi) => {
  try {
    const { data } = await apiClient.get('/users', { params: { page: 1, limit: 20 } })
    return data.data
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data?.message || 'Failed to fetch users')
  }
})

export const createUserByAdmin = createAsyncThunk(
  'users/createUserByAdmin',
  async (payload, thunkApi) => {
    try {
      await apiClient.post('/users', payload)
      thunkApi.dispatch(fetchUsers())
      return true
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || 'Failed to create user')
    }
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    creating: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createUserByAdmin.pending, (state) => {
        state.creating = true
        state.error = null
      })
      .addCase(createUserByAdmin.fulfilled, (state) => {
        state.creating = false
      })
      .addCase(createUserByAdmin.rejected, (state, action) => {
        state.creating = false
        state.error = action.payload
      })
  },
})

export default usersSlice.reducer
