/*
let conditionNombre = false
let conditionApellido = false
const alertError = document.getElementById('alertError')
const btnGet1 = document.getElementById('btnGet1')
const btnPost = document.getElementById('btnPost')
const btnPut = document.getElementById('btnPut')
const btnDelete = document.getElementById('btnDelete')
const btnSavePut = document.getElementById('btnSavePut')
const inputGet1Id = document.getElementById('inputGet1Id')
const inputPostNombre = document.getElementById('inputPostNombre')
const inputPostApellido = document.getElementById('inputPostApellido')
const inputPutId = document.getElementById('inputPutId')
const inputDelete = document.getElementById('inputDelete')
const results = document.getElementById('results')
const inputPutNombre = document.getElementById('inputPutNombre')
const inputPutApellido = document.getElementById('inputPutApellido')
const urlMockapi = 'https://63651843f711cb49d1f4f824.mockapi.io/users'


// llamamos al json con los users y lo imprimimos
const fetchUsers = () => {
    fetch(urlMockapi)
        .then((response) => response.json())
        .then((users) => showUsers(users))
        .catch((error) => {
            console.log(error);
            alertError.classList.remove('d-none')
        });
};

const putUser = () => {
    try {
        fetch(urlMockapi + '/' + inputPutId.value)
            .then(function (response) {                      // first then()
                if (response.ok) {
                    return response.text();
                }

                throw new Error('Something went wrong.');
            })
            .then(function (text) {                          // second then()


            }).then((response) => response.json())
            .then((user) => openModal(user))
            .catch(function (error) {                        // catch
                alert(error);
                alertError.classList.remove('d-none')
            });
    }};


// aquí creamos un nuevo usuario para agregar
const getUser = () => ({
    name: inputPostNombre.value,
    lastname: inputPostApellido.value
});

const sendUser = async () => {
    try {
        const response = await fetch(urlMockapi, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(getUser()),
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        inputGet1Id.value = ''
        fetchUsers();
    } catch (error) {
        console.log(error);
        alertError.classList.remove('d-none')
    }
};

const changeUser = async (NAME, LASTNAME) => {
    try {
        const response = await fetch(urlMockapi + '/' + inputPutId.value, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 'name': NAME, 'lastname': LASTNAME }),
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        inputGet1Id.value = ''
        fetchUsers();
    } catch (error) {
        console.log(error);
        alertError.classList.remove('d-none')
    }
};

// mostramos el user de id=inputGet1Id o a todos los users si no entramos nada
function showUsers(users) {

    let HtmlResultsToAdd = ''

    if (!inputGet1Id.value) {
        for (let user of users) {
            HtmlResultsToAdd += `
            <li>
                <p>ID: ${user.id}</p>
                <p>NAME: ${user.name}</p>
                <p>LASTNAME: ${user.lastname}</p>
            </li>`
        }
    } else {
        let user = users.filter(userId => userId.id == inputGet1Id.value)[0]
        HtmlResultsToAdd += `
        <li>
            <p>ID: ${user.id}</p>
            <p>NAME: ${user.name}</p>
            <p>LASTNAME: ${user.lastname}</p>
        </li>`

    }
    results.innerHTML = HtmlResultsToAdd
}


function checkInputPost() {
    if (inputPostNombre.value !== '' && inputPostApellido.value !== '') {
        btnPost.disabled = false
    } else {
        btnPost.disabled = true
    }
}

function checkInputPutId() {
    if (inputPutId.value !== '') {
        btnPut.disabled = false
    } else {
        btnPut.disabled = true
    }
}

function checkInputDelete() {
    if (inputDelete.value !== '') {
        btnDelete.disabled = false
    } else {
        btnDelete.disabled = true
    }
}

// cuando el usuario hace click en el btón de buscar, se muestra lo(s) user(s) deseado(s)
btnGet1.addEventListener('click', () => {
    fetchUsers()
})

btnPost.addEventListener('click', () => {
    sendUser()
})

btnPut.addEventListener('click', () => {
    putUser()
})

btnDelete.addEventListener('click', () => {
    fetch(urlMockapi + '/' + inputDelete.value, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then(res => fetchUsers())
        .catch((error) => {
            console.log('e');
            alertError.classList.remove('d-none')
        });

})

function openModal(user) {
    document.getElementById('putModal').show
    inputPutNombre.value = user.name
    inputPutApellido.value = user.lastname
}

btnSavePut.addEventListener('click', () => {
    changeUser(inputPutNombre.value, inputPutApellido.value)
})

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
// Llamamos a los dos campos (nombre y apellido), y el botón

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
