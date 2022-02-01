import { commitRoot } from "./commitPhases";
import { updateFunctionComponent, updateHostComponent } from "./component";
import { getNextUnitOfWork, getWIPRoot, setNextUnitOfWork } from "./state";

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
