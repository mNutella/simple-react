import { createElement } from "./element";
import { render } from "./dom";
import { workLoop } from "./workLoop";
import { useState } from "./hooks";

requestIdleCallback(workLoop);

export const SimpleReact = {
  createElement,
  render,
  useState
}
