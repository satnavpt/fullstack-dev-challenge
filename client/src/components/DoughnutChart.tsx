import { ChartLegendOptions, ChartOptions } from 'chart.js'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'

type Props = {
    data: number[]
    backgroundColor: string[]
    title?: string
    labels?: string[]
}

const DoughnutChart = ({ data, backgroundColor, title, labels }: Props) => {
    const legendOptions: ChartLegendOptions = {
        display: false,
    }
    const options: ChartOptions = {
        title: {
            display: !!title,
            text: title,
        },
    }
    return (
        <Doughnut
            data={{
                labels: labels,
                datasets: [
                    {
                        label: title,
                        data: data,
                        backgroundColor: backgroundColor,
                        // hoverOffset: 4
                    },
                ],
            }}
            options={options}
            legend={legendOptions}
        />
    )
}

export default DoughnutChart
