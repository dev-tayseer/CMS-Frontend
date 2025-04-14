// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
// import memoize from 'react-data-table-component'
import { Eye, Edit, FileText, Trash2, Loader, Globe } from 'react-feather'
// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Styles
import "@src/assets/scss/pages/cars/table_elements.scss"
import { Loader2, SearchRefraction, CheckVerified, Globel,Edit3,Trash3 , Eye3 } from '../components/icons/all_icons'
import themeConfig from "@configs/themeConfig";

const domain_url = themeConfig.url


const main_url = themeConfig.main_url

export let data

function get_repossessd(row) {
  if (row.statistics != null) {
    return row.statistics.repossessed_cars
  } else {
    return null
  }
}

function get_collected(row) {
  if (row.statistics != null) {
    return row.statistics.collected_cars
  } else {
    return null
  }
}


function get_pending(row) {
  if (row.statistics != null) {
    return row.statistics.pending_cars
  } else {
    return null
  }
}


function get_needtocollect(row) {
  if (row.statistics != null) {
    return row.statistics.need_to_be_colctd
  } else {
    return null
  }
}

function get_all_cars(row) {
  if (row.statistics != null) {
    return row.statistics.all_cars
  } else {
    return null
  }
}


function getCity(row){
  try{
    if(row.City.city_arabic === undefined){
      return "لايوجد"

    } else{
      return row.City.city_arabic

    }
  } catch(e){
      return "لايوجد"
  }
}


function getCountry(row){
  try{
    if(row.Country.name_arabic === undefined){
      return "لايوجد"

    } else{
      return row.Country.name_arabic

    }
  } catch(e){
      return "لايوجد"
  }
}
function getActivity(row){
  return row.comp_activ
  try{
    if(row.company_activity === undefined || row.company_activity === null){
      return "لايوجد"

    } else{
      return row.company_activity.label

    }
  } catch(e){
      return "لايوجد"
  }
}




function handleChangeCheck(e){
  // const {loader_show, setLoaderShow} = useContext(LoaderProvider);
  console.log(e.target.checked,"e.target.checked")
  console.log(e.target.id,"e.target.checked")
  // setLoaderShow(true)

  let company_id = e.target.id.split("_")[0]
  let checked = e.target.checked
  const token = localStorage.getItem("token")

  const bodyFormData = new FormData()

  bodyFormData.append('company_id', company_id)
  bodyFormData.append('checked', checked)

  setTimeout(function(){ 
  if (!checked){
    window.location.href = '/companies?checked=canceled'
    } else {
    window.location.href = '/companies?checked=confirmed'

    }
  }, 500);



  axios({
    method: "post",
    url: `${domain_url}/Company/ChangeBlackCompanies`,
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    }
  })
    .then(function (response) {
      console.log("contract.........",response.data.data[0]["updated"])

      if (response.data.data[0]["updated"] == "false") {
        console.log("not 2000")
        // setTypeAlert("Fail")
        // setTitleAlert(`${response.data[0]["message"]}`)
        
        // setHeadAlert(" حدث خطأ ")
        // setShowAlert(true)
        // setLoaderShow(false)
        // window.location.href = '/contracts?checked=error'

      }
      
      
      
      else {
        // setTypeAlert("Success")
        // setTitleAlert(`تم تعديل التجديد `)
        // setHeadAlert("  " )
        // setShowAlert(true)


        // navigate('/contracts?success=added')
      }
      
    })
    .catch(function (response) {
      console.log(response,"error")
      // window.location.href = '/contracts?checked=error'

      // setTypeAlert("Fail")
      // setTitleAlert(`لم يتم تعديل التجديد`)
      // setHeadAlert("حدث خطأ")
      // setShowAlert(true)
      // setLoaderShow(false)
    })

}


// ** Table Common Column
export const columns = ((deleteHandler, viewHandler , can_edit_company , can_delete_company) => [
  
  {
    name: 'الدول بالعربية',
    minWidth: '300px',
    sortable: row => true,
    cell: row => (
      <p className='table-black-font ms-1 f-s-12px f-w-400  font-Cairo color-5F605F'>
        {row.name_arabic}
      </p>
    )
    
  },
  {
    name: 'الدول بالانجيليزية',
    minWidth: '100px',
    sortable: row => true,
    cell: row => (
      <p className='table-black-font ms-1 f-s-12px f-w-400  font-Cairo color-5F605F'>
        {row.name}
      </p>
  )
  },
  

  {
    name: <div className="text-end w-100">الإجراءات</div>,
    minWidth: '100px',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex justify-content-end w-100'>


          {/* <a title='عرض' target='_blank' className="blue-color-icon blue-color-icon-h ps-3" href={`companyDetails?id=${row.id}`}><Eye3 size={20} /></a> */}
  
          {can_edit_company && (
            <a target='_blank' className="blue-color-icon blue-color-icon-h ps-3" href={`addNationalities?id=${row.id}`}><Edit3 size={20} /></a>
          )}
          {can_delete_company && (
           <a className="red-color-icon red-color-icon-h ps-3" onClick={() => deleteHandler(row.id)}><Trash3 size={20} /></a>
          )}
        </div>
      )
    }
  }
])
