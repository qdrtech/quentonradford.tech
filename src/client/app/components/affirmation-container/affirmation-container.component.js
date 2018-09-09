import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Fade from '@material-ui/core/Fade';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

//services
import AffirmationService from '../../services/affirmation.service'
import UserService from '../../services/users.service';
import moment from 'moment';

//components
import LoaderComponent from '../loader/loader.component';

const styles = theme => ({
    /* Position text in the middle */
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
    /* Style the <hr> element */
    hr: {
        margin: 'auto',
        width: '40%'
    }
});

class AffirmationContainerComponent extends Component {
    constructor(props) {
        super(props);
        this.__init__();
        this.user = null;
    }

    __init__ = () => {
        this.AffirmationService = new AffirmationService();
        this.UserService = new UserService();

        this._bootStrapComponent();
    }

    _bootStrapComponent = () => {
        this.state = {};
        this._initUser();
        this._setComponentState();
    }

    _initUser = () => {
        this.UserService.getUserByUserID().then((response) => {
            if (!response || !response.data || !response.data.Item) {
                this.UserService.createUser().then((response) => {
                    this._initUser();
                    this.user = response.data.Item;
                    this._setComponentState(this.user);
                });
            } else {
                this.user = response.data.Item;
                this._setComponentState(this.user);
            }
        });
    }

    convertEpochToLocalDate = (utcSeconds) => {
        return new Date(0).setUTCSeconds(utcSeconds);
    }

    _setComponentState = (user) => {
        if (!this.user || !this.user.LastUpdatedDate) return;

        if (moment() > moment(this.user.LastUpdatedDate).add(1, "days")) {
            this.AffirmationService.getAffirmation().then((response) => {
                if (!response || !response.data || !response.data.body || !JSON.parse(response.data.body).Affirmation) return;
                this.user.Affirmation = JSON.parse(response.data.body).Affirmation;
                this.user.LastUpdatedDate = moment().toISOString();
                this.setState({ affirmation: this.user.Affirmation, isLoading: true });
                this.UserService.updateUser({ Affirmation: this.user.Affirmation, UserID: this.user.UserID, LastUpdatedDate: this.user.LastUpdatedDate }).then(
                    (response) => {
                        this.user = response.data.Attributes;
                        this._initUser();
                        return;
                    });
            });
        }

        if (this.user && this.user.Affirmation) {
            this.setState({ affirmation: this.user.Affirmation, isLoading: false });
        }
    }
    componentDidMount = () => {
        this.setState({ affirmation: null, isLoading: true });

        this.timerID = setInterval(() => {
            this._setComponentState(this.user);
        }, 100000)
    };

    returnMiddleComponent = () => {
        return <Fade in={true}>{this.state.isLoading ? <LoaderComponent /> : <p>{this.state.affirmation}</p>}</Fade>
    }

    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        return (
            <Fade in={true}>
                <div className={classes.middle}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary">
                                Word of the Day
                            </Typography>
                            <Typography variant="headline" component="h2">
                                <this.returnMiddleComponent />
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small"><AddIcon /></Button>
                            <Button size="small"><DeleteIcon /></Button>
                        </CardActions>
                    </Card>
                </div>
            </Fade>
        )
    }
}

AffirmationContainerComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AffirmationContainerComponent);