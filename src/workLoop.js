import { createDomNode } from "./dom";
import { createFibers } from "./virtualDom";
import { getNextUnitOfWork, setNextUnitOfWork } from "./state";

export const workLoop = (deadLine) => {
  const nextUnitOfWork = getNextUnitOfWork();
  let shouldYeld = false;
  while (nextUnitOfWork && !shouldYeld) {
    setNextUnitOfWork(performUnitOfWork(nextUnitOfWork));
    shouldYeld = deadLine.timeRemaining() < 1;
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

const performUnitOfWork = (fiber) => {
  // add dom node
  if (!fiber.dom) {
    fiber.dom = createDomNode(fiber);
  }

  // create new fibers
  createFibers(fiber.props.children, fiber);

  // return next unit of work
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}
