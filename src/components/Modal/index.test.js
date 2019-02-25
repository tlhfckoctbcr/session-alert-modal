import React from "react";
import Modal from "./index";
import { create } from "react-test-renderer";

const login = () => null;
const handleButtonClick = () => null;

describe("Modal", () => {
  test("it matches the snapshot", () => {
    const component = create(
      <Modal
        content={<React.Fragment>Foo</React.Fragment>}
        loading={false}
        open={false}
        title="Foo"
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
