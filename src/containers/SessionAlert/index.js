import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthForm from "../../components/AuthForm";
import AuthLink from "../../components/AuthLink";
import ExtendSession from "../../components/ExtendSession";
import Modal from "../../components/Modal";
import { useInterval } from "../../hooks";

// Rename function to express its purpose more directly
// "secondsUntil"
import { compareExpirationDateTimeToNow } from "../../utils";

export default function SessionAlert(props) {
  const { login, logout, extend, mode, title, warningText, getExpirationDateTime, expirationThresholdInSeconds } = props;

  const [loading, setLoading] = useState(true);
  const [timeUntilExpired, setTimeUntilExpired] = useState(Infinity);
  const [expirationDateTime, setExpirationDateTime] = useState(Infinity);

  useInterval(() => {
    if (loading) return;
    setTimeUntilExpired(compareExpirationDateTimeToNow(expirationDateTime));
  }, 1000);

  useEffect(() => {
    fetchExpirationDateTime();
  }, []);

  useEffect(() => {
    if (!timeUntilExpired) {
      fetchExpirationDateTime()
        .then(expirationDateTime => {
          if (compareExpirationDateTimeToNow(expirationDateTime) <= 0 && mode === "callLogin") {
            reset();

            const loginResult = login();
            if (loginResult && typeof loginResult.then === "function")
             loginResult.then(() => fetchExpirationDateTime());
          }
        });
    }
  }, [timeUntilExpired]);

  const fetchExpirationDateTime = async () => {
    if (!loading) setLoading(true);
    try {
      const result = await getExpirationDateTime();
      if (result) {
        setExpirationDateTime(result);
        setTimeUntilExpired(compareExpirationDateTimeToNow(result));
      }
      return Promise.resolve(result);
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
      return <React.Fragment>YOU DID IT, WOW</React.Fragment>
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
