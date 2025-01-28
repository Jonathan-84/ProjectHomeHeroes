import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../util/userContext";
import {  Modal, Button, Table } from 'react-bootstrap';

const KidsPointHistoryModal = ({ handleClose, show, pointHistory }) => {
 
  console.log(pointHistory);
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className='text-center'>Point History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover size="sm">
        <thead>
<tr>
<th>Change Category</th>
<th>Change Details</th>
<th>Date Changed</th>
<th>Reward Delivered</th>
</tr>
</thead>
          <tbody>
          {pointHistory.map((history, index) => (
              history && history.id ? (
              <tr key={history.id}>
              <td>{history.change_category}</td>
              <td>{history.change_details}</td>
              <td>{history.date_changed}</td>
              <td>{history.reward_delivered ? 'Yes' : 'No'}</td>
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

export default KidsPointHistoryModal;
