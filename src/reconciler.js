import { createDom } from "./dom";

export let nextUnitOfWork = null;

export const workLoop = (deadLine) => {
  let shouldYeld = false;
  while (nextUnitOfWork && !shouldYeld) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYeld = deadLine.timeRemaining() < 1;
  }

  requestIdleCallback(workLoop);
}

export const performUnitOfWork = (fiber) => {
  // add dom node
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  // create new fibers
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
  }

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
