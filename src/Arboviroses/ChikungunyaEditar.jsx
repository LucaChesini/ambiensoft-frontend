import axios from "axios";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, MenuItem, Button, Select, InputLabel, FormControl, FormControlLabel, Checkbox, FormHelperText } from "@mui/material";
import { DateField, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { format, parseISO } from "date-fns";
import dayjs from "dayjs";

const EditarChikungunya = () => {
    const {id} = useParams();
    const [selectedDate, setSelectedDate] = useState(null);
    const [formData, setFormData] = useState({
        doenca: "chikungunya",
        unidade_saude: "",
        nome: "",
        data_nascimento: "",
        idade: "",
        sexo: "",
        numero_sus: "",
        municipio_residencia: "Bento Gonçalves",
        bairro_id: "",
        rua_id: "",
        numero: "",
        sinais: [],
        doencas: [],
    });

    const [enums, setEnums] = useState({
        sexo: {},
        sinais: {},
        doencas: {},
    });

    const [enderecos, setEnderecos] = useState({
        bairros: [],
        ruas: [],
    });

    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEnums = async () => {
            try {
                const [sexo, sinais, doencas] =
                await Promise.all([
                    axios.get("http://127.0.0.1:8000/api/enums/sexo"),
                    axios.get("http://127.0.0.1:8000/api/enums/sinais-clinicos"),
                    axios.get("http://127.0.0.1:8000/api/enums/doencas-pre-existentes"),
                ]);
                
                setEnums({
                    sexo: sexo.data,
                    sinais: sinais.data,
                    doencas: doencas.data,
                });
            } catch (error) {
                console.error("Erro ao buscar os enums:", error);
            }
        };

        const fetchEnderecos = async () => {
            try {
                const [bairros, ruas] =
                await Promise.all([
                    axios.get("http://127.0.0.1:8000/api/enderecos/bairro"),
                    axios.get("http://127.0.0.1:8000/api/enderecos/rua"),
                ]);

                setEnderecos({
                    bairros: bairros.data,
                    ruas: ruas.data,
                });
            } catch (error) {
                console.error("Erro ao buscar os endereços:", error);
            }
        };

        fetchEnums();
        fetchEnderecos();
    }, []);

    useEffect(() => {
        const fetchArbovirose = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/arboviroses/chikungunya/${id}`);
                const mappedData = mapApiResponseToFormData(response.data);
                setFormData(mappedData);

                if (mappedData.data_nascimento) {
                    setSelectedDate(dayjs(mappedData.data_nascimento));
                }
            } catch (error) {
                console.error("Erro ao buscar os dados da arbovirose:", error);
            }
        };
    
        fetchArbovirose();
    }, [id]);

    const mapApiResponseToFormData = (response) => {
        const { data } = response;

        return {
            doenca: "chikungunya",
            unidade_saude: data.unidade_saude || "",
            nome: data.nome || "",
            data_nascimento: data.data_nascimento || "",
            idade: data.idade || "",
            sexo: data.sexo || "",
            numero_sus: data.numero_sus || "",
            municipio_residencia: "Bento Gonçalves",
            bairro_id: data.bairro_id || "",
            rua_id: data.rua_id || "",
            numero: data.numero || "",
            sinais: data.arbovirosable?.chikungunya_sinals?.map((sinal) => sinal.id) || [],
            doencas: data.arbovirosable?.chikungunya_doencas?.map((doenca) => doenca.id) || [],
        };
    };

    const handleChange = (event) => {
        const { name, value, type } = event.target;

        const updatedValue = type === 'number' ? (value === '' ? '' : Number(value)) : value;

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: [],
        }));

        setFormData((prev) => ({
            ...prev,
            [name]: updatedValue,
        }));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);

        setFormData((prev) => ({
            ...prev,
            data_nascimento: date ? date.format('YYYY-MM-DD') : '',
        }));
    };

    const handleSinaisChange = (event) => {
        const { value, checked } = event.target;
        const id = Number(value);

        setFormData((prevState) => ({
            ...prevState,
            sinais: checked
                ? [...prevState.sinais, id]
                : prevState.sinais.filter((sinalId) => sinalId !== id),
        }));
    };

    const handleDoencasChange = (event) => {
        const { value, checked } = event.target;
        const id = Number(value);

        setFormData((prevState) => ({
            ...prevState,
            doencas: checked
                ? [...prevState.doencas, id]
                : prevState.doencas.filter((doencaId) => doencaId !== id),
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormErrors({});
        handleDateChange();
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/arboviroses/chikungunya/${id}`, formData);
            setFormErrors({});
            navigate('/arboviroses');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setFormErrors(error.response.data.errors);
            } else {
                console.error("Erro inesperado:", error);
            }
        }
    };

    return (
        <>
        <Link to={`/arboviroses`} >
          <Button variant="contained" color="success">
            Voltar
          </Button>
        </Link>
        <form onSubmit={handleSubmit} className="p-4 grid grid-cols-3 gap-4">
            <div className="col-span-3">
                <TextField
                    label="Nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    fullWidth
                    error={!!formErrors.nome && formErrors.nome.length > 0}
                    helperText={formErrors.nome ? formErrors.nome[0] : ''}
                />
            </div>

            <div>
                <TextField
                    label="Unidade de Saúde"
                    name="unidade_saude"
                    value={formData.unidade_saude}
                    onChange={handleChange}
                    fullWidth
                />
            </div>

            <div>
                <TextField
                    label="Número Sus"
                    name="numero_sus"
                    type="number"
                    value={formData.numero_sus}
                    onChange={handleChange}
                    fullWidth
                    slotProps={{
                        inputLabel: {
                        shrink: true,
                        },
                    }}
                />
            </div>

            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Data de Nascimento" 
                        name="data_nascimento"
                        value={selectedDate}
                        sx={{width: '100%'}}
                        onChange={handleDateChange}
                    />
                </LocalizationProvider>
            </div>

            <div>
                <TextField
                    label="Idade"
                    name="idade"
                    type="number"
                    value={formData.idade}
                    onChange={handleChange}
                    fullWidth
                    slotProps={{
                        inputLabel: {
                        shrink: true,
                        },
                    }}
                />
            </div>

            <div>
                <FormControl fullWidth className="mb-4" >
                    <InputLabel>Sexo</InputLabel>
                    <Select
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                    label="Sexo"
                    >
                    {Object.entries(enums.sexo).map(([id, nome]) => (
                        <MenuItem key={id} value={id}>
                        {nome}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>

            <div>
                <FormControl fullWidth className="mb-4" >
                    <InputLabel>Bairro</InputLabel>
                    <Select
                    name="bairro_id"
                    value={formData.bairro_id}
                    onChange={handleChange}
                    label="Bairro"
                    >
                    {enderecos.bairros.data && enderecos.bairros.data.map(({id, nome}) => (
                        <MenuItem key={id} value={id}>
                        {nome}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>

            <div>
                <FormControl fullWidth className="mb-4" error={!!formErrors.rua_id}>
                    <InputLabel>Rua</InputLabel>
                    <Select
                    name="rua_id"
                    value={formData.rua_id}
                    onChange={handleChange}
                    label="Rua"
                    >
                    {enderecos.ruas.data && enderecos.ruas.data.map(({id, nome}) => (
                        <MenuItem key={id} value={id}>
                        {nome}
                        </MenuItem>
                    ))}
                    </Select>
                    {formErrors.rua_id && (
                        <FormHelperText>{formErrors.rua_id[0]}</FormHelperText>
                    )}
                </FormControl>
            </div>

            <div>
                <TextField
                    label="Numero"
                    name="numero"
                    type="number"
                    value={formData.numero}
                    onChange={handleChange}
                    fullWidth
                    slotProps={{
                        inputLabel: {
                        shrink: true,
                        },
                    }}
                />
            </div>
            
            <hr className="col-span-3"/>

            <div className="col-span-3">
                <h3>Sinais</h3>
                {Object.entries(enums.sinais).map(([id, nome]) => (
                    <FormControlLabel
                        key={id}
                        control={
                            <Checkbox
                                value={id}
                                checked={formData.sinais.includes(Number(id))}
                                onChange={handleSinaisChange}
                            />
                        }
                        label={nome}
                    />
                ))}
            </div>
            
            <hr className="col-span-3"/>

            <div className="col-span-3">
                <h3>Doenças Pré-Existentes</h3>
                {Object.entries(enums.doencas).map(([id, nome]) => (
                    <FormControlLabel
                        key={id}
                        control={
                            <Checkbox
                                value={id}
                                checked={formData.doencas.includes(Number(id))}
                                onChange={handleDoencasChange}
                            />
                        }
                        label={nome}
                    />
                ))}
            </div>

            <hr className="col-span-3"/>

            <div className="col-span-3">
                <Button type="submit" variant="contained" color="primary">
                    Enviar
                </Button>
            </div>
        </form>
        </>
    );
  };
  
export default EditarChikungunya;