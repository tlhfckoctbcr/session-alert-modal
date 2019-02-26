import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Done from "@material-ui/icons/Done";
import AuthForm from "../AuthForm";
import AuthLink from "../../components/AuthLink";
import ExtendSession from "../../components/ExtendSession";
import Modal from "../../components/Modal";
import { useInterval } from "../../hooks";
import { secondsUntil } from "../../utils";
import CircularProgress from "@material-ui/core/CircularProgress";

const SessionAlert = props => {
  const { login, logout, expirationThresholdInSeconds, extend, fullScreen, getExpirationDateTime, mode, title, warningText } = props;

  const initialState = {
    loading: true,
    timeUntilExpired: Infinity,
    expirationDateTime: Infinity
  };

  const [loading, setLoading] = useState(initialState.loading);
  const [timeUntilExpired, setTimeUntilExpired] = useState(initialState.timeUntilExpired);
  const [expirationDateTime, setExpirationDateTime] = useState(initialState.expirationDateTime);

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

  const resetState = () => {
    setLoading(initialState.loading);
    setTimeUntilExpired(initialState.timeUntilExpired);
    setExpirationDateTime(initialState.expirationDateTime);
  };

  const callLogin = () => {
    resetState();
    const loginResult = login();
    if (loginResult && typeof loginResult.then === "function") {
      loginResult.then(() => fetchExpirationDateTime());
    }
  };

  const handleExpirationDateTimeReceived = expirationDateTime => {
    if (!expirationDateTime) {
      console.info("No expirationDateTime received.");
      return;
    }

    if (secondsUntil(expirationDateTime) <= 0 && mode === "callLogin") {
      callLogin();
    } else {
      setExpirationDateTime(expirationDateTime);
      setTimeUntilExpired(secondsUntil(expirationDateTime));
    }
  };

  const fetchExpirationDateTime = async () => {
    if (!loading) setLoading(true);
    try {
      const expirationDateTime = await getExpirationDateTime();
      handleExpirationDateTimeReceived(expirationDateTime);
    } catch (error) {
      console.error("Error fetching expirationDateTime: ", error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithCredentials = credentials =>
    executeFnAndThenRefreshExpirationDateTime(() => login(credentials));

  const executeFnAndThenRefreshExpirationDateTime = async fn => {
    setLoading(true);
    try {
      const result = await fn();
      if (result) fetchExpirationDateTime();
    } catch (error) {
      console.error("Error handling button click: ", error);
      setLoading(false);
    }
  };

  const getModalContent = () => {
    if (loading) {
      return <CircularProgress />;
    }

    if (timeUntilExpired < 1) {
      if (mode === "form" || "") return <AuthForm login={loginWithCredentials} />;
      if (mode === "link") return <AuthLink loginHref={login} />;

    } else if (timeUntilExpired <= expirationThresholdInSeconds) {
      return <ExtendSession
        extend={extend}
        logout={logout}
        warningText={warningText}
        timeUntilExpired={timeUntilExpired}
        click={executeFnAndThenRefreshExpirationDateTime}
      />;

    } else {
      return <Done style={{ transform: "scale(2.25)", color: "green" }} />;
    }
  };

  const modalProps = {
    content: getModalContent(),
    expirationThresholdInSeconds,
    fullScreen,
    loading,
    open: expirationThresholdInSeconds >= timeUntilExpired,
    title
  };

  return (
    <React.Fragment>
      <Modal {...modalProps} />
    </React.Fragment>
  )
};

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
