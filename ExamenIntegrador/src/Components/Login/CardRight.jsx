import { useState } from 'react';
import { Box, Button, FormControl, Grid2, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import servicesAxios from '../../Services/axios'
import { useNavigate } from 'react-router-dom'

const CardRight = () => {
    //declaro estados
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({nombreUsuario: '', contrasenia: ''})
    //para ir al inicio una vez logueado
    const navigate = useNavigate()
    //control de expresiones regulares
    const nameER = /^[a-zA-Z ]{8,50}$/
    const contraseniaER = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    //propio de MaterialUI para la contraseña
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    //control del formulario
    const handleForm = (e) => {
        const { name, value } = e.target;
        setForm((input) => ({...input, [name]: value}));
    };

    //metodo para iniciar sesion
    const login = async() => 
    {
        try {
            const nombreUsuarioValido = nameER.test(form.nombreUsuario)
            const contraseniaValida = contraseniaER.test(form.contrasenia)

            if (nombreUsuarioValido && contraseniaValida)
            {

                const response = await servicesAxios.login({
                    nombreUsuario: form.nombreUsuario,
                    contrasenia: form.contrasenia
                })
    
                if(response)
                {
                    localStorage.setItem('token', response.token)
                    localStorage.setItem('nombreUsuario', response.data.nombreUsuario)
                    
                    console.log('Inicio de sesion exitoso')
    
                    navigate('/inicio')
                }
            }else{
                let msgNombreUsuario = ''
                let msgContrasenia = ''
                if (!nombreUsuarioValido) {
                    msgNombreUsuario = 'Nombre de Usuario invalido.\n\n'
                }
                if (!contraseniaValida) {
                    msgContrasenia = 'Contraseña invalida'
                }
                alert(`${msgNombreUsuario? msgNombreUsuario: ''}${msgContrasenia? msgContrasenia: ''}`)
            }

        } catch (error) {
            console.error('No se pudo iniciar sesion ', error.message)
        }
    }
    
    return(
        <Box sx={{
            width: {xs: '280px', sm: '375px' ,md: '330px'},
            maxWidth: '280px',
            height: {xs: '250px', sm: '250px' ,md: '250px'},
            backgroundColor: '#FFFFFF',
            color: '#202020',
            borderRadius: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: '15px',
            boxShadow: '0px 0px 4px #000000',
            '&:hover': {
                boxShadow: '0px 0px 12px 1px #000000',
            },
            transition: 'all .2s ease-out'
        }}>

            <Box sx={{
                width: {xs: '250px', sm: '280px', md: '270px'},
                maxWidth: '675px',
                textAlign: 'left',
            }}>
                <Typography sx={{
                    fontFamily: 'sans-serif',
                    fontSize: '25px',
                    fontWeight: 'bold',
                    marginBottom: '30px',
                    textAlign: 'center',
                }}> 
                    Logueate para jugar 
                </Typography>

                <Grid2 container rowSpacing={0} columnSpacing={3} sx={{mb: '20px'}}>
                    <Grid2 size={12}>
                        <TextField label='Nombre Usuario' size='small' variant='outlined' name="nombreUsuario" value={form.nombreUsuario} onChange={handleForm} sx={{
                            width: '100%',
                            height: '58px',
                            border: '1px #DCDBDD',
                        }}/>
                    </Grid2>

                    <Grid2 size={12}>
                        <FormControl size='small' sx={{ 
                            width: '100%',
                            height: '48px', 
                            border: '1px #DCDBDD',
                        }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                Contraseña
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                name='contrasenia'
                                value={form.contrasenia}
                                onChange={handleForm}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid2>
                </Grid2>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <Button onClick={login} sx={{
                        width: '164px',
                        height: '28px',
                        borderRadius: '12px',
                        backgroundColor: '#33A3AA',
                    }}> 
                        <Typography variant='p' sx={{
                            fontFamily: 'sans-serif',
                            fontSize: '14px',
                            fontWeight: '500',
                            textTransform: 'capitalize',
                            color: '#FFFFFF'
                        }}>
                            Iniciar Sesion
                        </Typography>
                    </Button>
                </Box>
            </Box>

        </Box>
    )
}

export default CardRight