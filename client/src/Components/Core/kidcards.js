import { useState, useEffect, useContext } from "react";
import { ButtonGroup, Card, Button, Table, ProgressBar } from 'react-bootstrap';
import { destroyHelper, getKidsTasks, getPointHistory, updatePointHistory, getReward, createPointHistory, updateHelper } from '../../util/API';
import KidsTaskModal from './KidsTaskModal.js';
import KidsRewardModal from './KidsRewardModal.js';
import KidsPointsHistoryModal from './KidsPointsHistoryModal.js';
import KidsPenaltyModal from './KidsPenaltyModal.js';
import { UserContext } from "../../util/userContext.js";

function Cards(props) {
  const { rewards } = useContext(UserContext);
  const [helpersTask, setHelpersTask] = useState([]); // Initialize as an empty array
  const [helpers, setHelpers] = useState([]); // Initialize as an empty array
  const [currentPoints, setCurrentPoints] = useState(props.current_points); // Initialize with props.current_points
  const [annualPoints, setAnnualPoints] = useState(props.annual_points); 
  const [pointHistory, setPointHistory] = useState([]); // Initialize as an empty array
  const [deliverReward, setDeliverReward] = useState(''); // Initialize as an empty array
  const [targetReward, setTargetReward] = useState(''); // Initialize as an empty array
  const [percentageToGoal, setPercentageToGoal] = useState(0);
  const [rewardsRedeemId, setRedeemRewardsId] = useState(''); // Initialize as an empty array
  const [redemptionValue, setRedemptionValue] = useState(''); // Initialize as an empty array
  const [rewardName, setRewardName] = useState(''); // Initialize
  // const [targetId, setTargetId] = useState(''); // Initialize

  const [showModal, setShowModal] = useState(false);
  const [showKRModal, setShowKRModal] = useState(false);
  const [showPHModal, setShowPHModal] = useState(false);
  const [showKPLModal, setShowKPLModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenKRModal = () => setShowKRModal(true);
  const handleCloseKRModal = () => setShowKRModal(false);

  const handleOpenPHModal = () => setShowPHModal(true);
  const handleClosePHModal = () => setShowPHModal(false);

  const handleOpenKPLModal = () => setShowKPLModal(true);
  const handleCloseKPLModal = () => setShowKPLModal(false);

  const fetchData = async () => {
    try {
      let token = localStorage.getItem('id_token');
      // console.log(token);
      // let users_id = props.users_id;
        // let rewardId = props.target_reward;
      // setTargetId(rewardId);
      // console.log(rewardId, users_id);
      let kids_id = props.helpers_id;
      if (token && kids_id) {
        const kidsTask = await getKidsTasks(kids_id, token);
        setHelpersTask(kidsTask);
        const pointHistoryData = await getPointHistory(kids_id);
        // console.log(pointHistoryData);
        setPointHistory(pointHistoryData); // Set the fetched point history data
        // console.log(pointHistory);
        // const fetchedTargetReward = await getReward(rewardId, users_id);
        // setTargetReward(fetchedTargetReward);
        // // console.log(targetReward);
        // let goal_progress = currentPoints / fetchedTargetReward.redemption_value * 100;
        // // console.log(goal_progress);
        // setRedemptionValue(fetchedTargetReward.redemption_value)
        // setRewardName(fetchedTargetReward.rewards_name)
        // setPercentageToGoal(goal_progress);
      } else {
        console.warn('ID token or helpers ID is missing');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.helpers_id, currentPoints, annualPoints]); // Add other dependencies if needed

  const deliverRewardsId = async (id) => {
    console.log(id);
    setDeliverReward(id);
    await deliverRewards(id);
    fetchData(); // Refetch data after delivery
  };

  const deliverRewards = async (deliverReward) => {
    console.log(deliverReward);
    let point_history_id = deliverReward;
    let userData = { reward_delivered: true };
    console.log(point_history_id, userData);
    await updatePointHistory(point_history_id, userData);
    setCurrentPoints(prevPoints => prevPoints - 1); // Example to decrease currentPoints
  };

  const deleteHelper = async (id) => {
    console.log(id);
    try {
      await destroyHelper(id);
      setHelpers(prevHelpers => prevHelpers.filter(helper => helper.id !== id));
      fetchData(); // Refetch data after deleting a helper
   
    } catch (error) {
      console.error('Error deleting helper:', error);
    }
  };
  console.log(rewards);

  // const selectedRedeemRewardId = (id) => { 
  //     console.log(id)
  //    setRedeemRewardsId(id)
  //   redeemReward(id)
  //     ;}
  
  //     const redeemReward = (rewardId) => { 
  //       console.log(rewardId); 
  //       let token = localStorage.getItem('id_token');
  //       let kids_id = props.helpers_id;
  //       // below is missing the redemption value
  //       // console.log(redemptionValue ,kids_id);
  //       let pointBalance = props.current_points - redemptionValue;
  //       let newPointBalance ={ current_points: pointBalance};
  //       // this will update the current points
  //       updateHelper(newPointBalance, kids_id);
  //       // let kids_id = kidsId;
  //       console.log(newPointBalance);
  // console.log(rewardName)
  //       let pointRecord ={
  //         change_category: "Reward",
  //         change_details: rewardName,
  //         reward_delivered: false,
  //         kids_id: kids_id,
  //       }
  //       createPointHistory(pointRecord);
  //       // console.log(pointRecord);
    
  //       }

  return (
    <Card style={{ width: '18rem' }} className="m-2">
      <Card.Img variant="top" src={props.avatar} />
      <Card.Body>
        <Card.Title>{props.child_name}</Card.Title>
        <Card.Text>
          Current Points: {currentPoints}
        </Card.Text>
        <Card.Text>
          Total Points this Year: {annualPoints}
        </Card.Text>
        {/* <Card.Text>
          Target Reward: {targetReward.rewards_name}
        </Card.Text>
        <ProgressBar now={percentageToGoal} label={`${percentageToGoal}% `} />
        <Card.Text>
          Target Value: {targetReward.redemption_value} <span>
          {percentageToGoal >= 100 && (
          <Button className="bg-success" onClick={() => selectedRedeemRewardId(targetReward.id)}>Redeem</Button>
        )}
          </span>
        </Card.Text> */}
       
        <br></br>
        <br></br>
        <div>
          <ButtonGroup size="sm" className="mb-4">
            <Button className="border border-dark" disabled={helpersTask.length === 0} onClick={handleOpenModal}>
              <i className="fa-solid fa-play">Tasks</i>
            </Button>
            <KidsTaskModal 
              show={showModal} 
              handleClose={handleCloseModal} 
              tasks={helpersTask} 
              current_points={currentPoints}
              annual_points={annualPoints} 
            />
            <Button className="border border-dark" disabled={currentPoints <= 0} onClick={handleOpenKRModal}>
              <i className="fa-solid fa-play">Redeem Rewards</i>
            </Button>
            <KidsRewardModal 
              show={showKRModal} 
              handleClose={handleCloseKRModal} 
              current_points={currentPoints} 
              kidsId={props.helpers_id}
            />
            <Button className="border border-dark" disabled={currentPoints <= 0} onClick={handleOpenPHModal}>
              <i className="fa-solid fa-play">Point History</i>
            </Button>
            <KidsPointsHistoryModal 
              show={showPHModal} 
              handleClose={handleClosePHModal} 
              current_points={currentPoints} 
              // kidsId={props.helpers_id}
              pointHistory={pointHistory}
            />
            <Button className="border border-dark" disabled={currentPoints <= 0} onClick={handleOpenKPLModal}>
              <i className="fa-solid fa-play">Penalize</i>
            </Button>
            <KidsPenaltyModal 
              show={showKPLModal} 
              handleClose={handleCloseKPLModal} 
              current_points={currentPoints} 
              kidsId={props.helpers_id}
              pointHistory={pointHistory}
            />
          </ButtonGroup>
        </div>
         {/* Conditional rendering for the table */}
         {pointHistory.some(phistory => !phistory.reward_delivered) && (
           <Table striped bordered hover size="sm">
             <thead>
               <tr>
                 <th>Change Details</th>
                 <th>Date Changed</th>
                 <th>Delivered</th>
               </tr>
             </thead>
             <tbody>
               {pointHistory
                 .filter(phistory => !phistory.reward_delivered) // Filter out records with reward_delivered set to true
                 .map(phistory => (
                   <tr key={phistory.id}>
                     <td>{phistory.change_details}</td>
                     <td>{phistory.date_changed}</td>
                     <td>
                       <Button className="bg-success" onClick={() => deliverRewardsId(phistory.id)}>Yes</Button>
                     </td>
                   </tr>
                 ))}
             </tbody>
           </Table>
         )}
        
        <div>
          <Button className="bg-danger" size="sm" onClick={() => deleteHelper(props.helpers_id)}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Cards;
