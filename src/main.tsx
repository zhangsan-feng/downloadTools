import {RouterProvider} from "react-router-dom";
import httpRouter from "./router.tsx";
import {createRoot} from 'react-dom/client';


createRoot(document.getElementById('root')).render(

    <RouterProvider router={httpRouter}/>
)

/*
https://github.com/goldfire/howler.js
https://github.com/videojs/video.js
*/