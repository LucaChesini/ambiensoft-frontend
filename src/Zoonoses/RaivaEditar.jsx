import axios from "axios";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, MenuItem, Button, Select, InputLabel, FormControl, FormControlLabel, Checkbox, FormHelperText } from "@mui/material";
import { DateField, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Link, useParams } from 'react-router-dom';
import { format, parseISO } from "date-fns";
import dayjs from "dayjs";

const EditarRaiva = () => {
    const {id} = useParams();
    const [selectedDate, setSelectedDate] = useState(null);
    const [formData, setFormData] = useState({
        doenca: "raiva",
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
        tipo_exposicao: "",
        ferimento: "",
        localizacao_ferimento: "",
        especie_animal_agressor: "",
        sintomas: []
    });

    const [enums, setEnums] = useState({
        doenca: {},
        tipo_exposicao: {},
        ferimento: {},
        localizacao_ferimento: {},
        especie_animal_agressor: {},
        sexo: {},
        sintomas: {},
    });

    const [enderecos, setEnderecos] = useState({
        bairros: [],
        ruas: [],
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const fetchEnums = async () => {
            try {
                const [doenca, tipoExposicao, ferimento, localizacaoFerimento, especieAnimal, sexo, sintomas] =
                await Promise.all([
                    axios.get("http://127.0.0.1:8000/api/enums/zoonoses"),
                    axios.get("http://127.0.0.1:8000/api/enums/tipo_exposicao_raiva"),
                    axios.get("http://127.0.0.1:8000/api/enums/ferimento"),
                    axios.get("http://127.0.0.1:8000/api/enums/localizacao_ferimento"),
                    axios.get("http://127.0.0.1:8000/api/enums/especie_raiva"),
                    axios.get("http://127.0.0.1:8000/api/enums/sexo"),
                    axios.get("http://127.0.0.1:8000/api/enums/sintomas-raiva"),
                ]);
                
                setEnums({
                    doenca: doenca.data,
                    tipo_exposicao: tipoExposicao.data,
                    ferimento: ferimento.data,
                    localizacao_ferimento: localizacaoFerimento.data,
                    especie_animal_agressor: especieAnimal.data,
                    sexo: sexo.data,
                    sintomas: sintomas.data,
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
        const fetchZoonose = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/zoonoses/raiva/${id}`);
                const mappedData = mapApiResponseToFormData(response.data);
                setFormData(mappedData);

                if (mappedData.data_nascimento) {
                    setSelectedDate(dayjs(mappedData.data_nascimento));
                }
            } catch (error) {
                console.error("Erro ao buscar os dados da zoonose:", error);
            }
        };
    
        fetchZoonose();
    }, [id]);

    const mapApiResponseToFormData = (response) => {
        const { data } = response;
    
        return {
            doenca: "raiva",
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
            tipo_exposicao: data.zoonosable?.tipo_exposicao || "",
            ferimento: data.zoonosable?.ferimento || "",
            localizacao_ferimento: data.zoonosable?.localizacao_ferimento || "",
            especie_animal_agressor: data.zoonosable?.especie_animal_agressor || "",
            sintomas: data.zoonosable?.raiva_sintomas?.map((sintoma) => sintoma.id) || [],
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

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const id = Number(value);

        setFormData((prevState) => ({
            ...prevState,
            sintomas: checked
                ? [...prevState.sintomas, id]
                : prevState.sintomas.filter((sintomaId) => sintomaId !== id),
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormErrors({});
        handleDateChange();
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/zoonoses/raiva/${id}`, formData);
            setFormErrors({});
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
        <Link to={`/zoonoses`} >
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

            <div>
                <FormControl fullWidth className="mb-4" >
                    <InputLabel>Tipo de Exposição</InputLabel>
                    <Select
                    name="tipo_exposicao"
                    value={formData.tipo_exposicao}
                    onChange={handleChange}
                    label="Tipo de Exposição"
                    >
                    {Object.entries(enums.tipo_exposicao).map(([id, nome]) => (
                        <MenuItem key={id} value={id}>
                        {nome}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>

            <div>
                <FormControl fullWidth className="mb-4" >
                    <InputLabel>Ferimento</InputLabel>
                    <Select
                    name="ferimento"
                    value={formData.ferimento}
                    onChange={handleChange}
                    label="Ferimento"
                    >
                    {Object.entries(enums.ferimento).map(([id, nome]) => (
                        <MenuItem key={id} value={id}>
                        {nome}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>

            <div>
                <FormControl fullWidth className="mb-4" >
                    <InputLabel>Localização Ferimento</InputLabel>
                    <Select
                    name="localizacao_ferimento"
                    value={formData.localizacao_ferimento}
                    onChange={handleChange}
                    label="Localização Ferimento"
                    >
                    {Object.entries(enums.localizacao_ferimento).map(([id, nome]) => (
                        <MenuItem key={id} value={id}>
                        {nome}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>

            <div>
                <FormControl fullWidth className="mb-4" >
                    <InputLabel>Animal Agressor</InputLabel>
                    <Select
                    name="especie_animal_agressor"
                    value={formData.especie_animal_agressor}
                    onChange={handleChange}
                    label="Animal Agressor"
                    >
                    {Object.entries(enums.especie_animal_agressor).map(([id, nome]) => (
                        <MenuItem key={id} value={id}>
                        {nome}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>
            
            <hr className="col-span-3"/>

            <div className="col-span-3">
                <h3>Sintomas</h3>
                {Object.entries(enums.sintomas).map(([id, nome]) => (
                    <FormControlLabel
                        key={id}
                        control={
                            <Checkbox
                                value={id}
                                checked={formData.sintomas.includes(Number(id))}
                                onChange={handleCheckboxChange}
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
  
export default EditarRaiva;