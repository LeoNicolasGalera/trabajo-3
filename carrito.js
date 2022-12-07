let tarjetas = document.getElementById("tarjetas");
let cantidad = document.getElementById("cantidad");
let precioTotal = document.getElementById("precioTotal");
let cantidadTotal = document.getElementById("cantidadTotal");
let tarjetacarrito = document.getElementById("tarjetacarrito");
let botonVaciar = document.getElementById("vaciar-carrito");

let contador = document.getElementById("contador");
let carrito = [];

document.addEventListener("", () => {
  localStorage.getItem("carrito");
  carrito = JSON.parse(localStorage.getItem("carrito"));
  actualizarCarrito();
});
botonVaciar.addEventListener("click", () => {
  carrito.length = 0;
  actualizarCarrito();
  localStorage.removeItem("carrito");
});
usuarios.forEach((producto) => {
  let tarjetacompra = document.createElement("div");
  tarjetacompra.classList.add("producto");
  tarjetacompra.innerHTML = `
  
    <h3>${producto.nombre}</h3>
    <p>Talle: ${producto.talle}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `;
  tarjetas.appendChild(tarjetacompra);

  let botonagregar = document.getElementById(`agregar${producto.id}`);
  botonagregar.addEventListener("click", () => {
    agregar(producto.id);
  });
});

const agregar = (producto) => {
  let existe = carrito.some((prod) => prod.id === producto);
  if (existe) {
    let prod = carrito.map((prod) => {
      if (prod.id === producto) {
        prod.cantidad++;
      }
    });
  } else {
    const item = usuarios.find((prod) => prod.id === producto);
    carrito.push(item);
  }
  actualizarCarrito();
};

const actualizarCarrito = () => {
  tarjetacarrito.innerHTML = "";

  carrito.forEach((prod) => {
    let div = document.createElement("div");
    div.className = "productoEnCarrito";
    div.innerHTML = `
          <p>${prod.nombre}</p>
          <p>Precio:$${prod.precio}</p>
          <p>talle:${prod.talle}</p>
          <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
          `;

    tarjetacarrito.appendChild(div);

    localStorage.setItem("carrito", carrito);
    JSON.stringify(carrito);

    contador.innerText = carrito.length;
  });
  precioTotal.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
};
