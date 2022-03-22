import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import api from '../utils/api';

export default function NewUser({ open, onDimiss, onConfirm }) {

    const [data, setData] = useState({
        user: '',
        password: '',
        nome: '',
        sobrenome: '',
        npessoal: '',
        cargo: '',
        ccusto: '',
        email: ''
    });

    const [loading, setLoading] = useState(false);

    const style = {
        '& label.Mui-focused': {
            color: '#EE3236',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#EE3236',
        },
    }

    const handleOnConfirm = async () => {
        setLoading(true)
        const response = await api.createUser(data)
        onConfirm(data, response.createdUserId)
        setLoading(false)
    }

    return (
        <Dialog open={open}>
            {loading ? (
                <div style={{ padding: '30px 150px 30px 150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="error" />
                    <p>Adicionando</p>
                </div>
            ) : (
                <>
                    <DialogTitle>Novo usuário</DialogTitle>
                    <DialogContent style={{ margin: '0px 20px 10px 20px' }}>
                        <TextField
                            value={data.user}
                            onChange={(t) => setData({ ...data, user: t.target.value })}
                            sx={style}
                            autoFocus
                            margin="normal"
                            id="user"
                            label="Nome de usuário"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <div style={{ display: 'flex' }}>
                            <TextField
                                value={data.nome}
                                onChange={(t) => setData({ ...data, nome: t.target.value })}
                                sx={style}
                                margin="normal"
                                id="name"
                                label="Nome"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <div style={{ marginRight: '10px', marginLeft: '10px' }}></div>
                            <TextField
                                value={data.sobrenome}
                                onChange={(t) => setData({ ...data, sobrenome: t.target.value })}
                                sx={style}
                                margin="normal"
                                id="sobrenome"
                                label="Sobrenome"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </div>
                        <TextField
                            value={data.npessoal}
                            onChange={(t) => setData({ ...data, npessoal: t.target.value })}
                            sx={style}
                            margin="normal"
                            id="npessoal"
                            label="N Pessoal"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            value={data.ccusto}
                            onChange={(t) => setData({ ...data, ccusto: t.target.value })}
                            sx={style}
                            margin="normal"
                            id="ccustro"
                            label="Centro de custo"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            value={data.email}
                            onChange={(t) => setData({ ...data, email: t.target.value })}
                            sx={style}
                            margin="normal"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            value={data.cargo}
                            onChange={(t) => setData({ ...data, cargo: t.target.value })}
                            sx={style}
                            margin="normal"
                            id="cargo"
                            label="Cargo"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            value={data.password}
                            onChange={(t) => setData({ ...data, password: t.target.value })}
                            sx={style}
                            margin="normal"
                            id="password"
                            label="Senha de acesso"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button style={{ color: '#EE3236' }} onClick={onDimiss}>Cancelar</Button>
                        <Button style={{ backgroundColor: '#EE3236', color: 'white' }} onClick={handleOnConfirm}>Confirmar</Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}