"use client";

import { createContext, Dispatch, useReducer } from "react";
import { BohnenState, initialBohnenState } from "@/state/state";
import { BohnenAction } from "@/state/actions";
import { bohnenReducer } from "@/state/reducer";

const BohnenContext = createContext<BohnenState>(initialBohnenState);

const BohnenDispatchContext = createContext<Dispatch<BohnenAction>>(() => null);

const BohnenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(bohnenReducer, initialBohnenState);

  return (
    <BohnenContext.Provider value={state}>
      <BohnenDispatchContext.Provider value={dispatch}>
        {children}
      </BohnenDispatchContext.Provider>
    </BohnenContext.Provider>
  );
};

export { BohnenContext, BohnenDispatchContext, BohnenProvider };
