import { useNavigate } from 'react-router-dom';
import { Switch } from './Switch';

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <Switch />
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/graph')}>Graphs</button>
      <button onClick={() => navigate('/wallet')}>Buy currency</button>
    </div>
  );
}
