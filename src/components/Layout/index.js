import { Box, useMediaQuery, useTheme } from "@mui/material";
import SlideMenu from "./SlideMenu";
import TopMenu from "./TopMenu";
import { CyberpunkLoader } from "../DesignedUITs/index.tsx";
import { useAppSelector } from "../../app/reducerHook.ts";

const MainLayout = ({children}) => {
    const loading = useAppSelector(state => state.dataHandle.loadingStatus);
    const theme = useTheme();
    const smCheck = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <>
            {smCheck ? <SlideMenu/> : <TopMenu/>}
            <CyberpunkLoader loading={loading}/>
            <Box sx={{
                backgroundColor: '#070D19', 
                minHeight: '100vh', 
                paddingLeft: smCheck ? '100px' : '0',
                paddingRight: smCheck ? '20px' : '0', 
                paddingTop: '1rem', 
                boxSizing: 'border-box'
                }}>
                {children}
            </Box>
        </>
    )
};

export default MainLayout;