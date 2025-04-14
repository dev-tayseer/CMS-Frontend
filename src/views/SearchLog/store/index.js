// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import themeConfig from "@configs/themeConfig";

const domain_url = themeConfig.url

export const getData = createAsyncThunk('datatables/getData', async params => {
  const token = localStorage.getItem("token")
  params.setLoaderShow(true)
  // console.log(token)
  const config = {
    headers: {
               Authorization: `Bearer ${token}`,
               'app-lng': 'ar'
              }
  }
  
  const response = await axios.get(`${domain_url}/get-search-log?user_id=${params.userId}&search_key=${params.q.toString()}&start=${((params.page - 1) * params.perPage).toString()}&length=${params.perPage.toString()}&draw=1`, config, params)
  console.log(params)
  console.log(response.data.total)
  
  params.setLoaderShow(false)
  return { allData: response.data.data.original.data, data: response.data.data.original.data, totalPages: response.data.data.original.recordsFiltered, params }
})

export const datatablesSlice = createSlice({
  name: 'datatables',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.totalPages
    })
  }
})

export default datatablesSlice.reducer
