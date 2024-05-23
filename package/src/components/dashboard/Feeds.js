import React from "react";
import { useState } from "react";
import { useEffect } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
} from "reactstrap";


const Feeds = () => {
  const [InfoProveedorList,setInfoProveedor] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:3001/infoProveedor')
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
      setInfoProveedor(data);
    });
  },[]);
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Proveedores</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Tus proveedores son
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {InfoProveedorList.map((val, key) => (
            <ListGroupItem action href="/Proveedor#/Proveedor" tag="a" className="d-flex align-items-center p-3 border-0">
              
                <i className="bi bi-person"></i><div >{val.nombre_Proveedor}</div>
              
              
              <small className="ms-auto text-muted text-small">
                <label>{val.Telefono1}</label>
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
