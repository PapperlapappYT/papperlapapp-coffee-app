import { afterEach, describe, expect, it, vitest } from "vitest";

const calculator = {
  calculate: () => 42,
};

describe("reset and restore mocks", () => {
  afterEach(() => {
    vitest.restoreAllMocks();
  });
  it("explain mockClear (clearAllMocks)", () => {
    const calculateMock = vitest
      .spyOn(calculator, "calculate")
      .mockReturnValue(43);

    expect(calculator.calculate()).toEqual(43);
    expect(calculateMock).toHaveBeenCalledTimes(1);

    calculateMock.mockClear();

    expect(calculateMock).toHaveBeenCalledTimes(0);
    expect(calculator.calculate()).toEqual(43);
    expect(vitest.isMockFunction(calculator.calculate)).toEqual(true);
  });

  it("explain mockReset (resetAllMocks)", () => {
    const calculateMock = vitest
      .spyOn(calculator, "calculate")
      .mockReturnValue(43);

    expect(calculator.calculate()).toEqual(43);
    expect(calculateMock).toHaveBeenCalledTimes(1);

    calculateMock.mockReset();

    expect(calculateMock).toHaveBeenCalledTimes(0);
    expect(calculator.calculate()).toEqual(42);
    expect(vitest.isMockFunction(calculator.calculate)).toEqual(true);
  });

  it("explain mockRestore (restoreAllMocks)", () => {
    const calculateMock = vitest
      .spyOn(calculator, "calculate")
      .mockReturnValue(43);

    expect(calculator.calculate()).toEqual(43);
    expect(calculateMock).toHaveBeenCalledTimes(1);

    calculateMock.mockRestore();

    expect(calculateMock).toHaveBeenCalledTimes(0);
    expect(calculator.calculate()).toEqual(42);
    expect(vitest.isMockFunction(calculator.calculate)).toEqual(false);
  });

  it("does mockReset behave like a stack? Somehow! Yes!", () => {
    const preMock = vitest.spyOn(calculator, "calculate").mockReturnValue(43);
    const calculateMock = vitest
      .spyOn(calculator, "calculate")
      .mockReturnValue(45);

    expect(calculator.calculate()).toEqual(45);

    calculateMock.mockReset();

    expect(calculator.calculate()).toEqual(43);

    preMock.mockReset();

    expect(calculator.calculate()).toEqual(42);
  });
});
