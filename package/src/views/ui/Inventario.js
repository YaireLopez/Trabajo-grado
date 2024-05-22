import React, { useState, useEffect } from "react";

import {
  Table,
  Card,
  CardBody,
  
} from "reactstrap";

const Inventario = () => {
  const [CompraProd, setCompraProd] = useState([]);
  const [VentaUsoProd, setVentaUsoProd] = useState([]);
  const [stock, setstock] = useState();
  
  useEffect(()=>{
    fetch('http://localhost:3001/ProdCompras')
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
      setCompraProd(data);
    });
  },[]);
  const CalcularStock = (val) =>{
    useEffect(()=>{
      fetch('http://localhost:3001/ProdCompras')
      .then((res)=>{
        return res.json();
      })
      .then((data)=>{
        console.log(data);
        setCompraProd(data);
      });
    },[]);
    
  }
  useEffect(()=>{
    fetch('http://localhost:3001/ProdVentasUso')
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
      setVentaUsoProd(data);
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
                CompraProd.map((val,key)=>{
                  return <tr>
                  <td>{val.nombre_prod_Mov}</td>
                  <td>{CalcularStock(val)}</td>
                  <td>
                  
                  </td>
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
