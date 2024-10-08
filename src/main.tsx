import {RouterProvider} from "react-router-dom";
import httpRouter from "./router.tsx";
import {createRoot} from 'react-dom/client';


createRoot(document.getElementById('root')).render(

    <RouterProvider router={httpRouter}/>
)