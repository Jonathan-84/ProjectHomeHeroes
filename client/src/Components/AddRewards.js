import React, { useState, useContext, useEffect} from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createReward } from '../util/API';

import { UserContext } from "../util/userContext";


const AddRewards =()=> {

        // set initial form state
        const [userFormData, setUserFormData] = useState({ rewards_name: '', rewards_description: '',redemption_value: '', users_id: '' });
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
            

            const user  = await createReward(userFormData);

            navigate("/welcome");
    /// pick up this page and here
            setUserFormData({
                rewards_name: '',
                rewards_description: '',
                redemption_value: '',
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
        <Form.Label htmlFor='rewards_name'> Reward Name</Form.Label>
        <Form.Control
            type='text'
            placeholder='Name of the Reward'
            name='rewards_name'
            onChange={handleInputChange}
            value={userFormData.rewards_name}
            required
        />
        <Form.Control.Feedback type='invalid'>Reward name is required!</Form.Control.Feedback>
    </Form.Group>

    <Form.Group>
        <Form.Label htmlFor='rewards_desciption'> Reward Description</Form.Label>
        <Form.Control
            type='text'
            placeholder='Description of the Reward'
            name='rewards_description'
            onChange={handleInputChange}
            value={userFormData.rewards_description}
            required
        />
        <Form.Control.Feedback type='invalid'>Reward description is required!</Form.Control.Feedback>
    </Form.Group>
    
    <Form.Group>
        <Form.Label htmlFor='redemption_value'> Redemption value</Form.Label>
        <Form.Control
            type='text'
            placeholder='redemption value'
            name='redemption_value'
            onChange={handleInputChange}
            value={userFormData.redemption_value}
            required
        />
        <Form.Control.Feedback type='invalid'>Redemption value is required!</Form.Control.Feedback>
    </Form.Group>
    
    <Button
        disabled={!(userFormData.rewards_name && userFormData.rewards_description && userFormData.redemption_value) }
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
  export default AddRewards;
