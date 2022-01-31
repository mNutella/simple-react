import { DELETION_COMMIT_TYPE, PLACEMENT_COMMIT_TYPE } from "./constants";
import { addDeletions } from "./state";
import { createFiber } from "./fiber";

export const reconcileChildren = (wipFiber, elements) => {
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;
  let index = 0;
  while(index < elements.length || oldFiber) {
    const element = elements[index];
    let newFiber = null;

    const sameType = 
      oldFiber && 
      element && 
      element.type === oldFiber.type;

    if (sameType) {
      newFiber = createFiber(
        oldFiber.type, 
        element.props, 
        oldFiber.parent,
        oldFiber.dom,
        oldFiber);
    }
    if (element && !sameType) {
      newFiber = createFiber(
        element.type, 
        element.props, 
        wipFiber,
        null,
        null,
        PLACEMENT_COMMIT_TYPE);
    }
    if (oldFiber && !sameType) {
      oldFiber.effectTag = DELETION_COMMIT_TYPE;
      addDeletions(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}
