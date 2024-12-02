import React from "react";
import TableComponent from "./TableComponent";
import { Button, Typography } from "@mui/material";

const ListagemZoonoses = () => {
    return (
      <div className="p-4">
        <div>
          <Typography variant="h2" gutterBottom>
            Zoonoses
          </Typography>
        </div>
        <div>
          <span className="mr-5">
            <Button variant="contained" color="success">
              Raiva
            </Button>
          </span>
          <span className="mr-5">
            <Button variant="contained" color="success">
              Leptospirose
            </Button>
          </span>
        </div>
        <TableComponent />
      </div>
    );
  };
  
export default ListagemZoonoses;