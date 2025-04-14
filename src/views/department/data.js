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
import { Loader2, SearchRefraction, CheckVerified, Globel,Edit3,Trash3 } from '../components/icons/all_icons'
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
export const columns = ((deleteHandler, viewHandler,can_edit_department,can_delete_department) => [
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
    name: 'اسم الإدارة',
    // maxWidth: '100px',
    sortable: true,
    cell: row => (
      <p className='table-black-font ms-1 f-s-12px f-w-400 font-Cairo color-5F605F'>
        {row.Dep_Name}
      </p>
    )
    
  },
  {
    name: 'اسم مدير الإدارة',
    // maxWidth: '100px',
    sortable: true,
    cell: row => (
      <p className='table-black-font ms-1 f-s-12px f-w-400 font-Cairo color-5F605F'>
        {row.Dep_Head_Name}
      </p>
  )
  },

  {
    name: 'البريد الإلكتروني لمدير الإدارة',
    // maxWidth: '100px',
    sortable: true,
    cell: row => (
      <a  className='color-5F605F ms-1 f-s-12px f-w-400 font-Cairo  pb-2'>
        {row.Dep_Head_email}
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
          {can_edit_department && (
            
          <a target='_blank' className="blue-color-icon blue-color-icon-h ps-3" href={`addDepartment?id=${row.id}`}><Edit3 size={20} /></a>
          )}
          {can_delete_department && (
          <a className="red-color-icon red-color-icon-h ps-3" onClick={() => deleteHandler(row.id)}><Trash3 size={20} /></a>
          )}
        </div>
      )
    }
  }
])
