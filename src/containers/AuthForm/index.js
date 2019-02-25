import React, { useState } from "react"
import PropTypes from "prop-types"
import AuthFormComponent from "../../components/AuthForm";

export default function AuthForm({ login }) {
  const [state, setState] = useState({
    username: "",
    password: "",
    showPassword: false
  });

  const handleChange = e =>
    setState({
      ...state,
      [e.target.name]: e.target.value
    });

  const toggleShowPassword = () =>
    setState({ ...state, showPassword: !state.showPassword });

  return (
    <AuthFormComponent
      state={state}
      onChange={handleChange}
      toggleShowPassword={toggleShowPassword}
      onSubmit={() => login(state)}
    />
  )
}

AuthForm.propTypes = {
  login: PropTypes.func.isRequired
};

