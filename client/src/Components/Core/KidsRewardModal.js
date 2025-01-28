import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../util/userContext";
import {  Modal, Button, Table } from 'react-bootstrap';
import { updateHelper, createPointHistory } from '../../util/API';

const KidsRewardModal = ({ handleClose, show, current_points, kidsId }) => {
  const { rewards } = useContext(UserContext);

   const [rewardsList, setRewardsList] = useState([]); // Initialize as an empty array
  const [rewardsRedeemId, setRedeemRewardsId] = useState(''); // Initialize as an empty array
  const [rewardsTargetId, setTargetRewardsId] = useState(''); // Initialize as an empty array
  const [redemptionValue, setRedemptionValue] = useState(''); // Initialize as an empty array
  const [rewardName, setRewardName] = useState(''); // Initialize

  //const [currentPoints, setCurrentPoints] = useState(current_points);
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
  
// Will modify this for redemption: 
//const deleteReward = (rewardId) => { console.log(rewardId); 
//     destroyReward(rewardId).then(() => { 
//         // Update the taskList state by filtering out the deleted task 
// setRewardsList(prevRewardsList => prevRewardsList.filter(reward => reward.id !== rewardId));
//  }).catch
//  (error => { console.error('Error deleting task:', error); }); };


// need to modify the above function to subtract the redemption value from the current points
// additionally use the api to update the point history... 
//adding refrlecting what was redeemed, the vlaue and whter it has been delivered... Iwll updated the kid card to flag if a 
//reward has yet to be delivered

// create a separate flow for marking a reward as a favorite
const selectedRedeemRewardId = (id, reward) => { 
    console.log(id)
   setRedeemRewardsId(id)
   let redemption_value = reward.redemption_value;
  setRedemptionValue(redemption_value)
  setRewardName(reward.rewards_name)

  redeemReward(id)
    ;}

    const redeemReward = (rewardId) => { 
      console.log(rewardId); 
      let token = localStorage.getItem('id_token');
      let kids_id = kidsId;
      // below is missing the redemption value
      // console.log(redemptionValue ,kids_id);
      let pointBalance = current_points - redemptionValue;
      let newPointBalance ={ current_points: pointBalance};
      // this will update the current points
      updateHelper(newPointBalance, kids_id);
      // let kids_id = kidsId;
      console.log(newPointBalance);
console.log(rewardName)
      let pointRecord ={
        change_category: "Reward",
        change_details: rewardName,
        reward_delivered: false,
        kids_id: kids_id,
      }
      createPointHistory(pointRecord);
      // console.log(pointRecord);
  
      }

/// The below will add to the Kid's Target Goal
const selectedTargetRewardId = (id) => { 
      console.log(id)
     setTargetRewardsId(id)
     targetReward(id)
      ;}
  
const targetReward = (rewardId) => { 
console.log(rewardId); 
let token = localStorage.getItem('id_token');
let kids_id = kidsId;
console.log(kids_id, token);
let targetReward ={ target_reward: rewardId};
updateHelper(targetReward, kids_id);
}

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className='text-center'>Redeem Rewards</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover size="sm">
        <thead>
<tr>
<th>Reward Name</th>
<th>Redemption Value</th>
<th>Redeem</th>
<th>Goal</th>
</tr>
</thead>
          <tbody>
          {rewardsList.map((reward, index) => (
              reward && reward.id ? (
              <tr key={reward.id}>
              <td>{reward.rewards_name}</td>
              <th>{reward.redemption_value}</th>
              <td>
              {current_points >= reward.redemption_value ? (
                      <Button className="bg-success" onClick={() => selectedRedeemRewardId(reward.id, reward)}>Redeem</Button>
                    ) : (
                 <div></div>
                    )}
                    </td>
                    <td>
                      <Button className="bg-success" onClick={() => selectedTargetRewardId(reward.id)}>Set</Button>
                    </td>
              </tr>
              ) : (
                <tr key={index}>
                  <td colSpan="3">"Task data is missing"</td>
                </tr>
              )
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default KidsRewardModal;
