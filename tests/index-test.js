import React from "react";
import expect from "expect";
import { render, unmountComponentAtNode } from "react-dom"

import SessionAlert from "../src";

describe('Component', () => {
  let node;

  beforeEach(() => {
    node = document.createElement("div")
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it('displays a welcome message', () => {
    render(<SessionAlert />, node, () => {
      expect(node.innerHTML).toContain('Welcome to React components')
    })
  })
})
