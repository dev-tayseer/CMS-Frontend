import React, { useEffect } from 'react'
import userIcon from "@src/assets/images/svg/user.svg"
import carIcon from "@src/assets/images/svg/Car.svg"
import { array } from 'prop-types'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
import { HomeIcon, ArrowIcon } from '../icons/all_icons'
import { Pie, Doughnut } from 'react-chartjs-2';
import ChartjsLineChart from "../chart"
import { exec } from 'apexcharts'




function ContractChart({ contractNumberActive, contractNumberAll, contractNumberNonActive, contractNumberFinished, collectedChart, procssingChart, repossedChart }) {
  console.log("chart", contractNumberActive, contractNumberAll, contractNumberNonActive, contractNumberFinished)




  useEffect(() => {
    let active_dash = document.getElementsByClassName("active-line-chart-colored")[0]
    let activepercentage = 0
    try {
      if (contractNumberActive == "0") {

      }
      else {
        activepercentage = Math.floor((contractNumberActive / contractNumberAll) * 100)

      }

    } catch (e) {
      activepercentage = 0

    }
    console.log(activepercentage, "777777")
    active_dash.style.width = `${activepercentage}%`

    let none_active_dash = document.getElementsByClassName("none-active-line-chart-colored")[0]
    let none_activepercentage = 0
    try {
      if (contractNumberNonActive == "0") {
        contractNumberNonActive = 0
      }
      else {


        none_activepercentage = Math.floor((contractNumberNonActive / contractNumberAll) * 100)
      }

      console.log(none_activepercentage, "none")
    } catch (e) {
      none_activepercentage = 0

    }
    none_active_dash.style.width = `${none_activepercentage}%`

    // let finished_dash = document.getElementsByClassName("finished-line-chart-colored")[0]
    // let finishedpercentage = 0
    // try{
    //   if (contractNumberFinished == "0"){
    //     finishedpercentage = 0
    //   }
    //   else{

    //     finishedpercentage = Math.floor((contractNumberFinished/contractNumberAll)*100)
    //   }

    // } catch(e){
    //   finishedpercentage = 0
    // }
    // console.log(finishedpercentage,"**")
    // finished_dash.style.width = `${finishedpercentage}%`
  });
  const dataContractChart1 = {


    datasets: [
      {
        // Tooltip: { enabled: false },
        // label: "العقود",
        data: [contractNumberActive, contractNumberNonActive],
        backgroundColor: [
          '#FBB827',
          '#5F605F',
          '#D93636',


        ],
        borderColor: [
          '#FBB827',
          '#5F605F',
          '#D93636',


        ],

        borderWidth: 1,
      },
    ],
  };


  const options1 = {

    plugins: {
      tooltip: {
        enabled: true
      },
      datalabels: true,

    },

  };

  const dataContractChart2 = {

    datasets: [
      {
        labels: "العقود",
        data: [contractNumberNonActive, contractNumberAll - contractNumberNonActive],
        backgroundColor: [
          '#FBB827',
          '#FFF5E0',

        ],
        borderColor: [
          '#FBB827',
          '#FFF5E0',

        ],
        borderWidth: 1,
      },
    ],
  };
  const dataContractChart3 = {

    datasets: [
      {
        label: "العقود",
        data: [contractNumberFinished, contractNumberAll - contractNumberFinished],
        backgroundColor: [
          '#FBB827',
          '#FFF5E0',

        ],
        borderColor: [
          '#FBB827',
          '#FFF5E0',

        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>

      <div className='row pt-1 ps-md-0 ps-2 '>
        <div className='col-lg-6 mt-4 donutChartContainer'>
          <div className='col-12 stat-element text-center py-3'>
            <div className='row'>
              <div className='col-6 text-start px-5'>
                <div className='pb-1 pt-3 stat-element-header ps-3'>{contractNumberAll}</div>

                <div className='py-3 stat-element-body ps-3'>اجمالي العقود</div>
                <div className='py-3 ps-3'>
                  <a href='/contracts' target='_blank' className='btn btn-details text-center px-4 py-2 '>عرض التفاصيل</a>
                </div>
              </div>
              <div className='col-6  px-5'>
                <div className='PieChartContainer '>
                  <Doughnut options={options1} data={dataContractChart1} />
                </div>
              </div>
              <div className='mt-4 mb-4'>
                <div className='mx-4 line'></div>

              </div>
              <div className='row px-4 mt-2 mb-2'>
                <div className='col-6'>
                  <div className='my-3 d-flex justify-content-between'>
                    <div className='f-s-14 f-w-600 color-5F605F'>العقود السارية</div>
                    <div className='f-s-14 f-w-700 color-5F605F'>{contractNumberActive}</div>

                  </div>
                  <div className='active-line-chart'>
                    <div className='active-line-chart-colored'></div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='my-3 d-flex justify-content-between'>
                    <div className='f-s-14 f-w-600 color-5F605F'>العقود غير السارية</div>
                    <div className='f-s-14 f-w-700 color-5F605F'>{contractNumberNonActive}</div>

                  </div>
                  <div className='none-active-line-chart'>
                    <div className='none-active-line-chart-colored'></div>
                  </div>
                </div>
                {/* <div className='col-4'>
                              <div className='my-3 d-flex justify-content-between'>
                                <div className='f-s-14 f-w-600 color-5F605F'>العقود المنتهية</div>
                                <div className='f-s-14 f-w-700 color-5F605F'>{contractNumberFinished}</div>

                              </div>
                              <div className='finished-line-chart'>
                                <div className='finished-line-chart-colored'></div>
                              </div>
                            </div> */}
              </div>

            </div>
          </div>
        </div>
        {/* <div className='col-lg-4 mt-3 donutChartContainer'>
                    <div className='col-12 stat-element text-center py-3'>
                        <div className='row'>
                          <div className='col-6 text-start px-5'>
                            <div className='py-3 stat-element-body'>عدد العقود الغير نشطة</div>
                            <div className='pb-3 stat-element-header'>{contractNumberNonActive}</div>
                          </div>
                          <div className='col-6  px-5'>
                            <div className='PieChartContainer '>
                              <Doughnut data={dataContractChart2}  />
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 mt-3 donutChartContainer'>
                    <div className='col-12 stat-element text-center py-3'>
                        <div className='row'>
                          <div className='col-6 text-start px-5'>
                            <div className='py-3 stat-element-body'>عدد العقود المنتهية</div>
                            <div className='pb-3 stat-element-header'>{contractNumberFinished}</div>
                          </div>
                          <div className='col-6  px-5'>
                            <div className='PieChartContainer '>
                              <Doughnut data={dataContractChart3}  />
                            </div>
                          </div>
                        </div>
                    </div>
                </div> */}
        <div className='col-lg-6 mt-2'>
          <ChartjsLineChart collectedChart={collectedChart} procssingChart={procssingChart} repossedChart={repossedChart} />

        </div>

      </div>

    </>
  )
}

export default ContractChart