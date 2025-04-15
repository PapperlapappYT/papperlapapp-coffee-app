import { afterEach, describe, expect, it, vitest } from "vitest";
import { calculate } from "@/state/calculate";
import { getMockBohne } from "@/test/mockData";
import * as predictPriceModule from "@papperlapappyt/papperlapapp-coffee-prediction";

// Verschiedene Verhaltensweisen mocken
// Variante: importModule Pattern
// - Nutzt vitest.spyOn um die Methode zu mocken
// - Dafür werden alle exports der Datei mit * in ein Objekt importiert,
//   um dieses Objekt mit spyOn nutzen zu können

// Vorteil:
// - Ich bin unabhängig von vitest.restoreAllMocks
// Nachteil:
// - Etwas mehr Boilerplate als Variante beim "as Mock" Pattern
// - vitest.spyOn kann keine read-only properties mocken
// => Das ist hier im konkreten Beispiel der Fall. Als workaround wird das
//    Pattern mit vitest.mock kombiniert.
//    vitest.mock sorgt hier dafür, dass die readOnly property predictPrice
//    durch einen Mock ersetzt wird der dann nicht mehr readOnly ist.
// Ansonsten bräuchten wir bei diesem Pattern kein vitest.mock!

vitest.mock("@papperlapappyt/papperlapapp-coffee-prediction");

describe("tests mit 'as Mock' pattern", () => {
  afterEach(() => {
    vitest.restoreAllMocks();
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
