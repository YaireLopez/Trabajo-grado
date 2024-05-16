import React, { useEffect } from 'react';
import { Row, Col, CardTitle, Button, Card } from 'reactstrap';
import { useState } from "react";
import Axios from "axios";
import Swal from 'sweetalert2'
import {
  ButtonGroup,
  Table,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  //FormText,
} from "reactstrap";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});


const CatMovimiento = () => {
  const [InfoCatMovimientoList,setInfoCatMovimiento] = useState([]);
  const [nom_CatMov,setnom_CatMov] = useState("");
  const [descripcion_CatMov,setdescripcion_CatMov] = useState("");
  const [id_CatMov,setid_CatMov] = useState();
  const [editar,setEditar] = useState(false);
  useEffect(()=>{
    fetch('http://localhost:3001/infoCatMovimiento')
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
      setInfoCatMovimiento(data);
    });
  },[]);

  const limpiarCampos=()=>{
    setnom_CatMov("");
    setdescripcion_CatMov("");
    setEditar(false);
  }
  const add = ()=>{
    fetch("http://localhost:3001/CatMovimiento",{
      method: "POST",
      body: JSON.stringify({
        nom_CatMov,
        descripcion_CatMov,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(()=>{
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Excelente!</strong>",
        html: "<i>La Categoría <strong>"+nom_CatMov+" </strong>fue registrada con éxito</i>",
        icon: 'success',
        timer:3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró registrar la categoría",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  }
  const update = ()=>{
    fetch("http://localhost:3001/updateCatMovimiento",{
      method: "PUT",
      body: JSON.stringify({
        id_CatMov,
        nom_CatMov,
        descripcion_CatMov,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(()=>{
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Actualización Exitosa!</strong>",
        html: "<i>La Categoría <strong>"+nom_CatMov+" </strong>fue actualizada con éxito</i>",
        icon: 'success',
        timer:3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró editar la categoría",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  }
  const deleteCatMovimiento = (val)=>{
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
        Axios.delete(`http://localhost:3001/deleteCatMovimiento/${val.id_CatMov}`).then(()=>{
        limpiarCampos();
        swalWithBootstrapButtons.fire({
          title: "¡Eliminado!",
          html: "<i>La Categoría <strong>"+val.nom_CatMov+" </strong>fue eliminada con éxito</i>",
          icon: "success",
          timer:3000
        });
      }).catch(function(error){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logró eliminar la categoría",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
        });
      })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          html: "<i>La Categoría <strong>"+val.nom_CatMov+" </strong>aún está en la lista</i>",
          icon: "error",
          timer:3000
        });
      }
    });
    
  }

  const editarCatMovimiento =(val)=>{
    setEditar(true);
    setnom_CatMov(val.nom_CatMov);
    setdescripcion_CatMov(val.descripcion_CatMov);
    setid_CatMov(val.id_CatMov);
  }
  return ( 
    <div className="Forms">
      <div className="Registrar Categoría de movimiento">
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Registrar Categoría de movimiento
          </CardTitle>
          <CardBody>
            <Form>
            <FormGroup>
                <Label for="nom_CatMov">Nombre de la categoría</Label>
                <Input 
                onChange={(event)=>{
                  setnom_CatMov(event.target.value);
                }}id="nom_CatMov" value={nom_CatMov} name="nom_CatMov" type="input" />
              </FormGroup>
              <FormGroup>
                <Label for="descripcion_CatMov">Descripcion de la categoría</Label>
                <Input
                onChange={(event)=>{
                  setdescripcion_CatMov(event.target.value);
                }}
                id="descripcion_CatMov" value={descripcion_CatMov} name="descripcion_CatMov" type="textarea" />
              </FormGroup>
              {
                editar?
                <div>
                  <Button onClick={update} color="success" className="btnRegistrar m-2">Actualizar Categoría</Button>
                  <Button onClick={limpiarCampos} color="secondary" className="btnCancelar m-2">Cancelar</Button>
                </div>
                :<Button onClick={add} color="primary" className="btnRegistrar">Registrar Categoría</Button>
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
                  <th>Nombre de la categoría</th>
                  <th>Descripcion de la categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              {
                    InfoCatMovimientoList.map((val,key)=>{
                      return <tr key={val.id_CatMov}>
                      <th>{val.id_CatMov}</th>
                      <td>{val.nom_CatMov}</td>
                      <td>{val.descripcion_CatMov}</td>
                      <td>
                      <ButtonGroup>
                <Button
                  color="success"
                  onClick={()=>{
                    editarCatMovimiento(val);
                  }}
                >Editar</Button>
                <Button
                  color="danger"
                  onClick={() =>{
                    deleteCatMovimiento(val);
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

export default CatMovimiento;
