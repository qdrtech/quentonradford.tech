import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
    root: {
        flexGrow: 1,
        align: 'center'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    textField: {
        flexBasis: 200,
    },
    margin: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    loginContainer: {
        marginTop: "20%"
    }
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: ""
            }
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        console.log(this.props);
    }

    onLoginClick = () => {
        console.log(this.state);
    }

    handleUpdate = (event) => {
        this.state.user = { username: this.state.username, password: this.state.password }
        console.log("login event", event);
        console.log("login state", this.state);
        this.props.handleOnUpdate(this.state)
    }

    textFieldChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    render = () => {

        const { classes, handleUpdate } = this.props;

        const { username, password } = this.state;

        return (
            <div className={classes.root}>
                <Grid container direction="row" alignItems="center" justify="center">
                    <Grid className={classes.loginContainer} item xs={4}>
                        <Paper className={classes.paper}>
                            <TextField
                                label="Username:"
                                id="textfield-username"
                                onChange={this.textFieldChange('username')}
                                className={classNames(classes.margin, classes.textField)}
                            />
                            <TextField
                                label="Password:"
                                id="textfield-password"
                                type="password"
                                onChange={this.textFieldChange('password')}
                                className={classNames(classes.margin, classes.textField)}
                            />
                            <Button onClick={this.handleUpdate} className={classes.button}>
                                Login
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login);