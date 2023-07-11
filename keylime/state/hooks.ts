import { mountDOM } from "../mounting/mountElement";
import { unmountDOM } from "../mounting/unmountElement";
import { KeylimeNode } from "../types/types";
import { Dispatcher } from "./dispatch";

export const Keylime = (function () {
  let nodeFn: () => KeylimeNode | null = null;
  let currentNode: KeylimeNode;

  let root: HTMLElement;

  const hooks = [];
  const onUnmount = [];

  let currentHook = 0;

  function emit(fn: () => void) {
    dispatcher.dispatch(fn);
  }

  function render() {
    if (!nodeFn) {
      return;
    }

    const node = nodeFn();

    unmountDOM(currentNode);
    if (node === null) {
      onUnmount.forEach((fn) => fn());
      subscriptions.forEach((unsubscribe) => unsubscribe());
      return;
    }
    mountDOM(node, root);
    currentNode = node;
    currentHook = 0;
  }

  const dispatcher = new Dispatcher();
  const subscriptions = [dispatcher.afterEffect(render)];

  return {
    renderRoot(rootNode: () => KeylimeNode) {
      nodeFn = rootNode;
      currentNode = rootNode();
      mountDOM(currentNode, root);
      currentHook = 0;
    },

    setRoot(el: HTMLElement) {
      root = el;
    },

    useEffect(callback: () => void, depArray: unknown[]) {
      const hasNoDeps = depArray.length === 0;
      const prevDeps = hooks[currentHook]; // type: array
      const hasChangedDeps = prevDeps
        ? !depArray.every((el, i) => el === prevDeps[i])
        : true;

      if (hasNoDeps) {
        if (hooks[currentHook] === null) {
          currentHook++;
          return;
        }
        const unmountFn = callback();
        onUnmount.push(unmountFn);

        hooks[currentHook] = null;
        currentHook++;
        return;
      }

      if (hasChangedDeps) {
        callback();
        hooks[currentHook] = depArray;
      }
      currentHook++; // done with this hook
    },

    useState<S>(
      initialValue: S
    ): [S, (newState: S | ((prev: S) => S)) => void] {
      hooks[currentHook] = hooks[currentHook] ?? initialValue;
      const setStateHookIndex = currentHook;
      const setState = (newState: S) =>
        emit(() => {
          if (typeof newState === "function") {
            hooks[setStateHookIndex] = newState(hooks[setStateHookIndex]);
          } else {
            hooks[setStateHookIndex] = newState;
          }
        });
      return [hooks[currentHook++], setState];
    },
  };
})();
