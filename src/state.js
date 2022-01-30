let nextUnitOfWork = null;
let wipRoot = null;

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