import { AdsClick, ChevronLeft, ChevronRight, ColorLens, Dashboard } from "@mui/icons-material";
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/reducerHook.ts";
import { switchBgColor } from "../../models/styleSwitch.ts";

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
                  backgroundColor: "var(--navbarBackgroundColor)",
                  zIndex: 1040,
                }
            }}
            >
            <DrawerHeader>
                <IconButton sx={{color: 'aqua'}} onClick={()=>{handleMenuOpen()}}>
                    {open ? <ChevronLeft/> : <ChevronRight/>}
                </IconButton>
            </DrawerHeader>
            <Divider>
                <List>
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
                        <ListItemButton onClick={()=>{navigate('/')}}>
                            <ListItemIcon sx={{color: 'lightcyan'}}>
                                <Dashboard/>
                            </ListItemIcon>
                            <ListItemText primary="營運狀態總覽"/>
                        </ListItemButton>
                    </ListItem>
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
                        <ListItemButton onClick={()=>{navigate('/adsMonitor')}}>
                            <ListItemIcon sx={{color: 'lightcyan'}}>
                                <AdsClick/>
                            </ListItemIcon>
                            <ListItemText primary="廣告活動監控"/>
                        </ListItemButton>
                    </ListItem>
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
                        <ListItemButton onClick={()=>{dispatch(switchBgColor())}}>
                            <ListItemIcon sx={{color: 'lightcyan'}}>
                                <ColorLens/>
                            </ListItemIcon>
                            <ListItemText primary="切換介面風格"/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Divider>
        </DesignedDrawer>
    )
};

export default SlideMenu;