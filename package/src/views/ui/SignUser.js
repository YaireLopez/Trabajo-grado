import React from 'react';
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



const Signuser = () => {
  
  
 

  return ( 
    <div className="Forms">
      <div className="Registrar usuario">
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Registrar usuario
          </CardTitle>
          <CardBody>
            <Form>
            
              
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
                  <th>Nombre del usuario</th>
                  <th>Numero de identificacion</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
 
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

export default Signuser;
