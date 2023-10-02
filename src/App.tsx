import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import axios from 'axios';
import { useQuery } from 'react-query';
import Graph from './components/Graph';
import NavBar from './components/NavBar';
import Wallet from './components/Wallet';

async function fetchRate() {
  const { data } = await axios.get(`https://api.frankfurter.app/latest`);
  return data;
}

function App() {
  const { data, isLoading, isError } = useQuery(['start'], () => fetchRate(), {
    keepPreviousData: true,
  });

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

  const currencies = Object.keys(data.rates);
  const dataKeys = Object.keys(data.rates);
  const chosenPage = [];
  const step = 6;
  const keys = [...dataKeys];
  for (let i = 0; i < keys.length; i += step) {
    const chunk = keys.slice(i, i + step);
    chosenPage.push(chunk.join(','));
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              dataKeys={chosenPage as string[]}
              currencies={currencies as string[]}
            />
          }
        />
        <Route
          path='/graph'
          element={
            <Graph dataKeys={Object.keys(data.rates) as [string, number]} />
          }
        />
        <Route
          path='/wallet'
          element={
            <Wallet
              dataKeys={chosenPage as string[]}
              currencies={currencies as string[]}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
