import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { GeneralContentBox, MainDataBox } from "../../components/DesignedUITs";
import { TotalDataResponse, TrafficDataResponse, SalesDataResponse, SourceDataResponse } from "../../constant/typeInterface";
import moment from "moment";
import TimeSeriesChart from "../../components/Charts/timeSeriesChart";
import BarChart from "../../components/Charts/barChart";
import GaugeChart from "../../components/Charts/gaugeCharts";
import { useAppDispatch, useAppSelector } from "../../app/reducerHook";
import { disableLoading, enableLoading } from "../../models/dataHandle";
import { useTranslation } from "react-i18next";

const getMinutesList = () => {
    let tempList: TrafficDataResponse = [];
    for(let i = 0; i < 60; i++) {
        tempList[i] = {
            timeTicks: (moment().startOf('seconds').valueOf() - 60000) + (i * 1000),
            traffic: Math.floor(Math.random() * 50) + 120,
            bounceRate: Math.floor(Math.random() * 20) + 10,
        };
    };
    return tempList;
};

const getHourList = () => {
    let tempList: SalesDataResponse = [];
    const nowHourCheck = moment().startOf('hours').hours();
    for(let i = 0; i < 24; i++) {
        tempList[i] = {
            timeTicks: moment().startOf('day').valueOf() + (i * 60 * 60 * 1000),
            sales: nowHourCheck > i ? Math.floor(Math.random() * 50000) + Math.round(5000000/nowHourCheck) : null,
            perSale: nowHourCheck > i ? Math.floor(Math.random() * 600) + 1200 : null,
        };
    }
    return tempList
};

