import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Home from "../pages/Home";
import Story from "../pages/story";

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
            
        ]
    }
]);

export default router