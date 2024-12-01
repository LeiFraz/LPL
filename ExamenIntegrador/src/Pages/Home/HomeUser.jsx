import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import Game from "../../Components/Game/Game";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import servicesAxios from "../../Services/axios";

const HomeUser = () => {
    //mostrar u ocultar juego
    const [currentGame, setCurrentGame] = useState(false)
    //mostrar u ocultar dificultad al iniciar juego
    const [initialize, setInitilize] = useState(false)
    //mostrar u ocultar la seleccion de juegos pausado
    const [selectGame, setSelectGame] = useState(false)
    //guardar los juegos que esten en pausa
    const [gamesSaves, setGameSaves] = useState([])

    //crear valor de X
    const [createX, setCreateX] = useState(0)
    //dificultad seleccionada
    const [gameConfig, setGameConfig] = useState({difficulty: 0})
    //juego seleccionado
    const [gameSelected, setGameSelected] = useState({id: 0, numero: 0})
    //habilitar o deshabilitar botones
    const [disableButtonStartGame, setDisableButtonStartGame] = useState(false)
    const [disableButtonContinueGame, setDisableButtonContinueGame] = useState(false)
    const [disableButtonStatistics, setDisableButtonStatistics] = useState(false)
    
    const navigate = useNavigate()
    const ranking = () => navigate('/ranking')

    const selectDifficulty = () => {
        //mostrar la dificultad
        setInitilize(true)
    }

    //obtener la dificultad seleccionada
    const handleForm = (e) => {
        const { name, value } = e.target;
        setGameConfig((input) => ({...input, [name]: value}));
    }

    //obtener el juego seleccionado
    const handleSelectGame = (e) => {
        const { name, value } = e.target;
        setGameSelected((input) => ({...input, [name]: value}));
    }

    const cancelStartGame = () => {
        //ocultamos la dificultad en caso de que no quiera jugar una nueva partida
        setInitilize(false)
        setGameConfig({difficulty: 0})
    }

    const startGame = () => {
        //comenzar el juego
        //inicializamos de acuerdo a la dificultad seleccionada
        switch (gameConfig.difficulty) {
            case 0:
                setCreateX(Math.round(Math.random() * (2999 - 1000 + 1) + 1000))
                localStorage.setItem('difficulty','baja')
                break;
            case 1:
                setCreateX(Math.round(Math.random() * (11500 - 8500 + 1) + 8500))
                localStorage.setItem('difficulty','media')
            break;
            case 2:
                setCreateX(Math.round(Math.random() * (18000 - 15000 + 1) + 15000))
                localStorage.setItem('difficulty','alta')
            break;
        
            default:
                break;
        }
        //ocultar la dificultad
        setInitilize(false)
        
        //deshabilitar botones
        setDisableButtonStartGame(true)
        setDisableButtonContinueGame(true)
        setDisableButtonStatistics(true)

        //mostrar el juego
        setCurrentGame(true);
    }

    //pausar el juego y guardarlo
    const pauseGame = async(clews, numbersRisks) => {
        //habilitamos los botones
        try {
            setDisableButtonStartGame(false)
            setDisableButtonContinueGame(false)
            setDisableButtonStatistics(false)
    
            //ocultamos el juego
            setCurrentGame(false)
            alert('se guardó su progreso')
    
            //DATOS A GUARDAR
            let data;
    
            if (localStorage.getItem('idJuego'))
            {
                data = {
                    juego_id: localStorage.getItem('idJuego'),
                    // dificultad: localStorage.getItem('difficulty'),
                    estado: 'pausado',
                    pistas: clews,
                    numerosArriesgados: numbersRisks
                    // numero: createX
                    // 'inicio' => Hash::make($request->contrasenia),
                    // 'fin' => $request->fechaNacimiento,
                }
                const response = await servicesAxios.savePauseGame(data)
                console.log(response)
            }else{
                data = {
                    nombreUsuario: localStorage.getItem('nombreUsuario'),
                    dificultad: localStorage.getItem('difficulty'),
                    estado: 'pausado',
                    numero: createX,
                    pistas: clews,
                    numerosArriesgados: numbersRisks
                    // 'inicio' => Hash::make($request->contrasenia),
                    // 'fin' => $request->fechaNacimiento,
                }
                const response = await servicesAxios.saveGame(data)
                console.log(response)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    //guardar el juego por que finalizó
    const endGame = async(winOrDefeat,clews,numbersRisks) => {
        try {
            let data;
            switch (winOrDefeat) {
                case 0:
                    //Comprobar si idJuego EXISTE en LOCALSTORAGE para guardarlo de otra manera
                    console.log('tiempo')
                    data = {
                        nombreUsuario: localStorage.getItem('nombreUsuario'),
                        dificultad: localStorage.getItem('difficulty'),
                        estado: 'gano',
                        numero: createX,
                        pistas: clews,
                        numerosArriesgados: numbersRisks
                        // 'inicio' => Hash::make($request->contrasenia),
                        // 'fin' => $request->fechaNacimiento,
                    }

                    break;
                case 1:
                    data = {
                        nombreUsuario: localStorage.getItem('nombreUsuario'),
                        dificultad: localStorage.getItem('difficulty'),
                        estado: 'perdio',
                        numero: createX,
                        pistas: clews,
                        numerosArriesgados: numbersRisks
                        // 'inicio' => Hash::make($request->contrasenia),
                        // 'fin' => $request->fechaNacimiento,
                    }
                break;
                
                default:
                    break;
            }

            const response = await servicesAxios.saveGame(data)
            console.log(response)
            ranking()
        } catch (error) {
            console.log(error)
        }
    }

    //mostrar partidas guardadas
    const selectedGameSave = async() => {
        setSelectGame(true)
        const response = await servicesAxios.searchGames(localStorage.getItem('nombreUsuario'))
        setGameSaves(response)
    }
    //cancelar vista
    const cancelGameSave = async() => {
        setSelectGame(false)
    }
    //continuar juego guardado
    const continueGame = () => {
        //createX se reemplaza, setCreateX(Math.round(Math.random() * (2999 - 1000 + 1) + 1000))
        if (gameSelected.id === '---'){

        }else{
            setCreateX(gameSelected.numero)
            localStorage.setItem('idJuego', gameSelected.id)
    
            setSelectGame(false)
    
            //deshabilitar botones
            setDisableButtonStartGame(true)
            setDisableButtonContinueGame(true)
            setDisableButtonStatistics(true)
    
            //mostrar el juego
            setCurrentGame(true);
        }
    }

    //Estado para mostrar u ocultar la dificultad
    useEffect(() =>{
    }, [initialize])
    //Estado para mostrar u ocultar el juego
    useEffect(() =>{
    }, [currentGame])
    //Estado para mostrar u ocultar la dificultad
    useEffect(() =>{
    }, [selectGame])
    return (
        <>
            <Box sx={{
            width: '100vw',
            height: {xs:'91.6vh', sm: '91.4vh',md: '91.4vh'},
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px'
            }}>
                <Box>
                    <Typography sx={{
                        color: '#000000'
                    }}> Este es el mensaje de la ultima partida</Typography>
                </Box>
                <Box>
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
                    }} size='small' disabled={disableButtonStartGame} onClick={selectDifficulty}> Iniciar Partida</Button>
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
                    }} size='small' disabled={disableButtonContinueGame} onClick={selectedGameSave}> Retomar Partida</Button>
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
                    }} size='small' disabled={disableButtonStatistics} onClick={console.log()}> Estadisticas Personales</Button>
                </Box>
                {initialize ? (
                    <Box>
                        <FormControl size='small' sx={{
                            width: {xs: '100%', sm: '140px', md: '180px'},
                            height: '48px',
                        }}>
                            <InputLabel id="demo-simple-select-label">Seleccione Dificultad</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gameConfig.difficulty}
                            label="difficulty"
                            name="difficulty"
                            onChange={handleForm}
                            sx={{textAlign: 'left'}}
                            >
                                <MenuItem value={0}>bajo</MenuItem>
                                <MenuItem value={1}>medio</MenuItem>
                                <MenuItem value={2}>alto</MenuItem>
                            </Select>
                        </FormControl>
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
                        }} onClick={startGame}> Comenzar Juego</Button>
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
                        }} onClick={cancelStartGame}> Cancelar</Button>
                    </Box>
                ) : (
                    <></>
                )}

                {selectGame ? (
                    <Box>
                        <FormControl size='small' sx={{
                            width: {xs: '100%', sm: '140px', md: '180px'},
                            height: '48px',
                        }}>
                            <InputLabel id="demo-simple-select-label">Seleccione Partida</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gameSelected.id}
                            label="selectGame"
                            name="selectGame"
                            onChange={handleSelectGame}
                            sx={{textAlign: 'left'}}
                            >
                            {gamesSaves? (
                                gamesSaves.map((element, index) => (
                                    <MenuItem key={index} value={element.id}>{'Juego ' + index+1}</MenuItem>
                                ))
                            ) : (
                                <MenuItem value={'---'}>---</MenuItem>
                            )}
                            </Select>
                        </FormControl>
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
                        }} onClick={continueGame}> Continuar Juego</Button>
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
                        }} onClick={cancelGameSave}> Cancelar</Button>
                    </Box>
                ) : (
                    <></>
                )}

                { currentGame? (
                    <Game pauseGame={pauseGame} currentGame={currentGame} endGame={endGame} createX={createX}/>
                ) : (
                    <></>
                )

                }
                
            </Box>
        </>
    )
}

export default HomeUser;