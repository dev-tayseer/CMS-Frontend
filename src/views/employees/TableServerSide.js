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
import { Close, Camera, Document, Globel2, Gallery} from '../components/icons/all_icons'
import '../../assets/scss/Modal.scss'
const domain_url = themeConfig.url

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Button, Input, Label, Row, Col } from 'reactstrap'
import { Home, Car, Settings, Download, Share, CloseIcon, DocIcon, Loader2 } from '../components/icons/all_icons'
import { element } from 'prop-types'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import "leaflet-routing-machine"
import { Navigate } from 'react-router-dom';

// let state
// state.dataTables = null
const DataTableServerSide = ({setTypeAlert, setHeadAlert, setTitleAlert, setShowAlert}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.dataTables)
  const {loader_show, setLoaderShow} = useContext(LoaderProvider);

  // console.log(state.dataTables)
  // ** States
  const [checked, setChecked] = useState([])
 
  // const [checked, setChecked] = useState({})
  const [tbleID, setTbleID] = useState([true, true, true, true, true, true, true])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [searchValue, setSearchValue] = useState('')
  const [picker, setPicker] = useState(new Date())
  
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')

  
  const [inspection_number, setInspection_number] = useState('')
  const [upload_number, setUpload_number] = useState('')
  const [got_number, setGot_number] = useState('')
  const [propose_number, setPropose_number] = useState('')
  
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showMapView, setShowMapView] = useState(false)

  
  const [selectedRowId, setSelectedRowId] = useState(null)
  
  const [query_roles, setQuery_roles] = useState('')
  const [selectedDBVal_type, setSelectedDBVal_type] = useState('')
  const [med_point, setMed_point] = useState(L.latLng(30.01686, 31.20343))
  const [map_data, setMap_data] = useState([])

  // modal employee
  const [role, setRole] = useState("")
  const [params, setParams] = useState("")
  const [config, setConfig] = useState("")
  const [verify, setVerify] = useState("")
  let roleValue = ""


  const [show_Modal, setShow_Modal] = useState(false)
  const handleClose = () => setShow_Modal(false)
  // const handleShow = () => setShow_Modal(true)

  const  VerfiyUnVerfiyUser = async (params, domain_url, config, verfiy) => {
    const newParams = params
    newParams['role_id'] = roleValue
    if (verfiy) {
      // console.log(newParams,"------ new")
      const result = await axios.post(`${domain_url}/user-verify`, newParams, config)
      // console.log(result, "result1")
  
    } else {
      const result = await axios.post(`${domain_url}/user-disable`, newParams, config)
      // console.log(result, "result2")
  
  
    }

    setShow_Modal(false)
  
  
  }

  const  VerifyUnVerfiyUser2 = async (params, domain_url, config, verfiy) => {
  
    if (verfiy) {
      const result = await axios.post(`${domain_url}/user-verify`, params, config)
      // console.log(result, "result1")
  
    } else {
      const result = await axios.post(`${domain_url}/user-disable`, params, config)
      // console.log(result, "result2")
  
  
    }
  
  
  }

  const handleVerify = () => {
    // setShow_Modal(true)
    // console.log("verify1")
    VerfiyUnVerfiyUser(params, domain_url, config, verify)
  }
  const handleRole = (role_id) => {
    // setShow_Modal(true)
    // console.log("verify1")
    // VerfiyUnVerfiyUser(params, domain_url, config, verify, role_id)
    roleValue = role_id
  }
  
  const Verify = () => {
    // console.log("handle verify 000")
  return (
    <>
    <Modal show={show_Modal} onHide={handleClose}>
    <Modal.Header className='background-F2F7FF'>
 
        <div className="col-6">
            <p className="emp-text pt-3">
                إختيار الوظيفة
            </p>
            </div>
        <div className="col-6 text-end">
            <a onClick={handleClose}>
                <Close width={24} height={24} color='none'/>
            </a>
        </div>

    </Modal.Header>

        <Modal.Body>
        
                <div className="row mt-4 mb-5">
                <Col sm='6' className='p-0'>
                <Col sm='12' className='mb-4  form-group bmd-form-group radio-border py-3'>
                  <Label className="form-check-label f-w-700 f-s-12px color-4D5761 md-2 ms-4" for="radio_collect_employee">
                  موظف سحب
                  </Label>
                    
                      <Input
                      type="radio"
                      id="radio_collect_employee"
                      name="employee_type"
                      className='float-end me-4 color-3261A8'
                      // checked = {role === "2"}
                      onClick={(e) => handleRole("2")}

                      />
                
                </Col>
                </Col>
                <Col sm='6' className='ps-md-2 pe-md-2 p-0'>
                  <Col sm='12' className='mb-4 form-group bmd-form-group radio-border py-3 '>
                  <Label className="form-check-label f-w-700 f-s-12px color-4D5761 ms-4" for="radio_restore_employee">
                  موظف إستعادة
                  </Label>
                  <Input
                    type="radio"
                    id="radio_restore_employee"
                    name="employee_type"
                    className='float-end me-4 color-3261A8'
                    // checked = {role === "3"}
                    onClick={(e) => handleRole("3")}
                   

                   />
                  </Col>
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

  
  const loadOptionsDB_jobs = [
    {value:'', label:'الموظفين' },
    { value:'1',  label:'مشرف' },
    { value:'2',  label:'موظف سحب' },
    { value:'3',  label:'موظف إستعادة' },
    { value:'4',  label:'جديد' }
  ]


  const handleDBInputChange_jobs = newValue => {
    setQuery_roles(newValue)
  }

  const handleDBChange_jobs = value => {
    // console.log(value)
    setSelectedDBVal_type(value.value)  
    setCurrentPage(1)
    dispatch(
      getData({
        page: 1,
        perPage: rowsPerPage,
        q: searchValue,
        typeId:value.value,
        from_date:date1,
        to_date:date2,
        setLoaderShow:setLoaderShow
      })
    )
  }

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue,
        typeId:selectedDBVal_type,
        from_date:date1,
        to_date:date2,
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
          page: 1,
          perPage: rowsPerPage,
          q: searchValue,
          typeId:selectedDBVal_type,
          from_date:datetime_1,
          to_date:datetime_2,
          setLoaderShow:setLoaderShow
        })
      )
     
        
    // console.log(datetime_1)
    setDate1(datetime_1)
    setDate2(datetime_2)  
    setPicker(e)
    setCurrentPage(1)
  }

  // ** Function to handle filter
  const handleFilter = e => {
    setSearchValue(e.target.value)
    setCurrentPage(1)
    dispatch(
      getData({
        page: 1,
        perPage: rowsPerPage,
        q: e.target.value,
        typeId:selectedDBVal_type,
        from_date:date1,
        to_date:date2,
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
        typeId:selectedDBVal_type,
        from_date:date1,
        to_date:date2,
        setLoaderShow:setLoaderShow
        
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function to handle per page
  const handlePerPage = e => {
    
    setCurrentPage(1)
    dispatch(
      getData({
        page: 1,
        perPage: parseInt(e.target.value),
        q: searchValue,
        typeId:selectedDBVal_type,
        from_date:date1,
        to_date:date2,
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

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      q: searchValue
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })
    // console.log("mohamed")
    // console.log(store.data)
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
      url: `${domain_url}/delete-user`,
      data: {
        user_id: selectedRowId
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
      console.log(response.data, "****")
      
      if (response.data.status !== 200) {
        setTypeAlert("Fail")
        setTitleAlert("لم يتم مسح الموظف بشكل صحيح.")
        setHeadAlert("حدث خطأ")
        setShowAlert(true)
        // console.log("done..")
        // console.log("Check1")
      } else {
        // console.log("done..n")
        setLoaderShow(false)
        setTypeAlert("Success")
        setTitleAlert("تم مسح الموظف بنجاح.")
        setHeadAlert("")
        setShowAlert(true)
        // console.log("Check2")
      }
      
        console.log("2done..")
    // setLoaderShow(false) 
      reload_table()
    })
    .catch(function (response) {
      //handle error
      console.log(response)
      setTypeAlert("Fail")
      setTitleAlert("لم يتم مسح الموظف بشكل صحيح.")
      setHeadAlert("حدث خطأ")
      setShowAlert(true)
      // console.log("Check1")
    setLoaderShow(false) 
      reload_table()
    })

  }
  const handleCloseMapView = () => setShowMapView(false)
 
  const deleteRowId = (id) => {
    setSelectedRowId(id)
    setShowConfirmDelete(true)

  }

  const handleShowModal = async (params, domain_url, config, verfiy) => {
    // console.log("modal shwong ...")
    setParams(params)
    setConfig(config)
    setVerify(verfiy)

    setShow_Modal(true)
    
  }

  const VerifyUser = (params, domain_url, config, verfiy, name) => {
    if (name === "زائر") {
      handleShowModal(params, domain_url, config, verfiy)

    } else {
      VerifyUnVerfiyUser2(params, domain_url, config, verfiy)

    }
    
  }

  const mapHandler = (id) => {

      const token = localStorage.getItem("token")
      // console.log(token)
      axios({
        method: "get",
        url: `${domain_url}/get-user-footprints?user_id=${id}`,
        headers: { 
          Authorization: `Bearer ${token}`,
          "app-lng": 'ar' 
        }
      })
      .then(function (response) {
        //handle success
        //handle success
        // console.log("Check")
        //  [
        //   {lat:30.01749, long: 31.20166},
        //   {lat:30.01686, long: 31.20343}
        //   {lat:30.01686, long: 31.20343}
        // ]
        const data = response.data.data.data
        const statistics = response.data.data.statistics
        // console.log(data)
        const all_lat_long = []
        let lat_m = 0
        let long_m = 0
        setInspection_number(statistics.user_search_car)
        setUpload_number(statistics.user_images_uploaded)
        setGot_number(statistics.collected_cars)
        setPropose_number(statistics.need_to_be_colctd)
        // console.log(data)
        // console.log(data.length)
        if(data.length>0){
          for (let i = 0; i < data.length; i++) {
            const lat = parseFloat(data[i].lat)
            const longit = parseFloat(data[i].long)
            if (lat < 60 & longit < 60) {
              all_lat_long.push(L.latLng(lat, longit))
              lat_m += lat
              long_m += longit
              // console.log(lat , longit)
            }
          }
          
          lat_m = lat_m / (data.length) 
          long_m = long_m / (data.length)

          console.log("Med")
          console.log(lat_m," , ",long_m)
          setMed_point(L.latLng(lat_m, long_m))
          setMap_data(all_lat_long)
          
          setShowMapView(true)
        }else{
          
        setTypeAlert("Fail")
        setTitleAlert("لا يوجد بيانات " )
        setHeadAlert("حدث خطأ ")
        setShowAlert(true)
        }
       
      })
      .catch(function (response) {
        //handle error
        console.log(response)
       
      })
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
                      هل انت متأكد من حذف الموظف؟
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

  function Routing() {
    const map = useMap()
  
    useEffect(() => {
      if (!map) return
      // console.log("map_data")
      // console.log(map_data)
      // console.log(med_point)
      const routingControl = L.Routing.control({
        waypoints: map_data,
        routeWhileDragging: false,
        reverseWaypoints: false,
        showAlternatives: false,
        lineOptions: {
          styles: [{color: 'red', opacity: 1, weight: 5}]
       }
      }).addTo(map)
  
      return () => map.removeControl(routingControl)
    }, [])
  
    return null
  }


  const Componet_row_with_icon = (props) => {
    const { Element_icon, name } = props
    return (
      <>
      <div className='row pt-3 m-0 pb-2'>
                          <div className='col-2'>
                            <div className='circlue_blue text-center pt-2'>

                              {Element_icon}
                            </div>
                              
                          </div>
                          <div className='col-10'>
                            <p className='font-Almarai color-1F2733 f-s-18px fw-800 pt-2'>{name}</p>
                          </div>
                        </div>
                        <hr className='p-0 m-0 w-100'></hr>
                        </>
    )
  }
  const MapViewItem = () => {

    return (
    <>
    <Modal className='bg_transparent map_main_divider' aria-labelledby="contained-modal-title-vcenter" size="xl" centered show={showMapView} onHide={handleCloseMapView}>
     <Modal.Header className='background-F2F7FF borderRadius-7'>
   
      <div className="col-6">
            <p className="modal-text-main pt-3 color-4788C6">
            أنشطة وتحركات  الموظف
            </p>
          </div>
          <div className="col-6 text-end">
            <a onClick={handleCloseMapView}>
              <CloseIcon width={24} height={24} color='#4D5761' />
            </a>
          </div>
  
      </Modal.Header>
  
          <Modal.Body className='bg_transparent p-0'>
            <div className='container-fluid'>
              <div className='row'>
              <div className='col-6 p-0 pt-3 pe-2'>
              <MapContainer className='container borderRadius-7' center={med_point} style={{ height: "70vh", width: "100%" }} zoom={15} scrollWheelZoom={false}>
                    
                    <TileLayer
                      attribution='Al Tayseer'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Routing/>
                  </MapContainer>

                </div>
                <div className='col-6 p-0 pt-3 ps-2 '>
                  <div className='container-fluid main_side_list'>
                    <Componet_row_with_icon Element_icon={<Camera width={20} height={20} color='#3261A8'/>} name={`تم فحص ${inspection_number} مَركبة`}/>
                    <Componet_row_with_icon Element_icon={<Gallery width={20} height={20} color='#3261A8'/>} name={`تم رفع ${upload_number} صورة`}/>
                    <Componet_row_with_icon Element_icon={<Globel2 width={20} height={20} color='#3261A8'/>} name={`تم سحب ${got_number} مركبة`}/>
                    <Componet_row_with_icon Element_icon={<Document width={20} height={20} color='#3261A8'/>} name={`تم تقديم ${propose_number} طلب تأكيد سحب مَركبة`}/>

                       
                  </div>
                    
                </div>
              </div>

            </div>
                  
         
  
          </Modal.Body>
          
  
      </Modal>
      </>
      )
  }

  function reload_table() {
    dispatch(
      getData({
        page: 1,
        perPage: rowsPerPage,
        q: searchValue,
        typeId:selectedDBVal_type,
        from_date:date1,
        to_date:date2,
        setLoaderShow:setLoaderShow
      })
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
    url: `${domain_url}/get-users?return_excel=1&start=1&length=500&draw=1`, //your url
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
    <div className="container-fluid p-3">
      <ConfirmDeleteItem />
      <MapViewItem />
      <Verify />

        <Row className='mx-auto mt-1 mb-50 container-fluid'>
          <Col className='col-md-2 col-12 row pt-1  mx-auto p-0'>
            <Input
              className=' input-filter-icon-search form-control mx-auto'
              type='text'
              id='search-input'
              placeholder="بحث"
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
          <Col className='col-md-4 col-12 mx-auto p-0'></Col>
          <Col className='col-md-6 col-12 row mx-auto p-0'>
          <Select
              defaultValue={loadOptionsDB_jobs[0]}
              options={loadOptionsDB_jobs}
              name='db-react-select'
              className='react-select p-0  pe-md-2 pt-2  ms-auto col-12 col-md-3'
              classNamePrefix='select-gray'
              placeholder='الوظيفة'
              onChange={handleDBChange_jobs}
              theme={selectThemeColors}
              onInputChange={handleDBInputChange_jobs}
            />

         
         
          <PickerRange className='  ps-0 pe-1 pt-1 col-12 col-md-4 mt-1' 
              dir="ltr"
              functionHandler = {setPickerHandler}
              picker = {picker} />
          <div className=' ps-2 pe-md-2 pe-0 pt-1 col-6 col-md-4 '>
              <Button.Ripple  className="button-transparent text-center px-4 w-100 button-excel ms-md-2"  onClick={() => exportExcelAll()}>
                
                <span className='align-middle me-2' >تصدير تحميل</span>
                <Share  width={19} height={19} color='#4788C6' />
            </Button.Ripple>
          </div>
          
          </Col>
        </Row>
        <div className='react-dataTable'>
          <DataTable 
            pagination
            paginationServer
            className='react-dataTable'
            noDataComponent={<EmptyTable />}
            columns={columns(deleteRowId, mapHandler, VerifyUser)}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            data={dataToRender()}
            
          />
        </div>
    </div>
  )
}

export default memo(DataTableServerSide)
