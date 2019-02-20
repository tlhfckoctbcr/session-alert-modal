import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthForm from "../../components/AuthForm";
import AuthLink from "../../components/AuthLink";
import ExtendSession from "../../components/ExtendSession";
import Modal from "../../components/Modal";
import { useInterval } from "../../hooks";
import { compareExpirationDateTimeToNow } from "../../utils";

export default function SessionAlert(props) {
  const { login, logout, extend, mode, title, warningText, getExpirationDateTime, expirationThresholdInSeconds } = props;

  const [loading, setLoading] = useState(false);
  const [timeUntilExpired, setTimeUntilExpired] = useState(Infinity);
  const [expirationDateTime, setExpirationDateTime] = useState(Infinity);

  useInterval(() => {
    if (loading) return;
    setTimeUntilExpired(compareExpirationDateTimeToNow(expirationDateTime));
  }, 1000);

  useEffect(() => {
    fetchExpirationDateTime()
      .then(result => setExpirationDateTime(result));
  }, []);

  useEffect(() => {
    if (!timeUntilExpired) {
      fetchExpirationDateTime()
        .then(result => {
          if (compareExpirationDateTimeToNow(new Date()) === 0 && mode === "callLogin") {
            setTimeUntilExpired(Infinity);
            setExpirationDateTime(Infinity);
            login();
          }
        });
    }
  }, [timeUntilExpired]);

  const fetchExpirationDateTime = async () => {
    setLoading(true);
    try {
      return await getExpirationDateTime();
    } catch (error) {
      console.log("Error fetching expirationDateTime: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = async (fn, opts = {}) => {
    setLoading(true);
    try {
      const result = await fn(opts);
      if (result)
        fetchExpirationDateTime()
          .then(result => setExpirationDateTime(result));
    } catch (error) {
      console.log("Error handling button click: ", error);
      throw(error);
    } finally {
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
    } else {
      return <ExtendSession
        extend={extend}
        logout={logout}
        warningText={warningText}
        timeUntilExpired={timeUntilExpired}
        click={handleButtonClick}
      />;
    }
  };

  const modalProps = {
    open: expirationThresholdInSeconds >= timeUntilExpired,
    title,
    loading,
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
