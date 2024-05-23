import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { useState } from "react";
import { useEffect } from 'react';

const SalesChart = () => {
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
        <CardTitle tag="h5">Sales Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Dinero gastado Hoy
        </CardSubtitle>
        {TotalGastado.map((val, key) => (
        <div>{val.Total}</div>
        ))}
      </CardBody>
    </Card>
  );
};

export default SalesChart;
