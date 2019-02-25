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

function AuthForm({ classes, state, onChange, onSubmit, toggleShowPassword }) {
  return (
    <React.Fragment>
      <TextField
        className={classes.inputField}
        fullWidth
        name="username"
        label="Username"
        type="username"
        onChange={onChange}
        value={state.username}
      />
      <TextField
        className={classes.inputField}
        fullWidth
        name="password"
        label="Password"
        type={state.showPassword ? "text" : "password"}
        onChange={onChange}
        value={state.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={toggleShowPassword}
              >
                {state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button className={classes.loginBtn} disableRipple color={"primary"} variant={"contained"} onClick={onSubmit}>Login</Button>
    </React.Fragment>
  )
}

AuthForm.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  toggleShowPassword: PropTypes.func.isRequired
};

export default withStyles(styles)(AuthForm);
