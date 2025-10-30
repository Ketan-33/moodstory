import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Home from "../pages/Home";
import Story from "../pages/Story";
import Test from "../pages/Test";
import WebcamCapture from "../components/Demo";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element :<Home/>
            },
            {
                path:"generate-story",
                element :<Story/>
            },
            {
                path:"test",
                element :<Test/>
            },
            {
                path:"demo",
                element :<WebcamCapture/>
            },
            {
                path:"dashboard",
                element :<Dashboard/>
            },
            
        ]
    }
]);

export default router