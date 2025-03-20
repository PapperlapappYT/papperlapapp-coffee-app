import { Bohne } from "@/state/state";

export const getMockBohne = (overrides?: Partial<Bohne>): Bohne => ({
  id: "1",
  ekp: 10,
  marge: 10,
  predictedVKP: 30,
  rabatt: 0,
  vkp: 20,
  art: "test",
  vkpRabatt: 0,
  ...overrides,
});
