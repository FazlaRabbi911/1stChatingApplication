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
import Forgot from './pages/Forgot';
import Massage from './pages/Massage';
import Setting from './pages/Setting';
import Feed from './pages/Feed';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Registration/>}></Route>
        <Route path="/home" element={<Home/>}>
          <Route path="feed" element={<Feed/>}></Route>
          <Route path="massage" element={<Massage/>}></Route>
          <Route path="setting" element={<Setting/>}></Route>
        </Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/Forgot" element={<Forgot/>}></Route>
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