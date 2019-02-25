import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Done from "@material-ui/icons/Done";
import AuthForm from "../../components/AuthForm";
import AuthLink from "../../components/AuthLink";
import ExtendSession from "../../components/ExtendSession";
import Modal from "../../components/Modal";
import { useInterval } from "../../hooks";
import { secondsUntil } from "../../utils";
import CircularProgress from "@material-ui/core/CircularProgress";

const SessionAlert = props => {
  const { login, logout, extend, mode, title, warningText, getExpirationDateTime, expirationThresholdInSeconds } = props;

  const [loading, setLoading] = useState(true);
  const [timeUntilExpired, setTimeUntilExpired] = useState(Infinity);
  const [expirationDateTime, setExpirationDateTime] = useState(Infinity);

  useInterval(() => {
    if (loading) return;
    setTimeUntilExpired(secondsUntil(expirationDateTime));
  }, 1000);

  useEffect(() => {
    fetchExpirationDateTime();
  }, []);

  useEffect(() => {
    if (!timeUntilExpired) fetchExpirationDateTime();
  }, [timeUntilExpired]);

  const callLogin = () => {
    reset();
    const loginResult = login();
    if (loginResult && typeof loginResult.then === "function") {
      loginResult.then(() => fetchExpirationDateTime());
    }
  };

  const fetchExpirationDateTime = async () => {
    if (!loading) setLoading(true);
    try {
      const expirationDateTime = await getExpirationDateTime();
      if (expirationDateTime) {
        if (secondsUntil(expirationDateTime) <= 0 && mode === "callLogin") {
          callLogin();
        } else {
          setExpirationDateTime(expirationDateTime);
          setTimeUntilExpired(secondsUntil(expirationDateTime));
        }
      }
    } catch (error) {
      console.log("Error fetching expirationDateTime: ", error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(true);
    setTimeUntilExpired(Infinity);
    setExpirationDateTime(Infinity);
  };

  const handleButtonClick = async (fn, opts = {}) => {
    setLoading(true);
    try {
      const result = await fn(opts);
      if (result) fetchExpirationDateTime();
    } catch (error) {
      console.log("Error handling button click: ", error);
      setLoading(false);
    }
  };

  const getModalContent = () => {
    if (loading) {
      return <CircularProgress />;
    }

    if (timeUntilExpired < 1) {
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
    } else if (timeUntilExpired <= expirationThresholdInSeconds) {
      return <ExtendSession
        extend={extend}
        logout={logout}
        warningText={warningText}
        timeUntilExpired={timeUntilExpired}
        click={handleButtonClick}
      />;
    } else {
      return <Done style={{ transform: "scale(2.25)", color: "green" }} />;
    }
  };

  const modalProps = {
    open: expirationThresholdInSeconds >= timeUntilExpired,
    loading,
    title,
    expirationThresholdInSeconds,
    content: getModalContent()
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

SessionAlert.defaultProps = {
  mode: "",
  title: "Session Warning",
  warningText: "Your session is about to expire."
};

export default SessionAlert;
