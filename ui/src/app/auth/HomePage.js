import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Alert, Col, Container, ListGroup, ListGroupItem, Row} from 'reactstrap';
import {Block} from './Block';

import {actionCreators as userActions} from './duck';

class HomePage extends React.Component {

    state = {
        isOpen: false
    };

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.deleteUser(id));
    }

    render() {
        const {user, auth} = this.props;
        return (
            <Container>
                <Alert color="success">
                    Hi {user.firstName}! You're logged in.
                </Alert>
                <Row>
                    <Col xs="8">
                        <h3>All registered users:</h3>
                        {auth.loading && <em>Loading users...</em>}
                        {auth.error && <span className="text-danger">ERROR: {auth.error}</span>}
                        {auth.users &&
                            <ListGroup>
                                {auth.users.map((user, index) =>
                                    <ListGroupItem key={user.id}>
                                        {user.firstName + ' ' + user.lastName}
                                        {
                                            user.deleting ? <em> - Deleting...</em>
                                            : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                            : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                        }
                                    </ListGroupItem>
                                )}
                            </ListGroup>
                        }
                        <p>
                            <Link to="/login">Logout</Link>
                        </p>
                        <Block count={10} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    const {auth} = state;
    const {user} = auth;
    return {
        user,
        auth,
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export {connectedHomePage as HomePage};
