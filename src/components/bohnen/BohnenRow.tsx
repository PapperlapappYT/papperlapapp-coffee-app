import { Bohne } from "@/state/state";
import { BohnenActionTypes } from "@/state/actions";
import React, { useContext } from "react";
import { BohnenDispatchContext } from "@/app/BohnenProvider";

type BohnenRowProps = {
  bohne: Bohne;
};

const BohnenRow = ({ bohne }: BohnenRowProps) => {
  const dispatch = useContext(BohnenDispatchContext);

  return (
    <tr key={bohne.id}>
      <td>
        <input
          type="text"
          data-testid="art"
          aria-label="Bohnenart"
          className="border-2 border-slate-400"
          onChange={(event) => {
            console.log("event.target.value", event.target.value);
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
          className="border-2 border-slate-400"
          onChange={(event) =>
            dispatch({
              type: BohnenActionTypes.UPDATE,
              payload: {
                ...bohne,
                ekp: parseFloat(event.target.value),
              },
            })
          }
          value={bohne.ekp || ""}
        />
      </td>
      <td>
        <input
          type="number"
          data-testid="marge"
          className="border-2 border-slate-400 disabled:bg-slate-200"
          disabled={true}
          onChange={(event) =>
            dispatch({
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
          className="border-2 border-slate-400"
          onChange={(event) =>
            dispatch({
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
          className="border-2 border-slate-400"
          onChange={(event) =>
            dispatch({
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
          className="border-2 border-slate-400 disabled:bg-slate-200"
          value={bohne.predictedVKP || "0.0"}
        />
      </td>
      <td>
        <input
          type="number"
          id="vkpRabatt"
          data-testid="vkpRabatt"
          disabled={true}
          className="border-2 border-slate-400 disabled:bg-slate-200"
          onChange={(event) =>
            dispatch({
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
