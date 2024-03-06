import React from 'react';
import { Row, Col, CardTitle, Button, Card } from 'reactstrap';
import ComponentCard from '../components/ComponentCard';
import { useState } from "react";
import Axios from "axios";


const About = () => {
  const [InfoProyectoList,setInfoProyecto] = useState([]);
  const getInfoProyecto = ()=>{
    Axios.get("http://localhost:3001/infoProyecto").then((response)=>{
      setInfoProyecto(response.data);
    });
  }
  getInfoProyecto();

  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}

        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Información del Proyecto Actual
          </CardTitle>
          <Row className='d-flex'>
            <Col lg="8">
              <div className="mt-5">
                <ComponentCard
                
                  title={
                    InfoProyectoList.map((val,key)=>{
                      return <div className="">{val.nombre_proy}</div>
                    })
                  }
                  subtitle={
                    InfoProyectoList.map((val,key)=>{
                      return <div className="">{val.administrador_proy}</div>
                    })
                  }
                >
                  {/* <Image src='https://www.wrappixel.com/wp-content/uploads/edd/2020/04/xtreme-react-admin-template-y.jpg' alt='pro version image' className='mt-2'/> */}
                  {/* <img src='https://www.wrappixel.com/wp-content/uploads/edd/2020/04/xtreme-react-admin-template-y.jpg' alt='pro version image' className='mt-2' /> */}

                  {/*<img src={`https://www.wrappixel.com/wp-content/uploads/edd/2020/04/xtreme-react-admin-template-y.jpg`} alt="pro version" className="w-100"/>*/}
                  {/*<Button onClick={getInfoProyecto}>Listar</Button>*/}
                  {
                    InfoProyectoList.map((val,key)=>{
                      return <div className="">{val.descripcion_proy}</div>
                    })
                  }

                  <div className="mt-3">
                    <Button
                      color="primary"
                      href="/#/forms"
                      target="_blank"
                    >
                      Actualizar información del proyecto
                    </Button>
                  </div>
                </ComponentCard>
              </div>
            </Col>
          </Row>


          
        </Card>
      </Col>
    </Row>
  );
};

export default About;
