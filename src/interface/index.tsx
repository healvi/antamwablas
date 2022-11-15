import { Dispatch, SetStateAction } from "react";

export interface froms {
  name: string;
  file: FileList | null;
}

export type OpenSomes = {
  isOpen: Boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
