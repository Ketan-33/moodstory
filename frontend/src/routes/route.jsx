import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Home from "../pages/Home";
import Story from "../pages/Story";
import Test from "../pages/Test";
import Demo from "../components/Demo";

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
                element :<Demo/>
            },
            
        ]
    }
]);

export default router