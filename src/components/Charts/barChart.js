import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";

Highcharts.setOptions({ lang: { thousandsSep: ',' } });

const BarChart = ({heightValue, titleValue, seriesValue}) => {
    const chartOptions = {
        chart: {
            zoomType: 'xy',
            height: heightValue,
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

        legend: {
            enabled: false,
        },

        tooltip:{
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: 'lightcyan',
            },
            shared: true,
            borderWidth: 1,
            formatter: function () {
                return this.point.name + '</b> ： <b>' + Number(this.y).toLocaleString();
            },
        },

        xAxis: [
            {
                type: 'category',
                verticalAlign: 'middle',
                labels: {
                    style:{
                        color: 'lightcyan',
                    }
                },
            }
        ],

        yAxis: {
            title: {
                text: '流量',
                style: {
                    color: 'lightcyan'
                },
            },                
            labels: {
                format: '{value}',
                style: {
                    color: 'lightcyan',
                },
            },
            gridLineColor: 'darkslategrey',
            gridLineDashStyle: 'longdash',
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

export default BarChart;