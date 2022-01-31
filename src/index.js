import { createElement } from "./element";
import { render } from "./dom";
import { workLoop } from "./workLoop";

requestIdleCallback(workLoop);

export const SimpleReact = {
  createElement,
  render
}
