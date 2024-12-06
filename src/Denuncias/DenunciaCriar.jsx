import axios from "axios";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, MenuItem, Button, Select, InputLabel, FormControl, FormControlLabel, Checkbox, FormHelperText } from "@mui/material";
import { DateField, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Link, useNavigate } from "react-router-dom";

const CriarDenuncia = () => {
    const [formData, setFormData] = useState({
        nome: "",
        municipio_residencia: "Bento Gonçalves",
        bairro_id: "",
        rua_id: "",
        denuncia: "",
    });

    const [enderecos, setEnderecos] = useState({
        bairros: [],
        ruas: [],
    });

    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
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

        fetchEnderecos();
    }, []);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormErrors({});
        try {
            navigate('/');
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
        <Link to={`/`} >
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
            
            <hr className="col-span-3"/>

            <div className="col-span-3">
                <TextField
                    label="Denuncia"
                    name="denuncia"
                    value={formData.denuncia}
                    onChange={handleChange}
                    fullWidth
                />
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
  
export default CriarDenuncia;