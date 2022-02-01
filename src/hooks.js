import { 
  addWIPFiberHook, 
  getCurrentRoot, 
  getHookIndex, 
  getWIPFiber, 
  incrementHookIndex, 
  resetDeletions, 
  setNextUnitOfWork, 
  setWIPRoot 
} from "./state";

export const useState = (initial) => {
  const wipFiber = getWIPFiber();
  const oldHook = 
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[getHookIndex()];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => {
    hook.state = action(hook.state);
  });

  const setState = action => {
    hook.queue.push(action);

    const currentRoot = getCurrentRoot();
    const newWipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };

    setWIPRoot(newWipRoot);
    setNextUnitOfWork(newWipRoot);
    resetDeletions();
  }

  addWIPFiberHook(hook);
  incrementHookIndex();

  return [hook.state, setState];
}
