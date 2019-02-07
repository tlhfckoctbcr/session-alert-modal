import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Countdown from "../Countdown";

const styles = {
  warningText: {
    margin: "10px 0"
  }
};

const ExtendSession = ({ classes, extend, logout, timeRemainingInSeconds, warningText }) => (
  <React.Fragment>
    <Typography className={classes.warningText} variant={"subheading"}>
      {warningText}
    </Typography>
    <Countdown time={timeRemainingInSeconds}  />
    <Grid container justify={"center"} spacing={16}>
      <Grid item>
      <Button color={"primary"} variant={"contained"} onClick={extend}>Extend Session</Button>
      </Grid>
      <Grid item>
        <Button color={"default"} variant={"contained"} onClick={logout}>Logout</Button>
      </Grid>
    </Grid>
  </React.Fragment>
);

ExtendSession.propTypes = {
  extend: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  timeRemainingInSeconds: PropTypes.number.isRequired,
  warningText: PropTypes.string.isRequired
};

export default withStyles(styles)(ExtendSession);
