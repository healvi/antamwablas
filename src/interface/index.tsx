import { Dispatch, SetStateAction } from "react";

export interface froms {
  name: string;
  file: FileList | null;
}
export interface tableFormat {
  nama: string;
  number: string;
  KSM: number;
  KPR: number;
  CC: number;
  DEPOSITO: number;
  MTR: number;
}
export interface tableBroaFormat {
  nama: string;
  number: string;
}

export interface tableBroaFormatCheck {
  checkAll: boolean;
  nama: string;
  number: string;
}
export interface tableFormatCheck {
  checkAll: boolean;
  nama: string;
  number: string;
  KSM: number;
  KPR: number;
  CC: number;
  DEPOSITO: number;
  MTR: number;
}

export interface sortlistTable {
  KSM: boolean | undefined;
  KPR: boolean | undefined;
  CC: boolean | undefined;
  DEPOSITO: boolean | undefined;
  MTR: boolean | undefined;
}

export type OpenSomes = {
  isOpen: Boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
