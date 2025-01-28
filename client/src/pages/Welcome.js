import React, { useContext, useState, useEffect } from 'react';
import AuthService from "../util/auth";
import { UserContext } from "../util/userContext";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cards from "../Components/Core/kidcards";
import { Link } from 'react-router-dom';
import Tasklist from "../Components/Core/tasklist";
import Rewardslist from "../Components/Core/RewardsList";
import Penaltylist from "../Components/Core/PenaltyList";

const Welcome = () => {
    let me = AuthService.getProfile();
    const { profile, helpers, tasks, rewards, penalties } = useContext(UserContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showRL, setShowRL] = useState(false);
    const handleCloseRL = () => setShowRL(false);
    const handleShowRL = () => setShowRL(true);
    const [showPL, setShowPL] = useState(false);
    const handleClosePL = () => setShowPL(false);
    const handleShowPL = () => setShowPL(true);

    useEffect(() => {
        async function fetchData() {
            try {
                if (profile && helpers && tasks && rewards && penalties) {
                    let me = profile;
                    console.log("Profile:", me);
                    if (helpers) {
                        let heroes = helpers;
                        console.log("Helpers:", heroes);
                    } else {
                        console.warn('No kids data available');
                    }
                } else {
                    console.warn('Profile data or ID is missing');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [profile, tasks, rewards, penalties, helpers, helpers.length]);

    return (
        <>
            <h1 className="display-4 text-center border-bottom">Welcome Back</h1>
            <p className="text-md-center text-sm-left m-3">{me.data.name}, let's see what your kids have been up to!</p>
            <Container>
                <Row>
                    <Col>
                        <Button variant="primary" onClick={handleShowRL}>Show Rewards List</Button>
                        <Offcanvas show={showRL} placement="top" onHide={handleCloseRL}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Rewards List</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Rewardslist />
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handleShowPL}>Show Penalty List</Button>
                        <Offcanvas show={showPL} placement="top" onHide={handleClosePL}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Penalty List</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Penaltylist />
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handleShow}>Show Task List</Button>
                        <Offcanvas show={show} placement="top" onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Task List</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Tasklist />
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Col>
                </Row>
                <Row className="mt-4">
                    {helpers ? (
                        helpers.map((kid) => (
                            <Col key={kid.id} xs={12} md={6} lg={3} >
                                <Cards
                                    child_name={kid.child_name}
                                    helpers_id={kid.id}
                                    current_points={kid.current_points}
                                    annual_points={kid.annual_points}
                                    avatar={kid.avatar}
                                    target_reward={kid.target_reward}
                                    users_id={kid.users_id}
                                    // Log the target_reward prop for debugging
                                    logProps={() => console.log('Props in Parent:', { target_reward: kid.target_reward, users_id: kid.users_id })}
                                />
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <p className="center">
                                No helpers available. Go here to add some. <br />
                                <Link to="/signup" className="add-padding link-text bold-text">Create an Account</Link>
                            </p>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default Welcome;
