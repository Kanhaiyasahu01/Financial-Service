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

export const deleteUserByAdmin = createAsyncThunk(
  'users/deleteUserByAdmin',
  async (userId, thunkApi) => {
    try {
      await apiClient.delete(`/users/${userId}`)
      thunkApi.dispatch(fetchUsers())
      return true
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || 'Failed to delete user')
    }
  },
)

export const updateUserRoleByAdmin = createAsyncThunk(
  'users/updateUserRoleByAdmin',
  async ({ userId, role }, thunkApi) => {
    try {
      await apiClient.patch(`/users/${userId}/role`, { role })
      thunkApi.dispatch(fetchUsers())
      return true
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || 'Failed to update role')
    }
  },
)

export const updateUserStatusByAdmin = createAsyncThunk(
  'users/updateUserStatusByAdmin',
  async ({ userId, status }, thunkApi) => {
    try {
      await apiClient.patch(`/users/${userId}/status`, { status })
      thunkApi.dispatch(fetchUsers())
      return true
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || 'Failed to update status')
    }
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
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
      .addCase(updateUserRoleByAdmin.pending, (state) => {
        state.updating = true
        state.error = null
      })
      .addCase(updateUserRoleByAdmin.fulfilled, (state) => {
        state.updating = false
      })
      .addCase(updateUserRoleByAdmin.rejected, (state, action) => {
        state.updating = false
        state.error = action.payload
      })
      .addCase(updateUserStatusByAdmin.pending, (state) => {
        state.updating = true
        state.error = null
      })
      .addCase(updateUserStatusByAdmin.fulfilled, (state) => {
        state.updating = false
      })
      .addCase(updateUserStatusByAdmin.rejected, (state, action) => {
        state.updating = false
        state.error = action.payload
      })
      .addCase(deleteUserByAdmin.pending, (state) => {
        state.deleting = true
        state.error = null
      })
      .addCase(deleteUserByAdmin.fulfilled, (state) => {
        state.deleting = false
      })
      .addCase(deleteUserByAdmin.rejected, (state, action) => {
        state.deleting = false
        state.error = action.payload
      })
  },
})

export default usersSlice.reducer
