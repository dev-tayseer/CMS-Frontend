// ** React Imports
import React, { Fragment, useState, useEffect, useRef, useLayoutEffect,useContext } from 'react'
import {LoaderContext, LoaderProvider} from "../../utility/context/LoaderContext";

import axios from 'axios'

import Breadcrumbs from "../components/Breadcrumbs"
import DetailsInfo from "../components/DetailsInfo"


import AlertElement from "../components/AlertElement"
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { Car, Settings, Download, Share, CloseIcon, DocIcon, Loader2 } from '../components/icons/all_icons'
import DatePick from '../components/DatePick'

import { Button, Form, Label, Input, FormFeedback, Row, Col } from 'reactstrap'
import { selectThemeColors } from '@utils'
import * as yup from 'yup'
import $, { data, param } from 'jquery'

import AsyncSelect from 'react-select/async'

// {/* car header component  */}
import homeIcon from "@src/assets/images/svg/homeIcon.svg"
import Arrows from "@src/assets/images/svg/Arrows.svg"
// {/* end car header component  */}
// {/* car details row component */}
import arrowDetails from "@src/assets/images/svg/arrowDetails.svg"
import { isValidDate } from '@fullcalendar/core'
import { yupResolver } from '@hookform/resolvers/yup'
import { current } from '@reduxjs/toolkit'
import { useNavigate  } from "react-router-dom"
import themeConfig from "@configs/themeConfig";

const domain_url = themeConfig.url

// {/* end car details row component */}


