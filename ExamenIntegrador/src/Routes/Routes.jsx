import { useRoutes } from "react-router-dom"
import Layout from "../Pages/Layout/layout"
import Home from "../Pages/Home/Home.jsx"
import Register from "../Pages/Register/Register.jsx"
import Login from "../Pages/Login/Login.jsx"
import HomeUser from "../Pages/Home/HomeUser.jsx"

export const Routes = () => {

    const routes = [
        {
            element: <Layout/>,
            children: [
                {
                    path: '/inicio',
                    element: <HomeUser/>
                },
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
            path: '/',
            element: <Home/>
        }
    ]
    
    return useRoutes(routes)
}
