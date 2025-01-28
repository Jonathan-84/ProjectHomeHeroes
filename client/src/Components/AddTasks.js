import React, { useState, useContext } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createTask } from '../util/API';
import { UserContext } from "../util/userContext";

const AddTasks = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({ task_name: '', task_points: '', kids_id: '' });
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);
    const { helpers } = useContext(UserContext);
    const navigate = useNavigate();

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

        const user = await createTask(userFormData);

        navigate("/welcome");

        setUserFormData({
            task_name: '',
            task_points: '',
            kids_id: '',
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
                            <Form.Label htmlFor='task_name'>Task Name</Form.Label>
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
                            <Form.Label htmlFor='task_points'>Task Points</Form.Label>
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
                            <Form.Label htmlFor='task_assignment'>Assign Task</Form.Label>
                            <Form.Control
                                as='select'
                                name='kids_id'
                                onChange={handleInputChange}
                                value={userFormData.kids_id}
                                aria-label='Default select example'
                                required
                            >
                                <option value=''>Open this select menu</option>
                                {helpers && helpers.length > 0 ?
                                    helpers.map((helper) =>
                                        helper && helper.id ? (
                                            <option key={helper.id} value={helper.id}>{helper.child_name}</option>
                                        ) : null
                                    )
                                    : null}
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>You forgot to assign the task</Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            disabled={!(userFormData.task_name && userFormData.task_points && userFormData.kids_id)}
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

export default AddTasks;
