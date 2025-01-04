// see Signup.js for comments
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import AuthService from '../../util/auth';
// import { Link } from 'react-router-dom';
 import { loginUser, 
  // getMe 

 } from '../../util/API';

const Login = () => {
  const [userFormData, setUserFormData] = useState({email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserFormData({ 
        ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
      event.preventDefault();

      // check if form has everything (as per react-bootstrap docs)
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
      }

  
     const data  = await loginUser(userFormData);
     const token= data.token;
 if (token === null || token === undefined)
  {    
    setShowAlert(true);
  console.log('something went wrong!')
  }
 else {       
  console.log(token)
  AuthService.login(token);
}

  
      // Need to add the private routing, any even those missing token will go to homepage
      // the authservice is properly adding the bearer to local storage/// they it could just be cleaning up this
      // error handling below
    
      // console.log(data)
      
      /// need to determine the correct placement for this
      // it will properly save here but it will allow everything in
      // even if there is no match -- need a way to make sure that it will make call
      // if it's wrong, then there will eb the error
      // saving only if there is no error there

      // const token= data.token;
      // // console.log(token)
      // AuthService.login(token);
   
    // eslint-disable-next-line no-undef
  //   if (error) {
  //   throw new Error('something went wrong!');
  // }
 
      // const token= data.token;
      // console.log(token)
      // AuthService.login(token);

    //  } catch (err) {
    //       // console.error(err);
    //       setShowAlert(true);
    //       console.log()
    //     }

      setUserFormData({
          email: '',
          password: '',
      });

  };

  
    return (
      <>
      <div className='d-flex mx-auto w-50 '>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='info'>
          Submit
        </Button>
        <br></br>
<br>
      </br>
      </Form>
      </div>
      <div className='d-flex mx-auto w-50 '>
      {/* <p className="center">Oops, not a member yet? Sign Up Here!<br/><Link to="/signup" className="add-padding link-text bold-text">Create an Account</Link></p> */}
      
      </div>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
    </>
  );
};
  
  export default Login;