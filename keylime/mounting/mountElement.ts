import {
  KeylimeElement,
  KeylimeFragment,
  KeylimeNode,
  KeylimeText,
  KeyType,
} from "../types/types";
import { addEventListeners } from "./eventListeners";
import { setAttributes } from "./setAttributes";

export const mountDOM = (node: KeylimeNode, parent: HTMLElement) => {
  if (!node) return;
  switch (node.type) {
    case KeyType.TEXT: {
      mountText(node, parent);
      break;
    }
    case KeyType.ELEMENT: {
      mountElement(node, parent);
      break;
    }
    case KeyType.FRAGMENT: {
      mountFragment(node, parent);
      break;
    }
    default: {
      throw new Error(`Can't mount element of unknown type`);
    }
  }
};

export const mountText = (text: KeylimeText, parent: HTMLElement) => {
  const { value } = text;

  const textHTML = document.createTextNode(value);
  text.ref = textHTML;
  parent.append(textHTML);
};

export const mountFragment = (
  fragment: KeylimeFragment,
  parent: HTMLElement
) => {
  const { children } = fragment;
  fragment.ref = parent;
  children.forEach((child) => mountDOM(child, parent));
};

export const mountElement = (element: KeylimeElement, parent: HTMLElement) => {
  const { tag, children } = element;
  const elementHTML = document.createElement(tag);

  element.ref = elementHTML;
  addProps(element.ref, element);

  children.forEach((child) => mountDOM(child, elementHTML));
  parent.append(elementHTML);
};

export const addProps = (elementHTML: HTMLElement, element: KeylimeElement) => {
  const { props } = element;
  const { on: events, ...attributes } = props;
  if (events) element.listeners = addEventListeners(events, elementHTML);
  setAttributes(elementHTML, attributes);
};
