import {
    createBrowserRouter,
} from "react-router-dom";
import Home from '@/pages/Home'
import BaseLayout from "@/components/layout/BaseLayout"
import ErrorPage from "@/pages/Error";
import Register from "@/pages/Register";
import Login from '@/pages/Login'
import PrivateRouter from "./PrivateRouter";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <BaseLayout></BaseLayout>,
      errorElement: <ErrorPage />,
      children: [
        {
            path: '/',
            element: <PrivateRouter role="AuthenticatedCheck"><Home/></PrivateRouter>
        },
        {
            path: '/profile',
            element: <h1>Profile User</h1>
        },{
          path: '/quanly',
          element: <PrivateRouter role="ManagerCheck"><h1>Trang Quan Ly</h1></PrivateRouter>
        }
        ,{
          path: '/register',
          element: <Register/>
        },
        {
          path: '/login',
          element: <Login/>
        },
      ]
    },
]);