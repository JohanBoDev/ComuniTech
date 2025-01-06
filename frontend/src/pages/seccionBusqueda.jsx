import React from "react";
import ResultadosProductos from "../components/ResultadosProductos";

const SeccionBusqueda = ({ results }) => {
    return (
        <div className="">
            <ResultadosProductos products={results} />
        </div>
    );
};

export default SeccionBusqueda;
