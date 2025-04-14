import React, { useRef, useState, useEffect } from 'react'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // 1. Import Filler plugin
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // 1. Register Filler plugin
);

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap'
import Chart from 'chart.js/auto'

const ChartjsLineChart = ({ collectedChart, procssingChart, repossedChart, labelColor, gridLineColor, warningColorShade, lineChartDanger, lineChartPrimary }) => {
    console.log(collectedChart, "yeas collected ............")

  // ** Chart Options
  const options = {
    responsive: true,
    tension: 0.5,
    backgroundColor: false,
    maintainAspectRatio: false,
    tooltips: {
      rtl: true 
    },
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          borderColor: gridLineColor,
          color: gridLineColor
        }
      },
      y: {
        min: 0,
        // max: 10,
        scaleLabel: { display: true },
        ticks: {
          stepSize: 10,
          color: labelColor
        },
        grid: {
          borderColor: gridLineColor,
          color: gridLineColor
        }
      }
    },
    plugins: {
      legend: {
        align: 'start',
        position: 'bottom',
        labels: {
          boxWidth: 10,
          marginBottom: 25,
          color: gridLineColor,
          usePointStyle: true
        }
      }
    } 
    
  }

  // ** Chart Data
  const data = {
    labels: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        data: repossedChart,
        // fill: false,
        // fill: {
        //   target:"origin",
        //   above: "linear-gradient(180deg, #FFDC91 0%, rgba(251, 184, 39, 0) 100%);"
        // }, 
        tension: 0.5,
        pointRadius: 1,
        label: 'العقود السارية',
        pointHoverRadius: 5,
        pointStyle: 'circle',
        pointHoverBorderWidth: 5,
        borderColor: '#FBB827',
        pointBorderColor: 'rgba(255, 220, 144, 0.5)',
          fill: true,
          backgroundColor: 'rgba(255, 220, 144, 0.5)',
        pointHoverBackgroundColor: '#0F6622'
      },
      
      {
        data: collectedChart,
        // fill: true,
        tension: 0.5,
        label: 'العقود غير السارية',
        pointRadius: 1,
        pointHoverRadius: 5,
        pointStyle: 'circle',
        pointHoverBorderWidth: 5,
        borderColor: '#5F605F',
        pointBorderColor: 'transparent',
        fill: true,
        backgroundColor: 'rgba(154, 153, 153, 0.5)',    
        pointHoverBackgroundColor: '#B54708'
      }
      // ,
      // {
      //   data: procssingChart,
      //   // fill: true,
      //   tension: 0.5,
      //   pointRadius: 1,
      //   label: 'العقود المنتهية',
      //   pointHoverRadius: 5,
      //   pointStyle: 'circle',
      //   pointHoverBorderWidth: 5,
      //   borderColor: '#D93636',
      //   fill: true,
      //   backgroundColor: 'rgba(255, 156, 156, 0.5)',        
            
      //   pointBorderColor: 'transparent',
      //   pointHoverBackgroundColor: '#D93636'
      // }
    ]
  }

  //** To add spacing between legends and chart
  const plugins = [
    {
    //   beforeInit(chart) {
    //     chart.legend.afterFit = function () {
    //       this.height += 20
    //     }
    //   }
    }
  ]

  return (
    
    <Card className="nonAnimation" >
      {/* <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
        <div>
          <CardTitle id="ContractChartHeader" className=' mt-2' >
          العقود خلال اخر 12 شهر
          </CardTitle>
        </div>
      </CardHeader> */}
      <CardBody >
        <div style={{ height: '600px' }}>
          <Line data={data} options={options} height={450} plugins={plugins} />
        </div>
      </CardBody>
    </Card>
  )
}

export default ChartjsLineChart