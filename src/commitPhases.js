import { updateDom } from "./dom";
import { 
  getDeletions,
  getWIPRoot, 
  setCurrentRoot, 
  setWIPRoot 
} from "./state";
import { 
  DELETION_COMMIT_TYPE, 
  PLACEMENT_COMMIT_TYPE, 
  UPDATE_COMMIT_TYPE 
} from "./constants";

export const commitRoot = () => {
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