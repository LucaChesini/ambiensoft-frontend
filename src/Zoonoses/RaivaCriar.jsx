import axios from "axios";
import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Button, Select, InputLabel, FormControl } from "@mui/material";

const CriarRaiva = () => {
    const [formData, setFormData] = useState({
        doenca: "",
        unidade_saude: "",
        nome: "",
        data_nascimento: "",
        idade: "",
        sexo: "",
        numero_sus: "",
        municipio_residencia: "",
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
    });

    useEffect(() => {
    const fetchEnums = async () => {
        try {
            const [doenca, tipoExposicao, ferimento, localizacaoFerimento, especieAnimal] =
            await Promise.all([
                axios.get("http://127.0.0.1:8000/api/enums/zoonoses"),
                axios.get("http://127.0.0.1:8000/api/enums/tipo_exposicao_raiva"),
                axios.get("http://127.0.0.1:8000/api/enums/ferimento"),
                axios.get("http://127.0.0.1:8000/api/enums/localizacao_ferimento"),
                axios.get("http://127.0.0.1:8000/api/enums/especie_raiva"),
            ]);
            
            setEnums({
                doenca: doenca.data,
                tipo_exposicao: tipoExposicao.data,
                ferimento: ferimento.data,
                localizacao_ferimento: localizacaoFerimento.data,
                especie_animal_agressor: especieAnimal.data,
            });
        } catch (error) {
            console.error("Erro ao buscar os enums:", error);
        }
    };

        fetchEnums();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/zoonoses", formData);
            console.log("Formulário enviado com sucesso:", response.data);
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <FormControl fullWidth className="mb-4">
                <InputLabel>Doença</InputLabel>
                <Select
                name="doenca"
                value={formData.doenca}
                onChange={handleChange}
                label="Doença"
                >
                {Object.entries(enums.doenca).map(([id, nome]) => (
                    <MenuItem key={id} value={id}>
                    {nome}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </form>
    );
  };
  
export default CriarRaiva;