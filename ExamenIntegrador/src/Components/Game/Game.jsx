import { Box, Button, TextField, Typography } from "@mui/material";
import Clew from "../../Components/Game/Clew";
import { useEffect, useState } from "react";

const Game = ({pauseGame, currentGame, endGame, createX, gameSelected}) => {
    //si currentGame es verdadero, el juego empieza a contar tiempo y todo

    //numero que escribió el usuario
    const [numberSelected, setNumberSelected] = useState({numeroIngresado: 0})
    const [intRealizados, setIntRealizados] = useState(localStorage.getItem('idJuego') ? gameSelected.intRealizados : 0)
    const [intRestantes, setIntRestantes] = useState(localStorage.getItem('idJuego') ? gameSelected.intRestantes : 12)
    const [msj, setMsj] = useState('')
    const [numbersRisks, setNumberRisk] = useState([])
    
    //guardo todas las pistas
    const [clews, setClews] = useState(localStorage.getItem('idJuego') ? gameSelected.pistas[gameSelected.pistas.length-1] :[])
    const [allClews, setAllClews] = useState(localStorage.getItem('idJuego') ? gameSelected.pistas :[])
    //compruebo si hay cambios en las pistas
    const [newClew, setNewClew] = useState(false)

    const test = () => {
        if (!isNaN(numberSelected.numeroIngresado)){
            if (intRestantes === 1) {
                setIntRestantes(intRestantes - 1)
                setIntRealizados(intRealizados + 1)
                alert('Lo sentimos ah PERDIDO, ustéd no pudo acertar el numero!!!')
                //PASAR EL TIEMPO
                endGame(1,allClews,numbersRisks,intRealizados,intRestantes)
            } else {
                if(numberSelected.numeroIngresado === createX){
                    alert('Felicidades ah GANADO, ustéd acertó el numero!!!')
                    //PASAR EL TIEMPO
                    endGame(0,allClews,numbersRisks,intRealizados,intRestantes)
                }else{
                    setMsj('El numero  no coincide con X, recuerde chequear las pistas!')
                    setNumberRisk([...numbersRisks,numberSelected.numeroIngresado])
                    setIntRestantes(intRestantes - 1)
                    setIntRealizados(intRealizados + 1)
                    setNewClew(true)
                }
            }
        }
    }

    const handleForm = (e) => {
        const { name, value } = e.target;
        setNumberSelected((input) => ({...input, [name]: parseInt(value)}));
    }

    useEffect(() => {
        //para que se rendericen las pistas
        console.log(allClews)
        switch (intRealizados) {
            case 0:
                setNewClew(true)
                break;
            case 3:
                setNewClew(false)
            break;
            case 6:
                setNewClew(false)
            break;
            case 9:
                setNewClew(false)
            break;
        
            default:
                break;
        }
        

    },[intRealizados])

    useEffect(()=>{
        switch (intRealizados) {
            case 0:
                const left = createX - Math.round(Math.random() * (80 - 40 + 1) + 40)
                const right = createX + Math.round(Math.random() * (80 - 40 + 1) + 40)
                setClews([`El número X está comprendido entre los numeros ${left} y ${right}.`])
                setAllClews([`El número X está comprendido entre los numeros ${left} y ${right}.`])
                break;
            case 3:
                //segunda pista
                const numbers = [2,3,5,7]
                const isDivisible = numbers.map((num) => 
                    createX % num === 0 ? ` El numero X es divisible por ${num}`: ` El numero X no es divisible por ${num}` 
                )
                
                setClews([isDivisible])
                setAllClews([...allClews,isDivisible.join(',')])
            break;
            case 6:
                 //tercera pista
                const d = Math.floor(createX / 10) 
                const c = Math.floor(createX / 100) 
                const evenD = d % 2 === 0 ? 'pares': 'impares'
                const evenC = c % 2 === 0 ? 'pares': 'impares'
                
                setClews([`Las centenas son ${evenC}, y las decenas son ${evenD}.`])
                setAllClews([...allClews,`Las centenas son ${evenC}, y las decenas son ${evenD}.`])
            break;
            case 9:
                //cuarta pista
                const textCreateX = String(createX)
                let sum = 0

                for (let index = 0; index < String(createX).length; index++) {
                    sum += parseInt(textCreateX[index])
                }

                setClews([`La suma de sus cifras dan ${sum}.`])
                setAllClews([...allClews,`La suma de sus cifras dan ${sum}.`])
            break;
        
            default:
                break;
        }
    },[newClew])
    
    return (
        <>
            <Box sx={{
                    width: {xs: '300px', sm: '375px' ,md: '500px'},
                    maxWidth: '500px',
                    height: {xs: '350px', sm: '280px'},
                    backgroundColor: '#FFFFFF',
                    color: '#202020',
                    borderRadius: '32px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0px 0px 4px #000000',
                }}>
                    <Box sx={{
                        width: {xs: '100px', sm: '100px' ,md: '380px'},
                        height: {xs: '180px', sm: '240px'},
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '30px'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            gap: '30px'
                        }}>
                            <Typography sx={{
                                color: '#000000'
                            }}>
                                Intentos Realizados: {intRealizados}
                            </Typography>
                            <Typography sx={{
                                color: '#000000'
                            }}>
                                Intentos Restantes: {intRestantes}
                            </Typography>
                            <Typography sx={{
                                color: '#000000'
                            }}>
                                Tiempo: {}
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            height: {xs:'100px', sm:'100px', md:'100px'}
                        }}>

                            <Typography sx={{
                                color: '#000000'
                            }}> 
                                {msj}
                            </Typography>
                            <Typography sx={{
                                color: '#000000'
                            }}> 
                                {localStorage.getItem('idJuego') ? clews.descripcion: clews.join(', ')}
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <TextField 
                            label='Ingrese su numero'
                            value={numberSelected.numeroIngresado}
                            name='numeroIngresado' 
                            type='number'
                            onChange={handleForm} 
                            size='small'></TextField>
                            <Button size='small' onClick={test}> Intentar</Button>
                            <Button size='small' onClick={() => pauseGame(allClews,numbersRisks,intRealizados,intRestantes)}> Pausar Partida</Button>
                        </Box>
                    </Box>

                    <Box sx={{
                        width: {xs: '100px', sm: '100px' ,md: '90px'},
                        height: {xs: '180px', sm: '240px'},
                        backgroundColor: '#9ce0db',
                        borderRadius: '5px',
                        boxShadow: '0px 0px 3px #000000',
                    }}>
                        <Typography sx={{
                            color: '#000000'
                        }}> 
                            N° Arriesgado
                        </Typography>
                        {numbersRisks.length > 0 ? (
                            numbersRisks.map((element,index) => (
                                <Typography key={index} sx={{
                                    color: '#000000'
                                }}>
                                    {index+1}: {' '+element} 
                                </Typography>
                            ))
                        ) : (
                            <></>
                        )}
                    </Box>
                </Box>

                <Clew clews={allClews}/>
        </>
    )
}

export default Game;