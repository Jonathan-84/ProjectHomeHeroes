import React
//  { useState, useEffect }
  from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import { getHelper } from "../../util/API";
// import { getTasks } from '../../util/API';

// function getHelpersTasks(props){
//   console.log(this.kids.id)
//   let tasks = getHelper(props.kid_id)
//   // console.log(tasks)
// }

function Cards (props){
  // const [call, setCall] = useState(null);
  // const [helpers, setHelpers] = useState([null]);


  // useEffect(() => {
  //   // Check if the user is logged in (you can adjust the API endpoint)
  //   async function fetchData() {
  //     try {
  //       let id = (props.helpers_id)
  //       console.log(id)
  //       const response = await getHelper(id) // Replace with your API endpoint
  //       setCall({response});
  //       setHelpers(response);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  //   fetchData();
  
  //   }, [props.helpers_id]);

  // let tasks = getHelper(props.kid_id)
//  getTasks();
//  getHelper(props.kid_id)
// console.log(call)
// console.log(helpers)
  return (

          

           <Card style={{ width: '18rem' }}>
           <Card.Img variant="top" className="h-25 w-25" src={props.avatar} />
           <Card.Body>
             <Card.Title>{props.child_name}</Card.Title>
             <Card.Text>
           Current Points: {props.current_points}
             </Card.Text>
  
  
      
             {/* <ul>
      {helpers.map((id) => (
        <li key={id}>{helpers.id}</li>
      ))}
    </ul> */}
             
             <Button variant="primary" 
             >Go somewhere</Button>
           </Card.Body>
         </Card>
 
          )
}
export default Cards;