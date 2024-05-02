import { ColorLens, Menu } from "@mui/icons-material";
import { AppBar, Box, Button, MenuItem, Toolbar } from "@mui/material";
import { DesignedMenu } from "../DesignedUITs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/reducerHook";
import { switchBgColor } from "../../models/styleSwitch";
import { routesConfig } from "../../routesConfig";
import styles from './layout.module.css'
import { useState } from "react";

const TopMenu = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [anchorNavEl, setAnchorNavEl] = useState('');
    const navOpen = Boolean(anchorNavEl);

    const handleNavClick = (event) => {
        setAnchorNavEl(event.currentTarget);
    };

    const handleNavClose = () => {
        setAnchorNavEl('');
    };

    return (
        <AppBar position="static" sx={{backgroundColor: 'var(--navbarBackgroundColor)'}}>
            <Toolbar>
                <Box>
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
                                    {`${v.name}`}
                                </MenuItem>
                            );
                        })}
                        <MenuItem
                            onClick={()=>{dispatch(switchBgColor())}}
                        >
                            <ColorLens sx={{marginRight: '0.8rem'}}/>
                            {'切換介面風格'}
                        </MenuItem>
                    </DesignedMenu>
                </Box>
            </Toolbar>
        </AppBar>
    )    
};

export default TopMenu;