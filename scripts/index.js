
/*
document.addEventListener("mouseup", function (event) {
    if (!alertError.contains(event.target)) {
        alertError.classList.add("d-none");
    }
});
*/

// URL de la BASE DE DATOS y 
const URL_Mockapi = 'https://63651843f711cb49d1f4f824.mockapi.io/users'

// GET - Empieza
// Llamamos al campo (id) y el botón, y donde se van a imprimir los datos

const results = document.getElementById("results");
const inputGet1Id = document.getElementById("inputGet1Id");
const btnGet1 = document.getElementById("btnGet1");

// Función para mostrar los datos a recibir en pantalla

function showData(users) {

    let HtmlResultsToAdd = ''
    
    if (!inputGet1Id.value) {          
        for (let user of users) {  
            HtmlResultsToAdd += `   
            <li>
                <p>ID: ${user.id}</p>
                <p>NAME: ${user.name}</p>
                <p>LASTNAME: ${user.lastname}</p>
            </li>
            <br>`  // Se podría hacer una sola función para el HTMLtoAppend
            
        }
    } else {
        let user = users.filter(userId => userId.id == inputGet1Id.value)[0]
        HtmlResultsToAdd += `
        <li>
            <p>ID: ${user.id}</p>
            <p>NAME: ${user.name}</p>
            <p>LASTNAME: ${user.lastname}</p>
        </li>
        <br>`

    }
    inputGet1Id.value = '';
    results.innerHTML = HtmlResultsToAdd
};

// Hacemos el FETCH con el método GET

const fetchGET = () => {
    fetch(URL_Mockapi)
    .then(response => {
        if (response.ok) {
          return response.json();
        }else{
          throw Error(response.statusText); // Esto se puede usar después para la alerta
        }
    })
    .then((users) => showData(users))
    .catch((error) => {
        console.log(error);
        //alertError.classList.remove('d-none') -- Ver después de que forma hacer la alerta
    });      
};

// Agregar funcionalidad al botón del GET

btnGet1.addEventListener('click', () => {
    fetchGET();
})

// GET - Termina

// POST - Empieza
// Llamamos a los dos campos (nombre y apellido), y el botón POST

const inputPostNombre = document.getElementById("inputPostNombre");
const inputPostApellido = document.getElementById("inputPostApellido");
const btnPost = document.getElementById("btnPost");

// Modelo de nuevo usuario

const makeUser = () => (
    {
    name: inputPostNombre.value,
    lastname: inputPostApellido.value
    }
);

// Hacemos el FETCH con el método POST

const fetchPOST = () => {
    fetch(URL_Mockapi, {
        method: "POST",
        headers: {"Content-Type": "application/json"}, // Es necesario este header aca ?
        body: JSON.stringify(makeUser()),
    })
    .then(response => {
        if (response.ok) {
          return response.json();
        }else{
          throw Error(response.statusText); // Esto se puede usar después para la alerta
        }
    })
    .then((users) => fetchGET(users))
    .catch((error) => {
        console.log(error);
        //alertError.classList.remove('d-none') -- Ver después de que forma hacer la alerta
    });
};

// Habilitar el botón POST

const btnPOSTCheck = () => {
    if (inputPostNombre.value !== '' && inputPostApellido.value !== '') {
        btnPost.disabled = false
    } else {
        btnPost.disabled = true
    }
};

// Agregar funcionalidad al botón del POST

btnPost.addEventListener('click', () => {
    fetchPOST();
})

// POST - Termina

// PUT - Empieza
// Llamamos al campo (id), a los campos del modal (nombre y apellido), al botón PUT y al botón savePUT

const inputPutId = document.getElementById("inputPutId");
const inputPutNombre = document.getElementById("inputPutNombre");
const inputPutApellido = document.getElementById("inputPutApellido");
const btnPut = document.getElementById("btnPut");
const btnSavePut = document.getElementById("btnSavePut");

// Hacemos el FETCH con el método PUT

const fetchPUT = (NAME, LASTNAME) => {
    fetch(URL_Mockapi + "/" + inputPutId.value, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ 'name': NAME, 'lastname': LASTNAME }),
    })
    .then(response => {
        if (response.ok) {
          return response.json();
        }else{
          throw Error(response.statusText); // Esto se puede usar después para la alerta
        }
    })
    .then((users) => fetchGET(users))
    .catch((error) => {
        console.log(error);
        //alertError.classList.remove('d-none') -- Ver después de que forma hacer la alerta
    });
};

// Habilitar el botón PUT

const btnPUTCheck = () => {
    if (inputPutId.value !== '') {
        btnPut.disabled = false
    } else {
        btnPut.disabled = true
    }
};

// Agregar funcionalidad al botón del PUT y agregar las funciones del modal

const openModal = (user) => {
    document.getElementById('putModal').show
    inputPutNombre.value = user.name
    inputPutApellido.value = user.lastname
}

btnSavePut.addEventListener('click', () => {
    fetchPUT(inputPutNombre.value, inputPutApellido.value)
})

btnPut.addEventListener('click', () => {
    fetch(URL_Mockapi + '/' + inputPutId.value)
    .then(response => {
        if (response.ok) {
          return response.json();
        }else{
          throw Error(response.statusText); // Esto se puede usar después para la alerta
        }
    })
    .then((users) => openModal(users))
    .catch((error) => {
        console.log(error);
        //alertError.classList.remove('d-none') -- Ver después de que forma hacer la alerta
    });
})

// PUT - Termina

// DELETE - Empieza
// Llamamos al campo (id) y el botón, y donde se van a imprimir los datos

const inputDelete = document.getElementById("inputDelete");
const btnDelete = document.getElementById("btnDelete");

// Hacemos el FETCH con el método DELETE

const fetchDELETE = () => {
    fetch(URL_Mockapi + '/' + inputDelete.value, {method: "DELETE"})
    .then(response => {
        if (response.ok) {
          return response.json();
        }else{
          throw Error(response.statusText); // Esto se puede usar después para la alerta
        }
    })
    .then((users) => fetchGET(users))
    .catch((error) => {
        console.log(error);
        //alertError.classList.remove('d-none') -- Ver después de que forma hacer la alerta
    });
};

// Habilitar el botón DELETE

const btnDELETECheck = () => {
    if (inputDelete.value !== '') {
        btnDelete.disabled = false
    } else {
        btnDelete.disabled = true
    }
};

// Agregar funcionalidad al botón del DELETE

btnDelete.addEventListener('click', () => {
    fetchDELETE();
})

// LIMPIAR LOS CAMPOS DESPUÉS DE APRETAR EL BOTÓN -- inputGet1Id.value = ''