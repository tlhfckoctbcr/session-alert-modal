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

const ExtendSession = ({ classes, click, extend, logout, timeUntilExpired, warningText }) => (
  <React.Fragment>
    <Typography className={classes.warningText} variant={"subheading"}>
      {warningText}
    </Typography>
    <Countdown time={timeUntilExpired}  />
    <Grid container justify={"center"} spacing={16}>
      <Grid item>
      <Button
        color={"primary"}
        variant={"contained"}
        onClick={() => click(extend)}>
        Extend Session
      </Button>
      </Grid>
      {
        !!logout &&
        <Grid item>
          <Button
            color={"default"}
            variant={"contained"}
            onClick={() => click(logout)}>
            Logout
          </Button>
        </Grid>
      }
    </Grid>
  </React.Fragment>
);

ExtendSession.propTypes = {
  click: PropTypes.func.isRequired,
  extend: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  timeUntilExpired: PropTypes.number.isRequired,
  warningText: PropTypes.string.isRequired
};

export default withStyles(styles)(ExtendSession);
