import documentIcon from "@src/assets/images/svg/documentIcon.svg"
import { DocumentIcon, Download} from '../icons/all_icons'

const CarDocuments = ({label, value}) => {
    const path = `https://mani.solidsolutionsegypt.net/${value}`
    return (
        
        <>
            <div className="col-md-4  mb-4" >
                <div className="col-12 carDataInner text-center">
                    <div className="row">
                <div className="col-4 spanCardDocument spanCardDocumentLogo">
                    {(value === "" || value === null) ? <DocumentIcon width="48" height="48"   color="#4788C6"  classes="ms-3"/> :
                    (
                        (label==="محضر التنفيذ") ? (
                            <div class="Circule_icon_holder ms-3">
                                <Download width="18" height="18"  color="#4788C6" classes="ms-3"/>
                            </div>
                        )
                        :
                        (<DocumentIcon width="48" height="48"  color="#6C737F" classes="ms-3"/>)
                         )
                          }
                    
                </div>
                <div className="col-8 text-start  mb-2 spanCardDocument">
                    <span className="pt-3 ms-2 mb-1 spanCardDocumentHeader d-block">{label}</span>
                    {(value === "" || value === null) ? <span className="mb-2 ms-2 d-block d-sm-inline mt-1 spanCardDocumentText "> غير متاح</span> : <a target="_blank" href={path}><span className="mb-2 mt-1 ms-2 d-block d-sm-inline spanCardDocumentText active"> تحميل المستند </span></a> } 
                </div>
                </div>
                </div>
            </div>
        </>
    )
    }
    export default CarDocuments