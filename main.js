// Obtengo los elementos del HTML que voy a utilizar

const contenedorHoteles = document.getElementById("contenedorHoteles");
const buscador = document.getElementById("buscador");
const filtroCiudad = document.getElementById("filtroCiudad");
const ordenarPrecio = document.getElementById("ordenPrecio");

// Arrays donde guardo los hoteles y la reserva del usuario

let hoteles = [];
let reserva = [];

// Cargo los hoteles desde el archivo JSON

async function cargarHoteles() {

    const respuesta = await fetch("hoteles.json");

    hoteles = await respuesta.json();

    mostrarHoteles(hoteles);

    cargarCiudades();

    document.getElementById("cantidadHoteles").textContent = hoteles.length;

}

cargarHoteles();

// Función para mostrar los hoteles en la página

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

     // Actualizo la cantidad de hoteles mostrados

    document.getElementById("cantidadHoteles").textContent = lista.length;

}

// Agrego un hotel a la reserva

function reservarHotel(id){

    const hotel = hoteles.find(h => h.id === id);

    reserva.push(hotel);

    localStorage.setItem("reserva", JSON.stringify(reserva));

    actualizarReserva();

}

// Calculo el total de la reserva y actualizo los contadores

function actualizarReserva(){

    let total = 0;

    reserva.forEach(hotel =>{

        total += hotel.precio;

    });

    document.getElementById("totalReserva").textContent = total;
  
    document.getElementById("cantidadReservas").textContent = reserva.length;

}


// Busco hoteles por nombre

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



// Recupero la reserva guardada en LocalStorage

const datos = localStorage.getItem("reserva");

if(datos){

    reserva = JSON.parse(datos);

    actualizarReserva();

}

// Confirmo la reserva utilizando SweetAlert

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

