import userEvent from "@testing-library/user-event";
import { render as testingLibraryRender } from "@testing-library/react";
import React from "react";
import { vitest } from "vitest";

// setup function
export function render(
  jsx: React.JSX.Element,
  useFakeTimers?: "useFakeTimers",
) {
  const options =
    useFakeTimers === "useFakeTimers"
      ? {
          advanceTimers: vitest.advanceTimersByTime.bind(vitest),
        }
      : undefined;

  if (useFakeTimers) {
    // @ts-expect-error Workaround für Inkompatibilität zw. vitest mock timer und user event click:
    // https://github.com/testing-library/user-event/issues/1115
    globalThis.jest = {
      advanceTimersByTime: vitest.advanceTimersByTime.bind(vitest),
    };
  }

  return {
    user: userEvent.setup(options),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...testingLibraryRender(jsx, {
      wrapper: (props) => props.children,
    }),
  };
}
