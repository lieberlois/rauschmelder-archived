import React from "react";
import { HorizontalBar } from "react-chartjs-2";

interface IProps {
  data: number[];
  labels: string[];
}

export function BarChart({ data, labels }: IProps) {

  const generateColors = () => {
    let colors = [
      "rgba(255, 99, 132, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(255, 205, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(201, 203, 207, 1)",
    ]

    while (colors.length < data.length) {
      colors = [...colors, ...colors];
    }
    return colors
  }

  const datasets = [
    {
      barPercentage: 0.75,
      categoryPercentage: 1.0,
      data: data,
      backgroundColor: generateColors(),
    },
  ]

  const options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'linear',
        ticks: {
          beginAtZero: true,
          stepSize: 1.0,
        },
      }]
    },
    legend: {
      display: false,
    }
  }

  return (
    <HorizontalBar data={{ labels: labels, datasets: datasets }} options={options} />
  )
}