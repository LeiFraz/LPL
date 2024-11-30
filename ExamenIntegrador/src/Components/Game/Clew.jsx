import { Box, Typography } from "@mui/material";


const Clew = ({clews}) => {

    // console.log(clews)

    return (
        <>
            <Box sx={{
                width: {xs: '300px', sm: '375px' ,md: '500px'},
                maxWidth: '500px',
                height: {xs: '140px', sm: '140px'},
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                color: '#202020',
                borderRadius: '32px',
                boxShadow: '0px 0px 4px #000000',
            }}>
                <Box sx={{
                    width: {xs: '250px', sm: '340px' ,md: '450px'},
                    maxWidth: '450px',
                    height: {xs: '120px', sm: '120px'},
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    overflow: 'scroll'
                }}>
                    <Typography sx={{
                        color: '#000000',
                        fontWeight: 'bold',
                        textAlign: 'left'
                    }}> Pistas </Typography>
                    <Box>
                        {clews.length ? (
                            clews.map((element,index) => (
                                <Typography key={index} sx={{color: '#000000'}}> {element} </Typography>
                            ))
                        ) : (
                            <></>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Clew;