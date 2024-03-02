//Funcion de validacion de datos
function validateForm() {
    let age =  document.getElementById('age').value;

    if (age < 1) {
        alert("La edad debe ser un número positivo.")
        return false;
    }

    return true;
}

//Funcion para mostrar los datos en la tabla
function showData() {
    let peopleList;
    if (localStorage.getItem('peopleList') == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }

    let html = "";

    peopleList.forEach(function(element, index){
        html += "<tr>";
        html += `<td>${element.name}</td>`;
        html += `<td>${element.lastname}</td>`;
        html += `<td>${element.age}</td>`;
        html += `<td>${element.email}</td>`;
        html += `<td>${element.product}</td>`;
        html += `<td>
                    <button onclick="DeleteData(${index})" class="btn-tabla-borrar">Borrar</button>
                    <button onclick="UpdateData(${index})" class="btn-tabla-Actualizar">Editar</button>
                </td>`;
        html += '</tr>';
    });

    document.querySelector('#crud-table tbody').innerHTML = html;
}

//Carga todos los datos al cargar la pagina
document.onload = showData();

//function para agregar el dato a la tabla (localStorage)
function AddData() {
    //forma de validar los datos
    if (validateForm() == true) {
        let name =  document.getElementById('name').value;
        let lastname =  document.getElementById('lastname').value;
        let age =  document.getElementById('age').value;
        let email =  document.getElementById('email').value;
        let product =  document.getElementById('product').value;

        let peopleList;
        if (localStorage.getItem('peopleList') == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem('peopleList'));
        }

        peopleList.push({
            name: name,
            lastname: lastname,
            age: age,
            email: email,
            product: product
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById('name').value = "";
        document.getElementById('lastname').value = "";
        document.getElementById('age').value = "";
        document.getElementById('email').value = "";
        document.getElementById('product').value = "";
    }
}

//funcion para borrar dato de la tabla (localStorage)

function DeleteData(index) {
    let peopleList;
    if (localStorage.getItem('peopleList') == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

//función para actulizar dato de la tabla (localStorage)
function UpdateData(index) {
    document.getElementById('clean').style.display = "none";
    document.getElementById('submit').style.display = "none";
    document.getElementById('edit').style.display = "block";

    let peopleList;
    if (localStorage.getItem('peopleList') == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("lastname").value = peopleList[index].lastname;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("product").value = peopleList[index].product;

    document.querySelector("#edit").onclick = function() {
        if (validateForm() == true) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].lastname = document.getElementById("lastname").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].email = document.getElementById("email").value;
            peopleList[index].product = document.getElementById("product").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();

            document.getElementById("name").value = "";
            document.getElementById("lastname").value = "";
            document.getElementById("age").value = "";
            document.getElementById("email").value = "";
            document.getElementById("product").value = "";

            document.getElementById('clean').style.display = "block";
            document.getElementById('submit').style.display = "block";
            document.getElementById('edit').style.display = "none";
        }
    }
}

//función para botón de limpiar datos
function EmptyData() {
    document.getElementById("name").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("email").value = "";
    document.getElementById("product").value = "";
}