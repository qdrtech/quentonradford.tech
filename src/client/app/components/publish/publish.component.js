import React, { Component } from "react";
import { classNames } from 'classnames';
import { PropTypes } from 'prop-types';
import { withStyles } from "@material-ui/core";


const styles = theme => {

};

class Publish extends Component {

    constructor(props){
        super(props);
    }

    render = () => {
        return(
            <Grid />
        );
    }
}

Publish.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Publish);