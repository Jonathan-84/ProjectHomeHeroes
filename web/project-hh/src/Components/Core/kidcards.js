import { useState, 
  // useContext, 
  useEffect } from "react";
// import { UserContext } from "../util/userContext";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { destroyHelper, getKidsTasks,updateHelper,destroyTask } from '../../util/API';


function Cards (props){
// const { tasks } = useContext(UserContext);
const [helpers, setHelpers] = useState([]); // In
 const [helpersTask, setHelpersTask] = useState([]); // Initialize as an empty array

const deleteHelper = (id) => { 
  console.log(id); 
    destroyHelper(id).then(() => { 
        // Update the taskList state by filtering out the deleted task 
    setHelpers(prevHelpers => prevHelpers.filter(helper => helper.id !== id));
// setTaskList(prevTaskList => prevTaskList.filter(task => task.id !== taskId));
 }).catch
 (error => { console.error('Error deleting helper:', error); }); };

 useEffect(() => { 
  async function fetchData() 
  { 
    try 
    { let token = localStorage.getItem('id_token'); 
      console.log(token);
      let kids_id = props.helpers_id
      console.log(kids_id);
      if (token && props.helpers_id) 
        { const kidsTask = await getKidsTasks(kids_id, token); 
          setHelpersTask(kidsTask); 
          console.log(kidsTask); 
        } else 
        { console.warn('ID token or helpers ID is missing'); } } catch (error)
        // update when ponts change too
         { console.error('Error fetching data:', error); } } fetchData(); }, [props.helpers_id, props.current_points]);

         const taskComplete = (id, points) => {
          async function getData() {
            try {
              let token = localStorage.getItem('id_token');
              let kids_id = props.helpers_id;
              let previous_points = props.current_points;
              let chosenTask = id;
              let taskPoints = points;
        
              if (token && kids_id && chosenTask && previous_points && taskPoints) {
                let totalPoints = previous_points + taskPoints;
                let current_points = { current_points: totalPoints };
        
                await updateHelper(current_points, kids_id);
                await destroyTask(chosenTask);
        
                // Assuming setHelpersTask takes a new task list, not the task itself.
                setHelpersTask(prevHelpersTask => 
                  prevHelpersTask.filter(task => task.id !== chosenTask));
              } else {
                console.warn('ID token or helpers ID is missing');
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
          getData();
        };
        
    
    
      
          // console.log(id); 
          
          // console.log(props.helpers_id);
            // destroyHelper(id).then(() => { 
                // Update the taskList state by filtering out the deleted task 
            // setHelpers(prevHelpers => prevHelpers.filter(helper => helper.id !== id));
        // setTaskList(prevTaskList => prevTaskList.filter(task => task.id !== taskId));
        //  }
        // ).catch
        //  (error => { console.error('Error deleting helper:', error); }); 
        // };

  return (

          

           <Card style={{ width: '18rem' }}>
           <Card.Img variant="top" className="h-25 w-25" src={props.avatar} />
           <Card.Body>
             <Card.Title>{props.child_name}</Card.Title>
             <Card.Text>
           Current Points: {props.current_points}
             </Card.Text>
             <Card.Text>
           Tasks: {props.current_points}
             </Card.Text>
             <ListGroup variant="flush">
             {helpersTask.map((task, index) => (
                    task && task.id ? (
               
                        <div key={task.id}>
                            <ListGroup.Item>{task.task_name}<span> </span>   &nbsp;  &nbsp;
                              <Button className="bg-success" onClick={() => taskComplete(task.id,task.task_points)}>Done</Button> 
                              </ListGroup.Item>
                        </div>
                        
                    ) : (
                      
                        <ListGroup.Item key={index}>"Task data is missing"</ListGroup.Item>
                    )
                ))}
        {/* <ListGroup.Item>Cras justo odio</ListGroup.Item> */}
      </ListGroup>
  
  
      
             {/* <ul>
      {helpers.map((id) => (
        <li key={id}>{helpers.id}</li>
      ))}
    </ul> */}
             
             {/* <Button variant="primary" 
             >Go somewhere</Button> */}
             <br></br>
             <br></br>
             
             <Button className="bg-danger" onClick={() => deleteHelper(props.helpers_id)}>Remove Helper</Button>
           </Card.Body>
         </Card>
 
          )
}
export default Cards;