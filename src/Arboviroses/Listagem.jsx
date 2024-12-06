import React from "react";
import TableComponent from "./TableComponent";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ListagemArboviroses = () => {
    return (
      <div className="p-4">
        <div className="flex flex-row justify-between">
          <Typography variant="h2" gutterBottom sx={{margin: 0}}>
            Arboviroses
          </Typography>
          <div className="flex items-center">
            <span className="mr-5">
              <Link to={`/arboviroses/dengue/criar`} >
                <Button variant="contained" color="success">
                  Dengue
                </Button>
              </Link>
            </span>
            <span className="mr-5">
              <Link to={`/arboviroses/chikungunya/criar`} >
                <Button variant="contained" color="success">
                  Chikungunya
                </Button>
              </Link>
            </span>
          </div>
        </div>
        <TableComponent />
      </div>
    );
  };
  
export default ListagemArboviroses;