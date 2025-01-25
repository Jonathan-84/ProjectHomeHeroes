import { createContext, useEffect, useState } from "react";
import AuthService from "../util/auth";
// import {getToken} from "../util/auth";
import { getTasks, getHelpers,getRewards, getPenalties } from "../util/API"; // Ensure these functions are correctly imported

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [profile, setProfile] = useState({});
    const [tasks, setTasks] = useState([]);
    const [helpers, setHelpers] = useState([]);
    const [rewards, setRewards] = useState([]);
    const [penalties, setPenalties] = useState([]);
    // const [redemptions, setRedemptions] = useState([]);
  
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

            const rewardsResponse = await getRewards(user.data.id, idToken); // Fetch helpers
            setRewards(rewardsResponse); // Store helpers

            const penaltiesResponse = await getPenalties(user.data.id, idToken); // Fetch helpers
            setPenalties(penaltiesResponse); // Store helpers
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
        setRewards([]);
        setPenalties([]);
      }
    }
  
    fetchData();
  }, []);
  

    console.log('Profile:', profile);
    console.log('Tasks:', tasks);
    console.log('Helpers:', helpers);
    console.log('Rewards:', rewards);
    console.log('Penalties:', penalties);

    return (
        <UserContext.Provider value={{ profile, tasks, helpers, rewards, penalties }}>
            {children}
        </UserContext.Provider>
    );
};
