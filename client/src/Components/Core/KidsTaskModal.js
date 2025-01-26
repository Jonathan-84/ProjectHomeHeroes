import { useState, useEffect } from "react";
import {  Modal, Button, Table } from 'react-bootstrap';
import { updateHelper, destroyTask } from '../../util/API';

const KidsTaskModal = ({ tasks, handleClose, show, current_points }) => {
  const [currentPoints, setCurrentPoints] = useState(current_points);
  const [updatedTasks, setUpdatedTasks] = useState(tasks);

  useEffect(() => {
    // Update tasks when the length changes
    setUpdatedTasks(tasks);
    console.log("Tasks length changed:", tasks.length);
  }, [tasks]);

  const taskComplete = async (id, points, kidsId) => {
    try {
      let token = localStorage.getItem('id_token');
      let previous_points = currentPoints; // Use state currentPoints
      let chosenTask = id;
      let taskPoints = points;
      let kids_id = kidsId;
  
      // Debugging log statements
      console.log("Token:", token);
      console.log("Kids ID:", kids_id);
      console.log("Chosen Task:", chosenTask);
      console.log("Previous Points:", previous_points);
      console.log("Task Points:", taskPoints);
  
      // Check each variable individually
      if (!token) console.warn('Token is missing');
      if (!kids_id) console.warn('Kids ID is missing');
      if (!chosenTask) console.warn('Chosen Task is missing');
      if (previous_points === undefined) console.warn('Previous Points are missing');
      if (taskPoints === undefined) console.warn('Task Points are missing');
  
      if (token && kids_id && chosenTask && previous_points !== undefined && taskPoints !== undefined) {
        let totalPoints = previous_points + taskPoints;
        let updated_points = { current_points: totalPoints };
  
        console.log("Updated Points Object:", updated_points);
        console.log("Kids ID for Update:", kids_id);
        console.log("Task ID for Deletion:", chosenTask);
  
        await updateHelper(updated_points, kids_id);
        await destroyTask(chosenTask);
  
        // Update the tasks state
        setUpdatedTasks(prevTasks => prevTasks.filter(task => task.id !== chosenTask));
        setCurrentPoints(totalPoints);
      } else {
        console.warn('ID token or kids ID is missing');
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className='text-center'>Tasks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Point Value</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {updatedTasks.map((task, index) => (
              task && task.id ? (
                <tr key={task.id}>
                  <td>{task.task_name}</td>
                  <td>{task.task_points}</td>
                  <td><Button className="bg-success" onClick={() => taskComplete(task.id, task.task_points, task.kids_id)}>Finished</Button></td>
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

export default KidsTaskModal;
