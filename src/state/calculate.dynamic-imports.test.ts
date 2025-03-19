import { getMockBohne } from "@/test/mockData";
import { describe, expect, it, vitest } from "vitest";

const predictedPrice = 42;

vitest.doMock("@papperlapappyt/papperlapapp-coffee-prediction", () => ({
  predictPrice: vitest.fn().mockReturnValue(predictedPrice),
}));
const { calculate } = await import("@/state/calculate");

describe("tests dynamic import: predicted price returns 42", () => {
  describe("calculate", () => {
    it("should return the predictedVKP", () => {
      const bohne = getMockBohne();
      expect(calculate(bohne).predictedVKP).toEqual(predictedPrice);
    });
  });
});
export {};
