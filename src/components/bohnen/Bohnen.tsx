"use client";
import React, { useContext } from "react";
import { BohnenContext, BohnenDispatchContext } from "@/app/BohnenProvider";
import { BohnenActionTypes } from "@/state/actions";

export const Bohnen = () => {
  const { bohnen } = useContext(BohnenContext);
  const dispatch = useContext(BohnenDispatchContext);
  return (
    <div className="tableContainer">
      <table className="border-separate border-spacing-2">
        <thead className="text-1xl text-gray-700 font-bold mb-5">
          <tr>
            <th>Bohnenart</th>
            <th>Preis beim Händler in Euro</th>
            <th>Marge in Prozent</th>
            <th>Rabatt</th>
            <th>Preis im Laden in Euro ohne Rabatt</th>
            <th>AI berechneter Preis im Laden in Euro</th>
            <th>Preis im Laden</th>
          </tr>
        </thead>
        <tbody>
          {bohnen &&
            bohnen.map((bohne) => (
              <tr key={bohne.id}>
                <td>
                  <input
                    type="text"
                    data-testid="art"
                    className="border-2 border-slate-400"
                    onChange={(event) =>
                      dispatch({
                        type: BohnenActionTypes.UPDATE,
                        payload: { ...bohne, art: event.target.value },
                      })
                    }
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
            ))}
        </tbody>
      </table>
    </div>
  );
};
