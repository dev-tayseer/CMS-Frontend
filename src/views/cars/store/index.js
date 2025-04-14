// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import themeConfig from "@configs/themeConfig";

const domain_url = themeConfig.url


export const getData = createAsyncThunk('datatables/getData', async params => {
  const token = localStorage.getItem("token")
  // console.log(token)
  params.setLoaderShow(true)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'app-lng': 'ar'
    }
  }

  try {
    const response = await axios.get(`${domain_url}/get-cars?from_date=${params.from_date}&to_date=${params.to_date}&search_key=${params['search[value]'].toString()}&company_id=${params.companyId.toString()}&type=${params.typeId.toString()}&status=${params.statuesId.toString()}&excution_type=${params.excution_type.toString()}&start=${((params.start - 1) * params.length).toString()}&length=${params.length.toString()}&draw=1`, config, params)
    console.log(params, "hhh")
    console.log(response.data.data.original.data)
    params.setLoaderShow(false)
    return { allData: response.data.data.original.data, data: response.data.data.original.data, totalPages: response.data.data.original.recordsFiltered, params }
  } catch (e) {
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
      try {
        state.data = action.payload.data
        state.params = action.payload.params
        state.allData = action.payload.allData
        state.total = action.payload.totalPages
      }
      catch(e){
        console.log(e)
      }
      
    })
  }
})

export default datatablesSlice.reducer
