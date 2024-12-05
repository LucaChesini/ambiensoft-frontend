import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataFiltro, setDataFiltro] = useState({
    zoonoses: [],
    ruas: [],
    bairros: []
  });
  const [filtros, setFiltros] = useState({
    doenca: '',
    bairro_id: '',
    rua_id: '',
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [zoonoses, bairros, ruas] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/enums/zoonoses'),
          axios.get('http://127.0.0.1:8000/api/enderecos/bairro'),
          axios.get('http://127.0.0.1:8000/api/enderecos/rua'),
        ]);
        setDataFiltro({
          zoonoses: Object.entries(zoonoses.data),
          ruas: ruas.data.data,
          bairros: bairros.data.data
        })
      } catch (err) {
        console.error('Erro ao buscar opções para os filtros:', err);
      }
    };

    fetchOptions();
  }, [])
  
  const fetchData = async (params = {}) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/zoonoses/zoonose', { params });
      setData(response.data.data);
    } catch (err) {
      setError('Erro ao buscar dados');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value,
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchData(filtros);
  };

  return (
    <div>
      <form onSubmit={handleFilterSubmit} className="filter-form my-4">
        <FormControl className="mr-2" style={{ minWidth: 200 }}>
          <InputLabel>Doença</InputLabel>
          <Select
            name="doenca"
            value={filtros.doenca}
            onChange={handleInputChange}
          >
            <MenuItem value="">Todas</MenuItem>
            {dataFiltro.zoonoses.map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="mr-2" style={{ minWidth: 200 }}>
          <InputLabel>Bairro</InputLabel>
          <Select
            name="bairro_id"
            value={filtros.bairro_id}
            onChange={handleInputChange}
          >
            <MenuItem value="">Todos</MenuItem>
            {dataFiltro.bairros.map((bairro) => (
              <MenuItem key={bairro.id} value={bairro.id}>
                {bairro.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="mr-2" style={{ minWidth: 200 }}>
          <InputLabel>Rua</InputLabel>
          <Select
            name="rua_id"
            value={filtros.rua_id}
            onChange={handleInputChange}
          >
            <MenuItem value="">Todas</MenuItem>
            {dataFiltro.ruas.map((rua) => (
              <MenuItem key={rua.id} value={rua.id}>
                {rua.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Filtrar
        </Button>
      </form>
      <TableContainer component={Paper} className="my-4">
        <Table>
          <TableHead>
            <TableRow className='bg-slate-300'>
              <TableCell>Id</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Idade</TableCell>
              <TableCell>Doença</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <Link to={`/zoonoses/${row.doenca}/${row.id}`} >
                    {row.nome}
                  </Link>
                </TableCell>
                <TableCell>{row.idade}</TableCell>
                <TableCell>{row.doenca_descricao}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;