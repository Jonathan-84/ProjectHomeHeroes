import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "../util/userContext";
import CardGroup from 'react-bootstrap/CardGroup';
import Cards from "../Components/Core/cards";
import { getMe } from '../util/API';
import { Link } from 'react-router-dom';
// import  AuthService from "../util/auth"




const Helpers =()=> {

    const {profile} = useContext(UserContext);
    // const [userId, setUserId] = useState({id: '' });
    const [data, setData] = useState(null);
    const [kids, setKids] = useState([null]);

// console.log(kids)

useEffect(() => {
    async function fetchData() {
      try {
        let id = (profile.data.id)
        console.log(id)
        const response = await getMe(id) // Replace with your API endpoint
        setData({response});
        setKids(response.kids);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [profile.data.id]); // Empty dependency array ensures it runs only once


console.log(data)

// helperInfo(){
//   {kid.child_name
// }


return (

    <>
        <CardGroup>
    {data ? (
        kids.map((kid) => (
          <Cards key={kid.id} child_name={kid.child_name} helpers_id={kid.id} current_points={kid.current_points} avatar={kid.avatar} users_id={kid.users_id} />
        ))
      ) : (
       
         <p className="center">
          No helpers available. Go here to add some. <br/><Link to="/signup" className="add-padding link-text bold-text">Create an Account</Link>
          </p>
      )}
      </CardGroup>
    </>
       );
  };

  export default Helpers;
