// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'


const MainSideBar = ({ open, toggleSidebar }) => {
  
  
  return (
    <Sidebar
      size='lg'
      open={open}
      title='New User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      
    </Sidebar>
  )
}

export default MainSideBar
