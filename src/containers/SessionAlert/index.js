import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import AuthForm from "../AuthForm";
import ExtendSession from "../../components/ExtendSession";
import Modal from "../../components/Modal";

let timer;

export default function SessionAlert(props) {
  const {
    login,
    logout,
    extend,
    title,
    warningText,
    expirationDateTime,
    expirationThresholdInSeconds
  } = props;

  const [open, setOpen] = useState(false);
  const [expired, setExpired] = useState(false);
  const [timeRemainingInSeconds, setTimeRemainingInSeconds] = useState(0);

  const countdown = timeRemainingInSeconds => {
    if (timeRemainingInSeconds <= 0) setExpired(true);
    else setTimeRemainingInSeconds(timeRemainingInSeconds - 1);
  };

  useEffect(() => {
    clearTimeout(timer);

    const msToSeconds = ms => Math.floor(ms / 1000);
    const timeUntilExpired = expirationDateTime - new Date();

    if (msToSeconds(timeUntilExpired) <= expirationThresholdInSeconds)
      setOpen(true);

    timer = setTimeout(countdown(timeRemainingInSeconds), 1000);
  }, []);

  const modalProps = {
    open,
    title,
    content: expired
      ? <AuthForm login={login} />
      : <ExtendSession
        extend={extend}
        logout={logout}
        warningText={warningText}
        timeRemainingInSeconds={timeRemainingInSeconds}
      />
  };

  return (
    <Modal {...modalProps} />
  )
}

SessionAlert.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  extend: PropTypes.func.isRequired,
  title: PropTypes.string,
  warningText: PropTypes.string,
  expirationDateTime: PropTypes.object.isRequired,
  expirationThresholdInSeconds: PropTypes.number.isRequired
};
