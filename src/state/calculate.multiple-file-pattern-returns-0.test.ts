import { describe, expect, it, vitest } from "vitest";
import { calculate } from "@/state/calculate";
import { getMockBohne } from "@/test/mockData";

const predictedPrice = vitest.hoisted(() => 0);

vitest.mock("@papperlapappyt/papperlapapp-coffee-prediction", () => ({
  predictPrice: vitest.fn().mockReturnValue(predictedPrice),
}));

describe("tests mit multiple test files: predicted price returns 0", () => {
  describe("calculate", () => {
    it("should return the predictedVKP", () => {
      const bohne = getMockBohne();
      expect(calculate(bohne).predictedVKP).toEqual(predictedPrice);
    });
  });
});
