import React, { useContext, 
    useState, 
    useEffect } from 'react';
// import { getTasks } from '../../util/API';
import { UserContext } from "../../util/userContext";
import { Link } from 'react-router-dom';
import { destroyTask } from '../../util/API';
import {Button} from 'react-bootstrap';

function Tasklist(props) {
    const { tasks } = useContext(UserContext);
    const [taskList, setTaskList] = useState([]); // Initialize as an empty array
    const [taskId, setTaskId] = useState(''); // Initialize as an empty array
    console.log(tasks); 

    useEffect(() => {
        async function fetchData() {
            try {
                if (tasks) {
                    
                    let task = tasks;
                    console.log(task);
                    // const response = await getTasks(token); // Replace with your API endpoint
                    setTaskList(task); // Assuming response is an array
                    // console.log(response);
                } else {
                    console.warn('Profile data or ID token is missing');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    },[tasks, tasks.length]); // Ensure dependency is valid



// figureout next--- need capture tht idea 
// console.log(taskList.id)
// const deleteTask = (taskId) => { 
//     console.log(taskId)
//     destroyTask(taskId)
//     ;}

const deleteTask = (taskId) => { console.log(taskId); 
    destroyTask(taskId).then(() => { 
        // Update the taskList state by filtering out the deleted task 
setTaskList(prevTaskList => prevTaskList.filter(task => task.id !== taskId));
 }).catch
 (error => { console.error('Error deleting task:', error); }); };

const selectedTaskId = (id) => { 
    console.log(id)
   setTaskId(id)
   deleteTask(id)
   
    ;}


//    const TasksList = ({ taskList }) => { 
//     const deleteTask = (taskId) => { 
//     console.log(taskId); 
//     destroyTask(taskId); 
// };



return (
    <>
        {taskList && taskList.length > 0 ? (

  <ul>
                {taskList.map((task, index) => (
                    task && task.id ? (
                        <div key={task.id}>
                            <li>{task.task_name}</li>
                            <Button onClick={() => selectedTaskId(task.id)}>Delete</Button>
                        </div>
                    ) : (
                        <li key={index}>Task data is missing</li>
                    )
                ))}
            </ul>
        ) : (
            <p className="center">
                No tasks available. Go here to add some. <br />
                <Link to="/AddTasks" className="add-padding link-text bold-text">Add Tasks</Link>
            </p>
        )}
    </>
);

}

export default Tasklist;
