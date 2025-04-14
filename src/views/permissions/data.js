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
import { Loader2, SearchRefraction, CheckVerified, Globel,Edit3,Trash3,Admin } from '../components/icons/all_icons'
export let data

function handleEditUser(value){
  console.log("handle edit")
}
// ** Table Common Column
export const columns = ((deleteHandler, viewHandler,editUserHandle,editPermission,can_edit_perm,can_delete_perm,can_view_perm) => [

  {
    name: '#',
    minWidth: '100px',
    sortable: row => true,
    cell: row => (
      <div className='ps-1'>
      <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
        {row.id}
      </div>
      </div>
    )
    
  },
  {
    name: 'الاسم ',
    minWidth: '200px',
    sortable: row => true,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
        {row.name}
      </p>
    )
    
  },

  {
    name: 'الاسم بالإنجليزي',
    minWidth: '200px',
    sortable: row => true,
    cell: row => (
      <p className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
        {row.name_en}
      </p>
    )
    
  },


  {
    name: <div className="text-end pe-4 w-100">الإجراءات</div>,
    minWidth: '150px',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex justify-content-end w-100'>
          {can_edit_perm && (
          <a className="blue-color-icon blue-color-icon-h ps-3" onClick={() => editUserHandle(row.id,row.name,row.name_en)} ><Edit3 size={20} /></a>
          )}
          {can_view_perm && (

          <a className="blue-color-icon blue-color-icon-h ps-3" onClick={() => editPermission(row.id)} ><Admin size={20} /></a>
          )}
          {can_delete_perm && (

          <a className="red-color-icon red-color-icon-h ps-3" onClick={() => deleteHandler(row.id)}><Trash3 size={20} /></a>
          )}
        </div>
      )
    }
  }
])
