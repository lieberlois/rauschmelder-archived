import React from "react";
import { HorizontalBar } from "react-chartjs-2";

interface IProps {
  data: number[];
  labels: string[];
}

const maxLabelLength = 10;

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

  const generateLabels = () => {
    const croppedLabels: string[][] = []
    labels.forEach(label => {
      if (label.length <= maxLabelLength) {
        croppedLabels.push([label])
      } else {
        let middle = Math.floor(label.length / 2);
        const wasSpace = label[middle] === " " || label[middle + 1] === " ";

        let newFirst = label.substr(0, middle + 1).trim();
        const newSecond = label.substr(middle + 1).trim();

        if (!wasSpace)
          newFirst = newFirst + "-"
        croppedLabels.push([newFirst, newSecond])
      }
    });
    return croppedLabels;
  }

  const datasets = [
    {
      barPercentage: 0.75,
      categoryPercentage: 1.0,
      data: data,
      backgroundColor: generateColors(),
    },
  ]

  const labelsWithLines = generateLabels();

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          barThickness: 'flex',
          display: true,
          gridLines: {
            display: false
          },
          legend: false,
          ticks: {
            autoSkip: false,
            maxRotation: 30,
            minRotation: 0,
          }
        }
      ],
      xAxes: [{
        type: 'linear',
        ticks: {
          beginAtZero: true,
          stepSize: 1.0,
        },
      }],
    },
    legend: {
      display: false,
    }
  }

  return (
    <HorizontalBar data={{ labels: labelsWithLines, datasets: datasets }} options={options} />
  )
}