import { createDomNode, updateDom } from "./dom";
import { reconcileChildren } from "./reconciler";
import { 
  getDeletions,
  getNextUnitOfWork, 
  getWIPRoot, 
  setCurrentRoot, 
  setNextUnitOfWork, 
  setWIPRoot 
} from "./state";
import { 
  DELETION_COMMIT_TYPE, 
  PLACEMENT_COMMIT_TYPE, 
  UPDATE_COMMIT_TYPE 
} from "./constants";

function commitRoot() {
  const wipRoot = getWIPRoot();
  const deletions = getDeletions();

  deletions.forEach(commitWork);
  commitWork(wipRoot.child);

  setCurrentRoot(wipRoot);
  setWIPRoot(null);
}

function commitWork(fiber) {
  if (!fiber) return;

  const domParent = fiber.parent.dom;

  if (
    fiber.effectTag === PLACEMENT_COMMIT_TYPE &&
    fiber.dom) {
    domParent.appendChild(fiber.dom);
  } else if (
    fiber.effectTag === UPDATE_COMMIT_TYPE &&
    fiber.dom) {
    updateDom(
      fiber.dom, 
      fiber.alternate.props, 
      fiber.props);
  } else if (fiber.effectTag === DELETION_COMMIT_TYPE) {
    domParent.removeChild(fiber.dom);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

export const workLoop = (deadLine) => {
  const nextUnitOfWork = getNextUnitOfWork();
  const wipRoot = getWIPRoot();
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

const performUnitOfWork = (fiber) => {
  // add dom node
  if (!fiber.dom) {
    fiber.dom = createDomNode(fiber);
  }

  // create new fibers
  reconcileChildren(fiber, fiber.props.children);

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
