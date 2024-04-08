import React, { useCallback } from "react";
import { Box, Button, Card, IconButton, InputAdornment, TableCell, TableRow } from "@mui/material";
import { CyberpunkLoader, DesignedFormInput, DesignedTable, PopupDialogue } from "../../components/DesignedUI";
import { useEffect, useState } from "react";
import { adsTypeCheck } from "../../utils/dataTransfer";
import { AdsDataResponse, TempAdsList, SortParams, TableHeaderParams } from "../../constant/typeInterface";
import { Edit } from "@mui/icons-material";
import Swal from "sweetalert2";

const bodySx = {
    padding: '1rem 0.5rem',
    color: 'lightcyan', 
    background: '#222222', 
    borderBottom: '1px solid darkslategrey',
    borderRight: '1px solid darkslategrey',
    textAlign: 'center',
};

const bodySxLast = {
    padding: '0.5rem',
    color: 'lightcyan', 
    background: '#222222', 
    borderBottom: '1px solid darkslategrey',
    borderRight: '0px',
    textAlign: 'center',
};

const tableHeaderList: TableHeaderParams = [
    {
        level: 'main',
        items: [
            {
                name: '廣告活動',
                label: 'campaign',
                column: 3
            },
            {
                name: '流量表現',
                label: 'trafficPerformance',
                column: 4
            },
            {
                name: '轉換表現',
                label: 'conversionPerformance',
                column: 3
            }
        ]
    },
    {
        level: 'sub',
        items: [
            {   
                name: '名稱',
                label: 'name',
                column: 1,
            },
            {
                name: '類型',
                label: 'type',
                column: 1,
            },
            {
                name: '預算',
                label: 'budget',
                column: 1,
            },
            {
                name: '點擊',
                label: 'clicks',
                column: 1,
            }, 
            {
                name: '曝光',
                label: 'impression',
                column: 1,
            },
            {
                name: '點閱率',
                label: 'clickRate',
                column: 1,
            },
            {
                name: '已花費',
                label: 'costs',
                column: 1,
            },
            {
                name: '轉換',
                label: 'conversions',
                column: 1,
            },
            {
                name: '轉換價值',
                label: 'conversionsValue',
                column: 1,
            },
            {
                name: 'ROAS',
                label: 'roas',
                column: 1,
            }
        ]
    }
];

const getAdsList = () => {
    let tempList: TempAdsList = []
    for(let i = 0; i < 15; i++) {
        tempList[i] = {
            name: `${Math.random().toString(36).substring(2,7)} - ${i % 3 === 0 ? '新品曝光' : '檔期促銷'}`,
            type: adsTypeCheck(Math.floor(Math.random()*6)+1),
            budget: Math.floor(Math.random()*30000/100)*100 + 1000,
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
        v.costs = v.budget * 0.6;
        v.roas = Math.round(v.conversionsValue / (v.budget * 0.6));
        return v;
    }).sort((a,b)=>b.budget - a.budget);
    return tempList;
};

const AdsDataRows = ({openPop, data}: 
    {openPop: (budget: number, name: string) => void, data: AdsDataResponse}
    ) => {
    return (
        <TableRow>
            <TableCell align="center" sx={bodySx}>
                {data.name}
            </TableCell>
            <TableCell align="center" sx={bodySx}>
                {data.type}
            </TableCell>
            <TableCell align="center" sx={bodySx}>
                {Number(data.budget).toLocaleString()}
                <IconButton 
                    sx={{paddingY: '0.3rem'}}
                    onClick={()=>{openPop(data.budget, data.name)}}
                    >
                    <Edit sx={{fontSize: 16, color: 'aqua'}}/>
                </IconButton>
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
    );
};

