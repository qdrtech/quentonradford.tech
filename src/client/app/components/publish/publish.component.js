import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';

import { PropTypes } from 'prop-types';
import { withStyles } from "@material-ui/core";

//components
import Grow from '@material-ui/core/Grow';

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';

import UserService from '../../services/users.service';
import AffirmationService from '../../services/affirmation.service';




const styles = theme => ({
    middle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
    },
    card:{
        width:'60vh',
    },
    textField: {
        width: '80%',
    }
});

class Publish extends Component {

    constructor(props) {
        super(props);
        this.state = {
            publishData: '',
            AffirmationService: new AffirmationService(),
            UserService: new UserService(),
            user: this.props.user,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    componentWillMount = () => {
        if (!this.props.user) {
            this.state.UserService.getUserByUserID().then((userResponse) => {
                if (!userResponse || !userResponse.data || !userResponse.data.Item) {
                    this.state.UserService.createUser().then((response) => {
                        if (!response || !response.data || !response.data.Attributes) return;
                        this.state.user = response.data.Attributes;
                    });
                } else {
                    this.setState({ user: userResponse.data.Item });
                }
            });
        }
    }

    handleSnack = () => {
        this.state.AffirmationService.postAffirmation({ Affirmation: this.state.publishData }).then((response) => {
            if (response.status === 201) {
                this.state.UserService.updateUser({ Affirmation: this.state.publishData, UserID: this.state.user.UserID, LastUpdatedDate: this.state.user.LastUpdatedDate }).then((response) => {
                    this.state.user = response.data.Attributes;
                    this.props.handleSnackbar("take your own advice(++)");
                    this.props.handleUserUpdate(this.state.user);
                });
            }
        });
    }

    render = () => {

        const { classes } = this.props;

        const { publishData } = this.state;

        return (
            <div className={classes.middle}>
                <Grow in={true}>
                    <Grid container direction="column" justify="center">
                        <Grid item xs={12}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="headline" component="h2">
                                        <TextField
                                            id="multiline-flexible"
                                            label="publish(++)"
                                            multiline
                                            rowsMax="4"
                                            value={publishData}
                                            onChange={this.handleChange('publishData')}
                                            className={classes.textField}
                                            margin="normal"
                                        />
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button component={Link} to="/" onClick={this.handleSnack.bind(this)} size="small" color="primary">
                                        Share
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grow >
            </div>
        );
    }
}

Publish.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Publish);