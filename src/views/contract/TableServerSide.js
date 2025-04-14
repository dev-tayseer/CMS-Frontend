// ** React Imports
import { Fragment, useState, useEffect, memo, useContext,useCallback, useImperativeHandle,useRef } from 'react'
import { LoaderContext, LoaderProvider } from "../../utility/context/LoaderContext";

// ** Table Columns
import { columns } from './data'

// ** Store & Actions
import { getData } from './store'
import Modal from 'react-bootstrap/Modal'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, ChevronRight, ChevronLeft } from 'react-feather'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
// ** Utils
import { selectThemeColors } from '@utils'
import PickerRange from "../components/PickerRange"
// import PickerRange from "../components/datePicker"

import EmptyTable from "../components/EmptyTable"
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import axios from 'axios'
import themeConfig from "@configs/themeConfig";
import FormComponentTimeExtension from '../components/contract/FormComponentTimeExtension'
import BillFormComponent from '../components/contract/BillFormComponent'

import Refresh from "@src/assets/images/icons/refresh.png";

import { useNavigate } from "react-router-dom"


const domain_url = themeConfig.url

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Input, Button, Label, Row, Col } from 'reactstrap'
import { Car, Settings, Download, Share, CloseIcon, NextIcon, PreviousIcon } from '../components/icons/all_icons'
import { Navigate } from 'react-router-dom';

