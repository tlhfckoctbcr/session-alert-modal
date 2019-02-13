import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import AuthForm from "../../components/AuthForm";
import AuthLink from "../../components/AuthLink";
import ExtendSession from "../../components/ExtendSession";
import Modal from "../../components/Modal";
import { useInterval } from "../../hooks";
import { compareExpirationDateTimeToNow } from "../../utils";
import {Typography} from "@material-ui/core";

export default function SessionAlert(props) {
  const { login, logout, extend, mode, title, warningText, getExpirationDateTime, expirationThresholdInSeconds } = props;


  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(Infinity);
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // Interval will begin counting when the component mounts.
  // The only times the interval will not count down is when
  // the session has expired, or when loading === true.
  useInterval(() => {
    if (count <= 0 || loading) return;
    countdown(count);
  }, 1000);


  // Initializer - when the component mounts, the first job
  // is to fetch the expirationDateTime and to countdown from
  // the value.
  useEffect(() => {
    fetchExpirationDateTime()
      .then(expirationDateTime => {
        setCount(expirationDateTime);
      });
  }, []);


  // When the countdown hits zero and the session is expired,
  // fetch the expirationDateTime to ensure that the session
  // has expired. If the mode === callLogin, call the login fn.
  useEffect(() => {
    if (expired) {
      fetchExpirationDateTime()
        .then(expirationDateTime => {
          if (expirationDateTime === 0 && mode === "callLogin") {
            setOpen(false);
            login();
          } else {
            setCount(expirationDateTime);
          }
        })
        .catch(error => {
          setError(error);
        });
    }
  }, [expired]);


  // This will only be called when the user has a count greater
  // than zero, else it will determine that the session is expired.
  const countdown = count => {
    if (count > 1) {
      if (expirationThresholdInSeconds >= count) {
        if (expired) setExpired(false);
        if (!open) setOpen(true);
      } else {
        if (open) setOpen(false);
      }
      setCount(count - 1);
    } else {
      setExpired(true);
    }
  };


  // In order for this component to work properly, it must have access
  // to a function that will return the expirationDateTime value.
  const fetchExpirationDateTime = async () => {
    try {
      const value = await getExpirationDateTime();
      return compareExpirationDateTimeToNow(value);
    } catch (error) {
      setError(error);
    }
  };


  // Modal content will change based on the selected mode, and if the
  // session has expired or not.
  const getModalContent = () => {
    if (expired) {
      if (mode === "form" || "")
        return <AuthForm
          login={login}
          click={handleButtonClick}
        />;
      if (mode === "link")
        return <AuthLink
          login={login}
          click={handleButtonClick}
        />;
      if (mode === "callLogin")
        return <Typography variant={"subheading"}>
          Please wait.
        </Typography>
    } else {
      return <ExtendSession
        extend={extend}
        logout={logout}
        warningText={warningText}
        timeRemainingInSeconds={count}
        click={handleButtonClick}
      />;
    }
  };


  // Handler for all clickable actions (login, logout, extend).
  // This is passed to children as a prop named "click."
  const handleButtonClick = async (fn, opts = {}) => {
    try {
      setLoading(true);
      // Function must return a promise. This promise must return
      // a expirationDateTime value in order to set the new count
      const result = await fn(opts);
      if (result) {
        const comparison = compareExpirationDateTimeToNow(result);
        setCount(comparison);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };


  const modalProps = {
    open,
    title,
    count,
    loading,
    expirationThresholdInSeconds,
    content: getModalContent(),
    error
  };


  return (
    <React.Fragment>
      <Modal {...modalProps} />
    </React.Fragment>
  )
}


SessionAlert.propTypes = {
  login: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]).isRequired,
  extend: PropTypes.func.isRequired,
  logout: PropTypes.func,
  mode: PropTypes.oneOf([
    "form",
    "link",
    "callLogin",
    ""
  ]),
  title: PropTypes.string,
  warningText: PropTypes.string,
  getExpirationDateTime: PropTypes.func.isRequired,
  expirationThresholdInSeconds: PropTypes.number.isRequired
};
