// ** React Imports
import React, { Fragment, useState, useEffect } from 'react'
import { Pie, Doughnut } from 'react-chartjs-2';

import ChartjsLineChart from "./components/chart"
import "@src/assets/scss/Dashboard.scss"
import axios from "axios"



import HomeHeader from "./components/home/HomeHeader"
import Statistics from "./components/home/Statistics"
import ContractChart from "./components/home/ContractChart"




import { useNavigate } from "react-router-dom"

import '@styles/react/libs/flatpickr/flatpickr.scss'
import "@src/assets/scss/pages/cars/table_elements.scss"
import themeConfig from "@configs/themeConfig";

const domain_url = themeConfig.url

const Home = () => {
  const navigate = useNavigate()
  const [contractNumber, setContractNumber] = useState("")
  const [departmentNumber, setDepartmentNumber] = useState("")
  const [companyNumber, setCompanyNumber] = useState("")
  const [adminNumber, setadminNumber] = useState("")

  const [contractNumberActive, setContractNumberActive] = useState("")
  const [contractNumberAll, setContractNumberAll] = useState("")
  const [contractNumberNonActive, setContractNumberNonActive] = useState("")
  const [contractNumberFinished, setContractNumberFinished] = useState("")


  const [collectedChart, setCollectedChart] = useState([])
  const [procssingChart, setProcssingChart] = useState([])
  const [repossedChart, setRepossedChart] = useState([])
  const [department_list, setdepartment_list] = useState([])
  const [year_list, setyear_list] = useState([])
  const [department_id, setdepartment_id] = useState('')
  const [year_id, setyear_id] = useState('')

  




  // statistics 


  const data = []

  const fillStatisticsData = (statistics) => {
    console.log(statistics, "--------")
    setContractNumber(statistics[0])
    setDepartmentNumber(statistics[1])
    setCompanyNumber(statistics[2])
    setadminNumber(statistics[3])
  }

  const fillContractChartData = (data) => {

    setContractNumberActive(data[1])
    setContractNumberAll(data[0])
    setContractNumberNonActive(data[2])
    setContractNumberFinished(data[3])
  }





  const fillChartStatisticsData = (data1,data2,data3) => {
    setCollectedChart(data2)
    setProcssingChart(data3)
    setRepossedChart(data1)
  }



  const fillData = async (domain_url,department_id='',year_id='') => {
    const token = localStorage.getItem("token")

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }


    try {

      console.log("object_data")
      let  result ; 
      if (department_id == '' && year_id == ''){
         result = await axios.get(`${domain_url}/api/Home`, config)

      }
      else {
         result = await axios.get(`${domain_url}/api/Home?id=${department_id}&year=${year_id}`, config)

      }
      
      console.log(result.data,"m3lm awes backenf ...")
      const object_data = result.data
      console.log(result.status,"2000000")
      if (result.status === 200) {
        // redirect to home page
        const object_data = result.data[0]
        const statistics = [object_data.DASH_Data.number_of_Con, object_data.DASH_Data.number_of_dep, object_data.DASH_Data.number_of_com , object_data.DASH_Data.number_of_use]
        const Depart_Data = [object_data.Depart_Data.ToTal, object_data.Depart_Data.active, object_data.Depart_Data.inactive, object_data.Depart_Data.expired]
        const chartData1= object_data.last_12_months.Active_list
        const chartData2= object_data.last_12_months.InActive_list
        const chartData3= object_data.last_12_months.Expired_list

        // const chartStatitics = object_data.data[0].cars_in_12_months
        // const chartStatitics = object_data.data[0].cars_in_12_months
        fillStatisticsData(statistics)
        fillContractChartData(Depart_Data)
        fillChartStatisticsData(chartData1,chartData2,chartData3)


        console.log(object_data)
      } else if (data.status === 429) {
        console.log("429")
        localStorage.removeItem("token")
        navigate('/Login')
      } else {
        console.log("4000")
        // setError("error")
        localStorage.removeItem("token")
        navigate('/Login')


      }
    } catch (e) {
      console.log("error..........", e)
      // localStorage.removeItem("token")
      // navigate('/Login')
      navigate('/Login')

    }

  }

  const fillDepartmentData = async (domain_url) => {
    console.log("get department data ... ")
    const token = localStorage.getItem("token")
    



    var config = {
      method: 'get',
      url: `${domain_url}/api/dropdown`,
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config)
    .then(function (response) {
      let department_data  =response.data.Department
      console.log(department_data,"department_data")
      setdepartment_list(department_data)
    })
    .catch(function (error) {
      console.log(error);
      navigate('/Login')
    });
  }



  function handleChangeDepartment(e){
    console.log(e.target.value,"option")
    let department_id = e.target.value
    setdepartment_id(department_id)
    fillData(domain_url,department_id,year_id)

  }

  function handleChangeYear(e){
    console.log(e.target.value,"option")
    let year_id = e.target.value
    setyear_id(year_id)
    fillData(domain_url,department_id,year_id)

  }

  useEffect(() => {
    console.log("loadiing ")
    let start = new Date().getFullYear()
    let before = 2000
    let end = 2040
    let listOfYears = []
    // for(var i = start ; i >= before ; i--){
    //   listOfYears.push(i)
    // }
    // for(var i = start+1 ; i <= end ; i++){
    //   listOfYears.push(i)
    // }

    for(var i = start ; i >= before ; i--){
      listOfYears.push(i)
    }
    console.log(listOfYears,"55")
    setyear_list(listOfYears)

    fillData(domain_url)
    fillDepartmentData(domain_url)
  }, [])

  const token = localStorage.getItem("token")
  if (token === "" | token === null) {
    navigate("/login")
  } else {
    return (
      <div className="theme-content px-0 px-md-5 ms-xl-5">
        <div className="container-fluid pe-md-5 ps-md-5 pe-1 ps-1">
          <HomeHeader headerContract="نظام إدارة العقود" headerContractObj="لوحة المعلومات" />
          <div className="row pt-2 pb-3">
            <div className="col-md-6 ps-0">
              <div className="home-header pt-2 ms-4 ps-md-2 ms-md-0">لوحة المعلومات</div>
            </div>

          </div>

          <Statistics contractNumber={contractNumber} departmentNumber={departmentNumber} companyNumber={companyNumber} adminNumber={adminNumber}  />
          <div className='row ps-md-0 ps-2'>
            <div className='col-md-6'>
              <div className='homeContractCase mt-4'>حالة العقود</div>
            </div>
            <div className='col-md-6 text-end mt-lg-4 d-lg-flex justify-content-lg-end'>
              <div className='ps-lg-3 pt-3 pt-lg-0'>
            <select className='homeSelect form-select ms-md-auto' onChange={(e) => handleChangeYear(e)}>
                {/* <option value=''>2023</option> */}
                

                {year_list.map(function (obj,i) {
                  return <>
                    <option value={obj}>{obj}</option>
                  </>
                })}

              </select>
              </div>
              <div className='ps-lg-3 pt-3 pt-lg-0'>
              <select className='homeSelect form-select ms-md-auto' onChange={(e) => handleChangeDepartment(e)}>
                <option value=''>جميع الإدارات</option>
                

                {department_list.map(function (obj,i) {
                  return <>
                    <option value={obj.id}>{obj.Dep_Name}</option>
                  </>
                })}

              </select>
              </div>
            </div>
          </div>
          <ContractChart contractNumberActive={contractNumberActive} contractNumberAll={contractNumberAll} contractNumberNonActive={contractNumberNonActive} contractNumberFinished={contractNumberFinished} collectedChart={collectedChart} procssingChart={procssingChart} repossedChart={repossedChart} />



          <div className="row mt-4 ">

            {/* <ChartjsLineChart collectedChart={collectedChart} procssingChart={procssingChart} repossedChart={repossedChart} /> */}

          </div>

        </div>

      </div>
    )
  }
}

export default Home
