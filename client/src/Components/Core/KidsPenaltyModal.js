import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../util/userContext";
import { Modal, Button, Table } from 'react-bootstrap';
import { updateHelper, createPointHistory } from '../../util/API';

const KidsPenaltyModal = ({ handleClose, show, current_points, kidsId, setCurrentPoints }) => {
  const { penalties } = useContext(UserContext);

  const [penaltyList, setPenaltyList] = useState([]); // Initialize as an empty array
  const [penaltySelectId, setPenaltySelectId] = useState(''); // Initialize as an empty array
  const [penaltyValue, setPenaltyValue] = useState(''); // Initialize as an empty array
  const [penaltyName, setPenaltyName] = useState(''); // Initialize

  console.log(penalties);

  useEffect(() => {
    async function fetchData() {
      try {
        if (penalties) {
          let penalty = penalties;
          console.log(penalty);
          setPenaltyList(penalty); // Assuming response is an array
        } else {
          console.warn('Profile data or ID token is missing');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [penalties, penalties.length]); // Ensure dependency is valid

  const selectedPenaltyId = (id, penalty) => {
    console.log(id);
    setPenaltySelectId(id);
    let penalty_value = penalty.penalty_value;
    setPenaltyValue(penalty_value);
    setPenaltyName(penalty.penalty_name);

    applyPenalty(penalty_value, penalty.penalty_name);
  }

  const applyPenalty = async (penalty_value, penalty_name) => {
    console.log(penaltySelectId);
    let token = localStorage.getItem('id_token');
    let kids_id = kidsId;

    let pointBalance = current_points - penalty_value;
    let newPointBalance = { current_points: pointBalance };
    await updateHelper(newPointBalance, kids_id);

    let pointRecord = {
      change_category: "Penalty",
      change_details: penalty_name,
      reward_delivered: true,
      kids_id: kids_id,
    };
    await createPointHistory(pointRecord);

    setCurrentPoints(pointBalance); // Update the state immediately
    console.log(newPointBalance, penalty_name);
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className='text-center'>Apply Penalty</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Penalty Name</th>
              <th>Penalty Value</th>
              <th>Penalize</th>
            </tr>
          </thead>
          <tbody>
            {penaltyList.map((penalty, index) => (
              penalty && penalty.id ? (
                <tr key={penalty.id}>
                  <td>{penalty.penalty_name}</td>
                  <th>{penalty.penalty_value}</th>
                  <td>
                    {current_points >= penalty.penalty_value ? (
                      <Button className="bg-success" onClick={() => selectedPenaltyId(penalty.id, penalty)}>Apply</Button>
                    ) : (
                      <div></div>
                    )}
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

export default KidsPenaltyModal;
