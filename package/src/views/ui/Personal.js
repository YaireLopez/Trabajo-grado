import React, { useEffect } from 'react';
import { Row, Col, CardTitle, Button, Card } from 'reactstrap';
import { useState } from "react";
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


const Personal = () => {
  
  const [InfoPersonalList,setInfoPersonal] = useState([]);
  const [Nombre_Pers,setNombre_Pers] = useState("");
  const [Cargo,setCargo] = useState("");
  const [id_Personal,setid_Personal] = useState();
  const [editar,setEditar] = useState(false);
  
  useEffect(()=>{
    fetch('http://localhost:3001/infoPersonal')
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
      setInfoPersonal(data);
    });
  },[]);

  const limpiarCampos=()=>{
    setNombre_Pers("");
    setCargo("");
    setEditar(false);
  }
  
  const add = ()=>{
    fetch("http://localhost:3001/Personal",{
      method: "POST",
      body: JSON.stringify({
        Nombre_Pers,
        Cargo,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(()=>{
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Excelente!</strong>",
        html: "<i>El Empleado <strong>"+Nombre_Pers+" </strong>fue registrado con éxito</i>",
        icon: 'success',
        timer:3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró registrar el empleado",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  }
  
  const update = ()=>{
    fetch("http://localhost:3001/updatePersonal",{
      method: "PUT",
      body: JSON.stringify({
        id_Personal,
        Nombre_Pers,
        Cargo,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(()=>{
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Actualización Exitosa!</strong>",
        html: "<i>El empleado <strong>"+Nombre_Pers+" </strong>fue actualizado con éxito</i>",
        icon: 'success',
        timer:3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró editar el empleado",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  }
  
  const deletePersonal = (val)=>{
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
        fetch(`http://localhost:3001/deletePersonal/${val.id_Personal}`,{
          method: "DELETE",
        })
        .then(response => response.json())
        .then(()=>{
        limpiarCampos();
        swalWithBootstrapButtons.fire({
          title: "¡Eliminado!",
          html: "<i>El empleado <strong>"+val.Nombre_Pers+" </strong>fue eliminado con éxito</i>",
          icon: "success",
          timer:3000
        });
      }).catch(function(error){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logró eliminar el empleado",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
        });
      })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          html: "<i>El empleado <strong>"+val.Nombre_Pers+" </strong>aún está en la lista</i>",
          icon: "error",
          timer:3000
        });
      }
    });
    
  }


  const editarPersonal =(val)=>{
    setEditar(true);
    setNombre_Pers(val.Nombre_Pers);
    setCargo(val.Cargo);
    setid_Personal(val.id_Personal);
  }
  return ( 
    <div className="Forms">
      <div className="Registrar personal">
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Registrar Empleado
          </CardTitle>
          <CardBody>
            <Form>
            <FormGroup>
                <Label for="Nombre_Pers">Nombre</Label>
                <Input 
                onChange={(event)=>{
                  setNombre_Pers(event.target.value);
                }}id="Nombre_Pers" value={Nombre_Pers} name="Nombre_Pers" type="input" placeholder="Ingrese el nombre del empleado"/>
              </FormGroup>
              <FormGroup>
                <Label for="Cargo">Cargo</Label>
                <Input
                onChange={(event)=>{
                  setCargo(event.target.value);
                }}
                id="Cargo" value={Cargo} name="Cargo" type="input" placeholder="Ingrese el cargo o funciones que cumple el empleado"/>
              </FormGroup>
              {
                editar?
                <div>
                  <Button onClick={update} color="success" className="btnRegistrar m-2">Actualizar Empleado</Button>
                  <Button onClick={limpiarCampos} color="secondary" className="btnCancelar m-2">Cancelar</Button>
                </div>
                :<Button onClick={add} color="primary" className="btnRegistrar">Registrar Empleado</Button>
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
                  <th>Cargo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              {
                    InfoPersonalList.map((val,key)=>{
                      return <tr key={val.id_Personal}>
                      <th>{val.id_Personal}</th>
                      <td>{val.Nombre_Pers}</td>
                      <td>{val.Cargo}</td>
                      <td>
                      <ButtonGroup>
                <Button
                  color="success"
                  onClick={()=>{
                    editarPersonal(val);
                  }}
                >Editar</Button>
                <Button
                  color="danger"
                  onClick={() =>{
                    deletePersonal(val);
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

export default Personal;
