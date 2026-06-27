const carrito = JSON.parse(localStorage.getItem("reserva")) || [];
console.log(carrito);

function mostrarCarrito(carrito) { 
    const contenedor = document.getElementById("carrito");
    for (const elemento of carrito) {
        const card = document.createElement("article");
        card.classList.add("product-card");
        card.innerHTML = `
        <img src="${elemento.imagen}" width="200" height="200">
          <h3>Hotel: ${elemento.nombre}</h3>
          <p>Precio: $${elemento.precio}</p>
          <p>Ciudad: ${elemento.ciudad}</p>
        `;  
        contenedor.appendChild(card);
    }
}

mostrarCarrito(carrito);

