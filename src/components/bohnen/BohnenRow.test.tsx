import React from "react";
import { describe, expect, it, vitest } from "vitest";
import BohnenRow from "@/components/bohnen/BohnenRow";
import { getMockBohne } from "@/test/mockData";
import { screen } from "@testing-library/react";
import { render } from "@/test/userEvent";

const dispatchMock = vitest.hoisted(() => vitest.fn());

// Hier mocken wir das react Modul, damit useContext unseren dispatchMock zurückgibt
// der Rest wird mit importOriginal() aus dem Originalmodul geladen
vitest.mock("react", async (importOriginal) => ({
  ...(await importOriginal()),
  useContext: () => dispatchMock,
}));

describe("BohnenRow", () => {
  it("should render an input field to change the Bohnenart", () => {
    const mockBohne = getMockBohne();
    render(
      <table>
        <tbody>
          <BohnenRow bohne={mockBohne} />
        </tbody>
      </table>,
    );
    const input = screen.getByLabelText("Bohnenart");
    expect(input).toBeVisible();
  });

  it("should dispatch an UPDATE event if the user clears the input for Bohnenart", async () => {
    const mockBohne = getMockBohne();
    const { user } = render(
      <table>
        <tbody>
          <BohnenRow bohne={mockBohne} />
        </tbody>
      </table>,
    );
    const input = screen.getByLabelText("Bohnenart");

    await user.clear(input);
    await user.type(input, "test");

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "UPDATE",
      payload: { ...mockBohne, art: "" },
    });
  });
});
