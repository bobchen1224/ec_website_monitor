import { Backdrop, Box, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, styled } from "@mui/material";
import styles from './designedUI.module.css';

const mainHeadSx = {
    color: 'lightyellow', 
    textShadow: '0 0 0.2rem orange', 
    borderBottom: '1px solid aqua', 
    borderRight: '1px solid aqua', 
    background: 'black', 
    fontSize: '1.2rem', 
    fontWeight: 'bolder'
};

const mainHeadSxLast = {
    color: 'lightyellow', 
    textShadow: '0 0 0.2rem orange', 
    borderBottom: '1px solid aqua', 
    borderRight: '0px', 
    background: 'black', 
    fontSize: '1.2rem', 
    fontWeight: 'bolder'
};

const subHeadSx = {
    color: 'aquamarine', 
    borderBottom: '1px solid aqua', 
    borderRight: '1px solid aqua', 
    background: '#111111', 
    fontSize: '0.9rem', 
    fontWeight: 'bolder',
};

const subHeadSxLast = {
    color: 'aquamarine', 
    borderBottom: '1px solid aqua', 
    borderRight: '0px', 
    background: '#111111', 
    fontSize: '0.9rem', 
    fontWeight: 'bolder',
};

const tableSortSx = {
    '&.MuiTableSortLabel-root': {
        color: 'aquamarine',
    },
    '&.MuiTableSortLabel-root:hover': {
        color: 'pink',
    },
    '&.Mui-active': {
        color: 'pink',
    },
    '& .MuiTableSortLabel-icon': {
        color: 'pink !important',
    },
}

export const DesignedFormInput = styled(TextField)({
    '& label': {
        color: 'lightcyan',
        '&.Mui-focused': {
            color: 'lightyellow',
        },
    },
    '& input':{
        color: 'lightyellow',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'lightcyan',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'aqua',
        },
        '&:hover fieldset': {
            borderColor: 'gold',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'gold',
        },
    },
    "& .MuiSvgIcon-root": {
        color: "lightcyan",
    },
    "& .MuiOutlinedInput-input": {
        color: 'lightyellow',
    },
});

