import React, { useState } from "react"
import PropTypes from "prop-types"

import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"

const styles = () => ({
  inputField: {
    margin: "10px 0"
  },
  loginBtn: {
    marginTop: "10px"
  }
});

function AuthForm({ classes, login }) {
  const [credentials, setCredentialsValue] = useState({
    username: "",
    password: "",
    showPassword: false
  });

  const handleChangeValue = e =>
    setCredentialsValue({
      ...credentials,
      [e.target.name]: e.target.value
    });

  return (
    <React.Fragment>
      <TextField
        className={classes.inputField}
        fullWidth
        name="username"
        type="username"
        label="Username"
        onChange={handleChangeValue}
      />
      <TextField
        className={classes.inputField}
        fullWidth
        name="password"
        type={credentials.showPassword ? "text" : "password"}
        label="Password"
        onChange={handleChangeValue}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={() => setCredentialsValue({ showPassword: !credentials.showPassword })}
              >
                {credentials.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button className={classes.loginBtn} disableRipple color={"primary"} variant={"contained"} onClick={() => login(credentials)}>Login</Button>
    </React.Fragment>
  )
}

AuthForm.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

export default withStyles(styles)(AuthForm);
