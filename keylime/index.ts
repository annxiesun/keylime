import { Keylime } from "./state/hooks";
import {
  createElement,
  createFragment,
  createTextNode,
} from "./virtual-dom/createElements";

/**********************************
 ** HOOKS **
 **********************************/

/******* #1 USE-EFFECT HOOK *******
 * SUPPORTS:
 * [] empty dependency array for onMount
 * return an () => void function with empty array as its dependencies for onUnmount
 * updates when dependencies are changed */

export const useEffect = Keylime.useEffect;

/******* #2 USE-STATE HOOK *******
 * SUPPORTS:
 * initial state
 * updating state through previous state */
export const useState = Keylime.useState;

/**********************************
 ** VIRTUAL DOM FUNCTIONS **
 **********************************/
export const text = createTextNode;
export const element = createElement;
export const fragment = createFragment;

export default Keylime;
