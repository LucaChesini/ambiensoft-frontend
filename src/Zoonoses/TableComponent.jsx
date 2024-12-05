import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 50,
    total: 0,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
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
      setData(response.data.data.data);
      setPagination({
        current_page: response.data.data.current_page,
        per_page: response.data.data.per_page,
        total: response.data.data.total,
        last_page: response.data.data.last_page,
        next_page_url: response.data.data.next_page_url,
        prev_page_url: response.data.data.prev_page_url,
      });
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

  const handleNextPage = () => {
    console.log(pagination.next_page_url);
    if (pagination.next_page_url) {
      fetchData({ ...filtros, page: pagination.current_page + 1 });
    }
  };
  
  const handlePrevPage = () => {
    if (pagination.prev_page_url) {
      fetchData({ ...filtros, page: pagination.current_page - 1 });
    }
  };

  return (
    <div>
      <form onSubmit={handleFilterSubmit} className="my-4 flex flex-row">

        <div className="basis-1/2 mr-4">
          <FormControl sx={{ width: '100%' }}>
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
        </div>

        <div className="basis-1/2 mr-4">
          <FormControl sx={{ width: '100%' }}>
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
        </div>

        <div className="basis-1/2 mr-4">
          <FormControl sx={{ width: '100%' }}>
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
        </div>
        
        <div className="basis-1/8">
          <Button type="submit" variant="contained" color="primary" sx={{ width: '100%', height: '100%' }}>
            <SearchIcon />
          </Button>
        </div>
      </form>

      <TableContainer component={Paper} sx={{maxHeight: '450px'}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Idade</TableCell>
              <TableCell>Doença</TableCell>
              <TableCell>Bairro</TableCell>
              <TableCell>Rua</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Link to={`/zoonoses/${row.doenca}/${row.id}`} >
                    {row.nome}
                  </Link>
                </TableCell>
                <TableCell>{row.idade}</TableCell>
                <TableCell>{row.doenca_descricao}</TableCell>
                <TableCell>{row.bairro.nome}</TableCell>
                <TableCell>{row.rua.nome}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="mt-3">
        <Button
          onClick={handlePrevPage}
          disabled={!pagination.prev_page_url}
          variant="contained"
          color="primary"
          className="mx-2"
        >
          <ArrowBackIosIcon />
        </Button>
        <span>
          Página {pagination.current_page} de {pagination.last_page}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={!pagination.next_page_url}
          variant="contained"
          color="primary"
          className="mx-2"
        >
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
};

export default TableComponent;