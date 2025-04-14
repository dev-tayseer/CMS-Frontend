// ** React Imports
import { Fragment, useState, useEffect, memo, useContext } from 'react'
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
import EmptyTable from "../components/EmptyTable"
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import axios from 'axios'
import $ from 'jquery'
import themeConfig from "@configs/themeConfig";

const domain_url = themeConfig.url

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Button, Input, Label, Row, Col } from 'reactstrap'
import { Home, Car, Settings, Download, Share, CloseIcon, DocIcon, Loader2 } from '../components/icons/all_icons'
import { element } from 'prop-types'

// let state
// state.dataTables = null
const DataTableServerSide = ({setTypeAlert, setHeadAlert, setTitleAlert, setShowAlert}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.dataTables)
  const {loader_show, setLoaderShow} = useContext(LoaderProvider);

  // console.log(state.dataTables)
  // ** States

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [searchValue, setSearchValue] = useState('')
  const [picker, setPicker] = useState(new Date())
  
  const [pending, setPending] = useState(true)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState(null)
  
  const CustomSubHeader = () => {
   
    return (
      <div className="w-100 p-0 m-0 background-D2D6DB" role="rowgroup">
            <div className="w-100 p-0 m-0 background-D2D6DB" role="row">
                <div data-column-id="1" className="text-center w-50 rdt_TableCol">
                  <p data-column-id="1" className="f-w-800 f-s-12px font-Almarai color-1F2733 mt-2 mb-2">بيانات الشركة</p>
                 </div>
                 <div data-column-id="1" className="text-center w-50 rdt_TableCol">
                  <p data-column-id="1" className="f-w-800 f-s-12px font-Almarai color-1F2733 mt-2 mb-2">المركبات </p>
                 </div>
            </div>
        </div>
    )
  }

  const onloadPage = () => {
    const head_count = $('#head_count').length
    if (head_count === 0) {
      const element = `<div class="w-100 p-0 m-0 background-D2D6DB" id="head_count" role="rowgroup">
                    <div class="row p-0 m-0 background-D2D6DB" role="row">
                        <div data-column-id="1" class="text-center col rdt_TableCol">
                          <p data-column-id="1" class="f-w-800 f-s-12px font-Almarai color-1F2733 mt-2 mb-2">بيانات الشركة</p>
                        </div>
                        <div data-column-id="1" class="text-center col rdt_TableCol">
                          <p data-column-id="1" class="f-w-800 f-s-12px font-Almarai color-1F2733 mt-2 mb-2">المركبات </p>
                        </div>
                    </div>
                </div>`
      $(element).insertBefore('.rdt_TableHead')
    }
  }
  // ** Get data on mount
  useEffect(() => {

    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue ,
        setLoaderShow:setLoaderShow       
      })
    )


    
  }, [dispatch])

  const setPickerHandler = e => {
    console.log(e)
    setPicker(e)
  }

  // ** Function to handle filter
  const handleFilter = e => {
    setSearchValue(e.target.value)

    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: e.target.value,
        setLoaderShow:setLoaderShow
        
      })
    )
  }

  // ** Function to handle Pagination and get data
  const handlePagination = page => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        q: searchValue,
        setLoaderShow:setLoaderShow
        
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function to handle per page
  const handlePerPage = e => {
    dispatch(
      getData({
        page: currentPage,
        perPage: parseInt(e.target.value),
        q: searchValue,
        setLoaderShow:setLoaderShow
      })
    )
    setRowsPerPage(parseInt(e.target.value))
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(store.total / rowsPerPage)

    console.log("Total")
    console.log(store)
    onloadPage()
    return (
      
      <Row className='mx-0 mt-4 mb-50'>
          <Col className='d-flex justify-content-center d-md-block col-12 col-md-6 col'>
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

          <Col className='d-flex justify-content-center d-md-block col-12 col-md-6 col'>
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
  function reload_table() {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue,
        setLoaderShow:setLoaderShow
      })
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
  
  const handleCloseConfirmDelete = () => setShowConfirmDelete(false)
  const handleConfirmDelete = () => {
    
    const token = localStorage.getItem("token")
    setShowConfirmDelete(false)
    axios({
      method: "post",
      url: `${domain_url}/delete-car-company`,
      data: {
        car_company_id: selectedRowId
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
        setTitleAlert("لم يتم مسح الشركة بشكل صحيح.")
        setHeadAlert("حدث خطأ")
        setShowAlert(true)
        console.log("Check1")
      } else {
        setTypeAlert("Success")
        setTitleAlert("تم مسح الشركة بنجاح.")
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
      setTitleAlert("لم يتم مسح الشركة بشكل صحيح.")
      setHeadAlert("حدث خطأ")
      setShowAlert(true)
      console.log("Check1")
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
                      هل انت متأكد من حذف الشركة؟
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
    url: `${domain_url}/get-car-companies?start=0&length=500&return_excel=1`, //your url
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

  return (
    <div className="container-fluid p-3 mb-2">
      <ConfirmDeleteItem />
      <Row className='mx-auto mt-1 mb-3'>
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
          <Col className='col-md-8 col-12'></Col>
          <Col className='col-md-2 pt-2 col-12 me-2  row   p-0'>
          {/* button-transparent text-center px-4 w-100 button-excel ms-md-2 */}
          {/* <Button.Ripple color='white' className="button-transparent button-excel w-100 button-white text-center borderRadius-4"  onClick={() => exportExcelAll()}>
                  <span className='align-middle ms-25 pe-3' >تصدير تحميل</span>
                  <Share width={19} height={19} color='#4788C6' />
                </Button.Ripple> */}
                {/* <div className=' ps-2 pe-md-2 pe-0 pt-1 col-6 col-md-4 '> */}
              <Button.Ripple  className="button-transparent text-center px-4 w-100 button-excel ms-md-2 "  onClick={() => exportExcelAll()}>
                
                <span className='align-middle me-4' >تصدير تحميل</span>
                <Share  width={19} height={19} color='#4788C6' />
            </Button.Ripple>
          {/* </div> */}
          </Col>
        </Row>
        <div className='react-dataTable'>
          <DataTable 
            pagination
            paginationServer
            className='react-dataTable'
            noDataComponent={<EmptyTable />}
            columns={columns(deleteRowId, viewHandler)}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            data={dataToRender()}
            onload = {onloadPage}
          />
        </div>
    </div>
  )
}

export default memo(DataTableServerSide)
