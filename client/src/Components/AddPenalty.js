import React, { useState, useContext, useEffect} from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createPenalty } from '../util/API';

import { UserContext } from "../util/userContext";


const AddPenalty =()=> {

        // set initial form state
        const [userFormData, setUserFormData] = useState({ penalty_name: '', penalty_description: '',penalty_value: '', users_id: '' });
        // set helper update form state
        // const [helperUpdateData, setHelperUpdateData] = useState({ current_points: '', kids_id: '' });
        // set state for form validation
        const [validated] = useState(false);
        // set state for alert
        const [showAlert, setShowAlert] = useState(false);
        const { helpers } = useContext(UserContext);
        const navigate = useNavigate();
        console.log(helpers)
    
        useEffect(() => { 
            const user_id = localStorage.getItem('user_id');
             if (user_id) { 
                setUserFormData({ ...userFormData, users_id: user_id }); 
            } }, []);


        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setUserFormData({ ...userFormData, [name]: value });
    
        };

    
        const handleFormSubmit = async (event) => {
            event.preventDefault();
    
            // check if form has everything (as per react-bootstrap docs)
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            const user_id = localStorage.getItem('user_id'); 
            

            const user  = await createPenalty(userFormData);

            navigate("/welcome");
    /// pick up this page and here
            setUserFormData({
                penalty_name: '',
                penalty_description: '',
                penalty_value: '',
                users_id: localStorage.getItem('user_id'),
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
        <Form.Label htmlFor='penalty_name'> Penalty Name</Form.Label>
        <Form.Control
            type='text'
            placeholder='Name of the Penalty'
            name='penalty_name'
            onChange={handleInputChange}
            value={userFormData.penalty_name}
            required
        />
        <Form.Control.Feedback type='invalid'>Penalty name is required!</Form.Control.Feedback>
    </Form.Group>

    <Form.Group>
        <Form.Label htmlFor='penalty_desciption'> Penalty Description</Form.Label>
        <Form.Control
            type='text'
            placeholder='Description of the Penalty'
            name='penalty_description'
            onChange={handleInputChange}
            value={userFormData.penalty_description}
            required
        />
        <Form.Control.Feedback type='invalid'>Penalty description is required!</Form.Control.Feedback>
    </Form.Group>
    
    <Form.Group>
        <Form.Label htmlFor='penalty_value'> Penalty value</Form.Label>
        <Form.Control
            type='text'
            placeholder='penalty value'
            name='penalty_value'
            onChange={handleInputChange}
            value={userFormData.penalty_value}
            required
        />
        <Form.Control.Feedback type='invalid'>Penalty value is required!</Form.Control.Feedback>
    </Form.Group>
    
    <Button
        disabled={!(userFormData.penalty_name && userFormData.penalty_description && userFormData.penalty_value) }
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
  export default AddPenalty;
