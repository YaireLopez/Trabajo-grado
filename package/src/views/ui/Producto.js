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


const Producto = () => {
  
  const [InfoProductoList,setInfoProducto] = useState([]);
  const [fecha_prod,setfecha_prod] = useState("");
  const [nombre_prod,setnombre_prod] = useState("");
  const [descripcion_prod,setdescripcion_prod] = useState("");
  const [id_Producto,setid_Producto] = useState();
  const [editar,setEditar] = useState(false);

  useEffect(()=>{
    fetch('http://localhost:3001/infoProducto')
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
      setInfoProducto(data);
    });
  },[]);

  const limpiarCampos=()=>{
    setfecha_prod("");
    setnombre_prod("");
    setdescripcion_prod("")
    setEditar(false);}

  const add = ()=>{
    fetch("http://localhost:3001/producto",{
      method: "POST",
      body: JSON.stringify({
        fecha_prod,
        nombre_prod,
        descripcion_prod,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(()=>{
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Excelente!</strong>",
        html: "<i>El producto <strong>"+nombre_prod+" </strong>fue registrado con éxito</i>",
        icon: 'success',
        timer:3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró registrar el producto",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  }

  const update = ()=>{
    fetch("http://localhost:3001/updateProducto",{
      method: "PUT",
      body: JSON.stringify({
        id_Producto,
        fecha_prod,
        nombre_prod,
        descripcion_prod,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(()=>{
      
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Actualización Exitosa!</strong>",
        html: "<i>El producto <strong>"+nombre_prod+" </strong>fue actualizado con éxito</i>",
        icon: 'success',
        timer:3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró editar el producto",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  }

 
  
  const deleteProducto = (val)=>{
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
        fetch(`http://localhost:3001/deleteProducto/${val.id_Producto}`,{
          method: "DELETE",
        })
        .then(response => response.json())
        .then(()=>{
  
        limpiarCampos();
        swalWithBootstrapButtons.fire({
          title: "¡Eliminado!",
          html: "<i>El producto <strong>"+val.nombre_prod+" </strong>fue eliminado con éxito</i>",
          icon: "success",
          timer:3000
        });
      }).catch(function(error){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logró eliminar el producto",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
        });
      })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          html: "<i>El producto <strong>"+val.nombre_prod+" </strong>aún está en la lista</i>",
          icon: "error",
          timer:3000
        });
      }
    });
    
  }


  const editarProducto =(val)=>{
    setEditar(true);
    setfecha_prod(val.fecha_prod);
    setnombre_prod(val.nombre_prod);
    setdescripcion_prod(val.descripcion_prod);
    setid_Producto(val.id_Producto);
  }

  return ( 
    <div className="Forms">
      <div className="Registrar Producto">
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Registrar producto
          </CardTitle>
          <CardBody>
            <Form>
            <FormGroup>
                <Label for="fecha_prod">Fecha de registro del producto</Label>
                <Input 
                onChange={(event)=>{
                  setfecha_prod(event.target.value);
                }}id="fecha_prod" value={fecha_prod} name="fecha_prod" type="date" />
              </FormGroup>
              <FormGroup>
                <Label for="nombre_prod">Nombre del Producto</Label>
                <Input
                onChange={(event)=>{
                  setnombre_prod(event.target.value);
                }}
                id="nombre_prod" value={nombre_prod} name="nombre_prod" type="input" placeholder="Ingrese el nombre del nuevo producto a registrar"/>
              </FormGroup>
              <FormGroup>
                <Label for="descripcion_prod">Descripción del producto</Label>
                <Input
                onChange={(event)=>{
                  setdescripcion_prod(event.target.value);
                }} id="descripcion_prod" value={descripcion_prod} name="descripcion_prod" type="textarea" placeholder="Ingrese un comentario respecto al nuevo producto"/>
              </FormGroup>
              {
                editar?
                <div>
                  <Button onClick={update} color="success" className="btnRegistrar m-2">Actualizar Producto</Button>
                  <Button onClick={limpiarCampos} color="secondary" className="btnCancelar m-2">Cancelar</Button>
                </div>
                :<Button onClick={add} color="primary" className="btnRegistrar">Registrar Producto</Button>
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
                  <th>Fecha de registro</th>
                  <th>Nombre del producto</th>
                  <th>Descripcion del producto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              {
                    InfoProductoList.map((val,key)=>{
                      return <tr key={val.id_Producto}>
                      <th>{val.id_Producto}</th>
                      <td>{val.fecha_prod}</td>
                      <td>{val.nombre_prod}</td>
                      <td>{val.descripcion_prod}</td>
                      <td>
                      <ButtonGroup>
                <Button
                  color="success"
                  onClick={()=>{
                    editarProducto(val);
                  }}
                >Editar</Button>
                <Button
                  color="danger"
                  onClick={() =>{
                    deleteProducto(val);
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

export default Producto;
