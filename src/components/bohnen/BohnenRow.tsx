import { Bohne } from "@/state/state";
import { BohnenActionTypes, BohnenUpdateAction } from "@/state/actions";
import React, { useCallback, useContext, useRef } from "react";
import { BohnenDispatchContext } from "@/app/BohnenProvider";

type BohnenRowProps = {
  bohne: Bohne;
};

const BohnenRow = ({ bohne }: BohnenRowProps) => {
  const dispatch = useContext(BohnenDispatchContext);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debouncedDispatch = useCallback(
    (action: BohnenUpdateAction) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        console.log("da isser");
        dispatch(action);
      }, 1000);
    },
    [dispatch],
  );

  const inputClasses =
    "w-full border-1 border-slate-400 p-1 outline-1 outline-transparent focus:border-cyan-600 focus:outline-1 focus:outline-cyan-600 disabled:bg-slate-200";

  const numberInputClasses = `${inputClasses} text-right font-mono`;

  return (
    <tr key={bohne.id}>
      <td>
        <input
          type="text"
          data-testid="art"
          aria-label="Bohnenart"
          className={inputClasses}
          onChange={(event) => {
            dispatch({
              type: BohnenActionTypes.UPDATE,
              payload: { ...bohne, art: event.target.value },
            });
          }}
          value={bohne.art || ""}
        />
      </td>
      <td>
        <input
          type="number"
          data-testid="ekp"
          aria-label="EKP"
          className={numberInputClasses}
          onChange={(event) => {
            console.log("Changedichange", event.target.value);
            debouncedDispatch({
              type: BohnenActionTypes.UPDATE,
              payload: {
                ...bohne,
                ekp: parseFloat(event.target.value),
              },
            });
          }}
          value={bohne.ekp || ""}
        />
      </td>
      <td>
        <input
          type="number"
          data-testid="marge"
          className={numberInputClasses}
          disabled={true}
          onChange={(event) =>
            debouncedDispatch({
              type: BohnenActionTypes.UPDATE,
              payload: {
                ...bohne,
                marge: parseFloat(event.target.value),
              },
            })
          }
          value={bohne.marge || ""}
        />
      </td>
      <td>
        <input
          type="number"
          data-testid="rabatt"
          className={numberInputClasses}
          onChange={(event) =>
            debouncedDispatch({
              type: BohnenActionTypes.UPDATE,
              payload: {
                ...bohne,
                rabatt: parseFloat(event.target.value),
              },
            })
          }
          value={bohne.rabatt || "0.0"}
        />
      </td>
      <td>
        <input
          type="number"
          id="vkp"
          data-testid="vkp"
          className={numberInputClasses}
          onChange={(event) =>
            debouncedDispatch({
              type: BohnenActionTypes.UPDATE,
              payload: {
                ...bohne,
                vkp: parseFloat(event.target.value),
              },
            })
          }
          value={bohne.vkp || "0.0"}
        />
      </td>
      <td>
        <input
          type="number"
          disabled={true}
          id="precictedVKP"
          data-testid="precictedVKP"
          className={numberInputClasses}
          value={bohne.predictedVKP || "0.0"}
        />
      </td>
      <td>
        <input
          type="number"
          id="vkpRabatt"
          data-testid="vkpRabatt"
          disabled={true}
          className={numberInputClasses}
          onChange={(event) =>
            debouncedDispatch({
              type: BohnenActionTypes.UPDATE,
              payload: {
                ...bohne,
                vkpRabatt: parseFloat(event.target.value),
              },
            })
          }
          value={bohne.vkpRabatt || "0.0"}
        />
      </td>
    </tr>
  );
};

export default BohnenRow;
