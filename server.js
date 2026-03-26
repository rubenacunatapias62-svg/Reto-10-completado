// server.js

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


let productos = [
  { id: 1, nombre: "Camiseta Básica", precio: 40000 },
  { id: 2, nombre: "Sudadera", precio: 65000 },
  { id: 3, nombre: "Chaqueta", precio: 90000 },
  { id: 4, nombre: "Jeans", precio: 75000 },
  { id: 5, nombre: "Vestido", precio: 80000 },
  { id: 6, nombre: "Blusa", precio: 55000 }
];

let pedidos = [];


app.get("/productos", (req, res) => {
  res.json(productos);
});


app.post("/pedido", (req, res) => {
  const pedido = req.body;

  pedidos.push(pedido);

  res.json({
    mensaje: "Pedido recibido correctamente ✅",
    pedido
  });
});

app.get("/pedidos", (req, res) => {
  res.json(pedidos);
});


app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});