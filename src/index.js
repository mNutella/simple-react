import { createElement } from "./element";
import { render } from "./dom";
import { workLoop } from "./reconciler";

requestIdleCallback(workLoop);

export const SimpleReact = {
  createElement,
  render
}
