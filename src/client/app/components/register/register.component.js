import React, { Component } from "react";
import PropTypes from 'prop-types';
import classNames from 'classNames';

import { withStyles } from '@material-ui/core';

import { Link } from 'react-router-dom';

import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import UserService from "../../services/users.service";



const styles = theme => ({
    /* Position text in the middle */
    card: {
        width: '60vh',
    },
    middle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
    },
    cardStyle: {
        display: 'block',
        transitionDuration: '0.3s',
        height: '25vw',
    },
});

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multiline: 'Controlled',
            userService: new UserService(),
        };
    }

    textFieldChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    clearForm = () => {
        this.setState({ name: '', phone: '' });
    }

    handleUpdate = () => {
        if (!this.state.phone || !this.state.name) {
            this.clearForm();
            this.props.handleSnackbar("enter name/phone number combination(--)");
            return;
        }
        this.state.userService.register(this.state.phone).then((response) => {
            if (!response || response.StatusCode === 200) {
                this.clearForm();
                this.props.handleSnackbar("could not register you for mobile alerts");
                return;
            }
            this.props.handleSnackbar("registered for mobile updates(++)");
        });
    }

    render = () => {
        const { classes } = this.props;
        return (
            <div className={classes.middle}>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                    <Card className={classes.card}>
                        <CardContent>
                            <Grid container justify="center" direction="row">
                                <Grid item xs={4}>
                                    <TextField
                                        label="Name:"
                                        multiline
                                        id="standard-name"
                                        onChange={this.textFieldChange('name')}
                                        value={this.state.name}
                                        className={classNames(classes.margin, classes.textField)}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        label="Phone:"
                                        multiline
                                        id="standard-name"
                                        value={this.state.phone}
                                        onChange={this.textFieldChange('phone')}
                                        className={classNames(classes.margin, classes.textField)}
                                    />
                                    <Button component={Link} to="/" onClick={this.handleUpdate} className={classes.button}>Register</Button>
                                </Grid>
                            </Grid>
                        </CardContent >
                    </Card >
                </Slide >
            </div >
        );
    }

}

Register.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Register);