import { AdsClick, Dashboard } from "@mui/icons-material";
import { AppBar, Button, Toolbar } from "@mui/material";
import styles from './layout.module.css'

const TopMenu = () => {
    return (
        <AppBar position="static" sx={{backgroundColor: '#0E2545'}}>
            <Toolbar>
                <Button
                    variant='texted' 
                    className={styles.slideButton}
                    startIcon={<Dashboard/>}
                    >
                    營運狀態總覽
                </Button>
                <Button
                    variant='texted' 
                    className={styles.slideButton}
                    startIcon={<AdsClick/>}
                    >
                    廣告監控平台
                </Button>
            </Toolbar>
        </AppBar>
    )    
};

export default TopMenu;