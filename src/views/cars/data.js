// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
import memoize from 'react-data-table-component'
import { Eye, Edit, FileText, Trash2, Loader, Globe } from 'react-feather'
import { Label1, Label2, Label3, LabelIcon1, LabelIcon2, LabelIcon3, LabelIcon4  } from '../components/labels/all_labels'
// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Styles
import "@src/assets/scss/pages/cars/table_elements.scss"
import { Loader2, SearchRefraction, CheckVerified, Globel } from '../components/icons/all_icons'
import { min } from 'moment/moment'
export let data

export const STATUES_CERTIFICATE = (props) => {
  const { type } = props 
  let item = ''
  if (type === 0) {
    item = <Label3 title = 'مطلوب إرفاق محضر التنفيذ' />
  } else if (type > 0) {
    item = <Label2 title='تم إرفاق المستند' />
  } else {
    item = <Label1 title='غير مطلوب' />
  }
  return item
}

function handle_exception_type(row) {
  
  try {
    return row.translations[0].type
  } catch (e) {
    try {
      return row.translations[1].type
    } catch (e) {
      return ""
    }
  }
}

function handle_exception(data) {
  try {
    return data
  } catch (e) {
    console.log("Error")
    console.log(e)
    return ""
  }
  
}

function formatTime(date) {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  // minutes = minutes < 10 ? `'0'${minutes}` : minutes  changed to 
  minutes = minutes < 10 ? `0${minutes}` : minutes
  const strTime = `${hours}:${minutes} `
  return strTime
}

function formatAMPM(date) {
  const hours = date.getHours()
  const ampm = hours >= 12 ? ' pm ' : ' am '
  const strTime = `${ampm}`
  return strTime
}
function formatAMPM_arabic(date) {
  const hours = date.getHours()
  const ampm = hours >= 12 ? ' م ' : ' ص '
  const strTime = `${ampm}`
  return strTime
}

export const GET_TIME_FORMAT = (props) => {
  const { time } = props
  console.log(time,"**1")

  if (time === null) {
    return ''
  } else {
    // const date = new Date(parseInt(time)) .... this gives wrong date 
    // edited to suit timstamp for unix created date
    const date = new Date(parseInt(time)*1000)

    
    // console.log(date)

    // return thetoday.toString() + "/" + themonth.toString() + "/" + theyear.toString() + " at " + 
    return (<div className="d-flex">
              <div className='ps-1 pe-1'>{formatAMPM(date)}</div>
              <div>{formatTime(date)}</div>
                <div className='ps-1 pe-1'>at</div>
              <div>{date.toLocaleDateString()}</div>
            </div>)
  }
}

export const GET_TIME_FORMAT_arabic = (props) => {
  const { time } = props
  console.log(time,"**1")

  if (time === null) {
    return ''
  } else {
    // const date = new Date(parseInt(time)) .... this gives wrong date 
    // edited to suit timstamp for unix created date
    const date = new Date(parseInt(time)*1000)

    
    // console.log(date)

    // return thetoday.toString() + "/" + themonth.toString() + "/" + theyear.toString() + " at " + 
    return (<div className="d-flex">
            <div className='ps-1 pe-1'>   {reformat_arabic_rtl_date_day_month_year(date.toLocaleDateString())}</div>
            <div></div>
              <div className='ps-1 pe-1'> {formatTime(date)} </div>
            <div>  {formatAMPM_arabic(date)}</div>
            </div>)
  }
}

export const GET_TIME_FORMAT2 = (props) => {
  const { time } = props

  if (time === null) {
    return ''
  } else {
    const date = new Date((time))
    console.log(time)
    // console.log(date)

    // return thetoday.toString() + "/" + themonth.toString() + "/" + theyear.toString() + " at " + 
    return (<div className="d-flex">
              <div className='ps-1 pe-1'>{formatAMPM(date)}</div>
              <div>{formatTime(date)}</div>
                <div className='ps-1 pe-1'>at</div>
              <div>{date.toLocaleDateString()}</div>
            </div>)
  }
}

