import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//services
import AffirmationService from '../../services/affirmation.service'
import UserService from '../../services/users.service';
import moment from 'moment';

//components
import LoaderComponent from '../loader/loader.component';

//css
import './affirmation-container.component.css';

const styles = theme => ({

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
        if (this.state.isLoading === true) {
            return <LoaderComponent />
        } else {
            return <h1>{this.state.affirmation}</h1>
        }
    }

    render() {
        return (
            <div className="middle">
                <this.returnMiddleComponent />
                <hr />
            </div>
        )
    }
}

AffirmationContainerComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AffirmationContainerComponent);