const AddCar = () => {
  const {loader_show, setLoaderShow} = useContext(LoaderProvider);
  const [query_companies, setQuery_Companies] = useState('')

  const [inputs, setInputs] = useState({})

  const [showAlert, setShowAlert] = useState(false)

  const [titleAlert, setTitleAlert] = useState("")
  const [headAlert, setHeadAlert] = useState("")
  const [typeAlert, setTypeAlert] = useState("")


  const [errorsAll, seterrorsAll] = useState(null)

  const [chasis_numValidation, setChasis_numValidation] = useState(false)
  const [typeValidation, setTypeValidation] = useState(false)
  const [typeValidation_ar, setTypeValidation_ar] = useState(false)

  const [makeValidation, setMakeValidation] = useState(false)
  const [modelValidation, setModelValidation] = useState(false)
  const [yearValidation, setYearValidation] = useState(false)
  const [brandValidation, setBrandValidation] = useState(false)
  const [brandValidation_ar, setBrandValidation_ar] = useState(false)
  const [modalValidation, setModalValidation] = useState(false)
  const [modalValidation_ar, setModalValidation_ar] = useState(false)

  const [customer_nameValidation, setCustomer_nameValidation] = useState(false)
  const [customer_idValidation, setCustomer_idValidation] = useState(false)
  const [contract_numberValidation, setContract_numberValidation] = useState(false)
  const [sejel_numberValidation, setSejel_numberValidation] = useState(false)
  const [sejel_dateValidation, setSejel_dateValidation] = useState(false)


  const [customer_nameValidation_ar, setCustomer_nameValidation_ar] = useState(false)
  const [priceValidation, setPriceValidation] = useState(false)
  const [price_lateValidation, setPrice_lateValidation] = useState(false)

  const [companyValidation, setCompanyValidation] = useState(false)
  const [colorValidation, setColorValidation] = useState(false)
  const [colorValidation_ar, setColorValidation_ar] = useState(false)

  const [plate_arabicValidation, setPlate_arabicValidation] = useState(false)
  const [plate_EnglishValidation, setPlate_EnglishValidation] = useState(false)

  const [markValueId, setMarkValueId] = useState("")
  const [modelValueId, setModelValueId] = useState("")
  const [typeValueId, setTypeValueId] = useState("")
  const [typeValueId_ar, setTypeValueId_ar] = useState("")

  const [companyValueId, setCompanyValueId] = useState("")
  const [typeData, setTypeData] = useState([])
  const [typeData_ar, setTypeData_ar] = useState([])
  const [companyData, setCompanyData] = useState([])
  const [modelData, setModelData] = useState([])
  const [markData, setMarkData] = useState([])


  const [markValue, setMarkValue] = useState({
    id: 1,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })
  const [modelValue, setModelValue] = useState({
    id: 1,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })
  const [typeValue, setTypeValue] = useState({
    id: 1,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })
  const [typeValue_ar, setTypeValue_ar] = useState({
    id: 1,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })
  const [companyValue, setCompanyValue] = useState({
    id: 1,
    label: "اختر من القائمة",
    value: "اختر من القائمة"
  })
  // add page by default if true ... if false means edit
  // const [add, setAdd] = useState(true)
  const add = useRef(true)
  const navigate = useNavigate()

  // data use states for edit ..... 
  const [chasis_num, setChasis_num] = useState("")
  const [color, setColor] = useState("")
  const [color_ar, setColor_ar] = useState("")

  const [year, setYear] = useState("")
  const [brand, setBrand] = useState("")
  const [brand_ar, setBrand_ar] = useState("")
  const [modal, setModal] = useState("")
  const [modal_ar, setModal_ar] = useState("")
  
  const [customer_name, setCustomer_name] = useState("")
  const [customer_id, setCustomer_id] = useState("")
  const [contract_number, setContract_number] = useState("")
  const [sejel_number, setSejel_number] = useState("")
  const [sejel_date, setSejel_date] = useState("")

  const [price, setPrice] = useState("")
  const [price_late, setPrice_late] = useState("")

  const [customer_name_ar, setCustomer_name_ar] = useState("")

  // english plate values
  // characters ........
  const [plate_num_p_c_en_1, setPlate_num_p_c_en_1] = useState("")
  const [plate_num_p_c_en_2, setPlate_num_p_c_en_2] = useState("")
  const [plate_num_p_c_en_3, setPlate_num_p_c_en_3] = useState("")
  // numbers ....... 
  const [plate_num_p_n_en_1, setPlate_num_p_n_en_1] = useState("")
  const [plate_num_p_n_en_2, setPlate_num_p_n_en_2] = useState("")
  const [plate_num_p_n_en_3, setPlate_num_p_n_en_3] = useState("")
  const [plate_num_p_n_en_4, setPlate_num_p_n_en_4] = useState("")

  // arabic plate values
    // characters ........
    const [plate_num_p_c_a_1, setPlate_num_p_c_a_1] = useState("")
    const [plate_num_p_c_a_2, setPlate_num_p_c_a_2] = useState("")
    const [plate_num_p_c_a_3, setPlate_num_p_c_a_3] = useState("")
    // numbers ....... 
    const [plate_num_p_n_a_1, setPlate_num_p_n_a_1] = useState("")
    const [plate_num_p_n_a_2, setPlate_num_p_n_a_2] = useState("")
    const [plate_num_p_n_a_3, setPlate_num_p_n_a_3] = useState("")
    const [plate_num_p_n_a_4, setPlate_num_p_n_a_4] = useState("")
  

  const ref = useRef("")
  // end data use states for edit ...

  const getCarById = async (car_id) => {
    const token = localStorage.getItem("token")

    const config = {
      headers: { Authorization: `Bearer ${token}`, "app-lng": "ar" }
    }

    try {
      const result = await axios.get(`${domain_url}/get-car?car_id=${car_id}`, config)
      if (result.status === 200) {
        const data = result.data.data[0]
        console.log(data, "55555555")
        setChasis_num(data.chassis_number)
        setColor(data.translations[0].color)
        setColor_ar(data.translations[1].color)
        setYear(data.manufacture_year)
        // console.log()
        if(data.car_brand.translations[0].locale === 'ar') {
          setBrand(data.car_brand.translations[1].name)
          setBrand_ar(data.car_brand.translations[0].name)
        }else{
          setBrand(data.car_brand.translations[0].name)
          setBrand_ar(data.car_brand.translations[1].name)

        }

        // console.log(data.car_model.name, "hell")
        if(data.car_model.translations[0].locale === 'ar') {
          setModal(data.car_model.translations[1].name)
          setModal_ar(data.car_model.translations[0].name)
        }else{
          setModal(data.car_model.translations[0].name)
          setModal_ar(data.car_model.translations[1].name)

        }

        setCustomer_name(data.translations[0].customer_name)
        setCustomer_name_ar(data.translations[1].customer_name)
        setPrice(data.price)
        setPrice_late(data.price_late)
        setCustomer_id(data.customer_id)
        setContract_number(data.contract_number)
        setSejel_number(data.sejel_number)
        setSejel_date(data.sejel_date)
        // setSejel_date("2022-02-21")

        // ex for english plate number 3233ABD 
        // plate english characters
        try {
          const plate_number_en = data.plate_number
          const plate_number_ar = data.plate_number_ar
          console.log(plate_number_en, "plate returned ....")
          
          // plate english characters
          if (plate_number_en.length === 7) {
          setPlate_num_p_c_en_1(plate_number_en[6])
          setPlate_num_p_c_en_2(plate_number_en[5])
          setPlate_num_p_c_en_3(plate_number_en[4])
  
          // plate english numbers
          setPlate_num_p_n_en_1(plate_number_en[3])
          setPlate_num_p_n_en_2(plate_number_en[2])
          setPlate_num_p_n_en_3(plate_number_en[1])
          setPlate_num_p_n_en_4(plate_number_en[0])
          } else if (plate_number_en.length === 6) {
            setPlate_num_p_c_en_1(plate_number_en[5])
            setPlate_num_p_c_en_2(plate_number_en[4])
            setPlate_num_p_c_en_3(plate_number_en[3])
    
            // plate english numbers
            setPlate_num_p_n_en_1(plate_number_en[2])
            setPlate_num_p_n_en_2(plate_number_en[1])
            setPlate_num_p_n_en_3(plate_number_en[0])
          } else if (plate_number_en.length === 5) {
            setPlate_num_p_c_en_1(plate_number_en[4])
            setPlate_num_p_c_en_2(plate_number_en[3])
            setPlate_num_p_c_en_3(plate_number_en[2])
    
            // plate english numbers
            setPlate_num_p_n_en_1(plate_number_en[1])
            setPlate_num_p_n_en_2(plate_number_en[0])
         
          } else if (plate_number_en.length === 4) {
          setPlate_num_p_c_en_1(plate_number_en[3])
          setPlate_num_p_c_en_2(plate_number_en[2])
          setPlate_num_p_c_en_3(plate_number_en[1])
  
          // plate english numbers
          setPlate_num_p_n_en_1(plate_number_en[0])
        }
  
          if (plate_number_ar.length === 7) {
            setPlate_num_p_c_a_1(plate_number_ar[6])
            setPlate_num_p_c_a_2(plate_number_ar[5])
            setPlate_num_p_c_a_3(plate_number_ar[4])
            // plate arabic numbers
            setPlate_num_p_n_a_1(plate_number_ar[3])
            setPlate_num_p_n_a_2(plate_number_ar[2])
            setPlate_num_p_n_a_3(plate_number_ar[1])
            setPlate_num_p_n_a_4(plate_number_ar[0])            
          } else if (plate_number_ar.length === 6) {
            setPlate_num_p_c_a_1(plate_number_ar[5])
            setPlate_num_p_c_a_2(plate_number_ar[4])
            setPlate_num_p_c_a_3(plate_number_ar[3])
            // plate arabic numbers
            setPlate_num_p_n_a_1(plate_number_ar[2])
            setPlate_num_p_n_a_2(plate_number_ar[1])
            setPlate_num_p_n_a_3(plate_number_ar[0])
          } else if (plate_number_ar.length === 5) {
            setPlate_num_p_c_a_1(plate_number_ar[4])
            setPlate_num_p_c_a_2(plate_number_ar[3])
            setPlate_num_p_c_a_3(plate_number_ar[2])
            // plate arabic numbers
            setPlate_num_p_n_a_1(plate_number_ar[1])
            setPlate_num_p_n_a_2(plate_number_ar[0])
          } else if (plate_number_ar.length === 4) {
            setPlate_num_p_c_a_1(plate_number_ar[3])
            setPlate_num_p_c_a_2(plate_number_ar[2])
            setPlate_num_p_c_a_3(plate_number_ar[1])
            // plate arabic numbers
            setPlate_num_p_n_a_1(plate_number_ar[0])
          }
          // plate arabic characters
          // setPlate_num_p_c_a_1(plate_number_ar[6])
          // setPlate_num_p_c_a_2(plate_number_ar[5])
          // setPlate_num_p_c_a_3(plate_number_ar[4])
          // // plate arabic numbers
          // setPlate_num_p_n_a_1(plate_number_ar[3])
          // setPlate_num_p_n_a_2(plate_number_ar[2])
          // setPlate_num_p_n_a_3(plate_number_ar[1])
          // setPlate_num_p_n_a_4(plate_number_ar[0])
          
          } catch (e) {
          console.log('Error', e)
          }
          

        // add Car .... 
        setCompanyValueId(data.company_id)
        setMarkValueId(data.car_brand.id)
        setModelValueId(data.car_model.id)
        setTypeValueId(data.translations[1].type)
        setTypeValueId_ar(data.translations[0].type)

        setMarkValue({
          id: data.car_brand.id,
          label: data.car_brand.name,
          value: data.car_brand.name
        })
        setModelValue({
          id: data.car_model.id,
          label: data.car_model.name,
          value: data.car_model.name
        })
        // needs type_id in the api
        setTypeValue({
          id: 1,
          label: data.translations[0].type,
          value: data.translations[0].type
        })
        setTypeValue_ar({
          id: 1,
          label: data.translations[1].type,
          value: data.translations[1].type
        })
        setCompanyValue({
          id: data.company_id,
          label: data.company_name,
          value: data.company_name
        })
        
        // const mark_value = document.getElementsByClassName("select-white1__placeholder")

      } else {

      }
    } catch (e) {
      console.log(e, "error happened ............")
    }
    setLoaderShow(false)
  }
  useEffect(() => {
    //  handling if edit or add
    setLoaderShow(true)
    try {
      const search = window.location.search
      const params = new URLSearchParams(search)
      const carId = params.get('id')
      if (carId === null || carId === "") {
        add.current = true
      } else {
        add.current = false
        // send request to get data of car
        getCarById(carId)

      }
    } catch (e) {
      console.log('Error', e)
      // setAdd(true)
    }

    // handling current active module
    const nav_links = document.getElementsByClassName("lnk")
    for (let i = 0; i < nav_links.length; i++) {
      nav_links[i].classList.remove("active")
    }

  }, [])

  useEffect(() => {
    setLoaderShow(false)
  }, [loader_show])

  useEffect(() => {
    const chasis_num_input = document.getElementsByName("chasis_num")[0]
    chasis_num_input.value = chasis_num
  }, [chasis_num])

  useEffect(() => {
    const color_input = document.getElementsByName("color")[0]
    color_input.value = color
  }, [color])
  useEffect(() => {
    const color_input_ar = document.getElementsByName("color_ar")[0]
    color_input_ar.value = color_ar
  }, [color_ar])

  useEffect(() => {
    const year_input = document.getElementsByName("year")[0]
    year_input.value = year
  }, [year])

  useEffect(() => {
    const brand_input = document.getElementsByName("brand")[0]
    brand_input.value = brand
  }, [brand])

  useEffect(() => {
    const brand_ar_input = document.getElementsByName("brand_ar")[0]
    brand_ar_input.value = brand_ar
  }, [brand_ar])

  useEffect(() => {
    const modal_input = document.getElementsByName("modal")[0]
    modal_input.value = modal
  }, [modal])

  useEffect(() => {
    const modal_input_ar = document.getElementsByName("modal_ar")[0]
    modal_input_ar.value = modal_ar
  }, [modal_ar])

  useEffect(() => {
    const customer_name_input = document.getElementsByName("customer_name")[0]
    customer_name_input.value = customer_name
  }, [customer_name])
  useEffect(() => {
    const customer_id_input = document.getElementsByName("customer_id")[0]
    customer_id_input.value = customer_id
  }, [customer_id])
  
  useEffect(() => {
    const contract_number_input = document.getElementsByName("contract_number")[0]
    contract_number_input.value = contract_number
  }, [contract_number])

  useEffect(() => {
    const sejel_number_input = document.getElementsByName("sejel_number")[0]
    sejel_number_input.value = sejel_number
  }, [sejel_number])
  useEffect(() => {
    const sejel_date_input = document.getElementsByName("sejel_date")[0]
    sejel_date_input.value = sejel_date
  }, [sejel_date])
  
  useEffect(() => {
    const customer_name_ar_input = document.getElementsByName("customer_name_ar")[0]
    customer_name_ar_input.value = customer_name_ar
  }, [customer_name_ar])

  useEffect(() => {
    const price_input = document.getElementsByName("price")[0]
    price_input.value = price
  }, [price])
  useEffect(() => {
    const price_late_input = document.getElementsByName("price_late")[0]
    price_late_input.value = price_late
  }, [price_late])

  useEffect(() => {
    
    const p_c_en_1_input = document.getElementsByName("p_c_en_1")[0]
    p_c_en_1_input.value = plate_num_p_c_en_1
    
  }, [plate_num_p_c_en_1])

  useEffect(() => {
    const p_c_en_2_input = document.getElementsByName("p_c_en_2")[0]
    p_c_en_2_input.value = plate_num_p_c_en_2
  }, [plate_num_p_c_en_2])

  useEffect(() => {
    const p_c_en_3_input = document.getElementsByName("p_c_en_3")[0]
    p_c_en_3_input.value = plate_num_p_c_en_3
  }, [plate_num_p_c_en_3])

  useEffect(() => {
    
    const p_n_en_1_input = document.getElementsByName("p_n_en_1")[0]
    p_n_en_1_input.value = plate_num_p_n_en_1
    
  }, [plate_num_p_n_en_1])

  useEffect(() => {
    
    const p_n_en_2_input = document.getElementsByName("p_n_en_2")[0]
    p_n_en_2_input.value = plate_num_p_n_en_2
    
  }, [plate_num_p_n_en_2])

  useEffect(() => {
    
    const p_n_en_3_input = document.getElementsByName("p_n_en_3")[0]
    p_n_en_3_input.value = plate_num_p_n_en_3
    
  }, [plate_num_p_n_en_3])
  
  useEffect(() => {
    
    const p_n_en_4_input = document.getElementsByName("p_n_en_4")[0]
    p_n_en_4_input.value = plate_num_p_n_en_4
    
  }, [plate_num_p_n_en_4])

  useEffect(() => {
    
    const p_c_a_1_input = document.getElementsByName("p_c_a_1")[0]
    p_c_a_1_input.value = plate_num_p_c_a_1
    
  }, [plate_num_p_c_a_1])

  useEffect(() => {
    
    const p_c_a_2_input = document.getElementsByName("p_c_a_2")[0]
    p_c_a_2_input.value = plate_num_p_c_a_2
    
  }, [plate_num_p_c_a_2])
  
  useEffect(() => {
    
    const p_c_a_3_input = document.getElementsByName("p_c_a_3")[0]
    p_c_a_3_input.value = plate_num_p_c_a_3
    
  }, [plate_num_p_c_a_3])

  useEffect(() => {
    
    const p_n_a_1_input = document.getElementsByName("p_n_a_1")[0]
    p_n_a_1_input.value = plate_num_p_n_a_1
    
  }, [plate_num_p_n_a_1])

  useEffect(() => {
    
    const p_n_a_2_input = document.getElementsByName("p_n_a_2")[0]
    p_n_a_2_input.value = plate_num_p_n_a_2
    
  }, [plate_num_p_n_a_2])

  useEffect(() => {
    
    const p_n_a_3_input = document.getElementsByName("p_n_a_3")[0]
    p_n_a_3_input.value = plate_num_p_n_a_3
    
  }, [plate_num_p_n_a_3])

  useEffect(() => {
    
    const p_n_a_4_input = document.getElementsByName("p_n_a_4")[0]
    p_n_a_4_input.value = plate_num_p_n_a_4
    
  }, [plate_num_p_n_a_4])

  useEffect(() => {
    
    const p_n_a_4_input = document.getElementsByName("p_n_a_4")[0]
    p_n_a_4_input.value = plate_num_p_n_a_4
    
  }, [plate_num_p_n_a_4])
  // setCompanyValueId(data.company_id)
  // setMarkValueId(data.car_brand.id)
  // setModelValueId(data.car_model.id)
  // setTypeValueId(1)

  const loadOptionsDB_Make = async () => {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}`, "app-lng": "ar"}
    }
    if (markData.length > 0) {
      return markData
    } else {
    const data = await axios.get(`${domain_url}/get-brands`, config).then(res => {
      const brand_list = []
      const result = res.data.data.data
      result.forEach((item, index, array) => {
        brand_list.push(
          {
            id: item['id'],
            value: item['name'],
            label: item['name']
          }
        )
      })
      return brand_list


    })
    setMarkData(data)
    return data
    }
  }
  const loadOptionsDB_Model = async () => {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}`, "app-lng": "ar" }
    }
    if (modelData.length > 0) {
      return modelData
    } else {
    const data = await axios.get(`${domain_url}/get-models`, config).then(res => {
      const model_list = []
      const result = res.data.data.data
      result.forEach((item, index, array) => {
        model_list.push(
          {
            id: item['id'],
            value: item['name'],
            label: item['name']
          }
        )
      })
      return model_list


    })
    console.log("data .", data)
    setModelData(data)
    return data
  }
  }

  const loadOptionsDB_Color = () => {
    return axios.get('/api/select/query_companies', { query_companies }).then(res => {
      return res.data
    })
  }

  const loadOptionsDB_Type = async () => {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}`, "app-lng": "ar" }
    }
    if (typeData.length > 0) {
      return typeData
    } else {
    const data = await axios.get(`${domain_url}/get-models`, config).then(res => {
      const type_list = []
      // const result = res.data.data.data
      const result = [
        {
          id: 1,
          value: "Private Transport",
          label: "Private Transport"
        },
        {
          id: 2,
          value: "Private",
          label: "Private"
        },
        {
          id: 3,
          value: "Public Transport",
          label: "Public Transport"
        },
        {
          id: 4,
          value: "Private Minibus",
          label: "Private Minibus"
        },
        {
          id: 5,
          value: "Public Minibus",
          label: "Public Minibus"
        }
        
      ]
      result.forEach((item, index, array) => {
        type_list.push(item)
      })
      return type_list


    })
    setTypeData(data)
    return data
    }
  }
  const loadOptionsDB_Type_ar = async () => {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}`, "app-lng": "ar" }
    }
    if (typeData_ar.length > 0) {
      return typeData_ar
    } else {
    const data = await axios.get(`${domain_url}/get-models`, config).then(res => {
      const type_list = []
      // const result = res.data.data.data
      const result = [
        {
          id: 1,
          value: "نقل خاص",
          label: "نقل خاص"
        },
        {
          id: 2,
          value: "خصوصي",
          label: "خصوصي"
        },
        {
          id: 3,
          value: "نقل عام",
          label: "نقل عام"
        },
        {
          id: 4,
          value: "حافلة صغيرة خاصة",
          label: "حافلة صغيرة خاصة"
        },
        {
          id: 5,
          value: "حافلة صغيرة عامة",
          label: "حافلة صغيرة عامة"
        }
        
      ]
      result.forEach((item, index, array) => {
        type_list.push(item)
      })
      return type_list


    })
    setTypeData_ar(data)
    return data
    }
  }
  const loadOptionsDB_Company = async () => {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}`, "app-lng": "ar" }
    }
    if (companyData.length > 0) {
      return companyData
    } else {
    const data = await axios.get(`${domain_url}/get-car-companies`, config).then(res => {
      const company_list = []
      const result = res.data.data.data
      
      result.forEach((item, index, array) => {
        company_list.push(
          {
            id: item['id'],
            value: item['name'],
            label: item['name']
          }
        )
      })
      return company_list


    })
    console.log("data .", data)
    setCompanyData(data)
    return data
    }
  }

  const loadOptionsDB_Year = () => {
    return axios.get('/api/select/query_companies', { query_companies }).then(res => {
      return res.data
    })
  }

  // const loadOptionsDB_Company = () => {
  //   return axios.get('/api/select/query_companies', { query_companies }).then(res => {
  //     return res.data
  //   })
  // }

  const checkonlyOneNumberWithLength = (v, n, maxLength) => {

    const name = n
    let value = v
    console.log(value, name, "+++")

    value = value.replace(/[^\d]/, '')
    if (value.length > maxLength) {
      value = value.slice(0, maxLength)
    }
    setInputs(values => ({ ...values, [name]: value }))
    return value
  }

  const checkonlyOneArabicNumberWithLength = (v, n, maxLength) => {

    const name = n
    let value = v

    // value = value.replace(/[^\d]/, '')
    if (value.length > maxLength) {
      value = value.slice(0, maxLength)
    }
    setInputs(values => ({ ...values, [name]: value }))
    return value
  }

  const checkonlyOneCharacterWithLength = (v, n, maxLength) => {

    const name = n
    let value = v
    value = value.replace(/[0-9]/g, '')
    if (value.length > maxLength) {
      value = value.slice(0, maxLength)
    }
    setInputs(values => ({ ...values, [name]: value }))
    return value
  }
  
  const checkNumbersOnly = (v) => {
    const value = v
    const regex = new RegExp('^[0-9]*$')
    return regex.test(value)

  }
  const checkLengthOfThree = (v) => {
    const value = v
    if (value.length > 2) {
      return true
    }
    return false

  }


  const checkLengthOfFour = (v) => {
    const value = v
    if (value.length === 4) {
      return true
    }
    return false

  }

  const checkBrand = (v) => {
    const value = v
    const regex = new RegExp('^[a-zA-Z ]+$')
    return regex.test(value)

  }
  const checkBrand_ar = (v) => {
    const value = v
    const regex = new RegExp('^[ء-ي ]+$')
    return regex.test(value)

  }
  const checkModal = (v) => {
    const value = v
    const regex = new RegExp('^[a-zA-Z0-9 ]+$')
    return regex.test(value)

  }
  const checkModal_ar = (v) => {
    const value = v
    const regex = new RegExp("^[\u0621-\u064A\u0660-\u06690-9 ]+$")
    return regex.test(value)

  }
  

  const checkValidChasis = (v) => {
    const value = v
    const regex = new RegExp('^[A-Z0-9]+$')
    return regex.test(value)

  }
  const regexArabic = (v) => {
    const value = v
    const regex = new RegExp('^[ء-ي ]+$')
    return regex.test(value)

  }
  const regexEnglish = (v) => {
    const value = v
    const regex = new RegExp('^[a-zA-Z ]+$')
    return regex.test(value)

  }

  const arabicNumbers = (v) => {
    const value = v
    const regex = new RegExp('(^[\u0660-\u0669]+$)')
    return regex.test(value)

  }
  
  const validArabicPlate = (v) => {
    const value = v
    const regex = new RegExp('^[أ\ب\ح\د\ر\س\ص\ط\ع\ق\ك\ل\م\ن\ه\و\ى]+$')
    return regex.test(value)

  }

  const validEnglishPlate = (v) => {
    const value = v
    const regex = new RegExp('^[ABJDRSXTEGKLZNHUV]+$')
    return regex.test(value)

  }

  
    const checkCustomerId = (v) => {
      const value = v
      if (value.length === 10 & checkNumbersOnly(value) & (value[0] === "1" | value[0] === "2") ) {
        return true
      }
      return false
  }
  const checkSpaceCharacters = (v) => {
    const value = v
    const regex = new RegExp('^[ ]+$')
    return regex.test(value)

  }

  
  // check first time for editing object ... always undefined at first time 
  const checkInputUndefined = (value) => {
    if (value === undefined) {
      return true
    } else {
      return false
    }
  }

  // const 
  const SignupSchema = yup.object().shape({
    chasis_num: yup.string().test({
      name: 'chasis_num',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = chasis_num
        }
        setChasis_num(value)
        if (value === '' | value === null) {
          setChasis_numValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else if (value.length !== 17 | !(checkValidChasis(value))) {
          setChasis_numValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم الشاسيه بشكل صحيح' })
        }
        setChasis_numValidation(true)
        return true
      }
    }),
    color: yup.string().test({
      name: 'color',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = color
        }
        setColor(value)
        if (value === "" | value === null) {
          setColorValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else if(!checkBrand(value) | (checkSpaceCharacters(value))) {
          setColorValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال اللون (بالانجليزي) بشكل صحيح' })
        }
        setColorValidation(true)
        return true
      }
    }),
    color_ar: yup.string().test({
      name: 'color_ar',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = color_ar
        }
        setColor_ar(value)
        if (value === "" | value === null) {
          setColorValidation_ar(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else if(!checkBrand_ar(value) | (checkSpaceCharacters(value))) {
          setColorValidation_ar(false)
          return ctx.createError({ message: 'الرجاء إدخال اللون (بالعربي) بشكل صحيح' })
        }
        setColorValidation_ar(true)
        return true
      }
    }),
      year: yup.string().test({
      name: 'year',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = year
        }
        setYear(value)
        if (value === "" | value === null) {
          setYearValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else if (!checkNumbersOnly(value) | !checkLengthOfFour(value)) {
          setYearValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال سنة الصنع بشكل صحيح' })
        }
        setYearValidation(true)
        return true
      }
    }),
    brand: yup.string().test({
      name: 'brand',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = brand
        }
        setBrand(value)
        if (value === "" | value === null) {
          setBrandValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else if(!checkBrand(value) | (checkSpaceCharacters(value))) {
          setBrandValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال نوع المركبة (بالانجليزي) بشكل صحيح' })
        }
        setBrandValidation(true)
        return true
      }
    }),
    brand_ar: yup.string().test({
      name: 'brand_ar',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = brand_ar
        }
        setBrand_ar(value)
        if (value === "" | value === null) {
          setBrandValidation_ar(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else if(!checkBrand_ar(value) | (checkSpaceCharacters(value))) {
          setBrandValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال نوع المركبة (بالعربي) بشكل صحيح' })
        }
        setBrandValidation_ar(true)
        return true
      }
    }),
    modal: yup.string().test({
      name: 'modal',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = modal
        }
        setModal(value)
        if (value === "" | value === null) {
          setModalValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else if(!checkModal(value) | (checkSpaceCharacters(value))) {
          setModalValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال الطراز (بالإنجليزي) بشكل صحيح' })
        }
        setModalValidation(true)
        return true
      }
    }),
    modal_ar: yup.string().test({
      name: 'modal_ar',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = modal_ar
        }
        setModal_ar(value)
        if (value === "" | value === null) {
          setModalValidation_ar(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else if(!checkModal_ar(value) | (checkSpaceCharacters(value))) {
          setModalValidation_ar(false)
          return ctx.createError({ message: 'الرجاء إدخال الطراز (بالعربي) بشكل صحيح' })
        }
        setModalValidation_ar(true)
        return true
      }
    }),

    customer_name: yup.string().test({
      name: 'customer_name',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = customer_name
        }
        setCustomer_name(value)
        if (value === "" | value === null) {
          setCustomer_nameValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else if (!regexEnglish(value) | (checkSpaceCharacters(value))){
          setCustomer_nameValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال اسم العميل (بالإنجليزي) بشكل صحيح' })
        } else if (!checkLengthOfThree(value)){
          setCustomer_nameValidation(false)
          return ctx.createError({ message: 'يجب ان لا يقل الاسم عن 3 أحرف' })
        }
        setCustomer_nameValidation(true)
        return true
      }
    }),
    customer_id: yup.string().test({
      name: 'customer_id',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = customer_id
        }
        setCustomer_id(value)
        if (value === "" | value === null) {
          setCustomer_idValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else if (!checkCustomerId(value) | (checkSpaceCharacters(value))) {
          setCustomer_idValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم الهوية بشكل صحيح' })
        }
        setCustomer_idValidation(true)
        return true
      }
    }),
    contract_number: yup.string().test({
      name: 'contract_number',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = contract_number
        }
        setContract_number(value)
        if (value === "" | value === null) {
          setContract_numberValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else if(!checkNumbersOnly(value) | (checkSpaceCharacters(value))) {
          setContract_numberValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم عقد مركبة بشكل صحيح' })
        }
        setContract_numberValidation(true)
        return true
      }
    }),
    sejel_number: yup.string().test({
      name: 'sejel_number',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = sejel_number
        }
        setSejel_number(value)
        if (value === "" | value === null | (checkSpaceCharacters(value))) {
          setSejel_numberValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        }
        setSejel_numberValidation(true)
        return true
      }
    }),
    
    price: yup.string().test({
      name: 'price',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = price
        }
        setPrice(value)
        if (value === "" | value === null | (checkSpaceCharacters(value))) {
          setPriceValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        }
        setPriceValidation(true)
        return true
      }
    }),
    sejel_date: yup.string().test({
      name: 'sejel_date',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = sejel_date
        }
        setSejel_date(value)
        if (value === "" | value === null | (checkSpaceCharacters(value))) {
          setSejel_dateValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        }
        setSejel_dateValidation(true)
        return true
      }
    }),
    price_late: yup.string().test({
      name: 'price_late',
      skipAbsent: true,
      test(value, ctx) {
        console.log(value, "cal sejel date ....")
        if (checkInputUndefined(value)) {
          value = price_late
        }
        setPrice_late(value)
        if (value === "" | value === null | (checkSpaceCharacters(value))) {
          setPrice_lateValidation(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        }
        setPrice_lateValidation(true)
        return true
      }
    }),
    // price_late: yup.string().test({
    //   name: 'sejel_date',
    //   skipAbsent: true,
    //   test(value, ctx) {
    //     console.log(value, "cal sejel date ....")
    //     if (checkInputUndefined(value)) {
    //       value = sejel_date
    //     }
    //     setSejel_date(value)
    //     if (value === "" | value === null) {
    //       setSejel_dateValidation(false)
    //       return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
    //     }
    //     setSejel_dateValidation(true)
    //     return true
    //   }
    // }),
    customer_name_ar: yup.string().test({
      name: 'customer_name_ar',
      skipAbsent: true,
      test(value, ctx) {

        if (checkInputUndefined(value)) {
          value = customer_name_ar
        }
        setCustomer_name_ar(value)
        if (value === "" | value === null) {
          setCustomer_nameValidation_ar(false)
          return ctx.createError({ message: 'الرجاء ملء هذه الخانة مطلوبة' })
        } else if(!regexArabic(value) | (checkSpaceCharacters(value))) {
          setCustomer_nameValidation_ar(false)
          return ctx.createError({ message: 'الرجاء إدخال اسم العميل (بالعربي) بشكل صحيح' })
        } else if (!checkLengthOfThree(value)){
          setCustomer_nameValidation(false)
          return ctx.createError({ message: 'يجب ان لا يقل الاسم عن 3 أحرف' })
        }
        setCustomer_nameValidation_ar(true)
        return true
      }
    }),
    // make: yup.mixed().test({
    //   name: 'make',
    //   skipAbsent: true,
    //   test(value, ctx) {
    //     if (checkInputUndefined(value)) {
    //       value = markValue
    //       if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
    //         setMakeValidation(false)
    //         return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
    //       } else {
    //         try {
    //           setMarkValueId(value.id)
    //           } catch (e) {
    //             console.log("1")
    //           }
    //       }
    //     }
    //     if (value === '' | value === null) {

    //       setMakeValidation(false)
    //       return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
    //   } else {
    //     try {
    //       setMarkValueId(value.id)
    //     } catch (e) {
    //         console.log("1")
    //       }
    //   }
        
    //     setMakeValidation(true)
    //     return true
    //   }
    // }),

    // model: yup.mixed().test({
    //   name: 'model',
    //   skipAbsent: true,
    //   test(value, ctx) {
    //     if (checkInputUndefined(value)) {
    //       value = modelValue
    //       if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
    //         setModelValidation(false)
    //         return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
    //       } else {
    //         try {
    //           setModelValueId(value.id)
    //           } catch (e) {
    //             console.log("1")
    //           }
    //       }
    //     }
    //     if (value === '' | value === null) {
    //       setModelValidation(false)
    //       return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
    //   } else {
    //     try {
          
    //       setModelValueId(value.id)
    //     } catch (e) {
    //         console.log("1")
    //       }
    //   }
    //     setModelValidation(true)
    //     return true
    //   }
    // }),
    type: yup.mixed().test({
      name: 'type',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = typeValue
          if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
            setTypeValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              setTypeValueId(value.id)
              } catch (e) {
                console.log("1")
              }
          }
        }
        if (value === '' | value === null) {
          setTypeValidation(false)
          return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
     
      } else {
        try {
          setTypeValueId(value.value)
        } catch (e) {
            console.log("1")
          }
      }
        setTypeValidation(true)
        return true
      }
    }),
    type_ar: yup.mixed().test({
      name: 'type_ar',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = typeValue_ar
          if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
            setTypeValidation_ar(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              setTypeValueId_ar(value.id)
              } catch (e) {
                console.log("1")
              }
          }
        }
        if (value === '' | value === null) {
          setTypeValidation_ar(false)
          return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
     
      } else {
        try {
          setTypeValueId_ar(value.value)
        } catch (e) {
            console.log("1")
          }
      }
        setTypeValidation_ar(true)
        return true
      }
    }),
    company: yup.mixed().test({
      name: 'company',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = companyValue
          console.log(value, "+666666666")
          if (value === null | value === undefined | value === '' | value.value === 'اختر من القائمة') {
            setCompanyValidation(false)
            return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
          } else {
            try {
              setCompanyValueId(value.id)
              } catch (e) {
                console.log("1")
              }
          }
        }
        if (value === '' | value === null) {
          setCompanyValidation(false)
          return ctx.createError({ message: 'الرجاء إختيار أحد الخيارات' })
        } else {
          try {
          setCompanyValueId(value.id)
          } catch (e) {
            console.log("1")
          }
        }
        setCompanyValidation(true)
        return true
      }
    }),
    p_c_a_1: yup.string().test({
      name: 'p_c_a_1',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = plate_num_p_c_a_1
        }
        value = checkonlyOneCharacterWithLength(value, 'p_c_a_1', 1)
        setPlate_num_p_c_a_1(value)
        if (value === '' | value === null) {
          setPlate_arabicValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
          
        } else if (!regexArabic(value) | !validArabicPlate(value)) {
          setPlate_arabicValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        }
        // setPlate_num_p_c_en_1("a")
        setPlate_arabicValidation(true)
        return true
      }
    }),
    p_c_a_2: yup.string().test({
      name: 'p_c_a_2',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = plate_num_p_c_a_2
        }
        value = checkonlyOneCharacterWithLength(value, 'p_c_a_2', 1)
        setPlate_num_p_c_a_2(value)

        if (value === '' | value === null) {
          setPlate_arabicValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        } else if (!regexArabic(value) | !validArabicPlate(value)) {
          setPlate_arabicValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        }
        setPlate_arabicValidation(true)
        return true
      }
    }),
    p_c_a_3: yup.string().test({
      name: 'p_c_a_3',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = plate_num_p_c_a_3
        }
        value = checkonlyOneCharacterWithLength(value, 'p_c_a_3', 1)
        setPlate_num_p_c_a_3(value)
        if (value === '' | value === null) {
          setPlate_arabicValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        } else if (!regexArabic(value) | !validArabicPlate(value)) {
          setPlate_arabicValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        }
        setPlate_arabicValidation(true)
        return true
      }
    }),
    p_n_a_1: yup.string().test({
      name: 'p_n_a_1',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = plate_num_p_n_a_1
        }
        value = checkonlyOneArabicNumberWithLength(value, 'p_n_a_1', 1)
        setPlate_num_p_n_a_1(value)

        console.log(value === null, value, "hany ..........")
        if (value === '' | value === null | !arabicNumbers(value)) {
          console.log("null yes 0...")
          setPlate_arabicValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        }
        setPlate_arabicValidation(true)
        return true
      }
    }),
    p_n_a_2: yup.string().test({
      name: 'p_n_a_2',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = plate_num_p_n_a_2
        }
        value = checkonlyOneArabicNumberWithLength(value, 'p_n_a_2', 1)
        setPlate_num_p_n_a_2(value)
        if (value === "" | value === undefined | value === null) {
          setPlate_arabicValidation(true)
          return true
        }
        if (!arabicNumbers(value)) {
          console.log("null yes 0...")
          setPlate_arabicValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        }

        setPlate_arabicValidation(true)
        return true
      }
    }),
    p_n_a_3: yup.string().test({
      name: 'p_n_a_3',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = plate_num_p_n_a_3
        }
        value = checkonlyOneArabicNumberWithLength(value, 'p_n_a_3', 1)
        setPlate_num_p_n_a_3(value)
        if (value === "" | value === undefined | value === null) {
          setPlate_arabicValidation(true)
          return true
        }
        if (!arabicNumbers(value)) {
          console.log("null yes 0...")
          setPlate_arabicValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        }
        setPlate_arabicValidation(true)
        return true
      }
    }),
    p_n_a_4: yup.string().test({
      name: 'p_n_a_4',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = plate_num_p_n_a_4
        }
        value = checkonlyOneArabicNumberWithLength(value, 'p_n_a_4', 1)
        setPlate_num_p_n_a_4(value)
        if (value === "" | value === undefined | value === null) {
          setPlate_arabicValidation(true)
          return true
        }
        if (!arabicNumbers(value)) {
          console.log("null yes 0...")
          setPlate_arabicValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        }
        setPlate_arabicValidation(true)
        return true
      }
    }),
    p_c_en_1: yup.string().test({
      name: 'p_c_en_1',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = plate_num_p_c_en_1
        }
        value = checkonlyOneCharacterWithLength(value, 'p_c_en_1', 1)
        setPlate_num_p_c_en_1(value)
        if (value === '' | value === null) {
          setPlate_EnglishValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        } else if (!regexEnglish(value) | !validEnglishPlate(value)) {
          setPlate_arabicValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        }
        setPlate_EnglishValidation(true)
        return true
      }
    }),
    p_c_en_2: yup.string().test({
      name: 'p_c_en_2',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = plate_num_p_c_en_2
        }
        value = checkonlyOneCharacterWithLength(value, 'p_c_en_2', 1)
        setPlate_num_p_c_en_2(value)
        if (value === '' | value === null) {
          setPlate_EnglishValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        } else if (!regexEnglish(value) | !validEnglishPlate(value)) {
          setPlate_arabicValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        }
        setPlate_EnglishValidation(true)
        return true
      }
    }),
    p_c_en_3: yup.string().test({
      name: 'p_c_en_3',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = plate_num_p_c_en_3
        }
        value = checkonlyOneCharacterWithLength(value, 'p_c_en_3', 1)
        setPlate_num_p_c_en_3(value)
        if (value === '' | value === null) {
          setPlate_EnglishValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        } else if (!regexEnglish(value) | !validEnglishPlate(value)) {
          setPlate_arabicValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        }
        setPlate_EnglishValidation(true)
        return true
      }
    }),
    p_n_en_1: yup.string().test({
      name: 'p_n_en_1',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = plate_num_p_n_en_1
        }
        value = checkonlyOneNumberWithLength(value, 'p_n_en_1', 1)
        setPlate_num_p_n_en_1(value)
        if (value === '' | value === null) {
          setPlate_EnglishValidation(false)
          return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        }
        setPlate_EnglishValidation(true)
        return true
      }
    }),
    p_n_en_2: yup.string().test({
      name: 'p_n_en_2',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = plate_num_p_n_en_2
        }
        value = checkonlyOneNumberWithLength(value, 'p_n_en_2', 1)
        setPlate_num_p_n_en_2(value)
        // if (value === '' | value === null) {
        //   setPlate_EnglishValidation(false)
        //   return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        // }
        setPlate_EnglishValidation(true)
        return true
      }
    }),
    p_n_en_3: yup.string().test({
      name: 'p_n_en_3',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = plate_num_p_n_en_3
        }
        value = checkonlyOneNumberWithLength(value, 'p_n_en_3', 1)
        setPlate_num_p_n_en_3(value)

        // if (value === '' | value === null) {
        //   setPlate_EnglishValidation(false)
        //   return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        // }
        setPlate_EnglishValidation(true)
        return true
      }
    }),
    p_n_en_4: yup.string().test({
      name: 'p_n_en_4',
      skipAbsent: true,
      test(value, ctx) {
        if (checkInputUndefined(value)) {
          value = plate_num_p_n_en_4
        }
        value = checkonlyOneNumberWithLength(value, 'p_n_en_4', 1)
        setPlate_num_p_n_en_4(value)

        // if (value === '' | value === null) {
        //   setPlate_EnglishValidation(false)
        //   return ctx.createError({ message: 'الرجاء إدخال رقم اللوحة بشكل صحيح' })
        // }
        setPlate_EnglishValidation(true)
        return true
      }
    })

  })

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const handleClick = data => {
    console.log("clcijdsd")
    ref.current = "5555555555"
  }
  const saveDataCar = async(domain_url, params, config) => {
    try {
      
      if (add['current'] === true) {
        console.log("adding ...")
        const result = await axios.post(`${domain_url}/add-car`, params, config)
         const data = result.data
         if (data.status === 200) {
          console.log("added car")
          setTypeAlert("Success")
          setTitleAlert("تم إضافة العقد بنجاح.")
          setHeadAlert(" ")
          setShowAlert(true)
          navigate('/cars?success=added')

    
      } else {
        console.log("400 error happened")
        setTypeAlert("Fail")
        setTitleAlert(`${data["message"]}`)
        setHeadAlert("حدث خطأ")
        setShowAlert(true)
        setLoaderShow(false)
      }        
      } else {
        console.log("eding", params)
        const result = await axios.post(`${domain_url}/edit-car`, params, config)
         const data = result.data
         if (data.status === 200) {
          console.log("added car")
          setTypeAlert("Success")
          setTitleAlert("تم إضافة العقد بنجاح.")
          setHeadAlert(" ")
          setShowAlert(true)
          navigate('/cars?success=edited')
    
      } else {
        console.log("400 error happened")
        setTypeAlert("Fail")
        setTitleAlert(`${data["message"]}`)
        setHeadAlert("حدث خطأ")
        setShowAlert(true)
        setLoaderShow(false)
      }
      }

    } catch (e) {
      console.log(e, "ee")
      setTypeAlert("Fail")
      setTitleAlert("لم يتم إضافة العقد بشكل صحيح.")
      setHeadAlert("حدث خطأ")
      setShowAlert(true)
      setLoaderShow(false)
    }
  }
  const onSubmit = data => {
    console.log("submit ..........")
    setLoaderShow(true)
    if (chasis_numValidation & typeValidation & typeValidation_ar & yearValidation & brandValidation & brandValidation_ar & modalValidation & modalValidation_ar & customer_nameValidation & customer_idValidation & contract_numberValidation & sejel_numberValidation & priceValidation & price_lateValidation & customer_nameValidation_ar & companyValidation & colorValidation & colorValidation_ar & sejel_dateValidation) {
      console.log("we can now send request to save the car after being validated ................")
      const token = localStorage.getItem("token")
      const search = window.location.search
      const paramsUrl = new URLSearchParams(search)
      const carId = paramsUrl.get('id')

      const config = {
        headers: { Authorization: `Bearer ${token}`, "app-lng": "ar" }
      }

      const plate_num = plate_num_p_n_en_4 + plate_num_p_n_en_3 + plate_num_p_n_en_2 + plate_num_p_n_en_1 + plate_num_p_c_en_3 + plate_num_p_c_en_2 + plate_num_p_c_en_1 
      console.log(plate_num, "plate numbe r...........")
      console.log(companyValueId, "--", markValueId, "--", modelValueId, "--", typeValueId, color, year, chasis_num, "hany/////////////////////////////")
      let params = ""
      if (add['current'] === true) {
        params = {plate_number : `${plate_num}`, chassis_number : `${chasis_num}`, brand : `${brand}`, brand_ar : `${brand_ar}`, model : `${modal}`, model_ar : `${modal_ar}`, manufacture_year : `${year}`, customer_name : `${customer_name}`, customer_id : `${customer_id}`, contract_number : `${contract_number}`, sejel_number : `${sejel_number}`, price : `${price}`, price_late : `${price_late}`, customer_name_ar : `${customer_name_ar}`, company_id : `${companyValueId}`, color : `${color}`, color_ar : `${color_ar}`, type : `${typeValueId}`, type_ar : `${typeValueId_ar}`, sejel_date : `${sejel_date}` }
      } else {
        params = {car_id : `${carId}`, plate_number : `${plate_num}`, chassis_number : `${chasis_num}`, brand : `${brand}`, brand_ar : `${brand_ar}`, model : `${modal}`, model_ar : `${modal_ar}`, manufacture_year : `${year}`, customer_name : `${customer_name}`, customer_id : `${customer_id}`, contract_number : `${contract_number}`, sejel_number : `${sejel_number}`, price : `${price}`, price_late : `${price_late}`, customer_name_ar : `${customer_name_ar}`, company_id : `${companyValueId}`, color : `${color}`, color_ar : `${color_ar}`, type : `${typeValueId}`, type_ar : `${typeValueId_ar}`, sejel_date : `${sejel_date}` }

        // params = {car_id : `${carId}`, plate_number : `${plate_num}`, chassis_number : `${chasis_num}`, brand : `${brand}`, brand_ar : `${brand_ar}`, model : `${modal}`, model_ar : `${modal_ar}`, manufacture_year : `${year}`, customer_name : `${customer_name}`, customer_id : `${customer_id}`, contract_number : `${contract_number}`, price : `${price}`, sejel_number : `${sejel_number}`, price_late : `${price_late}`, customer_name_ar : `${customer_name_ar}`, company_id : `${companyValueId}`, color : `${color}`, color_ar : `${color_ar}`, type : `${typeValueId}`, type_ar : `${typeValueId_ar}`, sejel_date : `${sejel_date}` }

      }
      console.log(params, "********")
      saveDataCar(domain_url, params, config)


    }else{
      setLoaderShow(false)
    }
  }

  const SelectWithValidation = ({ defaultValue, id_name, title, control, errors_check, loadOptionsDB  }) => {
   
    return (
      <>
        <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for={id_name}>
          {title}
        </Label>
        <Controller
          id={id_name}
          name={id_name}
          
          control={control}
          className="hany"
          render={({ field }) => (
            <AsyncSelect
              defaultValue = {defaultValue}
              {...field}
              defaultOptions
              isClearable
              id={id_name}
              name={id_name}
              classNamePrefix='select-white'
              placeholder='اختر من القائمة'
              loadOptions={loadOptionsDB}
              theme={selectThemeColors}
              
              className={errors_check ? 'react-select f-w-700  font-Almarai p-0 height-48 is-invalid f-s-12px w-100 mx-auto' : 'react-select f-w-700  font-Almarai p-0 height-48 f-s-12px w-100 mx-auto'}
            />)
          }
        />
        {errors_check && <FormFeedback>{errors_check.message}</FormFeedback>}
      </>
    )
  }

  return (
    <div className="theme-content">
      <div className="container container2 ps-md-0 pe-md-0">

        {/* car header component  */}
        {(add['current']) ?  <Breadcrumbs icon={homeIcon} urlMain="/cars" Arrows={Arrows} main={'المركبات'} second={'إضافة مركبة'}></Breadcrumbs> : <Breadcrumbs icon={homeIcon} urlMain="/cars" Arrows={Arrows} main={'المركبات'} second={'تعديل بيانات المركبة'}></Breadcrumbs> }

        {/* end car header component  */}

        {/* car details row component */}
        {(add['current']) ? <DetailsInfo image={arrowDetails} title={'إضافة مركبة'} ></DetailsInfo> : <DetailsInfo image={arrowDetails} title={'تعديل بيانات المركبة'} ></DetailsInfo> }
        {/*end car details row component */}
        <AlertElement headAlert={headAlert} titleAlert={titleAlert} setShowAlert={setShowAlert} showAlert={showAlert} typeAlert={typeAlert} />

        {/* car details component */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="container-fluid mt-5 pt-2 background-FFFFFF borderRadius-8">
            <Row>
              <p className="font-Almarai f-w-800 f-s-20px color-1F2733 p-4">بيانات المركبة</p>
            </Row>
            <Row>
              <Col md='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                  لوحة المركبة (بالعربي)
                </Label>
                <Row >
                  <Col className='colInSmall'>
                    <Controller
                      id='p_c_a_1'
                      name='p_c_a_1'
                      // defaultValue=''
                      value={plate_num_p_c_a_1}
                      control={control}
                      render={({ field }) => <Input {...field} bsSize='lg' name="p_c_a_1" value={inputs.p_c_a_1 } className={add['current'] ? 'height-48 f-s-12px f-w-700 customSmall' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB customSmall'} invalid={errors.p_c_a_1 && true} />}
                    />
                  </Col>

                  <Col className='colInSmall'>
                    <Controller
                      id='p_c_a_2'
                      name='p_c_a_2'
                      // defaultValue=''
                      value={plate_num_p_c_a_2}
                      control={control}
                      render={({ field }) => <Input {...field} bsSize='lg' name="p_c_a_2" value={inputs.p_c_a_2 } maxLength="1" className={add['current'] ? 'height-48 f-s-12px f-w-700 customSmall' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB customSmall'} invalid={errors.p_c_a_2 && true} />}
                    />
                  </Col>

                  <Col className='colInSmall'>
                    <Controller
                      id='p_c_a_3'
                      name='p_c_a_3'
                      // defaultValue=''
                      value={plate_num_p_c_a_3}
                      control={control}
                      render={({ field }) => <Input {...field} bsSize='lg' name="p_c_a_3" value={inputs.p_c_a_3 } className={add['current'] ? 'height-48 f-s-12px f-w-700 customSmall' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB customSmall'} invalid={errors.p_c_a_3 && true} />}
                    />
                  </Col>

                  <Col className='colInSmall'>
                    <p className="f-s-25px f-w-800 pt-2 ps-3">-</p>
                  </Col>

                  <Col className='colInSmall'>
                    <Controller
                      id='p_n_a_1'
                      name='p_n_a_1'
                      // defaultValue=''
                      value={plate_num_p_n_a_1}
                      control={control}
                      render={({ field }) => <Input {...field} bsSize='lg' name="p_n_a_1" value={inputs.p_n_a_1 } className={add['current'] ? 'height-48 f-s-12px f-w-700 customSmall' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB customSmall'} invalid={errors.p_n_a_1 && true} />}
                    />
                  </Col>

                  <Col className='colInSmall'>
                    <Controller
                      id='p_n_a_2'
                      name='p_n_a_2'
                      // defaultValue=''
                      value={plate_num_p_n_a_2}
                      control={control}
                      render={({ field }) => <Input {...field} bsSize='lg' name="p_n_a_2" value={inputs.p_n_a_2 } className={add['current'] ? 'height-48 f-s-12px f-w-700 customSmall' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB customSmall'} invalid={errors.p_n_a_2 && true} />}
                    />
                  </Col>

                  <Col className='colInSmall'>
                    <Controller
                      id='p_n_a_3'
                      name='p_n_a_3'
                      // defaultValue=''
                      value={plate_num_p_n_a_3}
                      control={control}
                      render={({ field }) => <Input {...field} bsSize='lg' name="p_n_a_3" value={inputs.p_n_a_3 } className={add['current'] ? 'height-48 f-s-12px f-w-700 customSmall' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB customSmall'} invalid={errors.p_n_a_3 && true} />}
                    />
                  </Col>


                  <Col className='colInSmall'>
                    <Controller
                      id='p_n_a_4'
                      name='p_n_a_4'
                      // defaultValue=''
                      value={plate_num_p_n_a_4}
                      control={control}
                      render={({ field }) => <Input {...field} bsSize='lg' name="p_n_a_4" value={inputs.p_n_a_4 } className={add['current'] ? 'height-48 f-s-12px f-w-700 customSmall' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB customSmall'} invalid={errors.p_n_a_4 && true} />}
                    />
                  </Col>
                </Row>
                <input className="d-none is-invalid" />
                {(errors.p_c_a_1 || errors.p_c_a_2 || errors.p_c_a_3 || errors.p_n_a_1 || errors.p_n_a_2 || errors.p_n_a_3 || errors.p_n_a_4) ? (<FormFeedback>{"الرجاء إدخال رقم اللوحة بشكل صحيح"}</FormFeedback>) : null}

              </Col>

              <Col md='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_snum'>
                  لوحة المركبة (بالإنجليزي)
                </Label>
                <Row>
                  <Col className='colInSmall'>
                    <Controller
                      id='p_c_en_1'
                      name='p_c_en_1'
                      value={plate_num_p_c_en_1}
                      // defaultValue=""
                      control={control}
                      render={({ field }) => <Input {...field} bsSize='lg' name="p_c_en_1"  value={inputs.p_c_en_1 } className={add['current'] ? 'height-48 f-s-12px f-w-700 customSmall' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB customSmall'} invalid={errors.p_c_en_1 && true} />}
                    />
                  </Col>

                  <Col className='colInSmall'>
                    <Controller
                      id='p_c_en_2'
                      name='p_c_en_2'
                      // defaultValue=''
                      value={plate_num_p_c_en_2}
                      control={control}
                      render={({ field }) => <Input {...field} bsSize='lg' name="p_c_en_2" value={inputs.p_c_en_2 } className={add['current'] ? 'height-48 f-s-12px f-w-700 customSmall' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB customSmall'} invalid={errors.p_c_en_2 && true} />}
                    />
                  </Col>

                  <Col className='colInSmall'>
                    <Controller
                      id='p_c_en_3'
                      name='p_c_en_3'
                      // defaultValue=''
                      value={plate_num_p_c_en_3}
                      control={control}
                      render={({ field }) => <Input {...field} bsSize='lg' name="p_c_en_3" value={inputs.p_c_en_3 } className={add['current'] ? 'height-48 f-s-12px f-w-700 customSmall' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB customSmall'} invalid={errors.p_c_en_3 && true} />}
                    />
                  </Col>

                  <Col className='colInSmall'>
                    <p className="f-s-25px f-w-800 pt-2 ps-3 ">-</p>
                  </Col>

                  <Col className='colInSmall'>
                    <Controller
                      id='p_n_en_1'
                      name='p_n_en_1'
                      // defaultValue=''
                      value={plate_num_p_n_en_1}
                      control={control}
                      render={({ field }) => <Input {...field} bsSize='lg' name="p_n_en_1" value={inputs.p_n_en_1 } className={add['current'] ? 'height-48 f-s-12px f-w-700 customSmall' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB customSmall'} invalid={errors.p_n_en_1 && true} />}
                    />
                  </Col>

                  <Col className='colInSmall'>
                    <Controller
                      id='p_n_en_2'
                      name='p_n_en_2'
                      // defaultValue=''
                      value={plate_num_p_n_en_2}
                      control={control}
                      render={({ field }) => <Input {...field} bsSize='lg' name="p_n_en_2" value={inputs.p_n_en_2 } className={add['current'] ? 'height-48 f-s-12px f-w-700 customSmall' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB customSmall'} invalid={errors.p_n_en_2 && true} />}
                    />
                  </Col>

                  <Col className='colInSmall'>
                    <Controller
                      id='p_n_en_3'
                      name='p_n_en_3'
                      // defaultValue=''
                      value={plate_num_p_n_en_3}
                      control={control}
                      render={({ field }) => <Input {...field} bsSize='lg' name="p_n_en_3" value={inputs.p_n_en_3 } className={add['current'] ? 'height-48 f-s-12px f-w-700 customSmall' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB customSmall'} invalid={errors.p_n_en_3 && true} />}
                    />
                  </Col>


                  <Col className='colInSmall'>
                    <Controller
                      id='p_n_en_4'
                      name='p_n_en_4'
                      // defaultValue=''
                      value={`${plate_num_p_n_en_4}`}
                      control={control}
                      render={({ field }) => <Input {...field} bsSize='lg' name="p_n_en_4" value={inputs.p_n_en_4 } className={add['current'] ? 'height-48 f-s-12px f-w-700 customSmall' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB customSmall'} invalid={errors.p_n_en_4 && true} />}
                    />
                  </Col>
                </Row>
                <input className="d-none is-invalid" />
                {(errors.p_c_en_1 || errors.p_c_en_2 || errors.p_c_en_3 || errors.p_n_en_1 || errors.p_n_en_2 || errors.p_n_en_3 || errors.p_n_en_4) ? (<FormFeedback>{"الرجاء إدخال رقم اللوحة بشكل صحيح"}</FormFeedback>) : null}

              </Col>

              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                  رقم الهيكل
                </Label>
                <Controller
                  id='chasis_num'
                  name='chasis_num'
                  // defaultValue={`${chasis_num}`} 
                  value={`${chasis_num}`}
                  // onChange={(e) => setChasis_num(e.target.value)}

                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل رقم الهيكل' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.chasis_num && true} />}
                />
                {errors.chasis_num && <FormFeedback>{errors.chasis_num.message}</FormFeedback>}

              </Col>
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                  نوع المركبة (بالانجليزي)
                </Label>
                <Controller
                  id='brand'
                  name='brand'
                  value={`${brand}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل نوع المركبة (بالانجليزي)' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.brand && true} />}
                />
                {errors.brand && <FormFeedback>{errors.brand.message}</FormFeedback>}

              </Col>
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                نوع المركبة (بالعربي)
                </Label>
                <Controller
                  id='brand_ar'
                  name='brand_ar'
                  value={`${brand_ar}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل نوع المركبة (بالعربي)' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.brand_ar && true} />}
                />
                {errors.brand_ar && <FormFeedback>{errors.brand_ar.message}</FormFeedback>}

              </Col>
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                  الطراز (بالإنجليزي)
                </Label>
                <Controller
                  id='modal'
                  name='modal'
                  value={`${modal}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل الطراز (بالإنجليزي)' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.modal && true} />}
                />
                {errors.modal && <FormFeedback>{errors.modal.message}</FormFeedback>}

              </Col>
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                  الطراز (بالعربي)

                </Label>
                <Controller
                  id='modal_ar'
                  name='modal_ar'
                  value={`${modal_ar}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل الطراز (بالعربي)' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.modal_ar && true} />}
                />
                {errors.modal_ar && <FormFeedback>{errors.modal_ar.message}</FormFeedback>}

              </Col>

              {/* <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <SelectWithValidation defaultValue={markValue} id_name='make'  title='الماركة' control={control} errors_check={errors.make} loadOptionsDB={loadOptionsDB_Make} />

              </Col> */}
              {/* <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <SelectWithValidation defaultValue={modelValue} id_name='model' title='الموديل' control={control} errors_check={errors.model} loadOptionsDB={loadOptionsDB_Model} />

              </Col> */}

              {/* <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                اللون
                </Label>
                <Controller
                  id='color'
                  name='color'
                  value={`${color}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل اللون' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.color && true} />}
                />
                {errors.color && <FormFeedback>{errors.color.message}</FormFeedback>}

              </Col> */}

                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                اللون (بالإنجليزي)
                </Label>
                <Controller
                  id='color'
                  name='color'
                  value={`${color}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل اللون (بالإنجليزي)' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.color && true} />}
                />
                {errors.color && <FormFeedback>{errors.color.message}</FormFeedback>}

              </Col>
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                 اللون (بالعربي)
                </Label>
                <Controller
                  id='color_ar'
                  name='color_ar'
                  value={`${color_ar}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل اللون (بالعربي)' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.color_ar && true} />}
                />
                {errors.color_ar && <FormFeedback>{errors.color_ar.message}</FormFeedback>}

              </Col>

              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                {/* خاص او شركة */}
                <SelectWithValidation defaultValue={typeValue} id_name='type' title='نوع تسجيل المركبة (بالإنجليزي)' control={control} errors_check={errors.type} loadOptionsDB={loadOptionsDB_Type} />
              </Col>
            
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <SelectWithValidation id_name='type_ar' defaultValue={typeValue_ar} title='نوع تسجيل المركبة (بالعربي)' control={control} errors_check={errors.type_ar} loadOptionsDB={loadOptionsDB_Type_ar} />

              </Col> 
              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                سنة الصنع
                </Label>
                <Controller
                  id='year'
                  name='year'
                  value={`${year}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل سنة الصنع' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.year && true} />}
                />
                {errors.year && <FormFeedback>{errors.year.message}</FormFeedback>}
                </Col>
                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                  اسم العميل (بالإنجليزي)
                </Label>
                <Controller
                  id='customer_name'
                  name='customer_name'
                  value={`${customer_name}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل اسم العميل' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.customer_name && true} />}
                />
                {errors.customer_name && <FormFeedback>{errors.customer_name.message}</FormFeedback>}
                </Col>
                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                  اسم العميل (بالعربي)
                </Label>
                <Controller
                  id='customer_name_ar'
                  name='customer_name_ar'
                  value={`${customer_name_ar}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل اسم العميل بالعربي' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.customer_name_ar && true} />}
                />
                {errors.customer_name_ar && <FormFeedback>{errors.customer_name_ar.message}</FormFeedback>}
                </Col>
                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                  رقم الهوية
                </Label>
                <Controller
                  id='customer_id'
                  name='customer_id'
                  value={`${customer_id}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل رقم الهوية' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.customer_id && true} />}
                />
                {errors.customer_id && <FormFeedback>{errors.customer_id.message}</FormFeedback>}
                </Col>
                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                  رقم عقد المركبة
                </Label>
                <Controller
                  id='contract_number'
                  name='contract_number'
                  value={`${contract_number}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل رقم عقد المركبة' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.contract_number && true} />}
                />


                {errors.contract_number && <FormFeedback>{errors.contract_number.message}</FormFeedback>}
                </Col>
                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                  رقم الشهادة
                </Label>
                <Controller
                  id='sejel_number'
                  name='sejel_number'
                  value={`${sejel_number}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل رقم الشهادة' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.sejel_number && true} />}
                />


                {errors.sejel_number && <FormFeedback>{errors.sejel_number.message}</FormFeedback>}
                </Col>
                
                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                حساب المركبة 
                </Label>
                <Controller
                  id='price'
                  name='price'
                  value={`${price}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل حساب المركبة' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.price && true} />}
                />
                {errors.price && <FormFeedback>{errors.price.message}</FormFeedback>}
                </Col>
                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                  المتأخرات
                </Label>
                <Controller
                  id='price_late'
                  name='price_late'
                  value={`${price_late}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل المتأخرات' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.price_late && true} />}
                />
                {errors.price_late && <FormFeedback>{errors.price_late.message}</FormFeedback>}
                </Col>
                <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <Label className='form-label font-Almarai f-w-700 f-s-12px color-1F2733' for='chasis_num'>
                تاريخ إصدار الشهادة
                </Label>
                <Controller
                  id='sejel_date'
                  name='sejel_date'
                  value={`${sejel_date}`}
                  control={control}
                  render={({ field }) => <Input   {...field} placeholder='أدخل تاريخ إصدار الشهادة' bsSize='lg' className={add['current'] ? 'height-48 f-s-12px f-w-700' : 'height-48 f-s-12px f-w-700 border-A0A8B3 bg-F9FAFB'} invalid={errors.sejel_date && true} />}
                />
                {errors.sejel_date && <FormFeedback>{errors.sejel_date.message}</FormFeedback>}
                </Col>
                {/* <Col md='6' sm='6' className='mb-1'> */}
                  {/* <PickerDefault className=' ps-1 pe-1 pt-1 col-12 col-md-3 mx-auto' dir="ltr" /> */}
                  {/* <PickerRange className=' ps-1 pe-1 pt-1 col-12 col-md-3 mx-auto' 
                         dir="ltr"
                         functionHandler = {setPickerHandler}
                         picker = {picker} /> */}
                         {/* <DatePick sejel_date={sejel_date} /> */}
                {/* </Col> */}

              <Col sm='6' className='mb-4 form-group bmd-form-group'>
                <SelectWithValidation defaultValue={companyValue} id_name='company' title='الشركة' control={control} errors_check={errors.company} loadOptionsDB={loadOptionsDB_Company} />
              </Col>

            </Row>
          </div>

          <div className="mt-5 pt-4">
            <hr className="mt-5"></hr>
          </div>

          <div className="row flex-column-reverse flex-sm-row">
            <Col sm='6' className='mb-4'></Col>
            <Col sm='3' className='mb-4'>
              <Button href="/cars" className='text-center btn-style background-A0A8B3 color-FFFFFF d-block p-2 w-100 f-w-700 f-s-16px' color='white' outline >
                إلغاء
              </Button>
            </Col>
            <Col sm='3' className='mb-4'>
              <Button  className={(chasis_numValidation & typeValidation & typeValidation_ar & brandValidation & brandValidation_ar & modalValidation & modalValidation_ar & yearValidation & customer_nameValidation & customer_idValidation & contract_numberValidation & sejel_numberValidation & priceValidation & price_lateValidation & customer_nameValidation_ar & companyValidation & colorValidation & colorValidation_ar & sejel_dateValidation) ? 'text-center btn-style color-FFFFFF d-block p-2 w-100 f-w-700 f-s-16px background-A6223D' : 'text-center btn-style color-FFFFFF d-block p-2 w-100 f-w-700 f-s-16px background-FFCCD7'} color='white' outline type='submit'>
                حفظ
              </Button>
            </Col>
          </div>
        </Form>

        {/* end  car details component */}

      </div>

    </div>
  )
}

export default AddCar
// need type id for النوع  like model_id in dropdown list
// رقم الهيكل مش مرتب دايما 
// needs validation for arabic letters and arabic numbers

// tommorow 
// on change set all inputs or when validated set add input to chasisnum like p_c_n_a and put all variables to request body
