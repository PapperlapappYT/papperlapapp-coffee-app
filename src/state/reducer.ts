import { Bohne, BohnenState } from "@/state/state";
import { BohnenAction, BohnenActionTypes } from "@/state/actions";
import { calculate } from "@/state/calculate";

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
        return calculate(b);
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
