// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
// import memoize from 'react-data-table-component'
import { Eye, Edit, FileText, Trash2, Loader, Globe } from 'react-feather'
import { Label1, Label2, Label3, LabelIcon1, LabelIcon2, LabelIcon3, LabelIcon4  } from '../components/labels/all_labels'
// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Styles
import "@src/assets/scss/pages/cars/table_elements.scss"
import { Loader2, SearchRefraction, CheckVerified, Globel } from '../components/icons/all_icons'
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
// ** Table Common Column
export const columns = ((deleteHandler, viewHandler) => [
  {
    name: 'رقم المعرف',
    minWidth: '10px',
    sortable: row => row.id,
    cell: row => (
      <div className='ps-1'>
      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        {row.id}
      </p>
      </div>
    )
    
  },
  {
    name: 'الاسم',
    minWidth: '190px',
    sortable: row => row.name,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        {row.name}
      </p>
    )
    
  },
  {
    name: 'رقم التواصل',
    minWidth: '150px',
    sortable: row => row.phone,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        {row.phone}
      </p>
  )
  },

  {
    name: 'البريد الإلكتروني',
    minWidth: '250px',
    sortable: row => row.email,
    cell: row => (
      <a href={`mailto:${row.email}`} className='cursor_hand table-black-font f-s-12px f-w-700 font-Almarai color-4788C6 pb-2'>
        {row.email}
      </a>
    )
  },
  
  {
    name: 'العنوان الوطني',
    minWidth: '400px',
    sortable: row => row.address,
    cell: row => (
      <div className='table-black-font f-s-12px f-w-400 font-Almarai address'>
        {row.address}
      </div>
    )
  },
  {
    name: 'الإجمالي',
    minWidth: '150px',
    sortable: row => get_all_cars(row),
    cell: row => (
      <div className='px-1'>
      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        {get_all_cars(row)}
      </p>
      </div>
    )
  },
  {
    name: 'قيد الانتظار',
    minWidth: '150px',
    sortable: row => get_needtocollect(row),
    cell: row => (
      <div className='px-1'>

      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        {get_needtocollect(row)}
      </p>
      </div>
    )
  },
  {
    name: 'قيد التنفيذ',
    minWidth: '150px',
    sortable: row => get_pending(row),
    cell: row => (
      <div className='px-1'>
      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        {get_pending(row)}
      </p>
      </div>
    )
  },
  {
    name: <div>تم السحب</div>,
    minWidth: '150px',
    sortable: row => get_collected(row),
    cell: row => (
      <div className='px-1'>
      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        {get_collected(row)}
      </p>
      </div>
    )
  },
  {
    name: 'تم الإستعادة',
    minWidth: '150px',
    sortable: row => get_repossessd(row),
    cell: row => (
      <div className='px-1'>
      <p className='table-black-font f-s-12px f-w-400 font-Almarai'>
        {get_repossessd(row)}
      </p>
      </div>
  )
  },
  {
    name: <div className="text-end w-100">الإجراءات</div>,
    minWidth: '150px',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex justify-content-end w-100'>
          <a className="blue-color-icon blue-color-icon-h ps-3" href={`addCompany?id=${row.id}`}><Edit size={20} /></a>
          <a className="red-color-icon red-color-icon-h ps-2" onClick={() => deleteHandler(row.id)}><Trash2 size={20} /></a>
        </div>
      )
    }
  }
])
