import { useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid2, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'
import servicesAxios from '../../Services/axios';

const CardRight = () => {
    //declaro estados
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({nombreUsuario: '',email: '', contrasenia: '', fechaNacimiento: '', pais: ''})
    const [paises, setPaises] = useState([])
    //para ir al login
    const navigate = useNavigate()
    //control de expresiones regulares
    const nameER = /^[a-zA-Z ]{8,50}$/
    const emailER = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/
    const passwordER = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

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

    //metodo para registrarse
    const register = async() => 
    {
        try {
            const nombreValido = nameER.test(form.nombreUsuario)
            const emailValido = emailER.test(form.email)
            const contraseniaValida = passwordER.test(form.contrasenia)
            const fechaNacimientoValida = passwordER.test(form.fechaNacimiento)
            const paisValido = passwordER.test(form.pais)

            if (nombreValido && emailValido && contraseniaValida && fechaNacimientoValida && paisValido)
            {
                const response = await servicesAxios.register({
                    nombreUsuario: form.nombreUsuario,
                    email: form.email,
                    contrasenia: form.contrasenia
                })

                if(response)
                {
                    console.log('Su registro fue exitoso')
                    alert('Su registro fue exitoso')
                    navigate('/inicio-sesion')
                }
            }else{
                let msgNombreUsuario = ''
                let msgEmail = ''
                let msgContrasenia = ''

                if (!nombreValido) {
                    msgNombreUsuario = 'Nombre de usuario invalido: Debe contener entre 2 - 50 letras incluyendo el espacio.\n\n'
                }
                if (!emailValido) {
                    msgEmail = 'Email invalido.\n\n'
                }
                if (!contraseniaValida) {
                    msgContrasenia = 'Contraseña invalida: Debe contener como minimo 8 caracteres, entre ellos 1 letra y 1 numero'
                }
                alert(`${msgNombreUsuario? msgNombreUsuario: ''}${msgEmail? msgEmail: ''}${msgContrasenia? msgContrasenia: ''}`)
            }
        } catch (error) {
            console.error('No se pudo iniciar sesion ', error.message)
        }
    }
    
    //renderizado continuo, para que cargue los paises
    useEffect(() => {
        const traerPaises = async() => {
            try {
                const response = await servicesAxios.traerPaises()
                setPaises(response)
            } catch (error) {
                console.error(error)
            }
        }

        traerPaises();
    }, [paises])

    return(
        <Box sx={{
            width: {xs: '300px', sm: '375px' ,md: '500px'},
            maxWidth: '500px',
            height: {xs: '350px', sm: '280px'},
            backgroundColor: '#FFFFFF',
            color: '#202020',
            borderRadius: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            <Box sx={{
                width: {xs: '250px', sm: '300px', md: '400px'},
                maxWidth: '675px',
                textAlign: 'left',
            }}>
                <Typography sx={{
                    fontFamily: 'sans-serif',
                    fontSize: {xs: '18px', sm: '25px'},
                    fontWeight: 'bold',
                    marginBottom: '15px',
                    textAlign: 'center'
                }}> 
                    Registrarse para jugar 
                </Typography>

                <Grid2 container rowSpacing={0} columnSpacing={{xs: 0, sm: 2, md: 3}} sx={{mb: '20px'}}>
                    <Grid2 size={{xs: 12, sm: 6, md: 6}}>
                        <TextField label='Nombre Usuario' size='small' variant='outlined' name="nombreUsuario" value={form.nombreUsuario} onChange={handleForm} sx={{
                            width: {xs: '100%', sm: '140px', md: '180px'},
                            height: '48px',
                            border: '1px #DCDBDD',
                        }}/>
                    </Grid2>

                    <Grid2 size={{xs: 12, sm: 6, md: 6}}>
                        <TextField label='Email' size='small' variant='outlined' name="email" value={form.email} onChange={handleForm} sx={{
                            width: {xs: '100%', sm: '140px', md: '180px'},
                            height: '48px',
                            border: '1px #DCDBDD',
                        }}/>
                    </Grid2>

                    <Grid2 size={{xs: 12, sm: 6, md: 6}}>

                        <FormControl size='small' sx={{
                            width: {xs: '100%', sm: '140px', md: '180px'},
                            height: '48px',
                        }}>
                            <InputLabel id="demo-simple-select-label">Seleccione Pais</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={form.pais}
                            label="pais"
                            name="pais"
                            onChange={handleForm}
                            sx={{textAlign: 'left'}}
                            >
                                { paises.length > 0 ? (
                                    paises.map((pais, index) => (
                                        <MenuItem key={index} value={pais.name}>{pais.name}</MenuItem>
                                    ))
                                ) : (
                                    <MenuItem value={'---'}>{'---'}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid2>

                    <Grid2 size={{xs: 12, sm: 6, md: 6}}>
                        <FormControl size='small' sx={{ 
                            width: {xs: '100%', sm: '140px', md: '180px'}, 
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

                    <Grid2 size={12}>
                        <input style={{
                            width: '100%',
                            height: '30px',
                            backgroundColor: 'lightgray',
                            color: '#000000',
                            border: '1px solid gray',
                            borderRadius: '5px',
                        }} type='date'/>
                    </Grid2>

                </Grid2>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <Button onClick={register} sx={{
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
                            Registrarse
                        </Typography>
                    </Button>
                </Box>
            </Box>

        </Box>
    )
}

export default CardRight