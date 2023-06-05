import { useState } from 'react'
import Chart from 'react-apexcharts'
function Chard() {

    const [chartData, setChartData] = useState(
        {
            series: [{
                name: 'Complete Task',
                data: [44, 55, 41, 37, 22, 43, 21]
            }, {
                name: 'Incomplete Task',
                data: [53, 32, 33, 52, 13, 43, 32]
            }, {
                name: 'Deleted Task',
                data: [12, 17, 11, 9, 15, 11, 20]
            }],
            options: {
                colors: ['#4ade80', '#FFF400', '#EF5350'],
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        dataLabels: {
                            total: {
                                enabled: true,
                                offsetX: 0,
                                style: {
                                    fontSize: '13px',
                                    fontWeight: 900
                                }
                            }
                        }
                    },
                },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                title: {
                    text: 'Task Graph (Under Beta)',
                    style: {
                        fontSize: '30px',
                        fontWeight: 'bold',
                        fontFamily: undefined,
                        color: '#263238'
                    },
                },
                xaxis: {
                    categories: [2019, 2020, 2021, 2022, 2023],
                    labels: {
                        formatter: function (val: any) {
                            return val
                        }
                    }
                },
                yaxis: {
                    title: {
                        text: undefined
                    },
                },
                tooltip: {
                    y: {
                        formatter: function (val: any) {
                            return val
                        }
                    }
                },
                fill: {
                    opacity: 1
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            },


        }
    )

    return (
        <div className='mt-16'>
            <Chart options={chartData.options as any} series={chartData.series} type="bar" height={350}
                title={{ text: "Vahgghhghb" }}
            />
        </div>
    )
}

export default Chard