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

const domain_url = themeConfig.url
// import { ExcelLink } from 'react-csv'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
import { Car, Settings, Download, Share, CloseIcon } from '../components/icons/all_icons'

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

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [searchValue, setSearchValue] = useState('')
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [drawData, setDrawData] = useState(1)

  
  const [query_users, setQuery_Users] = useState('')
  const [selectedDBVal_users, setSelectedDBVal_Users] = useState('')

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        draw: drawData,
        perPage: rowsPerPage,
        q: searchValue,
        userId:selectedDBVal_users,
        setLoaderShow:setLoaderShow
      })
    )
   
  }, [dispatch])


  // ** Function to handle filter
  const handleFilter = e => {
    setSearchValue(e.target.value)

    dispatch(
      getData({
        page: currentPage,
        draw: drawData,
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
        draw: drawData,
        perPage: rowsPerPage,
        q: searchValue,
        userId:selectedDBVal_users,
        setLoaderShow:setLoaderShow
      })
    )
    setCurrentPage(page.selected + 1)
    setDrawData(page.selected + 1)
  }

  // ** Function to handle per page
  const handlePerPage = e => {
    setCurrentPage(1)
    dispatch(
      getData({
        page: 1,
        draw: drawData,
        perPage: parseInt(e.target.value),
        q: searchValue,
        userId:selectedDBVal_users,

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
  

  const handleDBChange_users = (value) => {
    setSelectedDBVal_Users(value.id)  
    console.log("users", value.id)
    console.log("users", selectedDBVal_users)
    setCurrentPage(1)
    dispatch(
      getData({
        page: currentPage,
        draw: drawData,
        perPage: rowsPerPage,
        q: searchValue,
        userId:value.id,
        setLoaderShow:setLoaderShow
      })
    )  
  }

  const handleDBInputChange_users = newValue => {
    setQuery_Users(newValue)
    // console.log(newValue, "Commmmm")
  }

  const loadOptionsDB_users = () => {
    
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

    return axios.get(`${domain_url}/get-users?length=100000000&start=0`, config, { query_users }).then(res => {
      
      const reponse = res.data.data.original.data
      
      const data = []
      data.push({ id:'', value:'All', label:'الكل' })
      for (let i = 0; i < reponse.length; i++) {
        data.push({
          id:reponse[i].id,
          value:(reponse[i].name),
          label:(reponse[i].name)
        })
      }
      // console.log(data)
      setLoaderShow(false)
      return data
    })

  }
  

  return (
    <div className="row ">
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
          <Col className="col-md-8 col-12"></Col>
          <Col className='col-md-2 col-12 row mx-auto p-0'> 
          
          <AsyncSelect
          defaultOptions
          isClearable={false}
          name='db-react-select'
          className='react-select p-0  pt-1 w-100 col-md-2 mx-auto'
          classNamePrefix='select'
          placeholder='الموظفين'
          onChange={handleDBChange_users}
          theme={selectThemeColors}
          loadOptions={loadOptionsDB_users}
          onInputChange={handleDBInputChange_users}
            />

            </Col>
        </Row>
        <div className='react-dataTable'>
          <DataTable noHeader
            pagination
            paginationServer
            className='react-dataTable'
            noDataComponent={<EmptyTable />}
            columns={columns()}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            data={dataToRender()}
          />
        </div>
    </div>
  )
}

export default memo(DataTableServerSide)
