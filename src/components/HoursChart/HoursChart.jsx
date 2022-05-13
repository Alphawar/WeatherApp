import React from 'react';
import {
  Chart as ChartJS,
  registerables
} from 'chart.js';
import { Line  } from 'react-chartjs-2';
import classes from './HoursChart.module.css';

const HoursChart = ({chartData}) => {

    ChartJS.register(
       ...registerables
      );

    const options = {
        plugins: {
            responsive: true,
            legend: {
              labels:{
                font: {
                    size: 18,
                    family: 'Montserrat',
                },
                padding: 20,
                usePointStyle:true,
              },
            }
          },
      };

      return (
          <div className={classes.chart}>
              <Line data={chartData} options={options}/>
          </div>
      )
}

export default HoursChart;