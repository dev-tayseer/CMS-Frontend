// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sharedvariable, getsharedvariable, setsharedvariable } from '../../../utility/context/companies_contracts_departments_variables';

// ** Axios Imports
import axios from 'axios'
import $ from 'jquery'
import themeConfig from "@configs/themeConfig";

const domain_url = themeConfig.url


export const getData = createAsyncThunk('datatables/getData', async params => {
  try {
    if (sharedvariable) {
      sharedvariable.abort()
    }
    setsharedvariable(new AbortController())
    var signal = sharedvariable.signal
  }
  catch (e) {
    var signal = sharedvariable.signal
  }

  const token = localStorage.getItem("token")
  params.setLoaderShow(true)
  // console.log(token)
  console.log(params, "*******")
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal
  }

  try {
    console.log(params.q, "page .. ")
    console.log(params.statuesId, "page .. ")
    // try{
    //   let q = params.q.toString()
    // } catch {
    //   let q = ''
    // }

    // try{
    //   let statuesId = params.statuesId.toString()
    // } catch {
    //   let statuesId = ''
    // }

    
    const response = await axios.get(`${domain_url}/Country/CountryView`, config, params)
    // const response = await axios.get(`${domain_url}/Company/?search[value]=${params.q}&blacklist=${params.statuesId}&start=${((params.start - 1) * params.length).toString()}&length=${params.length.toString()}&draw=1`, config, params)
    console.log(params)
    console.log("Ahmed")
    console.log(response.data.data.total)
    if (!signal.aborted) {
      params.setLoaderShow(false)
      return { allData: response.data.data, data: response.data.data, totalPages: response.data.recordsFiltered, params }
    }

  } catch (e) {
    console.log(e, "eee")
    if (!signal.aborted) {
      params.setLoaderShow(false)
    }
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
      catch (e) {
        console.error("Error occurred while processing data:", error);

      }

    })

  }
})

export default datatablesSlice.reducer
