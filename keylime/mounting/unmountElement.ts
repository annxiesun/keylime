import {
  KeylimeElement,
  KeylimeNode,
  KeylimeText,
  KeyType,
} from "../types/types";
import { removeEventListeners } from "./eventListeners";

export const unmountDOM = (node: KeylimeNode) => {
  if (!node) return;

  switch (node.type) {
    case KeyType.TEXT: {
      unmountText(node);
      break;
    }
    case KeyType.ELEMENT: {
      unmountElement(node);
      break;
    }
    case KeyType.FRAGMENT: {
      unmountFragment(node);
      break;
    }
    default: {
      throw new Error(`Unknown element`);
    }
  }
};

const unmountText = (text: KeylimeText) => {
  const { ref } = text;
  ref.remove();
};

const unmountElement = (element: KeylimeElement) => {
  const { ref, children, listeners } = element;
  ref.remove();
  children.forEach(unmountDOM);

  if (listeners) {
    removeEventListeners(listeners, element);
    delete element.listeners;
  }
};

function unmountFragment(vdom) {
  const { children } = vdom;
  children.forEach(unmountElement);
}