export const GET_TIME_FORMAT2_arabic = (props) => {
  const { time } = props

  if (time === null) {
    return ''
  } else {
    const date = new Date((time))
    console.log(time)
    // console.log(date)

    // return thetoday.toString() + "/" + themonth.toString() + "/" + theyear.toString() + " at " + 
    return (<div className="d-flex">
    <div className='ps-1 pe-1'>   {reformat_arabic_rtl_date_day_month_year(date.toLocaleDateString())}</div>
    <div></div>
      <div className='ps-1 pe-1'> {formatTime(date)} </div>
    <div>  {formatAMPM_arabic(date)}</div>
    </div>)
  }
}

export const GET_TIME_FORMAT3 = (props) => {
  const { time } = props
  console.log(time, "***")

  if (time === null) {
    return ''
  } else {
    const date = new Date(parseInt(time))
    console.log(time)
    // console.log(date)

    // return thetoday.toString() + "/" + themonth.toString() + "/" + theyear.toString() + " at " + 
    return (<div className="d-flex">
              <div className='ps-1 pe-1'>{formatAMPM(date)}</div>
              <div>{formatTime(date)}</div>
                <div className='ps-1 pe-1'>at</div>
              <div>{date.toLocaleDateString()}</div>
            </div>)
  }
}

export const STATUES_Flag = (props) => {
  const { type } = props
  let item = ''
  let element_icon = ''
  if (type === '3') {
    element_icon = <Globel width={15} height={15} color='none'/>
    item = <LabelIcon4 title='تم السحب'
    element_icon = {element_icon}/>
  } else if (type === '4') {
    element_icon = <CheckVerified width={15} height={15} color='none'/>
    item = <LabelIcon3 title='تم الاستعادة'
    element_icon = {element_icon}/>

  } else if (type === 'hasSejelCertificted' | type === 'waitingSejelCertificted' | type === '2') {
    element_icon = <Globel width={15} height={15} color='none'/>
    item = <LabelIcon2 title='قيد التنفيذ'
    element_icon = {element_icon}/>

  } else {
    element_icon = <SearchRefraction width={15} height={15} color='none'/>
    item = <LabelIcon1 title='قيد الإنتظار'
    element_icon = {element_icon}/>
   
  }
  return item
}

function get_car_requests_status(row) {
  try {
    console.log(row.car_requests[0].status,"111")
    
  } catch (error) {
    
  }
  if (row.car_requests !=null) {
    if (row.car_requests.length > 0) {
      return row.car_requests[0].status
    } else {
      return null
    }
  } else {
    return null
  }
  
}

function getCollectedOrderNumber(row) {
  try {
    if (row.car_requests !=null) {
      if (row.car_requests.length > 0) {
        return row.car_requests[0].id
      } else {
        return "غير متاح"
      }
    } else {
      return "غير متاح"
    }
  } catch(e) {
    return "غير متاح"
  }
  
}


function get_car_requests_files_length(row) {
  if (row.car_requests !=null) {
  if (row.car_requests.length > 0) {
    return row.car_requests[0].files.length
  } else {
    return null
  }
} else {
  return null
}
}

function get_car_requests_collector_id(row) {
  if (row.car_requests !=null) {
  if (row.car_requests.length > 0) {
    return row.car_requests[0].collector.id
  } else {
    return null
  }
} else {
  return null
}
}
function get_car_requests_collector_name(row) {
  if (row.car_requests !=null) {
  if (row.car_requests.length > 0) {
    return row.car_requests[0].collector.name
  } else {
    return null
  }
} else {
  return null
}
}

function get_car_requests_collector_last_activity(row) {
  if (row.car_requests !=null) {
  if (row.car_requests.length > 0) {
    return row.car_requests[0].created_at
  } else {
    return null
  }
} else {
  return null
}
}


