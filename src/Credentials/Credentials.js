import React from 'react';
import { Container,Form,Button,Row,Col } from "react-bootstrap";
import "./Credentials.css";
import HeaderComponent from '../Header/HeaderComponent'



export default class Credentials extends React.Component {

    constructor() {
        super()
        this.state = {
            email : '',
            firstName : '',
            lastName : '',
            password : '',
            role : 'Admin',
            IS_FORGOT_PASSWORD : false,
            isEmailExist : null,
            JWT : '',
            login_email : '',
            login_password : '',
            IS_LOGIN_SUCCESS : false,
            FIRST_NAME : ''

        }
        this.submitSignUpForm = this.submitSignUpForm.bind(this);
        this.submitSignInForm = this.submitSignInForm.bind(this);
        
    }

    changeValue = (event) => {
        let target = event.target;
        if(target.name === 'email') {
            this.setState({
                email: target.value
            })
        } 
        else if(target.name === 'firstName'){
            this.setState({
                firstName: target.value
            })
        }
        else if(target.name === 'lastName'){
            this.setState({
                lastName: target.value
            })
        }
        else if(target.name === 'role'){
            this.setState({
                role: target.value
            })
        }
        else {
            this.setState({
                password: target.value
            })
        }
    }

    login_changeValue = (event) => {
        let target = event.target;
        if(target.name === 'email') {
            this.setState({
                login_email: target.value
            })
        } else {
            this.setState({
                login_password: target.value
            })
        }
    }

    // changeTitle = () => {
    //     this.setState({
    //         IS_FORGOT_PASSWORD : !this.IS_FORGOT_PASSWORD
    //     })
    // }

    displayCredentialsComponent = () => {

        return (

                <Container>
                    <Row>

                        <Col lg = {5} className = 'signUp-css body-css'>
                            {this.displaySignUpComponent()}
                        </Col>

                        <Col lg={5} className = 'signIn-css  body-css'>
                            {(this.state.IS_FORGOT_PASSWORD === true)?this.displayForgotPasswordComponent():this.displaySignInComponent()}
                        </Col>
                    </Row>
                </Container>
            
        )
    }

    displaySignUpComponent = () => {
        return (

            <Form onSubmit = {this.submitSignUpForm}>
                        <h3><b>Sign Up</b></h3>
                        <Form.Group controlId="formBasicEmail1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" name = 'email'  value = {this.state.email} onChange={this.changeValue}/>
                            {(this.state.isEmailExist === null) ?
                                <Button variant="outline-warning" onClick={this.verifyEmail}>Verify</Button>:
                                (this.state.isEmailExist === false) ?<Button variant="outline-warning" disabled><b>Verified</b></Button>:
                                <div>
                                <Button variant="outline-warning" onClick={this.verifyEmail}>Verify</Button>
                                <p>User Already Exists,Enter Another Email</p>
                                </div>
                            }
                        </Form.Group>

                        <Form.Group controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" name = 'firstName'  value = {this.state.firstName} onChange={this.changeValue}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" name = 'lastName'  value = {this.state.lastName} onChange={this.changeValue}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"  name = 'password'  value = {this.state.password} onChange={this.changeValue}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control as="select" onChange={this.changeValue} name = 'role'>
                            <option value='Admin' defaultValue>Admin</option>
                            <option value='Manager'>Manager</option>
                            <option value='Employee'>Employee</option>
                            </Form.Control>
                        </Form.Group>
                        {(this.state.isEmailExist === false) ?<Button variant="outline-warning" type="submit">Sign Up</Button>: <Button variant="outline-warning" disabled><b>Sign Up</b></Button>}
            </Form>

        )
    }

    displaySignInComponent = () => {

        return (
            <Form onSubmit = {this.submitSignInForm}>
            <h3><b>Sign In</b></h3>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" name = 'email'  value = {this.state.login_email} onChange={this.login_changeValue}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"  name = 'password'  value = {this.state.login_password} onChange={this.login_changeValue}/>
            </Form.Group>

            <Button variant="outline-warning" type="submit">
                Sign In
            </Button>
            {/* <Button variant="link" onClick = {this.changeTitle}>{(this.state.IS_FORGOT_PASSWORD === true)?'':'Forgot Password?'}</Button> */}
            </Form>
        )
    }

    // displayForgotPasswordComponent = () => {
    //     return (
    //         <div>
    //             <Form.Group controlId="formBasicEmail">
    //                 <Form.Label>Email</Form.Label>
    //                 <Form.Control type="email" placeholder="Email" name = 'email'  value = {this.state.email} onChange={this.changeValue}/>
    //             </Form.Group>
    //             <Button variant="outline-warning" onClick = {this.verifyEmail}>Verify</Button>
    //         </div>
    //     )
    // }

    verifyEmail =  () => {

        let url = 'https://crm-backend-code.herokuapp.com/verifyEmail/'+this.state.email
        fetch(url)
        .then((response)=>response.json())
        .then((data)=>{
            let result = data.result
            if(result !== null) {
                this.setState({
                    isEmailExist : true
                })
            } else {
                this.setState({
                    isEmailExist : false
                })
            }
        }) 
        .catch((err)=>console.log(err))
    }

    submitSignUpForm = (event) => {

        event.preventDefault();

        let url = 'https://crm-backend-code.herokuapp.com/signUp'

        fetch(url,{
            "method" : "post",
            "headers" :{
                'Content-Type': 'application/json'
            },
            "body" : JSON.stringify({
                "email" : this.state.email,
                "firstName" : this.state.firstName,
                "lastName" : this.state.lastName,
                "password" : this.state.password,
                "role" : this.state.role
            })
        })

        .then((response)=>response.json())

        .then((data)=>{
            alert(data.message);
            this.setState({
                IS_LOGIN_SUCCESS : true,
                JWT : data.token,
                FIRST_NAME : this.state.firstName
            })
        })

        .then(()=>{
            window.localStorage.setItem('authorizationToken',this.state.JWT)
            this.setState({
                email : '',
                firstName : '',
                lastName : '',
                password : '',
                role : 'Admin'
            })
        })

        .catch((err)=>console.log(err))
    }

    submitSignInForm = (event) => {

        event.preventDefault()
        let url = 'https://crm-backend-code.herokuapp.com/signIn'

        fetch(url,{
            "method" : "post",
            "headers" :{
                'Content-Type': 'application/json'
            },
            "body" : JSON.stringify({
                "email" : this.state.login_email,
                "password" : this.state.login_password
            })
        })

        .then((response)=>response.json())

        .then((data)=>{
            alert(data.message);
            if(data.status=== 'Successful') {
                this.setState({
                    IS_LOGIN_SUCCESS : true,
                    JWT : data.token,
                    FIRST_NAME : data.name
                })
            }
        })

        .then(()=>{
            window.localStorage.setItem('authorizationToken',this.state.JWT)
            this.setState({
                login_email : '',
                login_password : ''
            })
        })

        .catch((err)=>console.log(err))
    }

    render() {
        
        if(this.state.IS_LOGIN_SUCCESS === true) {

            return <HeaderComponent name = {this.state.FIRST_NAME} />
            
        } else {

            return this.displayCredentialsComponent();

        }
    }
}