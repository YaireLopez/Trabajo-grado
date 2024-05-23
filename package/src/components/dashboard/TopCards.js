import { Card, CardBody } from "reactstrap";
import { useState } from "react";
import React from "react";
import { useEffect } from 'react';
const TopCards = (props) => {
  const [TotalGastado, setTotalGastado] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:3001/TotalGastado')
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
      setTotalGastado(data);
    });
  },[]);
  return (
    <Card>
      <CardBody>
        <div className="d-flex">
          <div className="circle-box lg-box d-inline-block bg-light-danger text-danger">
            <i className="bi bi-coin"></i>
          </div>
          <div className="ms-3">
          {TotalGastado.map((val, key) => (
        <h3 className="mb-0 font-weight-bold">${val.Total}</h3>
        ))}
            
            <small className="text-muted">Gasto Total hasta hoy</small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopCards;
