import React from "react"
import PropTypes from "prop-types"

import { withStyles } from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"

const styles = () => ({
  title: {
    borderBottom: "1px solid #CCC",
    textAlign: "center"
  },
  content: {
    padding: "10px 20px 20px 20px"
  }
});

const Modal = ({ classes, content, open, title }) => (
  <Dialog open={open} maxWidth={"xs"}>
    <DialogTitle className={classes.title}>
      {title}
    </DialogTitle>
    <DialogContent className={classes.content}>
      {content}
    </DialogContent>
  </Dialog>
);

Modal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(Modal);
