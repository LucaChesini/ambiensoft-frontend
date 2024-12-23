import { Button, Card, CardContent, Grid2, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Link, useParams } from 'react-router-dom';

const ShowRaiva = () => {
    const {id} = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/zoonoses/raiva/${id}`);
            console.log(response.data.data);
            setData(response.data.data);
          } catch (err) {
            setError('Erro ao buscar dados');
          } finally {
            setLoading(false);
          }
        }
    
        fetchData();
      }, [id])

    return (
        <>
        <Link to={`/zoonoses`} >
            <Button variant="contained" color="success">
                Voltar
            </Button>
        </Link>
        <div className="p-4 grid grid-cols-2 gap-4">
            <div className="col-span-2">
                <Typography variant="h4" gutterBottom>
                    Detalhes da Zoonose: Raiva
                </Typography>
            </div>

            <div>
                <Card sx={{height: '100%'}}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Informações Gerais
                        </Typography>
                        <Typography><strong>Doença:</strong> {data.doenca_descricao}</Typography>
                        <Typography><strong>Unidade de Saúde:</strong> {data.unidade_saude}</Typography>
                        <Typography><strong>Paciente:</strong> {data.nome}</Typography>
                        <Typography><strong>Data de Nascimento:</strong> {data.data_nascimento ? format(parseISO(data.data_nascimento), 'dd/MM/yyyy') : 'Data inválida'}</Typography>
                        <Typography><strong>Idade:</strong> {data.idade}</Typography>
                        <Typography><strong>Sexo:</strong> {data.sexo_descricao}</Typography>
                        <Typography><strong>Número SUS:</strong> {data.numero_sus}</Typography>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card sx={{height: '100%'}}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Endereço
                        </Typography>
                        <Typography><strong>Município:</strong> {data.municipio_residencia}</Typography>
                        <Typography><strong>Bairro:</strong> {data.bairro?.codigo} - {data.bairro?.nome}</Typography>
                        <Typography><strong>Rua:</strong> {data.rua?.codigo} - {data.rua?.nome}</Typography>
                        <Typography><strong>Número:</strong> {data.numero}</Typography>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card sx={{height: '100%'}}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Detalhes de Exposição
                        </Typography>
                        <Typography><strong>Tipo de Exposição:</strong> {data.zoonosable?.tipo_exposicao_descricao}</Typography>
                        <Typography><strong>Ferimento:</strong> {data.zoonosable?.ferimento_descricao}</Typography>
                        <Typography><strong>Localização do Ferimento:</strong> {data.zoonosable?.localizacao_ferimento_descricao}</Typography>
                        <Typography><strong>Espécie do Animal Agressor:</strong> {data.zoonosable?.especie_animal_agressor_descricao}</Typography>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card sx={{height: '100%'}}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Sintomas Relatados
                        </Typography>
                        {data.zoonosable?.raiva_sintomas.length > 0 ? (
                            <ul className="list-disc m-5">
                                {data.zoonosable.raiva_sintomas.map((sintoma) => (
                                    <li key={sintoma.id}>
                                        {sintoma.descricao}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography>Nenhum sintoma relatado.</Typography>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
        </>
    );
  };
  
  export default ShowRaiva;