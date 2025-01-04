import React, { useContext, 
    useState, 
    useEffect } from 'react';
// import { getTasks } from '../../util/API';
import { UserContext } from "../../util/userContext";
import { Link } from 'react-router-dom';
// import { destroyReward } from '../../util/API';
import {Button} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { destroyReward } from '../../util/API';

function RewardsList(props) {
    const { rewards } = useContext(UserContext);
    const [rewardsList, setRewardsList] = useState([]); // Initialize as an empty array
    const [rewardsId, setRewardsId] = useState(''); // Initialize as an empty array
    console.log(rewards); 

    useEffect(() => {
        async function fetchData() {
            try {
                if (rewards) {
                    
                    let reward = rewards;
                    console.log(reward);
                    // const response = await getTasks(token); // Replace with your API endpoint
                    setRewardsList(reward); // Assuming response is an array
                    // console.log(response);
                } else {
                    console.warn('Profile data or ID token is missing');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    },[rewards, rewards.length]); // Ensure dependency is valid



// figureout next--- need capture tht idea 
// console.log(taskList.id)
// const deleteReward = (rewardId) => { 
//     console.log(rewardId)
//     destroyReward(rewardId)
//     ;}

const deleteReward = (rewardId) => { console.log(rewardId); 
    destroyReward(rewardId).then(() => { 
        // Update the taskList state by filtering out the deleted task 
setRewardsList(prevRewardsList => prevRewardsList.filter(reward => reward.id !== rewardId));
 }).catch
 (error => { console.error('Error deleting task:', error); }); };

const selectedRewardId = (id) => { 
    console.log(id)
   setRewardsId(id)
   deleteReward(id)
   
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
<th>Reward Name</th>
<th>Reward Description</th>
<th>Redemption Value</th>
<th>Update Reward</th>
<th>Delete Reward</th>
</tr>
</thead>
{/* <tbody> */}

        {rewardsList && rewardsList.length > 0 ? (

<tbody>
                {rewardsList.map((reward) => (
                        // <div key={task.id}>
<tr key={reward.id}>
<td>{reward.rewards_name}</td>
<td>{reward.rewards_description}</td>
<th>{reward.redemption_value}</th>
<th>Update Reward</th>
<td><Button className="bg-danger" onClick={() => selectedRewardId(reward.id)}>Delete</Button></td>
</tr>
// </div>

                        
                        
                    )
                )}

</tbody>

 

        ) : (
            <tbody>
            <tr >
<td>No tasks available. .</td>
<td>Go here to add some.</td>
<td><Link to="/AddRewards" className="add-padding link-text bold-text">Add Rewards</Link></td>

</tr>
</tbody>        
                
            
        )}

</Table>   
);

}

export default RewardsList;
