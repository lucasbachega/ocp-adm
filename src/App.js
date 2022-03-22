import React, { useState, useEffect } from 'react';
import './App.css';
import Logo from '../src/assets/soufer-logo.png'
import Table from './components/Table';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NewUser from './components/NewUser';
import api from './utils/api';

function App() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState(false);

  useEffect(async () => {
    const response = await api.listUsers()
    setUsers(response)
    setLoading(false)
  }, [])

  const handleOnAddUser = (data, id) => {
    let formatData = data
    formatData.id = id
    let newUsers = users
    newUsers.push(formatData)
    setUsers(newUsers)
  }

  return (
    <div className="App">
      <header className='header'>
        <img src={Logo} className='logo' width={150} />
        <p className='title'>PAINEL DO ADMINISTRADOR - OCP</p>
        <Fab onClick={() => setNewUser(true)} size='large' variant="extended" style={{ position: 'absolute', backgroundColor: '#EE3236', color: 'white' }} className='fab' aria-label="add">
          <AddIcon style={{ marginRight: '10px' }} />
          Novo usuário
        </Fab>
      </header>
      <NewUser
        open={newUser}
        onDimiss={() => setNewUser(false)}
        onConfirm={handleOnAddUser}
      />
      <div className='content'>
        <Table
          loading={loading}
          users={users}
        />
      </div>
    </div>
  );
}

export default App;
