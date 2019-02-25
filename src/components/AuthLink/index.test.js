import React from "react";
import AuthLink from "./index";
import { create } from "react-test-renderer";

const login = "foo";
const handleButtonClick = () => null;

describe("AuthLink", () => {
  test("it matches the snapshot", () => {
    const component = create(
      <AuthLink
        login={login}
        click={handleButtonClick}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
