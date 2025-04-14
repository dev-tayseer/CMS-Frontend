// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap'
import { Fileupload,FileCorrect,DeleteFile  } from '../components/icons/all_icons'
// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'
import { func } from 'prop-types'

const FileUploaderSingle = ({handleFileUpload, handleRemoveAllFiles, files, setFiles, setActivationStatues, setModal_animation}) => {
  // ** State
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: acceptedFiles => {
      setModal_animation(false)
      setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
    }
  })


  const renderFilePreview = file => {
    setModal_animation(false)
    if (files.length > 0) {
      setActivationStatues(true)
    } else {
      setActivationStatues(false)
    }


    return <FileCorrect />
    // if (file.type.startsWith('image')) {
    //   return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
    // } else {
    //   return <FileText size='28' />
    // }
  }

  const handleRemoveFile = file => {
    setModal_animation(false)
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
    if (files.length > 0) {
      setActivationStatues(true)
    } else {
      setActivationStatues(false)
    }
  }

  const renderFileSize = size => {
    setModal_animation(false)
    if (files.length > 0) {
      setActivationStatues(true)
    } else {
      setActivationStatues(false)
    }
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='object-file-container py-4 mt-2 d-flex align-items-center justify-content-between border-none'>
      <div className='file-details object-file-container d-flex align-items-center border-none'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button  outline size='sm' className='text-end' onClick={() => handleRemoveFile(file)}>
        <DeleteFile />
      </Button>
    </ListGroupItem>
  ))
  function select_file_default() {
    setModal_animation(false)
    e.preventDefault()
  }
  return (
    <>
    <Card className='p-3 w-100 m-0'>
      {/* <CardBody> */}
       

      

        
       
 
       
      {/* </CardBody> */}
      <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className='d-flex align-items-center justify-content-center flex-column p-3'>
            <Fileupload  />
            {/* <p className=' f-w-700 f-s-14px color-5F605F  p-3'> */}
            {/* onClick={e => select_file_default()} */}
              <div className='f-w-700 f-s-14px mt-2 color-5F605F'  >
              إرفاق مستند آخر
              </div>
              <div className='f-w-600 mt-2 f-s-14px color-5F605F'>
              إضغط لإرفاق المستند او اسحب واترك
              </div>
            {/* </p> */}
          </div>
        </div>  

        <div  className='col-sm-12mb-4 mt-4 form-group bmd-form-group'>
                {/* <div className='color-5F605F f-s-14px f-w-700 mb-3'>
                  المرفقات
                </div> */}
                <Fragment>
            <ListGroup className='my-2'>{fileList}</ListGroup>
          </Fragment>

      </div>
    </Card>
    {/* <div  className='col-sm-12mb-4 mt-4 form-group bmd-form-group'>
                <div className='color-5F605F f-s-14px f-w-700 mb-3'>
                  المرفقات
                </div>
                <Fragment>
            <ListGroup className='my-2'>{fileList}</ListGroup>
          </Fragment>
             
      </div> */}
      </>    
  )
}

export default FileUploaderSingle
