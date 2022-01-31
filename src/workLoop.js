import { updateDom } from "./dom";
import { updateFunctionComponent, updateHostComponent } from "./component";
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

const commitRoot = () => {
  const wipRoot = getWIPRoot();
  const deletions = getDeletions();

  deletions.forEach(commitWork);
  commitWork(wipRoot.child);

  setCurrentRoot(wipRoot);
  setWIPRoot(null);
}

const commitWork = (fiber) => {
  if (!fiber) return;

  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;

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
    commitDeletion(fiber, domParent);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

const commitDeletion = (fiber, domParent) => {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
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
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
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
