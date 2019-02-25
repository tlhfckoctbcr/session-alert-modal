import React from "react";
import ExtendSession from "./index";
import { create } from "react-test-renderer";

const logout = () => null;
const extend = () => null;
const handleButtonClick = () => null;
const warningText = "foo";
const timeUntilExpired = 10;

describe("ExtendSession", () => {
  test("it matches the snapshot", () => {
    const component = create(
      <ExtendSession
        extend={extend}
        logout={logout}
        warningText={warningText}
        timeUntilExpired={timeUntilExpired}
        click={handleButtonClick}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
