import React from "react"
import PropTypes from "prop-types"

import { withStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
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

const Modal = ({ classes, content, loading, open, title }) => (
  <Dialog open={open} maxWidth={"xs"}>
    {
      !loading ? (
        <React.Fragment>
          <DialogTitle className={classes.title}>
            {title}
          </DialogTitle>
          <DialogContent className={classes.content}>
            {content}
          </DialogContent>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <DialogContent className={classes.content}>
            <CircularProgress />
          </DialogContent>
        </React.Fragment>
      )
    }

  </Dialog>
);

Modal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(Modal);
