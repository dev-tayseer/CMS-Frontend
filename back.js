// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import $, { data } from 'jquery'
import themeConfig from "@configs/themeConfig";

// const domain_url = themeConfig.url
const domain_url = "http://10.100.10.131:8085"

export const getData = createAsyncThunk('datatables/getData', async params => {

  try {
    
    var data = new FormData();    
    var config = {
      method: 'get',
      url: 'http://10.100.10.131:8085/users/?length=10&start=0&draw=100',
      headers: { 
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzNzA1MjQ4LCJqdGkiOiJkZTJkZWFkNTI4NTU0MDYwOTg2N2Q4MjQzNDVmOTE4MSIsInVzZXJfaWQiOjF9.UIWousp_Ujdy7IlTGXdA9WpHyAJPBZbwmtvgFgx4UYY', 
      },
      data : data
    };
    let params = {}
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data),"hany ... ");
      console.log(response.data.data,"..............")
      console.log({ allData: response.data, data: response.data.data, totalPages: response.data.recordsTotal, params },"request")
      return { allData: response.data, data: response.data.data, totalPages: response.data.recordsTotal, params }

    })
    .catch(function (error) {
      console.log(error,"error000000000000");
      
    });
    // params.setLoaderShow(false)
    // return {
   
    //     "draw": 100,
    //     "recordsTotal": 2,
    //     "recordsFiltered": 2,
    //     "data": [
    //         {
    //             "id": 1,
    //             "username": "Aws.Majed",
    //             "fullName": null,
    //             "email": ""
    //         },
    //         {
    //             "id": 2,
    //             "username": "Aws_Majed2",
    //             "fullName": "اوس ماجد سلطان احمد زيد",
    //             "email": "aoss.zaid123@gmail.com"
    //         }
    //     ]
    
    // }
} catch(e) {
  params.setLoaderShow(false)
  console.log(e,"---------")
}
  // const token = localStorage.getItem("token")
  // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzNzA0NDk2LCJqdGkiOiJjNDhiZDJiYjZkNWU0Mjk3YjI2ZTVmZjhmZjdlZWYyYSIsInVzZXJfaWQiOjF9.T2J_vzEuTa2SUFlS9eoGPWRfOw6cAYbPwOpaOLCjPFg"
  // params.setLoaderShow(true)
  // console.log(token)
  // const config = {
  //   headers: {
  //              Authorization: `Bearer ${token}`,
  //              'app-lng': 'ar'
  //             }
  // }

//   try {
//     const response = await axios.get(`${domain_url}/users/?length=10&start=0&draw=100`, config, params)
//     console.log(params)
//     console.log("Ahmed")
//     console.log(response.data.data.total)
//     params.setLoaderShow(false)
//     return { allData: response.data.data.data, data: response.data.data.data, totalPages: response.data.data.total, params }
// } catch(e) {
//   params.setLoaderShow(false)
// }

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
      // state.params = action.payload.params
      // state.allData = action.payload.allData
      // state.total = action.payload.totalPages
    })
    
  }
})

export default datatablesSlice.reducer
