import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react";


const Ranking = () => {
    const [datos, setDatos] = useState([])

    useEffect(() => {
        const getRanking = async() => {

        }

        getRanking()
    },[])

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
                // alignItems: 'center',
                boxShadow: '0px 0px 4px #000000',
            }}>
                <Box>
                <TableContainer component='Paper'>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontSize: '14px', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', color: '#000000'}}>
                                    Nombre
                                </TableCell>
                                <TableCell sx={{fontSize: '14px', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', color: '#000000'}} align="right">
                                    Dificultad
                                </TableCell>
                                <TableCell sx={{fontSize: '14px', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', color: '#000000'}} align="right">
                                    Tiempo
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { datos ? (
                                 datos.map((dato, index) => (
                                    <TableRow key={index} sx={{ 
                                        '&:last-child td, &:last-child th': { border: 0 } 
                                    }}>
                                        <TableCell sx={{fontSize: '12px', fontWeight: '400', fontFamily: 'Poppins, sans-serif', color: '#000000'}} align="right">
                                            {dato.nombreUsuario}
                                        </TableCell>
                                        <TableCell sx={{fontSize: '12px', fontWeight: '400', fontFamily: 'Poppins, sans-serif', color: '#000000'}} align="right">
                                            {dato.dificultad}
                                        </TableCell>
                                        <TableCell sx={{fontSize: '12px', fontWeight: '400', fontFamily: 'Poppins, sans-serif', color: '#000000'}} align="right">
                                            {dato.tiempo}
                                        </TableCell>
                                    </TableRow>
                                 ))
                            ) : (
                                <TableRow key={1} sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 } 
                                }}>
                                    <TableCell sx={{fontSize: '12px', fontWeight: '400', fontFamily: 'Poppins, sans-serif', color: '#000000'}} align="right">
                                        {''}
                                    </TableCell>
                                    <TableCell sx={{fontSize: '12px', fontWeight: '400', fontFamily: 'Poppins, sans-serif', color: '#000000'}} align="right">
                                        {''}
                                    </TableCell>
                                    <TableCell sx={{fontSize: '12px', fontWeight: '400', fontFamily: 'Poppins, sans-serif', color: '#000000'}} align="right">
                                        {''}
                                    </TableCell>
                                </TableRow>
                            )
                                
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                </Box>
            </Box>
        </>
    )
}

export default Ranking