const AdsMonitorTs = () => {
    const [adsCampaign, setAdsCampaign] = useState<TempAdsList>([]);
    const [tableDirection, setTableDirection] = useState<SortParams>(
        {
            label: 'budget',
            type: 'desc',
        }
    );
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [budgetModify, setBudgetModify] = useState<number>(0);
    const [selectCampaign, setSelectCampaign] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const getAdsData = useCallback(()=>
    new Promise ((resolve, reject) => {
        setTimeout(()=>{
            resolve(setAdsCampaign(getAdsList()));
        },1500)
    }),[]);

    const handleDiagOpen = (budgetValue: number, campaignName: string) => {
        setOpenDialog(true);
        setBudgetModify(budgetValue);
        setSelectCampaign(campaignName);
    };

    const handleDiagClose = useCallback(()=>{
        setOpenDialog(false);
        setBudgetModify(0);
    },[]);

    const handleBudgetChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setBudgetModify(Number(event.target.value))
    },[]);

    const saveBudget = useCallback((adsList: TempAdsList, cpName: string, budgetData: number)=>{
        const selectCpIndex: number = adsList.findIndex(f => f.name === cpName);
        Swal.fire({
            icon: 'question',
            title: '確認修改預算？',
            text: `將從「${adsList[selectCpIndex].budget}」調整為「${budgetData}」`,
            showConfirmButton: true,
            confirmButtonText: '確認',
            showCancelButton: true,
            cancelButtonText: '取消',
        }).then((result)=>{
            if(result.isConfirmed) {
                Swal.fire({
                    title: '資料上傳中…請稍候',
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                    allowOutsideClick: false,
                });

                setTimeout(()=>{
                    const newDataList = structuredClone(adsList);
                    const dataListFix = newDataList.with(selectCpIndex,
                        {
                            ...newDataList[selectCpIndex],
                            budget: budgetData,
                        }
                    );
                    setAdsCampaign(dataListFix);
                    Swal.close();
                    Swal.fire({
                        icon: 'success',
                        title: '預算更新成功！',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    setOpenDialog(false);
                },1500);
            } else {
                setOpenDialog(false);
            };
        });
    },[]);

    useEffect(()=>{
        setLoading(true);
        getAdsData()
        .finally(()=>{
            setLoading(false);
        });
    },[]);

    return (
        <Box sx={{boxSizing: 'border-box', paddingY: '0rem'}}>
            <Card sx={{border: '3px solid aqua', boxShadow: '0 0 0.8rem aqua', borderRadius: '10px'}}>
                <CyberpunkLoader loading={loading}/>
                <DesignedTable 
                    maxHeightValue={820}
                    minWidthValue={1280}
                    headerList={tableHeaderList}
                    bodyData={adsCampaign}
                    setBodyData={setAdsCampaign}
                    DataRows={AdsDataRows}
                    dataDirection={tableDirection}
                    setDataDirection={setTableDirection}
                    handleOpenPop={handleDiagOpen}
                    />
            </Card>
            <PopupDialogue
                title='廣告活動預算調整'
                content={
                    <DesignedFormInput
                        autoComplete='off'
                        fullWidth
                        label='請輸入預算金額'
                        size='small'
                        inputMode='numeric'
                        type='text'
                        value={budgetModify}
                        onChange={handleBudgetChange}
                        sx={{marginY: '0.7rem', background: '#222222'}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <p style={{color: 'lightcyan'}}>{'NTD $'}</p>
                                </InputAdornment>
                            )
                        }}
                    />
                }
                actions={
                    <Button
                        sx={{
                            backgroundColor: 'tomato', 
                            border: '1px solid white', 
                            color: 'white', 
                            textShadow: '0 0 0.5rem black', 
                            boxShadow: '0 0 0.5rem tomato',
                            '&:hover': {
                                backgroundColor: 'darkred',
                                fontWeight: 'bold',
                            }
                        }}
                        onClick={()=>{
                            saveBudget(adsCampaign, selectCampaign, budgetModify)
                        }}
                    >
                        儲存
                    </Button>
                }
                openDiag={openDialog}
                handleClose={handleDiagClose}
            />
        </Box>
    )
};

export default AdsMonitorTs;