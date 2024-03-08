import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";

const ChartsComponent = ({titleValue, seriesValue}) => {
    const chartOptions = {
        chart: {
            zoomType: 'xy',
            height: '260px',
            animation: true,
            backgroundColor: '#0C1427',
            borderRadius: 10,
        },

        credits: {
            enabled: false,
        },

        title: {
            text: titleValue,
            style: {
                color: 'lightcyan',
                fontWeight: 'bold',
            }
        },

        legend:{
            itemStyle: {
                color: 'lightcyan'
            },
            itemHoverStyle: {
                color: 'deepskyblue'
            }
        },

        tooltip:{
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: 'lightcyan',
            },
            shared: true,
        },

        xAxis: [
            {
                type: 'datetime',
                verticalAlign: 'middle',
                labels: {
                    style:{
                        color: 'lightcyan',
                    }
                },
                offset: 15,
            }
        ],

        yAxis: [
            {
                title: {
                    text: '訪客數',
                    style: {
                        color: '#aff'
                    },
                },                
                labels: {
                    format: '{value}',
                    style: {
                        color: '#aff',
                    },
                },
                gridLineColor: 'darkslategrey',
                gridLineDashStyle: 'longdash',
            },
            {
                title: {
                    text: '跳出率',
                    style: {
                        color: '#ffa'
                    },
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: '#ffa',
                    },
                },
                gridLineColor: 'darkslategrey',
                gridLineDashStyle: 'longdash',
                min: 0,
                max: 100,
                opposite: true,
            },
        ],

        time: {
            timezoneOffset: -8 * 60,
        },

        series: seriesValue,
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
        />
    )
};

export default ChartsComponent;