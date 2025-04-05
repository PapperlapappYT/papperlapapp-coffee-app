import React from "react";
import { describe, expect, it, vitest } from "vitest";
import BohnenRow from "@/components/bohnen/BohnenRow";
import { getMockBohne } from "@/test/mockData";
import { fireEvent, screen } from "@testing-library/react";
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

  it("should dispatch an UPDATE event if the user updates the EKP fake timers", async () => {
    vitest.useFakeTimers();

    const mockBohne = getMockBohne();
    render(
      <table>
        <tbody>
          <BohnenRow bohne={mockBohne} />
        </tbody>
      </table>,
    );
    const input = screen.getByLabelText("EKP");

    fireEvent.change(input, {
      target: {
        value: "15",
      },
    });
    vitest.advanceTimersByTime(1000);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "UPDATE",
      payload: { ...mockBohne, ekp: 15 },
    });
    vitest.useRealTimers();
  });

  it("should dispatch an UPDATE event if the user updates the EKP real timers", async () => {
    const mockBohne = getMockBohne();
    render(
      <table>
        <tbody>
          <BohnenRow bohne={mockBohne} />
        </tbody>
      </table>,
    );
    const input = screen.getByLabelText("EKP");

    fireEvent.change(input, {
      target: {
        value: "15",
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "UPDATE",
      payload: { ...mockBohne, ekp: 15 },
    });
  });
});
