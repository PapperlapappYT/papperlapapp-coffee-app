import { describe, expect, it, vitest } from "vitest";
import React from "react";
import { getMockBohne } from "@/test/mockData";
import { render } from "@/test/userEvent";
import { Bohnen } from "@/components/bohnen/Bohnen";
import * as BohnenRowModule from "@/components/bohnen/BohnenRow";

const useContextMock = vitest.hoisted(() => vitest.fn());
// Hier mocken wir das react Modul, damit useContext unseren dispatchMock zurückgibt
// der Rest wird mit importOriginal() aus dem Originalmodul geladen
vitest.mock("react", async (importOriginal) => ({
  ...(await importOriginal()),
  useContext: useContextMock,
}));

vitest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Bohnen", () => {
  it("Should render a BohnenRow for each bohne", () => {
    // Arrange
    const bohne1 = getMockBohne({ id: "1" });
    const bohne2 = getMockBohne({ id: "2" });
    useContextMock.mockReturnValue({ bohnen: [bohne1, bohne2] });

    const bohnenRowSpy = vitest
      .spyOn(BohnenRowModule, "default")
      .mockImplementation(() => <></>);

    // Act
    render(<Bohnen />);

    // Assert
    expect(bohnenRowSpy).toHaveBeenCalledTimes(2);
    expect(bohnenRowSpy).toHaveBeenCalledWith({ bohne: bohne1 }, undefined);
    expect(bohnenRowSpy).toHaveBeenCalledWith({ bohne: bohne2 }, undefined);
  });
});
