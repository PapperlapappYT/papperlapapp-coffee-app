import {Bohne} from "@/state/state";

export enum BohnenActionTypes {
  UPDATE = "UPDATE",
  ADD = "ADD",
}

type BohnenAddAction = {
  type: BohnenActionTypes.ADD;
  payload: Partial<Bohne>;
};

type BohnenUpdateAction = {
  type: BohnenActionTypes.UPDATE;
  payload: Partial<Bohne>;
};

type BohnenAction = BohnenUpdateAction | BohnenAddAction;

export type {
  BohnenAction,
  BohnenAddAction,
  BohnenUpdateAction,
};
