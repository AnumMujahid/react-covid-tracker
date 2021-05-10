import React, { useState, useEffect } from 'react';
import './LineGraph.css';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.formattedValue).format('+0,0');
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      tooltipFormat: 'll',
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

const LineGraph = ({ casesType, ...props }) => {
  const [data, setData] = useState({});
  const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                borderColor: '#CC1034',
                backgroundColor: 'rgba(204, 16, 52, 0.5)',
                fill: true,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default LineGraph;
