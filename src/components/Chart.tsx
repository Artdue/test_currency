import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartProps } from '../types/types';

export function Chart({ currData }: ChartProps) {
  const currencyKeys = Object.keys(currData[0][1]);

  const minValue = Math.min(
    ...currData.map((entry) => Math.min(...Object.values(entry[1])))
  );
  const maxValue = Math.max(
    ...currData.map((entry) => Math.max(...Object.values(entry[1])))
  );

  const dates = currData.map((item) => item[0]);

  return (
    <LineChart width={800} height={400} data={currData}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis
        dataKey='date'
        label={{ value: 'Date', position: 'bottom' }}
        ticks={dates}
        tick={{ fontSize: 12, fill: 'gray' }}
        tickFormatter={(date) => date}
      />
      <YAxis domain={[minValue, maxValue]} />
      <Tooltip />
      <Legend />

      {currencyKeys.map((currency, index) => (
        <Line
          key={index}
          type='monotone'
          dataKey={`1.${currency}`}
          stroke='#8884d8'
          activeDot={{ r: 8 }}
          name={currency}
        />
      ))}
    </LineChart>
  );
}
