import documentIcon from "@src/assets/images/svg/documentIcon.svg"
// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import { saveAs } from "file-saver"

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap'
import { Icongraphy } from '../icons/all_icons'
// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'
import axios from "axios"

const UploadElementData = ({ main, handleFileUpload, handleRemoveAllFiles, files, setFiles, fileUrlExists, fileUrl }) => {
    // ** State
    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        accept: {
            'application/pdf': []
          },
        onDrop: acceptedFiles => {
     setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])     
        }
    })

    const renderFilePreview = file => {
        if (file.type.startsWith('image')) {
            return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
        } else {
            return <FileText size='28' />
        }
    }

    const handleRemoveFile = file => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter(i => i.name !== file.name)
        setFiles([...filtered])
    }

    const renderFileSize = size => {
        if (Math.round(size / 100) / 10 > 1000) {
            return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
        } else {
            return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
        }
    }

    const fileList = files.map((file, index) => (
        <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
                <div className='file-preview me-1'>{renderFilePreview(file)}</div>
                <div>
                    <p className='file-name mb-0'>{file.name}</p>
                    <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
                </div>
            </div>
            <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
                <X size={14} />
            </Button>
        </ListGroupItem>
    ))

    function makeid(length) {
        let result           = ''
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }
    

    const PdfElement = () => {
        if (fileUrlExists) {
            fileUrl = `${fileUrl}?${makeid(15)}`
            
            return (
                <div className="background-F3F4F6 holder-border mt-4 p-3 mx-auto">
                    <iframe className="m-auto w-100" height={400} src={fileUrl}  type="application/pdf"/>
                    
                    <a href={fileUrl} download={main} target={main} className="waves-effect btn-icon w-100 background-FFFFFF border-none mt-3 btn btn-white">
                        <p className="color-4788C6 f-s-14px f-w-700 font-Almarai m-auto">تحميل  او مشاهدة المستند</p>
                    </a>


                </div>
            )
        } else {
            return null
        }
        
    }
    
    return (
        <div className="container-fluid mb-5">
            <div className="row m-0">
                <Card className='p-3 w-100 m-0 background-F9FAFB'>
                    <CardBody>
                        {files.length ? (
                            <Fragment>
                            <ListGroup className='my-2'>{fileList}</ListGroup>
                            <div className='d-flex justify-content-end'>
                              <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                                إلغاء
                              </Button>
                              <Button color='primary ' onClick={handleFileUpload}>رفع</Button>
                            </div>
                          </Fragment>

                        ) : (
                            <div >
                                <p className=" color-1F2733 f-s-20px f-w-800  font-Almarai">
                                    {main}
                                </p>
                                <div className="" {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    <div className='d-flex align-items-center justify-content-center flex-column p-3 background-FFFFFF uploader-border'>
                                        <Icongraphy width={48} height={48} />
                                        <p className='font-Almarai f-w-700 f-s-14px color-4788C6  p-3'>
                                            <a href='/' className="no-decoration" onClick={e => e.preventDefault()}>
                                                اضغط لرفع المستند
                                            </a>
                                        </p>
                                    </div>

                                </div>
                                <PdfElement/>
                            </div>


                        )}
                    </CardBody>
                </Card>
            </div>
        </div>

    )
}

export default UploadElementData
