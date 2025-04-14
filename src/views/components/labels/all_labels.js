export const Label1 = ({title}) => {
  // ** State
  return ( 
    <div className='color-gray-dark gray-open border-4 f-s-12px f-w-700 f-style-normal font-Almarai tag-padding'>
    {title}
    </div>
  )
}

export const Label2 = ({title}) => {
  // ** State
  return ( 
    <div className='color-green-dark green-open border-4 f-s-12px f-w-700 f-style-normal font-Almarai tag-padding'>
    {title}
    </div>
  )
}

export const Label3 = ({title}) => {
  // ** State
  return ( 
    <div className='color-red-dark red-open border-4 f-s-12px f-w-700 f-style-normal font-Almarai tag-padding'>
    {title}
    </div>
  )
}


export const LabelIcon1 = ({title, element_icon}) => {
  // ** State
  return ( 
    <div className='color-white orange-statues-open border-4 f-s-12px f-w-700 f-style-normal font-Almarai statues-padding'>
    {element_icon}
    <span className='ps-1 pe-1'>{title}</span>
    </div>
  )
}


export const LabelIcon2 = ({title, element_icon}) => {
  // ** State
  return ( 
    <div className='color-white blue-statues-open border-4 f-s-12px f-w-700 f-style-normal font-Almarai statues-padding'>
    {element_icon}
    <span className='ps-1 pe-1'>{title}</span>
    </div>
  )
}


export const LabelIcon3 = ({title, element_icon}) => {
  // ** State
  return ( 
    <div className='color-white green-statues-open border-4 f-s-12px f-w-700 f-style-normal font-Almarai statues-padding'>
    {element_icon}
    <span className='ps-1 pe-1'>{title}</span>
    </div>
  )
}

export const LabelIcon4 = ({title, element_icon}) => {
  // ** State
  return ( 
    <div className='color-white yellow-statues-open border-4 f-s-12px f-w-700 f-style-normal font-Almarai statues-padding'>
    {element_icon}
    <span className='ps-1 pe-1'>{title}</span>
    </div>
  )
}
