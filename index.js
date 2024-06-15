import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import  {createBrowserRouter,RouterProvider,Navigate} from 'react-router-dom';
import App from './App';
import Login from './Login';

const router=createBrowserRouter(
  [
    {
      path:'/',
      children:[
        {path:'',element:<Login/>},
        {path:'/admin',element:<App/>}
      ]
    }
  ]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);
