import { Cluster } from "cluster";
import { Dispatch, SetStateAction } from "react";

export interface froms {
  name: string;
  file: FileList | null;
}

export interface modalSend {
  open: boolean | undefined;
  setOpen: (open: boolean) => void;
  sendBlasFilter: () => void;
  setTabs: Dispatch<SetStateAction<tabs[] | undefined>>;
  tabs: tabs[] | undefined;
}
export interface tabs {
  segmen: string;
  message: string;
  image: string;
}

export interface dataCLuster {
  data?: CLuster[];
}

export interface CLuster {
  people?: People[];
  segmen?: string;
  message?: string;
  image?: string;
}
export interface People {
  name: string;
  phone: string;
}

export interface tabsModal {
  setTabs: Dispatch<SetStateAction<tabs[] | undefined>>;
  tabs: tabs[] | undefined;
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
