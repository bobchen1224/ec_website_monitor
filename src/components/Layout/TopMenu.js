import { AdsClick, Dashboard } from "@mui/icons-material";
import { AppBar, Button, Toolbar } from "@mui/material";
import styles from './layout.module.css'
import { useNavigate } from "react-router-dom";

const TopMenu = () => {
    const navigate = useNavigate();
    return (
        <AppBar position="static" sx={{backgroundColor: 'var(--navbarBackgroundColor)'}}>
            <Toolbar>
                <Button
                    variant='texted' 
                    className={styles.slideButton}
                    startIcon={<Dashboard/>}
                    onClick={()=>{navigate('/')}}
                    >
                    營運狀態總覽
                </Button>
                <Button
                    variant='texted' 
                    className={styles.slideButton}
                    startIcon={<AdsClick/>}
                    onClick={()=>{navigate('/adsMonitor')}}
                    >
                    廣告監控平台
                </Button>
            </Toolbar>
        </AppBar>
    )    
};

export default TopMenu;