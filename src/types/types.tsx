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

export interface IData {
  [key: string]: number;
}

export interface ChartProps {
  currData: [string, IData][];
}

export type IChartData = [string, IData];
