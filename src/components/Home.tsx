import { useState } from 'react';
import '../App.css';
import { useQuery } from 'react-query';
import type { HomeProps, IRate } from '../types/types';
import axios from 'axios';

async function fetchRate(currency: string, page: string, period: string) {
  const { data } = await axios.get(
    `https://api.frankfurter.app/${period}?from=${currency}&to=${page}`
  );
  return data;
}

function Home({ dataKeys, currencies }: HomeProps): React.JSX.Element {
  const [page, setPage] = useState<string>(dataKeys[0]);
  const [period] = useState<string>('latest');
  const [currency, setCurrency] = useState<string>('EUR');

  const { data, isLoading, isError, isSuccess } = useQuery(
    ['currency', currency, page, period],
    () => fetchRate(currency, page, period),
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

  const rates: IRate[] = Object.entries(data.rates);

  return (
    <div className='main_div'>
      <h2>Rates quote against the {currency}:</h2>
      <h4>Change target currency:</h4>
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        {currencies.map((tag, i) => (
          <option key={i} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <h4>Date: {data.date}</h4>
      <div className='grid-container'>
        {isSuccess &&
          rates.map((rate) => (
            <div key={rate[0]} className='grid-item'>
              <p>Currency: {rate[0]}</p>
              <p>Value: {rate[1]}</p>
            </div>
          ))}
      </div>
      <div>
        {dataKeys.map((page, i) => (
          <button key={i} onClick={() => setPage(dataKeys[i])} disabled={!page}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
