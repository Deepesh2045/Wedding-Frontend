import Home from "../Pages/Home";
import MainLayout from "../Layout/MainLayout";
import { About } from "../Pages/About";
import Contact from "../Pages/Contact";
import Gallery from "../Pages/Gallery";
import AddPhoto from "../Pages/AddPhoto";
import EditCardForm from "../Pages/EditCardForm";
import Family from "../Pages/Family";

const mainRoutes = [
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"about",
                element:<About/>
            },
            {
                path:"contact",
                element:<Contact/>
            },
            {
                path:"gallery",
                element:<Gallery/>
            },
            {
                path:"add",
                element:<AddPhoto/>
            },
            {
                path:"edit/card/form/:id",
                element:<EditCardForm/>
            },
            {
                path:"family",
                element:<Family/>
            },

        ]
    },
   
]
export default mainRoutes