import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {

const navigate = useNavigate();
const paginaRegistro = () => navigate('/registro')
const paginaInicioSesion = () => navigate('/inicio-sesion')

    return(
        <>
            <Box sx={{ 
                display: 'flex',
                width: '100vw',
                height: '100vh',
            }}>
                <Box sx={{ 
                    m: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px'
                }}>
                    <Box sx={{
                        display: 'flex',
                        gap: '30px',
                        justifyContent: 'center'
                    }}>
                        <Button onClick={paginaInicioSesion} sx={{
                            width: '164px',
                            height: '28px',
                            borderRadius: '12px',
                            backgroundColor: '#338b85',
                            '&:hover': {
                            backgroundColor: '#005954',
                            },
                            color: '#ffffff',
                            fontWeight: 'bold'
                        }}> 
                            Iniciar Sesion 
                        </Button>
                        <Button onClick={paginaRegistro} sx={{
                            width: '164px',
                            height: '28px',
                            borderRadius: '12px',
                            backgroundColor: '#338b85',
                            '&:hover': {
                            backgroundColor: '#005954',
                            },
                            color: '#ffffff',
                            fontWeight: 'bold'
                        }}> Registrarse </Button>
                    </Box>
                    <Typography variant='h1' sx={{
                        color: '#000000'
                    }}> 
                        Juego de Adivinanza 
                    </Typography>
                </Box>
            </Box>
        </>
    )
}
export default Home;