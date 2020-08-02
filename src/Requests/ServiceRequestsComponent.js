import React from 'react';
import {Button,Form,Col,Modal,Row,Container,Spinner } from 'react-bootstrap';
import './ServiceRequestsComponent.css'
import { FaPencilAlt, FaTrash,FaServicestack  } from 'react-icons/fa'


export default class ServiceRequestsComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            Lead_Id : '',
            Request_Id : '',
            Request : '',
            Status : 'Created',
            show : false,
            IS_UPDATE_REQUEST : false,
            Requests : [],
            id : '',
            isIdExist : null
        }
        this.updateRequest = this.updateRequest.bind(this);
    }

    componentDidMount() {

        let url = 'https://crm-backend-code.herokuapp.com/getRequests'

        fetch(url)

        .then((response)=>response.json())

        .then((data)=>{
            console.log(data);
            this.setState({
                Requests : data
            })
        })

        .catch((err)=>alert(err))
    }

    componentDidUpdate() {

        let url = 'https://crm-backend-code.herokuapp.com/getRequests'

        fetch(url)

        .then((response)=>response.json())

        .then((data)=>{
            console.log(data);
            this.setState({
                Requests : data
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
        else if(target.name === 'Request_Id'){
            this.setState({
                Request_Id: target.value
            })
        }
        else if(target.name === 'Request'){
            this.setState({
                Request: target.value
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
            Request_Id : '',
            Request : '',
            Status : 'Created',
            IS_UPDATE_REQUEST : false,
            show : false,
            isIdExist : null
        })
    }

    handleEditRequest = (obj) => {
        console.log(obj);
        this.setState({
            id : obj._id,
            Lead_Id : obj.Lead_Id,
            Request_Id : obj.Request_Id,
            Request : obj.Request,
            Status : obj.Status,
            IS_UPDATE_REQUEST : true
        })
        this.handleShow();
    }

    async updateRequest() {
        
        try {

            let url = 'https://crm-backend-code.herokuapp.com/updateRequest'

            let data = await (await fetch(url,{
            "method" : "put",
            "headers" :{
                'Content-Type': 'application/json',
                "authorization" : localStorage.getItem('authorizationToken')
            },
            "body" : JSON.stringify({
                id : this.state.id,
                Lead_Id : this.state.Lead_Id,
                Request_Id : this.state.Request_Id,
                Request : this.state.Request,
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
        this.deleteRequest();
    }

    async deleteRequest(){

        try {
            let url = 'https://crm-backend-code.herokuapp.com/deleteRequest/'+this.state.id

            let data = await (await fetch(url,
                {
                "method" : "delete",
                "headers" : {
                    "authorization" : localStorage.getItem('authorizationToken')
                }
                }
            )).json()

            alert(data.message)

        } catch (error) {
            alert(error);
        }
        

    }

    addRequest = () => {

        console.log('enter');

        let url = 'https://crm-backend-code.herokuapp.com/addRequest'

        fetch(url,{
            "method" : "post",
            "headers" :{
                'Content-Type': 'application/json',
                "authorization" : localStorage.getItem('authorizationToken')
            },
            "body" : JSON.stringify({

                Lead_Id : this.state.Lead_Id,
                Request_Id : this.state.Request_Id,
                Request : this.state.Request,
                Status : this.state.Status

            })
            })

            .then((response)=>response.json())

            .then((data)=>{
                alert(data.message);
                this.handleClose();
                this.setState({
                    Lead_Id : '',
                    Request_Id : '',
                    Request : '',
                    Status : 'Created',
                    isIdExist : null
                })
            })

            .catch((err)=>alert(err))
    }

    displayServiceRequestComponent = () => {
        return (
                <Container>
                <Button variant = 'outline-info' className = 'button-css' onClick={this.handleShow}> <FaServicestack /> Add Request</Button>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            (this.state.IS_UPDATE_REQUEST === true) ? "Update Request" : "Add Request"
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
                                {
                                    (this.state.IS_UPDATE_REQUEST === true) ?
                                    '' 
                                    :
                                    <Col lg={6}>
                                    <div style={{marginTop :"30px"}}>
                                    {
                                            (this.state.isIdExist === null) ?
                                            <Button variant="outline-warning" onClick={this.verifyLeadId}>Verify</Button>:
                                            (this.state.isIdExist === true) ?<Button variant="outline-warning" disabled><b>Verified</b></Button>:
                                            <div>
                                            <Button variant="outline-warning" onClick={this.verifyLeadId}>Verify</Button>
                                            <p>Lead Id Does not exist</p>
                                            </div>
                                    }
                                    </div>
                                    </Col>
                                }
                                <Col lg={6}>
                                    <Form.Group controlId="formBasicRequestId">
                                        <Form.Label>Request Id</Form.Label>
                                        <Form.Control type="text" placeholder="Request Id" name = 'Request_Id'  value = {this.state.Request_Id} onChange={this.changeValue}/>
                                    </Form.Group>
                                </Col>
                                
                                <Col lg={6}>
                                        <Form.Group controlId="formBasicRequest">
                                            <Form.Label>Request</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Your Request" name = 'Request'  value = {this.state.Request} onChange={this.changeValue}/>
                                        </Form.Group>
                                </Col>
                                <Col lg={6}>
                                        <Form.Group controlId="formBasicStatus">
                                            <Form.Label>Status</Form.Label>
                                            <Form.Control as="select" onChange={this.changeValue} name = 'Status'>
                                            <option value='Created' selected>Created</option>
                                            <option value='Open'>Open</option>
                                            <option value='In process'>In process</option>
                                            <option value='Released'>Released</option>
                                            <option value='Cancelled'>Cancelled</option>
                                            <option value='Completed'>Completed</option>
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
                                    (this.state.IS_UPDATE_REQUEST === true)?
                                    <Button variant="outline-info" onClick= {this.updateRequest}>
                                    Update Request <FaServicestack /> </Button> 
                                    :
                                    (this.state.isIdExist === true) ? 
                                    <Button variant="outline-info" onClick= {this.addRequest}>
                                    Add Request <FaServicestack />
                                    </Button>
                                    :
                                    <Button variant="outline-info" onClick= {this.addRequest} disabled>
                                    Add Request <FaServicestack />
                                    </Button>
                                }
                            </Modal.Footer>
                        </Modal>
                    <div style={{marginTop : "10px"}}>
                    <Row>
                                <Col lg={2}>Lead Id</Col>
                                <Col lg={2}>Request_Id</Col>
                                <Col lg={4}>Request</Col>
                                <Col lg={2}>Status</Col>
                                <Col lg={1}>Edit</Col>
                                <Col lg={1}>Delete</Col>
                    </Row>
                    <hr />
                    </div>
                    {
                        (this.state.Requests.length === 0)?
                        
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
                        this.state.Requests.map((obj,id)=>
                            <div key = {id}>
                            <Row >
                                <Col lg={2}>{obj.Lead_Id}</Col>
                                <Col lg={2}>{obj.Request_Id}</Col>
                                <Col lg={4}>{obj.Request}</Col>
                                <Col lg={2}>{obj.Status}</Col>
                                <Col lg={1} onClick={()=>this.handleEditRequest(obj)}><FaPencilAlt /></Col>
                                <Col lg={1} onClick={()=>this.setDeleteId(obj)}><FaTrash /></Col>
                            </Row>
                            <hr />
                            </div> 
                        )
                    }
            </Container>
        )
    }

    verifyLeadId =  () => {

        let url = 'https://crm-backend-code.herokuapp.com/verifyLeadId/'+this.state.Lead_Id

        fetch(url)

        .then((response)=>response.json())

        .then((data)=>{
            let result = data.result
            if(result === null) {
                this.setState({
                    isIdExist : false
                })
            } else {
                this.setState({
                    isIdExist : true
                })
            }
        }) 
        .catch((err)=>console.log(err))
    }

    render() {
        return this.displayServiceRequestComponent();
    }
}