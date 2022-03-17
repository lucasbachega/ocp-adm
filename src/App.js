import './App.css';
import Logo from '../src/assets/soufer-logo.png'
import Table from './components/Table';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function App() {
  return (
    <div className="App">
      <header className='header'>
        <img src={Logo} className='logo' width={150} />
        <p className='title'>PAINEL DO ADMINISTRADOR - OCP</p>
        <Fab size='large' variant="extended" style={{ position: 'absolute', backgroundColor: '#EE3236', color: 'white' }} className='fab' aria-label="add">
          <AddIcon style={{marginRight: '10px'}}/>
          Novo usuário
        </Fab>
      </header>
      <div className='content'>
        <Table />
      </div>
    </div>
  );
}

export default App;
