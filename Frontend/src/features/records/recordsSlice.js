import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiClient } from '../../api/client'
import { fetchDashboardSummary } from '../dashboard/dashboardSlice'

export const fetchRecords = createAsyncThunk('records/fetchRecords', async (params, thunkApi) => {
  try {
    const cleanedParams = Object.fromEntries(
      Object.entries(params || {}).filter(([, value]) => {
        return value !== '' && value !== null && value !== undefined
      }),
    )

    const { data } = await apiClient.get('/records', { params: cleanedParams })
    return { records: data.data, pagination: data.pagination }
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data?.message || 'Failed to fetch records')
  }
})

export const createRecord = createAsyncThunk('records/createRecord', async (payload, thunkApi) => {
  try {
    await apiClient.post('/records', payload)
    thunkApi.dispatch(fetchRecords({ page: 1, limit: 10 }))
    thunkApi.dispatch(fetchDashboardSummary())
    return true
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data?.message || 'Failed to create record')
  }
})

export const deleteRecord = createAsyncThunk('records/deleteRecord', async (recordId, thunkApi) => {
  try {
    await apiClient.delete(`/records/${recordId}`)
    thunkApi.dispatch(fetchRecords({ page: 1, limit: 10 }))
    thunkApi.dispatch(fetchDashboardSummary())
    return true
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data?.message || 'Failed to delete record')
  }
})

const recordsSlice = createSlice({
  name: 'records',
  initialState: {
    list: [],
    pagination: null,
    loading: false,
    creating: false,
    deleting: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.records
        state.pagination = action.payload.pagination
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createRecord.pending, (state) => {
        state.creating = true
        state.error = null
      })
      .addCase(createRecord.fulfilled, (state) => {
        state.creating = false
      })
      .addCase(createRecord.rejected, (state, action) => {
        state.creating = false
        state.error = action.payload
      })
      .addCase(deleteRecord.pending, (state) => {
        state.deleting = true
        state.error = null
      })
      .addCase(deleteRecord.fulfilled, (state) => {
        state.deleting = false
      })
      .addCase(deleteRecord.rejected, (state, action) => {
        state.deleting = false
        state.error = action.payload
      })
  },
})

export default recordsSlice.reducer
