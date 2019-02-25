import React from "react";
import AuthForm from "./index";
import { create } from "react-test-renderer";

const login = () => null;
const handleButtonClick = () => null;

describe("AuthForm", () => {
  test("it matches the snapshot", () => {
    const component = create(
      <AuthForm
        login={login}
        click={handleButtonClick}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
