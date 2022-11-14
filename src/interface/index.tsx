import { Dispatch, SetStateAction } from "react";

export interface openSome {}

export type OpenSomes = {
  isOpen: Boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
