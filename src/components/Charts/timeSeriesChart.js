import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";

Highcharts.setOptions({ lang: { thousandsSep: ',' } });

const TimeSeriesChart = ({heightValue, titleValue, seriesValue, yaxisValue, xOffsetValue, bgColor}) => {
    const chartOptions = {
        chart: {
            zoomType: 'xy',
            height: heightValue,
            animation: true,
            backgroundColor: bgColor,
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
            borderWidth: 1,
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
                offset: xOffsetValue,
            }
        ],

        yAxis: yaxisValue,

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

export default React.memo(TimeSeriesChart);