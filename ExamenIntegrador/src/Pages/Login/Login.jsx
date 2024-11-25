import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CardRight from '../../Components/Login/CardRight';


const Login = () => {
    const [login, setLogin] = useState(localStorage.getItem('token'))
    const navigate = useNavigate();

    const pageDashboard = () => navigate('/')

    useEffect(() => {
        const isLogin = () => {
            try {
                if (login){
                    pageDashboard()
                }
            } catch (error) {
                console.error(error)
            }
        }

        isLogin()
    },[login])
    return(
        <>
            <CardRight />
        </>
    )
}
export default Login
