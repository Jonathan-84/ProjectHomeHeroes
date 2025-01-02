import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createTask } from '../util/API';

import { UserContext } from "../util/userContext";


const AddTasks =()=> {

        // set initial form state
        const [userFormData, setUserFormData] = useState({ task_name: '', task_points: '', kids_id: '' });
        // set helper update form state
        // const [helperUpdateData, setHelperUpdateData] = useState({ current_points: '', kids_id: '' });
        // set state for form validation
        const [validated] = useState(false);
        // set state for alert
        const [showAlert, setShowAlert] = useState(false);
        const { helpers } = useContext(UserContext);
        const navigate = useNavigate();
        console.log(helpers)
    
        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setUserFormData({ ...userFormData, [name]: value });
    
        };

        // this should actually be done at complete
        // const updateHelperPoints = async (kids_id, existingPoints, task_points) => { 
        //     console.log(existingPoints,  userFormData.task_points)

        //         const updatedPoints = helpers.current_points + userFormData.task_points; 
        //         const current_points = updatedPoints ; 
        //         await updateHelper(kids_id, current_points); 
        //         console.log(`Updated ${helpers.child_name}'s points to ${updatedPoints}`); 
        // };
    
        const handleFormSubmit = async (event) => {
            event.preventDefault();
    
            // check if form has everything (as per react-bootstrap docs)
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
    
            

            const user  = await createTask(userFormData);

            navigate("/welcome");
    
            setUserFormData({
                task_name: '',
                task_points: '',
                kids_id: '',
            });

           
        };
    
      
        return (
            <>
            {/* This is needed for the validation functionality above */}
            <br></br>
            <br></br>
            <br></br>
            <div className='d-flex mx-auto w-50 border border-danger '>
            </div>  
            <br></br>
            <div className='d-flex mx-auto w-50 '>
            <Form className='w-50' noValidate validated={validated} onSubmit={handleFormSubmit}>
    {/* show alert if server response is bad */}
    <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
        Something went wrong with your signup!
    </Alert>
    
    <Form.Group>
        <Form.Label htmlFor='task_name'> Task Name</Form.Label>
        <Form.Control
            type='text'
            placeholder='Name of the task'
            name='task_name'
            onChange={handleInputChange}
            value={userFormData.task_name}
            required
        />
        <Form.Control.Feedback type='invalid'>Task name is required!</Form.Control.Feedback>
    </Form.Group>
    
    <Form.Group>
        <Form.Label htmlFor='task_points'> Task Points</Form.Label>
        <Form.Control
            type='text'
            placeholder='Task points'
            name='task_points'
            onChange={handleInputChange}
            value={userFormData.task_points}
            required
        />
        <Form.Control.Feedback type='invalid'>Task Points are required!</Form.Control.Feedback>
    </Form.Group>

    <Form.Group> 
        <Form.Label htmlFor='task_assignment'> Assign Task</Form.Label>
        <select 
            className="form-select" 
            name='kids_id' 
            onChange={handleInputChange} 
            value={userFormData.kids_id} 
            aria-label="Default select example"
        > 
            <option value="">Open this select menu</option> 
            {helpers && helpers.length > 0 ? 
                helpers.map((helper) => 
                    helper && helper.id ? (
                        <option key={helper.id} value={helper.id}>{helper.child_name}</option>
                    ) : null
                ) 
            : null} 
        </select> 
        <Form.Control.Feedback type='invalid'> You forgot to assign the task </Form.Control.Feedback> 
    </Form.Group>
    
    <Button
        disabled={!(userFormData.task_name && userFormData.task_points && userFormData.kids_id) }
        type='submit'
        variant='warning'>
        Submit
    </Button>
</Form>

               
                </div>
    
                <div className='d-flex mx-auto w-50 '>
                <p className="center">Already have an account with us?<br /><Link to="/login" className="add-padding link-text bold-text">Login to your account</Link></p>
                </div>
                <br></br>
    <br>
          </br><br></br>
    <br>
          </br>
        </>
    );
    };
  export default AddTasks;
