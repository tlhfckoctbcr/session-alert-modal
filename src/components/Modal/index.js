import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = () => ({
  title: {
    borderBottom: "1px solid #CCC",
    textAlign: "center"
  },
  content: {
    padding: "25px",
    textAlign: "center"
  }
});

const Modal = ({ classes, open, title, loading, content }) => (
  <Dialog
    open={open}
    transitionDuration={1500}
    maxWidth={"xs"}
  >
    <DialogTitle className={classes.title}>
      {title}
    </DialogTitle>
    <React.Fragment>
      <DialogContent className={classes.content}>
      {content}
      </DialogContent>
    </React.Fragment>
  </Dialog>
);

Modal.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  loading: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(Modal);
