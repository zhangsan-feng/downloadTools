import {createBrowserRouter} from 'react-router-dom'
import Home from "./home/home.jsx";


const httpRouter = new createBrowserRouter([
    {
        path: "/",
        element: <Home/>    ,
        children: []
    },

])


export default httpRouter