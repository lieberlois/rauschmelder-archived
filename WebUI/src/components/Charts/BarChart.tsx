import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

interface IProps {
  data: number[];
  labels: string[];
}

export function BarChart({ data, labels }: IProps) {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      new Chart(chartContainer.current!, {
        type: "horizontalBar",
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: '#112233'
          }]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              type: 'linear',
              ticks: {
                maxTicksLimit: 20,
                beginAtZero: true,
                stepSize: 1.0,
              },
            }]
          },
          legend: {
            display: false,
          }
        }

      })
    }
  }, [chartContainer, data, labels])

  return (
    <canvas ref={chartContainer} />
  )
}