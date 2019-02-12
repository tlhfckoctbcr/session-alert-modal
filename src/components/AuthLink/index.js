import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function AuthLink({ login }) {
  return (
    <React.Fragment>
      <Typography
        variant={"subheading"}
        style={{ marginBottom: "15px" }}
      >
        Your session has expired. To login, click the button below.
      </Typography>
      <Button
        color={"default"}
        variant={"contained"}
        href={login}
      >Go to Login Page</Button>
    </React.Fragment>
  );
}

AuthLink.propTypes = {
  login: PropTypes.string.isRequired
};

export default AuthLink;
