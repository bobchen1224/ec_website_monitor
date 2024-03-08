import { Box, Grid } from "@mui/material";
import { CyberpunkLoader, MainDataBox } from "../../components/DesignedUI";
import { useEffect, useState } from "react";
import moment from "moment";
import ChartsComponent from "../../components/Charts/charts";

const getMinutesList = () => {
    let tempList = [];
    for(let i = 0; i < 60; i++) {
        tempList[i] = {
            timeTicks: moment().startOf('seconds').valueOf() + (i * 1000),
            traffic: Math.floor(Math.random() * 50) + 120,
            bounceRate: Math.floor(Math.random() * 10) + 10,
        }
    };
    return tempList;
};

const Dashboard = () => {
    const [totalData, setTotalData] = useState(
        {
            totalSales: 0,
            totalVisitors: 0,
            totalAddToCarts: 0,
            totalConversions: 0,
        }
    );
    const [trafficData, setTrafficData] = useState([]);
    const [loading, setLoading] = useState(false);

    const trafficSeries =  [
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
    ]

    const getInitData = () => new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(
                setTrafficData(getMinutesList()),
                setTotalData({
                    totalSales: 5137624,
                    totalVisitors: 3765,
                    totalAddToCarts: 324,
                    totalConversions: 156, 
                }),
            )
        }, 3000)
    });

    useEffect(()=>{
        setLoading(true);
        Promise.resolve(getInitData())
        .finally(()=>{
            setLoading(false)
        });

        const tenSecTimer = setInterval(()=>{
            setTrafficData(getMinutesList());
        }, 5 * 1000);
        return () => {
            clearInterval(tenSecTimer);
        };
    },[]);

    // console.log('traffic', trafficData, 'total', totalData);

    return (
        <Grid container spacing={1}>
            <CyberpunkLoader loading={false}/>
            <Grid item xs={12} md={6} lg={3}>
                <MainDataBox
                    title='今日累計營收'
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
                <Box sx={{border: '3px solid aqua', borderRadius: '10px', boxShadow: '0 0 0.8rem aqua'}}>
                    <ChartsComponent 
                        titleValue='進站流量與表現'
                        seriesValue={trafficSeries}
                    />
                </Box>
            </Grid>
        </Grid>
    )
};

export default Dashboard;