// let state
// state.dataTables = null
const DataTableServerSide = ({ showUploadCertificate, setTypeAlert, setHeadAlert, setTitleAlert, setShowAlert, getStart, getDraw, getLength, getCompanyId, getStatuesId, getExcution_type, getTypeId, getFrom_date, getTo_date, setContractCount, getDepartmentId, setallPermissions }) => {
  // ** Store Vars


  

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const store = useSelector(state => state.dataTables)
  console.log(store, "origin")
  console.log(store.total, "origin")

  const { loader_show, setLoaderShow } = useContext(LoaderProvider);

  // console.log(state.dataTables)
  // ** States

  const [drawData, setDrawData] = useState(1)
  const [query_companies, setQuery_Companies] = useState('')
  const [selectedDBVal_companies, setSelectedDBVal_Companies] = useState('')
  const [selectedDBVal_departments, setSelectedDBVal_departments] = useState('')

  const [query_type, setQuery_types] = useState('')
  const [excution_type, setQuery_excution_type] = useState('')


  const [selectedDBVal_type, setSelectedDBVal_type] = useState('')
  const [selectedDBVal_excution_type, setSelectedDBVal_excution_type] = useState('')


  const [query_statues, setQuery_statues] = useState('')
  const [selectedDBVal_statues, setSelectedDBVal_statues] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  const [companySearchValue, setCompanySearchValue] = useState('')


  const [picker, setPicker] = useState(new Date())
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')

  const [, setPending] = useState(true)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showTimeExtension, setShowTimeExtension] = useState(false)
  const [showBill, setShowBill] = useState(false)

  const [selectedRowId, setSelectedRowId] = useState(null)
  const [companySearchText, setCompanySearchText] = useState("")

  const [can_edit_contract, setcan_edit_contract] = useState(true)
  const [can_view_contract, setcan_view_contract] = useState(true)
  const [can_delete_contract, setcan_delete_contract] = useState(true)
  const [can_extend_contract, setcan_extend_contract] = useState(true)







  // send data to parent component to rerender datatable 
  const sendDataToParentComponent = (currentPage, drawData, rowsPerPage, companyId, statuesId, excution_typeId, typeId, from_date, to_date, departmentId) => {
    getStart(currentPage)
    getDraw(drawData)
    getLength(rowsPerPage)
    getCompanyId(companyId)
    getStatuesId(statuesId)
    getExcution_type(excution_typeId)
    getTypeId(typeId)
    getFrom_date(from_date)
    getTo_date(to_date)
    getDepartmentId(departmentId)
  }

  function get_translation_name(reponse) {

    if (reponse.translations.length > 1) {
      return reponse.translations[1].name
    } else if (reponse.translations.length === 1) {
      return reponse.translations[0].name
    } else {
      return ""
    }
  }

  function reload_table() {
    console.log("reload..")
    setLoaderShow(true)
    dispatch(
      getData({
        
        
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        'search[value]': searchValue,
        companyId: selectedDBVal_companies,
        statuesId: selectedDBVal_statues,
        excution_type: selectedDBVal_excution_type,
        typeId: selectedDBVal_type,
        from_date: date1,
        to_date: date2,
        setLoaderShow: setLoaderShow,
        departmentId: selectedDBVal_departments,
      })
    )
    setLoaderShow(false)
  }

  const loadOptionsDB_companies = () => {
    const token = localStorage.getItem("token")
    console.log("get company ....")
    // console.log(token)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }

    console.log(query_companies, "query")
    return axios.get(`${domain_url}/Contract/dropdowndata?search_key=${query_companies}`, config, { query_companies }).then(res => {

      const reponse = res.data.company
      const data = []

      for (let i = 0; i < reponse.length; i++) {
        console.log(reponse[i].Company_Name, "--*-*-*")
        data.push({
          id: reponse[i].id,
          value: reponse[i].Company_Name,
          label: reponse[i].Company_Name
        })
      }
      console.log(data, "66...............")
      return data
    })

  }
  const loadOptionsDB_departments = () => {
    const token = localStorage.getItem("token")
    console.log("get company ....")
    // console.log(token)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }

    return axios.get(`${domain_url}/Contract/dropdowndata`, config, { query_companies }).then(res => {
      const reponse = res.data.Departments
      const data = []

      for (let i = 0; i < reponse.length; i++) {
        console.log(reponse[i].Company_Name, "--*-*-*")
        data.push({
          id: reponse[i].id,
          value: reponse[i].Dep_Name,
          label: reponse[i].Dep_Name
        })
      }
      console.log(data, "66...............")
      return data
    })

  }


  const loadOptionsDB_type2 = [
    { id: '', value: 'العقود الأخرى', label: 'العقود الأخرى' },
    { id: '1', value: 'عقود الإيجار', label: 'عقود الإيجار' },
    { id: '1', value: 'عقود المزاد', label: 'عقود المزاد' },
  ]

  const loadOptionsDB_types = [
    { value: '', label: 'الكل' },
    {
      value: "Private Transport",
      label: "نقل خاص"
    },
    {
      value: "Private",
      label: "خصوصي"
    },
    {
      value: "Public Transport",
      label: "نقل عام"
    },
    {
      value: "Private Minibus",
      label: "حافلة صغيرة خاصة"
    },
    {
      value: "Public Minibus",
      label: "حافلة صغيرة عامة"
    }
  ]

  const loadOptionsDB_type = async () => {
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    if (false) {
      return type_of_AuctionData
    } else {
      const data = await axios.get(`${domain_url}/Country/CountryView`, config).then(res => {
        const company_activity_list2 = []
        company_activity_list2.push(
          { id: '', value: 'العقود الأخرى', label: 'العقود الأخرى' },
        )
        company_activity_list2.push(
          { id: '1', value: 'عقود الإيجار', label: 'عقود الإيجار' },

        )
        company_activity_list2.push(
          { id: '2', value: 'عقود المزاد', label: 'عقود المزاد' },

        )

        company_activity_list2.push(
          { id: '3', value: 'عقود NDA', label: 'عقود NDA' },

        )



        // })
        return company_activity_list2


      })
      return data
    }
  }


  const loadOptionsDB_statues = () => {
    const token = localStorage.getItem("token")
    console.log("get company ....")
    // console.log(token)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }

    return axios.get(`${domain_url}/Contract/dropdowndata`, config).then(res => {
      const reponse = res.data.status
      const data = []

      for (let i = 0; i < reponse.length; i++) {
        // console.log(reponse[i].Status_of_cont, "--*-*-*")
        data.push({
          id: reponse[i].id,
          value: reponse[i].Status_of_cont,
          label: reponse[i].Status_of_cont
        })
      }
      console.log(data, "66...............")
      return data
    })

  }
  // const loadOptionsDB_statues = () => {

  //   const token = localStorage.getItem("token")
  //   console.log("get company ....")
  //   // console.log(token)
  //   const config = {
  //     headers: {
  //               Authorization: `Bearer ${token}`,
  //               }
  //   }

  //   return axios.get(`${domain_url}/Contract/dropdowndata`, config, ).then(res => {
  //     console.log(res.data.status,"***** depa")
  //     const reponse = res.data.status
  //     const data = []

  //     for (let i = 0; i < reponse.length; i++) {
  //       console.log(reponse[i].Status_of_cont,"--*-*-*")
  //       data.push({
  //         id:reponse[i].id,
  //         value:reponse[i].Status_of_cont,
  //         label:reponse[i].Status_of_cont
  //       })
  //     }
  //     console.log(data,"66...............")
  //     return data
  //   })
  // }


  const handleDBInputChange_companies = newValue => {
    console.log("finally", newValue)
    setCompanySearchText(newValue)
    setQuery_Companies(newValue)

    // new 

    console.log(newValue === "", "check", searchValue, "ss")
    // setCurrentPage(currentPage+1)
    // if(newValue !== ""){
    //   console.log("dispatch here ",companySearchValue)
    //   setCompanySearchValue(newValue)
    //   // setSelectedDBVal_Companies(searchValue)

    //   dispatch(
    //     getData({
      // 
      // 
    //       start: currentPage,
    //       draw: drawData,
    //       length: rowsPerPage,
    //       'search[value]': newValue,
    //       companyId:"",
    //       statuesId:selectedDBVal_statues,
    //       excution_type:selectedDBVal_excution_type,
    //       typeId:selectedDBVal_type,
    //       from_date:date1,
    //       to_date:date2,
    //       setLoaderShow:setLoaderShow

    //     })
    //   ) 
    // } else {
    //   setCurrentPage(1)
    //   console.log("handle new page")
    //   // setSelectedDBVal_Companies(searchValue)
    //   dispatch(
    //     getData({
      // 
      // 
    //       start: currentPage,
    //       draw: drawData,
    //       length: rowsPerPage,
    //       'search[value]': companySearchValue,
    //       companyId:"",
    //       statuesId:selectedDBVal_statues,
    //       excution_type:selectedDBVal_excution_type,
    //       typeId:selectedDBVal_type,
    //       from_date:date1,
    //       to_date:date2,
    //       setLoaderShow:setLoaderShow

    //     })
    //   ) 

    // }




    // end new 
    // console.log(newValue, "Commmmm")
  }

  const handleDBInputChange_type = newValue => {
    setQuery_types(newValue)
  }

  const handleDBInputChange_excution_type = newValue => {
    setQuery_excution_type(newValue)
  }

  const handleDBInputChange_statues = newValue => {
    setQuery_statues(newValue)
  }

  // handle selection
  const handleDBChange_companies = (value) => {
    console.log(value.id, "++++ company")
    sendDataToParentComponent(currentPage, drawData, rowsPerPage, value.id, selectedDBVal_statues, selectedDBVal_excution_type, selectedDBVal_type, date1, date2, selectedDBVal_departments)
    setSelectedDBVal_Companies(value.id)
    console.log("companies", value.id)
    console.log("companies", selectedDBVal_companies)
    setCurrentPage(1)
    dispatch(
      getData({
        
        
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        'search[value]': searchValue,
        companyId: value.id,
        statuesId: selectedDBVal_statues,
        excution_type: selectedDBVal_excution_type,
        typeId: selectedDBVal_type,
        from_date: date1,
        to_date: date2,
        setLoaderShow: setLoaderShow,
        departmentId: selectedDBVal_departments,
      })
    )
  }
  const handleDBChange_departments = (value) => {
    console.log(value.id, "++++ company")
    sendDataToParentComponent(currentPage, drawData, rowsPerPage, selectedDBVal_companies, selectedDBVal_statues, selectedDBVal_excution_type, selectedDBVal_type, date1, date2, value.id)
    setSelectedDBVal_departments(value.id)

    setCurrentPage(1)
    dispatch(
      getData({
        
        
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        'search[value]': searchValue,
        companyId: selectedDBVal_companies,
        statuesId: selectedDBVal_statues,
        excution_type: selectedDBVal_excution_type,
        typeId: selectedDBVal_type,
        from_date: date1,
        to_date: date2,
        setLoaderShow: setLoaderShow,
        departmentId: value.id,


      })
    )
  }



  const handleDBChange_statues = value => {
    console.log("stat")
    setCurrentPage(1)
    setSelectedDBVal_statues(value.id)
    sendDataToParentComponent(currentPage, drawData, rowsPerPage, selectedDBVal_companies, value.id, selectedDBVal_excution_type, selectedDBVal_type, date1, date2, selectedDBVal_departments)


    dispatch(
      getData({
        
        
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        'search[value]': searchValue,
        companyId: selectedDBVal_companies,
        statuesId: value.id,
        excution_type: excution_type,
        typeId: selectedDBVal_type,
        from_date: date1,
        to_date: date2,
        setLoaderShow: setLoaderShow,
        departmentId: selectedDBVal_departments,

      })
    )



  }

  const handleDBChange_type = value => {

    console.log(value.id,"valueidvalueidvalueidvalueidvalueidvalueid")

    if (value.id == "1") {
      console.log("soooooon1")
      navigate("/ContractRental")
    } else if (value.id == "2") {
      console.log("soooooon2")
      navigate("/ContractAuction")
    }else if (value.id == "3") {
      navigate("/ContractNDA")
    } else {
      navigate("/contracts")
    }




  }


  const handleDBChange_excution_state = value => {
    console.log(value, "123")
    const value_to_send = value.value
    let excution_type = ""
    if (value_to_send === "مطلوب إرفاق محضر التنفيذ") {
      excution_type = "0"
    } else if (value_to_send === "تم إرفاق المستند") {
      excution_type = "1"
    } else {
      excution_type = "2"
    }
    setSelectedDBVal_excution_type(excution_type)

    sendDataToParentComponent(currentPage, drawData, rowsPerPage, selectedDBVal_companies, selectedDBVal_statues, excution_type, selectedDBVal_type, date1, date2, selectedDBVal_departments)


    setCurrentPage(1)
    dispatch(
      getData({
        
        
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        'search[value]': searchValue,
        companyId: selectedDBVal_companies,
        statuesId: selectedDBVal_statues,
        excution_type: excution_type,
        typeId: selectedDBVal_type,
        from_date: date1,
        to_date: date2,
        setLoaderShow: setLoaderShow,
        departmentId: selectedDBVal_departments,
      })
    )
  }

  const handleDBChange_types = value => {
    // console.log(value)
    console.log("handleDBChange_types", value.value)
    setSelectedDBVal_type(value.value)
    setCurrentPage(1)
    sendDataToParentComponent(currentPage, drawData, rowsPerPage, selectedDBVal_companies, selectedDBVal_statues, selectedDBVal_excution_type, value.value, date1, date2, selectedDBVal_departments)

    dispatch(
      getData({
        
        
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        'search[value]': searchValue,
        companyId: selectedDBVal_companies,
        statuesId: selectedDBVal_statues,
        excution_type: selectedDBVal_excution_type,
        typeId: value.value,
        from_date: date1,
        to_date: date2,
        setLoaderShow: setLoaderShow,
        departmentId: selectedDBVal_departments,

      })
    )
  }

  let allPermissions_table = []

  function requestPermissions() {
    console.log(requestPermissions, "ppppppppp")
    var token = localStorage.getItem("token")


    var config = {
      method: 'get',
      url: `${domain_url}/users/userinfo`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response.data[0]['permetion_list'], "pppp")
        allPermissions_table = response.data[0]['permetion_list']
        console.log(allPermissions_table, "allPermissions_table")
        setallPermissions(response.data[0]['permetion_list'])
        setcan_edit_contract(allPermissions_table.includes(4))
        setcan_view_contract(allPermissions_table.includes(3))

        setcan_delete_contract(allPermissions_table.includes(7))

        setcan_extend_contract(allPermissions_table.includes(5))

        // setisDataLoaded(true)
        console.log(response.data[0]['permetion_list'], "888888888888")
        // allPermissions = response.data[0]['permetion_list']
        // console.log(allPermissions,"allPermissions")
      })
      .catch(function (error) {
        console.log(error);
        allPermissions_table = []
        setallPermissions([])
        // setisDataLoaded(true)
        // allPermissions = []
      });
  }

  // ** Get data on mount
  useEffect(() => {


    sendDataToParentComponent(1, drawData, rowsPerPage, selectedDBVal_companies, selectedDBVal_statues, selectedDBVal_excution_type, selectedDBVal_type, date1, date2, selectedDBVal_departments)

    dispatch(
      getData({
        
        
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        'search[value]': searchValue,
        companyId: selectedDBVal_companies,
        statuesId: selectedDBVal_statues,
        excution_type: selectedDBVal_excution_type,
        typeId: selectedDBVal_type,
        from_date: date1,
        to_date: date2,
        setLoaderShow: setLoaderShow,
        departmentId: selectedDBVal_departments,
      })
    )

    requestPermissions()

  }, [dispatch])

  const setPickerHandler = e => {
    // setCurrentPage(1)
    // let datetime_1 = ''
    // if (e.i1 === '' | e.i1 === null) {
    //   datetime_1 = ''
    // } else {
    //   datetime_1 = (Date.parse(e.i1) / 1000).toString()
    // }

    // let datetime_2 = ''
    // if (e.i2 === '' | e.i2 === null) {
    //   datetime_2 = ''
    // } else {
    //   datetime_2 = (Date.parse(e.i2) / 1000).toString()
    // }
    let datetime_1 = e.i1
    let datetime_2 = e.i2

    let from_date = datetime_1
    try {
      console.log(from_date, "from_date ** ")
      let month = from_date.split("/")[0]
      let day = from_date.split("/")[1]
      let year = from_date.split("/")[2]
      let final_from_date = year.toString() + "-" + month.toString() + "-" + day.toString()
      datetime_1 = final_from_date
    }
    catch (e) {
      console.log(e)
    }

    let to_date = datetime_2

    try {
      console.log(to_date, "to_date")
      let month = to_date.split("/")[0]
      let day = to_date.split("/")[1]
      let year = to_date.split("/")[2]
      let final_to_date = year.toString() + "-" + month.toString() + "-" + day.toString()
      datetime_2 = final_to_date
    } catch (e) {

    }

    // datetime_1 = getFrom_date(datetime_1)
    // datetime_2 = getTo_date(datetime_2)

    console.log(datetime_1, "datetime", datetime_2)

    sendDataToParentComponent(currentPage, drawData, rowsPerPage, selectedDBVal_companies, selectedDBVal_statues, selectedDBVal_excution_type, selectedDBVal_type, datetime_1, datetime_2, selectedDBVal_departments)

    console.log(datetime_1, "date")
    let selectedDBVal_companies_obj = ''
    try {
      selectedDBVal_companies_obj = selectedDBVal_companies.toString()
    } catch (e) {
      selectedDBVal_companies_obj = '0'
    }
    dispatch(
      getData({
        
        
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        'search[value]': searchValue,
        companyId: selectedDBVal_companies,
        statuesId: selectedDBVal_statues,
        excution_type: selectedDBVal_excution_type,
        typeId: selectedDBVal_type,
        from_date: datetime_1,
        to_date: datetime_2,
        setLoaderShow: setLoaderShow,
        departmentId: selectedDBVal_departments,
      })
    )


    console.log(datetime_1)
    setDate1(datetime_1)
    setDate2(datetime_2)
    setPicker(e)
  }

  // ** Function to handle filter
  const handleFilter = e => {
    setSearchValue(e.target.value)

    dispatch(
      getData({
        
        
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        'search[value]': e.target.value,
        companyId: selectedDBVal_companies,
        statuesId: selectedDBVal_statues,
        excution_type: selectedDBVal_excution_type,
        typeId: selectedDBVal_type,
        from_date: date1,
        to_date: date2,
        setLoaderShow: setLoaderShow,
        departmentId: selectedDBVal_departments,

      })
    )
  }

  // ** Function to handle Pagination and get data
  const handlePagination = page => {
    console.log(page.selected, "111")
    console.log("paginating ...")
    dispatch(
      getData({
        
        
        start: (page.selected + 1),
        draw: (page.selected + 1),
        length: rowsPerPage,
        'search[value]': searchValue,
        companyId: selectedDBVal_companies,
        statuesId: selectedDBVal_statues,
        excution_type: selectedDBVal_excution_type,
        typeId: selectedDBVal_type,
        from_date: date1,
        to_date: date2,
        setLoaderShow: setLoaderShow,
        departmentId: selectedDBVal_departments,

      })
    )
    setCurrentPage((page.selected + 1))
    setDrawData(page.selected + 1)
  }

  // ** Function to handle per page
  const handlePerPage = e => {
    dispatch(
      getData({
        
        
        start: 1,
        draw: drawData,
        length: parseInt(e.target.value),
        'search[value]': searchValue,
        companyId: selectedDBVal_companies,
        statuesId: selectedDBVal_statues,
        excution_type: selectedDBVal_excution_type,
        typeId: selectedDBVal_type,
        from_date: date1,
        to_date: date2,
        setLoaderShow: setLoaderShow,
        departmentId: selectedDBVal_departments,
      })
    )
    setCurrentPage(1)
    setRowsPerPage(parseInt(e.target.value))
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    setContractCount(store.total)
    const count = Math.ceil(store.total / rowsPerPage)
    return (
      <Row className='mx-0 mt-4 mb-50'>
        <Col className='col-12 p-0 col-lg-6'>
          <div className='d-flex align-items-center label-select-datatable'>
            {/* <Label for='sort-select' className='font-select-datatable'>إظهار</Label> */}
            <Input
              className='dataTable-select select-no-border font-select-datatable'
              type='select'
              id='sort-select'
              value={rowsPerPage}
              onChange={e => handlePerPage(e)}
            >
              <option value={10}>
                10
                صفوف من أصل
                {Math.ceil(store.total)}

              </option>
              {/* <option value={10}>10 صفوف من أصل {Math.ceil(store.total)}</option> */}
              <option value={25}>25 صفوف من أصل {Math.ceil(store.total)}</option>
              <option value={50}>50 صفوف من أصل {Math.ceil(store.total)}</option>
              <option value={75}>75 صفوف من أصل {Math.ceil(store.total)}</option>
              <option value={100}>100 صفوف من أصل {Math.ceil(store.total)}</option>
            </Input>
            <Label for='sort-select' className='font-select-datatable'></Label>
          </div>
        </Col>

        <Col className='d-flex justify-content-md-center d-md-block col-12 col-lg-6 col'>
          <ReactPaginate
            previousLabel={<div className="d-inline-flex mt-2"><NextIcon size={20} /></div>}
            nextLabel={<div className="d-inline-flex mt-2" > <PreviousIcon size={20} /></div>}
            breakLabel='...'
            pageCount={Math.ceil(count) || 1}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            activeClassName='active'
            forcePage={currentPage !== 0 ? currentPage - 1 : 0}
            onPageChange={page => handlePagination(page)}
            pageClassName='page-item text-center justify-content-center'
            breakClassName='page-item text-center justify-content-center'
            nextLinkClassName='page-item2 text-center justify-content-center'
            pageLinkClassName='page-item2 text-center justify-content-center'
            breakLinkClassName='page-item2 justify-content-center text-center'
            previousLinkClassName='page-item2 text-center justify-content-center'
            nextClassName=' page-next'
            previousClassName=' page-prev'
            containerClassName={
              'pagination react-paginate newPaging separated-pagination pagination-sm justify-content-end pe-1 mt-1 container-fluid'
            }
          // paging
          />
        </Col>
      </Row>
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      'search[value]': searchValue
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })
    console.log(store.data, "store... 111 ")
    setContractCount(store.total)  //new

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      console.log(store.allData, "store...")
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleCloseConfirmDelete = () => setShowConfirmDelete(false)
  const handleConfirmDelete = () => {
    console.log('deleteRowId: ', selectedRowId)
    const token = localStorage.getItem("token")
    setShowConfirmDelete(false)
    // start
    var data = new FormData();

    var config = {
      method: 'delete',
      url: `${domain_url}/Contract/AddContracts/?id=${selectedRowId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response, "response ..")
        console.log("eyooooooooooooooooo")

        if (response.data[0].succse == "1") {
          setTypeAlert("Success")
          setTitleAlert("تم أرشفة العقد  بنجاح.")
          setHeadAlert("")
          setShowAlert(true)
          reload_table()
        } else {
          setTypeAlert("Fail")
          setTitleAlert("لم يتم أرشفة العقد بشكل صحيح.")
          setHeadAlert("حدث خطأ")
          setShowAlert(true)
          reload_table()

        }

      })
      .catch(function (error) {
        console.log(error);
        console.log(response, "**-*-*")
        setTypeAlert("Fail")
        setTitleAlert("لم يتم أرشفة العقد بشكل صحيح.")
        setHeadAlert("حدث خطأ")
        setShowAlert(true)
        console.log("Check1")
        reload_table()
      });

  }

  const deleteRowId = (id) => {
    setSelectedRowId(id)
    setShowConfirmDelete(true)

  }


  const handleCloseTimeExtension = () => setShowTimeExtension(false)
  const handleCloseBill = () => setShowBill(false)

  // const handleTimeExtension = () => {
  //   console.log('deleteRowId: ', selectedRowId)
  //   const token = localStorage.getItem("token")
  //   setShowTimeExtension(false)
  //   // axios({
  //   //   method: "post",
  //   //   url: `${domain_url}/delete-car`,
  //   //   data: {
  //   //     car_id: selectedRowId
  //   //   },
  //   //   headers: { 
  //   //     Accept: 'application/json',
  //   //     Authorization: `Bearer ${token}`,
  //   //     "app-lng": 'en' 
  //   //   }
  //   // })
  //   // .then(function (response) {
  //   //   //handle success
  //   //   console.log("Check")
  //   //   console.log(response.data)

  //   //   if (response.data.status !== 200) {
  //   //     setTypeAlert("Fail")
  //   //     setTitleAlert("لم يتم مسح المركبة بشكل صحيح.")
  //   //     setHeadAlert("حدث خطأ")
  //   //     setShowAlert(true)
  //   //     console.log("Check1")
  //   //   } else {
  //   //     setTypeAlert("Success")
  //   //     setTitleAlert("تم مسح المركبة بنجاح.")
  //   //     setHeadAlert("")
  //   //     setShowAlert(true)
  //   //     console.log("Check2")
  //   //   }

  //   //   reload_table()
  //   // })
  //   // .catch(function (response) {
  //   //   //handle error
  //   //   console.log(response)
  //   //   setTypeAlert("Fail")
  //   //     setTitleAlert("لم يتم مسح المركبة بشكل صحيح.")
  //   //     setHeadAlert("حدث خطأ")
  //   //     setShowAlert(true)
  //   //   reload_table()
  //   // })

  // }


  function handlerefresh() {
    location.reload();
  }

  const TimeExtensionData = (id) => {
    console.log("extension ... ")
    setSelectedRowId(id)
    setShowTimeExtension(true)

  }


  const BillData = (id) => {
    console.log("extension ... ")
    setSelectedRowId(id)
    setShowBill(true)

  }

  const viewHandler = (id) => {
    console.log('viewHandler: ', id)

  }
  function exportExcelAll() {
    setLoaderShow(true)
    const token = localStorage.getItem("token")
    var config = {
      method: 'get',
      responseType: 'blob',
      url: `${domain_url}/Contract/excel?date_from=${date1}&date_to=${date2}&compid=${selectedDBVal_companies}&depid=${selectedDBVal_departments}&status_id=${selectedDBVal_statues}`,
      headers: {
        'Authorization': `Bearer ${token}`,

      }
    };

    axios(config)
      .then(function (response) {
        console.log(response, "excell")
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `ContractSample.xlsx`);
        document.body.appendChild(link);
        link.click();
        setLoaderShow(false)

      })
      .catch(function (error) {
        console.log(error);
      });


  }

  const ConfirmDeleteItem = () => {

    return (<Modal aria-labelledby="contained-modal-title-vcenter" centered show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
      <Modal.Header className='background-F7FAF7'>

        <div className="col-6">
          <p className="modal-text-main2 pt-3">
            أرشفة العقد
          </p>
        </div>
        <div className="col-6 text-end">
          <a onClick={handleCloseConfirmDelete}>
            <CloseIcon width={24} height={24} color='#4D5761' />
          </a>
        </div>

      </Modal.Header>

      <Modal.Body>

        <div className="row">
          <p className="confirm-logout-text pt-4 pb-4 mb-4">
            هل انت متأكد من أرشفة العقد؟
          </p>

        </div>
        {/* <hr/> */}

      </Modal.Body>
      <Modal.Footer>
        <div className="row buttons-row pt-3 pb-3">
          <div className="col-6  ">
            <a className="text-center block btn-yellow text-center  p-3 w-100" onClick={handleConfirmDelete}>
              تأكيد
            </a>
          </div>
          <div className="col-6  ">
            <a className="text-center block btn-cancel text-center  p-3 w-100" onClick={handleCloseConfirmDelete}>
              إلغاء
            </a>
          </div>

        </div>
      </Modal.Footer>

    </Modal>
    )
  }


  const TimeExtension = () => {

    return (<Modal aria-labelledby="contained-modal-title-vcenter" className='TimeExtension' centered show={showTimeExtension} onHide={handleCloseTimeExtension}>
      <Modal.Header className='background-F7FAF7'>

        <div className="col-6">
          <p className="modal-text-main2 pt-3">
            إمداد فترة العقد
          </p>
        </div>
        <div className="col-6 text-end">
          <a onClick={handleCloseTimeExtension}>
            <CloseIcon width={24} height={24} color='#4D5761' />
          </a>
        </div>

      </Modal.Header>

      <Modal.Body>


        <FormComponentTimeExtension handleCloseTimeExtension={handleCloseTimeExtension} selectedRowId={selectedRowId} setTypeAlert={setTypeAlert} setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert} setShowAlert={setShowAlert} />



      </Modal.Body>
      {/* <Modal.Footer>
          <div className="row buttons-row pt-3 pb-3">
                  <div className="col-6  ">
                          <a className="text-center block btn-yellow text-center  p-3 w-100"  onClick={handleTimeExtension}>
                              تأكيد   
                          </a>
                      </div>
                      <div className="col-6  ">
                          <a className="text-center block btn-cancel text-center  p-3 w-100"  onClick={handleCloseTimeExtension}>
                          إلغاء   
                          </a>
                      </div>

                  </div>
          </Modal.Footer> */}

    </Modal>
    )
  }

  const BillDataModal = () => {

    return (<Modal aria-labelledby="contained-modal-title-vcenter" className='TimeExtension' centered show={showBill} onHide={handleCloseBill}>
      <Modal.Header className='background-F7FAF7'>

        <div className="col-6">
          <p className="modal-text-main2 pt-3">
            الفاتورة
          </p>
        </div>
        <div className="col-6 text-end">
          <a onClick={handleCloseBill}>
            <CloseIcon width={24} height={24} color='#4D5761' />
          </a>
        </div>

      </Modal.Header>

      <Modal.Body>

        <BillFormComponent handleCloseTimeExtension={handleCloseBill} selectedRowId={selectedRowId} setTypeAlert={setTypeAlert} setHeadAlert={setHeadAlert} setTitleAlert={setTitleAlert} setShowAlert={setShowAlert} />

      </Modal.Body>
      {/* <Modal.Footer>
          <div className="row buttons-row pt-3 pb-3">
                  <div className="col-6  ">
                          <a className="text-center block btn-yellow text-center  p-3 w-100"  onClick={handleTimeExtension}>
                              تأكيد   
                          </a>
                      </div>
                      <div className="col-6  ">
                          <a className="text-center block btn-cancel text-center  p-3 w-100"  onClick={handleCloseTimeExtension}>
                          إلغاء   
                          </a>
                      </div>

                  </div>
          </Modal.Footer> */}

    </Modal>
    )
  }


  const customFilter = (option, searchText) => {
    if (
      option.data.label.toLowerCase().includes(searchText.toLowerCase()) ||
      option.data.value.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="container-fluid p-3">
      <ConfirmDeleteItem />
      <TimeExtension />
      < BillDataModal />
      <Row className=' mt-1  table-header-bordered ps-3 p-md-0 '>
        <Col className='col-xl-2 mb-3  col-12 row  pt-1  p-xl-0 ps-xl-3 ps-md-0 ps-3 mx-0 '>
          <Input
            className=' input-filter-icon-search form-control mt-md-2 ps-5 ms-md-3'
            type='text'
            id='search-input'
            placeholder="بحث"
            value={searchValue}
            onChange={handleFilter}
          />
        </Col>
        <div className='col-xl-10 col-12 '>
          <Col className=' d-md-flex p-0 justify-content-xl-end '>
            <AsyncSelect
              defaultOptions
              isClearable={false}
              name='db-react-select'
              className='react-select  react-select-contract ps-md-1 select-full  pt-md-3 pe-md-2  pt-2 pt-md-1  '
              classNamePrefix='select'
              placeholder='نوع العقد'
              onChange={handleDBChange_type}
              isSearchable={false}


              theme={selectThemeColors}
              loadOptions={loadOptionsDB_type}
            // onInputChange={handleDBInputChange_statues}
            />
            <AsyncSelect
              defaultOptions
              isClearable={false}
              name='db-react-select'
              className='react-select react-select-contract select-full  p-0  pt-md-3 pt-2 pt-md-1  '
              classNamePrefix='select'
              placeholder=' الشركة'
              onChange={handleDBChange_companies}


              theme={selectThemeColors}
              loadOptions={loadOptionsDB_companies}
              // isSearchable={false}
              onInputChange={handleDBInputChange_companies}
            />

            <AsyncSelect
              defaultOptions
              isClearable={false}
              name='db-react-select'
              className='react-select react-select-contract select-full ps-md-1 p-0  pt-md-3 pt-2 pt-md-1  '
              classNamePrefix='select'
              placeholder=' الإدارة'
              onChange={handleDBChange_departments}


              theme={selectThemeColors}
              loadOptions={loadOptionsDB_departments}
              isSearchable={false}
            // onInputChange={handleDBInputChange_department}
            />


            <AsyncSelect
              defaultOptions
              isClearable={false}
              name='db-react-select'
              className='react-select react-select-contract ps-md-1 select-full  pt-md-3  pt-2 pt-md-1  '
              classNamePrefix='select'
              placeholder='حالة العقد'
              onChange={handleDBChange_statues}
              isSearchable={false}


              theme={selectThemeColors}
              loadOptions={loadOptionsDB_statues}
            // onInputChange={handleDBInputChange_statues}
            />


            {/* <Select
              // defaultValue={loadOptionsDB_statues[0]}
              options={loadOptionsDB_statues}
              name='db-react-select'
              className='react-select react-select-contract ps-md-1 p-0 pt-md-3 pt-1  select-full'
              classNamePrefix='select-gray'
              placeholder='حالة العقد'
              // onChange={handleDBChange_statues}
              theme={selectThemeColors}
              // onInputChange={handleDBInputChange_statues}
            />
             */}



            <PickerRange className=' ps-md-1 ps-0 pe-md-1 select-full pe-0 pt-md-3 pt-2 pt-md-1   react-select-contract'
              dir="ltr"
              functionHandler={setPickerHandler}
              picker={picker} />

            <div className='  excel-container  text-md-start p-xl-0 ps-md-2 pt-md-2 mt-xl-2 react-select-contract' >
              <Button.Ripple className="button-transparent text-center px-4  button-excel ms-md-2 text-end " onClick={() => exportExcelAll()} >
                <Share width={19} height={19} color='#4788C6' />

                <span className='align-middle ms-3 ' > تحميل</span>
              </Button.Ripple>
            </div>


            <div>
              <img src={Refresh} width={24} height={24} className='mt-4  ms-1 refresh' onClick={handlerefresh} />
            </div>


          </Col>
        </div>


      </Row>
      <Row className='  mb-50  ps-3 p-md-0'>
        <div className='react-dataTable'>
          <DataTable noHeader
            pagination
            paginationServer
            className='react-dataTable'
            noDataComponent={<EmptyTable obj="contract" />}
            columns={columns(deleteRowId, viewHandler, showUploadCertificate, TimeExtensionData, can_edit_contract, can_view_contract, can_delete_contract, can_extend_contract, BillData, setLoaderShow, setTypeAlert, setHeadAlert, setTitleAlert, setShowAlert)}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            data={dataToRender()}
          />
        </div>
      </Row>
    </div>
  )
}

export default memo(DataTableServerSide)
