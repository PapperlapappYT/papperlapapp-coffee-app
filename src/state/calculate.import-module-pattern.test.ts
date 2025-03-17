import { afterEach, describe, expect, it, vitest } from "vitest";
import { calculate } from "@/state/calculate";
import { getMockBohne } from "@/test/mockData";
import * as predictPriceModule from "@papperlapappyt/papperlapapp-coffee-prediction";

// https://vitest.dev/api/vi.html#vi-spyon
vitest.mock("@papperlapappyt/papperlapapp-coffee-prediction", {spy: true});

describe("tests mit 'as Mock' pattern", () => {
  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe("calculate", () => {
    it("should return a predictedVKP of 42", () => {
      const predictedPrice = 42;

      vitest
        .spyOn(predictPriceModule, "predictPrice")
        .mockReturnValue(predictedPrice);

      const bohne = getMockBohne();
      expect(calculate(bohne).predictedVKP).toEqual(predictedPrice);
    });

    it("should return a predictedVKP of 0", () => {
      const predictedPrice = 0;

      vitest
        .spyOn(predictPriceModule, "predictPrice")
        .mockReturnValue(predictedPrice);

      const bohne = getMockBohne();
      expect(calculate(bohne).predictedVKP).toEqual(predictedPrice);
    });

    it("should not catch an error (will be handled by caller)", () => {
      vitest
        .spyOn(predictPriceModule, "predictPrice")
        .mockImplementation(() => {
          throw new Error("500 Server Error");
        });

      const bohne = getMockBohne();
      expect(() => calculate(bohne)).toThrowError("500 Server Error");
    });
  });
});
