import { Backdrop, Box } from "@mui/material";
import styles from './designedUI.module.css';

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

export const ChartBox = ({children}) => {
    return (
        <Box sx={{border: '3px solid aqua', borderRadius: '10px', boxShadow: '0 0 0.8rem aqua'}}>
            {children}
        </Box>
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