const DashboardTs = () => {
    const { t } = useTranslation();
    const styleState = useAppSelector(state=>state.styleSwitch.mainBackgroundColor);
    const dispatch = useAppDispatch();
    const [totalData, setTotalData] = useState<TotalDataResponse>(
        {
            totalSales: 0,
            totalVisitors: 0,
            totalAddToCarts: 0,
            totalConversions: 0,
            sitePerformance: 0,
            siteSEO: 0,
        }
    );
    const [trafficData, setTrafficData] = useState<TrafficDataResponse>([]);
    const [salesData, setSalesData] = useState<SalesDataResponse>([]);
    const [sourceData, setSourceData] = useState<SourceDataResponse>([]);

    const trafficSeries = [
        {
            name: '訪客人數',
            type: 'line',
            color: 'aqua',
            yAxis: 0,
            shadow: {
                color: 'aqua',
                offsetX: 0,
                offsetY: 0,
                width: 7,
            },
            data: [...trafficData].map((v) => ({x: v.timeTicks, y: v.traffic }))
        },
        {
            name: '跳出率',
            type: 'line',
            color: 'gold',
            yAxis: 1,
            shadow: {
                color: 'gold',
                offsetX: 0,
                offsetY: 0,
                width: 7,
            },
            data: [...trafficData].map((v) => ({x: v.timeTicks, y: v.bounceRate }))
        },
    ];

    const trafficYaxis = [
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
            gridLineColor: 'transparent',
            base: 0,
            min: 0,
            max: 100,
            opposite: true,
            endOnTick: false,
        },
    ];

    const salesSeries = [
        {
            name: '營收金額',
            type: 'column',
            color: 'slateblue',
            borderRadius: 3,
            yAxis: 0,
            shadow: {
                color: 'slateblue',
                offsetX: 0,
                offsetY: 0,
                width: 7,
            },
            data: [...salesData].map((v) => ({x: v.timeTicks, y: v.sales }))
        },
        {
            name: '平均客單價',
            type: 'line',
            color: 'mediumspringgreen',
            zIndex: 2,
            lineWidth: 2,
            yAxis: 1,
            shadow: {
                color: 'black',
                offsetX: 0,
                offsetY: 0,
                width: 10,
            },
            data: [...salesData].map((v) => ({x: v.timeTicks, y: v.perSale }))
        },
    ];

    const salesYaxis = [
        {
            title: {
                text: '營收',
                style: {
                    color: '#ecf'
                },
            },                
            labels: {
                format: '$ {value:,f}',
                style: {
                    color: '#ecf',
                },
            },
            gridLineColor: 'darkslategrey',
            gridLineDashStyle: 'longdash',
        },
        {
            title: {
                text: '客單價',
                style: {
                    color: '#afa'
                },
            },
            labels: {
                format: '$ {value:,f}',
                style: {
                    color: '#afa',
                },
            },
            gridLineColor: 'darkslategrey',
            gridLineDashStyle: 'longdash',
            opposite: true,
        },
    ];

    const sourceSeries = [
        {
            type: 'bar',
            data: sourceData,
        }
    ];

    const getInitData = () => new Promise((resolve, reject) => {
        setTimeout(()=>{
            const setRandomData = () => {
                setTrafficData(getMinutesList());
                setSalesData(getHourList());
                setTotalData({
                    totalSales: 5137624,
                    totalVisitors: 68511,
                    totalAddToCarts: 13763,
                    totalConversions: 3425,
                    sitePerformance: 98,
                    siteSEO: 100, 
                });
                setSourceData([
                    {y: 23813, x: 1, name: 'Direct', description: 'kWp', color: 'orange'},
                    {y: 13647, x: 2, name: 'Google Search', description: null, color: 'springgreen'},
                    {y: 10274, x: 3, name: 'Facebook', description: null, color: 'deepskyblue'},
                    {y: 9829, x: 4, name: 'Instagram', description: null, color: '#aaf'},
                    {y: 6731, x: 5, name: 'Youtube', description: null, color: 'tomato'},
                    {y: 4218, x: 6, name: 'Others', description: null, color: 'lightslategrey'},
                ]);
            };
            resolve(setRandomData());
        }, 1500);
    });

    useEffect(()=>{
        dispatch(enableLoading());
        getInitData()
        .finally(()=>{
            dispatch(disableLoading());
        });

        const fiveSecTimer = setInterval(()=>{
            setTrafficData(getMinutesList());
        }, 5 * 1000);

        const tenSecTimer = setInterval(()=>{
            setTotalData((prev) => {
                prev.totalSales = prev.totalSales + Math.floor(Math.random()*1500);
                prev.totalVisitors = prev.totalVisitors + Math.floor(Math.random()*20);
                prev.totalAddToCarts = prev.totalAddToCarts + Math.floor(Math.random()*4);
                prev.totalConversions = prev.totalConversions + Math.floor(Math.random()*2);
                return prev;
            });
        }, 10 * 1000);

        return () => {
            clearInterval(fiveSecTimer);
            clearInterval(tenSecTimer);
        };
    },[]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={3}>
                <MainDataBox
                    title={t("todayTotalSales")}
                    data={totalData.totalSales}
                    dataColor='springgreen'
                    startUnit='$'
                    endUnit=''
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <MainDataBox
                    title='今日累積訪客'
                    data={totalData.totalVisitors}
                    dataColor='tomato'
                    startUnit=''
                    endUnit='人'
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <MainDataBox
                    title='加入購物車'
                    data={totalData.totalAddToCarts}
                    dataColor='aquamarine'
                    startUnit=''
                    endUnit='次'
                />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <MainDataBox
                    title='轉換訂單'
                    data={totalData.totalConversions}
                    dataColor='gold'
                    startUnit=''
                    endUnit='筆'
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <GeneralContentBox>
                    <TimeSeriesChart 
                        heightValue='320px'
                        titleValue='進站流量與表現'
                        seriesValue={trafficSeries}
                        yaxisValue={trafficYaxis}
                        xOffsetValue={15}
                        bgColor={styleState}
                    />
                </GeneralContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <GeneralContentBox>
                    <BarChart
                        heightValue='320px'
                        titleValue='流量來源'
                        seriesValue={sourceSeries}
                        bgColor={styleState}
                    />
                </GeneralContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <GeneralContentBox>
                    <TimeSeriesChart 
                        heightValue='320px'
                        titleValue='各時段營收狀況'
                        seriesValue={salesSeries}
                        yaxisValue={salesYaxis}
                        xOffsetValue={0}
                        bgColor={styleState}
                    />
                </GeneralContentBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <GeneralContentBox>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Box sx={{width: '50%', borderRadius: '10px'}}>
                            <GaugeChart
                                heightValue='320px'
                                dataValue={totalData.sitePerformance}
                                titleValue='網站效能'
                                valueColor='#afa'
                                paneColor={['#43e97b', '#38f9d7']}
                                bgColor={styleState}
                            />
                        </Box>
                        <Box sx={{width: '50%', borderRadius: '10px'}}>
                            <GaugeChart
                                heightValue='320px'
                                dataValue={totalData.siteSEO}
                                titleValue='SEO表現'
                                valueColor='#aff'
                                paneColor={['#4facfe', '#00f2fe']}
                                bgColor={styleState}
                            />
                        </Box>
                    </Box>
                </GeneralContentBox>
            </Grid>
        </Grid>
    );
};

export default DashboardTs;