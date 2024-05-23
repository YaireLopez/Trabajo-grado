import React, { useState, useEffect } from "react";

import {
  Table,
  Card,
  CardBody,
  
} from "reactstrap";

const Inventario = () => {
  const [StockProductos, setStockProductos] = useState([]);
  
  useEffect(()=>{
    fetch('http://localhost:3001/stockProductos')
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
      setStockProductos(data);
    });
  },[]);
   return (
    <Card>
          <CardBody>
            <h2>Inventario</h2>
          <Table bordered striped>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
              {
                StockProductos.map((val,key)=>{
                  return <tr>
                  <td>{val.nombre_prod_Mov}</td>
                  <td>{val.total_movimiento}</td>
                </tr>
                })
              }
              </tbody>
            </Table>                    
          </CardBody>
                  </Card>
  );
};

export default Inventario;
