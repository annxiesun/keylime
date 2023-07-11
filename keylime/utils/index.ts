import { createTextNode } from "../virtual-dom/createElements";

export function mapTextNodes<T>(children: T[]) {
  return children.map((child: T) =>
    typeof child === "string" ? createTextNode(child) : child
  );
}

export function filterNull<T>(children: T[]) {
  return children.filter((child: T) => child !== null && child !== undefined);
}

export function removeFromArr<T>(arr: T[], index: number) {
  return arr.splice(index, 1);
}
