let nextUnitOfWork = null;
let wipRoot = null;
let currentRoot = null;
let deletions = [];

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

export const addDeletions = (newDeletions) => {
  deletions.push(newDeletions);
}

export const getDeletions = () => {
  return deletions;
}