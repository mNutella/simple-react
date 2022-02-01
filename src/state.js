let nextUnitOfWork = null;
let wipRoot = null;
let wipFiber = { hooks: [] };
let currentRoot = null;
let deletions = [];
let hookIndex = 0;

export const setNextUnitOfWork = (newUnitOfWork) => {
  nextUnitOfWork = newUnitOfWork;
}

export const getNextUnitOfWork = () => {
  return nextUnitOfWork;
}

export const setWIPRoot = (newWIPRoot) => {
  wipRoot = newWIPRoot;
}

export const getWIPRoot = () => {
  return wipRoot;
}

export const addWIPFiberHook = (newHook) => {
  wipFiber.hooks.push(newHook);
}

export const setWIPFiber = (newWIPFiber) => {
  wipFiber = newWIPFiber;
}

export const getWIPFiber = () => {
  return wipFiber;
}

export const resetWIPFiberHooks = () => {
  wipFiber.hooks = [];
}

export const setCurrentRoot = (newCurrentRoot) => {
  currentRoot = newCurrentRoot;
}

export const getCurrentRoot = () => {
  return currentRoot;
}

export const addDeletions = (newDeletions) => {
  deletions.push(newDeletions);
}

export const getDeletions = () => {
  return deletions;
}

export const resetDeletions = () => {
  deletions = [];
}

export const incrementHookIndex = () => {
  hookIndex++;
}

export const setHookIndex = (value) => {
  hookIndex = value;
}

export const getHookIndex = () => {
  return hookIndex;
}
