import React from 'react';
import { Row, Col, CardTitle, Button, Card } from 'reactstrap';
import ComponentCard from '../components/ComponentCard';
import { useState } from "react";
import { useEffect } from 'react';
import Axios from "axios";
import Swal from 'sweetalert2'
import {
  Table,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  //FormText,
} from "reactstrap";



const Proyecto = () => {
  const [InfoProyectoList,setInfoProyecto] = useState([]);
  const [nombre_proy,setnombre_proy] = useState("");
  const [administrador_proy,setadministrador_proy] = useState("");
  const [Fecha_crea_Proy,setFecha_crea_Proy] = useState("");
  const [descripcion_proy,setdescripcion_proy] = useState("");
  const [id_Proyecto,setid_Proyecto] = useState();
  const [editar,setEditar] = useState(false);
  useEffect(()=>{
    fetch('http://localhost:3001/infoProyecto')
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
      setInfoProyecto(data);
    });
  },[]);

  const limpiarCampos=()=>{
    setnombre_proy("");
    setadministrador_proy("");
    setFecha_crea_Proy("");
    setdescripcion_proy("");
    setEditar(false);
  }
  const update = ()=>{
    Axios.put("http://localhost:3001/updateProyecto",{
      id_Proyecto:id_Proyecto,
      nombre_proy:nombre_proy,
      administrador_proy:administrador_proy,
      Fecha_crea_Proy:Fecha_crea_Proy,
      descripcion_proy:descripcion_proy
    }).then(()=>{
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Actualización Exitosa!</strong>",
        html: "<i>El Proyecto <strong>"+nombre_proy+" </strong>fue actualizado con éxito</i>",
        icon: 'success',
        timer:3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró editar el proyecto",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  }

  const editarProyecto =(val)=>{
    setEditar(true);
    setnombre_proy(val.nombre_proy);
    setadministrador_proy(val.administrador_proy);
    setFecha_crea_Proy(val.Fecha_crea_Proy);
    setdescripcion_proy(val.descripcion_proy);
    setid_Proyecto(val.id_Proyecto);
  }

  return (
    <div className="Forms">
      <div className="Registrar proyecto">
    <Row>
      <Col>
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
                  {
                    InfoProyectoList.map((val,key)=>{
                      return <div className="">{val.descripcion_proy}</div>
                    })
                  }
                </ComponentCard>
              </div>
            </Col>
          </Row>


          
        </Card>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Registrar Proyecto
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="nombre_proy">Nombre del Proyecto</Label>
                <Input
                onChange={(event)=>{
                  setnombre_proy(event.target.value);
                }}
                id="nombre_proy" value={nombre_proy} name="nombre_proy" type="input" />
              </FormGroup>
              <FormGroup>
                <Label for="administrador_proy">Administrador del proyecto</Label>
                <Input 
                onChange={(event)=>{
                  setadministrador_proy(event.target.value);
                }}id="administrador_proy" value={administrador_proy} name="administrador_proy" type="input" />
              </FormGroup>
              
              <FormGroup>
                <Label for="Fecha_crea_Proy">Fecha de creacion del proyecto</Label>
                <Input
                onChange={(event)=>{
                  setFecha_crea_Proy(event.target.value);
                }} id="Fecha_crea_Proy" value={Fecha_crea_Proy} name="Fecha_crea_Proy" type="date" />
                <Label for="descripcion_proy">Descripcion del Proyecto</Label>
                <Input
                onChange={(event)=>{
                  setdescripcion_proy(event.target.value);
                }}
                id="descripcion_proy" value={descripcion_proy} name="descripcion_proy" type="textarea" />
              </FormGroup>
              {
                editar?
                <div>
                  <Button onClick={update} color="success" className="btnRegistrar m-2">Actualizar Proyecto</Button>
                  <Button onClick={limpiarCampos} color="secondary" className="btnCancelar m-2">Cancelar</Button>
                </div>
                :<Button onClick={update} color="primary" className="btnRegistrar">Cambiar Información</Button>
              }   
            </Form>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
          <Table bordered striped>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre del proyecto</th>
                  <th>Administrador</th>
                  <th>Fecha de creacion</th>
                  <th>Descripcion</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              {
                    InfoProyectoList.map((val,key)=>{
                      return <tr key={val.id_Proyecto}>
                      <th>{val.id_Proyecto}</th>
                      <td>{val.nombre_proy}</td>
                      <td>{val.administrador_proy}</td>
                      <td>{val.Fecha_crea_Proy}</td>
                      <td>{val.descripcion_proy}</td>
                      <td>
                     
                <Button
                  color="success"
                  onClick={()=>{
                    editarProyecto(val);
                  }}
                >Editar</Button>
                      </td>
                    </tr>
                    })
                    }
                
              </tbody>
            </Table>
                    
                    
          </CardBody>
                  </Card>
      </Col>
    </Row>
    </div>
    </div>
  );
};

export default Proyecto;
