import React from 'react';
import {Button,Form,Col,Modal,Row,Container,Spinner } from 'react-bootstrap';
import './ContactsComponent.css'
import { FaPencilAlt, FaTrash,FaIdCard  } from 'react-icons/fa'


export default class ContactsComponent extends React.Component {

    constructor() {
        super();
        this.state = {

            Lead_Id : '',
            Mobile1 : '',
            Mobile2 : '',
            show : false,
            Contacts : [],
            id  : '',
            IS_UPDATE_CONTACT : false,
            isIdExist : null

        }
        this.updateContact = this.updateContact.bind(this);
    }

    componentDidMount() {

        let url = 'https://crm-backend-code.herokuapp.com/getContacts'

        fetch(url)

        .then((response)=>response.json())

        .then((data)=>{
            console.log(data);
            this.setState({
                Contacts : data
            })
        })

        .catch((err)=>alert(err))
    }

    componentDidUpdate() {

        let url = 'https://crm-backend-code.herokuapp.com/getContacts'

        fetch(url)

        .then((response)=>response.json())

        .then((data)=>{
            console.log(data);
            this.setState({
                Contacts : data
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
        else if(target.name === 'Mobile1'){
            this.setState({
                Mobile1: target.value
            })
        }
        else if(target.name === 'Mobile2'){
            this.setState({
                Mobile2: target.value
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
            Mobile1 : '',
            Mobile2 : '',
            show : false,
            IS_UPDATE_CONTACT : false,
            isIdExist : null
        })
    }

    displayContactsComponent = () => {

        return (
            <Container>
                <Button variant = 'outline-info' className = 'button-css' onClick={this.handleShow}><FaIdCard /> Add Contact</Button>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                        {
                            (this.state.IS_UPDATE_CONTACT === true) ? "Update Contact" : "Add Contact"
                        }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col lg={6}>
                                    <Form.Group controlId="formBasicLeadId">
                                        <Form.Label>Lead Id</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Existing Lead Id" name = 'Lead_Id'  value = {this.state.Lead_Id} onChange={this.changeValue}/>
                                    </Form.Group>
                                </Col>
                                {
                                    (this.state.IS_UPDATE_CONTACT === true)?
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
                                        <Form.Group controlId="formBasicMobile1">
                                            <Form.Label>Mobile 1</Form.Label>
                                            <Form.Control type="text" placeholder="Mobile Number" name = 'Mobile1'  value = {this.state.Mobile1} onChange={this.changeValue}/>
                                        </Form.Group>
                                </Col>
                                <Col lg={6}>
                                        <Form.Group controlId="formBasicMobile2">
                                            <Form.Label>Mobile 2</Form.Label>
                                            <Form.Control type="text" placeholder="Mobile Number" name = 'Mobile2'  value = {this.state.Mobile2} onChange={this.changeValue}/>
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
                                    (this.state.IS_UPDATE_CONTACT === true)?
                                    <Button variant="outline-info" onClick= {this.updateContact}>
                                    Update Contact <FaIdCard />
                                    </Button> :
                                    (this.state.isIdExist === true) ? 
                                    <Button variant="outline-info" onClick= {this.addContact}>
                                    Add Contact <FaIdCard />
                                    </Button>
                                    :
                                    <Button variant="outline-info" onClick= {this.addContact} disabled>
                                    Add Contact <FaIdCard />
                                    </Button>
                                }
                            </Modal.Footer>
                        </Modal>
                    <div style={{marginTop : "10px"}}>
                    <Row>
                                <Col lg={2}>Lead Id</Col>
                                <Col lg={2}>Mobile1</Col>
                                <Col lg={2}>Mobile2</Col>
                                <Col lg={1}>Edit</Col>
                                <Col lg={1}>Delete</Col>
                    </Row>
                    <hr />
                    </div>
                    {
                        (this.state.Contacts.length === 0)?
                        
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
                        this.state.Contacts.map((obj,id)=>
                            <div key = {id}>
                            <Row >
                                <Col lg={2}>{obj.Lead_Id}</Col>
                                <Col lg={2}>{obj.Mobile1}</Col>
                                <Col lg={2}>{obj.Mobile2}</Col>
                                <Col lg={1} onClick={()=>this.handleEditContact(obj)}><FaPencilAlt /></Col>
                                <Col lg={1} onClick={()=>this.setDeleteId(obj)}><FaTrash /></Col>
                            </Row>
                            <hr />
                            </div> 
                        )
                    }
            </Container>
        )
    }

    addContact = () => {

        let url = 'https://crm-backend-code.herokuapp.com/addContact'

        fetch(url,{
            "method" : "post",
            "headers" :{
                'Content-Type': 'application/json',
                "authorization" : localStorage.getItem('authorizationToken')
            },
            "body" : JSON.stringify({
                Lead_Id : this.state.Lead_Id,
                Mobile1 : this.state.Mobile1,
                Mobile2 : this.state.Mobile2
            })
            })

        .then((response)=>response.json())

        .then((data)=>{
                alert(data.message);
                this.handleClose();
                this.setState({
                    Lead_Id : '',
                    Mobile1 : '',
                    Mobile2 : '',
                    isIdExist : null
                })
            })

        .catch((err)=>alert(err))
    }

    handleEditContact = (obj) => {
        console.log(obj);
        this.setState({
            id : obj._id,
            Lead_Id : obj.Lead_Id,
            Mobile1 : obj.Mobile1,
            Mobile2 : obj.Mobile2,
            IS_UPDATE_CONTACT : true
        })
        this.handleShow();
    }

    async updateContact(){

        try {

            let url = 'https://crm-backend-code.herokuapp.com/updateContact'

            let data = await (await fetch(url,{
            "method" : "put",
            "headers" :{
                'Content-Type': 'application/json',
                "authorization" : localStorage.getItem('authorizationToken')
            },
            "body" : JSON.stringify({
                id : this.state.id,
                Lead_Id : this.state.Lead_Id,
                Mobile1 : this.state.Mobile1,
                Mobile2 : this.state.Mobile2
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
        this.deleteContact();
    }

    async deleteContact(){

            try {
                let url = 'https://crm-backend-code.herokuapp.com/deleteContact/'+this.state.id

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
                alert(error)
            }
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
        return this.displayContactsComponent();
    }
}