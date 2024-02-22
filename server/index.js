const express = require("express");
const app = express();
const mysql = require("mysql");
app.use(express.json());
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"db_tgproyecto"
});

app.post("/forms",(req,res)=>{
    const nombre_proy = req.body.nombre_proy;
    const administrador_proy = req.body.administrador_proy;
    //const Fecha_crea_Proy = req.body.Fecha_crea_Proy;
    const descripcion_proy = req.body.descripcion_proy;

    db.query('INSERT INTO Proyecto(nombre_proy,administrador_proy,descripcion_proy) VALUES(?,?,?)', [nombre_proy,administrador_proy,descripcion_proy],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Proyecto creado con éxito");
        }
    }
    );
});

app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001")
})