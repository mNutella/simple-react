export const render = (element, container) => {
  const { props, type } = element;
  const dom = creatNode(type);

  mapPropsToAttributes(props, dom);

  props.children.forEach(child => render(child, dom));

  container.appendChild(dom);
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
