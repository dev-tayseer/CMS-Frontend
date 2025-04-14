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
  console.log(params,"*******")
  const config = {
    headers: {
               Authorization: `Bearer ${token}`,
              }
  }

  try {
    console.log(params.q,"page .. ")
    const response = await axios.get(`${domain_url}/Contract/ContractsRental/?type_of_contract=1&search[value]=${params.q.toString()}&start=${((params.start - 1) * params.length).toString()}&length=${params.length.toString()}&draw=1`, config, params)
    console.log(params)
    console.log("Ahmed")
    console.log(response,"aaabbb")
    params.setLoaderShow(false)
    console.log(response.data,"aaa")
    return { allData: response.data.data, data: response.data.data, totalPages: response.data.recordsFiltered, params }
} catch(e) {
  console.log(e,"eee")
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
