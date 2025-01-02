import React, { useContext, 
    // useState, 
    useEffect } from 'react';
import AuthService from "../util/auth";
import { UserContext } from "../util/userContext";
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cards from "../Components/Core/kidcards";
// import { getMe } from '../util/API';
import { Link} from 'react-router-dom';
import Tasklist from "../Components/Core/tasklist";

const Welcome = () => {
    let me = AuthService.getProfile();
    const { profile, helpers } = useContext(UserContext);
   
    // const [data, setData] = useState(null);
    // const [kids, setKids] = useState([]); // Initialize as an empty array

    useEffect(() => {
        async function fetchData() {
            try {
                if (profile && helpers) {
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
    }, [profile,helpers,helpers.length]); // Only re-run if profile changes

    // console.log(data);

    return (
        <>
            <h1 className="display-4 text-center border-bottom border-warning">Welcome Back</h1>
            <p className="text-md-center text-sm-left m-3">{me.data.name}, let's see what your little ones have been up to!</p>
            <Container>
                <Row>
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
                    <Col>
                        <Tasklist />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Welcome;
