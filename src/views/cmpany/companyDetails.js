// ** React Imports
import React, { Fragment, useState, useEffect, useContext } from 'react'
import { LoaderContext, LoaderProvider } from "../../utility/context/LoaderContext";
import axios from "axios"

import "@src/assets/scss/pages/cars/carDetails.scss"

import Modal from 'react-bootstrap/Modal'
import { CloseIcon, FileCorrect, Trash3 } from '../components/icons/all_icons'
import themeConfig from "@configs/themeConfig";
import HomeHeader from "../components/home/HomeHeader"
import { exec } from 'apexcharts';

const domain_url = themeConfig.url


// {/* end car details row component */}

const ContractDetails = () => {
  const { loader_show, setLoaderShow } = useContext(LoaderProvider);
  // const [carId, setCarId] = useState("")
  

  const [name, setName] = useState("")
  const [company_type, setcompany_type] = useState("")
  const [CR_Number, setCR_Number] = useState("")
  const [Unified_No, setUnified_No] = useState("")
  const [phone, setphone] = useState("")
  const [email, setemail] = useState("")
  const [finance_manager, setfinance_manager] = useState("")
  const [finance_manager_number, setfinance_manager_number] = useState("")
  const [finance_person, setfinance_person] = useState("")
  const [finance_person_number, setfinance_person_number] = useState("")
  const [country, setcountry] = useState("")
  const [city, setcity] = useState("")
  const [identity_name, setidentity_name] = useState("")
  const [identity_number, setidentity_number] = useState("")
  const [comp_activ, setcomp_activ] = useState("")

  



  const fillData = async () => {
    setLoaderShow(true)
    const token = localStorage.getItem("token")


    var data = new FormData();
    const search = window.location.search
    const params = new URLSearchParams(search)
    const contractId = params.get('id')
    try{
      const seen = params.get('seen')
      const notif_id = params.get('notif_id')
      setIdContract(contractId)
      console.log(seen,notif_id,"seen noti")

      var data = new FormData();
      data.append('cont_id', contractId);
      
      var config = {
        method: 'post',
        url: `${domain_url}/api/Notications?not_id=${notif_id}`,
        headers: { 
          'Authorization': `Bearer ${token}`, 
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data),"seen");
      })
      .catch(function (error) {
        console.log(error,"err");
      });
      

    } catch(e){

    }

    var config = {
      method: 'get',
      url: `${domain_url}/Company/AddCompany/?id=${contractId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response,"response company .......")
        try{
          console.log(response.data[0],"1111111")
          setName(response.data[0].Company_Name)
          setcompany_type(response.data[0].company_type)
          setCR_Number(response.data[0].CR_Number)
          setUnified_No(response.data[0].Unified_No)
          setphone(response.data[0].Phone_No)
          setemail(response.data[0].Email)
          setfinance_manager(response.data[0].finance_manager)
          setfinance_manager_number(response.data[0].finance_manager_number)
          setfinance_person(response.data[0].finance_person)
          setfinance_person_number(response.data[0].finance_person_number)
          setcountry(response.data[0].Country.name_arabic)
          setcity(response.data[0].City.city_arabic)
          setidentity_name(response.data[0].identity_name)
          setidentity_number(response.data[0].identity_number)
          setcomp_activ(response.data[0].comp_activ)

        } 
        
        catch (e) {
          console.log(e)
  
        }

      })
      .catch(function (error) {
        console.log(error);
      });

    setLoaderShow(false)
  }
  useEffect(() => {
    console.log("loadiing ")
    fillData()
  }, [])


  function handleDelete(obj,row_id){
    if(can_delete){
      console.log("deleting")
      setcan_delete(false)
      var data = new FormData();
      const token = localStorage.getItem('token')
      
      var config = {
        method: 'delete',
        url: `${domain_url}/Contract/NewDate/?id=${idContract}&date_id=${obj.id}`,
        headers: { 
          'Authorization': `Bearer ${token}`, 
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        document.getElementById(row_id).remove()
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }
    else{
      console.log("not deleting ")
    }
    console.log("delete id", obj)
  }

  const handleCloseConfirmDelete = () => setShowConfirmDelete(false)
  const handleConfirmDelete = () => {
    console.log('deleteRowId: ', selectedRowId)
    setShowConfirmDelete(false)

  }
  const ShapeStatus = ({type}) => {
    console.log(type,type=="1","hany .......")
     let item = ''
     if (type == "سارية"){
       item =  <div class='px-3 py-2 active-status'>ساري</div>
     }
     else if (type == "منتهية"){
       item =  <div class='px-3 py-2 finished-status'>منتهية</div>
   
     }
     else if(type == "غير سارية") {
       item =  <div class='px-3 py-2 not-active-status'>غير ساري</div>
   
     }
     else {
       item =  <div class='px-3 py-2 finished-status'></div>
   
     }
     return item
   }

   const ShapeDate = ({type,date}) => {
    console.log(type,type=="1","hany .......")
     let item = ''
     if (type == "سارية"){
       item =  
       <div class='px-3 py-2 active-status h-100 text-center'>{date}
       <div className='contract-element-text text-center py-2'>تاريخ نهاية  العقد</div>

       </div>
     }
     else if (type == "منتهية"){
       item = 
        <div class='px-3 py-2 finished-status h-100 text-center'>{date}
               <div className='contract-element-text text-center py-2'>تاريخ نهاية  العقد</div>

        </div>
   
     }
     else if(type == "غير سارية") {
       item =  <div class='px-3 py-2 not-active-status h-100 text-center'>{date}
              <div className='contract-element-text text-center py-2'>تاريخ نهاية  العقد</div>

       </div>
   
     }
     else {
       item =  <div class='px-3 py-2 finished-status h-100 text-center'>{date}
              <div className='contract-element-text text-center py-2'>تاريخ نهاية  العقد</div>

       </div>
   
     }
     return item
   }
  const ConfirmDeleteItem = () => {

    return (<Modal aria-labelledby="contained-modal-title-vcenter" centered show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
      <Modal.Header className='background-FEE4E2'>

        <div className="col-6">
          <p className="modal-text-main pt-3">
            تأكيد الحذف
          </p>
        </div>
        <div className="col-6 text-end">
          <a onClick={handleCloseConfirmDelete}>
            <CloseIcon width={24} height={24} color='#4D5761' />
          </a>
        </div>

      </Modal.Header>

      <Modal.Body>

        <div className="row">
          <p className="confirm-logout-text pt-4 pb-5 mb-5">
            هل انت متأكد من حذف المركبة؟
          </p>

        </div>
        {/* <hr/> */}

      </Modal.Body>
      <Modal.Footer>
        <div className="row buttons-row pt-3 pb-3">
          <div className="col-6  ">
            <a className="text-center block btn-cancel text-center  p-3 w-100" onClick={handleCloseConfirmDelete}>
              إلغاء
            </a>
          </div>
          <div className="col-6  ">
            <a className="text-center block btn-accept text-center  p-3 w-100" onClick={handleConfirmDelete}>
              حذف
            </a>
          </div>
        </div>
      </Modal.Footer>

    </Modal>
    )
  }


  
  

  return (

    <div className="theme-content">
      {/* <ConfirmDeleteItem/> */}
      <div className="container container2 ps-md-0 pe-md-0">
        <HomeHeader headerContract="نظام إدارة العقود" headerContract2="الشركات" headerContractObj="تفاصيل الشركة" urlMain="/companies" />

        <div className='row f-w-700 f-s-24px color-5F605F  '>تفاصيل الشركة</div>
        <div className='row mt-4 contract-details-container mb-4 pb-4'>
          <div className='d-md-flex justify-content-between pt-3 px-3'>
            <div className='color-5F605F f-s-20px f-w-700'>
              اسم الشركة : {name}
            </div>
            {/* contract-type-container */}
            <div className=' text-center px-3 py-2 active-status mt-3 mt-md-0 px-4 py-2'>
              
              {company_type == "0" ? "ليست قائمة سوداء" : "قائمة سوداء"}
            </div>
          </div>
          <div className='row mt-md-4 '>

            <div className='col-md-6 mt-3 mt-md-0 ps-4 '>
              <div className='col-12 contract-element h-100'>
                <div className='contract-element-value text-center py-2'>{CR_Number}</div>
                <div className='contract-element-text text-center py-2'>السجل التجاري</div>
              </div>
            </div>
            <div className='col-md-6 mt-3 mt-md-0 ps-4 '>
              <div className='col-12 contract-element h-100'>
                <div className='contract-element-value text-center py-2'>{Unified_No}</div>
                <div className='contract-element-text text-center py-2'>الرقم الموحد</div>
              </div>
            </div>
          

          </div>

          <div className='row mt-md-4 '>

            <div className='col-md-6 mt-3 mt-md-0 ps-4 '>
              <div className='col-12 contract-element h-100'>
                <div className='contract-element-value text-center left-dir py-2'>{phone}</div>
                <div className='contract-element-text text-center py-2'>رقم الهاتف</div>
              </div>
            </div>
            <div className='col-md-6 mt-3 mt-md-0 ps-4 '>
              <div className='col-12 contract-element h-100'>
                <div className='contract-element-value text-center py-2'>{email}</div>
                <div className='contract-element-text text-center py-2'>البريد الإلكتروني</div>
              </div>
            </div>
          

          </div>
          <div className='row mt-md-4 '>

          <div className='col-md-6 mt-3 mt-md-0 ps-4 '>
            <div className='col-12 contract-element h-100'>
              <div className='contract-element-value text-center py-2'>{finance_manager}</div>
              <div className='contract-element-text text-center py-2'>المدير المالي </div>
            </div>
          </div>
          <div className='col-md-6 mt-3 mt-md-0 ps-4 '>
            <div className='col-12 contract-element h-100'>
              <div className='contract-element-value text-center py-2'>{finance_manager_number}</div>
              <div className='contract-element-text text-center py-2'>رقم المدير المالي</div>
            </div>
          </div>


          </div>

          <div className='row mt-md-4 '>

          <div className='col-md-6 mt-3 mt-md-0 ps-4 '>
            <div className='col-12 contract-element h-100'>
              <div className='contract-element-value text-center py-2'>{finance_person}</div>
              <div className='contract-element-text text-center py-2'>مدير العلاقة </div>
            </div>
          </div>
          <div className='col-md-6 mt-3 mt-md-0 ps-4 '>
            <div className='col-12 contract-element h-100'>
              <div className='contract-element-value text-center py-2'>{finance_person_number}</div>
              <div className='contract-element-text text-center py-2'>رقم مدير العلاقة</div>
            </div>
          </div>


          </div>
        
          {/* <div className='row mt-md-4  '>

            <div className='col-md-4 mt-3 mt-md-0 ps-4 h-100'>
              <div className='col-12 contract-element h-100'>
                <div className='contract-element-value text-center py-2'>{contractStartDateValue}</div>
                <div className='contract-element-text text-center py-2'>تاريخ بداية العقد</div>
              </div>
            </div>
            <div className='col-md-4 mt-3 mt-md-0 ps-4 h-100'>
              <div className='col-12 contract-element h-100'>
                
                <ShapeDate  type = {`${contractType}`} date={`${contractEndDateValue}`} />
                
              </div>
            </div>
         

          </div> */}
         
          <div className='row mt-md-4 h-100 '>

            <div className='col-md-6 mt-3 mt-md-0 ps-4 h-100'>
              <div className='col-12 contract-element'>
                <div className='contract-element-value text-center py-2'>{country}</div>
                <div className='contract-element-text text-center py-2'>الدولة</div>
              </div>
            </div>
            <div className='col-md-6 mt-3 mt-md-0 ps-4 h-100'>
              <div className='col-12 contract-element'>
                <div className='contract-element-value text-center py-2'>{city}</div>
                <div className='contract-element-text text-center py-2'>المدينة</div>
              </div>
            </div>
       

            </div>

            <div className='row mt-md-4 h-100 '>

            <div className='col-md-6 mt-3 mt-md-0 ps-4 h-100'>
              <div className='col-12 contract-element'>
                <div className='contract-element-value text-center py-2'>{identity_name}</div>
                <div className='contract-element-text text-center py-2'>اسم صاحب الشركة أو المسؤول</div>
              </div>
            </div>
            <div className='col-md-6 mt-3 mt-md-0 ps-4 h-100'>
              <div className='col-12 contract-element'>
                <div className='contract-element-value text-center py-2'>{identity_number}</div>
                <div className='contract-element-text text-center py-2'>هوية صاحب الشركة أو المسؤول</div>
              </div>
            </div>


            </div>

            <div className='row mt-md-4 h-100 '>

            <div className='col-md-12 mt-3 mt-md-0 ps-4 h-100'>
              <div className='col-12 contract-element'>
                <div className='contract-element-value text-center py-2'>{comp_activ}</div>
                <div className='contract-element-text text-center py-2'>نشاط الشركة</div>
              </div>
            </div>
        


            </div>


       

        </div>


    



        {/* end  car details component */}

      </div>

    </div>
  )
}

export default ContractDetails
      // // needs sejel mmmmmmmmmmmm api islam
      // setSejel("/docs/sejel/fff.pdf")
      // setSejelName("required")