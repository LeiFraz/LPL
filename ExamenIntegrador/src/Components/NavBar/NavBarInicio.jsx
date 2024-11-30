import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const NavBarInicio = () => {
  const navigate = useNavigate();

  const iniciarSesion = () => navigate('/inicio-sesion');
  const registrarse = () => navigate('/registro');

  return (
    <>
      <Box sx={{
        padding: { xs: '8px 5px',sm: '10px 30px',md: '10px 30px'},
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#5dc1b9'
      }}>
        <Typography variant='h1' sx={{
              color: '#000000',
              fontWeight: 'bold',
              fontSize: { xs: '14px',sm: '20px',md: '25px'}
          }}> 
              Juego de Adivinanza 
          </Typography>

        <Box sx={{
          display: 'flex',
          justifyContent: 'end',
          gap: { xs: '10px',sm: '15px',md: '20px'},
        }}>
          <Button sx={{
            width: { xs: '104px',sm: '144px',md: '164px'},
            height: '28px',
            borderRadius: '12px',
            backgroundColor: '#338b85',
            '&:hover': {
              backgroundColor: '#005954',
            },
            color: '#ffffff',
            fontWeight: 'bold'
          }} onClick={() => {console.log('me hiciste click')}}>Cerrar Sesion</Button>
        </Box>
      </Box>
    </>
  );
};

export default NavBarInicio;