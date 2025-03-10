import {Bohne, BohnenState} from "@/state/state";
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
        const rabatt = parseFloat(bohne.rabatt || 0.0);
        const vkp = parseFloat(bohne.vkp).toFixed(2);
        const vkpRabatt = (vkp - vkp * (rabatt / 100)).toFixed(2);
        const ekp = parseFloat(bohne.ekp).toFixed(2);
        const marge = ((vkpRabatt / ekp - 1) * 100).toFixed(2);
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
