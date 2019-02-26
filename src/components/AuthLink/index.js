import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function AuthLink({ loginHref }) {
  return (
    <React.Fragment>
      <Typography
        variant={"subheading"}
        style={{ marginBottom: "15px" }}
      >
        Your session has expired.<br />
        To login, click the button below.
      </Typography>
      <Button
        color={"default"}
        variant={"contained"}
        href={loginHref}
      >Login</Button>
    </React.Fragment>
  );
}

AuthLink.propTypes = {
  loginHref: PropTypes.string.isRequired
};

export default AuthLink;
