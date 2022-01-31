import { setWIPRoot, setNextUnitOfWork, getCurrentRoot } from "./state";

const isEvent = key => key.startsWith("on");
const isProperty = key => key !== "children";
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (next) => key => !(key in next);

const creatNode = (type) => {
  return type === "TEXT_ELEMENT" 
    ? document.createTextNode("")
    : document.createElement(type);
}

export const updateDom = (dom, prevProps, nextProps) => {
  // Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => 
      isGone(nextProps)(key) ||
      isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => (dom[name] = ""));

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => (dom[name] = nextProps[name]));

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      
      dom.addEventListener(eventType, nextProps[name]);
    });
}

export const createDomNode = fiber => {
  const { type, props } = fiber;
  const dom = creatNode(type);

  updateDom(dom, {}, props)

  return dom;
}

export const render = (element, container) => {
  const newWipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: getCurrentRoot()
  };

  setWIPRoot(newWipRoot);
  setNextUnitOfWork(newWipRoot);
}
