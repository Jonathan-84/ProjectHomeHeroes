import React from "react";
import './App.css';
import Login from '../src/Components/Core/LoginForm.js'
import Navbar from '../src/Components/Core/Navbar.js'
import Welcome from '../src/pages/Welcome.js'
import Signup from '../src/Components/Core/SignupForm.js';
import Home from '../src/pages/home.js'
import AddHelpers from '../src/Components/AddHelpers.js';
import AddTasks from '../src/Components/AddTasks.js';
import AddRewards from '../src/Components/AddRewards.js';

import { Routes, Route } from "react-router-dom";
import {ProtectedRoute} from './Components/Core/ProtectedRoute.js'
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
