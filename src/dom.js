import { setNextUnitOfWork } from "./state";

export const createDomNode = fiber => {
  const { type, props } = fiber;
  const dom = creatNode(type);

  mapPropsToAttributes(props, dom);

  return dom;
}

export const render = (element, container) => {
  const newNextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  };

  setNextUnitOfWork(newNextUnitOfWork);
}

const creatNode = (type) => {
  return type === "TEXT_ELEMENT" 
    ? document.createTextNode("")
    : document.createElement(type);
}

const isProperty = key => key !== "children";

const mapPropsToAttributes = (props, node) => {
  Object.keys(props)
    .filter(isProperty)
    .forEach(attrName =>
      node[attrName] = props[attrName]
    );
}
