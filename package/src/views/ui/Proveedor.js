import { useState } from "react";
import React, { useEffect } from 'react';
import Swal from 'sweetalert2'

import {
  Button,
  ButtonGroup,
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  //FormText,
} from "reactstrap";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});

function Proveedor(){

  const [nombre_Proveedor,setNombre_proveedor] = useState("");
  const [Telefono1,setTelefono1] = useState();
  const [Telefono2,setTelefono2] = useState();
  const [direc_prov,setdirec_prov] = useState("");
  const [ciudad,setciudad] = useState("");
  const [descripcion_Prov,setdescripcion_Prov] = useState("");
  const [id_proveedor,setId_proveedor] = useState();
  const [editar,setEditar] = useState(false);

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
  

  const limpiarCampos=()=>{
    setNombre_proveedor("");
    setTelefono1("");
    setTelefono2("");
    setdirec_prov("");
    setciudad("");
    setdescripcion_Prov("");
    setEditar(false);
  }

  const add = ()=>{
    fetch("http://localhost:3001/proveedor",{
      method: "POST",
      body: JSON.stringify({
        nombre_Proveedor,
        Telefono1,
        Telefono2,
        direc_prov,
        ciudad,
        descripcion_Prov,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      
    }).then(()=>{
      
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Excelente!</strong>",
        html: "<i>El proveedor <strong>"+nombre_Proveedor+" </strong>fue registrado con éxito</i>",
        icon: 'success',
        timer:3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró registrar el proveedor",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  }
  const update = ()=>{
    fetch("http://localhost:3001/updateProveedor",{
      method: "PUT",
      body: JSON.stringify({
        id_proveedor,
        nombre_Proveedor,
        Telefono1,
        Telefono2,
        direc_prov,
        ciudad,
        descripcion_Prov,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(()=>{
      
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Actualización Exitosa!</strong>",
        html: "<i>El proveedor <strong>"+nombre_Proveedor+" </strong>fue actualizado con éxito</i>",
        icon: 'success',
        timer:3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró editar el proveedor",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  }

  const deleteProveedor = (val)=>{
    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      html: "<i>Una vez borrado no podrás recuperarlo</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminalo",
      cancelButtonText: "No, mejor dejalo",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/deleteProveedor/${val.id_proveedor}`,{
          method: "DELETE",
        })
        .then(response => response.json())
        .then(()=>{
        
        limpiarCampos();
        swalWithBootstrapButtons.fire({
          title: "¡Eliminado!",
          html: "<i>El proveedor <strong>"+val.nombre_Proveedor+" </strong>fue eliminado con éxito</i>",
          icon: "success",
          timer:3000
        });
      }).catch(function(error){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logró eliminar el proveedor",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
        });
      })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          html: "<i>El proveedor <strong>"+val.nombre_Proveedor+" </strong>aún está en el directorio</i>",
          icon: "error",
          timer:3000
        });
      }
    });
    
  }


  const editarProveedor =(val)=>{
    setEditar(true);
    setNombre_proveedor(val.nombre_Proveedor);
    setTelefono1(val.Telefono1);
    setTelefono2(val.Telefono2);
    setdirec_prov(val.direc_prov);
    setciudad(val.ciudad);
    setdescripcion_Prov(val.descripcion_Prov);
    setId_proveedor(val.id_proveedor);
  }
 
  return (
    <div className="Forms">
      <div className="Registrar proveedor">
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
                <Label for="nombre_proy">Nombre del Proveedor</Label>
                <Input
                onChange={(event)=>{
                  setNombre_proveedor(event.target.value);
                }}
                id="nombre_proveedor" value={nombre_Proveedor} name="nombre_proveedor" type="input" placeholder="Ingrese el nombre" />
              </FormGroup>
              <FormGroup>
                <Label for="Telefono1">Teléfono 1</Label>
                <Input 
                onChange={(event)=>{
                  setTelefono1(event.target.value);
                }}id="Telefono1" value={Telefono1} name="Telefono1" type="number" placeholder="Ingrese un número de teléfono"/>
              </FormGroup>
              
              <FormGroup>
                <Label for="Telefono2">Teléfono 2</Label>
                <Input
                onChange={(event)=>{
                  setTelefono2(event.target.value);
                }} id="Telefono2" value={Telefono2} name="Telefono2" type="number" placeholder="Ingrese un número de teléfono secundario"/>
                <Label for="direc_prov">Dirección del proveedor</Label>
                <Input
                onChange={(event)=>{
                  setdirec_prov(event.target.value);
                }}
                id="direc_prov" value={direc_prov} name="direc_prov" type="input" placeholder="Ingrese la dirección del local"/>
              </FormGroup>
              <FormGroup>
                <Label for="ciudad">Ciudad</Label>
                <Input 
                onChange={(event)=>{
                  setciudad(event.target.value);
                }}id="ciudad" value={ciudad} name="ciudad" type="input" placeholder="Ingrese la ciudad de la tienda"/>
              </FormGroup>
              
              <FormGroup>
                <Label for="descripcion_Prov">Descripcion</Label>
                <Input
                onChange={(event)=>{
                  setdescripcion_Prov(event.target.value);
                }} id="descripcion_Prov" value={descripcion_Prov} name="descripcion_Prov" type="textarea" placeholder="Ingrese algún comentario adicional que desee"/>
                
              </FormGroup>
              {
                editar?
                <div>
                  <Button onClick={update} color="success" className="btnRegistrar m-2">Actualizar Proveedor</Button>
                  <Button onClick={limpiarCampos} color="secondary" className="btnCancelar m-2">Cancelar</Button>
                </div>
                :<Button onClick={add} color="primary" className="btnRegistrar">Registrar Proveedor</Button>
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
                  <th>Nombre</th>
                  <th>Telefono 1</th>
                  <th>Telefono 2</th>
                  <th>Dirección</th>
                  <th>Ciudad</th>
                  <th>Descripcion</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              {
                    InfoProveedorList.map((val,key)=>{
                      return <tr key={val.id_proveedor}>
                      <th>{val.id_proveedor}</th>
                      <td>{val.nombre_Proveedor}</td>
                      <td>{val.Telefono1}</td>
                      <td>{val.Telefono2}</td>
                      <td>{val.direc_prov}</td>
                      <td>{val.ciudad}</td>
                      <td>{val.descripcion_Prov}</td>
                      <td>
                      <ButtonGroup>
                <Button
                  color="success"
                  onClick={()=>{
                    editarProveedor(val);
                  }}
                >Editar</Button>
                <Button
                  color="danger"
                  onClick={() =>{
                    deleteProveedor(val);
                  }}
                >Eliminar</Button>
              </ButtonGroup>
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

export default Proveedor;
