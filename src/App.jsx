import React from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Registration from './pages/Registration';
import Home from './pages/Home';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Registration/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Route>

    )
  );
  return (
    <>
        <RouterProvider router={router}/>
        <ToastContainer />
    </>


  )
}

export default App