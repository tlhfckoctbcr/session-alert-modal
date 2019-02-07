import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import AuthForm from "../AuthForm";
import ExtendSession from "../../components/ExtendSession";
import Modal from "../../components/Modal";
import { useInterval } from "../../hooks";

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

  let timeUntilExpired = expirationDateTime - new Date();
  timeUntilExpired = Math.floor(timeUntilExpired / 1000);

  const [open, setOpen] = useState(false);
  const [expired, setExpired] = useState(false);
  const [count, setCount] = useState(timeUntilExpired);

  useInterval(() => {
    countdown(count);
  }, 1000);

  const openModal = () => {
    if (!open && timeUntilExpired <= expirationThresholdInSeconds)
      setOpen(true);
  };

  const countdown = count => {
    openModal();
    if (count <= 0) setExpired(true);
    else setCount(count - 1);
  };

  useEffect(() => {
    openModal();
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
        timeRemainingInSeconds={count}
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
  expirationDateTime: PropTypes.instanceOf(Date),
  expirationThresholdInSeconds: PropTypes.number.isRequired
};
