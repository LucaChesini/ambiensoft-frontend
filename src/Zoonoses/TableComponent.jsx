import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/zoonoses/zoonose');
        setData(response.data.data);
      } catch (err) {
        setError('Erro ao buscar dados');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  return (
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
              <TableCell>{row.nome}</TableCell>
              <TableCell>{row.idade}</TableCell>
              <TableCell>{row.doenca_descricao}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;