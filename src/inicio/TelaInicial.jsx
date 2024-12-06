import React from "react";
import TableComponent from "../Zoonoses/TableComponent";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const TelaInicial = () => {
    return (
      <div className="p-4 grid gap-4">
        <Link to={`/zoonoses`}>
          <Button variant="contained" style={{width: '100%'}}>
              Zoonoses
          </Button>
        </Link>
        <Link to={`/arboviroses`}>
          <Button variant="contained" style={{width: '100%'}}>
              Arboviroses
          </Button>
        </Link>
        <Link to={`/enderecos`}>
          <Button variant="contained" style={{width: '100%'}}>
              Endereços
          </Button>
        </Link>
        <Link to={`/encontros`}>
          <Button variant="contained" style={{width: '100%'}}>
              Encontros
          </Button>
        </Link>
        <Link to={`/denuncias`}>
          <Button variant="contained" style={{width: '100%'}}>
              Denúncias
          </Button>
        </Link>
      </div>
    );
  };
  
  export default TelaInicial;