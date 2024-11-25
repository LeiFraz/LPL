import { Box, Button } from "@mui/material";
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
                    m: 'auto'
                }}>
                    <Button onClick={paginaInicioSesion} sx={{
                        mr: '20px'
                    }}> 
                        Iniciar Sesion 
                    </Button>
                    <Button onClick={paginaRegistro}> Registrarse </Button>
                    <h1> Juego de Adivinanza </h1>
                </Box>
            </Box>
        </>
    )
}
export default Home;