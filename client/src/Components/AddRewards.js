import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createReward } from '../util/API';
import { UserContext } from '../util/userContext';

const AddRewards = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({ rewards_name: '', rewards_description: '', redemption_value: '', users_id: '' });
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);
    const { helpers } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const user_id = localStorage.getItem('user_id');
        if (user_id) {
            setUserFormData({ ...userFormData, users_id: user_id });
        }
    }, []);

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

        const user = await createReward(userFormData);

        navigate("/welcome");

        setUserFormData({
            rewards_name: '',
            rewards_description: '',
            redemption_value: '',
            users_id: localStorage.getItem('user_id'),
        });
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
                <Col xs={12} lg={6} className='mx-auto border border-danger'>
                </Col>
            </Row>
            <Row>
                <Col xs={12} lg={6} className='mx-auto'>
                    <Form className='w-100' noValidate validated={validated} onSubmit={handleFormSubmit}>
                        {/* show alert if server response is bad */}
                        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                            Something went wrong with your signup!
                        </Alert>
                        <Form.Group>
                            <Form.Label htmlFor='rewards_name'>Reward Name</Form.Label>
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
                            <Form.Label htmlFor='rewards_description'>Reward Description</Form.Label>
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
                            <Form.Label htmlFor='redemption_value'>Redemption Value</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Redemption value without commas'
                                name='redemption_value'
                                onChange={handleInputChange}
                                value={userFormData.redemption_value}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>Redemption value is required!</Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            disabled={!(userFormData.rewards_name && userFormData.rewards_description && userFormData.redemption_value)}
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
        </Container>
    );
};

export default AddRewards;
