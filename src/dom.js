
export const createDom = fiber => {
  const { type, props } = fiber;
  const dom = creatNode(type);

  mapPropsToAttributes(props, dom);

  return dom;
}

export const render = (element, container) => {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  };
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
