let conditionNombre = false
let conditionApellido = false
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
        });
};

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
    fetch(urlMockapi + '/' + inputPutId.value)
        .then((response) => response.json())
        .then((user) => openModal(user))
        .catch((error) => {
            console.log(error);
        });
})

btnDelete.addEventListener('click', () => {
    fetch(urlMockapi + '/' + id, {
        method: 'DELETE',
    })
})

function openModal(user) {
    document.getElementById('putModal').show
    inputPutNombre.value = user.name
    inputPutApellido.value = user.lastname
}

btnSavePut.addEventListener('click', () => {
    changeUser(inputPutNombre.value, inputPutApellido.value)
})