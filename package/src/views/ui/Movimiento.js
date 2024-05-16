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


const Movimiento = () => {

  const [InfoCatMovimientoList,setInfoCatMovimiento] = useState([]);
  const [InfoTipoMovimientoList,setInfoTipoMovimiento] = useState([]);
  const [InfoProductoList,setInfoProducto] = useState([]);
  const [InfoPersonalList,setInfoPersonal] = useState([]);
 const [InfoProveedorList,setInfoProveedor] = useState([]);

  const [InfoMovimientoList,setInfoMovimiento] = useState([]);
  const [id_producto_Mov,setid_producto_Mov] = useState();
  const [id_CatMov_Mov,setid_CatMov_Mov] = useState();
  const [id_TipoMov_Mov,setid_TipoMov_Mov] = useState();
  const [fecha_Mov,setfecha_Mov] = useState("");
  const [cant_Mov,setcant_Mov] = useState();
  const [val_unidad_Mov,setval_unidad_Mov] = useState();
  const [val_Total_Mov,setval_Total_Mov] = useState();
  const [id_personalMov,setid_personalMov] = useState();
  const [id_prov_Mov,setid_prov_Mov] = useState();
  const [comentarioMov,setcomentarioMov] = useState();
  /*const [id_usurio_Mov,setid_usurio_Mov] = useState();*/
  const [id_Movimiento,setid_Movimiento] = useState();
  
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
  useEffect(()=>{
    fetch('http://localhost:3001/infoTipoMovimiento')
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
      setInfoTipoMovimiento(data);
    });
  },[]);
  useEffect(()=>{
    fetch('http://localhost:3001/infoMovimiento')
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
      setInfoMovimiento(data);
    });
  },[]);
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
    setid_TipoMov_Mov("");
    setid_CatMov_Mov("");
    setid_producto_Mov("");
    setid_prov_Mov("");
    setid_personalMov("");
    setcomentarioMov("");
    setfecha_Mov("");
    setcant_Mov(0);
    setval_unidad_Mov(0);
    setval_Total_Mov(0);
    setEditar(false);
  }

  const add = ()=>{
    fetch("http://localhost:3001/Movimiento",{
      method: "POST",
      body: JSON.stringify({
        id_TipoMov_Mov,
        id_CatMov_Mov,
        id_producto_Mov,
        id_prov_Mov,
        id_personalMov,
        fecha_Mov,
        cant_Mov,
        val_unidad_Mov,
        val_Total_Mov,
        comentarioMov,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(()=>{
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Excelente!</strong>",
        html: "<i>El movimiento <strong> </strong>fue registrado con éxito</i>",
        icon: 'success',
        timer:3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró registrar el movimiento",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  }

  const update = id =>{
    const movimiento = InfoMovimientoList.find(movimiento => movimiento.id_Movimiento === id)

    fetch(`http://localhost:3001/infoMovimiento/${id_Movimiento}`,{
      method: "PUT",
      body: JSON.stringify(movimiento),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(()=>{
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Actualización Exitosa!</strong>",
        html: "<i>El movimiento <strong> </strong>fue actualizado con éxito</i>",
        icon: 'success',
        timer:3000
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró editar el movimiento",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  }

  const deleteMovimiento = (val)=>{
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
        Axios.delete(`http://localhost:3001/deleteMovimiento/${val.id_Movimiento}`).then(()=>{
        limpiarCampos();
        swalWithBootstrapButtons.fire({
          title: "¡Eliminado!",
          html: "<i>El movimeinto <strong> </strong>fue eliminado con éxito</i>",
          icon: "success",
          timer:3000
        });
      }).catch(function(error){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logró eliminar el movimiento",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
        });
      })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          html: "<i>El movimiento <strong> </strong>aún está en la lista</i>",
          icon: "error",
          timer:3000
        });
      }
    });
    
  }

  const editarMovimiento =(val)=>{
    setEditar(true);
    setid_TipoMov_Mov(val.id_TipoMov_Mov);
    setid_CatMov_Mov(val.id_CatMov_Mov);
    setid_producto_Mov(val.id_producto_Mov);
    setid_prov_Mov(val.id_prov_Mov);
    setid_personalMov(val.id_personalMov);
    setcomentarioMov(val.comentarioMov);
    setfecha_Mov(val.fecha_Mov);
    setcant_Mov(val.cant_Mov);
    setval_unidad_Mov(val.val_unidad_Mov);
    setval_Total_Mov(val.val_Total_Mov);
    setid_Movimiento(val.id_Movimiento);
  }
  
  return ( 
    <div className="Forms">
      <div className="Registrar Movimiento">
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Registrar Movimiento
          </CardTitle>
          <CardBody>
            <Form>
              {<FormGroup>
                <Label for="id_TipoMov_Mov">Elija tipo de movimiento</Label>
                <select value={InfoTipoMovimientoList.id_TipoMov} onChange={(event)=>{
                  setid_TipoMov_Mov(event.target.value);
                }}>
                  {
                    InfoTipoMovimientoList.map(option=>(
                      <option value={option.id_TipoMov}>{option.nom_TipoMov}-{option.descripcion_TipoMov}</option>
                    ))
                  }
                  </select>
            </FormGroup>}  
            
             <FormGroup>
                <Label for="id_CatMov_Mov">Categoría del movimiento</Label>
                <select value={InfoCatMovimientoList.id_CatMov} onChange={(event)=>{
                  setid_CatMov_Mov(event.target.value);
                }}>
                  {
                    InfoCatMovimientoList.map(option=>(
                      <option value={option.id_CatMov}>{option.nom_CatMov}</option>
                    ))
                  }
                  </select>
            </FormGroup> 
            
            { <FormGroup>
              <Label for="id_producto_Mov">Elija el Producto relacionado</Label>
              <select value={id_producto_Mov} onChange={(event)=>{
                setid_producto_Mov(event.target.value);
              }}>
                {
                  InfoProductoList.map(option=>(
                    <option key={option.id_Producto} value={option.id_Producto}>{option.nombre_prod}-{option.descripcion_prod}</option>
                  ))
                }
                </select>
                <Label for="id_prov_Mov">Elija el Proveedor</Label>
              <select value={id_prov_Mov} onChange={(event)=>{
                setid_prov_Mov(event.target.value);
              }}>
                {
                  InfoProveedorList.map(option=>(
                    <option key={option.id_proveedor} value={option.id_proveedor}>{option.nombre_Proveedor}</option>
                  ))
                }
                </select>
          </FormGroup>}
            
            
          {<FormGroup>
              <Label for="id_personalMov">Elija a la persona</Label>
              <select value={id_personalMov} onChange={(event)=>{
                setid_personalMov(event.target.value);
              }}>
                {
                  InfoPersonalList.map(option=>(
                    <option key={option.id_Personal} value={option.id_Personal}>{option.Nombre_Pers}-{option.Cargo}</option>
                  ))
                }
                </select>
          </FormGroup>}
           
                 
            <FormGroup>
                <Label for="fecha_Mov">Fecha del movimiento</Label>
                <Input 
                onChange={(event)=>{
                  setfecha_Mov(event.target.value);
                }}id="fecha_Mov" value={fecha_Mov} name="fecha_Mov" type="date" />
            </FormGroup>
              <FormGroup>
                <Label for="cant_Mov">Cantidad de unidades</Label>
                <Input
                onChange={(event)=>{
                  setcant_Mov(event.target.value);
                }}
                id="cant_Mov" value={cant_Mov} name="cant_Mov" type="number" />
              </FormGroup>
              <FormGroup>
                <Label for="val_unidad_Mov">Valor por unidad</Label>
                <Input
                onChange={(event)=>{
                  setval_unidad_Mov(event.target.value);
                }}
                id="val_unidad_Mov" value={val_unidad_Mov} name="val_unidad_Mov" type="number" />
              </FormGroup>
              <FormGroup>
                <Label for="val_Total_Mov">Valor Total del movimiento</Label>
                <Input
                onChange={(event)=>{
                  setval_Total_Mov(event.target.value);
                }}
                id="val_Total_Mov" value={val_Total_Mov} name="val_Total_Mov" type="number" />
              </FormGroup>
              <FormGroup>
            	  <Label for="comentarioMov">Deje un comentario acerca del movimiento</Label>
                <Input
                onChange={(event)=>{
                  setcomentarioMov(event.target.value);
                }}
                id="comentarioMov" value={comentarioMov} name="comentarioMov" type="textarea" />              
          </FormGroup>
              
              {
                editar?
                <div>
                  <Button onClick={update} color="success" className="btnRegistrar m-2">Actualizar Movimiento</Button>
                  <Button onClick={limpiarCampos} color="secondary" className="btnCancelar m-2">Cancelar</Button>
                </div>
                :<Button onClick={add} color="primary" className="btnRegistrar">Registrar Movimiento</Button>
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
                  <th>Fecha del movimiento</th>
                  <th>Cantidad de unidades</th>
                  <th>Valor por unidad</th>
                  <th>Valor total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              {
                    InfoMovimientoList.map((val,key)=>{
                      return <tr key={val.id_Movimiento}>
                      <th>{val.id_Movimiento}</th>
                      <td>{val.fecha_Mov}</td>
                      <td>{val.cant_Mov}</td>
                      <td>{val.val_unidad_Mov}</td>
                      <td>{val.val_Total_Mov}</td>
                      <td>
                      <ButtonGroup>
                      <Button
                  color="success"
                  onClick={()=>{
                    editarMovimiento(val);
                  }}
                >Editar</Button>
                <Button
                  color="danger"
                  onClick={() =>{
                    deleteMovimiento(val);
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
                  <Card>
                    <CardBody>
                    <Table bordered striped>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre de la categoría</th>
                  <th>Descripcion de la categoría</th>
                </tr>
              </thead>
              <tbody>
              {
                    InfoCatMovimientoList.map((val,key)=>{
                      return <tr key={val.id_CatMov}>
                      <th>{val.id_CatMov}</th>
                      <td>{val.nom_CatMov}</td>
                      <td>{val.descripcion_CatMov}</td>
                      
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

export default Movimiento;
