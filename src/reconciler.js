let nextUnitOfWork = null;

const workLoop = (deadLine) => {
  let shouldYeld = false;
  while (nextUnitOfWork && !shouldYeld) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYeld = deadLine.timeRemaining() < 1;
  }

  requestIdleCallback(workLoop);
}

const performUnitOfWork = (nextUnit) => {

}
