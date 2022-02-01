import { ELEMENT_TYPE_TEXT } from "./constants";

export const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => 
        typeof child === "object" 
          ? child
          : createTextElement(child)
      )
    }
  };
}

const createTextElement = (text) => {
  return {
    type: ELEMENT_TYPE_TEXT,
    props: {
      nodeValue: text,
      children: []
    }
  }
}
