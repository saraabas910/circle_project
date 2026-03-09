
import './App.css'
import {HeroUIProvider} from "@heroui/react";
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import Mainlayout from './layout/mainlayout';
import Authlayout from './layout/authlayout';
import Feed from './pages/feed';
import Profile from './pages/profile';
import Notfound from './pages/notfound';
import Signin from './pages/SignIn';
import Signup from './pages/SignUp';  
import  Protectedroute from './protectedRoutes/protectedroute';
import   AuthContextProvider  from './components/contexts/authContext';
import ProtectedAuthRoute from './protectedRoutes/protectedauthRoute';
import Postdetails from './pages/Postdetails';





const router = createBrowserRouter([

  {path:'' ,element: <Mainlayout/>,children:[  
    {index:true, element:<Protectedroute><Feed/></Protectedroute>},
    {path:'profile', element:<Protectedroute><Profile/></Protectedroute>},
    {path:'posts/:postId', element:<Protectedroute><Postdetails/></Protectedroute>},
    {path:'*', element:<Notfound/>},
  ]

},


  {path:'',element:< Authlayout/>,children:[ 
      {path:'signin', element:<ProtectedAuthRoute><Signin/></ProtectedAuthRoute>},
     {path:'signup', element:<ProtectedAuthRoute><Signup/></ProtectedAuthRoute>},
  ]
},


])


function App() {

  return (

       <AuthContextProvider>
        <HeroUIProvider>


   <RouterProvider router={router}/>


        </HeroUIProvider>

        
         </AuthContextProvider>
   

  )
}

export default App
