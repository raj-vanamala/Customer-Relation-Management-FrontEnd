import React from 'react';
import {Button,Form,Col,Modal,Row,Container,Spinner } from 'react-bootstrap';
import './LeadsComponent.css'
import { FaPencilAlt, FaTrash,FaUser  } from 'react-icons/fa'


export default class LeadsComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            Lead_Id : '',
            Lead_Name : '',
            Email : '',
            Status : 'New',
            show : false,
            Leads : [],
            IS_UPDATE_LEAD : false,
            id  : ''
        }
        this.updateLead = this.updateLead.bind(this);
    }

    componentDidMount() {

        let url = 'https://crm-backend-code.herokuapp.com/getLeads'

        fetch(url)

        .then((response)=>response.json())

        .then((data)=>{
            console.log(data);
            this.setState({
                Leads : data
            })
        })

        .catch((err)=>alert(err))
    }

    componentDidUpdate() {
        let url = 'https://crm-backend-code.herokuapp.com/getLeads'

        fetch(url)

        .then((response)=>response.json())

        .then((data)=>{
            console.log(data);
            this.setState({
                Leads : data
            })
        })

        .catch((err)=>alert(err))
    }

    changeValue = (event) => {
        let target = event.target;

        if(target.name === 'Lead_Id') {
            this.setState({
                Lead_Id: target.value
            })
        } 
        else if(target.name === 'Lead_Name'){
            this.setState({
                Lead_Name: target.value
            })
        }
        else if(target.name === 'Email'){
            this.setState({
                Email: target.value
            })
        }
        else if(target.name === 'Status'){
            
                this.setState({
                    Status: target.value
                })
        }
    }

    handleShow = () => {

        this.setState({
            show : true
        })
    }

    handleClose = () => {

        this.setState({
            Lead_Id : '',
            Lead_Name : '',
            Email : '',
            Status : 'New',
            show : false,
            IS_UPDATE_LEAD : false
        })
    }

    addLead = () => {

        let url = 'https://crm-backend-code.herokuapp.com/addLead'

        fetch(url,{
            "method" : "post",
            "headers" :{
                'Content-Type': 'application/json',
                "authorization" : localStorage.getItem('authorizationToken')
            },
            "body" : JSON.stringify({
                Lead_Id : this.state.Lead_Id,
                Lead_Name : this.state.Lead_Name,
                Email : this.state.Email,
                Status : this.state.Status
            })
            })

            .then((response)=>response.json())

            .then((data)=>{
                alert(data.message);
                this.handleClose();
                this.setState({
                    Lead_Id : '',
                    Lead_Name : '',
                    Email : '',
                    Status : 'New'
                })
            })

            .catch((err)=>alert(err))
            
    }

    displayLeadsComponent = () => {

        return (
            <Container>
                <Button variant = 'outline-info' className = 'button-css' onClick={this.handleShow}><FaUser /> Add Lead</Button>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            (this.state.IS_UPDATE_LEAD === true) ? "Update Lead" : "Add Lead"
                        }
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col lg={6}>
                                    <Form.Group controlId="formBasicLeadId">
                                        <Form.Label>Lead Id</Form.Label>
                                        <Form.Control type="text" placeholder="Lead Id" name = 'Lead_Id'  value = {this.state.Lead_Id} onChange={this.changeValue}/>
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group controlId="formBasicLeadName">
                                        <Form.Label>Lead Name</Form.Label>
                                        <Form.Control type="text" placeholder="Lead Name" name = 'Lead_Name'  value = {this.state.Lead_Name} onChange={this.changeValue}/>
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Email" name = 'Email'  value = {this.state.Email} onChange={this.changeValue}/>
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                        <Form.Group controlId="formBasicStatus">
                                            <Form.Label>Status</Form.Label>
                                            <Form.Control as="select" onChange={this.changeValue} name = 'Status'>
                                            <option value='New' selected>New</option>
                                            <option value='Contacted'>Contacted</option>
                                            <option value='Qualified'>Qualified</option>
                                            <option value='Lost'>Lost</option>
                                            <option value='Cancelled'>Cancelled</option>
                                            <option value='Confirmed'>Confirmed</option>
                                            </Form.Control>
                                        </Form.Group>
                                </Col>
                                </Row>
                                </Form>
                                        
                            
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="outline-danger" onClick={this.handleClose}>
                                Close
                                </Button>
                                {
                                    (this.state.IS_UPDATE_LEAD === true?
                                    <Button variant="outline-info" onClick= {this.updateLead}>
                                    Update Lead <FaUser />
                                    </Button> :

                                    <Button variant="outline-info" onClick= {this.addLead}>
                                    Add Lead <FaUser />
                                    </Button>)
                                }
                            </Modal.Footer>
                        </Modal>
                    <div style={{marginTop : "10px"}}>
                    <Row>
                                <Col lg={2}>Lead Id</Col>
                                <Col lg={3}>Lead_Name</Col>
                                <Col lg={3}>Email</Col>
                                <Col lg={2}>Status</Col>
                                <Col lg={1}>Edit</Col>
                                <Col lg={1}>Delete</Col>
                    </Row>
                    <hr />
                    </div>
                    {
                        (this.state.Leads.length === 0)?
                        
                        <div>
                            <center>
                            <h3><b>Loading Data...</b></h3>
                            <Spinner animation="border" variant="primary" />
                            <Spinner animation="border" variant="secondary" />
                            <Spinner animation="border" variant="success" />
                            <Spinner animation="border" variant="danger" />
                            <Spinner animation="border" variant="warning" />
                            <Spinner animation="border" variant="info" />
                            <Spinner animation="border" variant="light" />
                            </center>
                        </div>
                        :
                        this.state.Leads.map((obj,id)=>
                            <div key = {id}>
                            <Row >
                                <Col lg={2}>{obj.Lead_Id}</Col>
                                <Col lg={3}>{obj.Lead_Name}</Col>
                                <Col lg={3}>{obj.Email}</Col>
                                <Col lg={2}>{obj.Status}</Col>
                                <Col lg={1} onClick={()=>this.handleEditLead(obj)}><FaPencilAlt /></Col>
                                <Col lg={1} onClick={()=>this.setDeleteId(obj)}><FaTrash /></Col>
                                
                            </Row>
                            <hr />
                            </div> 
                        )
                    }
                
            </Container>

        )
    }

    handleEditLead = (obj) => {
        this.setState({
            id : obj._id,
            Lead_Id : obj.Lead_Id,
            Lead_Name : obj.Lead_Name,
            Email : obj.Email,
            Status  :obj.Status,
            IS_UPDATE_LEAD : true
        })
        this.handleShow();
    }

    async updateLead(){

        try {

            let url = 'https://crm-backend-code.herokuapp.com/updateLead'

            let data = await (await fetch(url,{
            "method" : "put",
            "headers" :{
                'Content-Type': 'application/json',
                "authorization" : localStorage.getItem('authorizationToken')
            },
            "body" : JSON.stringify({
                id : this.state.id,
                Lead_Id : this.state.Lead_Id,
                Lead_Name : this.state.Lead_Name,
                Email : this.state.Email,
                Status : this.state.Status
            })
            })).json();

            alert(data.message);

            this.handleClose();
            
        } catch (error) {
            alert(error);
        }
    }

    async setDeleteId(obj){
        let temp = await this.setState({
                id : obj._id
        })
        this.deleteLead();
    }

    async deleteLead(){

            try {
                let url = 'https://crm-backend-code.herokuapp.com/deleteLead/'+this.state.id

                let data = await (await fetch(url,
                    {
                    "method" : "delete",
                    "headers" : {
                        "authorization" : localStorage.getItem('authorizationToken')
                    }
                    }
                )).json()

                alert(data.message);
                
            } catch (error) {
                alert(error);
            }
    }

    render() {
        return this.displayLeadsComponent();
    }
}