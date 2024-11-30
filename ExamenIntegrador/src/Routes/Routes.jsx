import { useRoutes } from "react-router-dom"
import Layout from "../Pages/Layout/layout"
import LayoutUser from "../Pages/Layout/LayoutUser.jsx"
import Home from "../Pages/Home/Home.jsx"
import Register from "../Pages/Register/Register.jsx"
import Login from "../Pages/Login/Login.jsx"
import HomeUser from "../Pages/Home/HomeUser.jsx"
import Ranking from "../Pages/Ranking/Ranking.jsx"

export const Routes = () => {

    const routes = [
        {
            element: <Layout/>,
            children: [
                {
                    path: '/registro',
                    element: <Register/>
                },
                {
                    path: '/inicio-sesion',
                    element: <Login/>
                }
            ],
        },
        {
            element: <LayoutUser/>,
            children: [
                {
                    path: '/inicio',
                    element: <HomeUser/>
                },
                {
                    path: '/ranking',
                    element: <Ranking/>
                }
            ],
        },
        {
            path: '/',
            element: <Home/>
        },
    ]
    
    return useRoutes(routes)
}
