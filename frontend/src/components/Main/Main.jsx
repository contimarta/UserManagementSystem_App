import { Container, Row, Col } from 'react-bootstrap';
import UsersTable from "./Table/UsersTable";
import CreateUser from "./CreateUser";

const Main = ({ users, uploadUsers }) => {
    return (
        <Container className="mt-5">
            <Row>
                <Col >
                    <CreateUser uploadUsers={uploadUsers} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <UsersTable users={users} uploadUsers={uploadUsers} />
                </Col>
            </Row>
        </Container>
    );
};

export default Main;
