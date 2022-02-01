import { createDomNode } from "./dom";
import { reconcileChildren } from "./reconciler";
import { resetWIPFiberHooks, setHookIndex, setWIPFiber } from "./state";

export const updateFunctionComponent = (fiber) => {
  setWIPFiber(fiber);
  setHookIndex(0);
  resetWIPFiberHooks();

  const children = [fiber.type(fiber.props)];

  reconcileChildren(fiber, children);
}

export const updateHostComponent = (fiber) => {
  // add dom node
  if (!fiber.dom) {
    fiber.dom = createDomNode(fiber);
  }

  // create new fibers
  reconcileChildren(fiber, fiber.props.children);
}
