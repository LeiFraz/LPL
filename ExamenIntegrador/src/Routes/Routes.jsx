import { useRoutes } from "react-router-dom"
import Layout from "../Pages/Layout/layout"
import Home from "../Pages/Home/Home"
import Register from "../Pages/Register/Register"

export const Routes = () => {

    const routes = [
        {
            element: <Layout/>,
            children: [
                {
                    path: '/',
                    element: <Home/>
                },
                {
                    path: '/registro',
                    element: <Register/>
                }
            ]
        }
    ]
    
    return useRoutes(routes)
}
