import { describe, expect, it, MockInstance, vitest } from "vitest";
import { calculate } from "@/state/calculate";
import { getMockBohne } from "@/test/mockData";
import { predictPrice } from "@papperlapappyt/papperlapapp-coffee-prediction";

// Verschiedene Verhaltensweisen mocken
// Variante: asMock Pattern
// - Nutzt autoMocking mit vitest.mock
// - import der nun gemockten Methode unter dem Wissen, dass wir nun eine als Spy gewrappte
//   Methode haben, deren Verhalten wir beliebig steuern können

// Vorteil:
// - Einfach zu nutzen
// Nachteil:
// - das Automocking passiert nur initial einmal beim Laden der Datei
// => ein vitest.restoreAllMocks löscht den Spy und wir können die Methode nicht mehr steuern

vitest.mock("@papperlapappyt/papperlapapp-coffee-prediction", () => ({
  predictPrice: vitest.fn(),
}));

const predictPriceMock = predictPrice as unknown as MockInstance;

describe("tests mit 'as Mock' pattern", () => {
  describe("calculate", () => {
    it("should return a predictedVKP of 42", () => {
      const predictedPrice = 42;

      predictPriceMock.mockReturnValue(predictedPrice);

      const bohne = getMockBohne();
      expect(calculate(bohne).predictedVKP).toEqual(predictedPrice);
    });

    it("should return a predictedVKP of 0", () => {
      const predictedPrice = 0;

      predictPriceMock.mockReturnValue(predictedPrice);

      const bohne = getMockBohne();
      expect(calculate(bohne).predictedVKP).toEqual(predictedPrice);
    });

    it("should not catch an error (will be handled by caller)", () => {
      predictPriceMock.mockImplementation(() => {
        throw new Error("500 Server Error");
      });

      const bohne = getMockBohne();
      expect(() => calculate(bohne)).toThrowError("500 Server Error");
    });
  });
});
