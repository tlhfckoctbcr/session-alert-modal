import React from "react";
import { render } from "react-dom";
import SessionAlert from "../../src";

const reset = () => new Promise(resolve => setTimeout(() => resolve(true), 2000));
const mockSessionRefreshTime = n => new Date(new Date().setSeconds(new Date().getSeconds() + n));

const sessionAlertProps = {
  login: reset,
  logout: reset,
  extend: reset,
  mode: "form",
  title: "Session Warning",
  warningText: "Your session is about to expire. You may either extend your current session, or logout.",
  getExpirationDateTime: () =>
    new Promise(resolve => setTimeout(() => resolve(mockSessionRefreshTime(15)), 2000)),
  expirationThresholdInSeconds: 10
};

const Demo = () => (
  <div style={{
    width: "100%",
    textAlign: "center",
    fontFamily: "sans-serif"
  }}>
    <h1>Session Alert Demo</h1>
    <SessionAlert {...sessionAlertProps} />
  </div>
);

render(<Demo/>, document.querySelector('#demo'));
