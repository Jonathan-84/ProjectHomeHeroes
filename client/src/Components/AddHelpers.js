import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createHelper } from '../util/API';

import Boy1 from '../Assets/lilboy1.png';
import Girl3 from '../Assets/lilgirl3.png';
import leperchaun from '../Assets/leperchaun.jpeg';
import zeus from '../Assets/zeus.jpeg';
import superhero from '../Assets/superhero.jpeg';
import unicorn from '../Assets/unicorn.jpeg';

const AddHelpers = () => {
    const [userFormData, setUserFormData] = useState({ child_name: '', avatar: '', current_points: '0', annual_points: '0', users_id: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null); // New state for avatar preview
    const navigate = useNavigate();

    useEffect(() => { 
        const user_id = localStorage.getItem('user_id');
        if (user_id) {
            setUserFormData((prevFormData) => ({ ...prevFormData, users_id: user_id }));
        } 
    }, []);
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });

        // Set avatar preview when avatar is selected
        if (name === 'avatar') {
            setAvatarPreview(value);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        const user = await createHelper(userFormData);
        navigate("/welcome");

        setUserFormData({
            users_id: localStorage.getItem('user_id'),
            child_name: '',
            avatar: '',
            current_points: '',
            annual_points: '0'
        });

        setAvatarPreview(null); // Reset avatar preview after form submission
    };

    return (
        <Container>
            <Row className='d-none d-sm-block my-3'>
                {/* This is needed for the validation functionality above */}
                <Col>
                    <br /><br /><br />
                </Col>
            </Row>
            <Row>
                <Col xs={12} lg={6} className='mx-auto'>
                    <Form className='w-100' noValidate validated={validated} onSubmit={handleFormSubmit}>
                        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                            Something went wrong with your signup!
                        </Alert>

                        <Form.Group>
                            <Form.Label htmlFor='child_name'>Helper's Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Your helper's name"
                                name='child_name'
                                onChange={handleInputChange}
                                value={userFormData.child_name}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>Helper's name is required!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor='avatar'>Helper's Avatar</Form.Label>
                            <Form.Control
                                as='select'
                                name='avatar'
                                onChange={handleInputChange}
                                value={userFormData.avatar}
                                aria-label='Default select example'
                                required
                            >
                                <option value=''>Open this select menu</option>
                                <option value={Boy1}>Boy</option>
                                <option value={leperchaun}>Leperchaun</option>
                                <option value={Girl3}>Girl</option>
                                <option value={zeus}>Zeus</option>
                                <option value={superhero}>Superhero</option>
                                <option value={unicorn}>Unicorn</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>You forgot to choose their Avatar</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor='current_points'>Current Points</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Number of Points They Currently Have'
                                name='current_points'
                                onChange={handleInputChange}
                                value={userFormData.current_points}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>Current points are required!</Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            disabled={!(userFormData.child_name && userFormData.avatar && userFormData.current_points)}
                            type='submit'
                            variant='warning'
                        >
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col xs={12} lg={6} className='mx-auto'>
                    <p className='center'>Already have an account with us?<br /><Link to='/login' className='add-padding link-text bold-text'>Login to your account</Link></p>
                </Col>
            </Row>
            <Row className='d-none d-sm-block my-3'>
                <Col>
                    <br /><br /><br /><br />
                </Col>
            </Row>
            {avatarPreview && (
                <Row className='d-flex justify-content-center my-3'>
                    <Col xs={6} md={4}>
                        <div className='avatar-preview'>
                            <img src={avatarPreview} alt="Avatar Preview" className='rounded w-100 avatar-preview-image' />
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default AddHelpers;
