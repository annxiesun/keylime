import {
  KeylimeNode,
  KeylimeFragment,
  KeylimeText,
  KeylimeElement,
  KeylimeProps,
  KeyType,
} from "../types/types";
import { filterNull, mapTextNodes } from "../utils";

export function createElement(
  tag: string,
  props: KeylimeProps,
  children: KeylimeNode[]
): KeylimeElement {
  children.filter((child) => child !== null);
  return {
    tag,
    props,
    type: KeyType.ELEMENT,
    children: mapTextNodes(filterNull(children)),
  };
}

export function createTextNode<T>(data: T): KeylimeText {
  return { value: data.toString(), type: KeyType.TEXT };
}

export function createFragment(nodes: KeylimeNode[]): KeylimeFragment {
  return {
    children: mapTextNodes(filterNull(nodes)),
    type: KeyType.FRAGMENT,
  };
}
