import * as React from 'react';
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

import './Table.css'
import { lightGreen } from '@mui/material/colors';
import { Add } from '@mui/icons-material';

function createData(usuario, nome, sobrenome, npessoal, centrocusto, email, cargo) {
    return {
        usuario,
        nome,
        sobrenome,
        npessoal,
        centrocusto,
        email,
        cargo
    };
}

const rows = [
    createData('rog_silva1', 'Rogério', 'Silva', 32213212133, 323123213213, 'roger.silva@gmail.com', 'Analista de sistemas'),
    createData('rog_silva2', 'Rogério', 'Silva', 32213212133, 323123213213, 'roger.silva@gmail.com', 'Analista de sistemas'),
    createData('rog_silva4', 'Rogério', 'Silva', 32213212133, 323123213213, 'roger.silva@gmail.com', 'Analista de sistemas'),
    createData('rog_silva5', 'Rogério', 'Silva', 32213212133, 323123213213, 'roger.silva@gmail.com', 'Analista de sistemas'),
    createData('rog_silva6', 'Rogério', 'Silva', 32213212133, 323123213213, 'roger.silva@gmail.com', 'Analista de sistemas'),
];

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
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: '10px 40px 0px 40px', }}
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


export default function EnhancedTable() {

    const [selected, setSelected] = React.useState([]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.usuario);
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
        <Box sx={{ width: '100%', height: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, boxShadow: '0px 0px 3px lightgray' }}>
            <Paper sx={{ width: '100%', height: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer style={{ height: '900px', overflow: 'auto' }}>
                    <Table
                        stickyHeader
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.map((row, index) => {
                                const isItemSelected = isSelected(row.usuario);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        style={{ backgroundColor: isItemSelected ? '#FAEDEE' : 'white' }}
                                        className='table-row'
                                        onClick={(event) => handleClick(event, row.usuario)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.usuario}
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
                                            {row.usuario}
                                        </TableCell>
                                        <TableCell align="left">{row.nome}</TableCell>
                                        <TableCell align="left">{row.sobrenome}</TableCell>
                                        <TableCell align="left">{row.npessoal}</TableCell>
                                        <TableCell align="left">{row.centrocusto}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="left">{row.cargo}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