function get_car_requests_collector(row) {
  if (row.car_requests !=null) {
  if (row.car_requests.length > 0) {
    return row.car_requests[0].collector
  } else {
    return null
  }
} else {
  return null
}
}


function get_car_requests_yard_id(row) {
  if (row.car_requests !=null) {
  if (row.car_requests.length > 0) {
    return row.car_requests[0].yard.id
  } else {
    return null
  }
} else {
  return null
}
}
function get_car_requests_yard_name(row) {
  if (row.car_requests !=null) {
  if (row.car_requests.length > 0) {
    return row.car_requests[0].yard.name
  } else {
    return null
  }
} else {
  return null
}
}

function get_car_requests_yard_last_activity(row) {
  if (row.car_requests !=null) {

  if (row.car_requests.length > 0) {
    if (row.car_requests[0].yard !== null) {
      return row.car_requests[0].footprints.timestamp
    } else {
      return null
    }
  } else {
    return null
  }
} else {
  return null
}
}


function get_car_requests_yard(row) {
  if (row.car_requests !=null) {
  if (row.car_requests.length > 0) {
    return row.car_requests[0].yard
  } else {
    return null
  }
} else {
  return null
}
}

function reformat_arabic_rtl_date_day_month_year(date_string) {
  try {
    const date_parts = date_string.split("/")
    return date_parts[2] + "/" + date_parts[1] + "/" + date_parts[0] 
  } catch(e) {
    return 'غيرمتاح'
  }
}

function get_car_entering_data_arabic(row) {
  if (row.car_requests !=null) {
  if (row.car_requests.length > 0) {
    const d = row.created_at
    const date = new Date(d)
    return (<div className="d-flex">
    <div className='ps-1 pe-1'>   {reformat_arabic_rtl_date_day_month_year(date.toLocaleDateString())}</div>
    <div></div>
      <div className='ps-1 pe-1'> {formatTime(date)} </div>
    <div>  {formatAMPM_arabic(date)}</div>
  </div>)
    
  } else {
    return (<>  غير متاح
      </>)
  }
} else {
  return null
}
}
function get_car_entering_data(row) {
  if (row.car_requests !=null) {
  if (row.car_requests.length > 0) {
    const d = row.created_at
    const date = new Date(d)
    return (<div className="d-flex">
    <div className='ps-1 pe-1'>   {date.toLocaleDateString()}</div>
    <div>at </div>
      <div className='ps-1 pe-1'> {formatTime(date)} </div>
    <div>  {formatAMPM(date)}</div>
  </div>)
    
  } else {
    return (<>  غير متاح
      </>)
  }
} else {
  return null
}
}
function get_car_region(row) {
  if (row.car_requests !=null) {
  if (row.car_requests.length > 0) {
    return row.car_requests[0].location_address
  } else {
    return (<>  غير متاح
  </>)
  }
} else {
  return null
}
}


function get_car_request_lat(row,index) {
  if (row.car_requests !=null) {
  if (row.car_requests.length > 0) {
    return row.car_requests[index].lat
  } else {
    return (<>  غير متاح
  </>)
  }
} else {
  return null
}
}


function get_car_request_long(row,index) {
  if (row.car_requests !=null) {
  if (row.car_requests.length > 0) {
    return row.car_requests[index].long
  } else {
    return (<>  غير متاح
  </>)
  }
} else {
  return null
}
}

function get_car_color(row) {
  if (row.car_requests !=null) {
  if (row.translations.length > 0) {
    return row.translations[0].color
  } else {
    return (<>  غير متاح
  </>)
  }
} else {
  return null
}
}

function get_car_model(row) {
  if (row.car_model !=null){
    return row.car_model.name

  } else {
    return null
  }

}

