import axios from "axios";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, MenuItem, Button, Select, InputLabel, FormControl, FormControlLabel, Checkbox, FormHelperText } from "@mui/material";
import { DateField, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Link, useNavigate } from "react-router-dom";

const CriarBairro = () => {
    const [formData, setFormData] = useState({
        codigo: "",
        nome: ""
    });

    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

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
            const response = await axios.post("http://127.0.0.1:8000/api/enderecos/bairro", formData);
            setFormErrors({});
            navigate('/enderecos');
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
        <Link to={`/enderecos`} >
          <Button variant="contained" color="success">
            Voltar
          </Button>
        </Link>
        <form onSubmit={handleSubmit} className="p-4 grid grid-cols-2 gap-4">
            <div>
                <TextField
                    label="Unidade de Saúde"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    fullWidth
                />
            </div>

            <div>
                <TextField
                    label="Nome"
                    name="nome"
                    value={formData.nome}
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
  
export default CriarBairro;