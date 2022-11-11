let conditionNombre = false
let conditionApellido = false
const btnGet1 = document.getElementById('btnGet1')
const btnPost = document.getElementById('btnPost')
const inputGet1Id = document.getElementById('inputGet1Id')
const inputPostNombre = document.getElementById('inputPostNombre')
const inputPostApellido = document.getElementById('inputPostApellido')
const results = document.getElementById('results')
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
        inputGet1Id = ''
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

// cuando el usuario hace click en el btón de buscar, se muestra lo(s) user(s) deseado(s)
btnGet1.addEventListener('click', () => {
    fetchUsers()
})

inputPostNombre.addEventListener('change', () => {
    conditionNombre = !conditionNombre
    btnPost.disabled = !(conditionNombre & conditionApellido)
})

inputPostApellido.addEventListener('change', () => {
    conditionApellido = !conditionApellido
    btnPost.disabled = !(conditionNombre & conditionApellido)
})

btnPost.addEventListener('click', () => {
    sendUser()
})