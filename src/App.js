import './App.css';
import Logo from '../src/assets/soufer-logo.png'
import Table from './components/Table';

function App() {
  return (
    <div className="App">
      <header className='header'>
        <img src={Logo} className='logo' width={200} />
        <p className='title'>PAINEL DO ADMINISTRADOR - OCP</p>
      </header>
      <div className='content'>
          <Table />
      </div>
    </div>
  );
}

export default App;
