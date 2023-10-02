import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export function Chart({ data }) {
  const currencyKeys = Object.keys(data[0][1]);

  const minValue = Math.min(
    ...data.map((entry: number) => Math.min(...Object.values(entry[1])))
  );
  const maxValue = Math.max(
    ...data.map((entry: number) => Math.max(...Object.values(entry[1])))
  );

  const dates = data.map((item: [string, unknown][]) => item[0]);

  return (
    <LineChart width={800} height={400} data={data}>
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
