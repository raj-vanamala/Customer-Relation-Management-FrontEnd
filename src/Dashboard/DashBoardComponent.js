import React from 'react';
import './DashBoardComponent.css'
import { FaIdCard,FaUser, FaServicestack  } from 'react-icons/fa'
import {Spinner } from 'react-bootstrap';


export default class DashBoardComponent extends React.Component {


    constructor() {
        super();
        this.state = {
            leadsCount : '',
            contactsCount : '',
            requestsCount : ''
        }
    }

    componentDidMount() {

        fetch('https://crm-backend-code.herokuapp.com/leadsCount')
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                leadsCount : data
            })
        })

        fetch('https://crm-backend-code.herokuapp.com/contactsCount')
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                contactsCount : data
            })
        })

        fetch('https://crm-backend-code.herokuapp.com/requestsCount')
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                requestsCount : data
            })
        })

    }

    displayDashBoardComponent() {

        return (
            <div className='flex-css1'>
                <div style= {{margin : "2%"}}>
                    <h1>
                    <span>
                    <b><FaUser />Leads Count</b>
                    </span>
                    <span>
                       {
                        (this.state.leadsCount === '')?
                       <center><Spinner animation="border" variant="info" /></center>
                       :<center><h1> <b>{this.state.leadsCount}</b></h1></center>
                       }
                    </span>
                    </h1>
                </div>
                <div style= {{margin : "2%"}}>
                    <h1>
                    <span>
                    <b><FaIdCard />Contacts Count</b>
                    </span>
                    <span>
                       {
                        (this.state.contactsCount === '')?
                       <center><Spinner animation="border" variant="info" /></center>
                       :<center><h1> <b>{this.state.contactsCount}</b></h1></center>
                       }
                    </span>
                    </h1>
                </div>
                <div style= {{margin : "2%"}}>
                    <h1>
                    <span>
                    <b><FaServicestack /> Requests Count</b>
                    </span>
                    <span>
                       {
                        (this.state.requestsCount === '')?
                       <center><Spinner animation="border" variant="info" /></center>
                       :<center><h1> <b>{this.state.requestsCount}</b></h1></center>
                       }
                    </span>
                    </h1>
                </div>
            </div>
        )

    }

    render() {
        return this.displayDashBoardComponent();
    }
}