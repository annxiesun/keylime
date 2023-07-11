import { ExtractMutable } from "../types/generics";

export type HandlerFunction = () => void;

export interface KeylimeListeners {
  [key: string]: () => void;
}

export interface KeylimeAttributes {
  style?: Partial<CSSStyleDeclaration> /* Todo make CSS properties type */;
  className?: string;
  [key: string]: unknown;
}

export interface KeylimeProps extends KeylimeAttributes {
  on?: KeylimeListeners;
}

export enum KeyType {
  TEXT = "TEXT",
  ELEMENT = "ELEMENT",
  FRAGMENT = "FRAGMENT",
  COMPONENT = "COMPONENT",
}

export interface KeylimeElement {
  tag: string;
  props: KeylimeProps;
  children: KeylimeNode[];
  ref?: HTMLElement;
  type: KeyType.ELEMENT;
  listeners?: KeylimeListeners;
}

export interface KeylimeFragment {
  ref?: HTMLElement;
  children: KeylimeNode[];
  type: KeyType.FRAGMENT;
}

export interface KeylimeText {
  value: string;
  ref?: Text;
  type: KeyType.TEXT;
}

export type KeylimeNode =
  | KeylimeElement
  | KeylimeFragment
  | KeylimeText
  | false
  | undefined
  | null;

export type KeylimeCSSProperties = ExtractMutable<CSSStyleDeclaration>;
export type KeylimeHTMLAttributes = ExtractMutable<HTMLElement>;

export type StyleValue = string &
  ((property: string) => string) &
  ((property: string) => string) &
  ((index: number) => string) &
  ((property: string) => string) &
  ((property: string, value: string, priority?: string) => void);
