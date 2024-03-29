import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Slide from '@material-ui/core/Slide';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

//components
import LoaderComponent from '../loader/loader.component';

const styles = theme => ({
    /* Position text in the middle */
    card:{
        width:'60vh',
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
    /* Style the <hr> element */
    hr: {
        margin: 'auto',
        width: '40%'
    }
});

class AffirmationContainerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    returnMiddleComponent = () => {
        return this.props.isLoading ? <LoaderComponent /> : <p>{this.props && this.props.user ? this.props.user.Affirmation : ""}</p>
    }

    render() {

        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <div className={classes.middle}>
                <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary">
                                aff {bull} irm
                            </Typography>
                            <Typography variant="headline" component="h2">
                                <this.returnMiddleComponent />
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button component={Link} to="/publish" size="small"><AddIcon /></Button>
                        </CardActions>
                    </Card>
                </Slide>
            </div>
        )
    }
}

AffirmationContainerComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AffirmationContainerComponent);