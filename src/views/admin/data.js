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

function getRole(row){
  try{
    if(row.role.name === undefined){
      return ""

    } else{
      return row.role.name

    }
  } catch(e){
      return ""
  }
}


function getRoleobj(row){
  try{
    if(row.role.id === undefined){
      return ""

    } else{
      return row.role

    }
  } catch(e){
      return ""
  }
}
export const columns = ((deleteHandler, viewHandler,editUserHandle,editPermission,can_edit_perm,can_delete_perm,can_view_perm) => [

  // {
  //   name: '#',
  //   minWidth: '100px',
  //   sortable: row => true,
  //   cell: row => (
  //     <div className='ps-1'>
  //     <div className='table-black-font f-s-12px f-w-400 font-Cairo color-5F605F'>
  //       {row.id}
  //     </div>
  //     </div>
  //   )
    
  // },
  {
    name: 'اسم المشرف',
    minWidth: '200px',
    sortable: row => true,
    cell: row => (
      <p className='table-black-font ms-1 f-s-12px f-w-400 font-Cairo color-5F605F'>
        {row.fullName}
      </p>
    )
    
  },
  {
    name: 'اسم المستخدم',
    minWidth: '200px',
    sortable: row => true,
    cell: row => (
      <p className='table-black-font ms-1 f-s-12px f-w-400 font-Cairo color-5F605F'>
        {row.username}
      </p>
    )
    
  },
  {
    name: 'البريد الإلكتروني',
    minWidth: '250px',
    sortable: row => true,
    cell: row => (
      <p className='table-black-font ms-1 f-s-12px f-w-400 font-Cairo color-5F605F'>
        {row.email}
      </p>
  )
  },

  {
    name: 'الجوال',
    minWidth: '250px',
    sortable: row => true,
    cell: row => (
      <p className='table-black-font ms-1 f-s-12px f-w-400 font-Cairo color-5F605F'>
        {row.phone}
      </p>
  )
  },

  {
    name: 'الصلاحية',
    minWidth: '250px',
    sortable: row => true,
    cell: row => (
      <p className='table-black-font ms-2 f-s-12px f-w-400 font-Cairo color-5F605F'>
         {`${getRole(row)}`}
       
      </p>
  )
  },





  {
    name: <div className="text-end w-100">الإجراءات</div>,
    minWidth: '150px',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex justify-content-end w-100'>
          {can_edit_perm && (

            <a className="blue-color-icon blue-color-icon-h ps-3" onClick={() => editUserHandle(row.id,row.email,row.fullName,row.phone,getRoleobj(row))} ><Edit3 size={20} /></a>
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
