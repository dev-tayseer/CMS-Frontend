// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import $ from 'jquery'
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

  try {
    const response = await axios.get(`${domain_url}/get-car-companies?search_key=${params.q.toString()}&page=${((params.page )).toString()}&limit=${params.perPage.toString()}&draw=1`, config, params)
    console.log(params)
    console.log("Ahmed")
    console.log(response.data.data.total)
    params.setLoaderShow(false)
    return { allData: response.data.data.data, data: response.data.data.data, totalPages: response.data.data.total, params }
} catch(e) {
  params.setLoaderShow(false)
}

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
