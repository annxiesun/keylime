/* THIS IS A DEMO APP */
import {
  createElement,
  createTextNode,
} from "./keylime/virtual-dom/createElements";
import { Keylime } from "./keylime/state/hooks";

const DOM = document.getElementById("my-app");
Keylime.setRoot(DOM);

const myComponent = () => {
  const [show, setShow] = Keylime.useState(true);

  return createElement("div", { style: { backgroundColor: "red" } }, [
    show && createTextNode(2),
    createElement(
      "button",
      {
        on: {
          click: () => {
            setShow((prev) => {
              return !prev;
            });
          },
        },
      },
      [createTextNode(show)]
    ),
  ]);
};

Keylime.renderRoot(myComponent);
