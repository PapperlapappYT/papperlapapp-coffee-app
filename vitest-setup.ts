import * as JestDomMatchers from "@testing-library/jest-dom/matchers";
import { expect, vitest } from "vitest";
import "@testing-library/jest-dom/vitest";

expect.extend({ ...JestDomMatchers });

const { error } = console;

console.error = vitest.fn((message, ...restArgs) => {
  error.apply(console, [message, ...restArgs]); // keep default behaviour
  throw message instanceof Error ? message : new Error(message);
});

const { warn } = console;

console.warn = (message, ...restArgs) => {
  warn.apply(console, [message, ...restArgs]); // keep default behaviour
  throw message instanceof Error ? message : new Error(message);
};
