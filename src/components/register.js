import React, { Component} from 'react';
import { submitRegister } from '../actions/authActions';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class Register extends Component {

    constructor(){
        super();

        this.updateDetails = this.updateDetails.bind(this);
        this.register = this.register.bind(this);
        this.state = {
            details:{
                Name: '',
                Username: '',
                Password: '',
                Retyped_Password: ''
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    register(){
        const {dispatch} = this.props;
        dispatch(submitRegister(this.state.details));
    }

    render(){
        return (
            <Form horizontal>
                <FormGroup controlId="Name">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.Name} type="text" placeholder="Name" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="Username">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.Username} type="text" placeholder="Username" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="Password">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.Password} type="password" placeholder="Password" />
                    </Col>
                </FormGroup>
                <FormGroup controlId="Password_Retyped">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.Password_Retyped} type="password" placeholder="Password" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={this.register}>Register</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Register);