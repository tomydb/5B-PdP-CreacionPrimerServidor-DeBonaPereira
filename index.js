const MySQL = require('./modulos/mysql.js');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

app.listen(port,function(){
    console.log(`Server running in http://localhost:${port}`);
    console.log('Defined routes:');
    console.log('   [GET] http://localhost:3000/');
});

app.get('/saludo', function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
    res.send(`Hola ${req.query.nombre}, que tal?`)
})

app.post('/nombreDelPedido', function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    res.send("ok")
})

/* Ejercicio 2: */
app.get('/obtenerPilotos', async function(req,res){
    console.log(req.query)
    const respuesta = await MySQL.realizarQuery(`
    SELECT * FROM Pilotos;
    `)
    console.log({respuesta})
    res.send(respuesta)
})

app.get('/obtenerCircuitos', async function(req,res){
    console.log(req.query)
    const respuesta = await MySQL.realizarQuery(`
    SELECT * FROM Circuitos;
    `)
    console.log({respuesta})
    res.send(respuesta)
})

app.get('/obtenerPilotosPorAuto', async function(req,res){
    console.log(req.query)
    const respuesta = await MySQL.realizarQuery(`
    SELECT * FROM PilotosPorAuto;
    `)
    console.log({respuesta})
    res.send(respuesta)
})

app.get('/obtenerAutos', async function(req,res){
    console.log(req.query)
    const respuesta = await MySQL.realizarQuery(`
    SELECT * FROM Autos;
    `)
    console.log({respuesta})
    res.send(respuesta)
})

/* Ejercicio 3:
En la URL:
http://localhost:3000/obtenerAutos?marca=Volkswagen
http://localhost:3000/obtenerPilotosPorAuto?cant_butacas=5
http://localhost:3000/obtenerCircuitos?ciudad=Río Gallegos
http://localhost:3000/Pilotos?residencia=Buenos Aires
*/

/* Ejercicio 4: En principio: 

Pedido POST 1) */
app.post('/insertarAuto', async function(req, res){
    console.log(req.body)
await MySQL.realizarQuery(`INSERT INTO Autos (marca, modelo, cant_pasajeros, kit_seguridad)
VALUES ('${req.body.marca}', '${req.body.modelo}', '${req.body.cant_pasajeros}', ${req.body.kit_seguridad})`);
    res.send("ok")
})

/* Pedido POST 2) */
app.post('/insertarCircuito', async function(req, res){
    console.log(req.body)
await MySQL.realizarQuery(`INSERT INTO Circuitos (nombre, pais, ciudad, km_totales, cant_espectadores, cant_autos)
VALUES ('${req.body.nombre}', '${req.body.pais}', '${req.body.ciudad}', '${req.body.km_totales}', '${req.body.cant_espectadores}', ${req.body.cant_autos})`);
    res.send("ok")
})

/* Pedido POST 3) */
app.post('/insertarPiloto', async function(req, res){
    console.log(req.body)
await MySQL.realizarQuery(`INSERT INTO Pilotos (nombre, apellido, origen, residencia, id_circuito)
VALUES ('${req.body.nombre}', '${req.body.apellido}', '${req.body.origen}', '${req.body.residencia}', ${req.body.id_circuito})`);
    res.send("ok")
})

/* Pedido POST 4) */
app.post('/insertarPilotoPorAuto', async function(req, res){
    console.log(req.body)
await MySQL.realizarQuery(`INSERT INTO PilotosPorAuto (id_auto, id_piloto, cant_butacas)
VALUES ('${req.body.id_auto}', '${req.body.id_piloto}', ${req.body.cant_butacas})`);
    res.send("ok")
})

