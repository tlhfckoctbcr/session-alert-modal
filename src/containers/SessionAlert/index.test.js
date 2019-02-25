import "babel-polyfill";
import 'jest-dom/extend-expect';
import React from "react";
import { render, cleanup, waitForElement } from "react-testing-library";
import SessionAlert from "./index";

afterEach(cleanup);

describe("SessionAlert", () => {
  const reset = () => new Promise(resolve => setTimeout(() => resolve(true), 2000));
  const mockSessionRefreshTime = n => new Date(new Date().setSeconds(new Date().getSeconds() + n));

  const sessionAlertProps = {
    login: reset,
    logout: reset,
    extend: reset,
    mode: "form",
    title: "Session Warning",
    warningText: "Your session is about to expire.",
    getExpirationDateTime: () =>
      new Promise(resolve => setTimeout(() => resolve(mockSessionRefreshTime(15)), 2000)),
    expirationThresholdInSeconds: 10
  };

  it("fetches the expirationDateTime", async () => {
    const { queryByText } = render(<SessionAlert {...sessionAlertProps} />);
    await waitForElement(() => console.log(document));

  });
});
