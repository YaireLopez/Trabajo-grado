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
    const nombre_Proveedor = req.body.nombre_Proveedor;
    const Telefono1 = req.body.Telefono1;
    const Telefono2 = req.body.Telefono2;
    const direc_prov = req.body.direc_prov;
    const ciudad = req.body.ciudad;
    const descripcion_Prov = req.body.descripcion_Prov;

    db.query('INSERT INTO proveedor(nombre_Proveedor,Telefono1,Telefono2,direc_prov,ciudad,descripcion_Prov) VALUES(?,?,?,?,?,?)', [nombre_Proveedor,Telefono1,Telefono2,direc_prov,ciudad,descripcion_Prov],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.post("/grid",(req,res)=>{
    const fecha_prod = req.body.fecha_prod;
    const nombre_prod = req.body.nombre_prod;
    const descripcion_prod = req.body.descripcion_prod;

    db.query('INSERT INTO producto(fecha_prod,nombre_prod,descripcion_prod) VALUES(?,?,?)', [fecha_prod,nombre_prod,descripcion_prod],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.post("/Alerts",(req,res)=>{
    const Nombre_Pers = req.body.Nombre_Pers;
    const Cargo = req.body.Cargo;

    db.query('INSERT INTO personal(Nombre_Pers,Cargo) VALUES(?,?)', [Nombre_Pers,Cargo],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.post("/Tables",(req,res)=>{
    const nom_CatMov = req.body.nom_CatMov;
    const descripcion_CatMov = req.body.descripcion_CatMov;

    db.query('INSERT INTO categmov(nom_CatMov,descripcion_CatMov) VALUES(?,?)', [nom_CatMov,descripcion_CatMov],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.post("/Cards",(req,res)=>{
    const id_producto_Mov = req.body.id_producto_Mov;
    const id_CatMov_Mov = req.body.id_CatMov_Mov;
    const fecha_Mov = req.body.fecha_Mov;
    const cant_Mov = req.body.cant_Mov;
    const val_unidad_Mov = req.body.val_unidad_Mov;
    const val_Total_Mov = req.body.val_Total_Mov;
    const id_prov_Mov = req.body.id_prov_Mov;
    const id_TipoMov_Mov = req.body.id_TipoMov_Mov;
    const id_personalMov = req.body.id_personalMov;

    db.query('INSERT INTO movimiento(id_producto_Mov,id_CatMov_Mov,fecha_Mov,cant_Mov,val_unidad_Mov,val_Total_Mov,id_prov_Mov,id_TipoMov_Mov,id_personalMov) VALUES(?,?,?,?,?,?,?,?,?)', [id_producto_Mov,id_CatMov_Mov,fecha_Mov,cant_Mov,val_unidad_Mov,val_Total_Mov,id_prov_Mov,id_TipoMov_Mov,id_personalMov],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.get("/infoProyecto",(req,res)=>{
    db.query('SELECT * FROM proyecto',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.get("/infoProveedor",(req,res)=>{
    db.query('SELECT * FROM proveedor',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.get("/infoProducto",(req,res)=>{
    db.query('SELECT * FROM producto',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.get("/infoPersonal",(req,res)=>{
    db.query('SELECT * FROM personal',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.get("/infoCatMovimiento",(req,res)=>{
    db.query('SELECT * FROM categmov',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.get("/infoTipoMovimiento",(req,res)=>{
    db.query('SELECT * FROM tipomov',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.get("/infoMovimiento",(req,res)=>{
    db.query('SELECT * FROM movimiento',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.put("/updateProveedor",(req,res)=>{

    const id_proveedor = req.body.id_proveedor;
    const nombre_Proveedor = req.body.nombre_Proveedor;
    const Telefono1 = req.body.Telefono1;
    const Telefono2 = req.body.Telefono2;
    const direc_prov = req.body.direc_prov;
    const ciudad = req.body.ciudad;
    const descripcion_Prov = req.body.descripcion_Prov;

    db.query('UPDATE proveedor SET nombre_Proveedor=?,Telefono1=?,Telefono2=?,direc_prov=?,ciudad=?,descripcion_Prov=? WHERE id_proveedor=?', [nombre_Proveedor,Telefono1,Telefono2,direc_prov,ciudad,descripcion_Prov,id_proveedor],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.put("/updateProyecto",(req,res)=>{

    const id_Proyecto = req.body.id_Proyecto;
    const nombre_proy = req.body.nombre_proy;
    const administrador_proy = req.body.administrador_proy;
    const Fecha_crea_Proy = req.body.Fecha_crea_Proy;
    const descripcion_proy = req.body.descripcion_proy;

    db.query('UPDATE proyecto SET nombre_proy=?,administrador_proy=?,Fecha_crea_Proy=?,descripcion_proy=? WHERE id_Proyecto=?', [nombre_proy,administrador_proy,Fecha_crea_Proy,descripcion_proy,id_Proyecto],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.put("/updateProducto",(req,res)=>{

    const id_Producto = req.body.id_Producto;
    const fecha_prod = req.body.fecha_prod;
    const nombre_prod = req.body.nombre_prod;
    const descripcion_prod = req.body.descripcion_prod;

    db.query('UPDATE producto SET fecha_prod=?,nombre_prod=?,descripcion_prod=? WHERE id_Producto=?', [fecha_prod,nombre_prod,descripcion_prod,id_Producto],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.put("/updatePersonal",(req,res)=>{

    const id_Personal = req.body.id_Personal;
    const Nombre_Pers = req.body.Nombre_Pers;
    const Cargo = req.body.Cargo;

    db.query('UPDATE personal SET Nombre_Pers=?,Cargo=? WHERE id_Personal=?', [Nombre_Pers,Cargo,id_Personal],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.put("/updateCatMovimiento",(req,res)=>{
    const id_CatMov = req.body.id_CatMov;
    const nom_CatMov = req.body.nom_CatMov;
    const descripcion_CatMov = req.body.descripcion_CatMov;

    db.query('UPDATE categmov SET nom_CatMov=?,descripcion_CatMov=? WHERE id_CatMov=?', [nom_CatMov,descripcion_CatMov,id_CatMov],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.put("/updateMovimiento",(req,res)=>{
    const id_Movimiento = req.body.id_CatMov;
    const fecha_Mov = req.body.fecha_Mov;
    const cant_Mov = req.body.cant_Mov;
    const val_unidad_Mov = req.body.val_unidad_Mov;
    const val_Total_Mov = req.body.val_Total_Mov;

    db.query('UPDATE movimiento SET fecha_Mov=?,cant_Mov=?,val_unidad_Mov=?,val_Total_Mov=? WHERE id_Movimiento=?', [fecha_Mov,cant_Mov,val_unidad_Mov,val_Total_Mov,id_Movimiento],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.delete("/deleteProveedor/:id_proveedor",(req,res)=>{

    const id_proveedor = req.params.id_proveedor;

    db.query('DELETE FROM proveedor WHERE id_proveedor=?',id_proveedor,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.delete("/deleteProducto/:id_Producto",(req,res)=>{

    const id_Producto = req.params.id_Producto;

    db.query('DELETE FROM producto WHERE id_Producto=?',id_Producto,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.delete("/deletePersonal/:id_Personal",(req,res)=>{

    const id_Personal = req.params.id_Personal;

    db.query('DELETE FROM personal WHERE id_Personal=?',id_Personal,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.delete("/deleteCatMovimiento/:id_CatMov",(req,res)=>{

    const id_CatMov = req.params.id_CatMov;

    db.query('DELETE FROM categmov WHERE id_CatMov=?',id_CatMov,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.delete("/deleteMovimiento/:id_Movimiento",(req,res)=>{

    const id_Movimiento= req.params.id_Movimiento;

    db.query('DELETE FROM movimiento WHERE id_Movimiento=?',id_Movimiento,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001")
})