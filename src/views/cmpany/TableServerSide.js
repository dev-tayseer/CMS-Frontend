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
import { Home, Car, Settings, Download, Share, CloseIcon, PreviousIcon,NextIcon } from '../components/icons/all_icons'

import Refresh from "@src/assets/images/icons/refresh.png";



// let state
// state.dataTables = null
const DataTableServerSide = ({setTypeAlert, setHeadAlert, setTitleAlert, setShowAlert,getStart , getDraw , getLength,setcompanyCount,setallPermissions}) => {
  // ** Store Vars
  const [drawData, setDrawData] = useState(1)

  const dispatch = useDispatch()
  const store = useSelector(state => state.dataTables)
  console.log(store,"-----------------")
  const {loader_show, setLoaderShow} = useContext(LoaderProvider);

  // console.log(state.dataTables)
  // ** States

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  const [picker, setPicker] = useState(new Date())
  
  const [pending, setPending] = useState(true)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [selectedDBVal_statues, setSelectedDBVal_statues] = useState('')


  const [activeTab, setactiveTab] = useState("1")
  
  const [can_edit_company, setcan_edit_company] = useState(true)
  const [can_delete_company, setcan_delete_company] = useState(true)
  
  const CustomSubHeader = () => {
   
    return (
      <div className="w-100 p-0 m-0 background-D2D6DB" role="rowgroup">
            <div className="w-100 p-0 m-0 background-D2D6DB" role="row">
                <div data-column-id="1" className="text-center w-50 rdt_TableCol">
                  <p data-column-id="1" className="f-w-800 f-s-12px font-Cairo color-1F2733 mt-2 mb-2">بيانات الشركة</p>
                 </div>
                 <div data-column-id="1" className="text-center w-50 rdt_TableCol">
                  <p data-column-id="1" className="f-w-800 f-s-12px font-Cairo color-1F2733 mt-2 mb-2">المركبات </p>
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
                          <p data-column-id="1" class="f-w-800 f-s-12px font-Cairo color-1F2733 mt-2 mb-2">بيانات الشركة</p>
                        </div>
                        <div data-column-id="1" class="text-center col rdt_TableCol">
                          <p data-column-id="1" class="f-w-800 f-s-12px font-Cairo color-1F2733 mt-2 mb-2">المركبات </p>
                        </div>
                    </div>
                </div>`
      $(element).insertBefore('.rdt_TableHead')
    }
  }


  let allPermissions_table = []
  function requestPermissions(){
    console.log(requestPermissions,"ppppppppp")
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
      console.log(response.data[0]['permetion_list'],"pppp")
      allPermissions_table = response.data[0]['permetion_list']
      console.log(allPermissions_table,"allPermissions_table")
      setallPermissions(response.data[0]['permetion_list'])
      setcan_edit_company(allPermissions_table.includes(14))

      setcan_delete_company(allPermissions_table.includes(15))


      // setisDataLoaded(true)
      console.log(response.data[0]['permetion_list'],"888888888888")
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

    dispatch(
      getData({
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        q: searchValue,
        statuesId:selectedDBVal_statues,
        setLoaderShow:setLoaderShow      
      })
    )

  requestPermissions()
    
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
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        q: e.target.value,
        statuesId:selectedDBVal_statues,


        setLoaderShow:setLoaderShow
      })
    )

  }

  // ** Function to handle Pagination and get data
  const handlePagination = page => {
    console.log(page,"000",page.selected,"***")
    dispatch(
      getData({
        start: (page.selected + 1),
        draw: (page.selected + 1),
        length: rowsPerPage,
        q: searchValue,
        statuesId:selectedDBVal_statues,
        

        setLoaderShow:setLoaderShow
        
      })
    )
    // setCurrentPage(page.selected + 1)
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
        q: searchValue,
        statuesId:selectedDBVal_statues,

        setLoaderShow:setLoaderShow
      })
    )
    // setRowsPerPage(parseInt(e.target.value))
    setCurrentPage(1)
    setRowsPerPage(parseInt(e.target.value))
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    setcompanyCount(store.total)
    const count = Math.ceil(store.total / rowsPerPage)

    console.log("Total")
    console.log(store)
    // onloadPage()
    return (
      
      <Row className='mx-0 mt-4 mb-50'>
          <Col className='d-flex justify-content-md-center d-md-block col-12 col-md-6 col'>
            <div className='d-flex align-items-center label-select-datatable'>
              {/* <Label for='sort-select' className='font-select-datatable'>عرض</Label> */}
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
                <option value={10}>10 صفوف من أصل {Math.ceil(store.total)}</option>
                <option value={25}>25 صفوف من أصل {Math.ceil(store.total)}</option>
                <option value={50}>50 صفوف من أصل {Math.ceil(store.total)}</option>
                <option value={75}>75 صفوف من أصل {Math.ceil(store.total)}</option>
                <option value={100}>100 صفوف من أصل {Math.ceil(store.total)}</option>
              </Input>
              <Label for='sort-select' className='font-select-datatable'>
              </Label>
            </div>
          </Col>

          <Col className='d-flex justify-content-md-center d-md-block col-12 col-md-6 col'>
            <ReactPaginate
              previousLabel={<div className="d-inline-flex mt-2"><NextIcon size={20} /></div> }
              nextLabel={<div className="d-inline-flex mt-2" > <PreviousIcon size={20} /></div> }
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
  function reload_table() {
    dispatch(
      getData({
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        q: searchValue,
        statuesId:selectedDBVal_statues,

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
    console.log(store.data,"store.data.length")
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
    // start
    var data = new FormData();

    var config = {
      method: 'delete',
      url: `${domain_url}/Company/AddCompany/?id=${selectedRowId}`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      [{"success":1,"message":"تم حذف الإدارة ضضضضضضضضضضض","message_en":"deleted ضضضضضضضضضضض has been deleted"}]

      if (response.data[0].success == "1"){
        setTypeAlert("Success")
        setTitleAlert("تم مسح الإدارة بنجاح.")
        setHeadAlert("")
        setShowAlert(true)
        reload_table()
      } else{ 
                setTypeAlert("Fail")
        setTitleAlert("لم يتم مسح الإدارة بشكل صحيح.")
        setHeadAlert("حدث خطأ")
        setShowAlert(true)
        reload_table()

      }

    })
    .catch(function (error) {
      console.log(error);
      console.log(response,"**-*-*")
      setTypeAlert("Fail")
      setTitleAlert("لم يتم مسح الإدارة بشكل صحيح.")
      setHeadAlert("حدث خطأ")
      setShowAlert(true)
      console.log("Check1")
      reload_table()
    });
    
    // end
    // axios({
    //   method: "delete",
    //   url: `${domain_url}/Department/AddDepartment?id=${selectedRowId}`,
    //   // data: {
    //   //   car_company_id: selectedRowId
    //   // },
    //   headers: { 
    //     Accept: 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   }
    // })
    // .then(function (response) {
    //   //handle success
    //   console.log("Check ... ")
    //   console.log(response.data)
      
    //   if (response.data.status !== 200) {
    //     setTypeAlert("Fail")
    //     setTitleAlert("لم يتم مسح الشركة بشكل صحيح.")
    //     setHeadAlert("حدث خطأ")
    //     setShowAlert(true)
    //     console.log("Check1")
    //   } else {
    //     setTypeAlert("Success")
    //     setTitleAlert("تم مسح الشركة بنجاح.")
    //     setHeadAlert("")
    //     setShowAlert(true)
    //     console.log("Check2")
    //   }
      
    //   reload_table()
    // })
    // .catch(function (response) {
    //   //handle error
    //   console.log(response,"**-*-*")
    //   setTypeAlert("Fail")
    //   setTitleAlert("لم يتم مسح الشركة بشكل صحيح.")
    //   setHeadAlert("حدث خطأ")
    //   setShowAlert(true)
    //   console.log("Check1")
    //   reload_table()
    // })

  }


  function handlerefresh(){
    location.reload();
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
      <Modal.Header className='background-F7FAF7'>
   
      <div className="col-6">
            <p className="modal-text-main pt-3">
                حذف الشركة 
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
                      <div className="confirm-logout-text pt-4 pb-5 mb-5">
                        <span className='me-2'>
                      هل انت متأكد من حذف الشركة ؟
                      </span>
                      
                      </div>
                      
                  </div>
                  {/* <hr/> */}
  
          </Modal.Body>
          <Modal.Footer>
          <div className="row buttons-row pt-3 pb-3">
                    <div className="col-6  ">
                          <a className="text-center block btn-accept text-center  p-3 w-100"  onClick={handleConfirmDelete}>
                              تأكيد الحذف   
                          </a>
                      </div>
                      <div className="col-6  ">
                          <a className="text-center block btn-cancel text-center  p-3 w-100"  onClick={handleCloseConfirmDelete}>
                          إلغاء   
                          </a>
                      </div>

                  </div>
          </Modal.Footer>
  
      </Modal>
      )
  }

  function exportExcelAll(){
    setLoaderShow(true)
    let black_list = selectedDBVal_statues
    const token = localStorage.getItem("token")
    var config = {
      method: 'get',
      responseType: 'blob',
      url: `${domain_url}/Company/excel?black_list=${black_list}`,
      headers: { 
        'Authorization': `Bearer ${token}`,
        
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log(response,"excell")
      const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CompanySample.xlsx`);
    document.body.appendChild(link);
    link.click();
    setLoaderShow(false)

    })
    .catch(function (error) {
      console.log(error);
    });


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
      
      const company_activity_list2 = []
      // const result = res.data.data
      
      // result.forEach((item, index, array) => {
        data.push(
          {
            id: "1",
            value: "ضمن القائمة السوداء",
            label: "ضمن القائمة السوداء"
          }
        )
        data.push(
          {
            id: "0",
            value: "ليست ضمن القائمة السوداء",
            label: "ليست ضمن القائمة السوداء"
          }
        )


      console.log(data,"66...............")
      return data
    })

  }


  const handleDBChange_statues = value => {
    console.log("stat.........................................................")
    setCurrentPage(1)
    setSelectedDBVal_statues(value.id) 
    // sendDataToParentComponent(currentPage,drawData,rowsPerPage,value.id)

    
    dispatch(
      getData({
        start: currentPage,
        draw: drawData,
        length: rowsPerPage,
        'search[value]': searchValue,
        statuesId:value.id,
        setLoaderShow:setLoaderShow,

      })
    )


    
  }





  return (
    <>
    <div className="container-fluid table-header-bordered ps-xl-5 ps-3 pt-4 mt-3   ">
      <ConfirmDeleteItem />

      <Row className=' mt-1  p-0'>

          <Col className='col-md-3  col-12 row pt-1   ps-3 ps-md-3 '>
          <Input
              className='input-filter-icon-search input-filter-icon-search3 form-control  ps-5'
              type='text'
              id='search-input'
              placeholder="بحث"
              value={searchValue}
              onChange={handleFilter}
            />
            </Col>
          <Col className='col-md-5 col-12 '>
              

          </Col>
          <Col className='col-md-4 pt-1 col-12 text-md-end px-0 p-md-0 d-md-flex justify-content-end'>
          <AsyncSelect
          defaultOptions
          isClearable={false}
          name='db-react-select'
          className='react-select react-select-contract react-select-contract-special text-start  select-full  pt-md-2  pt-2 pt-md-1 h-40  '
          classNamePrefix='select'
          placeholder='هل الشركة ضمن القائمة السوداء'
          onChange={handleDBChange_statues}
          isSearchable={false}

          
          theme={selectThemeColors}
          loadOptions={loadOptionsDB_statues}
          // onInputChange={handleDBInputChange_statues}
            />

          <Button.Ripple  className="button-transparent text-center px-4   button-excel ms-md-2 text-end "  onClick={() => exportExcelAll()}>
          <Share  width={19} height={19} color='#4788C6' />
            
            <span className='align-middle ms-3' > تحميل</span>
        </Button.Ripple>
          {/* </div> */}

          <div>
              <img src={Refresh} width={24} height={24} className='mt-3  ms-3 refresh' onClick={handlerefresh} />
             </div>


          </Col>
        </Row>

    </div>
    <div className="container-fluid ps-xl-1 pe-xl-1 px-0 ms-0 me-0">
    <div className='react-dataTable '>
      <DataTable 
        pagination
        paginationServer
        className='react-dataTable'
        noDataComponent={<EmptyTable obj = "company" />}
        columns={columns(deleteRowId, viewHandler , can_edit_company , can_delete_company)}
        sortIcon={<ChevronDown size={10} />}
        paginationComponent={CustomPagination}
        data={dataToRender()}
        onload = {onloadPage}
      />
    </div>
    </div>
    </>
  )
}

export default memo(DataTableServerSide)
