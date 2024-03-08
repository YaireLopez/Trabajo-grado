
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
  Table,
  //FormText,
} from "reactstrap";


function Tables(){
  const [nombre_proy,setNombre_proy] = useState("");
  const [administrador_proy,setAdministrador_proy] = useState("");
  //const [Fecha_crea_Proy,setFecha_crea_proy] = useState("");
  const [descripcion_proy,setDescripcion_proy] = useState("");

  const [InfoProyectoList,setInfoProyecto] = useState([]);

  const add = ()=>{
    Axios.post("http://localhost:3001/forms",{
      nombre_proy:nombre_proy,
      administrador_proy:administrador_proy,
      descripcion_proy:descripcion_proy
    }).then(()=>{
      alert("proyecto creado");
      console.log("se creó");
    });
  }

  const getInfoProyecto = ()=>{
    Axios.get("http://localhost:3001/infoProyecto").then((response)=>{
      setInfoProyecto(response.data);
    });
  }
  return (
    <Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-1*/}
      {/* --------------------------------------------------------------------------------*/}
      {/*<Col lg="12">
        <ProjectTables />
      </Col>*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* table-2*/}
      {/* --------------------------------------------------------------------------------*/}
      <div className="Forms">
      <div className="Administrar proyecto actual">
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Registrar proveedor
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="nombre_proy">Nombre</Label>
                <Input
                onChange={(event)=>{
                  setNombre_proy(event.target.value);
                }}
                id="nombre_proy" name="nombre_proy" placeholder="Nombre del proveedor a registrar" type="input" />
              </FormGroup>
              <FormGroup>
                <Label for="administrador_proy">Administrador del proyecto</Label>
                <Input 
                onChange={(event)=>{
                  setAdministrador_proy(event.target.value);
                }}id="administrador_proy" name="administrador_proy" type="input" />
              </FormGroup>
              
              <FormGroup>
                <Label for="descripcion_proy">Descripcion del proyecto</Label>
                <Input
                onChange={(event)=>{
                  setDescripcion_proy(event.target.value);
                }} id="descripcion_proy" name="descripcion_proy" type="textarea" />
                <Button onClick={add} className="btnRegistrar">Registrar Proyecto</Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
    </div>
    </div>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Directorio de Proveedores
          </CardTitle>
          <CardBody className="">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Telefono 1</th>
                  <th>Telefono 2</th>
                  <th>Direccion</th>
                  <th>Ciudad</th>
                  <th>Descripcion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
                
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Tables;
