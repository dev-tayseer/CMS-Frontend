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

export const Splitbyspace2 = ({ value }) => {
  var finalresult = value
  var inputString = value;
  var result = inputString.split(" ");
  console.log(result[0]); // Output: ["-52", "يوم/أيام"]

  if (!isNaN(result[0]) && parseFloat(result[0]) < 0) {
    // Change the sign of result[0]
    result[0] = -parseFloat(result[0]);
    finalresult = result[0] + "- " + result[1]
  }

  return finalresult

}

export const Splitbyspace = ({ value }) => {
  var finalresult = value
  var inputString = value;
  var result = inputString.split(" ");
  console.log(result[0]); // Output: ["-52", "يوم/أيام"]

  if (!isNaN(result[0]) && parseFloat(result[0]) <= 0) {
    // Change the sign of result[0]
    result[0] = -parseFloat(result[0]);
    finalresult = 0 + " " + result[1]
  }

  return finalresult

}
// {/* end car details row component */}

const ContractDetails = () => {
  const { loader_show, setLoaderShow } = useContext(LoaderProvider);
  // const [carId, setCarId] = useState("")
  const [contractNumber, setcontractNumber] = useState("")
  const [contractType, setcontractType] = useState("")
  const [contractNameValue, setcontractNameValue] = useState("")
  const [contractName, setcontractName] = useState("اسم العقد")

  const [crValue, setcrValue] = useState([])
  const [cr, setcr] = useState("السجل التجاري")
  const [companyNameValue, setcompanyNameValue] = useState([])
  const [companyName, setcompanyName] = useState("اسم الشركة")

  const [PhoneNumberValue, setPhoneNumberValue] = useState([])
  const [PhoneNumber, setPhoneNumber] = useState("رقم الهاتف")

  const [emailValue, setemailValue] = useState([])
  const [email, setemail] = useState("البريد الإلكتروني")
  const [contractStartDateValue, setcontractStartDateValue] = useState("")
  const [contractEndDateValue, setcontractEndDateValue] = useState("")
  const [durationValue, setdurationValue] = useState("")

  const [cityValue, setcityValue] = useState([])
  const [countryValue, setcountryValue] = useState("")

  const [unifiedNumberValue, setunifiedNumberValue] = useState([])

  const [department, setdepartment] = useState("")
  const [departmentManagerName, setdepartmentManagerName] = useState("")
  const [departmentManagerEmail, setdepartmentManagerEmail] = useState("")

  const [notes, setnotes] = useState("")
  const [files, setfiles] = useState([])
  const [files2, setfiles2] = useState([])
  const [filesExists, setfilesExists] = useState(false)
  const [filesExists2, setfilesExists2] = useState(false)

  const [oldRecordsExists, setoldRecordsExists] = useState(false)

  const [oldRecords, setoldRecords] = useState([])
  const [idContract, setIdContract] = useState("")


  const [can_delete, setcan_delete] = useState(true)

  const [billData, setbillData] = useState([])
  const [billRecExists, setbillRecExists] = useState(false)

  const [bill_type, setbill_type] = useState("")
  const [renew_type, setrenew_type] = useState("")
  const [renewDuration, setrenewDuration] = useState("")








  const [department_name, setDepartment_name] = useState("")
  const [start_Date_of_Contract, setStart_Date_of_Contract] = useState("")
  const [end_Date_of_Contract, setEnd_Date_of_Contract] = useState("")
  const [commercial_number, setcommercial_number] = useState("")
  const [total_amount, settotal_amount] = useState("")
  const [annual_value_sadad, setannual_value_sadad] = useState("")
  const [contract_end_close, setcontract_end_close] = useState("")
  const [End_Tenure, setEnd_Tenure] = useState("")





  const fillData = async () => {
    setLoaderShow(true)
    const token = localStorage.getItem("token")


    var data = new FormData();
    const search = window.location.search
    const params = new URLSearchParams(search)
    const contractId = params.get('id')
    try {
      const seen = params.get('seen')
      const notif_id = params.get('notif_id')
      setIdContract(contractId)
      console.log(seen, notif_id, "seen noti")

      var data = new FormData();
      data.append('cont_id', contractId);

      var config = {
        method: 'post',
        url: `${domain_url}/api/Notications?not_id=${notif_id}`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data), "seen");
        })
        .catch(function (error) {
          console.log(error, "err");
        });


    } catch (e) {

    }

    var config = {
      method: 'get',
      url: `${domain_url}/Contract/ContractRentalDetaile?id=${contractId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        // try{

        console.log(response.data[0], "respm")
        let contract_obj = response.data[0]
        console.log(contract_obj.Start_Date_of_Contract, "contract_obj.Start_Date_of_Contract")
        // setStart_Date_of_Contract(contract_obj.Start_Date_of_Contract)
        // setEnd_Date_of_Contract(contract_obj.End_Date_of_Contract)
        setDepartment_name(contract_obj.Department.Department_name)
        setcommercial_number(contract_obj.commercial_number)
        settotal_amount(contract_obj.total_amount)
        setannual_value_sadad(contract_obj.annual_value_sadad)

        setcontractNumber(contract_obj.Contract_Number)
        setcontractNameValue(contract_obj.Contract_Name)
        console.log(contract_obj, "Country")
        setnotes(contract_obj.Note)
        setcontractStartDateValue(contract_obj.Start_Date_of_Contract)
        setcontractEndDateValue(contract_obj.End_Date_of_Contract)
        setdurationValue(contract_obj.Tenure)
        setbill_type(contract_obj.bill_type.label)
        setrenew_type(contract_obj.renew_type.label)
        setrenewDuration(contract_obj.renewDuration)
        let contract_obj_ontract_end_close = contract_obj.contract_end_close
        try {
          setEnd_Tenure(contract_obj.End_Tenure)

        } catch (e) {

          setEnd_Tenure('')

        }



        console.log(contract_obj_ontract_end_close, "contract_obj_ontract_end_close")
        if (contract_obj_ontract_end_close == "close") {
          setcontract_end_close("علي وشك الإنتهاء")

        }
        else if (contract_obj_ontract_end_close == "not started") {
          setcontract_end_close("لم يبدأ بعد")

        }
        else if (contract_obj_ontract_end_close == "ended") {
          setcontract_end_close("انتهى العقد")

        }
        else {
          setcontract_end_close("لم يوشك العقد علي الإنتهاء")

        }




        try {
          console.log(contract_obj.Status_of_cont.Status_of_cont, "111111111")
          if (contract_obj.Status_of_cont.Status_of_cont != '-') {
            setcontractType(contract_obj.Status_of_cont.Status_of_cont)
          } else {
            setcontractType('لايوجد')
          }
        } catch (e) {
          setcontractType("لايوجد")
        }
        try {
          let spliited_CR_Number = []
          try {
            spliited_CR_Number = contract_obj.Company_name.CR_Number.split('-')
            console.log(spliited_CR_Number, "spliited_CR_Number")
          } catch (e) {
            spliited_CR_Number = contract_obj.Company_name.CR_Number
          }

          let spliited_company_name = []
          try {
            spliited_company_name = contract_obj.Company_name.company_name.split('-')
            console.log(spliited_company_name, "spliited_company_name")
          } catch (e) {
            spliited_company_name = contract_obj.Company_name.company_name
          }

          let spliited_phone = []
          try {
            spliited_phone = contract_obj.Company_name.phone.split('-')
            console.log(spliited_company_name, "spliited_company_name")
          } catch (e) {
            spliited_phone = contract_obj.Company_name.phone
          }

          let spliited_email = []
          try {
            spliited_email = contract_obj.Company_name.email.split('-')
            console.log(spliited_company_name, "spliited_company_email")
          } catch (e) {
            spliited_email = contract_obj.Company_name.email
          }

          let spliited_Unified_No = []
          try {
            spliited_Unified_No = contract_obj.Company_name.Unified_No.split('-')
          } catch (e) {
            spliited_Unified_No = contract_obj.Company_name.Unified_No
          }
          setcrValue(spliited_CR_Number)
          setcompanyNameValue(spliited_company_name)
          setemailValue(spliited_email)
          setPhoneNumberValue(spliited_phone)
          setunifiedNumberValue(spliited_Unified_No)
          setdepartment(contract_obj.Department.Department_name)
          setdepartmentManagerName(contract_obj.Department.Dep_Head_Name)
          setdepartmentManagerEmail(contract_obj.Department.Dep_Head_email)

          let list_of_files = []
          let list_of_files2 = []
          let contract_obj_files = contract_obj.files
          let list_of_records = []
          let record_obj_files = contract_obj.new_exp_date

          console.log(contract_obj_files, "awes filews")
          console.log(record_obj_files, "fifi")
          for (var i = 0; i < contract_obj_files.length; i++) {
            console.log(contract_obj_files, "999")
            if (contract_obj_files[i].type_of_contract_file == 1 || contract_obj_files[i].type_of_contract_file == "1") {
              list_of_files2.push({ "path": contract_obj_files[i].file, "name": contract_obj_files[i].name[1], "size": contract_obj_files[i].size,"uploader_name":contract_obj_files[i].uploader_name,"file_creation_time":contract_obj_files[i].file_creation_time })
              setfilesExists2(true)
            }
            else {
              list_of_files.push({ "path": contract_obj_files[i].file, "name": contract_obj_files[i].name[1], "size": contract_obj_files[i].size })
              setfilesExists(true)
            }

          }
          setfiles(list_of_files)
          setfiles2(list_of_files2)
          console.log(record_obj_files, "record_obj_filesrecord_obj_files")
          for (var i = 0; i < record_obj_files.length; i++) {
            console.log(contract_obj_files, "999")
            setoldRecordsExists(true)

            list_of_records.push({ 'id': record_obj_files[i].id, "old_date": record_obj_files[i].old.split("T")[0], "new_date": record_obj_files[i].new.split("T")[0], "extend_date": record_obj_files[i].created_at.split("T")[0], 'notes': record_obj_files[i].notes })
          }

          setoldRecords(list_of_records)




        }

        catch (e) {
          console.log(e)
          setcrValue([])
          setcompanyNameValue([])
          setemailValue([])
          setPhoneNumberValue([])
          setunifiedNumberValue([])
          setdepartment("لايوجد")
          setdepartmentManagerName("لايوجد")
          setdepartmentManagerEmail("لايوجد")
          setfiles([])
          setfiles2([])
          setfilesExists(false)
          setfilesExists2(false)
          setoldRecords([])
          setoldRecordsExists(false)

        }

      })
      .catch(function (error) {
        console.log(error);
      });

    setLoaderShow(false)
  }
  useEffect(() => {
    console.log("YYYYYYYYYYYYYYYYY")

    console.log("loadiing ")
    fillData()
  }, [])


  function handleDelete(obj, row_id) {
    if (can_delete) {
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
        data: data
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
    else {
      console.log("not deleting ")
    }
    console.log("delete id", obj)
  }

  const handleCloseConfirmDelete = () => setShowConfirmDelete(false)
  const handleConfirmDelete = () => {
    console.log('deleteRowId: ', selectedRowId)
    setShowConfirmDelete(false)

  }
  const ShapeStatus = ({ type }) => {
    console.log(type, type == "1", "hany .......")
    let item = ''
    if (type == "سارية") {
      item = <div class='px-3 py-2 active-status'>ساري</div>
    }
    else if (type == "منتهية") {
      item = <div class='px-3 py-2 finished-status'>منتهية</div>

    }
    else if (type == "غير سارية") {
      item = <div class='px-3 py-2 not-active-status'>غير ساري</div>

    }
    else {
      item = <div class='px-3 py-2 finished-status'></div>

    }
    return item
  }

  const ShapeDate = ({ type, date }) => {
    console.log(type, type == "1", "hany .......")
    let item = ''
    if (type == "سارية") {
      item =
        <div class='px-3 py-2 active-status h-100 text-center'>{date}
          <div className='contract-element-text text-center py-2'>تاريخ نهاية  العقد</div>

        </div>
    }
    else if (type == "منتهية") {
      item =
        <div class='px-3 py-2 finished-status h-100 text-center'>{date}
          <div className='contract-element-text text-center py-2'>تاريخ نهاية  العقد</div>

        </div>

    }
    else if (type == "غير سارية") {
      item = <div class='px-3 py-2 not-active-status h-100 text-center'>{date}
        <div className='contract-element-text text-center py-2'>تاريخ نهاية  العقد</div>

      </div>

    }
    else {
      item = <div class='px-3 py-2 finished-status h-100 text-center'>{date}
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
        <HomeHeader headerContract="نظام إدارة العقود" headerContract2="العقود" headerContractObj="تفاصيل العقد" urlMain="/contracts" />

        <div className='row f-w-700 f-s-24px color-5F605F  '>تفاصيل العقد</div>
        <div className='row mt-4 contract-details-container mb-4 pb-4'>
          <div className='d-md-flex justify-content-between pt-3 px-3'>
            <div className='color-5F605F f-s-20px f-w-700'>
              عقد رقم : {contractNumber}
            </div>
            {/* contract-type-container */}
            <div className=' text-center mt-3 mt-md-0 px-4 py-2'>
              {/* {contractType} */}
              <ShapeStatus type={`${contractType}`} />
            </div>
          </div>
          <div className='row mt-md-4 '>

            <div className='col-md-6 mt-3 mt-md-0 ps-4 '>
              <div className='col-12 contract-element h-100'>
                <div className='contract-element-value text-center py-2'>{contractNameValue}</div>
                <div className='contract-element-text text-center py-2'>{contractName}</div>
              </div>
            </div>
            <div className='col-md-6 mt-3 mt-md-0 ps-4 '>
              <div className='col-12 contract-element h-100'>
                <div className='contract-element-value text-center py-2'>{department_name}</div>
                <div className='contract-element-text text-center py-2'>الإدارة</div>
              </div>
            </div>


          </div>
          <div className='row mt-md-4 '>
            <div className='col-md-4 mt-3 mt-md-0 ps-4 '>
              <div className='col-12 contract-element h-100'>
                <div className='contract-element-value text-center py-2'>{contractStartDateValue}</div>
                <div className='contract-element-text text-center py-2'>تاريخ بداية العقد</div>
              </div>
            </div>
            <div className='col-md-4 mt-3 mt-md-0 ps-4 '>
              <div className='col-12 contract-element h-100'>
                <div className='contract-element-value text-center py-2'>{contractEndDateValue}</div>
                <div className='contract-element-text text-center py-2'>تاريخ نهاية العقد</div>
              </div>
            </div>
            <div className='col-md-4 mt-3 mt-md-0 ps-4 h-100'>
              <div className='col-12 contract-element h-100'>
                <div className='contract-element-value text-center py-2'>{durationValue}</div>
                <div className='contract-element-text text-center py-2'>الفترة</div>
              </div>
            </div>



          </div>

          <div className='row mt-md-4 h-100 '>

            <div className='col-md-4 mt-3 mt-md-0 ps-4 h-100'>
              <div className='col-12 contract-element h-100'>
                <div className='contract-element-value text-center py-2'>{commercial_number}</div>
                <div className='contract-element-text text-center py-2'>رقم سجل العقد</div>
              </div>
            </div>

            <div className='col-md-4 mt-3 mt-md-0 ps-4 h-100'>
              <div className='col-12 contract-element h-100'>
                <div className='contract-element-value text-center py-2'>{total_amount}</div>
                <div className='contract-element-text text-center py-2'>اجمالي قيمة العقد</div>
              </div>
            </div>
            <div className='col-md-4 mt-3 mt-md-0 ps-4 h-100'>
              <div className='col-12 contract-element h-100'>
                <div className='contract-element-value text-center py-2'>{annual_value_sadad}</div>
                <div className='contract-element-text text-center py-2'>القيمة السنوية للإيجار</div>
              </div>
            </div>

          </div>


          {/* <div className='row mt-md-4 h-100'>

            <div className='col-md-12 mt-3 mt-md-0 ps-4 h-100'>
              <div className='col-12 contract-element h-100'>
                <div className='contract-element-value text-center py-2'>{contract_end_close}</div>
                <div className='contract-element-text text-center py-2'>حالة العقد من الإنتهاء</div>
              </div>
            </div>

            </div> */}

          <div className='row mt-md-4 h-100'>

            <div className='col-md-12 mt-3 mt-md-0 ps-4 h-100'>
              <div className='col-12 contract-element h-100'>
                {/* <div className='contract-element-value text-center py-2'> {End_Tenure}</div> */}
                <div className='contract-element-value text-center py-2'> <Splitbyspace value={End_Tenure} /></div>

                <div className='contract-element-text text-center py-2'>المتبقي على إنتهاء العقد</div>
              </div>
            </div>

          </div>



          <div className='row mt-md-4 h-100'>

            <div className='col-md-12 mt-3 mt-md-0 ps-4 h-100'>
              <div className='col-12 contract-element h-100'>
                <div className='contract-element-value text-center py-2'>{notes}</div>
                <div className='contract-element-text text-center py-2'>ملاحظات</div>
              </div>
            </div>
          </div>

        </div>


        {filesExists && (
          <>
            <div className='mt-4 row f-w-700  f-s-16px color-5F605F'>المرفقات</div>
            <div className='contract-details-container row mt-4 mb-4 p-3'>
              {files.map(function (object, i) {
                console.log(object, "ssss")
                return (
                  <div className='col-md-6 pt-2'>
                    <div className='col-12 contract-element d-flex px-3 py-3  '>
                      <a target='_blank' href={`${domain_url}${object.path}`}>
                        <FileCorrect />
                      </a>
                      <div className='ms-3'>
                        <div className='color-414042 f-s-16px f-w-700'>{object.name}</div>
                        <div className='mt-1 color-ACB5BE f-s-12px f-w-500'>{object.size}</div>
                      </div>
                    </div>


                  </div>
                );
              })}


            </div>
          </>
        )}

        {filesExists2 && (
          <>
            <div className='mt-4 row f-w-700  f-s-16px color-5F605F'>إيصالات دفع عقود الإيجار</div>
            <div className='contract-details-container row mt-4 mb-4 p-3'>
              {files2.map(function (object, i) {
                console.log(object, "ssss")
                return (
                  <div className='col-md-6 pt-2'>
                    <div className='col-12 contract-element d-flex px-3 py-3  '>
                      <a target='_blank' href={`${domain_url}${object.path}`}>
                        <FileCorrect />
                      </a>
                      <div className='ms-3'>
                        <div className='color-414042 f-s-16px f-w-700'>{object.name}</div>
                        <div className='text-start color-ACB5BE f-s-12px f-w-500'>{object.file_creation_time}</div>
                        <div className='text-start color-ACB5BE f-s-12px f-w-500'>{object.uploader_name}</div>
                        <div className='text-start color-ACB5BE f-s-12px f-w-500'>{object.size}</div>
                      </div>
                    </div>


                  </div>
                );
              })}


            </div>
          </>
        )}


        {oldRecordsExists && (
          <>
            <div className='mt-4 row f-w-700  f-s-16px color-5F605F'>سجل التمديدات السابقة</div>
            <div className=' row mt-4 mb-4 p-3'>
              <table class="table">
                <thead className='background-F7FAF7 thead-details py-3'>
                  <tr className='background-F7FAF7 thead-details py-3'>
                    <th scope="col">#</th>
                    <th scope="col">تاريخ نهاية العقد السابق</th>
                    <th scope="col">تاريخ نهاية العقد الممتد</th>
                    <th scope="col">تاريخ التمديد</th>
                    <th scope="col">الملاحظات</th>
                    <th scope="col">حذف</th>

                  </tr>
                </thead>
                <tbody>
                  {oldRecords.map(function (object, i) {
                    return (


                      <tr className='py-3' id={`extend_${i}`}>
                        <th scope="row">{i + 1}</th>
                        <td>{object.old_date}</td>
                        <td>{object.new_date}</td>
                        <td>{object.extend_date}</td>
                        <td>{object.notes}</td>


                        <td>
                          <div>
                            <a onClick={(e) => handleDelete(object, `extend_${i}`, e)}>
                              <Trash3 size={20} />
                            </a>
                          </div>
                        </td>
                      </tr>

                    );
                  })}

                </tbody>
              </table>


            </div>
          </>
        )}

        <div className=" mt-3 ">
          {billRecExists && (
            <>
              <div className='mt-4 row f-w-700  f-s-16px color-5F605F'>الفواتير</div>
              <div className=' row mt-4 mb-4 p-md-3 table-wrapper'>
                <table class="table">
                  <thead className='background-F7FAF7 thead-details py-3'>
                    <tr className='background-F7FAF7 thead-details py-3'>
                      <th scope="col">#</th>
                      <th scope="col"></th>

                      <th scope="col">المبلغ</th>
                      <th scope="col">القيمة المضافة</th>
                      <th scope="col"> تاريخ الإستحقاق</th>
                      <th scope="col"> مدة السداد</th>

                    </tr>
                  </thead>
                  <tbody>
                    {billData.map(function (object, i) {


                      return (


                        <tr className='py-3'>
                          <th scope="row">{i + 1}</th>
                          <th scope="">{object.payment_type == "0" && "الدفعة المقدمة"}
                            {object.payment_type == "1" && "الدفعة الأخيرة"}</th>
                          <td>{object.amount}</td>
                          <td>{object.added_value}</td>
                          <td>{object.due_date}</td>
                          <td>{object.due_duration} شهر</td>

                        </tr>

                      );
                    })}

                  </tbody>
                </table>


              </div>
            </>
          )}
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