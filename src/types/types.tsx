export type IRate = {
  0: string;
  1: number;
};

export interface HomeProps {
  dataKeys: string[];
  currencies: string[];
}

export interface GraphProps {
  dataKeys: [string, number];
}

export interface WalletProps {
  currencies: string[];
}
