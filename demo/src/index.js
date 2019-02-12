import React from "react";
import { render } from "react-dom";
import SessionAlert from "../../src";

let now = new Date();

const sessionAlertProps = {
  login: credentials =>
    new Promise(resolve => setTimeout(() => resolve(true), 4000)),
  logout: () =>
    new Promise(resolve => setTimeout(() => resolve(true), 4000)),
  extend: () =>
    new Promise(resolve => setTimeout(() => resolve(true), 4000)),
  mode: "form",
  title: "Example Title",
  warningText: "Example warning text.",
  getExpirationDateTime: () =>
    new Promise(resolve => resolve(new Date(now.setSeconds(now.getSeconds() + 15)))),
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