/* Luego, dentro del RapidApi se hizo esto:

Pedido POST 1)
-Como dirección del Post se puso: http://localhost:3000/insertarAuto
-En el Body, formato JSON, se puso esto: 
{
  "marca": "Ford",
  "modelo": "Fiesta",
  "cant_pasajeros": 2,
  "kit_seguridad": 1
}

Pedido POST 2)
-Como dirección del Post se puso: http://localhost:3000/insertarCircuito
-En el Body, formato JSON, se puso esto: 
{
  "nombre": "Villa Carlos Paz",
  "pais": "Argentina",
  "ciudad": "Villa Carlos Paz",
  "km_totales": 50,
  "cant_espectadores": 75000,
  "cant_autos": 12
}

Pedido POST 3)
-Como dirección del Post se puso: ​http://localhost:3000/insertarPiloto
-En el Body, formato JSON, se puso esto:
{
  "nombre": "Federico",
  "apellido": "Villagra",
  "origen": "Argentina",
  "residencia": "Buenos Aires",
  "id_circuito": 2
}

Pedido POST 4)
-Como dirección del Post se puso: http://localhost:3000/insertarPilotoPorAuto
-En el Body, formato JSON, se puso esto:
{
  "id_auto": 8,
  "id_piloto": 16,
  "cant_butacas": 5
}
*/

/* Ejercicio 5:
Pedido PUT 1)*/

app.put('/actualizarPiloto', async function(req, res){
    console.log(req.body)
    await MySQL.realizarQuery(`UPDATE Pilotos SET nombre='${req.body.nombre}', apellido='${req.body.apellido}', origen='${req.body.origen}', residencia='${req.body.residencia}', id_circuito=${req.body.id_circuito} WHERE id_piloto='${req.body.id_piloto}'`);
    res.send("ok");
})

/*Pedido PUT 2)*/
app.put('/actualizarAuto', async function(req, res){
    console.log(req.body)
    await MySQL.realizarQuery(`UPDATE Autos SET marca='${req.body.marca}', modelo='${req.body.modelo}', cant_pasajeros='${req.body.cant_pasajeros}', kit_seguridad=${req.body.kit_seguridad} WHERE id_auto='${req.body.id_auto}'`);
    res.send("ok");
})

/*Pedido PUT 3)*/
app.put('/actualizarCircuito', async function(req, res){
    console.log(req.body)
    await MySQL.realizarQuery(`UPDATE Circuitos SET nombre='${req.body.nombre}', pais='${req.body.pais}', ciudad='${req.body.ciudad}', km_totales='${req.body.km_totales}', cant_espectadores='${req.body.cant_espectadores}', cant_autos=${req.body.cant_autos} WHERE id_circuito='${req.body.id_circuito}'`);
    res.send("ok");
})

/*Pedido PUT 4)*/
app.put('/actualizarPilotoPorAuto', async function(req, res){
    console.log(req.body)
    await MySQL.realizarQuery(`UPDATE PilotosPorAuto SET cant_butacas=${req.body.cant_butacas} WHERE id_auto='${req.body.id_auto}' AND id_piloto='${req.body.id_piloto}'`);
    res.send("ok");
})

/* -En el Body, formato JSON, se puso esto:
Pedido PUT 1)
{
  "id_piloto": 1,
  "nombre": "Juan",
  "apellido": "Sánchez",
  "origen": "Uruguay",
  "residencia": "Canelones",
  "id_circuito": 3
}

Pedido PUT 2)
{
  "id_auto": 8,
  "marca": "Skoda",
  "modelo": "Fabia",
  "cant_pasajeros": 2,
  "kit_seguridad": 1
}
Pedido PUT 3)
{
  "id_circuito": 6,
  "nombre": "El Cóndor - Copina",
  "pais": "Argentina",
  "ciudad": "Valle Traslasierra",
  "km_totales": 56,
  "cant_espectadores": 25000,
  "cant_autos": 12
}

Pedido PUT 4)
{
  "id_auto": 3,
  "id_piloto": 2,
  "cant_butacas": 2
}
*/

/* Ejercicio 6:
Pedido DELETE 1) */

app.delete('/borrarPiloto', async function(req, res){
    console.log(req.body)
    await MySQL.realizarQuery(`DELETE FROM Pilotos WHERE id_piloto='${req.body.id_piloto}'`);
    res.send("ok");
})

/* Pedido DELETE 2) */

app.delete('/borrarAuto', async function(req, res){
    console.log(req.body)
    await MySQL.realizarQuery(`DELETE FROM Autos WHERE id_auto='${req.body.id_auto}'`);
    res.send("ok");
})

/* Pedido DELETE 3) */

