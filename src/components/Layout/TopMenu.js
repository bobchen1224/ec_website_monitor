import { ColorLens, Menu } from "@mui/icons-material";
import { AppBar, Box, Button, MenuItem, Toolbar } from "@mui/material";
import { DesignedMenu } from "../DesignedUITs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/reducerHook";
import { switchBgColor } from "../../models/styleSwitch";
import { routesConfig } from "../../routesConfig";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from './layout.module.css';

const TopMenu = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const langState = sessionStorage.getItem('lang state') || '';

    const [anchorNavEl, setAnchorNavEl] = useState('');
    const [languageState, setLanguageState] = useState(langState || 'zhTW');
    const navOpen = Boolean(anchorNavEl);

    const handleNavClick = (event) => {
        setAnchorNavEl(event.currentTarget);
    };

    const handleNavClose = () => {
        setAnchorNavEl('');
    };

    const handleLauguageChange = (lng) => {
        i18n.changeLanguage(lng)
        sessionStorage.setItem('lang state', lng);
        setLanguageState(lng);
    };

    useEffect(()=>{
        handleLauguageChange(languageState);
    },[]);

    return (
        <AppBar position="static" sx={{backgroundColor: 'var(--navbarBackgroundColor)'}}>
            <Toolbar>
                <Box sx={{width: '33%'}}>
                    <Button
                        variant="texted"
                        className={styles.slideButton}
                        onClick={handleNavClick}
                    >
                        <Menu/>
                    </Button>
                    <DesignedMenu
                        anchorEl={anchorNavEl}
                        open={navOpen}
                        onClose={handleNavClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                            onMouseLeave: handleNavClose,
                        }}
                    >
                        {routesConfig.map((v)=>{
                            const MatchIcon = v.icon;
                            return (
                                <MenuItem
                                    key={v.name}
                                    onClick={()=>{navigate(v.route)}}
                                >
                                    <MatchIcon sx={{marginRight: '0.8rem'}}/>
                                    {`${t(`${v.menuTitle}`)}`}
                                </MenuItem>
                            );
                        })}
                        <MenuItem
                            onClick={()=>{dispatch(switchBgColor())}}
                        >
                            <ColorLens sx={{marginRight: '0.8rem'}}/>
                            {t("changeStyle")}
                        </MenuItem>
                        <MenuItem
                            onClick={()=>{
                                handleLauguageChange(languageState === 'zhTW' ? 'en' : 'zhTW')
                            }}
                        >
                            <ColorLens sx={{marginRight: '0.8rem'}}/>
                            {t("changeLanguage")}
                        </MenuItem>
                    </DesignedMenu>
                </Box>
                <Box sx={{width: '33%'}}>
                    <h4 className={styles.logoText}>
                        {t("projectNameLogo")}
                    </h4>
                </Box>
            </Toolbar>
        </AppBar>
    )    
};

export default TopMenu;