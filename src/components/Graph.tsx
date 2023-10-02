import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { GraphProps } from '../types/types';
import { Chart } from './Chart';

async function fetchRate(
  currencyInit: string,
  currency: string,
  period: string
) {
  const { data } = await axios.get(
    `https://api.frankfurter.app/${period}?from=${currencyInit}&to=${currency}`
  );
  return data;
}

function Graph({ dataKeys }: GraphProps) {
  const [currencyInit, setCurrencyInit] = useState<string>('EUR');
  const [currency, setCurrency] = useState<string>('USD');
  const [period, setPeriod] = useState<string>('2023-08-01..');

  const { data, isLoading, isError } = useQuery(
    ['currency', currencyInit, currency, period],
    () => fetchRate(currencyInit, currency, period),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return (
      <div className='loader'>
        <div className='loader__circle'></div>
        <div className='loader__circle'></div>
        <div className='loader__circle'></div>
        <div className='loader__circle'></div>
      </div>
    );
  }
  if (isError) {
    return <h3>Error</h3>;
  }
  if (!data) {
    return <h3>Нет данных</h3>;
  }

  const currData = Object.entries(data.rates);

  return (
    <div className='graph_div'>
      <div className='graph_menu'>
        <h2>Currency value in period</h2>
        <h4>Your currency:</h4>
        <select
          value={currencyInit}
          onChange={(e) => setCurrencyInit(e.target.value)}
        >
          {dataKeys.map((tag, i) => (
            <option key={i} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <h4>Target currency:</h4>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {dataKeys.map((tag, i) => (
            <option key={i} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <h4>Period:</h4>
        <input
          id='date'
          type='date'
          name='period'
          onChange={(e) => setPeriod(`${e.target.value}..`)}
        />
      </div>
      <div className='graph'>
        <Chart data={currData as [string, unknown][]} />
      </div>
    </div>
  );
}

export default Graph;
