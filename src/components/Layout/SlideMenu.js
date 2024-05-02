import { ChevronLeft, ChevronRight, ColorLens } from "@mui/icons-material";
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/reducerHook.ts";
import { switchBgColor } from "../../models/styleSwitch.ts";
import { routesConfig } from "../../routesConfig.js";
import styles from './layout.module.css';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme})=>({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const DesignedDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        zIndex: (theme) => theme.drawer.zIndex + 1,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const SlideListItem = ({name, clickFunc, startIcon}) => {
    return (
        <ListItem  
            disablePadding 
            sx={{ 
                display: 'block', 
                color: 'lightcyan',
                '&:hover': {
                    color: 'aqua',
                    "& .MuiListItemIcon-root": {
                        color: "aqua"
                    }
                },
            }}
        >
            <ListItemButton onClick={clickFunc}>
                <ListItemIcon sx={{color: 'lightcyan'}}>
                    {startIcon}
                </ListItemIcon>
                <ListItemText primary={name}/>
            </ListItemButton>
        </ListItem>
    );
};

const SlideMenu = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleMenuOpen = () => {
        setOpen(prev => !prev);
    };

    return (
        <DesignedDrawer 
            variant="permanent" 
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: "var(--navbarBackgroundColor)"
                }
            }}
            >
            <DrawerHeader>
                {open ? 
                    <h3 className={styles.logoText}>{'模擬監控平台'}</h3> 
                    : 
                    <></>
                }
                <IconButton sx={{color: 'aqua'}} onClick={()=>{handleMenuOpen()}}>
                    {open ? <ChevronLeft/> : <ChevronRight/>}
                </IconButton>
            </DrawerHeader>
            <Divider>
                <List>
                    {routesConfig.map((v)=>{
                        const MatchIcon = v.icon;
                        return (
                            <SlideListItem
                                key={v.name}
                                name={v.name}
                                clickFunc={()=>{navigate(v.route)}}
                                startIcon={<MatchIcon/>}
                            />
                        );
                    })}
                    <SlideListItem
                        name='切換介面風格'
                        clickFunc={()=>{dispatch(switchBgColor())}}
                        startIcon={<ColorLens/>}
                    />
                </List>
            </Divider>
        </DesignedDrawer>
    )
};

export default SlideMenu;