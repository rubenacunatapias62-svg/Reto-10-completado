let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


let visitas = localStorage.getItem("visitas") || 0;
visitas++;
localStorage.setItem("visitas", visitas);


function actualizarContadorCarrito() {
  let totalCantidad = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  let contador = document.getElementById("contadorCarrito");
  if (contador) {
    contador.textContent = totalCantidad;
  }
}


function agregarCarrito(nombre, precio) {

  let producto = carrito.find(p => p.nombre === nombre);

  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();

  alert("Producto agregado 🛒");
}


function mostrarCarrito() {

  let tabla = document.getElementById("tablaCarrito");
  if (!tabla) return;

  tabla.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {

    let fila = document.createElement("tr");

    fila.innerHTML = `
    <td>${producto.nombre}</td>
    <td>$${producto.precio}</td>
    <td>${producto.cantidad}</td>
    <td><button onclick="eliminarProducto(${index})">❌</button></td>
    `;

    tabla.appendChild(fila);

    total += producto.precio * producto.cantidad;
  });

  let totalElemento = document.getElementById("total");
  if (totalElemento) {
    totalElemento.textContent = "Total: $" + total;
  }
}


function eliminarProducto(index) {

  if (carrito[index].cantidad > 1) {
    carrito[index].cantidad--;
  } else {
    carrito.splice(index, 1);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarContadorCarrito();
  mostrarCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  carrito = [];
  actualizarContadorCarrito();
  mostrarCarrito();
}

function buscarProducto() {
  let input = document.getElementById("buscador").value.toLowerCase();
  let productos = document.querySelectorAll(".producto");

  productos.forEach(producto => {
    let texto = producto.innerText.toLowerCase();
    producto.style.display = texto.includes(input) ? "block" : "none";
  });
}


function filtrarCategoria() {
  let categoria = document.getElementById("filtroCategoria").value;
  let productos = document.querySelectorAll(".producto");

  productos.forEach(producto => {
    let nombre = producto.querySelector("h3").innerText.toLowerCase();

    if (categoria === "todos") {
      producto.style.display = "block";
    } else {
      producto.style.display = nombre.includes(categoria) ? "block" : "none";
    }
  });
}


function finalizarCompra() {

  if (carrito.length === 0) {
    alert("Carrito vacío ❌");
    return;
  }

  fetch("http://localhost:3000/pedido", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      productos: carrito,
      total: carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0)
    })
  })
  .then(res => res.json())
  .then(data => {
    alert("Pedido enviado correctamente ✅");
    vaciarCarrito();
  })
  .catch(() => {
    alert("Error ❌");
  });
}



document.addEventListener("DOMContentLoaded", () => {

  mostrarCarrito();
  actualizarContadorCarrito();

  let contador = document.getElementById("contadorVisitas");
  if (contador) {
    contador.textContent = "Visitas: " + visitas;
  }

});