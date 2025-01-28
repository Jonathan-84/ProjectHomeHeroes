import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createPenalty } from '../util/API';
import { UserContext } from "../util/userContext";

const AddPenalty = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({ penalty_name: '', penalty_description: '', penalty_value: '', users_id: '' });
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);
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

        const user = await createPenalty(userFormData);

        navigate("/welcome");

        setUserFormData({
            penalty_name: '',
            penalty_description: '',
            penalty_value: '',
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
                <Col xs={12} lg={6} className='mx-auto'>
                    <Form className='w-100' noValidate validated={validated} onSubmit={handleFormSubmit}>
                        {/* show alert if server response is bad */}
                        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                            Something went wrong with your signup!
                        </Alert>
                        <Form.Group>
                            <Form.Label htmlFor='penalty_name'>Penalty Name</Form.Label>
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
                            <Form.Label htmlFor='penalty_description'>Penalty Description</Form.Label>
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
                            <Form.Label htmlFor='penalty_value'>Penalty Value</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Penalty value'
                                name='penalty_value'
                                onChange={handleInputChange}
                                value={userFormData.penalty_value}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>Penalty value is required!</Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            disabled={!(userFormData.penalty_name && userFormData.penalty_description && userFormData.penalty_value)}
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

export default AddPenalty;
