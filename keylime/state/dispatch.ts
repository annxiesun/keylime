type Handler = (...args: unknown[]) => void;
export class Dispatcher {
  #subs = new Map();
  #afterHandlers = [];

  subscribe(fn: () => void) {
    if (!this.#subs.has(fn)) {
      this.#subs.set(fn, []);
    }
    const handlers = this.#subs.get(fn);
    if (handlers.includes(fn)) {
      return () => {
        return;
      };
    }
    handlers.push(fn);
    return () => {
      const idx = handlers.indexOf(fn);
      handlers.splice(idx, 1);
    };
  }

  afterEffect(handler: Handler) {
    this.#afterHandlers.push(handler);
    return () => {
      const idx = this.#afterHandlers.indexOf(handler);
      this.#afterHandlers.splice(idx, 1);
    };
  }

  dispatch(fn: () => void) {
    fn();
    this.#afterHandlers.forEach((handler) => handler());
  }
}
