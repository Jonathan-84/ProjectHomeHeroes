import React from "react";
import './App.css';
import Login from '../src/Components/Core/LoginForm'
import Navbar from '../src/Components/Core/Navbar'
import Welcome from '../src/pages/Welcome'
import Signup from '../src/Components/Core/SignupForm';
import Home from '../src/pages/home'
import AddHelpers from '../src/Components/AddHelpers';
import AddTasks from '../src/Components/AddTasks';
import AddRewards from '../src/Components/AddRewards';

import { Routes, Route } from "react-router-dom";
import {ProtectedRoute} from './Components/Core/ProtectedRoute'
import { UserProvider } from "../src/util/userContext.js";




function App() {

  return (
   

      <>
       {/* <UserProvider> */}
      <Navbar />
      <UserProvider>
        <Routes>
    
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/SignUp" element={<Signup/>}/>
           
            <Route exact path="/Welcome" element={<ProtectedRoute> <Welcome /> </ProtectedRoute> } />
            <Route exact path="/AddTasks" element={<ProtectedRoute> <AddTasks /> </ProtectedRoute> } />
            <Route exact path="/AddHelpers" element={<ProtectedRoute> <AddHelpers /> </ProtectedRoute> } />
            <Route exact path="/AddRewards" element={<ProtectedRoute> <AddRewards /> </ProtectedRoute> } />
        
            <Route exact path="/login" element={<Login/>} />
        
            <Route path="*" element={<h1 className="title-text main-container">This Page Does Not Exist!</h1>} />
          </Routes>
          </UserProvider>
      </>

  );
}

export default App;
