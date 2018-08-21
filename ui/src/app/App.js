import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {HashRouter, Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import {DashBoard} from './dashboard/DashboardContainer';
// import {Menu} from './Menu';
import {history} from '../history';
import {PrivateRoute} from '../routes/PrivateRoute';
import {HomePage} from '../app/Auth/HomePage';
import {LoginPage} from '../app/Auth/Login';
import {RegisterPage} from '../app/Auth/Register';
import {actionCreators as NotificationActions} from './notifications/duck';
import Menu from './layout/menu';
import 'bootstrap/dist/css/bootstrap.min.css';

export class App extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        notifications: PropTypes.array,
    };

    componentWillMount() {
        const {dispatch} = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            // dispatch(NotificationActions.doSetClear());
        });
    }

    render() {
        const {alert} = this.props;
        const NoMatch = ({location}) => (
            <div>
                <h3>No match for <code>{location.pathname}</code></h3>
            </div>
        );
        console.log('props- ', this.props);
        return (
            <Container fluid={true}>
                <Menu />
                {/*
                <Row>
                    <Col xs="12">
                    {alert && alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    </Col>
                </Row>
                */}
                <Router history={history}>
                    <div className="main-app">
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                    </div>
                </Router>
            </Container>
        );
    }
}

// export {App};
