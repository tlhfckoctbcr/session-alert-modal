import React from "react";
import Countdown from "./index";
import { create } from "react-test-renderer";

const logout = () => null;
const extend = () => null;
const handleButtonClick = () => null;
const warningText = "foo";
const timeUntilExpired = 10;

describe("Countdown", () => {
  test("it matches the snapshot", () => {
    const component = create(
      <Countdown
        time={10}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
