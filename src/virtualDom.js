export const createFibers = (elements, rootFiber) => {
  let prevSibling = null;
  for (let i = 0; i < elements.length; i++) {
    const { type, props } = elements[i];

    const newFiber = createFiber(type, props, rootFiber);

    if (i === 0) {
      rootFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
  }
}

const createFiber = (type, props, parent) => ({
  type,
  props,
  parent,
  dom: null
});
