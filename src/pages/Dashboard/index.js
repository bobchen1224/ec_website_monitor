import { Box, Grid } from "@mui/material";

const Dashboard = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid item xs={12} md={6} lg={3}>
                    <Box sx={{backgroundColor: '#0c1427', color: 'lightcyan'}}>
                        <h3>
                            當日總營收
                        </h3>
                        <h2>
                            
                        </h2>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default Dashboard;