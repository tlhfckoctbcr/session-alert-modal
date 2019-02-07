import React from "react";
import { render } from "react-dom";
import SessionAlert from "../../src";

let now = new Date();

const sessionAlertProps = {
  login: credentials => console.log("Login: ", credentials),
  logout: () => console.log("Logout"),
  extend: () => console.log("Extend"),
  title: "Example Title",
  warningText: "Example warning text.",
  expirationDateTime: new Date(now.setSeconds(now.getSeconds() + 15)),
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
