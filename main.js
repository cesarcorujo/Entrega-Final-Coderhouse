const contenedorHoteles = document.getElementById("contenedorHoteles");
const buscador = document.getElementById("buscador");
const filtroCiudad = document.getElementById("filtroCiudad");
const ordenarPrecio = document.getElementById("ordenPrecio");

let hoteles = [];
let reserva = [];

async function cargarHoteles() {

    const respuesta = await fetch("hoteles.json");

    hoteles = await respuesta.json();

    mostrarHoteles(hoteles);

    cargarCiudades();

    document.getElementById("cantidadHoteles").textContent = hoteles.length;

}

cargarHoteles();

function mostrarHoteles(lista) {

    contenedorHoteles.innerHTML = "";

    lista.forEach(hotel => {

        contenedorHoteles.innerHTML += `
            <div class="card">

            <img src="${hotel.imagen}" alt="${hotel.nombre}">

                <h3>${hotel.nombre}</h3>

                <p>${hotel.ciudad}</p>

                <p>USD ${hotel.precio}</p>

                <button onclick="reservarHotel(${hotel.id})">
                    Reservar
                </button>

            </div>
        `;

    });

    document.getElementById("cantidadHoteles").textContent = lista.length;

}

function reservarHotel(id){

    const hotel = hoteles.find(h => h.id === id);

    reserva.push(hotel);

    localStorage.setItem("reserva", JSON.stringify(reserva));

    actualizarReserva();

}

function actualizarReserva(){

    let total = 0;

    reserva.forEach(hotel =>{

        total += hotel.precio;

    });

    document.getElementById("totalReserva").textContent = total;
  
    document.getElementById("cantidadReservas").textContent = reserva.length;

}

const total = reserva.reduce((acumulador, hotel)=>{

    return acumulador + hotel.precio;

},0);

buscador.addEventListener("input", ()=>{

    const texto = buscador.value.toLowerCase();

    const resultado = hoteles.filter(hotel =>

        hotel.nombre.toLowerCase().includes(texto)

    );

    mostrarHoteles(resultado);

});

filtroCiudad.addEventListener("change", ()=>{

    const ciudad = filtroCiudad.value;

    if(ciudad === ""){

        mostrarHoteles(hoteles);

    }else{

        const resultado = hoteles.filter(hotel => hotel.ciudad === ciudad);

        mostrarHoteles(resultado);

    }

});

function cargarCiudades() {

    hoteles.forEach(hotel => {

        filtroCiudad.innerHTML += `
            <option value="${hotel.ciudad}">
                ${hotel.ciudad}
            </option>
        `;

    });

}

ordenarPrecio.addEventListener("change", ()=>{

    let copia = [...hoteles];

    if(ordenarPrecio.value === "asc"){

        copia.sort((a,b)=>a.precio-b.precio);

    }else{

        copia.sort((a,b)=>b.precio-a.precio);

    }

    mostrarHoteles(copia);

});

localStorage.setItem("reserva", JSON.stringify(reserva));



const datos = localStorage.getItem("reserva");

if(datos){

    reserva = JSON.parse(datos);

    actualizarReserva();

}

const botonConfirmar = document.getElementById("confirmarReserva");

botonConfirmar.addEventListener("click", () => {

    if (reserva.length === 0) {

        Swal.fire({
            title: "No hay hoteles seleccionados",
            text: "Agrega un hotel antes de confirmar.",
            icon: "warning"
        });

    } else {

        Swal.fire({
            title: "¡Reserva realizada!",
            text: "Gracias por reservar con nosotros.",
            icon: "success"
        }).then(() => {
            window.location.href = "carrito.html";
        });

    }

});