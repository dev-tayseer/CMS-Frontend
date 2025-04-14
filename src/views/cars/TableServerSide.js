// ** React Imports
import { Fragment, useState, useEffect, memo, useContext ,useImperativeHandle} from 'react'
import {LoaderContext, LoaderProvider} from "../../utility/context/LoaderContext";

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

const domain_url = themeConfig.url

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Input, Label, Row, Col } from 'reactstrap'
import { Car, Settings, Download, Share, CloseIcon, DocIcon, Loader2 } from '../components/icons/all_icons'

// let state
// state.dataTables = null
const DataTableServerSide = ({showUploadCertificate, setTypeAlert, setHeadAlert, setTitleAlert, setShowAlert , getStart , getDraw , getLength , getCompanyId , getStatuesId , getExcution_type , getTypeId , getFrom_date ,  getTo_date }) => {
  // ** Store Vars




  const dispatch = useDispatch()
  const store = useSelector(state => state.dataTables)
  const {loader_show, setLoaderShow} = useContext(LoaderProvider);

  // console.log(state.dataTables)
  // ** States
  
  const [drawData, setDrawData] = useState(1)
  const [query_companies, setQuery_Companies] = useState('')
  const [selectedDBVal_companies, setSelectedDBVal_Companies] = useState('')
  const [query_type, setQuery_types] = useState('')
  const [excution_type, setQuery_excution_type] = useState('')

  
  const [selectedDBVal_type, setSelectedDBVal_type] = useState('')
  const [selectedDBVal_excution_type, setSelectedDBVal_excution_type] = useState('')

  
  const [query_statues, setQuery_statues] = useState('')
  const [selectedDBVal_statues, setSelectedDBVal_statues] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [searchValue, setSearchValue] = useState('')
  const [companySearchValue, setCompanySearchValue] = useState('')

  
  const [picker, setPicker] = useState(new Date())
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')

  const [, setPending] = useState(true)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [companySearchText, setCompanySearchText] = useState("")





  // send data to parent component to rerender datatable 
  const sendDataToParentComponent = (currentPage,drawData,rowsPerPage,companyId,statuesId,excution_typeId,typeId,from_date,to_date) => {
    getStart(currentPage)
    getDraw(drawData)
    getLength(rowsPerPage)
    getCompanyId(companyId)
    getStatuesId(statuesId)
    getExcution_type(excution_typeId)
    getTypeId(typeId)
    getFrom_date(from_date)
    getTo_date(to_date)
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
        companyId:selectedDBVal_companies,
        statuesId:selectedDBVal_statues,
        excution_type:selectedDBVal_excution_type,
        typeId:selectedDBVal_type,
        from_date:date1,
        to_date:date2,
        setLoaderShow:setLoaderShow
      }) 
      )
      setLoaderShow(false)
  }

  const loadOptionsDB_companies = () => {
    console.log("request",companySearchText)
    console.log("------------------------------")
    setLoaderShow(true)
    const token = localStorage.getItem("token")
    // console.log(token)
    const config = {
      headers: {
                Authorization: `Bearer ${token}`,
                'app-lng': 'ar'
                }
    }

    // select__menu

    return axios.get(`${domain_url}/get-car-companies?search_key=${companySearchText}`, config, { query_companies,"search_key":"companySearchText" }).then(res => {
      
      const reponse = res.data.data.data
      const data = []
      data.push({ id:'', value:'All', label:'الكل' })
      for (let i = 0; i < reponse.length; i++) {
        data.push({
          id:reponse[i].id,
          value:get_translation_name(reponse[i]),
          label:get_translation_name(reponse[i])
        })
      }
      // console.log(data)
      setLoaderShow(false)
      return data
    })

  }
  

  const loadOptionsDB_excution_state = [
    { value:'', label:'الكل' },
    { value:'مطلوب إرفاق محضر التنفيذ', label:'مطلوب إرفاق محضر التنفيذ' },
    { value:'تم إرفاق المستند', label:'تم إرفاق المستند' },
    { value:'غير مطلوب', label:'غير مطلوب' }
  ]

  const loadOptionsDB_types = [
    { value:'', label:'الكل' },
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
  
  const loadOptionsDB_statues = [
    { value:'', label:'الكل' },
    { value:'1', label:'قيد الإنتظار' },
    { value:'2',  label:'قيد التنفيذ' },
    { value:'3',  label:'تم السحب' },
    { value:'4',  label:'تم الإستعادة'}
  ]

  
  const handleDBInputChange_companies = newValue => {
    console.log("finally",newValue)
    setCompanySearchText(newValue)
    setQuery_Companies(newValue)

    // new 

    console.log(newValue === "","check",searchValue,"ss")
    // setCurrentPage(currentPage+1)
    // if(newValue !== ""){
    //   console.log("dispatch here ",companySearchValue)
    //   setCompanySearchValue(newValue)
    //   // setSelectedDBVal_Companies(searchValue)

    //   dispatch(
    //     getData({
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

    sendDataToParentComponent(currentPage,drawData,rowsPerPage,value.id,selectedDBVal_statues,selectedDBVal_excution_type,selectedDBVal_type,date1,date2)
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
        companyId:value.id,
        statuesId:selectedDBVal_statues,
        excution_type:selectedDBVal_excution_type,
        typeId:selectedDBVal_type,
        from_date:date1,
        to_date:date2,
        setLoaderShow:setLoaderShow
      })
    )  
  }

  // const handleDBChange_companies_Via_Writing = (e) => {
  //   console.log(e.target.value,"value writing")
  //   // setSelectedDBVal_Companies(value.id)  
  //   // console.log("companies", value.id)
  //   // console.log("companies", selectedDBVal_companies)
  //   setCurrentPage(1)
  //   setCompanySearchValue(e.target.value)
  //   dispatch(
  //     getData({
  //       start: currentPage,
  //       draw: drawData,
  //       length: rowsPerPage,
  //       'search[value]': e.target.value,
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

    const handleDBChange_statues = value => {
    console.log("stat")
    setCurrentPage(1)
    setSelectedDBVal_statues(value.value) 
    sendDataToParentComponent(currentPage,drawData,rowsPerPage,selectedDBVal_companies,value.value,selectedDBVal_excution_type,selectedDBVal_type,date1,date2)

    
    dispatch(
      getData({
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        'search[value]': searchValue,
        companyId:selectedDBVal_companies,
        statuesId:value.value,
        excution_type:excution_type,
        typeId:selectedDBVal_type,
        from_date:date1,
        to_date:date2,
        setLoaderShow:setLoaderShow
      })
    )


    
  }


  const handleDBChange_excution_state  = value => {
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

    sendDataToParentComponent(currentPage,drawData,rowsPerPage,selectedDBVal_companies,selectedDBVal_statues,excution_type,selectedDBVal_type,date1,date2)

    
    setCurrentPage(1)
    dispatch(
      getData({
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        'search[value]': searchValue,
        companyId:selectedDBVal_companies,
        statuesId:selectedDBVal_statues,
        excution_type:excution_type,
        typeId:selectedDBVal_type,
        from_date:date1,
        to_date:date2,
        setLoaderShow:setLoaderShow
      })
    )
  }

  const handleDBChange_types = value => {
    // console.log(value)
    console.log("handleDBChange_types", value.value)
    setSelectedDBVal_type(value.value)  
    setCurrentPage(1)
    sendDataToParentComponent(currentPage,drawData,rowsPerPage,selectedDBVal_companies,selectedDBVal_statues,selectedDBVal_excution_type,value.value,date1,date2)

    dispatch(
      getData({
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        'search[value]': searchValue,
        companyId:selectedDBVal_companies,
        statuesId:selectedDBVal_statues,
        excution_type:selectedDBVal_excution_type,
        typeId:value.value,
        from_date:date1,
        to_date:date2,
        setLoaderShow:setLoaderShow
      })
    )
  }

  // ** Get data on mount
  useEffect(() => {
    sendDataToParentComponent(1,drawData,rowsPerPage,selectedDBVal_companies,selectedDBVal_statues,selectedDBVal_excution_type,selectedDBVal_type,date1,date2)

    dispatch(
      getData({
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        'search[value]': searchValue,
        companyId:selectedDBVal_companies,
        statuesId:selectedDBVal_statues,
        excution_type:selectedDBVal_excution_type,
        typeId:selectedDBVal_type,
        from_date:date1,
        to_date:date2,
        setLoaderShow:setLoaderShow
      })
    )
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

    sendDataToParentComponent(currentPage,drawData,rowsPerPage,selectedDBVal_companies,selectedDBVal_statues,selectedDBVal_excution_type,selectedDBVal_type,datetime_1,datetime_2)


      dispatch(
        getData({
          start: currentPage,
          draw: drawData,
          length: rowsPerPage,
          'search[value]': searchValue,
          companyId:selectedDBVal_companies,
          statuesId:selectedDBVal_statues,
          excution_type:selectedDBVal_excution_type,
          typeId:selectedDBVal_type,
          from_date:datetime_1,
          to_date:datetime_2,
          setLoaderShow:setLoaderShow
        })
      )
     
        
    console.log(datetime_1)
    setDate1(datetime_1)
    setDate2(datetime_2)  
    setPicker(e)
  }

  // ** Function to handle filter
  const handleFilter = e => {
    console.log("filter")
    setSearchValue(e.target.value)

    dispatch(
      getData({
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        'search[value]': e.target.value,
        companyId:selectedDBVal_companies,
        statuesId:selectedDBVal_statues,
        excution_type:selectedDBVal_excution_type,
        typeId:selectedDBVal_type,
        from_date:date1,
        to_date:date2,
        setLoaderShow:setLoaderShow
      })
    )
  }

  // ** Function to handle Pagination and get data
  const handlePagination = page => {
    console.log(page.selected,"111")
    console.log("paginating ...")
    dispatch(
      getData({
        start: (page.selected + 1),
        draw: (page.selected + 1),
        length: rowsPerPage,
        'search[value]': searchValue,
        companyId:selectedDBVal_companies,
        statuesId:selectedDBVal_statues,
        excution_type:selectedDBVal_excution_type,
        typeId:selectedDBVal_type,
        from_date:date1,
        to_date:date2,
        setLoaderShow:setLoaderShow
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
        companyId:selectedDBVal_companies,
        statuesId:selectedDBVal_statues,
        excution_type:selectedDBVal_excution_type,
        typeId:selectedDBVal_type,
        from_date:date1,
        to_date:date2,
        setLoaderShow:setLoaderShow
      })
    )
    setCurrentPage(1)
    setRowsPerPage(parseInt(e.target.value))
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(store.total / rowsPerPage)
    return (
      <Row className='mx-0 mt-4 mb-50'>
          <Col className='col-12 col-md-6'>
            <div className='d-flex align-items-center label-select-datatable'>
              <Label for='sort-select' className='font-select-datatable'>إظهار</Label>
              <Input
                className='dataTable-select select-no-border font-select-datatable'
                type='select'
                id='sort-select'
                value={rowsPerPage}
                onChange={e => handlePerPage(e)}
              >
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
              <Label for='sort-select' className='font-select-datatable'>صفوف من أصل {Math.ceil(store.total)}</Label>
            </div>
          </Col>

          <Col className='col-12 col-md-6'>
            <ReactPaginate
              previousLabel={<div className="d-inline-flex"><ChevronRight size={20} /> السابق</div> }
              nextLabel={<div className="d-inline-flex"> التالى <ChevronLeft size={20} /></div> }
              breakLabel='...'
              pageCount={Math.ceil(count) || 1}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              activeClassName='active'
              forcePage={currentPage !== 0 ? currentPage - 1 : 0}
              onPageChange={page => handlePagination(page)}
              pageClassName='page-item'
              breakClassName='page-item'
              nextLinkClassName='page-link'
              pageLinkClassName='page-link'
              breakLinkClassName='page-link'
              previousLinkClassName='page-link'
              nextClassName=' page-next'
              previousClassName=' page-prev'
              containerClassName={
                'pagination react-paginate paging separated-pagination pagination-sm justify-content-end pe-1 mt-1'
              }
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

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }
  
  const handleCloseConfirmDelete = () => setShowConfirmDelete(false)
  const handleConfirmDelete = () => {
    console.log('deleteRowId: ', selectedRowId)
    const token = localStorage.getItem("token")
    setShowConfirmDelete(false)
    axios({
      method: "post",
      url: `${domain_url}/delete-car`,
      data: {
        car_id: selectedRowId
      },
      headers: { 
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        "app-lng": 'en' 
      }
    })
    .then(function (response) {
      //handle success
      console.log("Check")
      console.log(response.data)
      
      if (response.data.status !== 200) {
        setTypeAlert("Fail")
        setTitleAlert("لم يتم مسح المركبة بشكل صحيح.")
        setHeadAlert("حدث خطأ")
        setShowAlert(true)
        console.log("Check1")
      } else {
        setTypeAlert("Success")
        setTitleAlert("تم مسح المركبة بنجاح.")
        setHeadAlert("")
        setShowAlert(true)
        console.log("Check2")
      }
      
      reload_table()
    })
    .catch(function (response) {
      //handle error
      console.log(response)
      setTypeAlert("Fail")
        setTitleAlert("لم يتم مسح المركبة بشكل صحيح.")
        setHeadAlert("حدث خطأ")
        setShowAlert(true)
      reload_table()
    })
    
  }

  const deleteRowId = (id) => {
    setSelectedRowId(id)
    setShowConfirmDelete(true)
    
  }

  const viewHandler = (id) => {
    console.log('viewHandler: ', id)
    
  }

  const ConfirmDeleteItem = () => {

    return (<Modal aria-labelledby="contained-modal-title-vcenter" centered show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
      <Modal.Header className='background-FEE4E2'>
   
      <div className="col-6">
            <p className="modal-text-main pt-3">
            تأكيد الحذف 
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
                      <p className="confirm-logout-text pt-4 pb-5 mb-5">
                      هل انت متأكد من حذف المركبة؟
                      </p>
                      
                  </div>
                  {/* <hr/> */}
  
          </Modal.Body>
          <Modal.Footer>
          <div className="row buttons-row pt-3 pb-3">
                      <div className="col-6  ">
                          <a className="text-center block btn-cancel text-center  p-3 w-100"  onClick={handleCloseConfirmDelete}>
                          إلغاء   
                          </a>
                      </div>
                      <div className="col-6  ">
                          <a className="text-center block btn-accept text-center  p-3 w-100"  onClick={handleConfirmDelete}>
                              حذف   
                          </a>
                      </div>
                  </div>
          </Modal.Footer>
  
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
      <Row className='mx-auto mt-1 mb-50'>
          <Col className='col-md-2 col-12 row pt-1 mx-auto p-0'>
            <Input
              className=' input-filter-icon-search form-control mx-auto'
              type='text'
              id='search-input'
              placeholder="بحث"
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
          <Col className='col-md-1 col-12'></Col>
          <Col className='col-md-9 col-12 row mx-auto p-0'>
          
          <AsyncSelect
          defaultOptions
          isClearable={false}
          name='db-react-select'
          className='react-select p-0  pt-1 col-12 col-md-3 mx-auto'
          classNamePrefix='select'
          placeholder='ابحث أو إختار الشركة'
          onChange={handleDBChange_companies}
          // isSearchable={true}
          // filterOption={customFilter}
          
          theme={selectThemeColors}
          loadOptions={loadOptionsDB_companies}
          onInputChange={handleDBInputChange_companies}
          // onKeyDown = {handleDBChange_companies_Via_Writing}
            />


<Select
              options={loadOptionsDB_excution_state}
              name='db-react-select2'
              className='react-select ps-md-1 p-0 pt-1 col-12 col-md-2 mx-auto'
              classNamePrefix='select-gray'
              placeholder='حالة محضر التنفيذ'
              onChange={handleDBChange_excution_state}
              theme={selectThemeColors}
              onInputChange={handleDBInputChange_excution_type}
            />

<Select
              options={loadOptionsDB_types}
              name='db-react-select'
              className='react-select ps-md-1 p-0 pt-1 col-12 col-md-3 mx-auto'
              classNamePrefix='select-gray'
              placeholder='نوع تسجيل المركبة'
              onChange={handleDBChange_types}
              theme={selectThemeColors}
              onInputChange={handleDBInputChange_type}
            />


<Select
              // defaultValue={loadOptionsDB_statues[0]}
              options={loadOptionsDB_statues}
              name='db-react-select'
              className='react-select ps-md-1 p-0 pt-1 col-12 col-md-2 mx-auto'
              classNamePrefix='select-gray'
              placeholder='الحالة'
              onChange={handleDBChange_statues}
              theme={selectThemeColors}
              onInputChange={handleDBInputChange_statues}
            />

        

            <PickerRange className=' ps-md-1 ps-0 pe-md-1 pe-0 pt-1 col-12 col-md-2 mx-auto' 
                         dir="ltr"
                         functionHandler = {setPickerHandler}
                         picker = {picker} />
            {/* <PickerRange /> */}

          </Col>
        </Row>
        <div className='react-dataTable'>
          <DataTable noHeader
            pagination
            paginationServer
            className='react-dataTable'
            noDataComponent={<EmptyTable />}
            columns={columns(deleteRowId, viewHandler, showUploadCertificate)}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            data={dataToRender()}
          />
        </div>
    </div>
  )
}

export default memo(DataTableServerSide)
