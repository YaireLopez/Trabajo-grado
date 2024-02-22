import { useState } from "react";
import Axios from "axios";

import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  //FormText,
} from "reactstrap";

function Forms(){
  const [nombre_proy,setNombre_proy] = useState("");
  const [administrador_proy,setAdministrador_proy] = useState("");
  //const [Fecha_crea_Proy,setFecha_crea_proy] = useState("");
  const [descripcion_proy,setDescripcion_proy] = useState("");

  const add = ()=>{
    Axios.post("http://localhost:3001/forms",{
      nombre_proy:nombre_proy,
      administrador_proy:administrador_proy,
      //Fecha_crea_Proy:Fecha_crea_Proy,
      descripcion_proy:descripcion_proy
    }).then(()=>{
      alert("proyecto creado");
      console.log("se creó");
    });
  }

  return (
    <div className="Forms">
      <div className="Crearproyecto">
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Crear Proyecto
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="nombre_proy">Nombre del proyecto</Label>
                <Input
                onChange={(event)=>{
                  setNombre_proy(event.target.value);
                }}
                id="nombre_proy" name="nombre_proy" type="textarea" />
              </FormGroup>
              <FormGroup>
                <Label for="administrador_proy">Administrador del proyecto</Label>
                <Input 
                onChange={(event)=>{
                  setAdministrador_proy(event.target.value);
                }}id="administrador_proy" name="administrador_proy" type="textarea" />
              </FormGroup>
              
              <FormGroup>
                <Label for="descripcion_proy">Descripcion del proyecto</Label>
                <Input
                onChange={(event)=>{
                  setDescripcion_proy(event.target.value);
                }} id="descripcion_proy" name="descripcion_proy" type="textarea" />
              </FormGroup>
              <Button onClick={add} className="mt-2">Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
    </div>
    </div>
  );
};

export default Forms;
