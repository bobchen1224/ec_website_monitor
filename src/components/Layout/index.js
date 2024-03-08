import { Box, useMediaQuery, useTheme } from "@mui/material";
import SlideMenu from "./SlideMenu";
import TopMenu from "./TopMenu";

const MainLayout = ({children}) => {
    const theme = useTheme();
    const smCheck = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <>
            {smCheck ? <SlideMenu/> : <TopMenu/>}
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