export const styles = theme => ({
    body: {
        margin: 0,
        padding: 0,
        fontFamily: 'sans-serif',
        fontSize: '50px'
    },
    App: {
        background: "white", /* fallback for old browsers */
        position: 'absolute',
        /* Full-screen */
        height: "100%",
        width: "100%",
        /* Center the background image */
        backgroundPosition: 'center',
        /* Scale and zoom in the image */
        backgroundSize: 'cover',
        /* Add a white text color to all elements inside the .bgimg container */
        color: 'white',
        /* Add a font */
        /* Set the font-size to 25 pixels */
        fontSize: '25px'
    },
    snackbar: {
        backgroundColor: 'white',
        color:'black',
    },
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});
