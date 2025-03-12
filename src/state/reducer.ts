import { Bohne, BohnenState } from "@/state/state";
import { BohnenAction, BohnenActionTypes } from "@/state/actions";

export const bohnenReducer = (
  bohnenState: BohnenState,
  action: BohnenAction,
): BohnenState => {
  const bohnen = bohnenState.bohnen;
  if (action.type === BohnenActionTypes.ADD) {
    bohnen.push(action.payload);
    return { ...bohnenState, bohnen };
  } else if (action.type === BohnenActionTypes.UPDATE) {
    const bohne = action.payload;
    const updatedBohnen: Bohne[] = bohnen.map((b) => {
      if (b.id === bohne.id) {
        const rabatt = bohne.rabatt || 0.0;
        const vkp = roundNumber(bohne.vkp);
        const vkpRabatt = roundNumber(vkp - vkp * (rabatt / 100));
        const ekp = roundNumber(bohne.ekp);
        const marge = roundNumber((vkpRabatt / ekp - 1) * 100);
        return {
          id: bohne.id,
          art: bohne.art,
          vkp,
          vkpRabatt,
          marge,
          ekp,
          rabatt,
        };
      } else {
        return b;
      }
    });
    return { ...bohnenState, bohnen: updatedBohnen };
  } else {
    return bohnenState;
  }
};

export const roundNumber = (number: number) =>
  Math.round((number + Number.EPSILON) * 100) / 100;
