import { useState, useEffect } from "react";

import { ButtonGroup, Card, Button } from 'react-bootstrap';

import { destroyHelper, getKidsTasks } from '../../util/API';
import KidsTaskModal from './KidsTaskModal.js';

function Cards(props) {
  const [helpersTask, setHelpersTask] = useState([]); // Initialize as an empty array
  const [helpers, setHelpers] = useState([]); // In
  const [currentPoints, setCurrentPoints] = useState(props.current_points); // Initialize with props.current_points
  // const [annualPoints, setAnnualPoints] = useState(props.current_points); 

  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenInfoModal = () => setShowInfoModal(true);
  const handleCloseInfoModal = () => setShowInfoModal(false);

  console.log(helpers)
  const deleteHelper = (id) => { 
    console.log(id); 
    destroyHelper(id)
      .then(() => { 
        setHelpers(prevHelpers => prevHelpers.filter(helper => helper.id !== id));
      })
      .catch(error => { console.error('Error deleting helper:', error); });
  };

  useEffect(() => { 
    async function fetchData() { 
      try { 
        let token = localStorage.getItem('id_token'); 
        console.log(token);
        let kids_id = props.helpers_id;
        console.log(kids_id);
        if (token && props.helpers_id) { 
          const kidsTask = await getKidsTasks(kids_id, token); 
          setHelpersTask(kidsTask); 
          console.log(kidsTask); 
        } else { 
          console.warn('ID token or helpers ID is missing'); 
        } 
      } catch (error) {
        console.error('Error fetching data:', error); 
      } 
    }
    fetchData(); 
  }, [props.helpers_id, currentPoints,
    // annualPoints
  ]);

  return (
    <Card style={{ width: '18rem' }} className="m-2">
      <Card.Img variant="top" src={props.avatar} />
      <Card.Body>
        <Card.Title>{props.child_name}</Card.Title>
        <Card.Text>
          Current Points: {currentPoints}
        </Card.Text>
        <Card.Text>
          Total Points this Year: {props.annual_points}
        </Card.Text>
        <br></br>
        <br></br>
<div>
        <ButtonGroup size="sm" className="mb-2">
          <Button className="border border-dark" disabled={helpersTask.length === 0} onClick={handleOpenModal}>
            <i className="fa-solid fa-play">Tasks</i></Button>
          <KidsTaskModal show={showModal} handleClose={handleCloseModal} tasks={helpersTask} current_points={currentPoints}
          //  annualPoints={annualPoints} 
           />
          {/* <Button className="queue-button border border-dark" onClick={handleOpenModal}>
            <i className="fa-solid fa-film"></i>
          </Button> */}
        </ButtonGroup>
        </div>
        <div>
        <Button className="bg-danger" size="sm" onClick={() => deleteHelper(props.helpers_id)}>Remove Helper</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Cards;
