// ** React Imports
import { Fragment, useState, useEffect, memo, useContext } from 'react'
import {LoaderContext, LoaderProvider} from "../../utility/context/LoaderContext";


// ** Table Columns
import { columns } from './data'
import Modal from 'react-bootstrap/Modal'

// ** Store & Actions
import { getData } from './store'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, ChevronRight, ChevronLeft } from 'react-feather'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import EmptyTable from "../components/EmptyTable"

// ** Utils
import { selectThemeColors } from '@utils'
import PickerRange from "../components/PickerRange"
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import axios from 'axios'
import themeConfig from "@configs/themeConfig";
import $ from 'jquery'

const domain_url = themeConfig.url
// import { ExcelLink } from 'react-csv'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
import { Car, Settings, Download, Share, CloseIcon, Close } from '../components/icons/all_icons'

// let state
// state.dataTables = null
const DataTableServerSide = ({setTypeAlert, setHeadAlert, setTitleAlert, setShowAlert}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.dataTables)
  const {loader_show, setLoaderShow} = useContext(LoaderProvider);
  console.log(store.data, "......")
  // console.log(state.dataTables)
  // ** States
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [excution_type, setQuery_excution_type] = useState('')
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [searchValue, setSearchValue] = useState('')
  const [picker, setPicker] = useState(new Date())
  const [selectedDBVal_excution_type, setSelectedDBVal_excution_type] = useState('-1')
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [drawData, setDrawData] = useState(1)
  const [selected_message, setSelected_message] = useState(null)

  const handleDBInputChange_excution_type = newValue => {
    setQuery_excution_type(newValue)
  }
  
  const [show_Modal, setShow_Modal] = useState(false)
  const handleClose = () => setShow_Modal(false)

  const handleVerify = () => {
    // setShow_Modal(true)
    console.log($('#text_to_send').val(),selected_message)
    if($('#text_to_send').val()!=null || $('#text_to_send').val()!=""){
      
    const token = localStorage.getItem("token")
    // setLoaderShow(true)
    axios({
      method: "post",
      url: `${domain_url}/send-contact-us-reply`,
      data: {
        contact_us_id: selected_message,
        message: $('#text_to_send').val(),
      },
      headers: { 
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        "app-lng": 'ar' 
      }
    })
    .then(function (response) {
      //handle success
      handleClose()
      // setLoaderShow(false)
      if (response.data.status !== 200) {
        setTypeAlert("Fail")
        setTitleAlert("لم يتم إرسال الرد بشكل صحيح.")
        setHeadAlert("حدث خطأ")
        setShowAlert(true)
        console.log("Check1")
      } else {
        setTypeAlert("Success")
        setTitleAlert("تم الرد بنجاح.")
        setHeadAlert("")
        setShowAlert(true)
        console.log("Check2")
      }
      
    })
    .catch(function (response) {
      //handle error
      handleClose()
      // setLoaderShow(false)
      console.log(response)
      setTypeAlert("Fail")
        setTitleAlert("لم يتم إرسال الرد بشكل صحيح.")
        setHeadAlert("حدث خطأ")
        setShowAlert(true)
    })


  }

  }

  function handleOnChange(event){
    // console.log(event.target.value)
    $('#text_to_send').val(event.target.value)
    $('#text_to_send').attr('value',event.target.value)
  }
  const Verify = () => {
    console.log("handle verify 000")
  return (
    <>
    <Modal show={show_Modal} onHide={handleClose}>
      <Input type='hidden' id="text_to_send" value=""/>
    <Modal.Header className='background-F2F7FF'>
 
        <div className="col-6">
            <p className="emp-text pt-3">
            نص الرسالة  
            </p>
            </div>
        <div className="col-6 text-end">
            <a onClick={handleClose}>
                <Close width={24} height={24} color='none'/>
            </a>
        </div>

    </Modal.Header>

        <Modal.Body>
        
                <div className="row mt-4 mb-1">
                <Col sm='12' className='px-3 col-sm-12'>
                  <textarea  onChange={(event) => handleOnChange(event)} placeholder='ادخل نص الرسالة هنا' id="message_text" className='w-100 p-3' rows="4">
                    
                    </textarea>
                </Col>
                    
                </div>
                {/* <hr/> */}

        </Modal.Body>
        <Modal.Footer>
        <div className="row buttons-row pt-3 pb-3">
                    <div className="col-6  ">
                        <a className="text-center block btn-cancel text-center  p-3 w-100"  onClick={handleClose}>
                        إلغاء   
                        </a>
                    </div>
                    <div className="col-6  ">
                        <a className="text-center block btn-verify text-center  p-3 w-100" onClick={handleVerify}>
                            تأكيد
                        </a>
                    </div>
                </div>
        </Modal.Footer>

    </Modal>

    </>
    
  )
}



  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        draw: drawData,
        perPage: rowsPerPage,
        q: searchValue,
        from_date:date1,
        to_date:date2,
        is_reply:selectedDBVal_excution_type,
        setLoaderShow:setLoaderShow
      })
    )
   
  }, [dispatch])

  const setPickerHandler = e => {
    
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

      dispatch(
        getData({
          page: currentPage,
          draw: drawData,
          perPage: rowsPerPage,
          q: searchValue,
          from_date:datetime_1,
          to_date:datetime_2,
          is_reply:selectedDBVal_excution_type,
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
    setSearchValue(e.target.value)

    dispatch(
      getData({
        page: currentPage,
        draw: drawData,
        perPage: rowsPerPage,
        q: e.target.value,
        from_date:date1,
        to_date:date2,
        is_reply:selectedDBVal_excution_type,
        setLoaderShow:setLoaderShow
      })
    )
  }

  // ** Function to handle Pagination and get data
  const handlePagination = page => {
    dispatch(
      getData({
        page: page.selected + 1,
        draw: drawData,
        perPage: rowsPerPage,
        q: searchValue,
        from_date:date1,
        to_date:date2,
        is_reply:selectedDBVal_excution_type,
        setLoaderShow:setLoaderShow
      })
    )
    setCurrentPage(page.selected + 1)
    setDrawData(page.selected + 1)
  }

  // ** Function to handle per page
  const handlePerPage = e => {
    dispatch(
      getData({
        page: currentPage,
        draw: drawData,
        perPage: parseInt(e.target.value),
        q: searchValue,
        from_date:date1,
        to_date:date2,
        is_reply:selectedDBVal_excution_type,
        setLoaderShow:setLoaderShow
      })
    )
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
      q: searchValue
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
  

  function reload_table() {
    dispatch(
      getData({
        page: currentPage,
        draw: drawData,
        perPage: rowsPerPage,
        q: searchValue,
        from_date:date1,
        to_date:date2,
        is_reply:selectedDBVal_excution_type,
        setLoaderShow:setLoaderShow

      }) 
      )
  }


  const handleCloseConfirmDelete = () => setShowConfirmDelete(false)
  const handleConfirmDelete = () => {
    console.log('deleteRowId: ', selectedRowId)
    const token = localStorage.getItem("token")
    setShowConfirmDelete(false)
    axios({
      method: "post",
      url: `${domain_url}/delete-contact-us`,
      data: {
        contact_us_id: selectedRowId
      },
      headers: { 
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        "app-lng": 'ar' 
      }
    })
    .then(function (response) {
      //handle success
      console.log("Check")
      console.log(response.data)
      
      if (response.data.status !== 200) {
        setTypeAlert("Fail")
        setTitleAlert("لم يتم مسح الطلب بشكل صحيح.")
        setHeadAlert("حدث خطأ")
        setShowAlert(true)
        console.log("Check1")
      } else {
        setTypeAlert("Success")
        setTitleAlert("تم مسح الطلب بنجاح.")
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
        setTitleAlert("لم يتم مسح الطلب بشكل صحيح.")
        setHeadAlert("حدث خطأ")
        setShowAlert(true)
      reload_table()
    })
    
  }

  const deleteRowId = (id) => {
    setSelectedRowId(id)
    setShowConfirmDelete(true)
    
  }

  const sendHandler = (id) => {
    console.log('sendHandler: ', id)
    setSelected_message(id)
    setShow_Modal(true)
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
                      هل انت متأكد من حذف رسالة الموظف ؟
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

  function exportExcelAll(){
    setLoaderShow(true)
    const token = localStorage.getItem("token")
  // console.log(token)

    const headers = {
               Authorization: `Bearer ${token}`,
               'app-lng': 'ar'
              }
  
  
 
  axios({
    url: `${domain_url}/get-contact-us?start=0&length=500&return_excel=1`, //your url
    method: 'GET',
    responseType: 'blob', // important
    headers:headers
}).then((response) => {
    // create file link in browser's memory
    // console.log(response)
    const href = URL.createObjectURL(response.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'file.xlsx'); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    setLoaderShow(false)
});


  }


  const handleDBChange_excution_state  = value => {
    // console.log(value)
    setSelectedDBVal_excution_type(value.value)  
    setCurrentPage(1)
    dispatch(
      getData({
        page: currentPage,
        draw: drawData,
        perPage: rowsPerPage,
        q: searchValue,
        from_date:date1,
        to_date:date2,
        is_reply:value.value,
        setLoaderShow:setLoaderShow

      }) 

    )
  }

  const loadOptionsDB_excution_state = [
    { value:'-1', label:'الكل' },
    { value:'1', label:'تم الرد' },
    { value:'0', label:'لم يتم الرد' }
  ]

  return (
    <div className="row ">
      <Verify />
      <ConfirmDeleteItem />
        <Row className='mx-auto mt-1 mb-50 p-1'>
          <Col className='col-md-2 col-12 pt-1 p-0'>
            <Input
              className=' input-filter-icon-search form-control mx-auto'
              type='text'
              id='search-input'
              placeholder="بحث"
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
          <Col className="col-md-4 col-12 col"></Col>

          
          <Col className='col-md-6 col-12 row   mx-auto p-0'>
          <Select
              options={loadOptionsDB_excution_state}
              name='db-react-select2'
              className='react-select ps-md-1 p-0 pt-1 mt-1 col-12 col-md-4 px-2'
              classNamePrefix='select-gray'
              placeholder='حالة الرد'
              onChange={handleDBChange_excution_state}
              theme={selectThemeColors}
              onInputChange={handleDBInputChange_excution_type}
            />
            <PickerRange className='mt-1 pt-1 col-6 col-md-4 p-0' 
                         dir="ltr"
                         functionHandler = {setPickerHandler}
                         picker = {picker} />
          <div className='pt-1 col-6 col-md-4 p-0 ps-2'>
            <Button.Ripple  className="button-transparent w-100 text-center button-excel"  onClick={() => exportExcelAll()}>
            
                <span className='align-middle me-2' >تصدير تحميل</span>
                <Share width={19} height={19} color='#4788C6' />
            </Button.Ripple>
            </div>
          </Col>
        </Row>
        <div className='react-dataTable'>
          <DataTable noHeader
            pagination
            paginationServer
            className='react-dataTable'
            noDataComponent={<EmptyTable />}
            columns={columns(deleteRowId, sendHandler)}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            data={dataToRender()}
          />
        </div>
    </div>
  )
}

export default memo(DataTableServerSide)
