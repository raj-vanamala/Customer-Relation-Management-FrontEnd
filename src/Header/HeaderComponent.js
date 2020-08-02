import React from 'react';
import './HeaderComponent.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import {Container} from 'react-bootstrap';
import { FaIdCard,FaUser,FaChartLine, FaServicestack  } from 'react-icons/fa'

import LeadsComponent from '../Leads/LeadsComponent';
import ContactsComponent from '../Contacts/ContactsComponent';
import ServiceRequestsComponent from '../Requests/ServiceRequestsComponent';
import DashBoardComponent from '../Dashboard/DashBoardComponent';

class HeaderComponent extends React.Component {

    constructor(props) {
        console.log(props);
        super(props)
        this.state = {
            name : props.name
        }
    }

    displayHeaderComponent() {

        return (
            <Container>
                    <center><h1>Hello <b>{this.state.name}</b></h1></center>
                    <Router>
                        <div>
                            <div className = "flex-css">
                                <div>
                                    <Link to="/"><FaChartLine />DashBoard</Link>
                                </div>
                                <div>
                                    <Link to="/Leads"><FaUser />Leads</Link>
                                </div>
                                <div>
                                    <Link to="/Contacts"><FaIdCard />Contacts</Link>
                                </div>
                                <div>
                                    <Link to="/Requests"><FaServicestack />ServiceRequests</Link>
                                </div>
                            </div>

                            <hr />

                            <Switch>
                            <Route exact path="/">
                                <DashBoardComponent />
                            </Route>
                            <Route path="/Leads">
                                <LeadsComponent />
                            </Route>
                            <Route path="/Contacts">
                                <ContactsComponent />
                            </Route>
                            <Route path="/Requests">
                                <ServiceRequestsComponent />
                            </Route>
                            </Switch>
                        </div>
                </Router>
            </Container>
        )
    }
    
    render() {
        return this.displayHeaderComponent();
    }
}

export default HeaderComponent;