function get_car_make(row) {
  if (row.car_brand !=null){
    return row.car_brand.name

  } else {
    return null
  }
}
function handlePlate(plate_ar){
  try{
    let splitted_plate_number_ar = ""
      let splitted_chasis_num_ar = ""
       
      let plate_number = plate_ar.replace('-','');
       let lll = plate_number.length
      splitted_plate_number_ar = `${plate_number[lll-1]} ${plate_number[lll-2]} ${plate_number[lll-3]}`
     
      if(lll == 7) {
        splitted_chasis_num_ar = `${plate_number[3]} ${plate_number[2]} ${plate_number[1]} ${plate_number[0]}`
      } else if(lll == 6) {
        splitted_chasis_num_ar = `${plate_number[2]} ${plate_number[1]} ${plate_number[0]}`
      } else if(lll == 5) {
        splitted_chasis_num_ar = `${plate_number[1]} ${plate_number[0]}`
      } else {
        splitted_chasis_num_ar = `${plate_number[0]}`
      }


      return `${splitted_plate_number_ar} ${splitted_chasis_num_ar} `
    
      
  } catch(e) {
    return ""
  }
}

function handlePlateEn(plate_ar){
  try{
    let splitted_plate_number_ar = ""
      let splitted_chasis_num_ar = ""
       
      let plate_number = plate_ar.replace('-','');
       let lll = plate_number.length
      splitted_plate_number_ar = `${plate_number[lll-3]} ${plate_number[lll-2]} ${plate_number[lll-1]}`
     
      if(lll == 7) {
        splitted_chasis_num_ar = `${plate_number[0]} ${plate_number[1]} ${plate_number[2]} ${plate_number[3]}`
      } else if(lll == 6) {
        splitted_chasis_num_ar = `${plate_number[0]} ${plate_number[1]} ${plate_number[2]}`
      } else if(lll == 5) {
        splitted_chasis_num_ar = `${plate_number[0]} ${plate_number[1]}`
      } else {
        splitted_chasis_num_ar = `${plate_number[0]}`
      }


      return `${splitted_plate_number_ar} ${splitted_chasis_num_ar} `
    
      
  } catch(e) {
    return ""
  }
}

function handleCellOverflow(cellValue) {
  return false
  

}


function get_request_id(row){
  if (row.car_requests.length>0){
    return row.car_requests[0].id
  }else{
    return null
  }
}
function handleCellOverflowValue(cellValue) {
  try{
    return cellValue.slice(0,20)
  } catch (e) {
    return ""
  }

}

