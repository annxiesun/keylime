import {
  StyleValue,
  KeylimeAttributes,
  KeylimeCSSProperties,
  KeylimeHTMLAttributes,
} from "../types/types";

export function setAttributes(
  elementHTML: HTMLElement,
  attributes: KeylimeAttributes
) {
  const { className, style, ...other } = attributes;
  if (className) {
    setClass(elementHTML, className);
  }
  if (style) {
    Object.entries(style).forEach(([styleProp, value]) => {
      setStyle(
        elementHTML,
        styleProp as KeylimeCSSProperties,
        value as StyleValue
      );
    });
  }
  for (const [attribute, value] of Object.entries(other)) {
    setAttribute(
      elementHTML,
      attribute as KeylimeHTMLAttributes,
      value as string
    );
  }
}

export const setClass = (elementHTML: HTMLElement, className: string) => {
  elementHTML.className = "";
  if (typeof className === "string") {
    elementHTML.className = className;
  }
  if (Array.isArray(className)) {
    elementHTML.classList.add(...className);
  }
};

export function setStyle(
  elementHTML: HTMLElement,
  styleProp: KeylimeCSSProperties,
  value: StyleValue
) {
  elementHTML.style[styleProp] = value;
}

export function removeStyle(
  elementHTML: HTMLElement,
  styleProp: KeylimeCSSProperties
) {
  delete elementHTML.style[styleProp];
}

export function setAttribute(
  elementHTML: HTMLElement,
  attribute: KeylimeHTMLAttributes,
  value: string
) {
  if (!attribute) return;

  if (value == null) {
    removeAttribute(elementHTML, attribute);
  } else {
    elementHTML.setAttribute(attribute, value);
  }
}

export function removeAttribute(
  elementHTML: HTMLElement,
  attribute: KeylimeHTMLAttributes
) {
  if (!attribute) return;

  delete elementHTML[attribute];
  elementHTML.removeAttribute(attribute);
}
