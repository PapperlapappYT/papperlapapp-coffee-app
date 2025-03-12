export type Bohne = {
  id: string;
  art: string;
  vkp: number;
  marge: number;
  ekp: number;
  rabatt: number;
  vkpRabatt: number;
  predictedVKP: number;
};

type BohnenState = {
  bohnen: Bohne[];
};

export const initialBohnen: Bohne[] = [
  {
    id: "1",
    art: "Äthiopien",
    vkp: 12.0,
    predictedVKP: 12.0,
    marge: 20.0,
    ekp: 10.0,
    rabatt: 0.0,
    vkpRabatt: 12.0,
  },
  {
    id: "2",
    art: "Burundi",
    vkp: 13.0,
    predictedVKP: 13.0,
    marge: 20.0,
    ekp: 11.0,
    rabatt: 0.0,
    vkpRabatt: 13.0,
  },
];

const initialBohnenState: BohnenState = {
  bohnen: initialBohnen,
};

export { type BohnenState, initialBohnenState };
