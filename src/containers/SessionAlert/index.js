import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import AuthForm from "../../components/AuthForm";
import AuthLink from "../../components/AuthLink";
import ExtendSession from "../../components/ExtendSession";
import Modal from "../../components/Modal";
import { useInterval } from "../../hooks";
import { compareExpirationDateTimeToNow } from "../../utils";

export default function SessionAlert(props) {
  const { login, logout, extend, mode, title, warningText, getExpirationDateTime, expirationThresholdInSeconds } = props;

  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(Infinity);
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useInterval(() => {
    if (count <= 0 || loading) return;
    countdown(count);
  }, 1000);

  useEffect(() => {
    fetchExpirationDateTime();
  }, []);

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

  const fetchExpirationDateTime = () => {
    console.log("Fetching exp...");

    getExpirationDateTime()
      .then(expirationDateTime => {
        setCount(compareExpirationDateTimeToNow(expirationDateTime));
      })
      .catch(err => {
        setError(err);
      });
  };

  const getModalContent = () => {
    if (expired) {
      if (mode === "form")
        return <AuthForm
          login={login}
          click={handleButtonClick}
        />;
      else if (mode === "link")
        return <AuthLink
          login={login}
          click={handleButtonClick}
        />;
      else
        return <Typography variant={"subheading"}>
          You have been logged out.
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

  const handleButtonClick = (fn, opts = {}) => {
    setLoading(true);
    fn(opts)
      .then(result => {
        if (result) setCount(compareExpirationDateTimeToNow(result));
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

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
