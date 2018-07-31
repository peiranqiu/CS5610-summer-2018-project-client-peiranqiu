import React from 'react';
import '../../node_modules/bootstrap/js/dist/dropdown.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../styles/home.css';
import '../styles/test.css';
import logo from '../resources/background/logo.jpg'
import user from '../resources/icons/user.png'

import MapContainer from './MapContainer';
import TrendingContainer from './TrendingContainer';
import UserServiceClient from "../services/UserServiceClient";

export default class Home
    extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };

        this.userService = UserServiceClient.instance();

        this.termChanged = this.termChanged.bind(this);
    }

    componentDidMount() {
        this.userService.findCurrentUser()
            .then(user => {
                this.setState({user: user});
            });
    }

    componentWillReceiveProps(newProps) {
        this.userService.findCurrentUser()
            .then(user => {
                this.setState({user: user});
            });
    }

    termChanged(event) {
        this.setState({term: event.target.value});
    }

    logout() {
        this.userService.logout();
    }

    render() {
        return (
            <div>
                <div className="background home"></div>
                <nav className="navbar navbar-light sticky-top">
                    <a className="navbar-brand mt-2" href="/home">
                        <img src={logo} width="47" height="35"
                             className="mr-3 d-inline-block align-top" alt=""/>
                        FOOD TRUCK MAPPER
                    </a>
                    <a className="nav-item" id="nav-item-1" href="#map-container">Find Trucks</a>
                    <a className="nav-item" id="nav-item-2" href="#trending-container">Trending</a>
                    <span className="nav-item dropdown" id="user-icon">
                        <a className="nav-item dropdown dropdown-toggle" id="navbarDropdownMenuLink" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={user} width="14" height="14" className="d-inline-block" alt=""/>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {this.props.user === undefined
                            && <a className="dropdown-item" href="/login/user">Log In</a>}
                            {this.props.user === undefined
                            && <a className="dropdown-item" href="/register/user">Register</a>}
                            {this.props.user !== undefined
                            && <a className="dropdown-item" href="/profile/user/${this.props.user.id}">Profile</a>}
                            {this.props.user !== undefined
                            && <a className="dropdown-item" href="/home" onClick={() => this.logout()}>Log Out</a>}


                        </div>
                    </span>
                </nav>
                <MapContainer user={this.state.user}/>
                <TrendingContainer/>
                <nav className="navbar navbar-light sticky-bottom">
                    <a className="navbar-brand">
                        ©2018 All Rights Reserved.
                    </a>
                    <a className="nav-item" id="nav-item-2" href="mailto:joannfeng89@gmail.com?Subject=Hello">Contact Us</a>
                    <a className="nav-item" id="nav-item-3" href="/register/owner">Vendor?</a>
                </nav>



            </div>
        );
    }
}
