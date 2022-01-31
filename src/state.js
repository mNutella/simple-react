let nextUnitOfWork = null;
let wipRoot = null;
let currentRoot = null;

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

export const setCurrentRoot = (newCurrentRoot) => {
  currentRoot = newCurrentRoot;
}

export const getCurrentRoot = () => {
  return currentRoot;
}