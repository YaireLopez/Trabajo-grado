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



const Endproject = () => {
 
  return ( 
    <div className="Forms">
      <div className="Registrar Producto">
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Finalizar proyecto
          </CardTitle>
          <CardBody>
            <Form>
            
            </Form>
          </CardBody>
        </Card>



      </Col>
    </Row>
    </div>
    </div>
  );
};

export default Endproject;
