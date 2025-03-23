import { describe, expect, it, vitest } from "vitest";
import { calculate } from "@/state/calculate";
import { getMockBohne } from "@/test/mockData";

vitest.mock("@papperlapappyt/papperlapapp-coffee-prediction", () => ({
  predictPrice: vitest.fn(() => {
    throw new Error("500 Server Error");
  }),
}));

describe("tests mit multiple test files: predicted price throws error", () => {
  describe("calculate", () => {
    it("should not catch the error (will be handled by caller)", () => {
      const bohne = getMockBohne();
      expect(() => calculate(bohne)).toThrowError("500 Server Error");
    });
  });
});