app.delete('/borrarCircuito', async function(req, res){
    console.log(req.body)
    await MySQL.realizarQuery(`DELETE FROM Circuitos WHERE id_circuito='${req.body.id_circuito}'`);
    res.send("ok");
})

/* Pedido DELETE 4) */

app.delete('/borrarPilotoPorAuto', async function(req, res){
    console.log(req.body)
    await MySQL.realizarQuery(`DELETE FROM PilotosPorAuto WHERE id_piloto='${req.body.id_piloto}' AND id_auto='${req.body.id_auto}' `);
    res.send("ok");
})

/* -En el Body, formato JSON, se puso esto:
Pedido DELETE 1)
{
  "id_piloto": 15
}
Pedido DELETE 2)
{
  "id_auto": 7
}
Pedido DELETE 3)
{
  "id_circuito": 7
}
Pedido DELETE 4)
{
  "id_piloto": 16,
  "id_auto": 8
}
*/

/* Ejercicio 7 
Pedido POST CON IF*/
app.post('/insertarAutoIf', async function(req, res){
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const cantPasajeros = req.body.cant_pasajeros;
    const kitSeguridad = req.body.kit_seguridad;

    const existingData = await MySQL.realizarQuery(`SELECT * FROM Autos WHERE marca='${marca}' AND modelo='${modelo}' AND cant_pasajeros='${cantPasajeros}' AND kit_seguridad=${kitSeguridad}`);

    if (existingData.length > 0) {
        res.status(400).send("Duplicate entry");
    } else {
        await MySQL.realizarQuery(`INSERT INTO Autos (marca, modelo, cant_pasajeros, kit_seguridad)
        VALUES ('${marca}', '${modelo}', '${cantPasajeros}', ${kitSeguridad})`);
        res.send("ok");
    }
});

app.post('/insertarCircuitoIf', async function(req, res){
    const nombre = req.body.nombre;
    const pais = req.body.pais;
    const ciudad = req.body.ciudad;
    const km_totales = req.body.km_totales;
    const cant_espectadores = req.body.cant_espectadores;
    const cant_autos = req.body.cant_autos;

    const existingData = await MySQL.realizarQuery(`SELECT * FROM Circuitos WHERE nombre='${nombre}' AND pais='${pais}' AND ciudad='${ciudad}' AND km_totales='${km_totales}' AND cant_espectadores='${cant_espectadores}' AND cant_autos=${cant_autos}`) ;

    if (existingData.length > 0) {
        res.status(400).send("Duplicate entry");
    } else {
        await MySQL.realizarQuery(`INSERT INTO Circuitos (nombre, pais, ciudad, km_totales, cant_espectadores, cant_autos)
        VALUES ('${nombre}', '${pais}', '${ciudad}', '${km_totales}', '${cant_espectadores}', ${cant_autos})`);
        res.send("ok")
    }
})

app.post('/insertarPilotoIf', async function(req, res){
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const origen = req.body.origen;
    const residencia = req.body.residencia;

    const existingData = await MySQL.realizarQuery(`SELECT * FROM Pilotos WHERE nombre='${nombre}' AND apellido='${apellido}' AND origen='${origen}' AND residencia='${residencia}'`) ;

    if (existingData.length > 0) {
        res.status(400).send("Duplicate entry");
    } else {
        await MySQL.realizarQuery(`INSERT INTO Pilotos (nombre, apellido, origen, residencia)
        VALUES ('${nombre}', '${apellido}', '${origen}', ${residencia})`);
        res.send("ok")
        }
})

app.post('/insertarPilotoPorAutoIf', async function(req, res){
    const id_auto = req.body.id_auto;
    const id_piloto = req.body.id_piloto;
    const cant_butacas = req.body.cant_butacas;

    const existingData = await MySQL.realizarQuery(`SELECT * FROM PilotosPorAuto WHERE id_auto='${id_auto}' AND id_piloto='${id_piloto}' AND cant_butacas=${cant_butacas}`) ;

    if (existingData.length > 0) {
        res.status(400).send("Duplicate entry");
    } else {
        await MySQL.realizarQuery(`INSERT INTO PilotosPorAuto (id_auto, id_piloto, cant_butacas)
        VALUES ('${id_auto}', '${id_piloto}', ${cant_butacas})`);
        res.send("ok")
        }
})