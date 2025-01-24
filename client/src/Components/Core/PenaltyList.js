import React, { useContext, 
    useState, 
    useEffect } from 'react';
// import { getTasks } from '../../util/API';
import { UserContext } from "../../util/userContext";
import { Link } from 'react-router-dom';
// import { destroyReward } from '../../util/API';
import {Button} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { destroyPenalty } from '../../util/API';

function PenaltyList(props) {
    const { penalties} = useContext(UserContext);
    const [penaltyList, setPenaltyList] = useState([]); // Initialize as an empty array
    const [penaltyId, setPenaltyId] = useState(''); // Initialize as an empty array
    console.log(penalties); 

    useEffect(() => {
        async function fetchData() {
            try {
                if (penalties) {
                    
                    let penalty = penalties;
                    console.log(penalty);
                    // const response = await getTasks(token); // Replace with your API endpoint
                    setPenaltyList(penalty); // Assuming response is an array
                    // console.log(response);
                } else {
                    console.warn('Profile data or ID token is missing');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    },[penalties, penalties.length]); // Ensure dependency is valid



// figureout next--- need capture tht idea 
// console.log(taskList.id)
// const deleteReward = (rewardId) => { 
//     console.log(rewardId)
//     destroyReward(rewardId)
//     ;}

const deletePenalty = (penaltyId) => { console.log(penaltyId); 
    destroyPenalty(penaltyId).then(() => { 
        // Update the taskList state by filtering out the deleted task 
setPenaltyList(prevPenaltyList => prevPenaltyList.filter(penalties => penalties.id !== penaltyId));
 }).catch
 (error => { console.error('Error deleting task:', error); }); };

const selectedPenaltyId = (id) => { 
    console.log(id)
   setPenaltyId(id)
   deletePenalty(id)
   
    ;}


//    const TasksList = ({ taskList }) => { 
//     const deleteTask = (taskId) => { 
//     console.log(taskId); 
//     destroyTask(taskId); 
// };



return (
 
    <Table responsive striped bordered hover size="sm">
<thead>
<tr>
<th>Penalty Name</th>
<th>Penalty Description</th>
<th>Penalty Value</th>
<th>Update Reward</th>
<th>Delete Reward</th>
</tr>
</thead>
{/* <tbody> */}

        {penaltyList && penaltyList.length > 0 ? (

<tbody>
                {penaltyList.map((penalty) => (
                        // <div key={task.id}>
<tr key={penalty.id}>
<td>{penalty.penalty_name}</td>
<td>{penalty.penalty_description}</td>
<th>{penalty.penalty_value}</th>
<th>Update Penalty</th>
<td><Button className="bg-danger" onClick={() => selectedPenaltyId(penalty.id)}>Delete</Button></td>
</tr>
// </div>

                        
                        
                    )
                )}

</tbody>

 

        ) : (
            <tbody>
            <tr >
<td>No penalties available. .</td>
<td>Go here to add some.</td>
<td><Link to="/AddPenalty" className="add-padding link-text bold-text">Add Penalty</Link></td>

</tr>
</tbody>        
                
            
        )}

</Table>   
);

}

export default PenaltyList;
