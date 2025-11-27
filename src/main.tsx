import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import store from './store'
import { Provider } from 'react-redux'
// import Header from './components/header';
// import Homepage from './pages/homepage';
import Shop from './pages/shop';
import Signup from './pages/signup';
import Signin from './pages/signin';

import Nav from './components/landing-page/nav.tsx';
import Homepage from './components/landing-page/homepage.tsx';
import Footer from './components/footer.tsx';
import Product from './pages/product/index.tsx';
import Dashboard from './pages/dashboard/index.tsx';
import Users from './pages/dashboard/users/index.tsx';
import DashboardProducts from './pages/dashboard/products/index.tsx';
import { Toaster } from 'sonner';
import Cart from './pages/cart/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav/>,
    children: [
      {
        element: <Footer/>,
        children: [
{
        index:true,
        element: <Homepage/>
      },
      {
        path:"/shop",
        element: <Shop/>
      },
      {
        path:"/product/:slug",
        element: <Product/>
      },
      {
        path:"/checkout",
        element: <Cart/>
      }
        ]
      },
      {
        path: "/signup",
        element: <Signup/>
      },
      {
        path: "/signin",
        element: <Signin/>
      },
     ]
     },
      {
        path: "/dashboard",
        element: <Dashboard/>,
        children: [
          {
            index:true,
            element: <div>Dashboard</div>
          },
          {
            path: "users",
            element: <Users/> 
          },
          {
            path: "products",
            element: <DashboardProducts/>
          },
          {
            path: "orders",
            element: <div>Orders</div>
          },
          {
            path: "inventory",
            element: <div>Inventory</div>
          },
          {
            path: "analytics",
            element: <div>Analytics</div>
          },
          {
            path: "customers",
            element: <div>Customers</div>
          },
          {
            path: "messages",
            element: <div>Messages</div>
          },
          {
            path: "settings",
            element: <div>Settings</div>
          }
        ]
      }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster position="top-center" richColors />
    </Provider>
  </StrictMode>,
)


