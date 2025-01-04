import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import { createHelper, } from '../util/API';
// import  AuthService from "../util/auth"

// import {useContext}from 'react';
// import { UserContext } from "../util/userContext";

import Boy1 from '../Assets/lilboy1.png'
import Boys2 from '../Assets/2boys.png'
import Girl3 from '../Assets/lilgirl3.png'

// need to troubleshoot... you currently need to sabe 2 times nefore it actually saves
//the first attempt doesn't properly pull the users id from the context
// the second time does ok

const AddHelpers =()=> {


        // set initial form state
        const [userFormData, setUserFormData] = useState({ child_name: '', avatar: '', current_points: '0', users_id: '' });
        // set state for form validation
        const [validated] = useState(false);
        // set state for alert
        const [showAlert, setShowAlert] = useState(false);
          const navigate = useNavigate();
        // const { profile} = useContext(UserContext);
   

     useEffect(() => { 
        const user_id = localStorage.getItem('user_id'); 
        if (user_id) { setUserFormData((prevFormData) => ({ ...prevFormData, users_id: user_id })); 
    } 
},[]);
        
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
    
            
        //     let me = AuthService.getProfile();
        //    const user_id = profile.data.id
        //    console.log(user_id)
    
console.log(userFormData)
        
const user  = await createHelper(userFormData);
navigate("/welcome");
         
        //    console.log(user_id)
          
        
    
            setUserFormData({
                users_id:localStorage.getItem('user_id'),
                child_name: '',
                avatar: '',
                current_points: '',
            });
    
        };
    
      
        return (
            <>
            {/* This is needed for the validation functionality above */}
            <div className='d-flex mx-auto w-50 border border-danger '>
                <div>
                    <div className='p-2'>
                    <p className="font-weight-bold text-justify">Alert: <span className="font-weight-normal">Password Resets and Password Recovery are not 
                    available. Depending on application adoption, it will be included in future development. So please take 
                    great care to save your Password.</span> </p>
                    </div>
                </div>
            </div>
            <br></br>
            <div className='d-flex mx-auto w-50 '>
            <Form className='w-50' noValidate validated={validated} onSubmit={handleFormSubmit}>
                {/* show alert if server response is bad */}
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong with your signup!
                </Alert>
    
                <Form.Group>
                    <Form.Label htmlFor='child_name'> Helper's Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Your helpers name'
                        name='child_name'
                        onChange={handleInputChange}
                        value={userFormData.child_name}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Helper's name is required!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='avatar'> Helper's Avatar</Form.Label>
                    <select class="form-select"  name='avatar'   onChange={handleInputChange}
                        value={userFormData.avatar}aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value={Boy1}>Boy1</option>
  <option value={Boys2}>2 Boys</option>
  <option value={Girl3}>Girl3</option>
</select>
                    <Form.Control.Feedback type='invalid'>You forgot to choose their Avatar</Form.Control.Feedback>
                </Form.Group>
    
                {/* <Form.Group>
                    <Form.Label htmlFor='current_points'>Current Points</Form.Label>
                    <Form.Control
                        type='current_points'
                        placeholder='Their Currrent Points'
                        name='current_points'
                        onChange={handleInputChange}
                        value={userFormData.current_points}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Current points is required!</Form.Control.Feedback>
                </Form.Group> */}
    
                <Form.Group>
                    <Form.Label htmlFor='current_points'>Current Points</Form.Label>
                    <Form.Control
                        type='current_points'
                        placeholder='Number of Points They Current'
                        name='current_points'
                        onChange={handleInputChange}
                        value={userFormData.current_points}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Already current points is required!</Form.Control.Feedback>
                </Form.Group>
                <Button
                disabled={!(userFormData.child_name && userFormData.avatar && userFormData.current_points) }
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
  export default AddHelpers;
