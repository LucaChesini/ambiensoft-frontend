import React from "react";
import TableComponent from "./TableComponent";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ListagemZoonoses = () => {
    return (
      <div className="p-4">
        <div className="flex flex-row justify-between">
          <Typography variant="h2" gutterBottom sx={{margin: 0}}>
            Zoonoses
          </Typography>
          <div className="flex items-center">
            <span className="mr-5">
              <Link to={`/zoonoses/raiva/criar`} >
                <Button variant="contained" color="success">
                  Raiva
                </Button>
              </Link>
            </span>
            <span className="mr-5">
              <Link to={`/zoonoses/leptospirose/criar`} >
                <Button variant="contained" color="success">
                  Leptospirose
                </Button>
              </Link>
            </span>
          </div>
        </div>
        <TableComponent />
      </div>
    );
  };
  
export default ListagemZoonoses;