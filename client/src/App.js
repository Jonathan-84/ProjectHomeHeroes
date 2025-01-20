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
// import AuthService from './util/auth';




function App() {

//   const [userDetails, setUserDetails] = useState('')
//   // const UserContext = createContext(userDetails);

// if (AuthService.loggedIn()){
//   let me = AuthService.getProfile();
//   // console.log(me)a
//   setUserDetails(me)

// // }
// else {
//   console.log('you are not logged in and cannot add helpers')
// }

  

  return (
   

      <>
       <UserProvider>
      <Navbar />
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/SignUp" element={<Signup/>}/>
            {/* <UserContext.Provider value={{userDetails}}> */}
            <Route path="/Welcome" element={<ProtectedRoute> <Welcome /> </ProtectedRoute> } />
            <Route path="/AddTasks" element={<ProtectedRoute> <AddTasks /> </ProtectedRoute> } />
            <Route path="/AddHelpers" element={<ProtectedRoute> <AddHelpers /> </ProtectedRoute> } />
            <Route path="/AddRewards" element={<ProtectedRoute> <AddRewards /> </ProtectedRoute> } />
            {/* </UserContext.Provider> */}
            <Route exact path="/login" element={<Login/>} />
        
  <Route render={() => <h1 className="title-text main-container">This Page Does Not Exist!</h1>} />
          </Routes>
          </UserProvider>
      </>

  );
}

export default App;
