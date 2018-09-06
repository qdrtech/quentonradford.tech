import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//components
import AffirmationContainerComponent from '../affirmation-container/affirmation-container.component';

const styles = theme => ({
    container: {
        
    }
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <AffirmationContainerComponent />
            </div>
        );
    };
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home);