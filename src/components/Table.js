import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import './Table.css'


const headCells = [
    {
        id: 'usuario',
        label: 'Usuário',
        numeric: false,
    },
    {
        id: 'nome',
        label: 'Nome',
        numeric: true,
    },
    {
        id: 'sobrenome',
        label: 'Sobrenome',
        numeric: true,
    },
    {
        id: 'npessoal',
        label: 'NPessoal',
        numeric: true,
    },
    {
        id: 'centrocusto',
        label: 'Centro de custo',
        numeric: true,
    },
    {
        id: 'email',
        label: 'Email',
        numeric: true,
    },
    {
        id: 'cargo',
        label: 'Cargo',
        numeric: true,
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount } = props;
    return (
        <TableHead stickyHeader>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                        sx={{
                            '&.Mui-checked': {
                                color: '#EE3236',
                            },
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                    >
                        <TableSortLabel>
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
    return (
        <Toolbar
            style={{ padding: '10px 40px 0px 40px', }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} Selecionados
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Lista de usuários
                </Typography>
            )}
            {numSelected > 0 && (
                <>
                    <Tooltip title="Delete">
                        <IconButton >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </Toolbar>
    );
};


export default function EnhancedTable({ users, loading }) {

    const [selected, setSelected] = useState([]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = users.map((n) => n.user);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Paper sx={{ width: '100%', height: '100%' }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer style={{ height: '900px', overflow: 'auto' }}>
                    {loading ? (
                        <div style={{ height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress color="error" />
                            <p>Carregando usuários</p>
                        </div>
                    ) : (
                        <Table
                            stickyHeader
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={users.length}
                            />
                            {users.length === 0 && (
                                <TableBody style={{ width: '100%' }}>
                                    {users.map((row, index) => {
                                        const isItemSelected = isSelected(row.user);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                style={{ backgroundColor: isItemSelected ? '#FAEDEE' : 'white' }}
                                                className='table-row'
                                                onClick={(event) => handleClick(event, row.user)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.user}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                        sx={{
                                                            '&.Mui-checked': {
                                                                color: '#EE3236',
                                                            },
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                >
                                                    {row.user}
                                                </TableCell>
                                                <TableCell align="left">{row.nome}</TableCell>
                                                <TableCell align="left">{row.sobrenome}</TableCell>
                                                <TableCell align="left">{row.npessoal}</TableCell>
                                                <TableCell align="left">{row.ccusto}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">{row.cargo}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            )}
                        </Table>
                    )}
                    {users.length === 0 && !loading && <div style={{ height: '60%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <p>Nenhum usuário registrado</p>
                    </div>}
                </TableContainer>
            </Paper>
        </Box>
    );
}

