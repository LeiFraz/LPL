import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import Game from "../../Components/Game/Game";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeUser = () => {
    const [currentGame, setCurrentGame] = useState(false)
    const [initialize, setInitilize] = useState(false)
    const [createX, setCreateX] = useState(0)
    const [gameConfig, setGameConfig] = useState({difficulty: 0})
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
                break;
            case 1:
                setCreateX(Math.round(Math.random() * (11500 - 8500 + 1) + 8500))
            break;
            case 2:
                setCreateX(Math.round(Math.random() * (18000 - 15000 + 1) + 15000))
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
    const pauseGame = () => {
        //habilitamos los botones
        setDisableButtonStartGame(false)
        setDisableButtonContinueGame(false)
        setDisableButtonStatistics(false)

        //ocultamos el juego
        setCurrentGame(false)
        alert('se guardó su progreso')

        console.log(createX)
        console.log('nombre del usuario')
        console.log('tiempo')
    }

    //guardar el juego por que finalizó
    const endGame = (winOrDefeat) => {
        
        console.log('se termino y guardo los datos')
        console.log(createX)
        console.log('nombre del usuario')
        console.log('tiempo')
        console.log(winOrDefeat === 0 ? 'gano' : 'perdio')

        ranking()
    }

    //Estado para mostrar u ocultar la dificultad
    useEffect(() =>{

    }, [initialize])

    //Estado para mostrar u ocultar el juego
    useEffect(() =>{

    }, [currentGame])

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
                    <Button size='small' disabled={disableButtonStartGame} onClick={selectDifficulty}> Iniciar Partida</Button>
                    <Button size='small' disabled={disableButtonContinueGame} onClick={console.log()}> Retomar Partida</Button>
                    <Button size='small' disabled={disableButtonStatistics} onClick={console.log()}> Estadisticas Personales</Button>
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
                        <Button onClick={startGame}> Comenzar Juego</Button>
                        <Button onClick={cancelStartGame}> Cancelar</Button>
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