export const MainDataBox = ({title, data, dataColor, startUnit, endUnit}) => {
    return (
        <Box sx={{backgroundColor: '#0C1427', color: 'lightcyan', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid aqua', boxShadow: '0 0 0.8rem aqua', borderRadius: '10px', boxSizing: 'border-box', paddingY: '0.7rem'}}>
            <h2 className={styles.dataTitle}>
                {title}
            </h2>
            <Box sx={{backgroundColor: 'black', color: dataColor, borderRadius: '10px', height: '80px', maxWidth: '90%', minWidth: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <h1 className={styles.dataText}>
                    {`${startUnit} ${Number(data).toLocaleString()} ${endUnit}`}    
                </h1>
            </Box>
        </Box>
    )
};

export const GeneralContentBox = ({children}) => {
    return (
        <Box sx={{border: '3px solid aqua', borderRadius: '10px', boxShadow: '0 0 0.8rem aqua'}}>
            {children}
        </Box>
    )
}

export const DesignedTable = ({maxHeightValue, minWidthValue, headerList, bodyData, setBodyData, DataRows, dataDirection, setDataDirection, handleOpenPop}) => {

    const handleDirectionChange = (setData, formerDirection, sortLabel) => {
        if(formerDirection.type === 'asc') {
            setData(prev=>[...prev].sort((a,b)=> b[sortLabel] - a[sortLabel]));
        } else {
            setData(prev=>[...prev].sort((a,b)=> a[sortLabel] - b[sortLabel]));
        };
        setDataDirection(prev => ({
            label: sortLabel,
            type: prev.type === 'asc' ? 'desc' : 'asc',
        }));
    };

    return (
        <TableContainer
            sx={{maxHeight: maxHeightValue}} 
            className={styles.tableContainerStyle}
        >
            <Table
                aria-label="collapsible table" 
                stickyHeader={true} 
                sx={{minWidth: minWidthValue}}
            >
                <TableHead>
                    { 
                        headerList.map((v)=>{
                            return (
                                <TableRow key={v.level}>
                                    {v.items.map((s, sIndex)=>{
                                        return (
                                            <TableCell 
                                                align="center" 
                                                key={s.name} 
                                                colSpan={v.level === 'main' ? s.column : 1}
                                                sx={
                                                    v.level === 'main' ? 
                                                    (sIndex === v.items.length-1 ? mainHeadSxLast : mainHeadSx) 
                                                    : 
                                                    (sIndex === v.items.length-1 ? subHeadSxLast : subHeadSx)
                                                }
                                                >
                                                {v.level === 'main' ? 
                                                    `${s.name}`
                                                    :
                                                    <TableSortLabel
                                                        active={dataDirection.label === s.label}
                                                        direction={dataDirection.type}
                                                        sx={tableSortSx}
                                                        onClick={()=>{
                                                            handleDirectionChange(setBodyData, dataDirection, s.label)
                                                        }}
                                                    >
                                                        {`${s.name}`}
                                                    </TableSortLabel>
                                                }
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })
                    }
                </TableHead>
                <TableBody>
                    {bodyData.length > 0 ? 
                        bodyData.map((v,i)=>{
                            return (
                                <DataRows
                                    key={v.name}
                                    data={v}
                                    openPop={handleOpenPop}
                                />
                            )
                        }) 
                        :
                        <></>
                        }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export const PopupDialogue = ({title, content, actions, openDiag, handleClose}) => {
    return (
        <Dialog
            open={openDiag}
            onClose={handleClose}
            sx={{zIndex: 1050}}
        >
            <Box sx={{background: '#333333', border: '3px solid aqua', borderRadius: '5px'}}>
                <DialogTitle sx={{color: 'lightcyan', textShadow: '0 0 0.2rem aqua', fontWeight: 'bold'}}>
                    {title}
                </DialogTitle>
                <DialogContent>
                    {content}
                </DialogContent>
                <DialogActions>
                    {actions}
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export const CyberpunkLoader = ({loading}) => {
    return (
        <Backdrop
            open={loading}
            sx={{backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <div className={styles.loader}>
                <svg className={styles.circleFW} viewBox="0 0 1000 1000">
                <circle className={styles.path} cx="500" cy="500" fill="none" r="355" stroke="#29B6F6"/>
                <text className={styles.textLoad} x="50%" y="50%" textAnchor="middle" fill="aqua" fontSize="60px" fontFamily="Arial" dy=".3em">Loading...</text>
                </svg>
                <svg className={styles.circleSW} viewBox="0 0 1000 1000" style={{animationDuration: '1.4s'}}>
                <circle className={styles.path2} cx="500" cy="500" fill="none" r="355" stroke="#18FFFF"/>
                </svg>
                <svg className={styles.circleFW} viewBox="0 0 1000 1000">
                <circle className={styles.path3} cx="500" cy="500" fill="none" r="355" stroke="#18FFFF"/>
                </svg>
                <svg className={styles.circleFW} viewBox="0 0 1000 1000">
                <circle className={styles.path4} cx="500" cy="500" fill="none" r="255" stroke="#FFF"/>
                </svg>
                <svg className={styles.circleFW} viewBox="0 0 1000 1000">
                <circle className={styles.path5} cx="500" cy="500" fill="none" r="420" stroke="#18FFFF"/>
                </svg>
                <svg className={styles.circleFW} viewBox="0 0 1000 1000">
                <circle className={styles.path6} cx="500" cy="500" fill="none" r="420" stroke="#18FFFF"/>
                </svg>
                <svg className={styles.circleSW} viewBox="0 0 1000 1000">
                <circle className={styles.path7} cx="500" cy="500" fill="none" r="420" stroke="#18FFFF"/>
                </svg>
                <svg className={styles.circleSW} viewBox="0 0 1000 1000" style={{animationTimingFunction: 'ease-in-out'}}>
                <circle className={styles.path8} cx="500" cy="500" fill="none" r="420" stroke="#18FFFF"/>
                <svg className={styles.circleFW} viewBox="0 0 1000 1000">
                    <circle className={styles.path9} cx="500" cy="500" fill="none" r="225" stroke="#18FFFF"/>
                </svg>
                </svg>
            </div>
        </Backdrop>
    )
};