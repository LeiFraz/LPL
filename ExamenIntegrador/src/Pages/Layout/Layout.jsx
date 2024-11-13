import { Outlet as Page } from 'react-router-dom'
import NavBar from '../../Components/NavBar/NavBar';

const Layout = () =>{

    return(
        <>
            <NavBar/>
            <Page/>
        </>
    )
}

export default Layout;