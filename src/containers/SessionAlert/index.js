import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import AuthForm from "../AuthForm";
import ExtendSession from "../../components/ExtendSession";
import Modal from "../../components/Modal";
import { useInterval } from "../../hooks";

export default function SessionAlert(props) {
  const { login, logout, extend, mode, title, warningText, getExpirationDateTime, expirationThresholdInSeconds } = props;
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(Infinity);
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      fetchExpirationDateTime();
    }
  };

  const fetchExpirationDateTime = () => {
    setLoading(true);

    getExpirationDateTime()
      .then(expirationDateTime => {
        setLoading(false);
        setCount(Math.floor((new Date(expirationDateTime) - new Date())/1000))
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  };

  const getModalContent = () => {
    if (expired) {
      if (mode === "form") return <AuthForm login={login} />;
      if (mode === "link") return <div>Link goes here.</div>;
    } else {
      return <ExtendSession
        extend={extend}
        logout={logout}
        warningText={warningText}
        timeRemainingInSeconds={count}
      />;
    }
  };

  useInterval(() => {
    if (!count) return;
    countdown(count);
  }, 1000);

  useEffect(() => {
    fetchExpirationDateTime();
  }, []);

  const modalProps = {
    open,
    mode,
    title,
    error,
    loading,
    content: getModalContent()
  };

  return (
    <React.Fragment>
      {
        count !== null && <Modal {...modalProps} />
      }
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
    "callLogin"
  ]),
  title: PropTypes.string,
  warningText: PropTypes.string,
  getExpirationDateTime: PropTypes.func.isRequired,
  expirationThresholdInSeconds: PropTypes.number.isRequired
};
