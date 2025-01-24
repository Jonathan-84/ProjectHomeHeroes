import React, { useContext, 
    useState, 
    useEffect } from 'react';
import AuthService from "../util/auth";
import { UserContext } from "../util/userContext";
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cards from "../Components/Core/kidcards";
// import { getMe } from '../util/API';
import { Link} from 'react-router-dom';
import Tasklist from "../Components/Core/tasklist";
import Rewardslist from "../Components/Core/RewardsList";
import Penaltylist from "../Components/Core/PenaltyList";

const Welcome = () => {
    let me = AuthService.getProfile();
    const { profile, helpers, tasks, rewards, penalties } = useContext(UserContext);
   
    // const [data, setData] = useState(null);
    // const [kids, setKids] = useState([]); // Initialize as an empty array

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
                    console.log(me);
                    // const response = await getMe(id); // Replace with your API endpoint
                    // setData(response); // Assuming response is an object
                    if (helpers) { // Ensure response.kids is defined
                        let heroes = helpers; // Assuming response.kids is an array
                        console.log(heroes)/// should be array of kids
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
    }, [profile, tasks, rewards, penalties, helpers,helpers.length]); // Only re-run if profile changes

    // console.log(data);

    return (
        <>
            <h1 className="display-4 text-center border-bottom">Welcome Back</h1>
            <p className="text-md-center text-sm-left m-3">{me.data.name}, let's see what your little ones have been up to!</p>
            <Container>
            <Row>
                <Col>
                {/* work on how to center the works list button etc*/}

                <Button variant="primary" onClick={handleShowRL}> Show Rewards List </Button> 
                    <Offcanvas show={showRL} placement="top"  onHide={handleCloseRL}> 
                        <Offcanvas.Header closeButton> 
                            <Offcanvas.Title>Rewards List</Offcanvas.Title> 
                            </Offcanvas.Header> 
                            <Offcanvas.Body> 
                                <Rewardslist />  
                                </Offcanvas.Body> 
                            </Offcanvas>
                            </Col>
   {/* workalso work on how to space these 2*/}
   <Col>
                            <Button variant="primary" onClick={handleShowPL}> Show Penalty List </Button> 
                    <Offcanvas show={showPL} placement="top"  onHide={handleClosePL}> 
                        <Offcanvas.Header closeButton> 
                            <Offcanvas.Title>Penalty List</Offcanvas.Title> 
                            </Offcanvas.Header> 
                            <Offcanvas.Body> 
                                <Penaltylist />  
                                </Offcanvas.Body> 
                            </Offcanvas>
                </Col>
   <Col>
                            <Button variant="primary" onClick={handleShow}> Show Task List </Button> 
                    <Offcanvas show={show} placement="top"  onHide={handleClose}> 
                        <Offcanvas.Header closeButton> 
                            <Offcanvas.Title>Task List</Offcanvas.Title> 
                            </Offcanvas.Header> 
                            <Offcanvas.Body> 
                                <Tasklist />  
                                </Offcanvas.Body> 
                            </Offcanvas>
                </Col>
             
            </Row>
            <br>
                </br>
                <br></br>
                <Row sm={9} xs={1} md={2} >
                    <Col>
                        <CardGroup>
                            {helpers ? (
                                helpers.map((kid) => (
                                    <Cards key={kid.id} child_name={kid.child_name} helpers_id={kid.id} current_points={kid.current_points} avatar={kid.avatar} users_id={kid.users_id} />
                                ))
                            ) : (
                                <p className="center">
                                    No helpers available. Go here to add some. <br /><Link to="/signup" className="add-padding link-text bold-text">Create an Account</Link>
                                </p>
                            )}
                        </CardGroup>
                    </Col>
                    <Col sm={2}>
                    {/* <Button variant="primary" onClick={handleShow}> Show Task List </Button> 
                    <Offcanvas show={show} placement="end"  onHide={handleClose}> 
                        <Offcanvas.Header closeButton> 
                            <Offcanvas.Title>Task List</Offcanvas.Title> 
                            </Offcanvas.Header> 
                            <Offcanvas.Body> 
                                <Tasklist />  
                                </Offcanvas.Body> 
                            </Offcanvas> */}
               
                    {/* <Link to={"/tasklist"} className="nav-link px-0 d-none d-lg-block game-on">
                    <i class="fs-4 fa-solid fa-gamepad"></i> <span className="d-none d-sm-inline">Challenge <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">🏆</button></span></Link> 
                    
                    <div class="offcanvas offcanvas-end" data-bs-scroll="true" href={"/🎮"} data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header">
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body game-on">
  <Tasklist />
  </div>
  </div> */}
                        {/* <Tasklist /> */}
                    </Col>
                </Row>
        
                {/* <Row>
                <Col>
                <Rewardslist />
                </Col>
             
            </Row>
            <br>
                </br>
                <br></br> */}
            </Container>
        </>
    );
};

export default Welcome;
