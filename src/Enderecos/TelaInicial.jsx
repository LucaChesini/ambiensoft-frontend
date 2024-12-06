import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const TelaInicialEnderecos = () => {
    return (
      <div className="p-4 grid gap-4">
        <Link to={`/enderecos/bairro/criar`}>
          <Button variant="contained" style={{width: '100%'}}>
              Bairros
          </Button>
        </Link>
        <Link to={`/enderecos/rua/criar`}>
          <Button variant="contained" style={{width: '100%'}}>
              Ruas
          </Button>
        </Link>
      </div>
    );
  };
  
  export default TelaInicialEnderecos;