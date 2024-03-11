import { Box, Card, TableCell, TableRow } from "@mui/material";
import { CyberpunkLoader, DesignedTable } from "../../components/DesignedUI";
import { useEffect, useState } from "react";
import { adsTypeCheck } from "../../utils/constant";

const getAdsList = () => {
    let tempList = [];
    for(let i = 0; i < 15; i++) {
        tempList[i] = {
            name: `${Math.random().toString(36).substring(2,7)} - ${i % 3 === 0 ? '新品曝光' : '檔期促銷'}`,
            type: adsTypeCheck(Math.floor(Math.random()*6)+1),
            budegt: Math.floor(Math.random()*30000/1000)*1000,
            clicks: Math.floor(Math.random()*3000),
            impression: Math.floor(Math.random()*20000) + 3000,
            clickRate: null,
            costs: null,
            conversions: Math.floor(Math.random()*150),
            conversionsValue: Math.floor(Math.random()*120000),
            roas: null,
        };
    };
    tempList = tempList.map((v)=>{
        v.clickRate = Math.floor((v.clicks / v.impression) * 100);
        v.costs = v.budegt * 0.6;
        v.roas = Math.round(v.conversionsValue / (v.budegt * 0.6));
        return v;
    })
    return tempList;
};

const bodySx = {
    padding: '0.5rem',
    color: 'lightcyan', 
    background: '#222222', 
    borderBottom: '1px solid darkslategrey',
    borderRight: '1px solid darkslategrey',
    textAlign: 'center',
}

const bodySxLast = {
    padding: '0.5rem',
    color: 'lightcyan', 
    background: '#222222', 
    borderBottom: '1px solid darkslategrey',
    borderRight: '0px',
    textAlign: 'center',
}

const AdsDataRows = ({length, data, bIndex}) => {
    return (
        <TableRow key={data.name}>
            <TableCell align="center" sx={bodySx}>
                {data.name}
            </TableCell>
            <TableCell align="center" sx={bodySx}>
                {data.type}
            </TableCell>
            <TableCell align="center" sx={bodySx}>
                {Number(data.budegt).toLocaleString()}
            </TableCell>
            <TableCell align="center" sx={bodySx}>
                {Number(data.clicks).toLocaleString()}
            </TableCell>
            <TableCell align="center" sx={bodySx}>
                {Number(data.impression).toLocaleString()}
            </TableCell>
            <TableCell align="center" sx={bodySx}>
                {`${data.clickRate} %`}
            </TableCell>
            <TableCell align="center" sx={bodySx}>
                {Number(data.costs).toLocaleString()}
            </TableCell>
            <TableCell align="center" sx={bodySx}>
                {data.conversions}
            </TableCell>
            <TableCell align="center" sx={bodySx}>
                {Number(data.conversionsValue).toLocaleString()}
            </TableCell>
            <TableCell align="center" sx={bodySxLast}>
                {data.roas}
            </TableCell>
        </TableRow>
    )
};

const AdsMonitor = () => {
    const [adsCampaign, setAdsCampaign] = useState([]);
    const [loading, setLoading] = useState(false);
    const tableHeaderList = [
        {
            level: 'main',
            items: [
                {
                    name: '廣告活動',
                    column: 3
                },
                {
                    name: '流量表現',
                    column: 4
                },
                {
                    name: '轉換表現',
                    column: 3
                }
            ]
        },
        {
            level: 'sub',
            items: [
                {   
                    name: '名稱',
                    column: 1,
                },
                {
                    name: '類型',
                    column: 1,
                },
                {
                    name: '預算',
                    column: 1,
                },
                {
                    name: '點擊',
                    column: 1,
                }, 
                {
                    name: '曝光',
                    column: 1,
                },
                {
                    name: '點閱率',
                    column: 1,
                },
                {
                    name: '已花費',
                    column: 1,
                },
                {
                    name: '轉換',
                    column: 1,
                },
                {
                    name: '轉換價值',
                    column: 1,
                },
                {
                    name: 'ROAS',
                    column: 1,
                }
            ]
        }
    ];

    useEffect(()=>{
        setAdsCampaign(getAdsList());
    },[])

    return (
        <Box sx={{boxSizing: 'border-box', paddingY: '0rem'}}>
            <Card sx={{border: '3px solid aqua', boxShadow: '0 0 0.8rem aqua', borderRadius: '10px'}}>
                <CyberpunkLoader loading={loading}/>
                <DesignedTable 
                    maxHeightValue={720}
                    minWidthValue={1280}
                    headerList={tableHeaderList}
                    bodyData={adsCampaign}
                    DataRows={AdsDataRows}
                    />
            </Card>
        </Box>
    );
};

export default AdsMonitor;