// ** Table Common Column
export const columns = ((deleteHandler, viewHandler, showUploadCertificate) => [
  {
    name: 'الشركة',
    minWidth: '180px',
    sortable: row => row.company_name,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
        {row.company_name}
      </p>
  )
  },
  {
    name: 'رقم الشهادة',
    minWidth: '180px',
    sortable: row => row.sejel_number,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
        {row.sejel_number}
      </p>
  )
  },
  {
    name: 'تاريخ إصدار الشهادة',
    minWidth: '180px',
    sortable: true,
    cell: row => (
      <div className='d-flex align-items-center div_${sejel_date[row.id]}'>
        <div className='user-info text-truncate ms-1'>
        <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
        {row.sejel_date}
        </p>
        </div>
      </div>
    )
  },
  {
    name: 'رقم عقد المركبة',
    minWidth: '160px',
    sortable: true,
    cell: row => (
      <div className='d-flex align-items-center div_${contranct_number[row.id]} '>
        <div className='user-info text-truncate ms-1'>
        <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
        {row.contract_number}
        </p>
        </div>
      </div>
    )
  },
  {
    name: 'الحالة',
    minWidth: '130px',
    sortable: true,
    cell: row => (
      <div className='d-flex align-items-center div_${states[row.id]} '>
        <div className='user-info text-truncate ms-1'>
          <STATUES_Flag type={get_car_requests_status(row)} color="red"/>
        </div>
      </div>
    )
  },


  {
    name: 'محضر التنفيذ',
    minWidth: '200px',
    sortable: true,
    cell: row => (
      <div className='d-flex align-items-center div_${states[row.id]}'>
        <div className='user-info text-truncate ms-1'>
          <STATUES_CERTIFICATE type={get_car_requests_files_length(row)} color="red"/>
        </div>
      </div>
    )
  },
  
  {
    name: 'رقم طلب السحب',
    minWidth: '180px',
    sortable: true,
    cell: row => (
      <div className='d-flex align-items-center div_${customer_id[row.id]} '>
        <div className='user-info text-truncate ms-1'>
        <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
        {`${getCollectedOrderNumber(row)}`}
        </p>
        </div>
      </div>
    )
  },
  {
    name: 'الهوية',
    minWidth: '120px',
    sortable: true,
    cell: row => (
      <div className='d-flex align-items-center div_${customer_id[row.id]} '>
        <div className='user-info text-truncate ms-1'>
        <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
        {row.customer_id}
        </p>
        </div>
      </div>
    )
  },
  {
    name: 'اسم العميل',
    minWidth: '200px',
    sortable: true,
    cell: row => (
      // let customer = {row.customer_name}
      <div className='d-flex align-items-center div_${customer_name[row.id]}'>
        <div className='user-info text-truncate ms-1'>
        {(handleCellOverflow(row.customer_name)) ? 
        <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0 px-2'>
        {row.customer_name}
        </p>
         : 
          <p class="hovertext table-black-font f-s-12px f-w-400 font-Almarai m-0  px-2"  data-hover={row.customer_name}>
            {`${handleCellOverflowValue(row.customer_name)}`}
          </p>

      
        }
        </div>
      </div>
    )
  },
  {
    name: 'رقم اللوحة',
    minWidth: '250px',
    sortable: row => row.plate_number_ar,
    cell: row => (

        <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
          <span className='fs-15'>
            {`${handlePlate(row.plate_number_ar)}`}
          </span>
          &nbsp;&nbsp;
          <span className='boldOr'>||</span>
          &nbsp;&nbsp;
          <span className='fs-15'>
           {`${handlePlateEn(row.plate_number)}`}
           </span>
        </p>
    )
  },
  {
    name: 'نوع المركبة',
    minWidth: '180px',
    sortable: row => get_car_make(row),
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
        {get_car_make(row)}
      </p>
  )
  },
  {
    name: 'الطراز',
    minWidth: '120px',
    sortable: row => get_car_model(row),
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
        {get_car_model(row)}
      </p>
  )
  },
  {
    name: 'السنة',
    minWidth: '100px',
    sortable: row => row.manufacture_year,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
        {row.manufacture_year}
      </p>
  )
  },
  {
    name: 'اللون',
    minWidth: '100px',
    sortable: row => get_car_color(row),
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
        {get_car_color(row)}
      </p>
  )
  },
  {
    name: 'رقم الهيكل',
    minWidth: '200px',
    sortable: true,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
        {handle_exception(row.chassis_number)}
      </p>
  )
  },
  {
    name: 'نوع تسجيل المركبة',
    minWidth: '200px',
    sortable: true,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
        {handle_exception_type(row)}
      </p>
  )
  },
  {
    name: 'حساب المركبة',
    minWidth: '200px',
    sortable: true,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
        {handle_exception(row.price)}
      </p>
  )
  },

  {
    name: 'المتأخرات',
    minWidth: '200px',
    sortable: true,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
        {handle_exception(row.price_late)}
      </p>
  )
  },
  {
    name: 'إجراء السحب',
    minWidth: '250px',
    sortable: row => get_car_requests_collector_id(row),
    cell: row => (
      <div className='d-flex align-items-center'>
      {get_car_requests_collector(row) === null ? (
        <p className ='f-w-400 font-Almarai color-gray-white'>
          غير متاح
        </p>
      ) : (
        <div>
          <p className='table-black-font f-s-12px f-w-700 font-Almarai m-0'>
            {get_car_requests_collector_name(row)}
          </p>
          <div className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
            <GET_TIME_FORMAT2_arabic  time={get_car_requests_collector_last_activity(row)}/>
            {/* {row.car_requests[0].collector.created_at} */}
          </div>
        </div>
      )}
      </div>
  )
  },
  {
    name: 'إجراء الإستعادة',
    minWidth: '250px',
    sortable: row => get_car_requests_yard_id(row),
    cell: row => (
      <div className='d-flex align-items-center'>
      {get_car_requests_yard(row) === null ? (
        <p className ='f-w-400 font-Almarai color-gray-white'>
          غير متاح
        </p>
      ) : (
        <div>
        <p className='table-black-font f-s-12px f-w-700 font-Almarai m-0'>
          {get_car_requests_yard_name(row)}
        </p>
        <div className='table-black-font f-s-12px f-w-400 font-Almarai m-0'>
            <GET_TIME_FORMAT_arabic  time={get_car_requests_yard_last_activity(row)}/>
        </div>
      </div>
      )}
      </div>
      
  )
  },

  {
    name: 'الموقع',
    minWidth: '350px',
    sortable: row => get_car_region(row),
    cell: row => (
      <a class="d-flex align-items-center div_${customer_name[row.id]}" href={`https://maps.google.com/?q=${get_car_request_lat(row,0)},${get_car_request_long(row,0)}`} target="map">
        <div class="user-info text-truncate ms-1">
        <p class="hovertext2 table-black-font f-s-12px f-w-400 font-Almarai m-0 px-2 " data-hover={get_car_region(row)}>{get_car_region(row)} </p>
        </div>
        </a>
  )
  },
  {
    name: 'تاريخ /وقت إدخال المركبة فى النظام',
    minWidth: '300px',
    sortable: row => get_car_entering_data_arabic(row),
    cell: row => (
      <div className='table-black-font f-s-12px f-w-400 font-Almarai pb-2'>
        {get_car_entering_data_arabic(row)}
      </div>
  )
  },
  {
    name: <div className="text-end w-100">الإجراءات</div>,
    allowOverflow: true,
    cell: row => {
      const dd = get_car_requests_status(row)
      let b1_d = `blue-color-icon blue-color-icon-h d-none`
      let b2_d = "blue-color-icon blue-color-icon-h d-none"
      let b3_d = "blue-color-icon blue-color-icon-h d-none"
      let b4_d = "red-color-icon red-color-icon-h d-none"
      if (dd === '3') {
        b1_d = `blue-color-icon blue-color-icon-h px-2`
      } else if (dd === '4') {
        b1_d = `blue-color-icon blue-color-icon-h px-2`
      } else if (dd === 'hasSejelCertificted' | dd === 'waitingSejelCertificted' | dd === '2') {
        b1_d = `blue-color-icon blue-color-icon-h px-2`
        b2_d = `blue-color-icon blue-color-icon-h px-2`
        b3_d = `blue-color-icon blue-color-icon-h px-2`
    
      } else {
        b1_d = `blue-color-icon blue-color-icon-h px-2`
        b2_d = `blue-color-icon blue-color-icon-h px-2`
        b4_d = `red-color-icon red-color-icon-h px-2`
      }
      return (
        <div className='d-flex justify-content-end w-100'>
          <a className={b1_d} href={`/carDetails?id=${row.id}`}><Eye size={20}/></a>
          <a className={b2_d} href={`/addCar?id=${row.id}`}><Edit size={20} /></a>
          <a className={b3_d} onClick={() => showUploadCertificate(get_request_id(row), row.plate_number_ar, row.chassis_number, row.plate_number, row.chassis_number)}><FileText size={20} /></a>
          <a className={b4_d} onClick={() => deleteHandler(row.id)}><Trash2  size={20} /></a>
        </div>
      )
    }
  }
])
