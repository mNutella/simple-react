import { UPDATE_COMMIT_TYPE } from "./constants";

export const createFiber = (
  type, 
  props, 
  parent, 
  dom, 
  alternate, 
  effectTag = UPDATE_COMMIT_TYPE
  ) => ({
    type,
    props,
    parent,
    dom,
    alternate, 
    effectTag
});
