import React from "react";
import { Line } from "react-chartjs-2";
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

import { Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap'


const ChartjsLineChart = ({ collectedChart, procssingChart, repossedChart, labelColor, gridLineColor, warningColorShade, lineChartDanger, lineChartPrimary }) => {


 const options = {
  responsive: true,
  tension: 0.3 // 2. Set the tension (curvature) of the line to your liking.  (You may want to lower this a smidge.)
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

 const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: repossedChart,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 0, 0)",
      fill: {
        target: "origin", // 3. Set the fill options
        above: "rgba(255, 0, 0, 0.3)"
      }
    },
    {
      label: "Dataset 2",
      data: collectedChart,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.3)",
      fill: "origin" // 3. Set the fill options
    }
  ]
};

return (
    
    <Card className="nonAnimation" >
      <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
        <div>
          <CardTitle id="ContractChartHeader" className=' mt-2' >
          العقود خلال اخر 12 شهر
          </CardTitle>
        </div>
      </CardHeader>
      <CardBody >
        <div style={{ height: '450px' }}>
          <Line options={options} data={data}  />
        </div>
      </CardBody>
    </Card>
  )

}

export default ChartjsLineChart