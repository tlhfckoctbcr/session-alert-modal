import React from "react";
import Countdown from "./index";
import { create } from "react-test-renderer";

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
