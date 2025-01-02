// previous code
// import { createContext, useEffect, useState } from "react";
// import  AuthService from "../util/auth"

// export const UserContext = createContext();


// export const UserProvider = ({ children })=> {

//     const [profile, setProfile] = useState('');
    

//     useEffect(() => {
//       // Check if the user is logged in (you can adjust the API endpoint)
//       if (AuthService.loggedIn()){
//          let user = AuthService.getProfile();
//           setProfile(user);
//         } else {
//           setProfile({});
//         }
//       }, []);


//   console.log(profile)

//     return (
//       <UserContext.Provider value={{profile}}>
//           {children}
//       </UserContext.Provider>
//     );
//   }
import { createContext, useEffect, useState } from "react";
import AuthService from "../util/auth";
// import {getToken} from "../util/auth";
import { getTasks, getHelpers } from "../util/API"; // Ensure these functions are correctly imported

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [profile, setProfile] = useState({});
    const [tasks, setTasks] = useState([]);
    const [helpers, setHelpers] = useState([]);
  
/// use below code only to test the context
useEffect(() => {
    async function fetchData() {
      if (AuthService.loggedIn()) {
       
        let user = AuthService.getProfile();
       
        let idToken = AuthService.getToken(user.data.id)
      
  
        setProfile(user);
        
        if (user && user.data && idToken) {
          
          try {
            localStorage.setItem('user_id', user.data.id);
            let token = idToken;
          
            const tasksResponse = await getTasks(token); // Fetch tasks
            setTasks(tasksResponse); // Store tasks
  
            const helpersResponse = await getHelpers(user.data.id, idToken); // Fetch helpers
            setHelpers(helpersResponse); // Store helpers
          } catch (error) {
            console.error('Error fetching tasks or helpers:', error);
          }
        } else {
          console.warn('User data or ID token is missing');
        }
      } else {
        console.warn('User is not logged in');
        setProfile({});
        setTasks([]);
        setHelpers([]);
      }
    }
  
    fetchData();
  }, []);
  

    console.log('Profile:', profile);
    console.log('Tasks:', tasks);
    console.log('Helpers:', helpers);

    return (
        <UserContext.Provider value={{ profile, tasks, helpers }}>
            {children}
        </UserContext.Provider>
    );
};
