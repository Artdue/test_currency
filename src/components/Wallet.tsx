import { useQuery } from 'react-query';
import { useState } from 'react';
import axios from 'axios';
import { HomeProps } from '../types/types';

async function fetchRate(
  currency: string,
  targetCurrency: string,
  quantity: string
) {
  const { data } = await axios.get(
    `https://api.frankfurter.app/latest?amount=${quantity}&from=${currency}&to=${targetCurrency}`
  );
  return data;
}

export default function Wallet({ currencies }: HomeProps): React.JSX.Element {
  const [currency, setCurrency] = useState<string>('EUR');
  const [targetCurrency, settargetCurrency] = useState<string>('USD');
  const [quantity, setQuantity] = useState<string>('');

  const { data, isLoading, isError } = useQuery(
    ['currency', currency, targetCurrency, quantity],
    () => fetchRate(currency, targetCurrency, quantity),
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

  return (
    <div className='wallet_div'>
      <div className='curr_div'>
        <h2>Rates quote against the {currency}:</h2>
        <h4>Choose your currency:</h4>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {currencies.map((tag, i) => (
            <option key={i} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className='curr_div'>
        <h4>Choose target currency:</h4>
        <select
          value={targetCurrency}
          onChange={(e) => settargetCurrency(e.target.value)}
        >
          {currencies.map((tag, i) => (
            <option key={i} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className='curr_div'>
        <h4>Choose quantity:</h4>
        <input type='text' onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <div className='curr_div'>
        <h4>Your wallet:</h4>
        <span>
          {quantity}
          {currency} = {data.rates[targetCurrency]}
          {targetCurrency}
        </span>
      </div>
      {quantity ? (
        <div className='curr_div'>
          <button onClick={() => alert('Purchase confirmed')}>
            Buy currency
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
