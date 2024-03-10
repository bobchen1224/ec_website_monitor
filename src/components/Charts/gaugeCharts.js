import { useMediaQuery, useTheme } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import HighChartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge.js";

if(typeof Highcharts === 'object') {
    HighChartsMore(Highcharts);
    SolidGauge(Highcharts);
};

const GaugeChart = ({heightValue, dataValue, titleValue, paneColor, valueColor}) => {
    const theme = useTheme();
    const smCheck = useMediaQuery(theme.breakpoints.up('sm'));
    const chartOptions = {
        chart: {
            type: 'solidgauge',
            animation: true,
            height: heightValue,
            backgroundColor: '#0C1427',
            borderRadius: 10,
        },

        credits: {
            enabled: false,
        },
    
        title: {
            text: '',
            style: {                
                color: 'lightcyan',
                fontWeight: 'bold',
                fontSize: '20px',
            },
            margin: 0,
        },

        tooltip: {
            enabled: false,
        },
    
        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '110%',
                innerRadius: '90%',
                backgroundColor: 'darkslategray',
                borderWidth: 0,
            },]
        },
    
        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: [],
            title: {
                text: titleValue,
                style: {
                    color: valueColor,
                    fontSize: smCheck ? 'x-large' : 'large',
                    fontWeight: 'bold',
                    fontFamily: 'Orbitron, sans-serif, Arial',
                },
                y: 15,
            },
            stops: [
                [0.5, {
                  linearGradient: {
                    x1: 0.5,
                    x2: 0.5,
                    y1: 0,
                    y2: 1
                  },
                  stops: [
                    [0, paneColor[0]],
                    [1, paneColor[1]]
                  ]
                }],
                [1, {
                  linearGradient: {
                    x1: 1,
                    x2: 0,
                    y1: 0,
                    y2: 1
                  },
                  stops: [
                    [0, paneColor[0]],
                    [1, paneColor[1]]
                  ]
                }]
            ],
        },
    
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: true,
                    borderColor: 'transparent',
                    style:{
                        color: valueColor,
                        fontSize: smCheck ? 'xx-large' : 'x-large',
                        fontFamily: 'Orbitron, sans-serif, Arial',
                        textAlign: 'center',
                    },
                    useHTML: true,
                    verticalAlign: 'middle',
                    format: '{y}％',
                    y: 10,
                    x: 0,
                },
                linecap: 'square',
                stickyTracking: false,
                rounded: false,
            }
        },
    
        series: [{
            name: 'Move',
            data: [{
                color: 'springgreen',
                radius: '110%',
                innerRadius: '90%',
                y: dataValue,
            }],
        }],
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
        />
    )
};

export default GaugeChart;