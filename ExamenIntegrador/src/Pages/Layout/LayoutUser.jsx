import { Outlet as Page } from 'react-router-dom'
import NavBarInicio from '../../Components/NavBar/NavBarInicio';
import { Box } from '@mui/material';

const LayoutUser = () =>{

    return(
        <>
            <NavBarInicio/>   
            <Box sx={{
            width: '100vw',
            height: {xs:'91.6vh', sm: '91.4vh',md: '91.4vh'},
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            }}>
                <Page/>
            </Box>
        </>
    )
}

export default LayoutUser;