import { useRoutes } from "react-router-dom"
import Layout from "../Pages/Layout/layout"
import Home from "../Pages/Home/Home"

export const Routes = () => {

    const routes = [
        {
            element: <Layout/>,
            children: [
                {
                    path: '/',
                    element: <Home/>
                }
            ]
        }
    ]
    
    return useRoutes(routes)
}
