// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { sharedvariable, getsharedvariable, setsharedvariable } from '../../../utility/context/contracts_variables';
import { sharedvariable, getsharedvariable, setsharedvariable } from '../../../utility/context/companies_contracts_departments_variables';
// ** Axios Imports
import axios from 'axios'
import themeConfig from "@configs/themeConfig";
import { Exception } from 'sass';

const domain_url = themeConfig.url

// let domain_url =   "https://maniuat.solidsolutionsegypt.net"


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
  // const signal = params.abortcontroller.signal

  console.log(params, "params..")
  // console.log(token)
  params.setLoaderShow(true)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal
  }

  try {
    // departmentId
    const response = await axios.get(`${domain_url}/Contract/?date_from=${params.from_date}&date_to=${params.to_date}&compid=${params.companyId.toString()}&depid=${params.departmentId.toString()}&status_id=${params.statuesId.toString()}&search[value]=${params['search[value]'].toString()}&start=${((params.start - 1) * params.length).toString()}&length=${params.length.toString()}&draw=1`, config, params)

    console.log(params, "hhh")
    console.log(response.data, "resppp")
    console.log({ allData: response.data, data: response.data, totalPages: response.data.recordsFiltered, params }, "***")
    if (!signal.aborted) {
      params.setLoaderShow(false)
      return { allData: response.data.data, data: response.data.data, totalPages: response.data.recordsFiltered, params }

    }
    console.log({ allData: response.data.data, data: response.data.data, totalPages: response.data.recordsTotal, params }, "aaa")
  } catch (e) {


    console.log(e, "hany")
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
