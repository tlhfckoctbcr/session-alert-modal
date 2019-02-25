import React from "react";
import { create } from "react-test-renderer";
import SessionAlert from "./index";
import "babel-polyfill";

const render = create(<SessionAlert
  login={() => null}
  extend={() => null}
  getExpirationDateTime={() => null}
  expirationThresholdInSeconds={10}
/>);

describe("SessionAlert", () => {
  it("should not render without an expirationDateTime", () => {
    expect(render.toJSON()).toBe(null);
  });

  it("should render if the expirationDateTime is within the threshold", () => {

  });
});
