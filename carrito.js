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
    const total = carrito.reduce((acumulador, hotel) => {
        return acumulador + hotel.precio;
    }, 0);

    const totalHTML = document.createElement("h2");
    totalHTML.textContent = `Total de la reserva: USD ${total}`;

    contenedor.appendChild(totalHTML);

}



mostrarCarrito(carrito);

const botonFinalizar = document.getElementById("finalizarReserva");

botonFinalizar.addEventListener("click", () => {

    Swal.fire({
        title: "¡Reserva finalizada!",
        text: "Gracias por elegir Hixton Hoteles.",
        icon: "success"
    }).then(() => {

        localStorage.removeItem("reserva");

        window.location.href = "index.html";

    });

});

