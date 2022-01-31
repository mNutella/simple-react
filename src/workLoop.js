import { createDomNode } from "./dom";
import { createFibers } from "./virtualDom";
import { 
  getNextUnitOfWork, 
  getWIPRoot, 
  setCurrentRoot, 
  setNextUnitOfWork, 
  setWIPRoot 
} from "./state";

function commitRoot() {
  const wipRoot = getWIPRoot();

  commitWork(wipRoot.child);

  setCurrentRoot(wipRoot);
  setWIPRoot(null);
}

function commitWork(fiber) {
  if (!fiber) return;

  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

export const workLoop = (deadLine) => {
  const nextUnitOfWork = getNextUnitOfWork();
  let shouldYeld = false;
  while (nextUnitOfWork && !shouldYeld) {
    setNextUnitOfWork(performUnitOfWork(nextUnitOfWork));
    shouldYeld = deadLine.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
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
