import { KeylimeElement, KeylimeListeners } from "../types/types";

export const addEventListener = (
  event: string,
  handler: () => void,
  element: HTMLElement
) => {
  element.addEventListener(event, handler);
  return handler;
};

export const addEventListeners = (
  listeners: KeylimeListeners,
  element: HTMLElement
) => {
  const mountedListeners = {};

  Object.entries(listeners).forEach(([eventName, handler]) => {
    addEventListener(eventName, handler, element);
  });

  Object.entries(listeners).forEach(([eventName, handler]) => {
    const listener = addEventListener(eventName, handler, element);
    mountedListeners[eventName] = listener;
  });

  return mountedListeners;
};

export function removeEventListeners(
  listeners: KeylimeListeners,
  element: KeylimeElement
) {
  const { ref } = element;
  Object.entries(listeners).forEach(([eventName, handler]) => {
    ref.removeEventListener(eventName, handler);
  });
}
