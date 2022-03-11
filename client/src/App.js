import {Link, Outlet} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className='border'>
      
      <nav>
        <Link to='/'>Home</Link> - {' '}
        <Link to='/about'>About</Link> - {' '}
        <Link to='/bugs'>Bugs</Link> - {' '}
        <Link to='/hospital'>Hospitals</Link>
      </nav>
      
      <Outlet/>
    
    </div>
  );
}

export default App;
