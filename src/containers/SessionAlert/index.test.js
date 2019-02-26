import "babel-polyfill";
import 'jest-dom/extend-expect';
import React from "react";
import { render, cleanup } from "react-testing-library";
import SessionAlert from "./index";

afterEach(cleanup);

describe("SessionAlert", () => {
  let renderResult;
  let sessionAlertProps = {
    login: jest.fn(),
    logout: jest.fn(),
    extend: jest.fn(),
    mode: "form",
    title: "Session Warning",
    warningText: "Your session is about to expire.",
    getExpirationDateTime: jest.fn(),
    expirationThresholdInSeconds: 10
  };

  describe("When the session is expired and mode === 'form'", () => {
    beforeEach(() => {
      sessionAlertProps.getExpirationDateTime.mockReturnValue(Promise.resolve(new Date()));
      renderResult = render(<SessionAlert {...sessionAlertProps} />);
    });

    it("calls expirationDateTime once when the component mounts", () => {
      expect(sessionAlertProps.getExpirationDateTime).toHaveBeenCalledTimes(1);
    });
  });
});
