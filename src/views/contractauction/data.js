// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
// import memoize from 'react-data-table-component'
import { Eye, Edit, FileText, Trash2, Loader, Globe, AlignCenter } from 'react-feather'
// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Styles
import "@src/assets/scss/pages/cars/table_elements.scss"
import { Loader2, SearchRefraction, CheckVerified, Globel, Edit3, Trash3 } from '../components/icons/all_icons'
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

export const Splitbyspace2 = ({ value }) => {
  var finalresult = value
  var inputString = value;
  var result = inputString.split(" ");
  console.log(result[0]); // Output: ["-52", "يوم/أيام"]

  if (!isNaN(result[0]) && parseFloat(result[0]) < 0) {
    // Change the sign of result[0]
    result[0] = -parseFloat(result[0]);
    finalresult = result[0] + "- " + result[1]
  }

  return finalresult

}

export const Splitbyspace = ({ value }) => {
  var finalresult = value
  var inputString = value;
  var result = inputString.split(" ");
  console.log(result[0]); // Output: ["-52", "يوم/أيام"]

  if (!isNaN(result[0]) && parseFloat(result[0]) <= 0) {
    // Change the sign of result[0]
    result[0] = -parseFloat(result[0]);
    finalresult = 0 + " " + result[1]
  }

  return finalresult

}


// ** Table Common Column
export const columns = ((deleteHandler, viewHandler, can_edit_department, can_delete_department) => [
  // {
  //   name: '#',
  //   // maxWidth: '10px',
  //   sortable: true,
  //   cell: row => (
  //     <div className='ps-1'>
  //     <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
  //       {row.id}
  //     </div>
  //     </div>
  //   )

  // },
  {
    name: 'تاريخ بداية العقد',
    // maxWidth: '100px',
    sortable: true,
    cell: row => (
      <a className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
        {row.Start_Date_of_Contract}
      </a>
    )

  },
  {
    name: 'تاريخ نهاية العقد',
    // maxWidth: '100px',
    sortable: true,
    cell: row => (
      <a className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
        {row.End_Date_of_Contract}
      </a>
    )
  },

  {
    name: 'مدة العقد',
    // maxWidth: '100px',
    sortable: true,
    cell: row => (
      <a className='color-5F605F f-s-12px f-w-400 font-Cairo  '>
        {row.Tenure}
      </a>
    )
  },

  {
    name: 'المتبقي على إنتهاء العقد',
    minWidth: '150px',
    sortable: true,
    cell: row => (
      <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
        <div className=''>
          {row.End_Tenure && (

            <Splitbyspace value={row.End_Tenure} />
          )}
          {/* <Splitbyspace value={row.End_Tenure} /> */}
          {/* {row.End_Tenure}   */}
        </div>
      </div>
    )
  },

  {
    name: 'عدد السيارات المباعة',
    // maxWidth: '100px',
    minWidth: '150px',
    sortable: true,
    cell: row => (
      <a className='color-5F605F f-s-12px f-w-400 font-Cairo  '>
        {row.sold_car_number}
      </a>
    )
  },

  {
    name: 'إجمالي قيمة العقد',
    // maxWidth: '100px',
    sortable: true,
    cell: row => (
      <a className='color-5F605F f-s-12px f-w-400 font-Cairo  '>
        {row.total_amount}
      </a>
    )
  },

  {
    name: 'تفاصيل السيارة',
    // maxWidth: '100px',
    sortable: true,
    cell: row => (
      <a className='color-5F605F f-s-12px f-w-400 font-Cairo  '>
        {row.car_details}
      </a>
    )
  },



  {
    name: 'نوع الإيجار',
    // maxWidth: '100px',
    sortable: true,
    AlignCenter: true,
    cell: row => (
      <div className='text-center'>
        <a className='color-5F605F f-s-12px f-w-400 font-Cairo  '>
          {row.type_of_Auction == "1" ? "فرد" : "شركة"}
        </a>
      </div>
    )
  },

  {
    name: 'رقم الهوية',
    // maxWidth: '100px',
    sortable: true,
    cell: row => (
      <a className='color-5F605F f-s-12px f-w-400 font-Cairo  '>
        {row.identity_number}
      </a>
    )
  },

  {
    name: 'هوية اقامة نظامية',
    // maxWidth: '100px',
    sortable: true,
    cell: row => (
      <a className='color-5F605F f-s-12px f-w-400 font-Cairo  '>
        {row.identity_number_systematic}
      </a>
    )
  },

  {
    name: 'هوية مقيم خليجي',
    // maxWidth: '100px',
    sortable: true,
    cell: row => (
      <a className='color-5F605F f-s-12px f-w-400 font-Cairo  '>
        {row.identity_number_gulf}
      </a>
    )
  },


  {
    name: 'الرقم الموحد',
    // maxWidth: '100px',
    sortable: true,
    cell: row => (
      <a className='color-5F605F f-s-12px f-w-400 font-Cairo  '>
        {row.Unified_No}
      </a>
    )
  },

  {
    name: 'رقم السجل',
    // maxWidth: '100px',
    sortable: true,
    cell: row => (
      <a className='color-5F605F f-s-12px f-w-400 font-Cairo  '>
        {row.commercial_number2}
      </a>
    )
  },

  {
    name: <div className="text-end w-100">الإجراءات</div>,
    // maxWidth: '100px',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex justify-content-end w-100'>

          <a target='_blank' className="blue-color-icon blue-color-icon-h ps-3" href={`addContractAuction?id=${row.id}`}><Edit3 size={20} /></a>
          <a className="red-color-icon red-color-icon-h ps-3" onClick={() => deleteHandler(row.id)}><Trash3 size={20} /></a>
        </div>
      )
    }
  }
])
